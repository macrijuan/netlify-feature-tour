const { Sequelize } = require('sequelize');
const pg = require('pg');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  dialectModule: pg,
  logging: false,
  native:false,
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 4000,
    evict: process.env.CURRENT_LAMBDA_FUNCTION_TIMEOUT
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs
.readdir(path.join(__dirname, '/models'))
.filter((file) => (
  file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js')
)
.forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => {
  // console.log(entry); 
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
});
sequelize.models = Object.fromEntries(capsEntries);

module.exports.handler = sequelize;

// async function (action) {
//   if (!sequelize) {
//     sequelize = loadSequelize().then(res=>res);
//   } else {
//     sequelize.connectionManager.initPools();
//     if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
//       delete sequelize.connectionManager.getConnection;
//     };
//   };
//   sequelize.connectionManager.close().then(()=>sequelize).catch((err)=>{console.log(err); throw new Error("Failed to connect to the DB");});
// }