const {Router}=require("express");
const router = Router();
const {Inventory, Option}=require("../../../../db");
const { unknown, notFound, errJSON }=require("../../../error");
const { getMany }=require("../../../routeFormatter");

router.get("/get_inventory", async (req,res)=>{
  try{
    await getMany(Inventory, req.query, res, "Inventory's elements");
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_inventory/:id", async (req,res)=>{
  try{
    Inventory.findByPk(
      req.params.id,{ 
      attributes:{exclude:["optionId"]},
        include:{
        model:Option,
        attributes:{exclude:["id", "model"]}
      }
    }).then(inventory=>{
      if(inventory){
        res.json(inventory);
      }else{
        res.status(404).json(errJSON( "not_found", notFound( "Inventory's element" ) ) );
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;