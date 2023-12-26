const express = require("express");
const app = express();
const serverless = require("serverless-http");

const { conn } = require("../../src/db.js").handler;
const routes = require("../../src/routes/index.js").handler;

conn.authenticate().then(()=>{
  app.use('https://stirring-jalebi-cda26f.netlify.app/.netlify/functions/api', routes);
}).catch(()=>{
  console.log('bye');
  throw new Error('DB not connected.');
});

module.exports.handler = serverless(app);