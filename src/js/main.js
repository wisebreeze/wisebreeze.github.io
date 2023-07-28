// 全局变量
var wh = window.innerHeight;
var pid = 1;
var copy_id = 1;
var copyPrefix = 'copy_id_';
var menuHeight = 21;
var guide_link = {
  "link": [
    {"link":"https://jsonui.netlify.app","title":"首页"},
    {"link":"https://space.bilibili.com/494279926","title":"B站主页"},
    {"link":"https://jsonui.netlify.app/group.html","title":"交流群"},
    {"link":"https://jsonui.netlify.app/privacy.html","title":"隐私政策"}
  ]
}
var titleSuffix = " | 我的世界基岩版 UI 文档";

// 标题
if ($("title").attr("home") == null && $("title")) $("title").text($("title").text() + titleSuffix);

// 获取窗口宽度 
if (window.innerWidth) winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;

// 目录
$("#root").append(`<div id="guide_div"><div id="guide" class="ns">
  <div class="guide_head"><svg class="w-6 h-6" style="width: 16px;height: auto;margin-top: 2px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>&nbsp;导航＆目录</div>
  <div class="guide_content"></div>
</div></div>`);
$("#guide_div").addClass("close");
$("#guide > .guide_content").append(`阅读进度 - <a id="number_progress"></a><div class="progress-bg"><div id="progress"></div></div>
<hr>`);

function openNav() {
  $("#guide_div").removeClass("close");
  $("#guide_div").addClass("open");
  //$("#open-btn").html("");
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
    //$("#open-btn").html("&#9776;");
    $("#open-btn").addClass("fa-bars");
    $("#open-btn").removeClass("fa-times");
    $("#open-btn").attr("onclick","openNav()");
  }, 200);
  sessionStorage.removeItem("guide");
}

window.onclick = function(e) {
  if (document.getElementById("open-btn") && winWidth < 768 && $(e.target).attr("id") == "guide_div") closeNav();
}

// 加载主题
if (typeof (Storage) !== "undefined") {
  if (localStorage.themeType) {
      var darkTheme = localStorage.getItem("themeType");
      if (darkTheme == "dark") document.getElementById('root').setAttribute("data-theme", "dark");
      else document.getElementById('root').setAttribute("data-theme", "light");
  } else {
      localStorage.setItem("themeType", "light");
      document.getElementById('root').setAttribute("data-theme", "light");
  }
} else console.log("main.js: 浏览器不支持储存，或没有储存权限！");

// 滚动事件
window.onscroll = ()=>{
  // 页面进度条
  if (document.getElementById('progress') && document.getElementById("number_progress")) {// 检测元素是否存在
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

document.addEventListener('DOMContentLoaded',function(){
  if (document.getElementById("number_progress")) document.getElementById("number_progress").innerText = "0%";
  //插入内容
  if($("title").attr("cube")=='true')$("body").prepend(`<headbar><div class="headbar_left"><a href="https://jsonui.netlify.app/cube/">Cube UI 文档</a></div><button type="button" class="theme-btn" onclick="changeMode()">切换主题</button></headbar>`);
  else $("body").prepend(`<headbar><div class="headbar_left"><a class="fa fa-bars" id="open-btn" onclick="openNav()"></a><a href="https://jsonui.netlify.app">我的世界基岩版 UI 文档</a></div><button type="button" class="theme-btn" onclick="changeMode()">切换主题</button></headbar>`);
  if($("div.left_content").attr("hide_bq")==null) $("div.left_content").append(`<fieldset class="ns"><fieldsetTitle>版权声明</fieldsetTitle>- 除非另有说明，否则文档内容均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>许可协议<br>- 此网站与 Mojang Studios 以及微软无任何从属关系<br>- 转载需要作者同意，并且标明内容来自于本网站</fieldset>`);
  for(var linkTarget in guide_link.link)$("#guide > .guide_content").append(`<a class="link-button" href="${guide_link.link[linkTarget].link}">${guide_link.link[linkTarget].title}</a>`);
  //加载顶部按钮
  $(".left_title").each(function(){
    const back_link = $(this).attr("back_link") || "https://jsonui.netlify.app/";
    const back_text = $(this).attr("back_text") || "返回首页";
    $(this).append("<div></div>");
    $(this).find('div').append(`<a class="home-btn" href="${back_link}">${back_text}</a>`);// 返回按钮
    $(this).html($(this).html());
  });
  //加载目录
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
  let c_title = $(this).attr("title") || "RP/ui/start_screen.json";
  let code = $(this).html();
  $(this).empty();
  $(this).prepend(`<div class="code-head">
  <div class="code-head-title">${c_title}</div>
<div>`);
  $(this).find(".code-head").append(`<button class="copy-btn" onclick=copy_code('${copyPrefix}${copy_id}')><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 25 25" wdith="22" height="22" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><a>复制</a></button>`);
  $(this).append(`<div class="code-body">
  <div class="code-line-number-div ns"></div>
  <pre class="json"><code id="${copyPrefix}${copy_id}">${code}</code></pre>
</div>`);
  let line_number = (code.split('\n')).length;
  for (i=0;i<line_number;i++) $(this).find(".code-body > .code-line-number-div").append(`<div>${i+1}</div>`);
  $(this).find(".code-body > pre > code").html('<div class="code-line">'+$(this).find(".code-body > pre > code").html().replace(/\n/g,'</div><div class="code-line">')+"</div>");
  copy_id++;
});

// 复制代码
function copy_code(text,tip,error='复制失败',isVal=false) {
  // 创建 textarea
  var aux = document.createElement('textarea');
  // 为 textarea 设置制只读
  aux.setAttribute('readonly', 'readonly');
  // 为 textarea 写入代码框内容
  aux.innerHTML = document.getElementById(text)[isVal?'value':'innerText'];
  // 在 body 写入 aux 的 textarea
  document.querySelector('#content').appendChild(aux);
  if(aux.innerHTML.trim()==='')alert(error);
  else{
    // 选中 aux
    aux.select();
    // 复制选中的 aux
    document.execCommand("copy");
    // 提示
    const tip_text = tip || '复制代码成功';
    alert(tip_text);
  }
  // 删除 textarea （不保留痕迹+取消选中）
  document.querySelector('#content').removeChild(aux)
}

// 快捷键
document.addEventListener('keyup', function (key) {
  // 返回顶部 - 1
  /*if(key.keyCode == 49) {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }*/
  // 全屏 - 1
  if(key.keyCode == 49) {
    if(sessionStorage.getItem("full")) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      sessionStorage.removeItem("full");
    }
    else {
      var docElm = document.documentElement;
      if (docElm.requestFullscreen) docElm.requestFullscreen();
      else if (docElm.msRequestFullscreen) docElm.msRequestFullscreen();
      else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
      else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();
      sessionStorage.setItem("full", true);
    }
  }
  // 目录 - 2
  if(key.keyCode == 50) {
    if(sessionStorage.getItem("guide")) {
      if (document.getElementById("open-btn")) closeNav();
      else {
        console.log("提示：当前页面不允许使用目录！");
        sessionStorage.removeItem("guide");
      }
    }
    else {
      if (document.getElementById("open-btn")) openNav();
      else {
        console.log("提示：当前页面不允许使用目录！");
        sessionStorage.setItem("guide", true);
      }
    }
  }
  // 切换主题 - 3
  if(key.keyCode == 51) {
    if (typeof (Storage) !== "undefined") {
      var darkTheme = localStorage.getItem("themeType");
      if (darkTheme == "dark") {
        localStorage.setItem("themeType", "light");
        document.getElementById('root').setAttribute("data-theme", "light");
      }
      else {
        localStorage.setItem("themeType", "dark");
        document.getElementById('root').setAttribute("data-theme", "dark");
      }
    } else console.log("main.js: 浏览器不支持储存，或没有储存权限！");
  }
});

// 切换主题
function changeMode() {
  //var mode = document.getElementById('root').getAttribute("data-theme");
  if (typeof(Storage) !== "undefined") {
    var darkTheme = localStorage.getItem("themeType");
    if (darkTheme == "dark") {
      localStorage.setItem("themeType", "light");
      document.getElementById('root').setAttribute("data-theme","light");
    }
    else {
      localStorage.setItem("themeType", "dark");
      document.getElementById('root').setAttribute("data-theme","dark");
    }
  } else console.log("main.js: 浏览器不支持储存，或没有储存权限！");
}

// open_url
function open_url(url) {
  window.location.href = url;
}