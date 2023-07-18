function to_html() {
  // 获取文件信息
  var fileList = document.getElementById('files').files[0];
  var fileName = document.getElementById('files').files[0].name;
  // 检测后缀名
  suffix = document.getElementById('files').value;
  suffix_index = suffix.lastIndexOf(".");
  suffix = suffix.substring(suffix_index + 1,suffix.length);
  suffix = suffix.toLowerCase();
  if (suffix !== "md" && suffix !== "txt") {
    clear_file();
    alert("不支持的文件类型！");
    return false;
  }
  // 显示后缀名
  $('#file_name').text(fileName);
  // 加载文件
  var reader = new FileReader();
  reader.readAsText(fileList, "UTF-8");
  reader.onload = function (e) {
    var content = e.target.result;
    // 逐行拆解文本
    split_content = content.split('\n');
    for (var i in split_content) {
      // 解析Markdown
      now_result = split_content[i]
.replace(/^\>(.*)/g, '<blockquote>$1</blockquote>')//引用 (> )
.replace(/\!\[(.*?)\]\((.*?)\)/g,'<img width="100%" title="$1" src="$2" />')//图片 (![test](/xxx.png))
.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>')//链接 ([test](https://www.google.com))
.replace(/^```json/g,"<c>")//代码头 (```json)
.replace(/```/g,"</c>")//代码尾 (```)
.replace(/`(.*)`/g,"<lc>$1</lc>")//行内代码 (`xxx`)
.replace(/^---(.*)/g,'<hr>')//分割线 (---)
.replace(/^(######)(.*)/g,'<h6>$2</h6>')//微标题 (###### 6)
.replace(/^(#####)(.*)/g,'<h5>$2</h5>')//小标题 (##### 5)
.replace(/^(####)(.*)/g,'<h4>$2</h4>')//行标题 (#### 4)
.replace(/^(###)(.*)/g,'<h3>$2</h3>')//段标题 (### 3)
.replace(/^(##)(.*)/g,'<h2>$2</h2>')//副标题 (## 2)
.replace(/^(#)(.*)/g,'<h1>$2</h1>')//大标题 (# 1)
.replace(/(\*\*|__)(.*?)(\*\*|__)/g, '<b>$2</b>')//粗体 (**xxx**|__xxx__)
.replace(/^[-\*\+]+(.*)/g, '<li>$1</li>')//无序列表 (-|*|+)
.replace(/\~\~(.*?)\~\~/g, '<del>$1</del>')//删除线 (~~xxx~~)
.replace(/(\*)(.*?)(\*)/g, '<i>$2</i>');//斜体 (*xxx*)
      // 合并解析结果
      if (i == 0) {
        content = now_result;
      } else {
        content = content + '\n' + now_result;
      }
    }
    // 输出结果
    content = content.replace(/\n\<\/lcode\>/g, '</lcode>')
    .replace(/\<lcode\>\n/g, '<lcode>')
    .replace(/\<\/blockquote\>\n\<blockquote\>/g, '\n<br>');
    fileName = fileName.toLowerCase();
    fileName = fileName.replace(/(.*)(\.)(.*)/g, '$1');
    jQuery_str = `<script src="https://jsonui.netlify.app/src/js/jQuery.js"></script>`;
    textarea_content = `<div class="left_content">${content}</div>`;
    textarea_content = `<!DOCTYPE html>\n<html lang="zh-CN">\n\n<head>\n  <meta charset="UTF-8">\n  <title>${fileName}</title>\n  <link rel="shortcut icon" href="https://jsonui.netlify.app/favicon.ico">\n  <link rel="icon" sizes="100x100" href="https://jsonui.netlify.app/favicon.ico">\n  <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n  <meta name="apple-mobile-web-app-title" content="Json-UI教程">\n  <meta name="apple-touch-icon-precomposed" size="57x57" href="https://jsonui.netlify.app/web_icon.png">\n  <meta name="apple-touch-icon-precomposed" size="114x114" href="https://jsonui.netlify.app/web_icon.png">\n  <meta name="apple-touch-icon-precomposed" size="152x152" href="https://jsonui.netlify.app/web_icon.png">\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="black">\n  <meta name="keywords" content="我的世界UI,基岩版UI,json ui教程,JSON UI教程,json ui,JSON UI">\n  <meta name="description" content="本网站用于帮助 MCBE 资源创作者创作 UI，您可以参考本文档的内容来制作您的 UI！">\n  <meta name="author" content="MC_spruce">\n\n  <link href="https://jsonui.netlify.app/src/css/main.css" rel="stylesheet">\n  ${jQuery_str}\n  </head>\n  <body id="root" data-theme="light"><div id="content">\n  <div class="left_title"><h1>${fileName}\n  </h1></div>\n  ${textarea_content}\n  </div>\n  <!--正文-->\n  <script src="https://jsonui.netlify.app/src/js/main.js"></script>\n  <script src="https://jsonui.netlify.app/src/js/hl.js"></script>\n  <link href="https://jsonui.netlify.app/src/css/font-awesome.css" rel="stylesheet">\n  <script>hljs.initHighlightingOnLoad()</script>\n  </body>\n</html>`;
    $('textarea').text(textarea_content);
    $("#html").html(content);
    reread();
  }
}

function clear_file() {
  $('#file_name').text("请选择Markdown文件以转Html");
  document.getElementById('files').value = '';
  $('textarea').text('');
  $("#html").html('');
}

function download_html() {
  fileName = $('#file_name').text();
  fileName = fileName.replace(/(.*)(\.)(.*)/g, '$1.html');
  content = $('textarea').text();
  if (fileName == "请选择Markdown文件以转Html") {
    alert('请上传文件再进行下载操作！');
  } else {
    exportRaw(fileName, content);
  }
};

function fakeClick(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
} 

function reread() {
  $("h2,h3,h4,h5,h6").each(function(){
    headingLevel = this.tagName.toLowerCase();// 获取该遍历的小写标签名
    headingName = $(this).text();// 获取段落名
    $(this).attr({"id": `pid_${pid}`});// 给该元素添加标签
    $(this).addClass("title");// 给该元素添加Class类名
    $("#DropdownContent").append(`<a class="menu-${headingLevel}" href="#pid_${pid}">${headingName}</a>`);// 写入到目录
    pid = pid + 1;// 为下一个遍历准备ID
  });
  $("ed").each(function(){
    // 改变样式
    $(this).addClass("panel");
    $(this).find("et").addClass('panel c1-yellow c-gray');
  });
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
  for (i=0;i<line_number;i++) {
    $(this).find(".code-body > .code-line-number-div").append(`<div>${i+1}</div>`);
  }
  $(this).find(".code-body > pre > code").html('<div class="code-line">'+$(this).find(".code-body > pre > code").html().replace(/\n/g,'</div><div class="code-line">')+"</div>");
  copy_id++;
});
}