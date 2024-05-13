# 中央处理单元(CPU)

## CPU的功能

好了﹐这里要说的是电脑的大脑。

`Central Processing Unit`(CPU) 我们翻译成中央处理器。一些专业的大型电脑，其CPU可以很大(不过绝大多数以计算机集群为主)﹐但在PC上面的CPU只是比饼干还要小的一片陶瓷片。只要打开电脑﹐把风扇拿掉，就可以一睹CPU的庐山真面目了。我们常问“您的机器是什么型号的啊？”﹐其实问的多指CPU的型号。或许您听过什么Intel I3,I5,I9等CPU﹐他们所代表的可以说是不同生产年代。事实上，除了Intel的CPU外，还有其它牌子的CPU可供选择。比方说：AMD等等。
> 译者注: mainframe、CPU型号、品牌等为过时内容，已更改或删除

CPU的功能如何呢？说来很复杂，主要为五个部分：

1. 输入单元

    用来读取给电脑处理的数据或程序
2. 处理单元

    用来执行计算、比较和判断等运算功能
3. 输出单元

    将电脑的运算结果和处理好的数据输出
4. 记忆单元

    用来储存数据或程序的地方
5. 控制单元

    按作业程序指挥上述单元的运作及交换数据信道的传送

## 不同年代的 CPU

我们常追求最新最快的CPU，但是不同年代的CPU究竟不同在哪里呢？如果真要解释清楚，恐怕要写一本书出来。不过，下面的表格相信也可以帮助我们了解一下。

|   项目/类型   | [80386(1985)](https://baike.baidu.com/item/Intel%2080386/433177) | [Pentium(奔腾)4(2000)](https://baike.baidu.com/item/%E5%A5%94%E8%85%BE4/9113325)  | [I5-6400(2010)](https://www.intel.cn/content/www/cn/zh/products/sku/88185/intel-core-i56400-processor-6m-cache-up-to-3-30-ghz/specifications.html) | [I5-10400(2019)](https://www.intel.cn/content/www/cn/zh/products/sku/199271/intel-core-i510400-processor-12m-cache-up-to-4-30-ghz/specifications.html) | [I5-14600(2023)](https://www.intel.cn/content/www/cn/zh/products/sku/199271/intel-core-i510400-processor-12m-cache-up-to-4-30-ghz/specifications.html)    |
| :------------ | :---------: | :-------------------: | :-----------: | :------------: | :---------------: |
| 指令集架构    | x86         | x86                   | x86-64        | x86-64         | x86-64            |
| 核心数        | 1           | 1                     | 4             | 6              | 6P(大)+8E(小)     |
| 计算速度      | 16-33 MHz   | 1.3-3.8 GHz           | 2.7(3.3) GHz  | 2.9(4.3) GHz   | P:2.7 Ghz E:2 Ghz |
| 制程          | ?           | 65-180nm              | 14nm          | 14nm           | 7nm (Intel 7)     |

> 以上CPU链接均摘自Intel官网和百度百科。</br>
> 最新数据请在 [Intel官网](https://www.intel.cn) 查看。</br>
> 以上CPU均为Intel CPU，AMD CPU请在 [AMD官网](https://www.amd.com) 查看。</br>
> 说明：1000 MHz = 1 GHz，计算速度括号内为睿频频率。</br>
---
> 译者注: 过时内容，当前数据选自 2024 年 5 月

在1980年末﹐IBM才开始大举进军个人电脑市场。在这之前﹐苹果在1976年就推出了 Apple I 个人电脑﹐之后 Apple II 也已经成功地拥有很大数量的用户了。IBM PC使用的CPU厂商Intel其实早在1976年也推出了一款型号叫8086的CPU，其后不久的8088和它很相近﹐比起现代的CPU来说，它们可以说是慢得像蜗牛了：最快的只有8MHz！Intel相继8086和8088之后还推出了80186和80188，但不是很成功。但是Intel打算将系统部件合并到CPU去的概念却对后来生产更快的CPU，如80286/80386，起到很重要的作用。从80386起人们就把80给去掉了，直接称为x86了。当Intel在推出486其后下一代的产品时，厂商将CPU型号命名为Pentium，从此，PII、PIII、P4等不同年代的CPU也都以Pentium命名。但在程序界中，仍有不少人继续称Pentium CPU为586，686的，只是越来越少人坚持如此了。

AMD在2005年5月推出了速龙64位处理器。这是首个消费级的x86-64(可简称x64)架构的处理器，在此之后的CPU大多都是x64架构的了。

所有年代的CPU都有一个特性：向后（旧）兼容。也就是说：486的CPU可以跑386的程序，但不能跑“专为”586写的程序，甚至现在的 I5、I7 都可以运行为386编写的程序！故此，许多程序员在发布程序版本的时候，仍将32位的程序冠以`i386`的名字（其中的i就是Intel的意思）。由于 AMD 发明了64位架构，于是64位的程序就被叫做`amd64`（或`x86-64`）了。

> 译者注: 补充 x64 架构的内容

## 如何发挥CPU的效率？

要真正发挥CPU的效率，与周边设施的配合是密不可分的。因为他们要在同一速率上才能工作，时间上必须要配合默契。当CPU完成了一个运算之后，I/O也要同时将产生的运算结果传达出去，也同时传给CPU下一个运算数据。这情形就像接力赛那样，如果时间不吻合，接力棒就会丢了。不过，CPU处理数据往往要比单纯的数据交接更须时间。聪明的CPU设计工程师想出了一道绝招：就是将CPU运行于比总线（BUS，所有系统数据的运送信道）快一定倍数的速度上。这样等周边反应过来的同时，CPU也率先完成运用了，（时至今日，CPU的速度远远快过周边，掉过来往往是CPU等它们了）。

据说，CPU在生产的时候都是一样的，之后厂家经过测试，按照尽可能稳定情况下的最高速度原则来定型号的。有些用家买了低速的CPU回来，然后经过改变CPU电压、频率以求更快的速度﹐这就是所谓的“超频”了。不过，阁下看到这里可别忙着去修改自己的电脑哦，否则要有什么元件损坏，作者可概不负责的哦～

现在的CPU一般会有睿频功能，相当于CPU自带的“超频”，可以智能调整电压和频率，不过睿频相比一般的超频是十分安全的，不会搞坏你的CPU。

> 译者注: 删除过时的计算CPU速度的内容，并更改标题

---
> 原文: [netman](http://www.study-area.org/compu/compu_cpu.htm)</br>
> 翻译: cxykevin</br>
> study-area-cn