// 获取当前 toc 内容
var toc_obj = document.getElementById("helperframe").getElementsByTagName("ol")[0]

// html 转目录树
function createTree(elements) {
    let result = [];
    last = 0
    elements.childNodes.forEach(element => {
        // 有子元素并且不是大标题
        if (element.childNodes.length > 0 && (!element.classList.contains("part-title"))) {
            let a = element.childNodes[0]
            let link = a.tagName === 'A' ? a.href : '' // 获取链接，没有的就是目录
            if (link == '') { // 目录
                if (a.tagName === 'DIV') {  // 目录不可点击
                    result.push({
                        link: "#",
                        text: a.textContent,
                        child: [],
                        avtive: false
                    })
                } else { // 目录可点击
                    result[result.length - 1].child = createTree(element.getElementsByTagName("ol")[0])
                }
            } else { // 文章
                result.push({
                    link: link,
                    text: a.innerText,
                    child: [],
                    active: element.childNodes[0].classList.contains("active") // 当前选中的
                })
            }
        } else if (element.classList.contains("part-title")) { // 大标题
            result.push({
                link: "",
                text: `<h3 style="margin-top: 0px;margin-bottom:0;margin-left:0rem;"><strong>` + element.textContent + "</strong></h3>",
                child: [],
                active: false
            })
        }
    });
    return result
}

// 目录结构树生成新html的dfs部分
function loadTreeItem(treeitem, v) {
    var active_str = treeitem.active ? "active" : "" // 是否是当前文章

    if (treeitem.child.length > 0) { // 目录
        // 添加头部模板
        var i_str = `<mdui-collapse-item value=item"` + v.toString() + `">
            <mdui-list-item rounded slot="header" search_link="` + treeitem.link + `" ` + active_str + `><a href="javascript:void(0);" onclick="setPage('` + treeitem.link + `')" class="menu-link">` + treeitem.text + `</a><mdui-icon slot="end-icon" name="keyboard_arrow_down"></mdui-icon></mdui-list-item>
            <div style="margin-left: 1rem">
                <mdui-list-item rounded>
                    <mdui-collapse>`
        var i = 0
        treeitem.child.forEach(element => { // 拼接每级目录
            i_str = i_str + loadTreeItem(element, i)
            i++
        })
        // 添加尾部模板
        i_str = i_str + `</mdui-collapse>
                </mdui-list-item>
            </div>
        </mdui-collapse-item>`
        return i_str
    } else { // 文章
        disabled = treeitem.link === '#' ? "disabled" : ""
        return `<mdui-collapse-item><mdui-list-item rounded search_link="` + treeitem.link + `" ` + active_str + ` slot="header" ` + disabled + ` href="javascript:void(0);" onclick="setPage('` + treeitem.link + `')">` + treeitem.text + `</mdui-list-item></mdui-collapse-item>`
    }
}
// 目录结构树生成新html
function getResult(obj) {
    var get_tree = createTree(obj)
    var n_str = `<mdui-list><mdui-collapse>`
    var i = 0
    get_tree.forEach(element => {
        n_str = n_str + loadTreeItem(element, i)
        i++
    })
    n_str = n_str + `</mdui-collapse></mdui-list>`
    return n_str
}

// 插入内容
document.getElementById("toc-drawer").insertAdjacentHTML('beforeend', getResult(toc_obj));

// 移除 toc
document.getElementById("helperframe").remove()

// 终端内容
console.info("   _____ __            __      ___                    _______   __ \n  / ___// /___  ______/ /_  __/   |  ________  ____ _/ ____/ | / / \n  \\__ \\/ __/ / / / __  / / / / /| | / ___/ _ \\/ __ `/ /   /  |/ /  \n ___/ / /_/ /_/ / /_/ / /_/ / ___ |/ /  /  __/ /_/ / /___/ /|  /   \n/____/\\__/\\__,_/\\__,_/\\__, /_/  |_/_/   \\___/\\__,_/\\____/_/ |_/    \n                     /____/                                        \n欢迎来到 Study Area CN! \nstudy-area.org.cn \n")
console.info("本站使用mdbook生成，gitea action自动构建 \n恭喜你发现了彩蛋！")
console.info("欢迎参与我们的开源项目！ https://git.hmtsai.cn/study-area-cn/study-area-cn")
console.info("=====================================")
