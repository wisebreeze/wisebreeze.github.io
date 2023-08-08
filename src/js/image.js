var imgHistory={step:0,arr:[]};
function inputImage(){var input=document.getElementById('file'),canvas=document.getElementById('canvas'),context=canvas.getContext('2d'),view=document.getElementById('view');if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=function(e){var img=new Image();img.onload=function(){canvas.width=img.width;canvas.height=img.height;context.drawImage(img,0,0);imgHistory={step:0,arr:[{d:canvas.toDataURL(),n:'导入图片',o:{}}]};view.src=canvas.toDataURL();updateHistory()};img.src=e.target.result};if(input.files[0].type.match('image.*'))reader.readAsDataURL(input.files[0]);else{alert('请选择一个图片文件！');input.value=''}}}

function download(){Tile.dialog({
title:'下载图片',height:'280px',
content:`文件名称
<input class="input" id="fileName" style="margin-left: 2px;width: 95%;" />
图片格式
<select style="margin-left: 2px;" class="input" id="dropdown">
  <option value="png">png</option>
  <option value="jpeg">jpg</option>
  <option value="webp">webp</option>
</select>
<a id="el_wAYrk">图片质量 100%</a><input style="width: 100%;display: block;" min="0" value="100" max="100" type="range" id="o1" oninput="document.getElementById('el_wAYrk').textContent='图片质量 '+this.value+'%'"/>`,
confirm:function(){var canvas=document.querySelector('#canvas'),input=document.getElementById('fileName'),select=document.getElementById('dropdown').value,slider=document.getElementById('o1').value,blob=canvas.toDataURL('image/'+select,(slider/100));function db(b,n){a=document.createElement('a');a.download=n;a.href=b;document.body.appendChild(a);a.click();a.remove();}db(blob,input.value)},
onLoaded:function(){document.querySelector('#fileName').value=document.querySelector('#file').files[0]?(document.querySelector('#file').files[0].name.split('.').slice(0,-1).join('.')):'image'}
})}
function smooth(){Tile.dialog({
title:'设置',height:'240px',
content:`平滑<br><input style="width: 25%;display: inline-block;" class="input" value="10" type="number" id="o1"/> px / % <input style="vertical-align: middle;" type="checkbox" id="checkbox">
<br>圆角位置
<select style="margin-left: 2px;" class="input" id="dropdown">
  <option value="s1">全部</option>
  <option value="s2">左上角</option>
  <option value="s3">右上角</option>
  <option value="s4">左下角</option>
  <option value="s5">右下角</option>
</select>`,
confirm:function(){var img=new Image();canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),slider=document.getElementById("o1").value,checkbox=document.getElementById("checkbox").value,dropdown=document.getElementById("dropdown").value;img.onload=function(){var width=img.width,height=img.height,radius=Math.max(0,(checkbox===false?slider:Math.min(width,height)*(Math.min(100,slider)/100)));canvas.width=width;canvas.height=height;ctx.save();ctx.beginPath();if(dropdown==="s1"){ctx.moveTo(radius,0);ctx.lineTo(width-radius,0);ctx.quadraticCurveTo(width,0,width,radius);ctx.lineTo(width,height-radius);ctx.quadraticCurveTo(width,height,width-radius,height);ctx.lineTo(radius,height);ctx.quadraticCurveTo(0,height,0,height-radius);ctx.lineTo(0,radius);ctx.quadraticCurveTo(0,0,radius,0)}else if(dropdown==="s2"){ctx.moveTo(radius,0);ctx.lineTo(width,0);ctx.lineTo(width,height);ctx.lineTo(0,height);ctx.lineTo(0,radius);ctx.quadraticCurveTo(0,0,radius,0)}else if(dropdown==="s3"){ctx.moveTo(0,0);ctx.lineTo(width-radius,0);ctx.quadraticCurveTo(width,0,width,radius);ctx.lineTo(width,height);ctx.lineTo(0,height);ctx.lineTo(0,0)}else if(dropdown==="s4"){ctx.moveTo(0,0);ctx.lineTo(width,0);ctx.lineTo(width,height);ctx.lineTo(radius,height);ctx.quadraticCurveTo(0,height,0,height-radius);ctx.lineTo(0,0)}else if(dropdown==="s5"){ctx.moveTo(0,0);ctx.lineTo(width,0);ctx.lineTo(width,height-radius);ctx.quadraticCurveTo(width,height,width-radius,height);ctx.lineTo(0,height);ctx.lineTo(0,0)}ctx.closePath();ctx.clip();ctx.drawImage(img,0,0,width,height);ctx.restore();save('圆角',canvas,{slider:slider,dropdown:dropdown})};img.src=canvas.toDataURL()}
})}
function __blur(){Tile.dialog({
title:'设置',height:'180px',
content:`模糊<br><input style="width: 25%;display: inline-block;" class="input" value="1" type="number" id="o1"/> px`,
confirm:function(){var canvas=document.getElementById('canvas'),input=document.getElementById('o1').value,ctx=canvas.getContext('2d'),img=new Image();img.src=canvas.toDataURL();img.onload=function(){ctx.drawImage(img,0,0,canvas.width,canvas.height);ctx.putImageData(gblur(ctx.getImageData(0,0,img.width,img.height),Math.max(0,Number(input))),0,0);save('模糊',canvas,{input:input})}}
})}
function mirror(){Tile.dialog({
title:'设置',height:'180px',
content:`镜像方向<select style="margin-left: 2px;" class="input" id="dropdown"><option value="h">水平</option><option value="v">垂直</option></select>`,
confirm:function(){var canvas=document.getElementById("canvas"),dropdown=document.getElementById("dropdown").value,context=canvas.getContext("2d");context.save();if(dropdown==='h'){context.scale(-1,1);context.drawImage(canvas,-canvas.width,0)}else{context.scale(1,-1);context.drawImage(canvas,0,-canvas.height)}context.restore();save('镜像',canvas,{dropdown:dropdown})}})}
function rotate(){Tile.dialog({
title:'设置',height:'200px',
content:`旋转方向<select style="margin-left: 2px;" class="input" id="direction"><option value="def">顺时针</option><option value="rev">逆时针</option></select>旋转角度 90°`,
confirm:function(){var canvas=document.getElementById("canvas"),direction=document.getElementById("direction").value,ctx=canvas.getContext("2d"),img=new Image();setRotate(canvas.toDataURL(),(direction==="rev"?-90:90)).then((data)=>{img.src=data;img.onload=function(){ctx.clearRect(0,0,canvas.width,canvas.height);canvas.width=img.width;canvas.height=img.height;ctx.drawImage(img,0,0);save('旋转',canvas,{direction:direction})}})}
})}
function colorReversal(){var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d");var image=new Image();image.src=canvas.toDataURL();image.onload=function(){ctx.drawImage(image,0,0);var imageData=ctx.getImageData(0,0,canvas.width,canvas.height);var data=imageData.data;for(var i=0;i<data.length;i+=4){data[i]=255-data[i];data[i+1]=255-data[i+1];data[i+2]=255-data[i+2]}ctx.putImageData(imageData,0,0);save('颜色反转',canvas)}}

function setRotate(src,deg){return new Promise((resolve,reject)=>{const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');let iw,ih,size;if(deg%90!==0)reject('error');deg<0&&(deg=(deg%360)+360);const q=(deg/90)%4,cut={sx:0,sy:0,ex:0,ey:0},img=new Image();img.src=src;img.onload=function(){iw=img.width;ih=img.height;size=iw>ih?iw:ih;canvas.width=size*2;canvas.height=size*2;switch(q){case -1:cut.sx=size;cut.sy=size;cut.ex=size+iw;cut.ey=size+ih;break;case 1:cut.sx=size-ih;cut.sy=size;cut.ex=size;cut.ey=size+iw;break;case 2:cut.sx=size-iw;cut.sy=size-ih;cut.ex=size;cut.ey=size;break;case 3:cut.sx=size;cut.sy=size-iw;cut.ex=size+ih;cut.ey=size+iw;break;}ctx?.translate(size,size);ctx?.rotate((deg*Math.PI)/180);ctx?.drawImage(img,0,0);const imgData=ctx?.getImageData(cut.sx,cut.sy,cut.ex,cut.ey);if(q%2==0){canvas.width=iw;canvas.height=ih}else{canvas.width=ih;canvas.height=iw}ctx?.putImageData(imgData,0,0);resolve(canvas.toDataURL('image/png'))}})}
function gblur(data,radius=1){radius*=3;var p=new Uint8ClampedArray(data.data),width=data.width,height=data.height,gm=[],gs,x,y,r,g,b,a,i,j,k,w;radius=Math.floor(radius);var sigma=radius/3;a=1/(Math.sqrt(2*Math.PI)*sigma);b=-1/(2*sigma*sigma);for(i=-radius;i<=radius;i++)gm.push(a*Math.exp(b*i*i));for(y=0;y<height;y++){for(x=0;x<width;x++){r=g=b=a=gs=0;for(j=-radius;j<=radius;j++){k=x+j;if(k>=0&&k<width){i=(y*width+k)*4;w=gm[j+radius];r+=p[i]*w;g+=p[i+1]*w;b+=p[i+2]*w;a+=p[i+3]*w;gs+=w}}i=(y*width+x)*4;data.data.set([r,g,b,a].map(v=>v/gs),i)}}p.set(data.data);for(x=0;x<width;x++){for(y=0;y<height;y++){r=g=b=a=gs=0;for(j=-radius;j<=radius;j++){k=y+j;if(k>=0&&k<height){i=(k*width+x)*4;w=gm[j+radius];r+=p[i]*w;g+=p[i+1]*w;b+=p[i+2]*w;a+=p[i+3]*w;gs+=w}}i=(y*width+x)*4;data.data.set([r,g,b,a].map(v=>v/gs),i)}}return data}
function save(n,d,o={}){if(imgHistory.step<imgHistory.arr.length-1)imgHistory.arr.splice(imgHistory.step+1,imgHistory.arr.length-imgHistory.step-1);document.getElementById("view").src=d.toDataURL();imgHistory.arr.push({d:d.toDataURL(),n:n,o:o});imgHistory.step++;updateHistory()}
function updateHistory(){var he=document.getElementById("history");he.innerHTML="";for(var i=0;i<imgHistory.arr.length;i++){var ht=document.createElement("div");ht.textContent=imgHistory.arr[i].n;if(imgHistory.step<i)ht.style.opacity="0.25";ht.setAttribute("onclick",`back(${i})`);he.appendChild(ht)}}
function back(i){restore(imgHistory.arr[i].d);imgHistory.step=i;updateHistory()}
function undo(){if(imgHistory.step-1<0)return;imgHistory.step--;restore(imgHistory.arr[imgHistory.step].d);updateHistory()}
function redo(){if(imgHistory.step+1>=imgHistory.arr.length)return;imgHistory.step++;restore(imgHistory.arr[imgHistory.step].d);updateHistory()}
function restore(d){var c=document.getElementById("canvas"),gc=c.getContext("2d"),img=new Image();img.onload=function(){gc.clearRect(0,0,c.width,c.height);gc.drawImage(img,0,0)};img.src=d;document.getElementById("view").src=d}