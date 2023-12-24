const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../../db").handler;
const {unknown, existing, errJSON}=require("../../../../error").handler;

router.use(async (req,res,next)=>{
  try{
    Inventory.findOne({
      where:{name:req.body.name}
    }).then(element=>{
      if(element){
        res.status(409).json({ errors:{ name:[ existing( "inventory's element" ) ] }, post:true } );
      }else{
        next();
      };
    });
  }catch(err){
    console.log(err)
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;