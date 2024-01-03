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
  require("./models/AdminDeleted.js").handler,
  require("./models/Admin.js").handler,
  require("./models/Diet.js").handler,
  require("./models/Dish.js").handler,
  require("./models/Inventory.js").handler,
  require("./models/Option.js").handler,
  require("./models/Reservation.js").handler,
  require("./models/Table.js").handler,
  require("./models/User.js").handler
];

modelDefiners.forEach(model => model(sequelize));

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

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};