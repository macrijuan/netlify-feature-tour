const{Router}=require("express");
const router = Router();
const {isMandatory, maxLength}=require("../../../../error").handler;

router.use((req,res,next)=>{
  res.locals.errors = {};
  if(!req.body.name){
    res.locals.errors.name = isMandatory("name");
  }else if(req.body.name.length>30){
    res.locals.errors.name = maxLength("name", 30);
  };
  if(res.locals.errors.name){
    res.status(403).json({errors:res.locals.errors});
  }else{
    next();
  };
});

module.exports.handler = router;