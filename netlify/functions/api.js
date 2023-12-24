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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://stirring-jalebi-cda26f.netlify.app/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

router.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);