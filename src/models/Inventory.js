const { STRING, INTEGER, ENUM } = require('sequelize');

module.exports.handler = (sequelize) => {
  return sequelize.define('inventory', {
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
      type:ENUM("kg", "g", "oz", "ton", "lb", "u"),
      allowNull:false
    },
    class:{
      type: ENUM("vegetal", "animal", "mixed", "furniture", "tableware", "dinner set", "other"),
      allowNull:false,
    }
  },{
    timestamps:false
  });
};

// arrRemover(["id"], Object.keys(this.rawAttributes))