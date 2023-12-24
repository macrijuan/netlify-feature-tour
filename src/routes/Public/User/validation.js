//Password test
const specChars = /^[@$!%*?&]{1,32}$/;//test 1
const lowercase = /^[a-zà-ÿ]{1,32}$/;//test 2
const uppercase = /^[A-ZÀ-Ý]{1,32}$/;//test 3
const number = /^[\d]{1,32}$/;//test 4

const nameFormat = /^[a-zà-ÿA-ZÀ-Ý ]*$/;

const {wrongCharType, wrongLengthBetween, wrongDataType, isMandatory, atLeastOne, cantContain} = require("../../error");

//EVERY FUNCTION HERE SETS res.locals.errors arrays.

function emailValidator(email, routeErrors){
  console.log(email)
  routeErrors.email = [];
  if(!email || !email.length){routeErrors.email.push(isMandatory("email"));return;};
  if(email.length<7) routeErrors.email.push("Email is too short.");
  if(email.length>254) routeErrors.email.push("Email is too long.");
  if(email.split("").includes(" ")) routeErrors.email.push(cantContain("email", "spaces"));
  if(!routeErrors.email.length)delete routeErrors.email;
};

function passwordValidator (password, routeErrors, approved){
  console.log(password)
  routeErrors.password = [];
  if(!password || !password.length){routeErrors.password.push(isMandatory("password"));return;};
  password.split("").forEach(e=>{
    if(specChars.test(e)&&!approved.includes(1)){approved.push(1)};
    if(lowercase.test(e)&&!approved.includes(2)){approved.push(2)};
    if(uppercase.test(e)&&!approved.includes(3)){approved.push(3)};
    if(number.test(e)&&!approved.includes(4)){approved.push(4)};
  });
  if (!approved.includes(1))routeErrors.password.push(atLeastOne("password", "of the following special characters inside the brackets (brackets not included) [ @ $ ! % * ? & ]"));
  if (!approved.includes(2))routeErrors.password.push(atLeastOne("password", "lowercase letter"));
  if (!approved.includes(3))routeErrors.password.push(atLeastOne("password", "uppercase letter"));
  if (!approved.includes(4))routeErrors.password.push(atLeastOne("password", "number"));
  if (password.length<8 || password.length>35)routeErrors.password.push(wrongLengthBetween("password", 8, 35));
  if (password.split("").includes(" "))routeErrors.password.push(cantContain("password", "spaces"));
  if(!routeErrors.password.length)delete routeErrors.password;
};

function namesValidator(name, routeErrors, dataName){
  console.log(name);
  routeErrors[dataName.replace(" ", "_")] = [];
  if(!name || !name.length){
    routeErrors[dataName.replace(" ", "_")].push(isMandatory(`${dataName}`));
  }else{
    if(name.length<2 || name.length>35) {routeErrors[dataName.replace(" ", "_")].push(wrongLengthBetween(`${dataName}`, 2, 35));}
    if(!nameFormat.test(name)) routeErrors[dataName.replace(" ", "_")].push(wrongCharType(`${dataName}`, "letters and spaces"));
  };
  if(!routeErrors[dataName.replace(" ", "_")].length)delete routeErrors[dataName.replace(" ", "_")];
};


module.exports = {
  emailValidator,
  passwordValidator,
  namesValidator
};