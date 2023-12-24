//dobleSpaceEraser recives a string, turns any doble spaces into single one and returns the new string.
function dobleSpaceEraser (str){
  let string = str;
  if(Array.isArray(str)){
    string.forEach(e=>{
      while(e.split("  ").length>1){
        e = e.replace("  ", " ");
      };
    });
  }else{
    while(string.split("  ").length>1){
      string = string.replace("  ", " ");
    };
  };
  return string;
};

function nameFormatter (string){
  let str = string;
  str = str.toLowerCase();
  str = str.replace(str[0], str[0].toUpperCase());
  return str;
};

function setValue(value, data){
  value=data;
  return value;
};

function arrRemover(data, arr){
  for(let a=0;a<arr.length;a++){
    for(let b = 0; b<data.length; b++){
      if(arr[a]===data[b])arr.splice(a, 1);
    };
  };
  return arr;
};

module.exports = {
  dobleSpaceEraser,
  nameFormatter,
  setValue,
  arrRemover
};