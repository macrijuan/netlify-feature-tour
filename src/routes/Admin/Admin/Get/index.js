const { Router }=require("express");
const router = Router();
const { Admin }=require("../../../../db").handler;
const { Op }=require("sequelize");
const { notFound, errJSON }=require("../../../error").handler;
const { getMany }=require("../../../routeFormatter").handler;

router.get("/get_admin_users", async(req,res)=>{
  res.locals.data = {
    attributes:{
      exclude:["password"]
    },
    where:{email:{[Op.notLike]:"superadmin@example.com"}},
  };
  await getMany(Admin, req.query, res, "Administrators");
});

router.get("/get_admin_user/:id", async(req,res)=>{
  Admin.findByPk(req.params.id)
  .then(admin=>{
    if(admin){
      delete admin.dataValues.password;
      res.json(admin.dataValues);
    }else{
      res.status(404).json(errJSON("not_found", notFound("Administrator")));
    };
  });
});

router.get("/login",
async(req,res)=>{
  Admin.findOne({
    where:{
      email:req.query.email
    },
    offset:req.query.index,
    limit:req.query.perPage
  })
  .then(admin=>{
    if(admin){
      if(admin.password===req.query.password){
        delete admin.dataValues.password;
        res.json(admin);
      }else{
        res.status(403).json(errJSON("password", "The password is incorrect."));
      };
    }else{
      res.status(404).json(errJSON("not_found", notFound("Administrator")));
    };
  });
});

module.exports.handler = router;