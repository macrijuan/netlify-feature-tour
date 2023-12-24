const {Router}=require("express");
const router = Router();
const error = require("../../../../error");
const{emailValidator,passwordValidator,namesValidator}=require("../../validation");

router.use(async(req, res, next)=>{
  try{
    const {email, password, first_name, last_name}=req.body;
    res.locals.errors = {};
    res.locals.approved=[];
    emailValidator(email, res.locals.errors);
    passwordValidator(password, res.locals.errors, res.locals.approved);
    namesValidator(first_name, res.locals.errors, "first name");
    namesValidator(last_name, res.locals.errors, "last name");
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors});
    }else{
      next();
    }
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:error.unknown}});
  };
});

module.exports=router;