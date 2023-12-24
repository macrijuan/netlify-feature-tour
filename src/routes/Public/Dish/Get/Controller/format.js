const{Router}=require("express");
const router = Router();
const { unknown, errJSON, maxLength}=require("../../../../error");

router.use((req,res,next)=>{
  try{
    res.locals.errors={};
    if(req.query.diets && req.query.diets.length>100)res.locals.errors.diets = "Diets data is too long."
    if(req.query.taste && req.query.taste.length>100)res.locals.errors.taste = "Taste data is too long."
    if(req.query.name && req.query.name.length>100)res.locals.name.taste = "Taste data is too long."
    if(req.query.ingredients && req.query.ingredients.length>100)res.locals.ingredients.taste = "Ingredients data is too long."
    if(Object.keys(res.locals.errors).length){
      res.status(500).json(errJSON("filter", res.locals.errors));
    }else{
      next();
    }
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;