const {Router}=require("express");
const router = Router();
const {unknown, errJSON} = require("../../../../error");
const{emailValidator,passwordValidator,namesValidator}=require("../../validation");

router.use(async(req, res, next)=>{
  try{
    const {email, password, first_name, last_name}=req.body;
    Object.keys(req.body).forEach(prop=>{
      req.body[prop]=req.body[prop].toLowerCase();
    });
    res.locals.approved = [];
    res.locals.errors={};
    emailValidator(email, res.locals.errors);
    passwordValidator(password, res.locals.errors, res.locals.approved);
    namesValidator(first_name, res.locals.errors, "first name");
    namesValidator(last_name, res.locals.errors, "last name");
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors, post:true});
    }else{
      next();
    };
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports=router;