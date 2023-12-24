const { STRING, ENUM, JSON } = require('sequelize');
const { setUpdatable }=require("../formatter");

module.exports = (sequelize) => {
  sequelize.define('admin_deleted', {
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
    status:{
      type:ENUM("active", "suspended", "quitted", "fired"),
      allowNull:false,
      defaultValue:"active"
    },
    updatable:{
      type:JSON,
      defaultValue: {"status":["active", "suspended", "quitted", "fired"]},
      set(value){
        this.setDataValue("updatable", setUpdatable(value, this.rawAttributes.updatable.defaultValue));
      }
    }
  },{
    timestamps:false
  });
};