const {Router}=require("express");
const router = Router();
const {Table}=require("../../../../db").handler;
const {getMany}=require("../../../routeFormatter").handler;
const {errJSON, notFound, unknown}=require("../../../error").handler;

router.delete("/delete_table/:id",async(req,res)=>{
  try{
    Table.findByPk(req.params.id)
    .then(table=>{
      if(table){
        table.destroy({force:true})
        .then(async ()=>{await getMany(Table, req.query, res, "Table");})
      }else res.status(404).json(errJSON("not_found", notFound("Table")));
    });
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

module.exports.handler = router;