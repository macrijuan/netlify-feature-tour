const {Admin} = require("../../../../../db").handler;
const {Router}=require("express");
const router = Router();
const {existing, equalToCurent, errJSON, unknown} = require("../../../../error").handler;

router.use(async(req,res,next)=>{
  if(req.body.email){
    try{
      Admin.findOne({
        where:{email:req.body.email}
      })
      .then((user)=>{
        if(user){
          if(res.locals.params.id==user.id){
            res.status(409).json({ errors:{ email:[ equalToCurent("email") ] }, update:true});
          }else{
            res.status(409).json({ errors:{ email:[ existing("email") ] }, update:true});
          };
        }else{
          next();
        };
      });
    }catch(err){
      console.log(err);
      res.status(500).json(errJSON("unknown", unknown));
    };
  }else{next();};
});

module.exports.handler=router;