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

fs
.readdirSync(path.join(__dirname, '/models'))
.filter((file) => (
  file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js')
)
.forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)).handler);
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => {
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
});
sequelize.models = Object.fromEntries(capsEntries);


// let Admin_deleted = require("./models/AdminDeleted.js").handler
// let Admin = require("./models/Admin.js").handler
// let Diet = require("./models/Diet.js").handler
// let Dish = require("./models/Dish.js").handler
// let Inventory = require("./models/Inventory.js").handler
// let Option = require("./models/Option.js").handler
// let Reservation = require("./models/Reservation.js").handler
// let Table = require("./models/Table.js").handler
// let User = require("./models/User.js").handler

console.log(sequelize);

module.exports.handler = { 
  conn: sequelize,
  // Admin_deleted: Admin_deleted,
  // Admin,
  // Diet,
  // Dish,
  // Inventory,
  // Option,
  // Reservation,
  // Table,
  // User
};