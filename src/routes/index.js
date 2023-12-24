const { Router } = require('express');
const router = Router();
const {Admin} = require("../db.js").handler;



// const admin = require("./Admin");


// router.use("/administrator", admin);

router.get("/get_modules", async(req,res)=>{
  res.json({data:Admin.tableName});
});

module.exports.handler = router