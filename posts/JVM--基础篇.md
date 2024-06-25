# 引言

![image-20240619145334658](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619145334658.png)

# 一、初识JVM

JVM 本质上是一个运行在计算机上的程序，他的职责是运行**Java字节码文件**

![image-20240619145441878](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619145441878.png)

JVM有三个功能：

1. **解释和运行**：对字节码进行实时的解释，解释成机器码，让计算机执行
2. **内存管理**：分配内存、垃圾回收
3. **即时编译**：对热点代码进行优化，提升执行效率

常见的JVM:需要遵守规范的

![image-20240619145936399](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619145936399.png)

# 二、字节码文件详解

## 2.1 总体概述

JVM需要先将字节码文件加载到内存中，这个过程就是由**类加载器**实现。

所以Java虚拟机要准备一块内存，去存放这些字节码文件中的类和接口。

当然，如果创建对象，还要为这些对象的内存负责。**这块存放类和对象的区域，叫做 运行时 数据区域。**

字节码中的类和接口被加载到内存之后，虚拟机就要使用**执行引擎**去执行代码（需要将类中的字节码指令解释成机器码，同时使用即时编译去优化性能）有些对象不再使用了，还可以使用垃圾回收器来回收对象。

还有个本地接口的概念：Hopspot本身是用C++编写的，Java程序在运行的时候，肯定要调用一些底层用C++编写的方法，它们是不存在我们的字节码文件中，**比如一些native方法，这些方法统称为本地接口**。

## 2.2 字节码组成

包含五部分：基础信息、常量池、字段、方法、属性

### 2.2.1 基础信息

魔数、对应的Java版本号，访问表示符（public final等等），父类和接口

1. 魔数：隐含的，在jclasslib中看不到，都会携带这个

   ![image-20240619150809638](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619150809638.png)

文件是**无法通过文件扩展名来确定文件类型**的，文件扩展名可以随意修改，不影响文件的内容。

软件使用文件的**头几个字节(文件头)去校验文件的类型**，如果软件不支持该种类型就会出错

2. jdk版本号

![image-20240619150910041](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619150910041.png)

###  2.2.2 常量池

避免相同的内容重复定义，节省空间。

包含：**字符串常量、类or接口名、字段名**

![image-20240619151133748](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151133748.png)

为什么这么设计？

可以看一下视频的P6 （字段名和字面量重名的情况)

![image-20240619151244756](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151244756.png)

### 2.2.3 字段

**当前类和接口声明的字段信息**

### 2.2.4 方法

**当前类和接口声明的方法信息**

![image-20240619151428827](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151428827.png)

解释这个问题，就要回到 这段代码 的字节码具体是什么样的？

![image-20240619151607503](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151607503.png)

![image-20240619151618759](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151618759.png)

![image-20240619151628311](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151628311.png)

![image-20240619151639661](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151639661.png)

![image-20240619151649895](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151649895.png)

![image-20240619151658970](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151658970.png)

![image-20240619151710172](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151710172.png)

**i=i++的情况**

![image-20240619151725330](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151725330.png)

![image-20240619151735431](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151735431.png)

![image-20240619151744639](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151744639.png)

++i的情况：

![image-20240619151753373](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619151753373.png)

### 2.2.5 属性

类的属性，比如源码的文件名、内部类的列表等

## 2.3 工具

### 2.3.1 jclasslib

字节码文件要使用 `jclasslib` 软件打开

![image-20240619150318054](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619150318054.png)

当然，idea有这个插件

![image-20240619152707209](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619152707209.png)

### 2.3.2 javap

javap是JDK自带的反编译工具，可以通过控制台査看字节码文件的内容。适合在服务器上查看字节码文件内容

![image-20240619152802322](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619152802322.png)

### 2.3.3 arths

Arthas 是一款线上监控诊断产品，通过全局视角实时査看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，大大提升线上问题排查效率。

https://arthas.aliyun.com/doc/quick-start.html  官网

![image-20240619152912481](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619152912481.png)

# 三、类的声明周期

类的加载分为：加载、连接（验证、准备、解析）、初始化、使用、卸载

![image-20240619153016450](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153016450.png)

## 3.1 加载阶段

**类加载器**根据类的全限定名通过**不同的渠道**以二进制流的方式获取字节码信息。

类加载器在加载完类之后，Java虚拟机会将字节码中的信息保存到内存的**方法区**中。

![image-20240619153336124](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153336124.png)

同时，JVM还会在**堆**中生成一份与方法区中数据类似的java.lang.Class对象 （反射会用）

![image-20240619153432981](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153432981.png)

![image-20240619153450699](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153450699.png)

我们来分析，为什么要搞两份，难道反射就不能直接去方法区获取吗？

> 方法区的是C++编写的，无法获取，这是第一点。
>
> 堆区的信息其实要比方法区的少的

可以使用jdk中的hsdb工具查看内存

![image-20240619153638985](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153638985.png)

## 3.2 连接阶段

分为三个阶段：验证、准备、解析

1. 其中，验证是  **验证内容是否满足《Java虚拟机规范》**

2. 准备：为 **静态变量** 分配内存并**设置默认的初始值**。

![image-20240619153935782](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619153935782.png)

准备阶段只会给静态变量赋**初始值**，而每一种基本数据类型和引用数据类型都有其初始值。

> 深刻理解这里 的 初始值 是什么意思。不是说在代码里给静态变量的值，而是每个基本类型都有自己的初值，比如int是0，boolean是false等等。

❗ **final**修饰的基本数据类型的静态变量，在准备阶段直接会将代码中的值进行赋值。

![image-20240619154208990](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619154208990.png)

3. 解析：将常量池中的 **符号引用** 替换成指向**内存的直接引用**

## 3.3 初始化阶段

初始化阶段**会执行静态代码块中的代码，并为静态变量赋值**

![image-20240619154430983](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619154430983.png)

![image-20240619154523170](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619154523170.png)

**会导致类初始化的几种情况：**

1. **访问一个类的静态变量或者静态方法**，注意：变量是final修饰的，并且等号右边是常量不会触发初始化。

2. **调用Class.forName**(String className).
3. **new 一个该类的对象时**
4. **执行Main方法的当前类**

![image-20240619154835485](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619154835485.png)

![image-20240619154858150](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619154858150.png)

![image-20240619155000782](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619155000782.png)

练习题：

![image-20240619155017923](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619155017923.png)

![image-20240619155026828](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240619155026828.png)



# 四、类加载器

