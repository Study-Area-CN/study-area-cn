# 学习 Shell。

## 概念

Shell（也称为壳）在计算机中指“为用户提供用户界面”的软件，通常指的是命令行界面的解析器。一般来说，这个词是指操作系统中提供访问内核所提供之服务的程序。Shell也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面。因此与之相对的是内核（英语：Kernel），内核不提供和用户的交互功能。[1]

但是，在 Linux 中，我们通常所讲的 Shell 是指命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序来实现自动化的功能。

Shell 也指代一种命令语言，由这种语言编写的脚本称为 Shell Script。

Shell 命令语言的标准为参考 AT&T 的 ksh 和 GNU 计划的 Bourne Again Shell (bash) 制定的 The Open Group Base Specifications Issue 6 中的 [2.Shell Command Language](https://pubs.opengroup.org/onlinepubs/9690949599/utilities/xcu_chap02.html)。

本章我们将学习 Shell 的基本使用。

## 快捷键

Shell 也有快捷键？是的。大多数 Shell 都支持以下的快捷键：

- `C-C`：终止当前进程。
- `C-Z`：暂停当前进程。
- `C-D`：退出当前Shell。
- `C-L`：清屏。

在 Bash 中，还有一些特殊的快捷键，它们继承自 GNU Emacs 编辑器，用于快速移动光标以及编辑文本：

- `C-A`：移动光标到行首。
- `C-E`：移动光标到行尾。
- `C-B`：向左移动光标。
- `C-F`：向右移动光标。
- `C-K`：删除从光标位置到行尾的文本。
- `C-U`：删除从光标位置到行首的文本。
- `C-W`：删除光标左侧的单词。
- `C-Y`：粘贴之前删除的文本。

## 命令

命令分为内部命令和外部命令，内部命令是 Shell 自带的命令，外部命令是 Shell 外部的可执行程序。

一条 Shell 的指令的标准格式为：

```bash
command [options] [arguments]
```

其中，`command` 是命令的名称，`options` 是命令的选项，`arguments` 是命令的参数。

它的格式不一定必须遵守，但是通常遵守这个格式会带来更好的可读性（用什么工具采用什么方式对什么文件做什么）。

但是，有一个例外，就是指定输出，这时，我们推荐將指定输出的选项以及参数放在文件明后面。

例如，`ls` 命令用于列出当前目录下的文件和文件夹，它的选项可以是 `-l`、`-a` 等，参数可以是文件名或目录名。

## 变量

Shell 中的变量分为环境变量和用户变量，环境变量是Shell启动时自动设置的变量，用户变量是用户自定义的变量。

用户变量可以通过 `export` 命令设置为临时环境变量，例如：

```bash
export GREET="Hello, World!"
```

然后我们在这个 Shell 里启动一个新的 Shell，仍然可以在环境中找到这个变量。

```bash
bash -c 'echo $GREET'
```

> `export` 声明的变量只在当前环境下有效，如果你开启了个新的终端或者重启，那么这个环境就无效了

用户变量可以通过 `declare` 命令声明，例如：

```bash
declare USER_GREET="Hello, Shell"
```

变量可以通过 `${}` 或 `$` 符号来引用，例如：

```bash
echo ${GREET}
echo $USER_GREET
```

> 当变量的前后有别的内容紧挨着，那么只能使用 `${}`。

## 特殊的环境变量

Shell 中有一些特殊的环境变量，它们在 Shell 启动时自动设置，例如：

- `$HOME`：当前用户的主目录。
- `$PATH`：可执行文件的搜索路径。
- `$SHELL`：当前Shell的名称。
- `$PWD`：当前工作目录。
- `$USER`：当前用户的用户名。

其中最重要也是最常用的就是 PATH，它决定了Shell在执行命令时搜索可执行文件的路径。当我们发现明明安装了某个软件但是找不到可执行文件的时候应该首先检查 PATH 的设置。如果你熟悉 Windows，你会发现 Windows 的 PATH 是一串由分号分隔的路径。而 Linux 下的路径使用的是 `:` 冒号分隔。

> 在 Windows 中的 PATH 中有一条路径是 `.` 就是当前目录，而 Linux 中默认是不会搜索当前目录的。如果你在当前目录有一个 `run.sh`，那么你必须要使用 `./run.sh` 才能执行。

## 管道

Shell 中的管道是链接两个命令的方式，管道遵守下面的格式。

```bash
command1 | command2
```

`command1` 的输出将会作为 `command2` 的输入提供，例如：

```bash
ls -a | grep "test"
```

这个命令将会列出当前目录下的所有文件，然后使用 `grep` 命令过滤出文件名包含"test"的文件。

## 输出重定向

Shell 中的重定向是改变命令的输出地点的方式，重定向遵守下面的格式。

```bash
command > file
```

`command` 的输出将会被重定向到 `file` 中，例如：

```bash
ls -a > files.txt
```

这个命令将会列出当前目录下的所有文件，然后使用 `>` 符号将输出重定向到 `files.txt` 中。

## 输入重定向

Shell 中的输入重定向是改变命令的输入地点的方式，输入重定向遵守下面的格式。

```bash
command < file
```

`command` 的输入将会被重定向到 `file` 中，例如：

```bash
cat < files.txt
```

这个命令将会读取 `files.txt` 中的内容，然后使用 `cat` 命令输出到标准输出中。

## 将命令的输出作为参数

让我们想像这个场景：有一个文件有一个文件名列表，我们想要获取这些文件的详细信息，这怎么实现呢？

运算符 `$()` 可以将命令的输出作为参数，它的标准格式如下：

```bash
command1 $(command2)
```

`command2` 的输出将会作为 `command1` 的参数。

实现前文的场景所需的命令如下：

```bash
ls -l $(cat files.txt)
```

这个命令将会读取 `files.txt` 中的文件名列表，然后使用 `ls -l` 命令获取这些文件的详细信息。

## 课后作业

1. 使用 Shell 的输出重定向功能，在主目录中创建一个保存了主目录中所有文件列表的文件，命名为 `files.txt`
2. 使用 `cat` 读取所有文件的内容。

## 参考

- [Shell - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shell)