const {Router}=require("express");
const router = Router();
const{Dish}=require("../../../../../db");
const{Op}=require("sequelize");
const {existingFor, equalToCurent}=require("../../../../error");
const {dobleSpaceEraser}=require("../../../../../formatter");

router.use(async(req,res,next)=>{
  res.locals.existing={where:{}};
  if(req.body.name)res.locals.existing.where.name=req.body.name;
  if(req.body.image)res.locals.existing.where.image=req.body.image;
  if(Object.keys(res.locals.existing.where).length){
    Dish.findOne({
      where:{
        [Op.or]:Object.keys(res.locals.existing.where).map(prop=>{ return{ [prop]:req.body[prop] } } )
      }
    }).then(dish=>{
      if(dish){
        if(dish.id == res.locals.params.id){
          if(dish.name===dobleSpaceEraser(req.body.name))res.locals.errors.name=[equalToCurent("name")];
          if(dish.image===req.body.image)res.locals.errors.image=[equalToCurent("image")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({ errors:res.locals.errors, update:true });
          };
        }else{
          if(dish.name===req.body.name)res.locals.errors.name=[existingFor("name","dish")];
          if(dish.image===req.body.image)res.locals.errors.image=[existingFor("image","dish")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({ errors:res.locals.errors, update:true });
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

module.exports.handler = router;