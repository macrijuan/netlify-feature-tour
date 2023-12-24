const {Router}=require("express");
const router = Router();
const{dietNameValidator, dietDescValidator}=require("../../validation");

router.use((req,res,next)=>{
  Object.keys(req.body).forEach(prop=>{
    req.body[prop]=req.body[prop].toLowerCase();
  });
  if(req.body.hasOwnProperty("name"))dietNameValidator(req.body.name, res.locals.errors);
	if(req.body.hasOwnProperty("description"))dietDescValidator(req.body.description, res.locals.errors);
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors, update:true});
  }else{
    next();
  };
});

module.exports.handler = router;