const {Router}=require("express");
const router = Router();
const {Reservation}=require("../../../../db");
const {errJSON, unknown}=require("../../../error");



router.use(async(req,res,next)=>{
  try{
    Reservation.findOne({
      where:{
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        time: req.body.time,
        tableId: req.body.table
      }
    }).then(resr=>{
      if(resr){
        if(resr.userId === parseInt(res.locals.user)){
          res.status(409).json(errJSON("existing", "The entered reservation already exists for this user."));
        }else{
          res.status(409).json(errJSON("existing", `The reservation for the table ${resr.tableId} at "${resr.date}" belongs to another user.`));
        };
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