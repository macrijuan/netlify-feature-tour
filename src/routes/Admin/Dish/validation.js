const { wrongDataType, wrongLengthBetween, wrongLengthBetweenArr, wrongCharType, isMandatory, wrongNumberSize, copyedData } = require("../../error").handler;

//nameValidator --> name=string, errors=arr. || fills errors.name with error messeges if format not allowed.
function nameValidator(name, errors){
  errors.name=[];
  if(!name||typeof name !== "string" || !name.length){errors.name.push(isMandatory("name"));return;};
  if(name.length>30 || name.length<3)  {errors.name=[wrongLengthBetween("name", 3, 30)];};
  if(!errors.name.length)delete errors.name;
};

//ingredientsValidator --> ingrs=array, errors=arr. || fills errors.ingredients with error messeges if format not allowed.
function ingredientsValidator(ingrs, errors, isUpdate){
  errors.ingredients=[];
  if(isUpdate){
    const keys=Object.keys(ingrs);
    if(
      !(typeof ingrs==="object" && Array.isArray(ingrs.data))
        ||
      keys.length!==2 || keys.filter(prop=>!(prop==="method" || prop==="data")).length 
        || 
      !ingrs.data.length
      ){ errors.ingredients.push(isMandatory("Ingredients"));return;};
    let a = 0;
    while(a<ingrs.data.length){
      if(typeof ingrs.data[a] !== "string") {errors.ingredients = [wrongDataType]; return;};
      if(ingrs.data[a].length>30 || ingrs.data[a].length<1) errors.ingredients.push(wrongLengthBetweenArr("ingredient", 2, 30, ingrs.data[a]));
      if(!(/^.[a-zà-ÿ ]{1,30}$/.test(ingrs.data[a]))) errors.ingredients.push(wrongCharType("ingredient", "letters and spaces", ingrs.data[a]));
      if(ingrs.data.filter(e=>e===ingrs.data[a]).length>1)errors.ingredients.push(copyedData(ingrs.data[a]));
      a++;
    };
  }else{
    if(
      !(typeof ingrs==="object" && Array.isArray(ingrs.data))
        || 
      !ingrs.data.length
      ){ errors.ingredients.push(isMandatory("Ingredients"));return;};
    let a = 0;
    while(a<ingrs.data.length){
      if(typeof ingrs.data[a] !== "string") {errors.ingredients = [wrongDataType]; return;};
      if(ingrs.data[a].length>30 || ingrs.data[a].length<1) errors.ingredients.push(wrongLengthBetweenArr("ingredient", 2, 30, ingrs.data[a]));
      if(!(/^.[a-zà-ÿ ]{1,30}$/.test(ingrs.data[a]))) {errors.ingredients.push(wrongCharType("ingredient", "letters and spaces", ingrs.data[a]));}
      if(ingrs.data.filter(e=>e===ingrs.data[a]).length>1)errors.ingredients.push(copyedData(ingrs.data[a]));
      a++;
    };
  };
  if(!errors.ingredients.length)delete errors.ingredients;
};

//dietsValidator --> diets=array, errors=arr. || fills errors.diets with error messeges if format not allowed.
function dietsValidator(diets, errors, isUpdate){
  errors.diets=[];
  const keys = Object.keys(diets);
  if(isUpdate){
    if(
      !(typeof diets==="object" && Array.isArray(diets.data))
        ||
      keys.length!==2 || keys.filter(prop=>!(prop==="method" || prop==="data")).length
        || 
      !diets.data.length
    ){errors.diets.push(isMandatory("diets"));return;};
    let a = 0;
    while(a<diets.data.length){
      if(typeof diets.data[a] !== "string")  {errors.diets.push(wrongDataType); return};
      if(diets.data[a].length>30 || diets.data[a].length<2) errors.diets.push(wrongLengthBetweenArr("diet", 2, 30, diets.data[a]));
      if(!(/^.[a-zà-ÿ]{1,30}$/.test(diets.data[a]))) errors.diets.push(wrongCharType("diet", "letters", diets.data[a]));
      a++;
    };
  }else{
    if(
      !(typeof diets==="object" && Array.isArray(diets.data))
        ||
      keys.length!==1
        || 
      !diets.data.length
    ){errors.diets.push(isMandatory("diets"));return;};
    let a = 0;
    while(a<diets.data.length){
      if(typeof diets.data[a] !== "string")  {errors.diets.push(wrongDataType); return};
      if(diets.data[a].length>30 || diets.data[a].length<2) errors.diets.push(wrongLengthBetweenArr("diet", 2, 30, diets.data[a]));
      if(!(/^.[a-zà-ÿ]{1,30}$/.test(diets.data[a]))) errors.diets.push(wrongCharType("diet", "letters", diets.data[a]));
      a++;
    };
  };
  if(!errors.diets.length)delete errors.diets;
};

//descriptionValidator --> desc=string, errors=arr. || fills errors.description with error messeges if format not allowed.
function descriptionValidator(desc, errors){
  errors.description=[];
  if(typeof desc !== "string") {errors.description.push(isMandatory("description")); return;};
  if(desc.length>500) errors.description.push("The description is too long. 500 character maximum.");
  if(!errors.description.length)delete errors.description;
};

//imageValidator --> image=string, errors=arr. || fills errors.image with error messeges if format not allowed.
function imageValidator(image, errors){
  errors.image=[];
  if(typeof image !== "string") {errors.image.push(isMandatory("image")); return;};
  if(image.length>10000)errors.image.push("The length of the image's path (link) is too long.");
  if(!errors.image.length)delete errors.image;
};

//imageValidator --> image=string, errors=arr. || fills errors.image with error messeges if format not allowed.
function priceValidator(price, errors){
  errors.price=[];
  if(typeof price !== "number" || !price){errors.price.push(isMandatory("price"));return;};
  if(isNaN(price)) {errors.price.push(wrongDataType); return;};
  if(price>100000 || price<0)errors.price.push(wrongNumberSize("price",0,100000));
  if(!errors.price.length)delete errors.price;
};

function tasteValidator(taste, errors){
  errors.taste = [];
  if(
    typeof taste !== "string"
    || !['salty', 'sweet', 'sour', 'bittersweet', 'bitter', 'spicy'].includes(taste)
    ){ errors.taste.push(isMandatory("taste")); return; };
};

module.exports.handler={
  nameValidator,
  ingredientsValidator,
  dietsValidator,
  descriptionValidator,
  imageValidator,
  priceValidator,
  tasteValidator
};