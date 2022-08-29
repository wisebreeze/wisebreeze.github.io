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
    alert('抱歉，你的浏览器不支持或没有存储权限！\n解决：点击右上角用浏览器打开');
}

function to_top() {
    document.body.scrollIntoView({
        behavior: "smooth",
    });
}

window.onload = function () {
    document.getElementById("close-btn").style.visibility = 'hidden';
    document.getElementById("open-btn").style.visibility = 'visible';
}

function openNav() {
    document.getElementById("sideBar").style.width = "180px";
    document.getElementById("close-btn").style.visibility = 'visible';
    document.getElementById("open-btn").style.visibility = 'hidden';
}

function closeNav() {
    document.getElementById("sideBar").style.width = "0";
    document.getElementById("close-btn").style.visibility = 'hidden';
    document.getElementById("open-btn").style.visibility = 'visible';
}

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