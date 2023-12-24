const {wrongLengthBetween, wrongNumberSize, isMandatory, wrongCharType} = require("../../error");

function tableNameValidation(name, errors){
  errors.name=[];
  if(typeof name !== "string" || !name){errors.name.push(isMandatory("name"));return;};
  if(!(name.length>1&&name.length<30))errors.name.push(wrongLengthBetween("table name", 1, 30));
  if(!errors.name.length)delete errors.name;
};

function sitsValidation(sits, errors){
  errors.sits=[];
  if(typeof sits !== "number" || sits===NaN){errors.sits.push(isMandatory("sits"));return;};
  if(sits<1 || sits>20)errors.sits.push(wrongNumberSize("sits", 0, 21));
  if(!errors.sits.length)delete errors.sits;
};

function sectorValidation(sector, errors){
  errors.sector=[];
  if(typeof sector !== "string"){errors.sector.push(isMandatory("sector"));return;};
  if(!(sector.length>=1&&sector.length<=30))errors.sector.push(wrongLengthBetween("sector", 1, 30));
  if(!errors.sector.length)delete errors.sector;
};

module.exports={
  tableNameValidation,
  sitsValidation,
  sectorValidation
};