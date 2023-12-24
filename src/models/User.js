const { STRING, BOOLEAN, ARRAY } = require('sequelize');
const {setValue}=require("../formatter");
module.exports.handler = (sequelize) => {
  sequelize.define('user', {
    // id:{
    //   type: UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    email:{
      type:STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:true,
        len:[7,254]
      }
    },
    password:{
      type:STRING,
      allowNull: false,
      validate:{
        len:[8,35]
      }
    },
    first_name: {
      type: STRING,
      allowNull: false,
      set(value){
        this.setDataValue("first_name", value.toUpperCase());
      },
      validate:{
        len:[2,35]
      }
    },
    last_name:{
      type:STRING,
      allowNull: false,
      set(value){
        this.setDataValue("last_name", value.toUpperCase());
      },
      validate:{
        len:[2,35]
      }
    },
    banned:{
      type:BOOLEAN,
      allowNull:false,
      defaultValue: false
    }
  },{
    timestamps:false
  });
};