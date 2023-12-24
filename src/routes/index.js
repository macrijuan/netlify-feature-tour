const { Router } = require('express');
const router = Router();
// const {Admin} = require("../db.js");



// const admin = require("./Admin");


// router.use("/administrator", admin);

router.get("/get_modules", async(req,res)=>{
  res.json({data:Admin});
});

module.exports.handler = router