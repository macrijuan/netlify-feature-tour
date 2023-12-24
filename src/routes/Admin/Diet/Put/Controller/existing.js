const {Router}=require("express");
const router = Router();
const{Diet}=require("../../../../../db");
const {existingFor, equalToCurent}=require("../../../../error");
const {dobleSpaceEraser}=require("../../../../../formatter");

router.use(async(req,res,next)=>{
  if(req.body.name){
    Diet.findOne({
      where:{name:req.body.name}
    }).then(diet=>{
      if(diet){
        if(diet.id == res.locals.params.id){
          if(diet.name===dobleSpaceEraser(req.body.name))res.locals.errors.name=[equalToCurent("name")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({errors:res.locals.errors, update:true});
          };
        }else{
          if(diet.name===req.body.name)res.locals.errors.name=[existingFor("name","diet")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({errors:res.locals.errors, update:true});
          };
        };
      }else{
        next();
      };
    });
  }else{
    next();
  };
});

module.exports.handler= router;