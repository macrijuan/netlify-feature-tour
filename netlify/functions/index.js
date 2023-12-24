const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get('/', (req,res)=>{
  res.send("Hello world!");
});

router.get('/test', (req,res)=>{
  res.json({message:"This is a JSON test"});
});

router.use('/.netlify/functions/index', router);

module.exports.handler = serverless(app);