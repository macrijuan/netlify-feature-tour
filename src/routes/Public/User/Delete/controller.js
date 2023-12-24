const {User, User_deleted}=require("../../../../db");

async function deleteAdmin(pk, email){
  try{
    User_deleted.findOne({
      where:{prev_id:pk, email:email}
    })
    .then(async res=>{
      res.destroy({force:true}).then(async res=>{await res.save()});
    });
  }catch(err){
    console.log(err);
  };
};

async function setAdminAsDeleted(pk){
  try{
    return User.findByPk(pk)
    .then(user=>{
      if(user){
        const {id, email, password, first_name, last_name, status}=user;
        User_deleted.create({prev_id:id, email, password, first_name, last_name, status})
        .then(async ()=>{
          await user.destroy({force:true});
        });
        let endDay=0;      
        const deletionProcess = setInterval(async()=>{
          if(endDay===0){console.log("Deletion process activated.");};
          if(endDay<0){
            endDay++;
          }else{
            deleteAdmin(pk, email)
            .then(()=>{console.log("User deleted.");clearInterval(deletionProcess);});
          };
        },86400000);//
        return user;
      }else{
        return false;
      };
    });
  }catch(err){
    console.log(err);
    return false;
  };
};

module.exports={
  setAdminAsDeleted
};