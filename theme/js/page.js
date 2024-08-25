if (window.innerWidth > 640) { // 自动展开导航栏
    document.getElementById("toc-drawer").setAttribute('open', true);
}

function prevPage() {
    var link = document.getElementById("helper_prevpage").href;

    console.log("prev page:", link);
    changePage(link);
}

function nextPage() {
    var link = document.getElementById("helper_nextpage").href;

    console.log("next page:", link);
    changePage(link);
}

function setPage(url) { // 菜单跳转事件
    if (url === "") {
        return;
    }

    console.log("set page:", url);
    changePage(url);
}

function changePage(url) {
    // 加载图标
    var nextbtn = document.getElementsByClassName("next—page")[0]
    if (nextbtn != undefined) {
        nextbtn.setAttribute("loading", "");
    }

    // 发送 XHR 动态更新
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return; // 加载失败
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {

            // 滚动到顶部
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // 更新内容与翻页按钮
            var old_tag = document.getElementsByClassName("mdui-prose")[0];
            var old_topbar_tag = document.getElementsByClassName("navbtn")[0];
            var old_navcard_tag = document.getElementsByClassName("navcard")[0];
            var virtualtag = document.createElement('div');
            virtualtag.insertAdjacentHTML('beforeend', xhr.responseText);
            var title = virtualtag.getElementsByTagName("title")[0].innerText;
            old_tag.innerHTML = virtualtag.getElementsByClassName("mdui-prose")[0].innerHTML;
            old_topbar_tag.innerHTML = virtualtag.getElementsByClassName("navbtn")[0].innerHTML;
            old_navcard_tag.innerHTML = virtualtag.getElementsByClassName("navcard")[0].innerHTML;

            // 更新导航栏当前选择的内容
            var elements = document.querySelectorAll('[active]');
            elements.forEach(element => {
                element.removeAttribute('active');
            });
            var elementshighliht = document.querySelectorAll('[search_link="' + url + '"]');
            elementshighliht.forEach(element => {
                element.setAttribute('active', "true");
            });

            // 清除临时标签
            virtualtag.remove();

            // 添加历史记录
            history.pushState({ page: title }, title, url);

            // 刷新高亮
            hljs.highlightAll();
        }
    };
    // 发送 XHR
    xhr.open('GET', url, true);
    xhr.send(null);
}

// 当回到上一页时
window.addEventListener('popstate', function (event) {
    console.log('pop state:', window.location.protocol + "//" + window.location.host + location.pathname);
    changePage(window.location.protocol + "//" + window.location.host + location.pathname);
});
