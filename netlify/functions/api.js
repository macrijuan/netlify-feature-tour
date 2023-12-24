const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get('/', async(req,res)=>{
  return new Response("App is running");
});

router.get('/test', async(req,res)=>{
  return res.json({message:'This is a JSON test'});
});

router.use('/.netlify/functions/api', router);

exports.handler = serverless(app);