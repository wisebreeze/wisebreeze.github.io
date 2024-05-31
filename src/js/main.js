// 全局变量
var hostName=window.location.protocol==="file:"?"https://wisebreeze.github.io/":window.location.protocol+"//"+window.location.hostname;
wh=window.innerHeight,
pid=1,
copy_id=1,
copyPrefix='copy_id_',
menuHeight=21,
guide_link={
  "link": [
    {"link":hostName,"title":"首页"},
    {"link":"https://space.bilibili.com/494279926","title":"B站主页"},
    {"link":hostName+"/group.html","title":"交流群"},
    {"link":hostName+"/privacy.html","title":"隐私政策"}
  ]
},
titleSuffix=" | 我的世界基岩版 UI 文档";

// 跳转
if (window.location.href.startsWith("http://jsonui.netlify.app") || window.location.href.startsWith("https://jsonui.netlify.app")) {
  window.location.href = window.location.href.replace("http://jsonui.netlify.app", "http://mcbeui.netlify.app").replace("https://jsonui.netlify.app", "https://mcbeui.netlify.app");
}

// 标题
if ($("title").attr("home") == null && $("title")) $("title").text($("title").text() + titleSuffix);

// 获取窗口宽度 
if (window.innerWidth) winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;

// 目录
$("body").append(`<div id="guide_div"><div id="guide" class="ns">
  <div class="guide_head"><svg class="w-6 h-6" style="width: 16px;height: auto;margin-top: 2px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>&nbsp;导航＆目录</div>
  <div class="guide_content"></div>
</div></div>
<div id="themeDrop" class="ns close"><button class="checked" onclick="changeTheme(0)">浅色主题</button><button onclick="changeTheme(1)">深色主题</button><button onclick="changeTheme(2)">定时切换</button></div>`);
$("#guide_div").addClass("close");
$("#guide > .guide_content").append(`阅读进度 - <a id="number_progress"></a><div class="progress-bg"><div id="progress"></div></div>
<hr>`);

function openNav() {
  $("#guide_div").removeClass("close");
  $("#guide_div").addClass("open");
  $("#open-btn").addClass("fa-times");
  $("#open-btn").removeClass("fa-bars");
  $("#open-btn").attr("onclick","closeNav()");
  sessionStorage.setItem("guide", true);
}

function closeNav() {
  $("#guide_div").addClass("ca");
  setTimeout(() => {
    $("#guide_div").removeClass("open ca");
    $("#guide_div").addClass("close");
    $("#open-btn").addClass("fa-bars");
    $("#open-btn").removeClass("fa-times");
    $("#open-btn").attr("onclick","openNav()");
  }, 200);
  sessionStorage.removeItem("guide");
}

// 滚动事件
window.onscroll = ()=>{
  // 页面进度条
  if(document.getElementById('progress')&&document.getElementById("number_progress")){// 检测元素是否存在
    max_scroll = document.documentElement.scrollHeight - window.innerHeight;// 获取界面最大滚动高度
    now_scroll = window.scrollY;// 获取当前滚动的位置
    scrollPercentage = Math.trunc((now_scroll / max_scroll) * 100) + "%";// 获取滚动的百分比
    document.getElementById("number_progress").innerText = scrollPercentage;// 显示百分比
    document.getElementById('progress').style.width = scrollPercentage;// 转为进度条并显示
  }

  // 改变目录
  $("h1,h2,h3,h4,h5,h6").each(function(){
    // 检测元素是否在可视范围
    var hp = this.getBoundingClientRect();
    var condition = $(this).offset().top - $(document).scrollTop();
    if((hp.top<wh && hp.top>-hp.height) && condition < 20){
      var HeadingName = $(this).attr("id");// 获取ID
      if (HeadingName != null) {// 检测是否有ID
        $('.menu-this').removeClass('menu-this');// 重置Class类名
        $(`#guide > .guide_content > a.data-mu6jn[href="#${HeadingName}"]`).addClass('menu-this');// 给指定元素加类名
        linkHeight = document.querySelector(`#guide > .guide_content > a.data-mu6jn[href="#${HeadingName}"]`).getAttribute("href");// 获取ID
        linkHeight = (linkHeight.replace("#pid_",'') * menuHeight) - menuHeight;// 获取元素位置
        document.querySelector("#guide > .guide_content").scrollTo(0,linkHeight);// 滚动到指定位置
      } else if (this.tagName.toLocaleLowerCase()==='h1') {
        $('.menu-this').removeClass('menu-this');// 重置Class类名
        document.querySelector("#guide > .guide_content").scrollTo(0,0);// 回到顶部
      }
    }
  });
  /*if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) $("#to_top").css("display","block");
  else $("#to_top").css("display","none");*/
};

document.addEventListener('click',function(e){
  if(!e.target.classList.contains("theme-btn")){$("#themeDrop").addClass("ca");
  setTimeout(()=>{
    $("#themeDrop").removeClass("open ca");
    $("#themeDrop").addClass("close");
  },200)}
  if(document.getElementById("open-btn")&&winWidth<768&&$(e.target).attr("id")=="guide_div")closeNav();
})

document.addEventListener('DOMContentLoaded',function(){
  if (document.getElementById("number_progress")) document.getElementById("number_progress").innerText = "0%";
  //插入内容
  if($("title").attr("cube")=='true')$("body").prepend(`<headbar><div class="headbar_left"><a href="${hostName}/cube/">Cube UI 文档</a></div><button type="button" class="theme-btn" onclick="themeSet()">主题设置</button></headbar>`);
  else $("body").prepend(`<headbar><div class="headbar_left"><a class="fa fa-bars" id="open-btn" onclick="openNav()"></a><a href="${hostName}">我的世界基岩版 UI 文档</a></div><button type="button" class="theme-btn" onclick="themeSet()">主题设置</button></headbar>`);
  if($("div.left_content").attr("hide_bq")==null) $("div.left_content").append(`<fieldset class="ns"><fieldsetTitle>版权声明</fieldsetTitle>- 除非另有说明，否则文档内容均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>许可协议<br>- 此网站与 Mojang Studios 以及微软无任何从属关系<br>- 转载需要作者同意，并且标明内容来自于本网站</fieldset>`);
  for(var linkTarget in guide_link.link)$("#guide > .guide_content").append(`<a class="link-button" href="${guide_link.link[linkTarget].link}">${guide_link.link[linkTarget].title}</a>`);
  $("#guide > .guide_content").append(`<a id="fullScreenBtn" class="link-button" onclick="fullScreen()">全屏</a>`);
  // 加载主题
  if(typeof Storage!=="undefined"){
    if(localStorage.themeType){
      var theme=localStorage.getItem("themeType");
      changeTheme(theme==="dark"?1:theme==="auto"?2:0)
    }else changeTheme(0);
  }else console.log("main.js: 浏览器不支持储存，或没有储存权限！");
  // 加载表格
  document.querySelectorAll(".cnTable").forEach(e=>{
    const tableid=e.getAttribute('tableid'),ctc=document.createElement('div'),ct=document.createElement('table'),cth=document.createElement('thead'),ctb=document.createElement('tbody');ctc.classList.add('cnTableContainer');
    ct.appendChild(cth);ct.appendChild(ctb);ctc.appendChild(ct);e.appendChild(ctc);
    if(window.tableData&&window.tableData[tableid]){
      const data=window.tableData[tableid];
      data.head.forEach(row=>{
        const tr=document.createElement('tr');
        row.forEach(text=>{
          const th=document.createElement('th');
          th.innerHTML=text.replace(/\n/g, "<br>");
          tr.appendChild(th)
        })
        cth.appendChild(tr)
      })
      data.body.forEach(row=>{
        const tr=document.createElement('tr');
        row.forEach(text=>{
          const td=document.createElement('td');
          td.innerHTML=text===0?"":text.replace(/\n/g, "<br>");
          tr.appendChild(td)
        })
        ctb.appendChild(tr)
      })
      if(data.foot){
        const ctf=document.createElement('div');ctf.classList.add('cnTableFooter');e.appendChild(ctf);
        if(Array.isArray(data.foot)){
          const ol=document.createElement('ol');ctf.appendChild(ol);
          data.foot.forEach(text=>{const li=document.createElement('li');li.innerHTML=text;ol.appendChild(li)})
        }else{
          ctf.innerHTML=data.foot
        }
      }
    }
  })
  // 加载面包屑
  $(".left_title").each(function(){
    var backLink = $(this).attr("back_link") || hostName,
    backText = $(this).attr("back_text") || "首页",
    title = $(this).children()[0].innerText || "文档";
    $(this).prepend(`<ol class="breadcrumb ns"><li><a href="${backLink}">< ${backText}</a></li><li class="active"><a>${title}</a></li></ol>`);
  });
  // 加载目录
  $("h2,h3,h4,h5,h6").each(function(){
    headingLevel = this.tagName.toLowerCase();// 获取该遍历的小写标签名
    headingName = $(this).text();// 获取段落名
    $(this).attr({"id": `pid_${pid}`});// 给该元素添加标签
    $("#guide > .guide_content > hr").before(`<a class="menu-${headingLevel} data-mu6jn" href="#pid_${pid}">${headingName}</a>`);// 写入到目录
    pid++;// 为下一个遍历准备ID
  });
});

// 分类
$(".category_div").each(function(){
  $(this).prepend(`<div class="category_head ns"><i class="${$(this).attr("icon")}"></i>&nbsp;${$(this).attr("title")}</div>`);
});
// 控件说明
$("ed").each(function(){
  $(this).addClass("panel");
  $(this).find("et").addClass('panel c1-yellow c-gray');
});
// 代码
$("c").each(function(){
  $(this).addClass("code");
  let c_title = $(this).attr("title") || "RP/ui/start_screen.json",
  c_language = $(this).attr("language") || "json",
  code = $(this).html();
  $(this).empty();
  $(this).prepend(`<div class="code-head">
  <div class="code-head-title">${c_title}</div>
<div>`);
  $(this).find(".code-head").append(`<button class="copy-btn" onclick=copy_code('${copyPrefix}${copy_id}')><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 25 25" wdith="22" height="22" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><a>复制</a></button>`);
  $(this).append(`<div class="code-body">
  <div class="code-line-number-div ns"></div>
  <pre class="${c_language}"><code id="${copyPrefix}${copy_id}">${code}</code></pre>
</div>`);
  let line_number = (code.split('\n')).length;
  for (i=0;i<line_number;i++) $(this).find(".code-body > .code-line-number-div").append(`<div>${i+1}</div>`);
  $(this).find(".code-body > pre > code").html('<div class="code-line">'+$(this).find(".code-body > pre > code").html().replace(/\n/g,'</div><div class="code-line">')+"</div>");
  copy_id++;
});

// 复制代码
function copy_code(text,tip,error='复制失败',isVal=false,allowTip=true) {
  // 创建 textarea
  var aux = document.createElement('textarea');
  // 为 textarea 设置制只读
  aux.setAttribute('readonly', 'readonly');
  // 为 textarea 写入代码框内容
  aux.innerHTML = document.getElementById(text)[isVal?'value':'innerText'];
  // 在 body 写入 aux 的 textarea
  document.querySelector('#content').appendChild(aux);
  if(aux.innerHTML.trim()===''&&allowTip)sdui.toast({text:error,anchor:'bottom',type:'error'});
  else if(aux.innerHTML.trim()!==''){
    // 选中 aux
    aux.select();
    // 复制选中的 aux
    document.execCommand("copy");
    // 提示
    const tip_text = tip || '复制代码成功';
    if(allowTip)sdui.toast({text:tip_text,anchor:'bottom',type:'success'});
  }
  // 删除 textarea （不保留痕迹+取消选中）
  document.querySelector('#content').removeChild(aux)
}

// 快捷键
document.addEventListener('keyup', function (key) {
  // 返回顶部 - 1
  /*if(key.keyCode==49){
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }*/
  // 全屏 - 1
  if(key.keyCode==49)fullScreen();
  // 目录 - 2
  if(key.keyCode==50){
    if(sessionStorage.getItem("guide")){
      if(document.getElementById("open-btn"))closeNav();
      else{
        console.log("提示：当前页面不允许使用目录！");
        sessionStorage.removeItem("guide");
      }
    }
    else {
      if(document.getElementById("open-btn"))openNav();
      else{
        console.log("提示：当前页面不允许使用目录！");
        sessionStorage.setItem("guide",true);
      }
    }
  }
  // 切换主题 - 3
  if(key.keyCode == 51)changeMode(3);
});

// 切换主题
function themeSet(){
  $("#themeDrop").removeClass("close");
  $("#themeDrop").addClass("open");
}
function changeTheme(type){
  if(type===3&&typeof Storage!=="undefined")type=localStorage.getItem("themeType")==="dark"?0:1;
  else if(typeof Storage==="undefined")console.log("main.js: 浏览器不支持储存，或没有储存权限！");
  if(type===0){
    localStorage.setItem("themeType","light");
    document.querySelectorAll("#themeDrop button").forEach(function(e){e.classList.remove("checked")});
    document.querySelectorAll("#themeDrop button")[0].classList.add("checked");
    document.getElementsByTagName("html")[0].setAttribute("data-theme","light")
  }else if(type===1){
    localStorage.setItem("themeType","dark");
    document.querySelectorAll("#themeDrop button").forEach(function(e){e.classList.remove("checked")});
    document.querySelectorAll("#themeDrop button")[1].classList.add("checked");
    document.getElementsByTagName("html")[0].setAttribute("data-theme","dark")
  }else if(type===2){
    localStorage.setItem("themeType","auto");
    document.querySelectorAll("#themeDrop button").forEach(function(e){e.classList.remove("checked")});
    document.querySelectorAll("#themeDrop button")[2].classList.add("checked")
  }
}
setInterval(function(){
  if(!window.localStorage)return false;
  if(localStorage.getItem("themeType")!=="auto")return false;
  var gh = new Date().getHours();
  if(gh<6||gh>=19)document.getElementsByTagName("html")[0].setAttribute("data-theme","dark");
  else document.getElementsByTagName("html")[0].setAttribute("data-theme","light")
},5000)

// 全屏
function fullScreen(){
  if(sessionStorage.getItem("full")){
    if(document.exitFullscreen)document.exitFullscreen();
    else if(document.msExitFullscreen)document.msExitFullscreen();
    else if(document.mozCancelFullScreen)document.mozCancelFullScreen();
    else if(document.webkitCancelFullScreen)document.webkitCancelFullScreen();
    document.querySelector("#fullScreenBtn").innerText="全屏";
    sessionStorage.removeItem("full")
  }else{
    var doc=document.documentElement;
    if(doc.requestFullscreen)doc.requestFullscreen();
    else if(doc.msRequestFullscreen)doc.msRequestFullscreen();
    else if(doc.mozRequestFullScreen)doc.mozRequestFullScreen();
    else if(doc.webkitRequestFullScreen)doc.webkitRequestFullScreen();
    document.querySelector("#fullScreenBtn").innerText="退出全屏";
    sessionStorage.setItem("full",true)
  }
}

// open_url
function open_url(url){window.location.href = url}