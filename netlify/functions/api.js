const express = require("express");
const app = express();
const serverless = require("serverless-http");

const { conn } = require("../../src/db.js").handler;
const routes = require("../../src/routes/index.js").handler;

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://molino-admin-five.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use("/.netlify/functions/api",
(req, res, next)=>{
  conn.authenticate().then(()=>{next();}).catch(()=>{res.send("DB connection failed.");});
},
routes);

module.exports.handler = serverless(app);