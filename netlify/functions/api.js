const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

const routes = require("../../src/routes/index.js").handler;
const { conn } = require("../../src/db.js").handler;



conn.authenticate().then(()=>{
  app.use('/.netlify/functions/api', routes);
}).catch(()=>{
  router.use((req,res)=>{
    res.json({errors:{unknown:"Oh, no! There was a problem."}})
  });
});

module.exports.handler.handler = serverless(app);