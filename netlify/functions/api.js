const express = require("express");
const app = express();
const routes = require("../../routes/index.js");
const router = express.Router();
const serverless = require("serverless-http");
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  logging: false,//set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

sequelize.authenticate().then(()=>{
  app.use('/.netlify/functions/api', routes.handler);
}).catch(err=>{
  router.use((req,res)=>{
    res.json({errors:{unknown:"Oh, no! There was a problem."}})
  });
});

module.exports.handler = serverless(app);