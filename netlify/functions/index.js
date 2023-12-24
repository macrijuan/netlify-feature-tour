const express = require("express");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");

router.get("/test", async(req,res)=>{
  res.json({message:"Hello world!"});
});

router.use('https://stirring-jalebi-cda26f.netlify.app/.netlify/functions/index', router);

exports.handler = serverless(app);