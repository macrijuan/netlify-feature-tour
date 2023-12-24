const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../../db");
const {unknown, existing, equalToCurent, errJSON}=require("../../../../error");

router.use(async (req,res, next)=>{
  try{
    if(req.body.name){
      Inventory.findOne({
        where:{name:req.body.name}
      }).then(element=>{
        if(element){
          if(element.id===parseInt(res.locals.params.id)){
            res.json({errors:{ name:[equalToCurent("name")] }, update:true });
          }else{ 
            res.json({errors:{ name:[existing("name")] }, update:true });
          };
        }else{
          next();
        };
      });
    }else next();
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;