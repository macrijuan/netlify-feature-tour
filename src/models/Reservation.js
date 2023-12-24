const {timeValidator}=require("../models_validations");
const {STRING, INTEGER, UUID, UUIDV4, TIME, BOOLEAN, DATE, ENUM, DATEONLY, ARRAY, VIRTUAL, INET}=require("sequelize");
const { yearValidator } = require("../routes/Public/Reservation/validation").handler;
module.exports.handler = (sequelize)=>{
  sequelize.define("reservation",{
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
      allowNull:false
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