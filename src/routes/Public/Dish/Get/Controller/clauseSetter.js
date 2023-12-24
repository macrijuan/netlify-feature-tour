const{Router}=require("express");
const router = Router();
const {isMandatory, maxLength, unknown}=require("../../../../error");
const {Op}=require("sequelize");

router.use((req,res,next)=>{
  res.locals.dataToMatch = {};
  if(req.query.taste) res.locals.dataToMatch.taste = req.query.taste;
  if(req.query.name) res.locals.dataToMatch.name = {[Op.substring]:req.query.name};
  if(req.query.diets) res.locals.dataToMatch.diets = {[Op.contains]:req.query.diets.split(",")};
  if(req.query.ingredients) res.locals.dataToMatch.ingredients = {[Op.contains]:req.query.ingredients.split(",")};
  console.log(req.query.ingredients)
  next();
});

module.exports = router;