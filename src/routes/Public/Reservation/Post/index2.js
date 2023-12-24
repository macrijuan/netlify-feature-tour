const { Router }=require("express");
const router = Router();
const format = require("../Controller/format.js");
const existing = require("../Controller/existing.js");
const maxResrs = require("../Controller/maximum.js");
const { Reservation, User, Table }=require("../../../../db");
const { errJSON, unknown, notFound } = require("../../../error");

router.post("/post_reservation/:user",
(req,res,next)=>{res.locals.user = req.params.user; next();},
format,
maxResrs,
existing,
async(req,res)=>{
  try{
    User.findByPk(req.params.user)
    .then(async user=>{
      if(user){
        res.locals.ticket = undefined;
        console.log("TIME:", res.locals.date.getTime() -  Date.now());
        const timer = setTimeout(async ()=>{
          Reservation.findByPk(res.locals.ticket)
          .then(async resr=>{
            console.log(resr);
            if(resr){
              resr.update({expired:true})
              .then(resr=>resr.save()
                .then(resr=>{
                  console.log(`Reserve ${resr.ticket} of user ${res.locals.user} has expired.`);
                }
              ));
            };
          });
        }, res.locals.date.getTime() -  Date.now() + 900000); // The restaurant holds the reservation during extra 15 mins = 900000 ms
        Table.findByPk(req.body.table)
        .then(async table=>{
          Reservation.create({
            year:req.body.year,
            month:req.body.month,
            day:req.body.day,
            time:req.body.time,
            deletion_code:parseInt(timer),
            userId:user.id,
            tableId:table.id
          }).then(async resr=>{
            if(resr){
              res.locals.ticket = resr.ticket;
              res.json(resr);
              await resr.setUser(user);
              await resr.setTable(table);
            }else {res.status(500).json(errJSON("unknown",unknown));};
          });
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

module.exports = router;