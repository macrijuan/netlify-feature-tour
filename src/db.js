const { Sequelize } = require('sequelize');
const pg = require('pg');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
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
console.log("basename", basename);
console.log("__dirname", __dirname);

fs.readdirSync('./models')
.filter((file) => (
  file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js')
).forEach((file) => {
  modelDefiners.push(require(path.join(__dirname,'/models')).handler, file);
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => {
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
});

sequelize.models = Object.fromEntries(capsEntries);


const Admin_deleted = require("./models/Admin_deleted.js").handler
const Admin = require("./models/Admin.js").handler
const Diet = require("./models/Diet.js").handler
const Dish = require("./models/Dish.js").handler
const Inventory = require("./models/Inventory.js").handler
const Option = require("./models/Option.js").handler
const Reservation = require("./models/Reservation.js").handler
const Table = require("./models/Table.js").handler
const User = require("./models/User.js").handler

console.log(sequelize);

module.exports.handler = { 
  conn: sequelize,
  Admin_deleted,
  Admin,
  Diet,
  Dish,
  Inventory,
  Option,
  Reservation,
  Table,
  User
};