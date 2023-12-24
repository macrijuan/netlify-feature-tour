const {Router}=require("express");
const router = Router();
const {errJSON, notFound, unknown}=require("../../../error").handler;
const {Table}=require("../../../../db").handler;
const { getMany }=require("../../../routeFormatter").handler

router.get("/get_table/:id",async(req,res)=>{
  try{
    Table.findByPk(req.params.id)
    .then(table=>{
      if(table){
        res.json(table);
      }else res.status(404).json(errJSON("not_found", notFound("Table")));
    });
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

router.get("/get_tables",async(req,res)=>{
  try{
    await getMany(Table, req.query, res, "Tables");
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

module.exports.handler = router;