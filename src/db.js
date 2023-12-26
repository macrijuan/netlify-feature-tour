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
  (await sequelize.authenticate().then(()=>sequelize)).catch((err)=>{console.log(err); throw new Error("Failed to connect to the DB");});
};

module.exports.handler = {
  conn: async function (action) {
    if (!sequelize) {
      sequelize = loadSequelize().then(res=>res);
    } else {
      sequelize.connectionManager.initPools();
      if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
        delete sequelize.connectionManager.getConnection;
      };
    };
    sequelize.connectionManager.close().then(()=>sequelize).catch((err)=>{console.log(err); throw new Error("Failed to connect to the DB");});
  },
  models:sequelize ? sequelize.modules : null
};