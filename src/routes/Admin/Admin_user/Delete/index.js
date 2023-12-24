const{Router}=require("express");
const router = Router();
const{setAdminAsDeleted}=require("./facilitator.js").handler;
const{Admin}=require("../../../../db").handler;
const {getMany}=require("../../../routeFormatter.js").handler;
const {unknown, notFound, errJSON} = require("../../../error.js").handler;

router.delete("/delete_admin_user/:id",async(req,res)=>{
  try{
    setAdminAsDeleted(req.params.id)//"The administrator user has been deactivated and will be deleted permanently in 15 days."
    .then(async deletionActivated=>{
      if(deletionActivated){
        if(typeof deletionActivated==="string"){
          res.json(errJSON("password", "Incorrect information."));
        }else{
          await getMany(Admin, req.query, res, "Administrator");
        };
      }else{
        res.status(404).json(errJSON("not_found", notFound("Administrator")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports.handler=router;