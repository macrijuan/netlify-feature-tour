const express = require("express");
const app = express();
const routes = require("../../routes/index.js");
const serverless = require("serverless-http");


app.use('/.netlify/functions/api', routes.handler);

module.exports.handler = serverless(app);