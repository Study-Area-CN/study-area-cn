# Rocky Linux 安装

既然我们要学习 Linux，那我们肯定要亲自动手安装一遍系统。

不过安装系统并不是一件难事，有了前面的铺垫，其实自己也是可以搞明白的。

> 开始安装前请确保你有充足的时间（1-2个小时）并确保不会断电，安装系统比较耗费时间

---

下面是一个流程图，请跟着流程图的顺序进行阅读并实践。

```text
         _ 在 VMWare WS 安装 ----—_
        /                         \
 下载 ISO -- 在 VirtualBox 安装 -- 安装 Rocky Linux
        \_                       _/
           在你的电脑安装 ---------
```

1. 0x00 下载ISO
2. 0x01 以下三种安装方式任选其一

   * [在 VMWare WS 上安装](./install_in_vmware.md)
   * [在 VirtualBox 安装](./install_in_vbox.md)
   * [在你的电脑（实体机）安装](./install_in_your_pc.md)

3. 0x02 [安装 Rocky Linux](./install_rocky_linux.md)

## 下载ISO

下面是 Rocky Linux 的官网：

> [rockylinux.org](https://rockylinux.org/zh_CN)

下面是几个可以直接下载 ISO 文件的链接：

> ISO文件较大（10GB左右），建议使用专业的下载工具，如`IDM`(Windows下收费软件)，~~`迅雷`~~（有服务器加速，较快，但有广告等问题），`Motrix`（跨平台开源，不过较慢），~~PCL（一个某游戏启动器，不过下载文件超级快）~~ 等
>
> [官方](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.iso)（国内不推荐，网速较慢，某雷可以忽略，但官方有提供[种子文件](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.torrent))
>
> [阿里源](https://mirrors.aliyun.com/rockylinux/9/isos/x86_64/Rocky-9-latest-x86_64-dvd.iso)（国内镜像，推荐）
>
> [南京大学源](https://mirror.nju.edu.cn/rocky/9.4/isos/x86_64/Rocky-x86_64-dvd.iso)（国内镜像，较冷门，提供[种子](https://mirror.nju.edu.cn/rocky/9.4/isos/x86_64/Rocky-9.4-x86_64-dvd.torrent））
>
> 清华源不提供 rocky linux 的镜像

---

接下来请继续 Rocky Linux 的安装。

## 如何选择适合自己的安装方式

如果你有一台闲置的老电脑，或者是一块空的硬盘，那么[实体机安装](./install_rocky_linux/install_in_your_pc.md)是再合适不过的了。

如果你平常不玩游戏，也没有办公的需求或是专业软件，平时就写一写代码，那么你或许也可以尝试一下实体机安装。

虚拟机安装比较灵活，但是需要一定的性能，不过性能损耗也是很小的。

笔者配置：

```text
CPU: Intel(R) Celeron(R) G1840 (2) @ 2.80 GHz
内存: 11.39 GiB

OS 1: Arch Linux x86_64
桌面: KDE Plasma 6.0.5

OS 2: Windows 11
```

都可以流畅的使用 VirtualBox 运行虚拟机。

我们现在常见的虚拟机软件有以下几款：

1. VMWare Workstation Pro

    这是一款常见的企业级虚拟机软件。自从被博通收购后，产品对个人用户免费。
    优点: 有完整的官方文档支持，新手教程多
    缺点: 不开源，异常问题较难解决，被博通收购后下载链接很难找并且需要登录
2. VirtualBox

    这是一款开源免费的虚拟机软件，由 Oracle 维护。
    优点: 社区支持强大，开源，自定义程度高
    缺点: 新手使用会略微有些难度(不过也很简单)

* **[在 VMWare WS 上安装](./install_in_vmware.md)**
* **[在 VirtualBox 上安装](./install_in_vbox.md)**
* **[在你的电脑(实体机)安装](./install_in_your_pc.md)**

---
> study-area-cn
