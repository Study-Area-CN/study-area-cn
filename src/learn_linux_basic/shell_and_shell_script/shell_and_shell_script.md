# Shell 与 Shell Script

在之前的“Linux 常识”中我们接触到了一些简单的 Linux 命令。实际上，这些命令都被运行在一个叫 `Shell` 的程序上。

## 什么是 Shell

> Shell（也称为壳）在计算机中指“为用户提供用户界面”的软件，通常指的是命令行界面的解析器。一般来说，这个词是指操作系统中提供访问内核所提供之服务的程序。Shell也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面。因此与之相对的是内核（英语：Kernel），内核不提供和用户的交互功能。[1]
>
> 但是，在 Linux 中，我们通常所讲的 Shell 是指命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序来实现自动化的功能。
>
> Shell 也指代一种命令语言，由这种语言编写的脚本称为 Shell Script。

如果你听不太懂的话，你可以简单的把 Shell 理解为内核的秘书。秘书主要干什么？就是帮助老板安排会议、与他人沟通的嘛。


## Shell 有哪些

在 Windows 上，你或许知道 CMD。CMD 在 Windows 上其实就扮演了Shell的作用。但是在 Linux 上，就连 Shell 也有好多种。下面是许多常见的 Shell：

- `sh`（Bourne Shell）现在只在某些“嵌入式”的 Linux 设备上使用（绝大部分都用“软链接”指向其它 Shell）。在现在的 Linux 上输入 `sh`，打开的大概率是 Bash。
- `bash`（Bourne Again Shell）被使用最广泛的 Shell，现在几乎所有的发行版都能看见 Bash 的身影。
- `ash` 嵌入式常见的 Shell，功能相比 Bash 有些许缺失，但是体积十分的小，通常由 `busybox`（一个 Linux 基本命令的微型实现）提供。
- `dash` 和 ash 都是用于嵌入式的微型 Shell。
- `zsh` 一个新兴的 Shell，扩展能力十分强，被现在的 MacOS 作为默认 Shell。部分语法略有不同。

下文的所有内容均以 `bash` 为标准。

> Shell 命令语言的标准为参考 AT&T 的 ksh 和 GNU 计划的 Bourne Again Shell 制定的 The Open Group Base Specifications Issue 6 中的 [2.Shell Command Language](https://pubs.opengroup.org/onlinepubs/9690949599/utilities/xcu_chap02.html)。

## 启动 Shell

我们前面学习的“终端”实际上就是运行了一个 Shell，然后把这个 Shell 的内容输出到你的屏幕上。

当然你可以在 Shell 内再运行一个 Shell：

```bash
bash
```

可以输入 `exit` 退出当前 Shell，返回到上一级 Shell（如有）。

也可以使用 `-c` 单独执行一行 Shell 命令然后退出：

```bash
bash -c "<要执行的命令>"
```

例如 `bash -c "ls"` 和直接执行 `ls` 的效果是一样的。那么 `-c` 选项有什么用呢？好处就是启动了一个新的 Shell 环境，在执行脚本的时候和原来环境的不会冲突。

## 参考

- [Shell - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shell)

---

> study-area-cn
