
var toc_obj = document.getElementById("helperframe").getElementsByTagName("ol")[0]
function createTree(elements) {
    let result = [];
    last = 0
    elements.childNodes.forEach(element => {
        if (element.childNodes.length > 0 && (!element.classList.contains("part-title"))) {
            let a = element.childNodes[0]
            let link = a.tagName === 'A' ? a.href : ''
            if (link == '') {
                if (a.tagName === 'DIV') {
                    result.push({
                        link: "#",
                        text: a.textContent,
                        child: [],
                        avtive: false
                    })
                } else {
                    result[result.length - 1].child = createTree(element.getElementsByTagName("ol")[0])
                }
            } else {
                result.push({
                    link: link,
                    text: a.innerText,
                    child: [],
                    active: element.childNodes[0].classList.contains("active")
                })
            }
        } else if (element.classList.contains("part-title")) {
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
function loadTreeItem(treeitem, v) {
    var active_str = treeitem.active ? "active" : ""

    if (treeitem.child.length > 0) {
        var i_str = `<mdui-collapse-item value=item"` + v.toString() + `">
            <mdui-list-item rounded slot="header" `+ active_str + `><a href="` + treeitem.link + `" class="menu-link">` + treeitem.text + `</a><mdui-icon slot="end-icon" name="keyboard_arrow_down"></mdui-icon></mdui-list-item>
            <div style="margin-left: 1rem">
                <mdui-list-item rounded>
                    <mdui-collapse>`
        var i = 0
        treeitem.child.forEach(element => {
            i_str = i_str + loadTreeItem(element, i)
            i++
        })
        i_str = i_str + `</mdui-collapse>
                </mdui-list-item>
            </div>
        </mdui-collapse-item>`
        return i_str
    } else {
        disabled = treeitem.link === '#' ? "disabled" : ""
        return `<mdui-collapse-item><mdui-list-item rounded ` + active_str + ` slot="header" ` + disabled + ` href="` + treeitem.link + `">` + treeitem.text + `</mdui-list-item></mdui-collapse-item>`
    }
}
var get_tree = createTree(toc_obj)
var n_str = `<mdui-list><mdui-collapse>`
var i = 0
get_tree.forEach(element => {
    n_str = n_str + loadTreeItem(element, i)
    i++
})
n_str = n_str + `</mdui-collapse></mdui-list>`

document.getElementById("toc-drawer").insertAdjacentHTML('beforeend', n_str);

document.getElementById("helperframe").remove()

console.info("   _____ __            __      ___                    _______   __ \n  / ___// /___  ______/ /_  __/   |  ________  ____ _/ ____/ | / / \n  \\__ \\/ __/ / / / __  / / / / /| | / ___/ _ \\/ __ `/ /   /  |/ /  \n ___/ / /_/ /_/ / /_/ / /_/ / ___ |/ /  /  __/ /_/ / /___/ /|  /   \n/____/\\__/\\__,_/\\__,_/\\__, /_/  |_/_/   \\___/\\__,_/\\____/_/ |_/    \n                     /____/                                        \n欢迎来到 Study Area CN! \nstudy-area.org.cn \n")
console.info("本站使用mdbook生成，gitea action自动构建 \n恭喜你发现了彩蛋！")
console.info("欢迎参与我们的开源项目！ https://git.hmtsai.cn/study-area-cn/study-area-cn")
console.info("=====================================")
