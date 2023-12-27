const {INTEGER, TIME, BOOLEAN,}=require("sequelize");
const { yearValidator } = require("../models_validations").handler;
module.exports.handler = (sequelize)=>{
  return sequelize.define("reservation",{
    ticket:{
      // type:UUID,
      type:INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull: false,
      // defaultValue:UUIDV4
    },
    year:{
      type: INTEGER,
      allowNull:false,
      validate:{
        yearValidation: function(value){yearValidator(value);}
      }
    },
    month:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:12, min:1
      }
    },
    day:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:31, min:1
      }
    },
    time: {
      type: TIME,
      allowNull:false,
    },
    expired:{
      type: BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    deletion_code:{
      type: INTEGER,
    }
  },
  {
    timestamps:false
  });
};