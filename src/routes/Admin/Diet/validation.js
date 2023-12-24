function dietNameValidator(name, errors){
  errors.name=[];
	if(typeof name !== "string"){
    errors.name=["Wrong data type."];
	}else{
    if(name.length<3 || name.length>30){errors.name=["The diet's name must contain between 3 and 30 characters."];return;};
	};
  if(!errors.name.length)delete errors.name;
};

function dietDescValidator(description, errors){
  errors.description=[];
	if(typeof description !== "string"){
		errors.description=["Wrong data type."];
	}else{
		if(description&&description.length>100){errors.description=["The description can't be longer than 100 characters."];return;};
	};
  if(!errors.description.length)delete errors.description;
};

module.exports.handler={
	dietNameValidator,
	dietDescValidator
};