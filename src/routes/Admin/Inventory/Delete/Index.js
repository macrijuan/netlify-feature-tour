const { Router }=require("express");
const router = Router();
const { Inventory }=require("../../../../db");
const { getMany }=require("../../../routeFormatter");
const { unknown, errJSON, notFound }=require("../../../error");

router.delete("/delete_inventory/:id",
  async (req,res)=>{
    try{
      Inventory.findByPk(req.params.id)
      .then(async inventory=>{
        if(inventory){
          inventory.destroy({force:true})
          .then(async ()=>{
            await getMany(Inventory, req.query, res, "Inventory's elements");
          });
        }else res.json(errJSON("not_found", notFound("Inventory's element")));
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
  }
);

module.exports = router;