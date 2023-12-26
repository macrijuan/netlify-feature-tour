const { Router } = require('express');
const router = Router();
const admin  = require("../models/Admin.js").handler;

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_modules", (req,res)=>{
  console.log("admin:", admin);
  res.json({data:admin});
});

module.exports.handler = router