const { Router } = require('express');
const router = Router();
const { User } = require("../../../../db");
const {notFound, unknown} = require("../../../error.js");
const { setUpdatables }=require("../../../routeFormatter");

router.get("/user/get_users", async(req,res)=>{
  try{
    User.findAndCountAll({
      attributes:{exclude:["password", "updatable"]},
      limit:req.query.perPage, offset:req.query.index
    })
    .then(users=>{
      if(users.rows.length){
        setUpdatables(users, User); res.status(200).json(users);
      }else{
        res.status(404).json({errors:{not_found:notFound("Users")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/user/get_user/:id", async(req,res)=>{
  try{
    User.findByPk(req.params.id)
    .then(user=>{
      if(user){
        delete user.dataValues.password;
        res.status(200).json(user.dataValues);
      }else{
        res.status(404).json({errors:{not_found:notFound("User")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;