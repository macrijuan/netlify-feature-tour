const { STRING, ENUM } = require('sequelize');

module.exports.handler = (sequelize) => {
  return sequelize.define('admin', {
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
      },
      set(value){
        this.setDataValue("email", value.toLowerCase());
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
        this.setDataValue("first_name", value.toLowerCase());
      },
      get(){
        return this.getDataValue("first_name").toUpperCase()
      },
      validate:{
        len:[2,35]
      }
    },
    last_name:{
      type:STRING,
      allowNull: false,
      set(value){
        this.setDataValue("last_name", value.toLowerCase());
      },
      get(){
        return this.getDataValue("last_name").toUpperCase();
      },
      validate:{
        len:[2,35]
      }
    },
    status:{
      type:ENUM("active", "suspended", "quitted", "fired"),
      allowNull:false,
      defaultValue:"active"
    }
  },{
    timestamps:false
  });
};