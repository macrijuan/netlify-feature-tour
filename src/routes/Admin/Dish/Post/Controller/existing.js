const {Router}=require("express");
const router = Router();
const{Dish}=require("../../../../../db");
const{Op}=require("sequelize");
const {existingFor}=require("../../../../error");

router.use(async(req,res,next)=>{
  // console.log(req.body.name);
  Dish.findOne({
    where:{
      [Op.or]:[{name:req.body.name}, {image:req.body.image}]
    }
  })
  .then(dish=>{
    if(dish){
      if(dish.name===req.body.name)res.locals.errors.name=[existingFor("name","dish")];
      if(dish.image===req.body.image)res.locals.errors.image=[existingFor("image","dish")];
      if(Object.keys(res.locals.errors).length){
        res.status(409).json({ errors:res.locals.errors, post:true });
      };
    }else{
      next();
    };
  });
});

module.exports.handler = router;