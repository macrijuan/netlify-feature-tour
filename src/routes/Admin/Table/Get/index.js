const {Router}=require("express");
const router = Router();
const {errJSON, notFound, unknown}=require("../../../error");
const {Table}=require("../../../../db");
const { setUpdatables }=require("../../../routeFormatter");

router.get("/get_table/:id",async(req,res)=>{
  try{
    Table.findByPk(req.params.id)
    .then(table=>{
      if(table){
        setUpdatables(table, Table); res.json(table);
      }else res.status(404).json(errJSON("not_found", notFound("Table")));
    });
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

router.get("/get_tables",async(req,res)=>{
  try{
    Table.findAndCountAll({
      offset:req.query.index,
      limit:req.query.perPage,
      attributes:{exclude:["updatable"]},
    }).then(tables=>{
      if(tables.rows&&tables.rows.length){
        setUpdatables(tables, Table); res.json(tables);
      }else res.status(404).json(errJSON("not_found", notFound("Tables")));
    });
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

router.get("/get_by_filter",async(req,res)=>{
  try{
    res.locals.filter = {};
    if(req.query.sits)res.locals.filter.sits=parseInt(req.query.sits);
    if(req.query.sector)res.locals.filter.sector=req.query.sector;
    if(Object.keys(res.locals.filter).length){
      Table.findAndCountAll({
        where:res.locals.filter,
        attributes:{exclude:["updatable"]},
        offset:req.query.index,
        limit:req.query.perPage
      }).then(tables=>{
        if(tables.rows&&tables.rows.length){
          setUpdatables(tables, Table); res.json(tables);
        }else res.status(404).json(errJSON("not_found", notFound("Tables")));
      });
    };
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

module.exports = router;