const {Router} = require("express");
const router = Router();
const searchFormat = require("./Controller/format.js");
const {Diet}=require("../../../../db.js").handler;
const {Op}=require("sequelize");
const { notFound, unknown } = require("../../../error.js").handler;

router.get("/get_diets", async(req,res)=>{
  try{
    Diet.findAndCountAll({limit:req.query.perPage, offset:req.query.index, attributes:{exclude:["updatable"]}})
    .then(diets=>{
      if(diets&&diets.rows.length){
        ;res.json(diets);
      }else{
        res.status(404).json({errors:{not_found:notFound("Diets")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  }
});

router.get("/get_diet/:id", async(req,res)=>{
  try{
    Diet.findByPk(req.params.id)
    .then(diet=>{
      if(diet){
        delete diet.dataValues.updatable;
        res.json(diet);
      }else{
        res.status(404).json({errors:{not_found:notFound("Diet")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  }
});

router.get("/get_by_name", searchFormat, async(req,res)=>{
  try{
    req.query.name=req.query.name.toLowerCase()
    Diet.findAndCountAll({
      where:{
        name:{[Op.substring]:`${req.query.name}`}
      },
      attributes:{exclude:["updatable"]},
      limit:req.query.perPage, offset:req.query.index
    })
    .then(diets=>{
      if(diets&&diets.rows.length){
        res.json(diets);
      }else{
        res.status(404).json({errors:{not_found:notFound("Diets")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/test", async(req,res)=>{
  try{
    Diet.findAll({attributes:{exclude:["updatable"]}}).then(resr=>{setUpdatables(resr);res.send(resr);});
    
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;