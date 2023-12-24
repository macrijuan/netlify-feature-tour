const {Router}=require("express");
const router = Router();
const {User} = require("../../../../../db");
const {existing, equalToCurent} = require("../../../../error");

router.use(async(req,res,next)=>{
  if(req.body.email){
    User.findOne({
      where:{email:req.body.email}
    })
    .then((user)=>{
      if(user){
        if(res.locals.params.id==user.id){
          res.status(409).json({errors:{email:[equalToCurent("email")]}});
        }else{
          res.status(409).json({errors:{email:[existing("email")]}});
        };
      }else{
        next();
      };
    });
  }else{
    next();
  };
});

module.exports=router;