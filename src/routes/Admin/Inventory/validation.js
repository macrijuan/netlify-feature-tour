const { Inventory }=require("../../../db");
const {wrongLengthBetween, wrongNumberSize, isMandatory}=require("../../error");

function nameValidator(name, errors){
  errors.name = [];
  if(typeof name !== "string"){
    errors.name.push(isMandatory("name"));return;
  }else{
    if(name.length>30 || name.length<1) errors.name.push(wrongLengthBetween("name", 1, 30));
  };
  if(!errors.name.length)delete errors.name;
};

function quantityValidator(quantity, errors){
  errors.quantity = [];
  if(typeof quantity !== "number" || !quantity){
    errors.quantity.push(isMandatory("quantity"));
  }else{
    if(quantity>100000 || quantity<0) errors.quantity.push(wrongNumberSize("quantity", 0, 100000));
  };
  if(!errors.quantity.length)delete errors.quantity;
};

function unitValidator(unit, errors){
  errors.unit = [];
  if(typeof unit !== "string"){
    errors.unit.push(isMandatory("unit"));
  }else{
    if(!Inventory.getAttributes().unit.values.find(e=>e===unit)) errors.unit.push("The value is not allowed.");
  };
  if(!errors.unit.length)delete errors.unit;
};

function classValidator(class_, errors){
  errors.class = [];
  if(typeof class_ !== "string"){
    errors.class.push(isMandatory("class"));
  }else{
    if(!Inventory.getAttributes().class.values.find(e=>e===class_)) errors.class.push("The value is not allowed.");
  };
  if(!errors.class.length)delete errors.class;
};

module.exports = {
  nameValidator,
  quantityValidator,
  unitValidator,
  classValidator

};