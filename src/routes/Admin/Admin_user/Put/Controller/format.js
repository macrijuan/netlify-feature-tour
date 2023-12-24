const{Router}=require("express");
const router = Router();
const{ emailValidator, passwordValidator, namesValidator, statusValidator }= require("../../validation");
const{unknown}=require("../../../../error");

router.use((req, res, next)=>{
  try{
    Object.keys(req.body).forEach(prop=>{
      req.body[prop]=req.body[prop].toLowerCase();
    });
    res.locals.errors={};
    res.locals.approved = [];
    if(req.body.hasOwnProperty("email"))emailValidator(req.body.email, res.locals.errors);
    if(req.body.hasOwnProperty("password"))passwordValidator(req.body.password, res.locals.errors, res.locals.approved);
    if(req.body.hasOwnProperty("first_name"))namesValidator(req.body.first_name, res.locals.errors, "first name");
    if(req.body.hasOwnProperty("last_name"))namesValidator(req.body.last_name, res.locals.errors, "last name");
    if(req.body.hasOwnProperty("status"))statusValidator(req.body.status, res.locals.errors);
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors, update:true});
    }else{
      next();
    };
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unkown:unknown}});
  };
});

module.exports = router;