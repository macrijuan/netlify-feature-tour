const { STRING, INTEGER, ENUM, JSON } = require('sequelize');
const { arrRemover, setUpdatable } = require('../formatter');
module.exports.handler = (sequelize) => {
  sequelize.define('inventory_deleted', {
    // id:{
    //   type: UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: STRING,
      allowNull: false,
      unique:true,
      set(value){
        this.setDataValue("name", value.toLowerCase());
      },
      validate:{
        len:[1, 30]
      }
    },
    quantity:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:100000,
        min:0
      }
    },
    unit:{
      type:ENUM("Kg", "g", "oz", "ton", "lb", "u"),
      allowNull:false
    },
    class:{
      type: ENUM("Vegetal", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"),
      allowNull:false,
    },
    updatable:{
      type:JSON,
      defaultValue:{
        "name":"string",
        "quantity":"number",
        "unit":["Kg", "g", "oz", "ton", "lb", "u"],
        "class":["Vegetal", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"]
      },
      set(value){
        this.setDataValue("updatable", setUpdatable(value,this.rawAttributes.updatable.defaultValue));
      }
    }
  },{
    timestamps:false
  });
};