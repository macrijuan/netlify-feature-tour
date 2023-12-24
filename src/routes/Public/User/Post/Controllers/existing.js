const {Router}=require("express");
const router = Router();
const {User} = require("../../../../../db");
const {existing} = require("../../../../error");

router.use(async(req,res,next)=>{
  User.findOne({
    where:{email:req.body.email}
  })
  .then((existingData)=>{
    if(existingData){
      res.status(409).json({errors:{email:[existing("email")]}});
    }else{
      next();
    };
  });
});

module.exports.handler=router;