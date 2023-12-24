const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get('/test', async(req,res)=>{
  res.json({message:"Hello world!"});
});

router.use('/.netlify/functions/index', router);

module.exports.handler = serverless(app);