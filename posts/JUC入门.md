# 	入门

🌈说一下自己的情况，因为自己是学408的，对操作系统这些还是有点印象的，进程线程的基本原理还是知道，那么这个笔记更多的是想学一下在Java里怎么操作线程，编写这种高并发的程序

reference：https://blog.csdn.net/qq_40851232/category_12484050.html?spm=1001.2014.3001.5482



当前看到 3

## 	一、初步上手

### 	1.1 直接使用Thread

```java
// 构造方法的参数是 给线程指定名字 ，推荐这种
Thread t1 = new Thread("t1") {
 @Override
 public void run() {
 log.debug("hello");
 }
};
t1.start();
```

### 	1.2 使用Runnable配合Thread()

作用：把“线程”和“任务”（要执行的代码）分开

```java
// 创建任务对象
Runnable task2 = new Runnable() {
 @Override
 public void run() {
 log.debug("hello");
 }
};
// 参数1 是任务对象; 参数2 是线程名字，推荐
Thread t2 = new Thread(task2, "t2");
t2.start();

//使用lambda来精简代码
Runnable task2 = () -> log.debug("hello");
Thread t2 = new Thread(task2, "t2");
t2.start();

//之所以Runnable能使用lambda，主要是Runnable接口有@FunctionalInterface，该注解只允许存在一个接口方法。
```

- Thread是把线程和任务合并在了一起，Runnable是把线程和任务分开了
- 用 Runnable 更容易与线程池等高级 API 配合
- 用 Runnable 让任务类脱离了 Thread 继承体系，更灵活

### 	1.3 FutureTask

```java
// 创建任务对象
FutureTask<Integer> task3 = new FutureTask<>(() -> {
 log.debug("hello");
 return 100;
});
new Thread(task3, "t3").start();

// 主线程阻塞，同步等待 task 执行完毕的结果
Integer result = task3.get();
log.debug("结果是:{}", result);
```

其中get方法是一个主线程阻塞同步等待task执行完毕的结果

### 1.4 线程运行原理

 JVM 由堆、栈、方法区所组成，其中栈内存是给谁用的呢？每个线程启动后，虚拟机就会为其分配一块栈内存。

> 堆：用于存储**对象实例**和**数组**。堆空间的分配和回收是由 JVM 自动管理的。
>
> 栈：主要用于，存储 方法调用 时的**局部变量**、**方法参数**、**返回值**等。栈是线程私有的，每个线程都有自己独立的栈空间。当方法调用时，相关信息会被压入栈中，方法执行完毕后弹出。
>
> 方法区：用于存储**已被虚拟机加载的类信息、字节码**、**常量**、**静态变量**等数据。方法区也会进行垃圾回收。
>
> 实际的代码主要存放在方法区。而类的字节码就包含了实际的代码逻辑。

- 每个栈由多个**栈帧**（Frame）组成，对应着每次方法调用时所占用的内存
- 每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法

最开始是执行一个类加载，将类加载到java虚拟机中，加载的位置是将字节码放置在方法区

类加载完成后，java虚拟机就会启动一个main的主线程，给主线程分配一块栈内存，此时线程就交给任务调度器调度执行

如果cpu分配给我们的主线程了，虚拟机会给main方法分配一块栈帧内存



![img](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/a8bfa80b74644feb991e20af2e01d8fe.png)

总之就是 先进先出

![img](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/d457ac6dae8e476bb00cf97e65329169.png)

多线程其实本质上和单线程是一样的，不同点在于，每个线程都有一个自己私有的栈，每个栈里面还是个单线程一样，但是线程切换的话，会保存当前的操作。其实最本质的就是要理解，每个栈内存是相互独立的。

### 1.5 线程上下文切换

线程切换时机：

- 线程的 cpu 时间片用完
- 垃圾回收
- 有更高优先级的线程需要运行
- 线程自己调用了 sleep、yield、wait、join、park、synchronized、lock 等方法

当 Context Switch 发生时，需要由操作系统保存当前线程的状态，并恢复另一个线程的状态，Java 中对应的概念
就是程序计数器，它的作用是记住下一条 jvm 指令的执行地址，是线程私有的

状态包括程序计数器、虚拟机栈中每个栈帧的信息，如局部变量、操作数栈、返回地址等

