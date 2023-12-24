const { wrongNumberSize, isMandatory }=require("../../error");

function tableValidator (table, errors){
  errors.table = [];
  if(
    typeof table !== "number"
    || (table>999 || table<1)
  )errors.table.push(isMandatory("table"));
  if(!errors.table.length)delete errors.table;
};

function customersValidator (customers, errors){
  errors.customers = [];
  if(typeof customers !== "number"){errors.customers.push(wrongDataType);return};
  if(!(customers>1&&customers<4)) errors.customers.push(wrongNumberSize("quantity of customers", 1, 4));
  if(!errors.customers.length)delete errors.customers;
};

function yearValidator (year, errors){
  errors.year = [];
  if(
    typeof year !== "number"
    || isNaN(year)
    || year>new Date().getFullYear()+1
  ) errors.year.push(isMandatory("year"));
  if(!errors.year.length)delete errors.year;
};

function monthValidator (month, errors){
  errors.month = [];
  if(
    typeof month !== "number"
    || isNaN(month) 
    || (month>12 || month<1)
  ) errors.month.push(isMandatory("month"));
  if(!errors.month.length)delete errors.month;
}; 

function dayValidator (day, errors){
  errors.day = [];
  if(
    typeof day !== "number"
    || isNaN(day)
    || (day>31 || day<1)
  ) errors.day.push(isMandatory("day"));
  if(!errors.day.length)delete errors.day;
};

function timeValidator( time, errors ){
  errors.time=[];
  if( typeof time === "string" && time.length === 5 ){
    const timeFormat = time.split(":");
    if(
      timeFormat.length !== 2
      || timeFormat.filter( n=>!(/^[\d]{2}$/).test(n) ).length
    )errors.time.push(isMandatory("time"));
  }else{
    errors.time.push(isMandatory("time"));
  };
  if(!errors.time.length)delete errors.time;
};

function userOwnerValidator (user, errors){
  errors.user = [];
  if(!user) errors.user.push(isMandatory("user owner of the ticket"));
  if(!errors.user.length)delete errors.user;
};

module.exports.handler = {
  tableValidator,
  customersValidator,
  yearValidator,
  monthValidator,
  dayValidator,
  timeValidator,
  userOwnerValidator
};