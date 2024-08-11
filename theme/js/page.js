if (window.innerWidth > 640) {
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

function setPage(url) {
    if (url === "") {
        return;
    }

    console.log("set page:", url);
    changePage(url);
}

function changePage(url) {
    var nextbtn = document.getElementsByClassName("next—page")[0]
    if (nextbtn != undefined) {
        nextbtn.setAttribute("loading", "");
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            var old_tag = document.getElementsByClassName("mdui-prose")[0];
            var old_topbar_tag = document.getElementsByClassName("topbar")[0];
            var old_navcard_tag = document.getElementById("navcard");
            var virtualtag = document.createElement('div');
            virtualtag.insertAdjacentHTML('beforeend', xhr.responseText);
            var title = virtualtag.getElementsByTagName("title")[0].innerText;
            old_tag.innerHTML = virtualtag.getElementsByClassName("mdui-prose")[0].innerHTML;
            old_topbar_tag.innerHTML = virtualtag.getElementsByClassName("topbar")[0].innerHTML;
            old_navcard_tag.innerHTML = document.getElementById("navcard").innerHTML;

            var elements = document.querySelectorAll('[active]');
            elements.forEach(element => {
                element.removeAttribute('active');
            });
            var elementshighliht = document.querySelectorAll('[search_link="' + url + '"]');
            elementshighliht.forEach(element => {
                element.setAttribute('active', "true");
            });

            virtualtag.remove();
            history.pushState({ page: title }, title, url);

        }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
}

window.addEventListener('popstate', function (event) {
    console.log('pop state:', window.location.protocol + "//" + window.location.host + location.pathname);
    changePage(window.location.protocol + "//" + window.location.host + location.pathname);
});
