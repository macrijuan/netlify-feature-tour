const { Sequelize } = require('sequelize');
const pg = require('pg');
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

const modelDefiners = [
  require("./models/AdminDeleted.js"),
  require("./models/Admin.js"),
  require("./models/Diet.js"),
  require("./models/Dish.js"),
  require("./models/Inventory.js"),
  require("./models/Option.js"),
  require("./models/Reservation.js"),
  require("./models/Table.js"),
  require("./models/User.js")
];

modelDefiners.forEach(model => model.handler(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => {
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
});
sequelize.models = Object.fromEntries(capsEntries);


const { Diet, Dish, User, Reservation, Table } = sequelize.models;

Reservation.hasOne( User );

User.hasMany( Reservation );
Table.hasMany( Reservation );

Reservation.hasOne( Table, { foreignKey:"ticket reserve", as:"ticket reserve" } );

Diet.belongsToMany( Dish, { through:"dish_diets", timestamps:false } );
Dish.belongsToMany( Diet, { through:"dish_diets", timestamps:false } );

module.exports.handler = {
  ...sequelize.models,
  conn: sequelize,
};