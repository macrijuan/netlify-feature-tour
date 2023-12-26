function err( func, msg ){
	throw new Error(`MODELS --> ${func} --> ${msg}`);
};

function arrayValidator(array, dataName, minLen, maxLen){
	if(!array.length){throw new Error(`${dataName}'s array must contain at least one element.`);};
	let a = 0;
	while(a<array.length){
		if(typeof array[a] !== "string") {throw new Error(`The array can only have strings`);};
		if(array[a].length>30 || !array[a].length) {throw new Error(`Array elements must contain between ${minLen} and ${maxLen} characters. Index: ${a}. Element: ${array[a]}`);};
		if(!(/^.[a-zà-ÿ ]{0,30}$/.test(array[a]))) {throw new Error(`Array elements can only contain lowercase letters and spaces. Index element: ${a}. Element: ${array[a]}`);};
		a++;
	};
};

function dateValidatror (date){
	if(!Object.prototype.toString.call(date))throw new Error("Wrong data type. Data is not a date object.");
	if(Date.now()>date)throw new Error("Can't post a passed date.");
	if((date.getTime()-Date.now())>2147483647) throw new Error ("Date is too far from today's one. (28 days max).");
}

function jsonValidator(json, keys, values){
	if( !(typeof json === "object" && !Array.isArray(json)) ) err(jsonValidator.name, "The element is not an object.");
	keys=Object.keys(json);
	values=Object.values(json);
	if(keys.length>30)err(jsonValidator.name, "The object has too many properties.");
	values.forEach(v=>{
		if(typeof v === "string"){
			if(!(v==="string" || v==="array" || v==="number" || v==="time"))err(jsonValidator.name, "String value is not allowed");
		}
		else if(Array.isArray(v)){
			if(v.length>30)err(jsonValidator.name, "The array has too many elements.");
			if(v.find(e=>!(typeof e ==="string")))err(jsonValidator.name, "The arrray can only contain strings");
		}else{
			err( jsonValidator.name, "JSON can only contain one string or array per property.");
		};
	});
};

function yearValidator (year){
  errors.year = [];
  if(
    typeof year !== "number"
    || isNaN(year)
    || year>new Date().getFullYear()+1
  ) err(yearValidator.name, "year doesn't have correct format. Check the yearValidator function.");
};

module.exports.handler={
	arrayValidator,
	dateValidatror,
	jsonValidator,
	yearValidator
};