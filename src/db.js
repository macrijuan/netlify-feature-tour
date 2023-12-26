const { Sequelize } = require('sequelize');
const pg = require('pg');
const { READCOMMITTED } = require('sequelize/types/table-hints');
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

module.exports.handler = {
  conn: async function (event, callback) {
    try{
      if (!sequelize) {
        sequelize = await loadSequelize();
      } else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
          delete sequelize.connectionManager.getConnection;
        };
      };
      await sequelize.connectionManager.close();
    }catch(err){
      console.log(err); return "Failed to connect";
    };
  },
  models: ()=>{
    if(sequelize){
      console.log("connected", JSON.stringify(sequelize.models));
      return { ...sequelize.models };
    }else{
      console.log("NOT connected");
      return undefined;
    }
  }
};