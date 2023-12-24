const { Router } = require('express');
const router = Router();
const format = require("./Controllers/format").handler;
const existing = require("./Controllers/existing").handler;
const authorization = require("./Controllers/authorization").handler;
const {Admin}=require("../../../../db").handler;
const {unknown, errJSON}=require("../../../error").handler;
const {dobleSpaceEraser}=require("../../../../formatter").handler;

router.post("/post_admin_user/:code",
(req,res,next)=>{res.locals.auth=req.params.code;next()},
authorization,
format,
existing,
async(req,res)=>{
  const {email, password, first_name, last_name} = req.body;
  Admin.create({ email, password, first_name:dobleSpaceEraser(first_name), last_name:dobleSpaceEraser(last_name) })
  .then((newAdmin=>{
    delete newAdmin.dataValues.password;
    res.status(200).json(newAdmin.dataValues);
  })).catch(err=>{
    if(err.errors[0].validatorKey==="isEmail"){
      res.status(403).json(errJSON("email","Invalid email."));
    }else res.status(500).json(errJSON("unknown", unknown));
  });
});

module.exports.handler = router;