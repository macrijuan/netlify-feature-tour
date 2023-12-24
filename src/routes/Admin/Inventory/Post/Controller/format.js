const {Router}=require("express");
const router = Router();
const {nameValidator, quantityValidator, unitValidator, classValidator}=require("../../validation").handler;
const { unknown }=require("../../../../error").handler;

router.use((req,res,next)=>{
  try{
    res.locals.errors = {};
    Object.keys(req.body).forEach(prop=>{
      req.body[prop]=req.body[prop].toLowerCase();
    });
    nameValidator(req.body.name, res.locals.errors);
    req.body.quantity = Number(req.body.quantity);
    quantityValidator(req.body.quantity, res.locals.errors);
    unitValidator(req.body.unit, res.locals.errors);
    classValidator(req.body.class, res.locals.errors);
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors, post:true});
    }else{
      next();
    };
  }catch(err){
    console.log(err)
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;