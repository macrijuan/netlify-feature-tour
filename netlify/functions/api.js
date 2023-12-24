const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get('/', async(req,res)=>{
  return {
    statusCode: 200,
    body: 'App is running...'
  };
});

router.get('/test', async(req,res)=>{
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:"This is a test JSON."
    })
  };
});

router.use('/.netlify/functions/index', router);

exports.handler = serverless(app);