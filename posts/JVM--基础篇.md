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



# 四、类加载器入门

## 4.1 干啥的

类加载器 只参与 **加载过程中的字节码获取并加载到内存** 这一部分



![image-20240625084551964](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625084551964.png)

![image-20240625084607009](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625084607009.png)

## 4.2 分类

分为两类，一类是Java代码中实现的，一类是Java虚拟机底层源码实现的。

底层用的不是JAVA，更多是C++，用于加载程序运行时的基础类，保证Java程序运行中基础类被正确的加载。

JDK中也默认提供了多种不同渠道的类加载器，可以自己定制

其中，对于JAVA实现的类加载器，都继承于抽象类 ClassLoader。即所有Java实现的类加载器都需要集成ClassLoader这个抽象类。

其中，在JDK8之中，有这样的几种类加载器

![image-20240625085246366](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625085246366.png)

其中：

**扩展类加载器**：扩展Java中一些比较通用的类

**应用程序加载器**：自己写的类，引用的jar包的类

> 在arthas如何查看类加载器有哪些？
>
> ![image-20240625090144786](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090144786.png)

### 4.2.1 启动类加载器

![image-20240625090314986](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090314986.png)

### 4.2.2 Java实现的

包括扩展类加载器，应用程序加载器。

它们的源码都位于`sun.misc.Launcher`中，是一个静态内部类。继承自`URLClassLoader`。

通过目录或者指定jar包将字节码文件加载到内存中。

![image-20240625090558592](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090558592.png)

![image-20240625090610634](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090610634.png)

# 五、双亲委派

由于Java虚拟机中有多个类加载器，双亲委派机制的核心是**<u>解决一个类到底由谁加载的问题</u>**。

![image-20240625090724798](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090724798.png)

当需要加载一个类时，首先会询问自定义类加载器的父类加载器是否已经加载过该类，如果没有，再依次向上询问更高层级的父类加载器，直到到达最顶层的启动类加载器。如果最顶层的启动类加载器也没有加载过，那么就会按照相反的顺序，由顶向下进行加载，从启动类加载器开始尝试加载，依次向下传递，直到有一个类加载器成功加载该类。

![image-20240625090817890](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090817890.png)

**自底向上查找是否加载过：**

![image-20240625090944376](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625090944376.png)

第二次再去加载相同的类，仍然会向上进行委派，如果某个类加载器加载过就会直接返回。

**自顶向下尝试加载：**

![image-20240625091202881](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625091202881.png)

## 5.1 机制详解

先看几个问题

1. 如果一个类重复出现在三个类加载器的加载位置，应该由谁来加载?

```
答：启动类加载器加载，根据双亲委派机制，它的优先级是最高的
```

2. String类能覆盖吗：在自己的项目中去创建一个java.lang.string类，会被加载吗

    答：不能，例如，如果在自己的项目中创建了一个`java.lang.String`类，当程序运行时，JVM 会优先使用由启动类加载器加载的真正的`java.lang.String`类，而您自定义的同名类会被忽略。

3. **在Java中如何使用代码的方式去主动加载一个类呢?**

   ![image-20240625091722664](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625091722664.png)

## 5.2 父类加载器

![image-20240625092348934](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625092348934.png)

## 5.3 面试：类的双亲委派机制是什么？

![image-20240625092516827](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625092516827.png)

## 5.4 打破双亲委派

前两种重要

![image-20240625093039771](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625093039771.png)

### 5.4.1 自定义类加载器 ※

> 双亲委派机制中，默认的类加载顺序是先让父类加载器尝试加载类，如果父类加载器无法加载，才由子类加载器去加载。
>
> 而当我们自定义类加载器并重写`loadClass`方法时，就能够完全掌控类的加载过程。我们可以决定在什么情况下、从何处去查找和加载类，而不再严格遵循父类加载器优先的规则。
>
> 以实现**热加载**功能为例：
>
> 通常，当一个类被加载后，如果对其进行了修改，JVM 会按照常规的类加载机制，不会重新加载修改后的类。但通过自定义类加载器，我们可以在检测到类被修改时，主动去重新查找并加载修改后的类字节码。
>
> 比如，我们可以指定一个特定的目录或者数据源来获取修改后的类字节码，然后通过自定义的逻辑将其加载到 JVM 中。这样，程序就能够使用到最新的类定义，实现了热加载的效果。
>
> 再举一个例子，如果我们希望从数据库中加载特定的类定义，也可以通过自定义类加载器，实现与常规文件系统不同的类加载来源和方式。
>
> 在默认情况下，`loadClass` 方法会先委托父类加载器尝试加载类，如果父类加载器无法加载，才会由当前类加载器进行加载。
>
> 而当我们重写 `loadClass` 方法时，就可以完全自定义类的加载流程。
>
> 例如，我们可能会直接在当前类加载器中进行类的查找和加载，而不先委托给父类加载器。或者，我们可能会按照与双亲委派机制完全不同的顺序去查找和加载类。
>
> 比如说，原本应该先让父类加载器尝试加载的类，我们在重写的 `loadClass` 方法中决定先在本地特定的位置查找并加载，而不管父类加载器是否已经加载过或者能否加载。
>
> 再比如，我们可能会根据类的某些特定属性或条件，来决定是由当前类加载器加载，还是委托给其他特定的类加载器，而不是遵循双亲委派默认的从父到子的顺序。
>
> 总之，重写 `loadClass` 方法使得我们能够跳出双亲委派机制预设的加载顺序和规则，从而实现对类加载过程的灵活控制，也就打破了双亲委派机制。

视频地址：

https://www.yuque.com/wangrc1218/ggnb4a/tuiivui7caf0hxus?singleDoc# 《自定义类加载器》

自定义类加载器并且重写`loadclass`方法，就可以将双亲委派机制的代码去除。

- 一个Tomcat程序中是可以运行多个Web应用的，如果这两个应用中出现了相同限定名的类，比如Servlet类Tomcat要保证这两个类都能加载并且它们应该是不同的类。
- 如果不打破双亲委派机制，当应用类加载器加载 Web应用1 中的MyServlet之后，Web应用2中相同限定名的MyServlet类就无法被加载了。

**核心思路：<u>不再走向上委派，向下加载的机制了</u>**

![image-20240625093843306](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625093843306.png)

那么，到底 如何自定义类加载器？

> 在 Java 中，`ClassLoader` 类是所有类加载器的父类，而常见的三种类加载器分别是启动类加载器（Bootstrap ClassLoader）、扩展类加载器（Extension ClassLoader）和应用程序类加载器（Application ClassLoader），它们之间存在着层次和委托的关系。
>
> `ClassLoader` 不是启动类加载器（Bootstrap ClassLoader）的直接父类。
>
> 启动类加载器是由 JVM 自身实现的，它并非从 `java.lang.ClassLoader` 直接继承而来。
>
> 但从概念和类层次结构的角度来说，`ClassLoader` 可以被视为所有通过 Java 代码实现的类加载器的父类，只是启动类加载器是个特殊的存在，不遵循这个继承关系。

拿我们做的就是看ClassLoader有四个方法

![image-20240625094554034](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625094554034.png)

![image-20240625095005837](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625095005837.png)



```java
protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
    {
        synchronized (getClassLoadingLock(name)) {
            // First, check if the class has already been loaded
            Class<?> c = findLoadedClass(name);
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                    // ClassNotFoundException thrown if class not found
                    // from the non-null parent class loader
                }

                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();
                    c = findClass(name);

                    // this is the defining class loader; record the stats
                    PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                    PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    PerfCounter.getFindClasses().increment();
                }
            }
            if (resolve) {
                resolveClass(c);
            }
            return c;
        }
```

这段 Java 代码定义了一个 `loadClass` 方法，用于加载指定名称的类。 

**方法的整体结构**：

- 方法使用了同步块 `synchronized (getClassLoadingLock(name))` 来确保在加载类的过程中线程安全。

- **类加载的步骤**： 

  - 1. 首先，通过 `findLoadedClass(name)` 检查类是否已经被加载，如果已经加载则直接返回。 
    2. 如果未加载，并且父类加载器 `parent` 不为空，尝试通过父类加载器加载类 `parent.loadClass(name, false)` 。
    3. 如果父类加载器为空或者父类加载器未找到该类，通过 `findBootstrapClassOrNull(name)` 查找引导类。 
    4.  如果仍然未找到，调用 `findClass(name)` 方法来查找和定义类。

  **类的解析**： 如果 `resolve` 为 `true` ，调用 `resolveClass(c)` 来解析类。

   **示例**： 假设我们有一个自定义的类加载器继承自这个类，当需要加载一个名为 `MyClass` 的类时，这个方法会按照上述步骤进行查找和加载。如果父类加载器能够成功加载，就直接使用父类加载器加载的结果；否则，自定义的类加载器中的 `findClass` 方法会负责最终的类查找和定义。 总体而言，这段代码实现了一个具有层次结构的类加载机制，并进行了相关的性能统计和类的解析处理。 



**问题**：

1. 两个自定义类加载器加载相同限定名的类，不会冲突吗?

​		不会，在同一个java虚拟机中，只有 **相同类加载器+相同的类限定名** 才会被认为是同一个类

2. 自定义类加载器父类怎么是AppClassLoader呢?

   ![image-20240625095631095](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625095631095.png)

   ![image-20240625095646619](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625095646619.png)

------

**正确的去实现一个自定义类加载器**

![image-20240625095736902](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625095736902.png)

### 5.4.2 利用线程上下文类加载器

JDBC中使用了**DriverManager**来管理项目中引入的不同数据库的驱动

DriverManager类位于rt.jar包中，由 **启动类加载器** 加载,

我们看这其中的道道

> DriverManager属于rt.jar是 启动类加载器 加载的。而用户jar包中的驱动需要由 应用类加载器 加载，这就违反
> 了双亲委派机制。

这违反了双亲委派机制，原因在于按照正常的双亲委派流程，应用类加载器应该先将加载请求委托给父类加载器（启动类加载器和扩展类加载器），如果它们都无法加载，应用类加载器才进行加载。

但在这里，用户 `jar` 包中的驱动没有遵循这个流程，直接由应用类加载器加载，跳过了父类加载器的尝试。

例如，假设我们有一个自定义的数据库驱动程序 `MyDriver` 放在用户的 `jar` 包中。按照双亲委派机制，应该先由启动类加载器和扩展类加载器尝试加载，但由于这些核心类加载器通常不了解和无法加载用户自定义的特定驱动，所以实际上是由应用类加载器直接加载了 `MyDriver` 。

**问题**：

DriverManager怎么知道jar包中要加载的驱动在哪儿?

![image-20240625101002753](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101002753.png)

jar包中的mysql到底是由谁加载的？

![image-20240625101019072](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101019072.png)

![image-20240625101413906](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101413906.png)

![image-20240625101500309](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101500309.png)

## 5.5 面试题

1. 类加载器的作用是什么？

   ![image-20240625101703924](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101703924.png)

2. 有几种类加载器？

   ![image-20240625101717368](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101717368.png)

3. 什么是双亲委派机制?

   ![image-20240625101730197](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101730197.png)

4. 怎么打破双亲委派机制？

![image-20240625101742708](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240625101742708.png)

# 六、JVM的内存区域

JVM需要先将字节码文件加载到内存中（类加载器），所以Java虚拟机要准备一块内存，去存放这些字节码文件中的类和接口。

当然，如果创建对象，还要为这些对象的内存负责。**这块存放类和对象的区域，叫做 *运行时* 数据区域。**

执行引擎（JNI,解释器，GC）去执行相应的指令

------

其中，运行时 数据区 可以分为两类： **线程共享**  和 **线程不共享**

**线程共享：**

1. 方法区
2. 堆

**线程不共享**

1. 程序计数器
2. JAVA虚拟机栈
3. 本地方法栈



**内存溢出**：程序在使用某一块内存区域时，存放的数据需要占用的内存大小超过了虚拟机能提供的内存上限。

## 6.1 程序计数器

每个线程会通过  程序计数器  记录  **当前要执行的的字节码指令的地址**。

![image-20240710101643738](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710101643738.png)

![image-20240710101713161](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710101713161.png)

在多线程执行情况下，Java虚拟机需要通过  **程序计数器**  记录  **CPU切换前解释执行到那一句指令**  并继续解释运行。

------

**程序员无需对程序计数器做任何处理。**

## 6.2 Java虚拟机栈

执行方法要进栈，方法结束要出栈

![image-20240710102909958](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710102909958.png)

![image-20240710102942812](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710102942812.png)

![image-20240710103206255](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710103206255.png)

Java虚拟机栈随着线程的创建而创建，而回收则会在线程的销毁时进行。由于方法可能会在不同线程中执行，每个线程都会包含一个自己的虚拟机栈。

------

**栈帧的组成**

1. 局部变量表：运行过程中存放所有的局部变量
2. 操作数栈：虚拟机在执行指令过程中用来存放临时数据的一块区域
3. 帧数据：主要包含动态链接、方法出口、异常表的引用

### 6.2.1 局部变量表

![image-20240710105403950](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710105403950.png)

**起始pc**：什么时候能访问

![image-20240710105455641](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710105455641.png)

**槽**：栈帧中的局部变量表是一个数组，数组中每一个位置称之为**槽(slot)**，lonq和double类型占用两个槽，其他类型占用一个槽。



**this**：

![image-20240710105633766](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710105633766.png)

**方法的参数**

![image-20240710110014245](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710110014245.png)

**局部变量 对槽的复用**

![image-20240710111613676](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710111613676.png)

### 6.2.2 操作数栈

![image-20240710111722321](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710111722321.png)

### 6.2.3 帧数据

1. **动态链接**

   ![image-20240710111941179](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710111941179.png)

2. **方法出口**

   ![image-20240710112024947](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710112024947.png)

3. **异常表**

![image-20240710112137313](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240710112137313.png)

## 6.3 本地方法栈

