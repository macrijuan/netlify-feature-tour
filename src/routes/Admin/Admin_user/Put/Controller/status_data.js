const{Router}=require("express");
const router = Router();
const{Admin}=require("../../../../../db");
const{statusValidator}= require("../../validation");
const{unknown, errJSON}=require("../../../../error");

router.use((req, res, next)=>{
  try{
    res.locals.errors = {};
    statusValidator(req.body.status, Admin.getAttributes().status.values, res.locals.errors);
    if(res.locals.errors.status){
      res.status(403).json({errors:res.locals.errors});
    }else{
      next();
    };
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;