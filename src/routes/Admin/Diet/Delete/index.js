const {Router} = require("express");
const router = Router();
const {Diet}=require("../../../../db");
const{getMany}=require("../../../routeFormatter");
const { notFound, unknown } = require("../../../error");

router.delete("/delete_diet/:id", async(req,res)=>{
  try{
    Diet.findByPk(req.params.id)
    .then(diet=>{
      if(diet){
        diet.destroy({force:true}).then(async ()=>{await getMany(Diet, req.query, res, "Diets");});
      }else{
        res.status(404).json({errors:{not_found:notFound("Diet")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;