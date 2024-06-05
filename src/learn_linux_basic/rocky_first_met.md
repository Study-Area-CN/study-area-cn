# Rocky Linux 初见

既然我们的标题是`Rocky Linux 初见`，那么我们肯定要亲自动手安一遍系统。

不过安系统并不是一个难事，有了前面的铺垫，其实自己也是可以搞明白的。

> 开始安装前请确保你有着充足的时间（1-2个小时）并确保不会断电，安装系统比较耗费时间

---

下面是一个流程图，请跟着流程图的顺序进行阅读并实践。

```text
         _ 在 VMWare WS 安装 ----—_
        /                         \
 下载 ISO -- 在 VirtualBox 安装 -- 安装 Rocky Linux
        \_                       _/
           在你的电脑安装 ---------
```

以下为方便屏幕宽度不足的设备阅读：

1. 0x00 下载ISO
2. 0x01 以下三种安装方式任选其一

   * [在 VMWare WS 安装]()
   * [在 VirtualBox 安装](./install_rocky_linux/install_in_vbox.md)
   * [在你的电脑(实体机)安装]()

3. 0x02 [安装 Rocky Linux](./install_rocky_linux/install_rocky_linux.md)

## 下载ISO

下面是 Rocky Linux 的官网：

> [rockylinux.org](https://rockylinux.org/zh_CN)

下面是几个可以直接下载 ISO 文件的链接：

> ISO文件较大(`10GB`左右)，建议使用专业的下载工具，如`IDM`(Windows下收费软件)，~~`迅雷`~~(有服务器加速，较快，但是有广告等问题)，`Motrix`(跨平台开源，不过较慢)，~~PCL(一个某游戏启动器，不过下载文件超级快)~~ 等
>
> [官方](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.iso) (国内不推荐，网速较慢，某雷可以忽略，但官方有提供[种子文件](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.torrent))
>
> [阿里源](https://mirrors.aliyun.com/rockylinux/9/isos/x86_64/Rocky-9-latest-x86_64-dvd.iso) (国内镜像，推荐)
>
> [南京大学源](https://mirror.nju.edu.cn/rocky/9.4/isos/x86_64/Rocky-x86_64-dvd.iso) (国内镜像，较冷门，提供[种子](https://mirror.nju.edu.cn/rocky/9.4/isos/x86_64/Rocky-9.4-x86_64-dvd.torrent))
>
> 清华源不提供 rocky linux 的镜像

---

接下来请继续 Rocky Linux 的安装。
