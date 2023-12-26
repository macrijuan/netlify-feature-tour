const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

const { conn } = require("../../src/db.js").handler;
const routes = require("../../src/routes/index.js").handler;



conn.authenticate().then(()=>{
  router.get("/", async(req,res)=>{res.send("API status: OK")});
  app.use('/.netlify/functions/api', routes);
}).catch(()=>{
  throw new Error("DB not connected.");
});

module.exports.handler = serverless(app);