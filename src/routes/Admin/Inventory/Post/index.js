const {Router}=require("express");
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");
const {Inventory}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {unknown}=require("../../../error");

router.post("/post_inventory",
  format,
  existing,
  async (req,res)=>{
    try{
      Inventory.create(req.body)
      .then(async e=>{
        if(req.query.single){
          res.json(e);
        }else{
          await getMany(Inventory, req.query, res, "Inventory's elements");
        };
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
  }
);

module.exports.handler = router;