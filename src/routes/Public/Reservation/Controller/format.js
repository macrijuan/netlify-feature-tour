const {Router}=require("express");
const router = Router();
const { tableValidator, customersValidator, yearValidator, monthValidator, dayValidator, timeValidator, userOwnerValidator }=require("../validation");
const { isMandatory } = require("../../../error");
const { Reservation } = require("../../../../db");

router.use((req,res,next)=>{
  const keys = Object.keys;
  const modelAttrs = keys(Reservation.rawAttributes);
  const wrongAttr = keys(req.body).find(prop=>!modelAttrs.includes(prop));
  if(wrongAttr){
    res.locals.errors = {};
    if(res.locals.update){
      if(req.body.table)tableValidator(req.body.table, res.locals.errors);
      if(req.body.year)yearValidator(req.body.year, res.locals.errors);
      if(req.body.month)monthValidator(req.body.month, res.locals.errors);
      if(req.body.day)dayValidator(req.body.day, res.locals.errors);
      if(req.body.time)timeValidator(req.body.time, res.locals.errors);
    }else{
      tableValidator(req.body.table, res.locals.errors);
      yearValidator(req.body.year, res.locals.errors);
      monthValidator(req.body.month, res.locals.errors);
      dayValidator(req.body.day, res.locals.errors);
      timeValidator(req.body.time, res.locals.errors);
    };
    userOwnerValidator(res.locals.user, res.locals.errors);
    res.locals.date = new Date(`${req.body.year}-${req.body.month}-${req.body.day} ${req.body.time}`);
    const now = Date.now();
    const resrTime = res.locals.date.getTime();
    if(Object.keys(res.locals.errors).length){
      res.status(403).json(res.locals.errors);
    }else{
      if(
        JSON.stringify(res.locals.date) === "null" 
        || ( now + 300000 ) > resrTime 
        || ( resrTime - now ) > 2073600000 
      ) {
        res.status(403).json({ "date":[ isMandatory( "date" ) ] });
      }else{
        next();
      };
    };
  }else{
    res.status(403).json({"date":[isMandatory("date")]});
  };
});

module.exports.handler = router;