const { Router } = require('express');
const router = Router();
const { models } = require("../db.js").handler;

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_modules", (req,res)=>{
  res.json({data:models});
});

module.exports.handler = router