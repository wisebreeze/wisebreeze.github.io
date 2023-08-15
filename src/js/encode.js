// base64
function str_to_base64(){document.getElementById("result_output").innerHTML=btoa(encodeURI(document.getElementById("original_text").value))}
function base64_to_str(){document.getElementById("result_output").innerHTML=decodeURI(atob(document.getElementById("original_text").value))}
// 摩斯电码
function str_to_morse(){document.getElementById("result_output").innerHTML=en_morse(document.getElementById("original_text").value)}
function morse_to_str(){document.getElementById("result_output").innerHTML=de_morse(document.getElementById("original_text").value)}
function en_morse(str){const a={'A':'.- ','B':'-... ','C':'-.-. ','D':'-.. ','E':'. ','F':'..-. ','G':'--. ','H':'.... ','I':'.. ','J':'.--- ','K':'-.- ','L':'.-.. ','M':'-- ','N':'-. ','O':'--- ','P':'.--. ','Q':'--.- ','R':'.-. ','S':'... ','T':'- ','U':'..- ','V':'...- ','W':'.-- ','X':'-..- ','Y':'-.-- ','Z':'--.. ','1':'.---- ','2':'..--- ','3':'...-- ','4':'....- ','5':'..... ','6':'-.... ','7':'--... ','8':'---.. ','9':'----. ','0':'----- ',' ':'/'};return str.toUpperCase().split('').map(d=>(a[d]||d)).join('').trim()}
function de_morse(code){const a={'.-':'A','-...':'B','-.-.':'C','-..':'D','.':'E','..-.':'F','--.':'G','....':'H','..':'I','.---':'J','-.-':'K','.-..':'L','--':'M','-.':'N','---':'O','.--.':'P','--.-':'Q','.-.':'R','...':'S','-':'T','..-':'U','...-':'V','.--':'W','-..-':'X','-.--':'Y','--..':'Z','.----':'1','..---':'2','...--':'3','....-':'4','.....':'5','-....':'6','--...':'7','---..':'8','----.':'9','-----':'0','/': ' '};return code.split(' ').map(char=>a[char]||char).join('')}
// Ascii
function str_to_ascii(){document.getElementById("result_output").innerHTML=en_ascii(document.getElementById("original_text").value)}
function ascii_to_str(){document.getElementById("result_output").innerHTML=de_ascii(document.getElementById("original_text").value)}
function en_ascii(str){var a=[];for(let i=0;i<str.length;i++)a.push(str.charCodeAt(i));return a.join(' ')}
function de_ascii(a){var arr=a.split(' ');for(let i=0;i<arr.length;i++)arr[i]=String.fromCharCode(arr[i]);return arr.join('')}
// Hex
function en_hex(str,r=10,pad=0){var b=[];for(let i=0;i<str.length;i++)b.push(str.charCodeAt(i).toString(r).padStart(pad,'0'));return b.join(' ')}
function de_hex(b,r=10){var arr=b.split(' ');for(let i=0;i<arr.length;i++)arr[i]=String.fromCharCode(parseInt(arr[i],r));return arr.join('')}
// 二进制
function str_to_binary(){document.getElementById("result_output").innerHTML=en_hex(document.getElementById("original_text").value,2,8)}
function binary_to_str(){document.getElementById("result_output").innerHTML=de_hex(document.getElementById("original_text").value,2)}
// 十进制
function str_to_decimal(){document.getElementById("result_output").innerHTML=en_hex(document.getElementById("original_text").value)}
function decimal_to_str(){document.getElementById("result_output").innerHTML=de_hex(document.getElementById("original_text").value)}
// 十六进制
function str_to_hex(){document.getElementById("result_output").innerHTML=en_hex(document.getElementById("original_text").value,16)}
function hex_to_str(){document.getElementById("result_output").innerHTML=de_hex(document.getElementById("original_text").value,16)}
// 自定义进制
function str_to_hex2(){Tile.dialog({title:'进制转换',height:'200px',content:`<input class="input" type="number" id="count" style="margin-left: 2px;width: 95%;" />`,confirm:function(){document.getElementById("result_output").innerHTML=en_hex(document.getElementById("original_text").value,Math.min(36,Math.max(2,Math.round(document.getElementById("count").value))))}})}
function hex2_to_str(){Tile.dialog({title:'进制转换',height:'200px',content:`<input class="input" type="number" id="count" style="margin-left: 2px;width: 95%;" />`,confirm:function(){document.getElementById("result_output").innerHTML=de_hex(document.getElementById("original_text").value,Math.min(36,Math.max(2,Math.round(document.getElementById("count").value))))}})}
// UTF-8
function str_to_utf8(){document.getElementById("result_output").innerHTML=en_utf8(document.getElementById("original_text").value)}
function utf8_to_str(){document.getElementById("result_output").innerHTML=de_utf8(document.getElementById("original_text").value)}
function en_utf8(str){var bytes=new Array(),len,c;len=str.length;for(var i=0;i<len;i++){c=str.charCodeAt(i);if(c>=0x010000&&c<=0x10FFFF){bytes.push(((c>>18)&0x07)|0xF0);bytes.push(((c>>12)&0x3F)|0x80);bytes.push(((c>>6)&0x3F)|0x80);bytes.push((c&0x3F)|0x80)}else if(c>=0x000800&&c<=0x00FFFF){bytes.push(((c>>12)&0x0F)|0xE0);bytes.push(((c>>6)&0x3F)|0x80);bytes.push((c&0x3F)|0x80)}else if(c>=0x000080&&c<=0x0007FF){bytes.push(((c>>6)&0x1F)|0xC0);bytes.push((c&0x3F)|0x80)}else bytes.push(c&0xFF)}return `[${bytes.toString()}]`}
function de_utf8(array){try{array=JSON.parse(array)}catch{return 'error'}var str='',i=0,len=array.length,c,char2,char3;while(i<len){c=array[i++];switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:str+=String.fromCharCode(c);break;case 12:case 13:char2=array[i++];str+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=array[i++];char3=array[i++];str+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break;}}return str}
// unicode
function str_to_unicode(){document.getElementById("result_output").innerHTML=en_unicode(document.getElementById("original_text").value)}
function unicode_to_str(){document.getElementById("result_output").innerHTML=de_unicode(document.getElementById("original_text").value)}
function en_unicode(str){var rs="";for(var i=0;i<str.length;i++)/*补零。不补有些库无法正常解析。保持4位*//*slice负数参数，与其方向相反。start=-1为最后一个元素，end=-1为第一个元素。start必须*/rs+="\\u"+("0000"+str.charCodeAt(i).toString(16)).slice(-4);return rs}
function de_unicode(str){var strArray=str.split("\\u"),rs="";/*防止\u开头或结尾，导致解析空串产生的“□”的结果*/if(str.startsWith("\\u"))strArray=strArray.slice(1,strArray.length);if(str.endsWith("\\u"))strArray=strArray.slice(0,strArray.length-1);for(var i=0;i<strArray.length;i++)rs+=String.fromCharCode(parseInt(strArray[i],16));return rs}
// 哈希函数
function str_to_hash(){const str=document.querySelector("#original_text").value;hashString(str).then(txt=>{document.querySelector("#result_output").innerHTML=txt})}
function hashString(str){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(str)).then(digestBuffer=>Array.from(new Uint8Array(digestBuffer)).map(byte=>byte.toString(16).padStart(2,'0')).join(''))}