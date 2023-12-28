const { Router }=require("express");
const router = Router();
const {Admin} = require("../../../../../db").handler;
const {existing} = require("../../../../error").handler;

router.use(async(req,res,next)=>{
  Admin.findOne({
    where:{email:req.body.email}
  })
  .then((existingData)=>{
    if(existingData){
      res.status(409).json({ errors:{ email:[ existing("email") ] }, post:true });
    }else{
      next();
    };
  });
});

module.exports.handler=router;