const {Router}=require("express");
const router = Router();
const {errJSON} = require("../../../../error");
require("dotenv").config();
const {SUPERADMIN}=process.env;

router.use((req,res,next)=>{
  if(!(res.locals.auth===SUPERADMIN)){
    console.log("UNAUTH", res.locals.auth, SUPERADMIN);
    res.status(409).json(errJSON("authorization", "User unauthorized."));
  }else{
    next();
  };
});

module.exports.handler=router;