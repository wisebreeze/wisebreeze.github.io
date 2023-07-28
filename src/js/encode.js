function str_to_base64() {
  str = $("#original_text").val();
  base64_var = encodeURI(str);
  base64_var = btoa(base64_var);
  $("#result_output").html(base64_var);
}
function base64_to_str() {
  str = $("#original_text").val();
  def_var = atob(str);
  def_var = decodeURI(def_var);
  $("#result_output").html(def_var);
}
// 摩斯电码
function str_to_morse() {
  str = $("#original_text").val();
  $("#result_output").html(en_morse(str));
}
function morse_to_str() {
  str = $("#original_text").val();
  $("#result_output").html(de_morse(str));
}
function en_morse(str) {
  const a = {'A': '.- ', 'B': '-... ', 'C': '-.-. ', 'D': '-.. ', 'E': '. ', 'F': '..-. ', 'G': '--. ', 'H': '.... ', 'I': '.. ', 'J': '.--- ', 'K': '-.- ', 'L': '.-.. ', 'M': '-- ', 'N': '-. ', 'O': '--- ', 'P': '.--. ', 'Q': '--.- ', 'R': '.-. ', 'S': '... ', 'T': '- ', 'U': '..- ', 'V': '...- ', 'W': '.-- ', 'X': '-..- ', 'Y': '-.-- ', 'Z': '--.. ', '1': '.---- ', '2': '..--- ', '3': '...-- ', '4': '....- ', '5': '..... ', '6': '-.... ', '7': '--... ', '8': '---.. ', '9': '----. ', '0': '----- ', ' ': '/'};
  const b = str.toUpperCase().split('');
  const c = b.map((d) => (a[d] || d));
  return c.join('').trim();
}
function de_morse(code) {
  const a = {'.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0', '/': ' '};
  const b = code.split(' ');
  const c = b.map((char) => a[char] || char);
  return c.join('');
}
// Hex
function str_to_hex() {
  str = $("#original_text").val();
  $("#result_output").html(en_hex(str));
}
function hex_to_str() {
  str = $("#original_text").val();
  $("#result_output").html(de_hex(str));
}
function en_hex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}
function de_hex(hex) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
// UTF-8
function str_to_utf8() {
  str = $("#original_text").val();
  $("#result_output").html(en_utf8(str));
}
function utf8_to_str() {
  str = $("#original_text").val();
  $("#result_output").html(de_utf8(str));
}
function en_utf8(str){
	var bytes = new Array(); 
	var len,c;
	len = str.length;
	for(var i = 0; i < len; i++){
		c = str.charCodeAt(i);
		if(c >= 0x010000 && c <= 0x10FFFF){
			bytes.push(((c >> 18) & 0x07) | 0xF0);
			bytes.push(((c >> 12) & 0x3F) | 0x80);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		}else if(c >= 0x000800 && c <= 0x00FFFF){
			bytes.push(((c >> 12) & 0x0F) | 0xE0);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		}else if(c >= 0x000080 && c <= 0x0007FF){
			bytes.push(((c >> 6) & 0x1F) | 0xC0);
			bytes.push((c & 0x3F) | 0x80);
		}else{
			bytes.push(c & 0xFF);
		}
	}
	return `[${bytes.toString()}]`
}
function de_utf8(array) {
  array = JSON.parse(array);
  var str, i, len, c;
  var char2, char3;
  str = "";
  len = array.length;
  i = 0;
  while(i < len) {
  c = array[i++];
  switch(c >> 4)
  { 
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      str += String.fromCharCode(c);
      break;
    case 12: case 13:
      char2 = array[i++];
      str += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      char2 = array[i++];
      char3 = array[i++];
      str += String.fromCharCode(((c & 0x0F) << 12) |
       ((char2 & 0x3F) << 6) |
       ((char3 & 0x3F) << 0));
      break;
    }
  }
  return str
}
// unicode
function str_to_unicode() {
  str = $("#original_text").val();
  $("#result_output").html(en_unicode(str));
}
function utf8_to_unicode() {
  str = $("#original_text").val();
  $("#result_output").html(de_unicode(str));
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
// 哈希函数
function str_to_hash() {
  const str = $("#original_text").val();
  hashString(str).then(hashedText => {
    $("#result_output").html(hashedText);
  });
}
function hashString(str) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
    .then(digestBuffer => Array.from(new Uint8Array(digestBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join(''));
}