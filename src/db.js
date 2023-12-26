const { Sequelize } = require('sequelize');
const pg = require('pg');
require("dotenv").config();

let sequelize = null;


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
  await sequelize.authenticate();
  return sequelize;
};

module.exports.handler = async function (event, callback) {
  console.log(process.env.DB_USER);
  if (!sequelize) {
    sequelize = await loadSequelize();
  } else {
    sequelize.connectionManager.initPools();
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;
    };
  };
  try {
    return await doSomethingWithSequelize(sequelize);
  } finally {
    await sequelize.connectionManager.close();
  };
};