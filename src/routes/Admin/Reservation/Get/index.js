const {Router} = require("express");
const router = Router();
const{ Reservation }=require("../../../../db").handler;
const {errJSON, unknown, notFound}=require("../../../error").handler;
const { getMany }=require("../../../routeFormatter").handler;

router.get("/get_reservations", async(req,res)=>{
  try{
    res.locals.data={ attributes:{ exclude:["tableId", "userId", "deletion_code"] } };
    await getMany(Reservation, req.query, res, "Reservations");
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_meridiem_time", async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{meridiem_time:req.query.meridiem_time},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_date",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{date:req.query.date},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_day",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{day:req.query.day},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_time",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{time:req.query.time},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/test",async(req,res)=>{
  try{
    const t = "[1,2,3,4]"
    res.send(JSON.parse(t));
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;