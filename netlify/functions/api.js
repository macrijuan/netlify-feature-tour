const express = require("express");
const app = express();
const serverless = require("serverless-http");

const { conn }  = require("../../src/db.js").handler;
const routes = require("../../src/routes/index.js").handler;

app.use("/.netlify/functions/api",
(req, res, next)=>{
  conn.authenticate().then(()=>{next();}).catch(()=>{console.log("DB connection failed.");});
},
routes);

module.exports.handler = serverless(app);