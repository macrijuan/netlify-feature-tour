const {Router}=require("express");
const router = Router();
const format = require("./Controller/format").handler;
const existing = require("./Controller/existing").handler;
const {Inventory}=require("../../../../db").handler;
const {getMany}=require("../../../routeFormatter").handler;
const {unknown}=require("../../../error").handler;

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