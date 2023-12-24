const{Router}=require("express");
const router = Router();
const{emailValidator, passwordValidator, namesValidator}= require("../../validation").handler;
const {unknown}=require("../../../../error").handler;

router.use((req, res, next)=>{
  try{
    const{email, password, first_name, last_name}=req.body;
    res.locals.errors = {};
    res.locals.approved = [];
    if(email)emailValidator(email, res.locals.errors);
    if(password)passwordValidator(password, res.locals.errors, res.locals.approved);
    if(first_name && first_name.length)namesValidator(first_name, res.locals.errors, "first name");
    if(last_name && last_name.length)namesValidator(last_name, res.locals.errors, "last name");
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors});
    }else{
      next();
    };
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unkown:unknown}});
  };
});

module.exports.handler = router;