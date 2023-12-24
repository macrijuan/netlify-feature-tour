const {Router}=require("express");
const router = Router();
const {errJSON, notFound, unknown}=require("../../../error");
const {Table}=require("../../../../db");
const { getMany }=require("../../../routeFormatter")

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

router.get("/get_tables",async(req,res)=>{ //GOTA UPDATE THIS ROUTE TO MAKE FILTERS WORK. UPDATE TABLE VALIDATORS.
  try{
    await getMany(Table, req.query, res, "Tables");
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

module.exports.handler = router;