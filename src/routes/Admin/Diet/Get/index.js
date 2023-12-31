const {Router} = require("express");
const router = Router();
const {Diet}=require("../../../../db.js").handler;
const { notFound, unknown } = require("../../../error.js").handler;
const { getMany } = require("../../../routeFormatter.js").handler;

router.get("/get_diets", async(req,res)=>{
  try{
    await getMany(Diet, req.query, res, "Diets");
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  }
});

router.get("/get_diet/:id", async(req,res)=>{
  try{
    Diet.findByPk(req.params.id)
    .then(diet=>{
      if(diet){
        res.json(diet);
      }else{
        res.status(404).json({errors:{not_found:notFound("Diet")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  }
});

router.get("/test", async(req,res)=>{
  try{
    Diet.findAll({attributes:{exclude:["options"]}, include:{model:Dish, attributes:{exclude:["options"]}}})
    .then(resr=>{
      res.send(resr);
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;