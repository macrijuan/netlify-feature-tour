const { Router }=require("express");
const router = Router();
const format = require("../Controller/format.js");
const existing = require("../Controller/existing.js");
const maxResrs = require("../Controller/maximum.js");
const { Reservation, User }=require("../../../../db");
const { todayResrTimer, futureDayResrTimer } = require("./timers");
const { errJSON, unknown, notFound } = require("../../../error");

router.post("/post_reservation/:user",
(req,res,next)=>{res.locals.user = req.params.user; next();},
format,
maxResrs,
existing,
async(req,res)=>{
  try{
    User.findByPk(req.params.user)
    .then(user=>{
      if(user){
        res.locals.date = new Date(req.body.date);
        Reservation.create({
          table:req.body.table,
          date:res.locals.date,
          user:user.id
        }).then(async resr=>{
          if(res.locals.date.toISOString().split("T")[0]=== new Date().toISOString().split("T")[0]){
            console.log("Reservation for today");
            await todayResrTimer(resr, res.locals.date);
            res.json({message:`The table ${resr.table} has been reserved for the date ${res.locals.date}`});
          }else{
            console.log("Reservation for a future day");
            await futureDayResrTimer(resr, res.locals.date);
            res.json({message:`The table ${resr.table} has been reserved for the date ${res.locals.date.toLocaleDateString(undefined, {year:"numeric", month:"long", day:"numeric", weekday:"long"})} at ${res.locals.date.toLocaleTimeString()}`});
          };
        });
      }else{
        res.status(404).json(errJSON("not_found", notFound("User")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;