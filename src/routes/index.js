const { Router } = require('express');
const router = Router();
const { Admin } = require("../db.js").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_model", (req,res)=>{
  res.json({name:Admin.tableName});
});

module.exports.handler = router;