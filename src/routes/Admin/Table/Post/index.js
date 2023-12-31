const {Router}=require("express");
const router=Router();
const format = require("../Controller/format").handler;
const existing = require("../Controller/existing").handler;
const {Table} = require("../../../../db").handler;
const {getMany}=require("../../../routeFormatter").handler;
const {errJSON, unknown}=require("../../../error").handler;


router.post("/post_table",
  format,
  existing,
  async(req,res)=>{   
  try{
    Table.create({name:req.body.name, sits:req.body.sits, sector:req.body.sector})
    .then(async table=>{
      if(req.query.single){
        res.json(table);
      }else{
        await getMany(Table, req.query, res, "Tables");
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler = router;