const { INTEGER, STRING, ENUM } = require("sequelize");

module.exports = (sequelize)=>{
  sequelize.define("table",{
    name:{
      type:STRING,
      unique:true,
      allowNull:false,
      validate:{
        len:[1,30]
      },
    },
    sits:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:20,
        min:1
      }
    },
    sector:{
      type:ENUM("A", "I", "F", "VIP"),
      allowNull:false,
      validate:{
        len:[1,30]
      },
      set(value){
        this.setDataValue("sector", value.toUpperCase());
      }
    }
  },
  {
    timestamps:false
  });
};