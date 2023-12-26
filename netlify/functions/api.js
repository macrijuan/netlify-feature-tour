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
  router.use('/.netlify/functions/api', (req,res)=>{
    res.json({errors:{unknown:"Oh, no! There was a problem."}})
  });
});

module.exports.handler = serverless(app);