const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require('pg');

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  logging: false,
  native: false,
  dialectModule: pg
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
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

module.exports.handler = {
  ...sequelize.models,
  conn: sequelize,
};