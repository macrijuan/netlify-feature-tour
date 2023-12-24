const{Router}=require("express");
const router = Router();
const{setAdminAsDeleted}=require("./controller.js");
const error = require("../../../error.js").handler;

router.delete("/delete_user/:id",async(req,res)=>{
  try{
    setAdminAsDeleted(req.params.id)
    .then(deletedUser=>{
      if(deletedUser){
        res.status(200).json({message:`The user ${deletedUser.email} has been deactivated and will be deleted permanently in 15 days.`});
      }else{
        res.status(404).json({errors:{not_found:error.notFound("User")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:error.unknown}});
  };
});

module.exports.handler=router;