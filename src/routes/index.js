const { Router } = require('express');
const router = Router();
const sequelize = require("sequelize");
const admin = require('../models/Admin.js').handler;

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_model", (req,res)=>{
  console.log("admin:", admin(sequelize));
  res.json({data:admin(conn)});
});

module.exports.handler = router