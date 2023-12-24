const {Router}=require("express");
const router = Router();
const{nameValidator, ingredientsValidator, dietsValidator, descriptionValidator, imageValidator, priceValidator}=require("../../validation");

router.use((req,res,next)=>{
  res.locals.errors = {};
  Object.keys(req.body).forEach(prop=>{
    switch(true){
      case typeof req.body[prop] === "object" && Array.isArray(req.body[prop].data):
        req.body[prop].data=req.body[prop].data.map(data=>data.toLowerCase());
      break;
      case typeof req.body[prop]==="string":
        req.body[prop]=req.body[prop].toLowerCase();
      break;
    };
  });
	nameValidator(req.body.name, res.locals.errors);
	ingredientsValidator(req.body.ingredients, res.locals.errors);
  console.log(res.locals.errors);
	dietsValidator(req.body.diets, res.locals.errors);
	descriptionValidator(req.body.description, res.locals.errors);
  req.body.price = Number(req.body.price);
	priceValidator(req.body.price, res.locals.errors);
	imageValidator(req.body.image, res.locals.errors);
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors, post:true});
  }else{
    next();
  };
});

module.exports = router;