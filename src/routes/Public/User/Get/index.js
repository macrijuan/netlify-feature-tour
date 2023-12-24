const { Router } = require('express');
const router = Router();
const { User } = require("../../../../db");
const {errJSON, notFound, unknown} = require("../../../error.js");

router.get("/get_users", async(req,res)=>{
  try{
    User.findAndCountAll({
      attributes:{exclude:["password", "updatable"]},
      limit:req.query.perPage, offset:req.query.index
    }).then(users=>{
      if(users.rows.length){
        res.status(200).json(users);
      }else{
        res.status(404).json({errors:{not_found:notFound("Users")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_user/:id", async(req,res)=>{
  try{
    User.findByPk(req.params.id)
    .then(user=>{
      if(user){
        delete user.dataValues.password;
        delete user.dataValues.updatable;
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

router.get("/get_by_email", async(req,res)=>{
  try{
    User.findOne({
      where:{
        email:req.query.email,
      },
      attributes:{exclude:["updatable"]}
    }).then(user=>{
      if(user){
        if(user.password===req.query.password){
          delete user.dataValues.password;
          res.json(user.dataValues);
        }else{
          res.status(403).json(errJSON("password", "Password incorrect."));
        };
      }else res.status(404).json(errJSON("not_found", "There isn't a user registered with this email."));
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;