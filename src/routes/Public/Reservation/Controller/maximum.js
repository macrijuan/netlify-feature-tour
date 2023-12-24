const {Router}=require("express");
const router = Router();
const {Reservation}=require("../../../../db").handler;
const {errJSON, unknown}=require("../../../error").handler;

router.use(async(req,res,next)=>{
  try{
    Reservation.findAndCountAll({
      limit:4, offset:0,
      where:{
        userId:res.locals.user
      }
    }).then(resr=>{
      if(resr.length>=3){
        res.status(409).json(errJSON("existing", "The maximum number of reservations allowed has been reached (3)."));
      }else{
        next();
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;