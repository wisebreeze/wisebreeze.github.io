// 全局变量
var wh = window.innerHeight;
var pid = 1;
var menuHeight = 21;

if (typeof (Storage) !== "undefined") {
  if (localStorage.themeType) {
      var darkTheme = localStorage.getItem("themeType");
      if (darkTheme == "dark") {
          document.getElementById('root').setAttribute("data-theme", "dark");
      }
      else {
          document.getElementById('root').setAttribute("data-theme", "light");
      }
  } else {
      localStorage.setItem("themeType", "light");
      document.getElementById('root').setAttribute("data-theme", "light");
  }
} else {
   console.log("main.js: 浏览器不支持储存，或没有储存权限！");
}

window.onscroll = function () {
  if (document.getElementById('progress') && document.getElementById("number_progress")) {// 检测元素是否存在
    max_scroll = document.documentElement.scrollHeight - window.innerHeight;// 获取界面最大滚动高度
    now_scroll = window.scrollY;// 获取当前滚动的位置
    scrollPercentage = Math.trunc((now_scroll / max_scroll) * 100) + "%";// 获取滚动的百分比
    document.getElementById("number_progress").innerText = scrollPercentage;// 显示百分比

    document.getElementById('progress').style.width = scrollPercentage;// 转为进度条并显示
  }

    $("h1,h2,h3,h4,h5,h6").each(function(){
        // 检测元素是否在可视范围
        var hp = this.getBoundingClientRect();
        var condition = $(this).offset().top - $(document).scrollTop();
        if((hp.top<wh && hp.top>-hp.height) && condition < 20){
            HeadingName = $(this).attr("id");// 获取ID
            if (HeadingName != null) {// 检测是否有ID
                $('.menu-this').removeClass('menu-this');// 重置Class类名
                $(`a[href="#${HeadingName}"]`).addClass('menu-this');// 给指定元素加类名
                linkHeight = document.querySelector(`a[href="#${HeadingName}"]`).getAttribute("href");// 获取ID
                linkHeight = (linkHeight.replace("#pid_",'') * menuHeight) - menuHeight;// 获取元素位置
                document.querySelector("#DropdownContent").scrollTo(0,linkHeight);// 滚动到指定位置
            } else {
                document.querySelector("#DropdownContent").scrollTo(0,0);// 回到顶部
            }
        }
    });

  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        $("#to_top").css("display","block");
    } else {
        $("#to_top").css("display","none");
    }
};

function to_top() {
    document.body.scrollIntoView({
        behavior: "smooth",
    });
}

window.onload = function () {
    if (document.getElementById("number_progress")){
        document.getElementById("number_progress").innerText = "0%";
    }
    // 解析文本
    var body = document.getElementById("root").innerHTML;
        // 标题
        body = body.replace(/\.hr/g, "<hr class=\"title-hr wow fadeInLeftBig\" data-wow-delay=\"1.5s\"></hr>");
        // 提示
        body = body.replace(/\.{2}tip/g, "</div></div>");
        body = body.replace(/\.tip/g, "<div class=\"tip wow bounceInLeft\" data-wow-delay=\"0.8s\"><div class=\"tip-text\">");
        // 换行
        body = body.replace(/\.hh/g, "<br>");
        // 控件
        body = body.replace(/\.{2}ep/g, "</div>");
        body = body.replace(/\.ep/g, "<div class=\"panel wow bounceInLeft\" data-wow-delay=\"1.2s\"><p>");
        body = body.replace(/\.{2}et/g, "</a>");
        body = body.replace(/\.et/g, "<a class=\"panel c1-yellow c-gray\" style=\"font-size: 10px;\">");
        // 粗体
        body = body.replace(/\.{2}bb/g, "</b>");
        body = body.replace(/\.bb/g, "<b>");
        document.getElementById("root").innerHTML = body;

    //插入内容
    if($("div.left_content").attr("hide_bq") == null){
      $("div.left_content").append("<fieldset class=\"wow bounceInLeft\">\n    <legend>版权须知</legend>\n    1、除非另有说明，否则文档内容均采用<a class=\"list-link\" href=\"https://creativecommons.org/licenses/by-nc-sa/4.0/\">CC BY-NC-SA 4.0</a>许可协议<br>\n    2、此网站与Mojang Studios以及微软无任何从属关系<br>\n    3、转载需要经过作者同意，并且标明文档来自于本网站\n  </fieldset>");
    }
    $("div.left_content").append("<div id=\"to_top\">\n    <button class=\"to_top\" onclick=\"to_top();\">\n      <div>\n        <span>▲</span><br>回顶部\n      </div>\n    </button>\n  </div>");
    $("#root").prepend("<div id=\"sideBar\" class=\"sidenav\">\n    <div>\n      <label class=\"sidebar-title\">导航</label>\n      <hr class=\"sidebar-hr\">\n      <a class=\"sidenav-button\" href=\"https://mcspruce.github.io\">首页</a>\n      <a class=\"sidenav-button\" href=\"https://space.bilibili.com/494279926\">B站主页</a>\n      <a class=\"sidenav-button\" href=\"https://jq.qq.com/?_wv=1027&k=2Ee4pUUF\">交流群</a>\n     <a class=\"sidenav-button\" href=\"https://mcspruce.github.io/privacy.html\">隐私政策</a>\n    </div>\n  </div>");
    //加载目录
    $("h1").each(function(){
        $(this).addClass("top-title wow fadeInLeftBig");// 加载动画
        $(this).attr("data-wow-delay","0.5s");// 加载动画延迟
    });
    $("h2,h3,h4,h5,h6").each(function(){
        headingLevel = this.tagName.toLowerCase();// 获取该遍历的小写标签名
        headingName = $(this).text();// 获取段落名
        $(this).attr({"id": `pid_${pid}`,"data-wow-delay": "1.5s"});// 给该元素添加标签
        $(this).addClass("title wow fadeInLeftBig");// 给该元素添加Class类名
        $("#DropdownContent").append(`<a class="menu-${headingLevel}" href="#pid_${pid}">${headingName}</a>`);// 写入到目录
        pid = pid + 1;// 为下一个遍历准备ID
    });
}

$("bcode").each(function(){
    // 自动分配复制ID
    var copy_id = "copy_id_" + Math.trunc((Math.floor(Math.random() * ((new Date()).valueOf() - 32767 + 1)) + (new Date().getSeconds())) / 520);
    // 改变代码样式
    $(this).find("lcode").html("<pre class=\"json wow bounceInUp\" id=\"" + copy_id + "\"><code>" + $(this).find("lcode").html() + "</code></pre>");
    $(this).find("ctitle").addClass("code-title");
    // 准备复制按钮
    $(this).find("ctitle").append("<button class=\"copy-btn wow shake\" onclick=copy_code('" + copy_id + "')><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 25 25\" wdith=\"22\" height=\"22\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\"></path></svg><a>复制</a></button>")
    $(this).html("<div class=\"code wow bounceInLeft\">\n" + $(this).html() + "\n</div>");
});
// 自动代码换行
$("code").each(function(){
    $(this).html("<ul><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ul>");
});
// 提示
$("tip, warning").each(function(){
    $(this).addClass("wow bounceInLeft");
    $(this).attr("data-wow-delay","0.5s");
});

// 开启侧边栏
function openNav() {
    $("#sideBar").css("width","180px");
    $("#close-btn").css("visibility","visible");
    $("#open-btn").css("visibility","hidden");
    sessionStorage.setItem("sidebar", true);
}

// 关闭侧边栏
function closeNav() {
    $("#sideBar").css("width","0");
    $("#close-btn").css("visibility","hidden");
    $("#open-btn").css("visibility","visible");
    sessionStorage.removeItem("sidebar");
}

// 复制代码
function copy_code(text) {
    // 创建 textarea
    const aux = document.createElement('textarea');
    // 获取代码框内容
    const copy_content = document.getElementById(text).innerText;
    // 为 textarea 写入代码框内容
    aux.innerHTML = copy_content;
    // 在 body 写入 aux 的 textarea
    document.body.appendChild(aux);
    // 选中 aux
    aux.select();
    // 复制选中的 aux
    document.execCommand("copy");
    // 提示
    alert('复制代码成功');
    // 删除 textarea （不保留痕迹+取消选中）
    document.body.removeChild(aux);
}

// 快捷键
document.addEventListener('keyup', function (key) {
    // 返回顶部 - 1
    if(key.keyCode == 49) {
        document.body.scrollIntoView({
            behavior: "smooth",
        });
    }
    // 全屏 - 2
    if(key.keyCode == 50) {
        if(sessionStorage.getItem("full")) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            sessionStorage.removeItem("full");
        }
        else {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            sessionStorage.setItem("full", true);
        }
    }
    // 目录 - 3
    if(key.keyCode == 51) {
        if(sessionStorage.getItem("dropdown")) {
            if (document.getElementById("DropdownContent")) {
                document.getElementById("DropdownContent").classList.remove('show');
            } else {
                console.log("main.js：当前页面没有目录！");
            }
            sessionStorage.removeItem("dropdown");
        }
        else {
            if (document.getElementById("DropdownContent")) {
                document.getElementById("DropdownContent").classList.toggle("show");
            } else {
                console.log("main.js：当前页面没有目录！");
            }
            sessionStorage.setItem("dropdown", true);
        }
    }
    // 切换主题 - 4
    if(key.keyCode == 52) {
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
        } else {
            console.log("main.js: 浏览器不支持储存，或没有储存权限！");
        }
    }
});

// 目录
function dropdown() {
    document.getElementById("DropdownContent").classList.toggle("show");
    sessionStorage.setItem("dropdown", true);
}

window.onclick = function(e) {
  if (document.getElementById("DropdownContent")) {
    if (!e.target.matches('.drop_btn')) {
    var Dropdown = document.getElementById("DropdownContent");
      if (Dropdown.classList.contains('show')) {
        Dropdown.classList.remove('show');
        sessionStorage.removeItem("dropdown");
      }
    }
  }
}

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
    } else {
        console.log("main.js: 浏览器不支持储存，或没有储存权限！");
    }
}