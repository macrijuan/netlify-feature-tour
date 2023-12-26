const { Sequelize } = require('sequelize');
const pg = require('pg');
require("dotenv").config();

////////////////////////////////////

const { Sequelize } = require("sequelize");

let sequelize = null;

console.log(process.env.DB_USER);

async function loadSequelize() {
  const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    dialectModule: pg,
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 4000,
      evict: process.env.CURRENT_LAMBDA_FUNCTION_TIMEOUT
    }
  });

  // or `sequelize.sync()`
  await sequelize.authenticate();

  return sequelize;
}

module.exports.handler = async function (event, callback) {
  // re-use the sequelize instance across invocations to improve performance
  if (!sequelize) {
    sequelize = await loadSequelize();
  } else {
    // restart connection pool to ensure connections are not re-used across invocations
    sequelize.connectionManager.initPools();

    // restore `getConnection()` if it has been overwritten by `close()`
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;
    }
  }

  try {
    return await doSomethingWithSequelize(sequelize);
  } finally {
    // close any opened connections during the invocation
    // this will wait for any in-progress queries to finish before closing the connections
    await sequelize.connectionManager.close();
  }
};