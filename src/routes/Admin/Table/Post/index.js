const {Router}=require("express");
const router=Router();
const format = require("../Controller/format");
const existing = require("../Controller/existing");
const {Table} = require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {errJSON, unknown}=require("../../../error");


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

module.exports=router;