const {Router}=require("express");
const router=Router();
const{Table}=require("../../../../db");
const { errJSON, unknown } = require("../../../error");

router.use(async(req,res,next)=>{
  if(req.body.name){
    try{
      Table.findOne({where:{name:req.body.name}})
      .then(table=>{
        if(table){
          if(res.locals.update) return res.status(409).json({errors:{name:["This name is already registered."]}, update:true});
          res.status(409).json({errors:{name:["This name is already registered."]}, post:true});
        }else{ 
          next(); 
        };
      });
    }catch(err){
      console.log(err);
      res.status(500).json(errJSON("unknown", unknown));
    };
  }else{ 
    next(); 
  };
});

module.exports.handler=router;