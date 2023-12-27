const { Router } = require('express');
const router = Router();
const { Admin } = require("../db.js");

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_model", (req,res)=>{
  res.json({data:Admin.name});
});

module.exports.handler = router