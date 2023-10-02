// Tile UI V0.0.1
// Made by 云杉spruce
// 未经允许，不能将文件用于其他网站，不能修改、衍生代码。
(function(window){const Tile=()=>{return new Tile.prototype.init()},component=['dialog','button'];Tile.prototype={init:function(){return this},isTile:true};function error(e){console.error('Tile UI => '+e)}function isString(i){return typeof i=="string"}function isBoolean(i){return typeof i=="boolean"}function isNumber(i){return typeof i=="number"}function isObject(i){return typeof i=="object"}function isNumeric(i){return !isNaN(parseFloat(i))&&isFinite(i)}function isUndefined(i){return typeof i=="undefined"}function isNaN(i){return Number.isNaN?Number.isNaN(i):typeof i=='number'&&isNaN(i)}function isNull(i){return i===null}function isArray(i){return Array.isArray?Array.isArray(i):Object.prototype.toString.call(i)==="[object Array]"}function isWindow(i){return i!==null&&i!==undefined&&i===i.window}function isDocument(i){return i!==null&&i!==undefined&&i.nodeType===Node.DOCUMENT_NODE}function isElement(i){return i!==null&&i!==undefined&&i.nodeType===1}function isNode(i){return i!==null&&i!==undefined&&i.nodeType}function isFunction(i){if(typeof i==='function')return true;var t=Object.prototype.toString(i);return t==='[object Function]'||t==='[object GeneratorFunction]'}function isPlainObject(i){if(typeof i!=='object'||i.nodeType||i!==null&&i!==undefined&&i===i.window)return false;if(i.constructor&&!Object.prototype.hasOwnProperty.call(i.constructor.prototype,'isPrototypeOf'))return false;return true}function isEmptyObject(i){return Object.keys(i).length===0}component.forEach(function(e){Tile[e]=function(o){return new Tile[e].prototype.add(o,arguments)}});
Tile.button.prototype={add:function(o){if(!isPlainObject(o))return error('Invalid element options');if(!isPlainObject(o.style))o.style={};},...Tile.prototype};
Tile.dialog.prototype={add:function(o={}){if(!isPlainObject(o))return error('Invalid element options');if(!isPlainObject(o.style))o.style={};var $=this,d,title,content,f,cancelBtn,confirmBtn,overlay,dragging=false,mouseX,mouseY,offsetX,offsetY;d=document.createElement('div');d.classList.add(o.style.dialog||'tile-dialog');if(isString(o.id))d.id=o.id;title=document.createElement('div');title.classList.add(o.style.title||'tile-dialog-title');title.innerHTML=o.title||' ';content=document.createElement('div');content.classList.add(o.style.content||'tile-dialog-content');if(isString(o.content))content.innerHTML=o.content;else if(isNode(o.content))content.appendChild(o.content);f=document.createElement('div');f.classList.add(o.style.footer||'tile-dialog-footer');overlay=document.createElement('div');overlay.classList.add(o.style.overlay||'tile-dialog-overlay');if(o.overlay===false)overlay.style.opacity='0';cancelBtn=document.createElement('button');cancelBtn.classList.add(o.style.cancel||'tile-dialog-cancel-btn');cancelBtn.textContent=o.cancelText||'取消';cancelBtn.addEventListener('click',function(){if(isFunction(o.cancel)){try{o.cancel.call(d,d)}catch(e){error(e)}}$.close()});confirmBtn=document.createElement('button');confirmBtn.classList.add(o.style.confirm||'tile-dialog-confirm-btn');confirmBtn.textContent=o.confirmText||'确定';confirmBtn.addEventListener('click',function(){if(isFunction(o.confirm)){try{o.confirm.call(d,d)}catch(e){error(e)}}$.close()});if(o.drag===undefined||o.drag===true){title.addEventListener('pointerdown',DS);function DS(e){if(e.target!==title)return;e.preventDefault();dragging=true;offsetX=GX(e)-d.offsetLeft;offsetY=GY(e)-d.offsetTop}document.addEventListener('mousemove',DM);document.addEventListener('touchmove',DM);function DM(e){if(dragging){mouseX=GX(e);mouseY=GY(e);newLeft=Math.max(0,Math.min(mouseX-offsetX,window.innerWidth-d.offsetWidth)),newTop=Math.max(0,Math.min(mouseY-offsetY,window.innerHeight-d.offsetHeight));d.style.left=newLeft+'px';d.style.top=newTop+'px'}}document.addEventListener('mouseup',DE);document.addEventListener('touchend',DE);function DE(){dragging=false}function GX(e){if(e.changedTouches&&e.changedTouches.length>0)return e.changedTouches[0].clientX;else return e.clientX}function GY(e){if(e.changedTouches&&e.changedTouches.length>0)return e.changedTouches[0].clientY;else return e.clientY}}d.appendChild(title);d.appendChild(content);d.appendChild(f);f.appendChild(cancelBtn);f.appendChild(confirmBtn);d.style.width=o.width||'300px';d.style.height=o.height||'300px';document.body.appendChild(d);document.body.appendChild(overlay);if(isFunction(o.onLoaded)){try{o.onLoaded.call(d,d)}catch(e){error(e)}}d.classList.add(o.style.in||'tile-dialog-in');if(o.overlay!==false)overlay.classList.add(o.style.overlay_in||'tile-dialog-overlay-in');setTimeout(function(){d.classList.remove(o.style.in||'tile-dialog-in');overlay.classList.remove(o.style.overlay_in||'tile-dialog-overlay-in')},(o.anim_duration||300));function cd(){d.style.left=(window.innerWidth/2-d.offsetWidth/2)+'px';d.style.top=(window.innerHeight/2-d.offsetHeight/2)+'px'}window.addEventListener('resize',cd);cd();this.e=[overlay,d];this.type='dialog';this.options=o;return this},close:function(){var $=this;$.e[1].classList.add($.options.style.out||'tile-dialog-out');if($.options.overlay!==false)$.e[0].classList.add($.options.style.overlay_out||'tile-dialog-overlay-out');$.e[1].addEventListener('animationend',function(){$.e[1].remove();$.e[0].remove()});return this},show:function(){return new Tile.dialog.prototype.create(this.options)},...Tile.prototype};
Tile.render=function(e,c){if(!isElement(c))return error('target is not a element');if(isString(e)||isNumber(e)){c.appendChild(document.createTextNode(e));return}if(isPlainObject(e)&&e.isTile===true){if(isArray(e.e))e.e.forEach(function(el){console.log(el);c.appendChild(el)});return}};component.forEach(function(e){Tile[e].prototype.add.prototype=Tile[e].prototype});Tile.version='0.0.1';Tile.prototype.init.prototype=Tile.prototype;window.Tile=Tile})(window)