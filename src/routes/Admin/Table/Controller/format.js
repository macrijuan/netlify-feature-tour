const {Router}=require("express");
const router=Router();
const {errJSON, unknown}=require("../../../error").handler;
const {tableNameValidation, sitsValidation, sectorValidation}= require("../validation").handler;

router.use(async(req,res,next)=>{
  try{
    Object.keys(req.body).forEach(prop=>{
      req.body[prop]=req.body[prop].toLowerCase();
    });
    res.locals.errors = {};
    if(res.locals.update){
      if(req.body.hasOwnProperty("name"))tableNameValidation(req.body.name, res.locals.errors);
      if(req.body.hasOwnProperty("sits")){
        req.body.sits = Number(req.body.sits);
        sitsValidation(req.body.sits, res.locals.errors);
      };
      if(req.body.hasOwnProperty("sector"))sectorValidation(req.body.sector, res.locals.errors);
    }else{
      tableNameValidation(req.body.name, res.locals.errors);
      req.body.sits = Number(req.body.sits);
      sitsValidation(req.body.sits, res.locals.errors);
      sectorValidation(req.body.sector, res.locals.errors);
    };
    if(Object.keys(res.locals.errors).length){
      if(res.locals.update) return res.status(403).json({errors:res.locals.errors, update:true});
      res.status(403).json({errors:res.locals.errors, post:true});
    }else next();
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler=router;