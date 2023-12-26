const { Router } = require('express');
const router = Router();

// const admin = require("./Admin");

// router.use("/administrator", admin);

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_modules", (req,res)=>{
  res.json({data:Admin.tableName});
});

module.exports.handler = router