const { JSON, BOOLEAN, STRING } = require("sequelize");
const { jsonValidator }=require("../models_validations").handler;

module.exports.handler = (sequelize) => {
  return sequelize.define('option', {
    model:{
      type:STRING,
      allowNull:false,
      validate:{
        len:[1,30]
      }
    },
    gettable:{
      type:JSON,
      validate:{
        isCorrectJSON:function(value){jsonValidator(value)}
      }
    },
    updatable:{
      type:JSON,
      validate:{
        isCorrectJSON:function(value){jsonValidator(value)}
      }
    },
    deleteable:{
      type: BOOLEAN
    }
  },{
    timestamps:false
  });
};