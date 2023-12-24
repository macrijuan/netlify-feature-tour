const {Router}=require("express");
const router = Router();
const {Reservation}=require("../../../../db");
const { errJSON, unknown, notFound }=require("../../../error");

router.get("/get_user_reservations/:user",
async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      offset:0,limit:3,
      where:{
        userId:req.params.user
      },
      attributes:{exclude:["updatable"]}
    }).then(resr=>{
      if(!resr.rows.length){
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      }else{
        res.json(resr);
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_reservation/:user/:ticket",
async(req,res)=>{
  try{
    Reservation.findOne({
      where:{
        user:req.params.user,
        ticket:req.params.ticket
      },
      attributes:{exclude:["updatable"]}
    })
    .then(resr=>{
      if(!resr){
        res.status(404).json(errJSON("not_found", notFound("Reservation")));
      }else{
        res.json(resr);
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports = router;