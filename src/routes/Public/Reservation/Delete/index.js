const {Router}=require("express");
const router = Router();
const {Reservation}=require("../../../../db");
const {errJSON, notFound, unknown}=require("../../../error");

router.delete("/delete_reservation/:user/:ticket",
  async(req,res)=>{
  try{
    Reservation.findOne({
      where:{
        userId: req.params.user,
        ticket: req.params.ticket
      }
    }).then(async resr=>{
      if(resr){
        clearTimeout(resr.deletion_code);
        await resr.destroy({force:true})
        .then(()=>{res.json(errJSON("message", `The reservation for the date ${resr.date} has been canceled.`))});
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservation")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports = router;