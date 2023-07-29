function format(){
  var str = $("#original_text").val(),j;
  try{j = JSON.stringify(JSON.parse(de_json(str)),null,2);
  document.querySelector("#result_output").innerHTML=j
  }catch(e){alert('错误信息\n'+e)}
}
function compress(){
  var str = $("#original_text").val(),j;
  try{j = JSON.stringify(JSON.parse(de_json(str)),null,0).replace(/\s/g,'');
  document.querySelector("#result_output").innerHTML=j
  }catch(e){alert('错误信息\n'+e)}
}
function escapedStr(){
  var str = $("#original_text").val(),
  j = JSON.stringify(de_json(str)).replace(/^"(.*)"$/,'$1');
  document.querySelector("#result_output").innerHTML=j
}
function unescapedStr(){
  var str = $("#original_text").val(),
  j = str.replace(/\\"/g,'"').replace(/\\([bfnrtv\\/]|u[0-9a-fA-F]{4})/g,'$1');
  document.querySelector("#result_output").innerHTML=j
}
function toUnicode(){
  var str = $("#original_text").val();
  document.querySelector("#result_output").innerHTML=jsonToUnicode(str)
}
function unicodeToStr(){
  var str = $("#original_text").val();
  document.querySelector("#result_output").innerHTML=str.replace(/\\\\u/,'').replace(/\\(u[0-9a-fA-F]{4})/g,function(s){return de_unicode(s)}).replace(//,'\\u')
}
const jsonToUnicode = jsonString => {
  const obj = JSON.parse(jsonString);
  
  const convert = obj => {
    if (typeof obj === "string") {
      return en_unicode(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(item => convert(item));
    } else if (typeof obj === "object" && obj !== null) {
      var newObj = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var unicodeKey = en_unicode(key);
          newObj[unicodeKey] = convert(obj[key]);
        }
      }
      return newObj;
    } else {
      return obj;
    }
  }

  return JSON.stringify(convert(obj)).replace(/\\([bfnrtv\\/]|u[0-9a-fA-F]{4})/g,'$1');
}

function de_json(str){
  const startIndex = str.indexOf("{");
  let bracketCount = 0;
  let endIndex = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === "{") {
      bracketCount++;
    } else if (str[i] === "}") {
      bracketCount--;
    }
    if (bracketCount === 0 && i > startIndex) {
      endIndex = i;
      break;
    }
  }
  return str.substring(startIndex, endIndex + 1);
}

const en_unicode = str => {
  var rs = "";
  for (var i = 0; i < str.length; i++) {
      //补零。不补有些库无法正常解析。保持4位
      //slice负数参数，与其方向相反。start=-1为最后一个元素，end=-1为第一个元素。start必须
      rs += "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return rs;
}
function de_unicode(str) {
  var strArray = str.split("\\u");
  //防止\u开头或结尾，导致解析空串产生的“□”的结果
  if (str.startsWith("\\u")) {
      strArray = strArray.slice(1, strArray.length);
  }
  if (str.endsWith("\\u")) {
      strArray = strArray.slice(0, strArray.length - 1);
  }

  var rs = "";
  for (var i = 0; i < strArray.length; i++) {
      rs += String.fromCharCode(parseInt(strArray[i], 16));
  }
  return rs;
}