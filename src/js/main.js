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