const { Router } = require('express');
const router = Router();
const sequelize = require("../db.js").handler;
const admin = require('../models/Admin.js').handler;

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_model", (req,res)=>{
  res.json({data:sequelize});
});

module.exports.handler = router