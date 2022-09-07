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
}

window.onscroll = function () {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.getElementById("to_top").style.display = "block";
    } else {
        document.getElementById("to_top").style.display = "none";
    }
};

function to_top() {
    document.body.scrollIntoView({
        behavior: "smooth",
    });
}

window.onload = function () {
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
        // 代码
        body = body.replace(/\n\./g, "</li><li>");
        body = body.replace(/\.copy/g, "<ul style=\"list-style-type: none; padding: 0; margin: 0; overflow: hidden;\"><li style=\"float: left;\">复制</li><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 25 25\" wdith=\"22\" height=\"22\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\"></path></svg></ul>");
    document.getElementById("root").innerHTML = body;

    /*var codeNum = document.getElementById("code");
    var code = document.getElementById("code").innerHTML;
    var json = ["name","ooo","test"];
    var num = 0;
    for (var num of code) {
        num++;
    }
    alert(num.length);
    for(i=0;i<json.length;i++) {
        alert(json[i]);
        //newCode = code[0].replace(/\n/g, "</li><li>");
        //document.getElementById("code").innerHTML = newCode;
    }*/

    // 隐藏元素
    document.getElementById("to_top").style.display = "none";
    document.getElementById("close-btn").style.visibility = 'hidden';
    document.getElementById("open-btn").style.visibility = 'visible';
}

// 侧边栏
function openNav() {
    document.getElementById("sideBar").style.width = "180px";
    document.getElementById("close-btn").style.visibility = 'visible';
    document.getElementById("open-btn").style.visibility = 'hidden';
    sessionStorage.setItem("sidebar", true);
}

function closeNav() {
    document.getElementById("sideBar").style.width = "0";
    document.getElementById("close-btn").style.visibility = 'hidden';
    document.getElementById("open-btn").style.visibility = 'visible';
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
document.addEventListener('keydown', function (key) {
    if(key.keyCode == 49) {
        document.body.scrollIntoView({
            behavior: "smooth",
        });
    }
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
    if(key.keyCode == 51) {
        if(sessionStorage.getItem("sidebar")) {
            document.getElementById("sideBar").style.width = "0";
            document.getElementById("close-btn").style.visibility = 'hidden';
            document.getElementById("open-btn").style.visibility = 'visible';
            sessionStorage.removeItem("sidebar");
        }
        else {
            document.getElementById("sideBar").style.width = "180px";
            document.getElementById("close-btn").style.visibility = 'visible';
            document.getElementById("open-btn").style.visibility = 'hidden';
            sessionStorage.setItem("sidebar", true);
        }
    }
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
            alert('抱歉，你的浏览器不支持或没有存储权限！\n解决：点击右上角用浏览器打开');
        }
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
    } else {
        alert('抱歉，你的浏览器不支持或没有存储权限！\n解决：点击右上角用浏览器打开');
    }
}