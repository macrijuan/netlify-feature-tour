const { Router } = require('express');
const router = Router();
const { Admin } = require("../db.js").handler;

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/get_model", async(req,res)=>{
  Admin.findAll().then(admins=>res.json({data: admins}));
  
});

module.exports.handler = router;