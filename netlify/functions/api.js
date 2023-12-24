const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get('/', async(req,res)=>{
  res.send("App is running");
});

router.get('/test', async(req,res)=>{
  res.json({message:'This is a JSON test'});
});

router.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);