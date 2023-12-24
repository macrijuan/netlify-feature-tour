const {Diet}=require("../../../../db").handler;
const error = require("../../../error").handler;

async function existingDiet(dietName){
    return Diet.findOne({where:{name:dietName}})
    .then(res=>{
        if(res)return error.existing("diet");
    });
};

async function postDiet(name, description){
    return Diet.create({name, description})
    .then(res=>res);
};

module.exports.handler = {
    existingDiet,
    postDiet
};