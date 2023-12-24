const {Router}=require("express");
const router = Router();
const format = require("../Controller/format").handler;
const existing = require("../Controller/existing").handler;
const {Reservation}=require("../../../../db").handler;
const { errJSON, notFound, unknown } = require("../../../error").handler;

router.put("/update_reservation/:user/:ticket",
(req,res,next)=>{ res.locals.user = req.params.user; res.locals.update=true; next(); },
format,
existing,
async(req,res)=>{
  try{
    Reservation.findByPk(req.params.ticket)
    .then(async resr=>{
      if(resr){
        console.log(Reservation.getAttributes())
        resr.update(req.body)
        .then(async resr=>{
          resr.save().then(resr=>{ delete resr.dataValues.updatable; res.json(resr); });
        });
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservation")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.put("/update_reservation/test",
async(req,res)=>{
  try{
    res.json(Reservation.tableAttributes);
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;