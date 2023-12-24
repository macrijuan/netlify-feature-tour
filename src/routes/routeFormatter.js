const { errJSON, notFound, unknown } = require("./error");
const {Option}=require("../db");
const {Op}=require("sequelize");

async function setOptions(data, model){
  if(typeof data === "object" && !Array.isArray(data)){
    return Option.findOne({where:{model:model}, attributes:{exclude:["id", "model"]}})
    .then(opt=>{
      data.options=opt;
    });
  }else{
    throw new Error("routeFormatter --> setOptions --> the function formats objects only.");
  };
};

function relationGetter(model, exclude, res ){
  res.locals.data = { 
    include:[ 
      {
        model, 
        attributes:{ exclude:exclude },
        through:{ attributes:[] }
      } 
    ],
    distinct:true 
  };
};

async function getMany(Model, query, res, notFoundData){

  if(!res.locals.data)res.locals.data={};
  res.locals.data={
    ...res.locals.data,
    attributes:{...res.locals.data.attributes},
    limit:(query.perPage || 12),
    offset:(query.index || 0)
  };
  
  const queries = Object.keys(query).filter(prop=>(prop!=="perPage" && prop!=="index" && prop !=="options"));
  if(queries.length){
    if(!res.locals.data.where)res.locals.data.where={};
    queries.forEach(prop=>{
      if(!res.ignore){
        switch(Model.getAttributes()[prop].type.constructor.key){
          case "ARRAY": res.locals.data.where[prop]={ ...res.locals.data.where[prop], [Op.contains]:JSON.parse( query.ingredients ).data };
          break;
          case "STRING": res.locals.data.where[prop]={ ...res.locals.data.where[prop], [Op.substring]:query[prop] };
          break;
          default: res.locals.data.where[prop]=query[prop];
        };
      };
    });
  };
  Model.findAndCountAll(res.locals.data)
  .then(_data=>{
    if(_data&&_data.rows.length){
      if(Model.name==="dish"){
        for(let a = 0; a<_data.rows.length; a++){
          _data.rows[a] = _data.rows[a].get({plain:true});
          _data.rows[a].diets = _data.rows[a].diets.map(diet=>diet.name);
        };
      };
      if(query.options==="t"){
        Option.findOne({
          where:{ model:Model.tableName.replace( Model.tableName[0], Model.tableName[0].toUpperCase()) },
          attributes:{ exclude:[ "id", "model" ] }
        }).then(opt=>{
          if(opt){
            _data.options=opt;
            res.json(_data);
          }else{
            res.status(500).json( errJSON( "unknown", unknown ) );
          };
        });
      }else{
        res.json(_data); 
      };
    }else{
      res.status(404).json(errJSON("not_found", notFound(notFoundData)));
    };
  });
};

module.exports = {
  setOptions,
  relationGetter,
  getMany
};