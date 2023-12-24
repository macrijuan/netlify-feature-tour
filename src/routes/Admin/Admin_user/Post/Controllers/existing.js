const {Admin} = require("../../../../../db");
const {Router}=require("express");
const router = Router();
const {existing} = require("../../../../error");

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

module.exports=router;