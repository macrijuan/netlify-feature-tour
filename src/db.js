const { Sequelize } = require('sequelize');
const pg = require('pg');
require("dotenv").config();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  logging: false,
  native: false,
  dialectModule: pg
});

module.exports.handler = {
  ...sequelize.models,
  conn: sequelize,
};