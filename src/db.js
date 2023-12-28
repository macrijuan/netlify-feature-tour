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

let Admin_deleted = require("./models/AdminDeleted.js").handler(sequelize);
let Admin = require("./models/Admin.js").handler(sequelize);
let Diet = require("./models/Diet.js").handler(sequelize);
let Dish = require("./models/Dish.js").handler(sequelize);
let Inventory = require("./models/Inventory.js").handler(sequelize);
let Option = require("./models/Option.js").handler(sequelize);
let Reservation = require("./models/Reservation.js").handler(sequelize);
let Table = require("./models/Table.js").handler(sequelize);
let User = require("./models/User.js").handler(sequelize);

sequelize.models = { Admin_deleted, Admin, Diet, Dish, Inventory, Option, Reservation, Table, User };

console.log("Admin.name",Admin.name);

Reservation.hasOne( User );


User.hasMany( Reservation );
Table.hasMany( Reservation );


Reservation.hasOne( Table, { foreignKey:"ticket reserve", as:"ticket reserve" } );


Diet.belongsToMany( Dish, { through:"dish_diets", timestamps:false } );
Dish.belongsToMany( Diet, { through:"dish_diets", timestamps:false } );


module.exports.handler = { 
  conn: sequelize,
  Admin_deleted: Admin_deleted,
  Admin,
  Diet,
  Dish,
  Inventory,
  Option,
  Reservation,
  Table,
  User
};