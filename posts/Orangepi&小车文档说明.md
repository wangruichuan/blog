# 写在前面

- 需要下载的东西（合集），点下边链接，两个链接下载的东西是一样的，不过一个需要登录，一个会过期

- https://www.123pan.com/s/44PTjv-Gstrv.html  （永久有效，但是需要登录）

- https://ttttt.link/f/66797e65bc354  （无需登录，但是会过期）

  下载后，该安装的安装，该解压的解压，安装的时候，如果看不懂，就别动，一路next就行

  ![微信截图_20240618082943](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240618082943.png)

- 推荐安装一个 VScode，用于编写代码

- 在使用香橙派的Linux系统时，任何地方要输入密码时，密码都是 `orangepi`，Linux里输密码时，都是默认不显示的，输完摁`Enter`就行了

- 可以自己配一把好用的 螺丝刀（十字和一字的都需要）

- 拧螺丝的时候别拧太紧，差不多就行

- 拿板子的时候，要捏着板子的边缘，别碰到芯片   

- 搞一块小巧的充电宝，至少有usb+type c 或者 usb+usb 的接口

- 不用拘泥于我的步骤，我这里只是个示范，可以自己补充

- ![4b1c6c82a29cfa17e414f77728fc8ed](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/4b1c6c82a29cfa17e414f77728fc8ed.jpg)

  这是组装好的样子，可以看到，有轮子，车架，机械臂，各种线，板子等等。

  要做的事情就两个，把这个车子给拼起来，然后给orange pi 装一个Linux系统，最后把写的程序放上去就好

# 一、香橙派硬件说明

![image-20240617204619276](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240617204619276.png)

![image-20240617204628211](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240617204628211.png)

![image-20240617204644660](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240617204644660.png)

![image-20240617204724444](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240617204724444.png)

![image-20240617204831577](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240617204831577.png)

这些东西吧，其实官网都有，可以看一下，咱们这个是1GB内存的

http://www.orangepi.cn/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-Zero-3.html

Orangepi  这个东西本质上就是个小型的计算机，只不过资源受限，编程时要考虑的更多

# 二、香橙派入门

## 2.1 TF卡烧录

首先把需要下载的压缩包给解压，然后把里面的安装包给解压和安装。（烧录软件+镜像）

1. 找一个读卡器，把tf卡插入电脑（有的电脑自带tf卡口，插进去就好）

![872e1544781c078ba93812f7a957122](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/872e1544781c078ba93812f7a957122.jpg)

2. 将tf卡给格式化

   有的插进去后会自动弹出来这个界面，有的没，不过没关系

   ![image-20240618085730240](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618085730240.png)

   手动格式化：

​		![image-20240618085819616](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618085819616.png)

![image-20240618085857087](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618085857087.png)

3. 镜像烧录

   ![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090009464.png)

打开这个软件，界面如下：

![image-20240618090050849](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090050849.png)

我们点击 “ 从文件烧录”，选择之前下载的镜像文件。

![image-20240618090202786](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090202786.png)

然后点击 “ 选择目标磁盘”，选择我们插入的tf卡

![image-20240618090252179](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090252179.png)

最后点击 “现在烧录” 

![image-20240618090353669](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090353669.png)

等待进度条加载完就好了

![image-20240618090530587](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090530587.png)

显示烧录成功

![image-20240618090634412](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618090634412.png)

把卡拔下来，进行下一步操作

## 2.2 将TF卡插进Orange pi

1. 把TF卡插入Orange pi

   ![image-20240618140603108](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618140603108.png)

   2.USB转TTL模块的GND、TX和RX引脚 需要 通过 **杜邦线** 连接到开发板上的调试串口，具体如下（重要！！）：

   - USB转TTL模块的**GND**应连接到开发板的**GND**。

   - USB转TTL模块的**RX**应连接到开发板的**TX**。

   - USB转TTL模块的**TX**应连接到开发板的**RX**。

   - 示意图：

     ![image-20240618140907931](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618140907931.png)

     ![image-20240618141005705](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618141005705.png)

     ![image-20240618141029707](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618141029707.png)

     

## 2.3 串口调试，连接WiFi

因为我们这是第一次刷上系统，为了后续方便我们用ssh连接，我们先需要进入系统连上WiFi，拿到ip，然后就可以用SSH了，那第一次我们就需要使用串口连接，稍微有点麻烦，下边是教程。

1. 将上边的模块插入电脑的USB接口，并通过Type C口接入电源（绿色的板子上有一个小的拨钮，需要拨到上方。）

<img src="https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142056137.png" alt="image-20240618142056137" style="zoom: 25%;" />

2. 打开 `MobaXterm_Personal` 这个软件

![image-20240618142353831](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142353831.png)

![image-20240618142414975](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142414975.png)

3. 点击左上角的 Session

![image-20240618142453109](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142453109.png)

4. 点击Serial  

![image-20240618142614168](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142614168.png)

5. 选择串口 名为 USB-SERIAL CH340 的串口，然后设置码率为115200，点ok。

![image-20240618142747026](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618142747026.png)

6. 这时候可能会直接弹出一个终端界面，如果没有，就手动点击左侧的session 列表，选择刚才自己 创建的，双击点开。

   ![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618143028651.png)

![image-20240618143110801](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618143110801.png)

如果终端卡主了没东西显示，就把电源拔掉然后重新插上。直至显示下面的界面就代表OK了，出现`OPI Zero3` 的Logo。这个界面可能会有的字符显示乱码，没关系，不影响。



![image-20240618143223806](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618143223806.png)

❗如果没出现，请排除下边的原因：

①RX要对应TX , TX要对应RX。

 ②绿色的板子上有一个小的拨钮，需要拨到上方。

​	然后再重复上述操作。直至进入系统。

7. 打开WiFi，连接WiFi

   - 输入 `sudo nmcli radio wifi on` 命令，此命令用于打开香橙派的WiFi。
   - 连接WiFi的命令： `sudo nmcli dev wifi connect ISMCS password "cloud-edge"`

   > ❗注意：这步是用于让orangepi连接自己的WiFi，大家连接时，要换成自己的WiFi的用户名和密码。比如说，**我这里的WiFi的名字是ISMCS ，密码是 cloud-edge**，大家一定要根据自己的情况，**换成自己的**，别直接连Bistu这个校园网的WiFi，因为这个校园网需要认证，但是这里没法认证，当然，可以用自己的手机热点，但是切记，自己的电脑的WiFi也要连到相同的WiFi，实现orangepi和自己的电脑处于同一个内网中。 

![image-20240618144616673](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618144616673.png)

8. 查看orange pi 的ip 

   输入命令 `nmcli`，该命令用于查看网络信息

   ![image-20240618144826110](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618144826110.png)

上图中，inet4对应的属性就是orangepi的ip地址，这个可以记下来，比如我这里就是 `192.168.1.213`

## 2.4 SSH连接

我们在拿到ip之后，以后就不需要通过串口连接了，可以通过SSH，香橙派每次开机，都会自动连接WiFi的，但是因为DHCP的存在，有可能这个ip地址也会变，当我们用ssh连不上时，就要考虑再次用串口调试下。

1. 打开 FinalShell 这个软件

   ![image-20240618145239834](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145239834.png)

2. 新建一个SSH连接

![image-20240618145422412](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145422412.png)

填入刚才记录的香橙派的ip地址，用户名和密码都是 `orangepi`，其他不用动，名称随便填

![image-20240618145521582](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145521582.png)

3. 开启该连接，双击点击该下图中的位置

![image-20240618145603996](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145603996.png)

4. 弹出一个警告，我们点接受并保存（只会在第一次弹出来）

   ![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145736881.png)

5. 同样，出现orange pi 的logo时，就代表连接成功

   ![image-20240618145825957](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618145825957.png)

------

❗：连不上的原因可能如下：

1. ​	ip输入的不对
2.   orange pi 和电脑没处于同一个内网中，也就是这俩设备要连同一个WiFi
3.   之前的操作中，香橙派根本就没连上WiFi

## 2.5 Linux安装软件

先分析下我们都需要安装什么，首先，python是必要的，然后python需要利用pip安装一些库函数，比如web服务器的，串口的

那我们就示范下怎么安装。

### 2.5.1 安装python和pip

`sudo apt-get install python3-pip`

会要求输入密码，密码是orangepi，反是用到sudo，密码都是这个，不再说了，还有就是，Linux里输密码时，都是默认不显示的，输完摁空格就行了

![image-20240618151403612](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618151403612.png)

出现如下界面，输入Y

![image-20240618151519900](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618151519900.png)

安装成功，如下

![image-20240618151604768](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618151604768.png)

### 2.5.2 安装web.py

1. 安装python的web库，用于http通信，命令如下：

`sudo pip install web.py --break-system-packages`

2. 如何测试已经安装成功？

命令行 输入`python3`，然后输入 `import web`，如果没报错就代表导包成功了，然后输入`exit()` 退出python环境。

![image-20240618152705277](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618152705277.png)

### 2.5.3 安装serial库

1. 安装pyserial库，和上边的流程一样，这个库是用于操作串口的，通过串口来控制小车的各种设备，命令如下：

`sudo pip3 install pyserial --break-system-packages  `

2. 测试是否安装成功

   输入`python3`

   输入`import serial`，没报错，就可以输入exit()退出python环境了

------

理论上安装这两个库就可以了，如果想实现各种功能，需要用到其他的python库，可以自己安装。

## 2.6 Linux 设置自启程序

这里要设置开机自启一个程序（初始化，需要关闭一些端口），为了后续安装小车时的一些需要。

### 2.6.1 传递文件

这里我们通过finalshell这个软件给orangepi发送一个软件，看我操作。

1. 首先打开我们之前下载的文件里有一个文件夹，叫做 小车示例代码，找到boot.py这个文件

   ![image-20240618153927859](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618153927859.png)

2. 打开Final Shell软件，进行发送（前提是连上了ssh）

   ![image-20240618154007205](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618154007205.png)

选中，然后确认

![image-20240618154101803](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618154101803.png)

可以看到orange pi 的/home/orangepi 目录下多了一个boot.py的文件

![image-20240618154154980](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618154154980.png)

那我们接下来要做的就是实现 开机时，自动执行这段程序。

### 2.6.2. 通过rc.local文件来实现开机自启（非必要）

`rc.local`文件位于`/etc/rc.local`文件下，**当Linux系统开机时会以root权限对这个文件中的脚本内容进行执行**，所以我们可以通过在这个文件中加入应用启动脚本来完成我们想要的效果。

**步骤一：编辑`/etc/rc.local`文件，命令如下（使用vim编辑）**

`sudo vim /etc/rc.local`

要输入密码，然后显示如下界面

![image-20240618154704373](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618154704373.png)

我们使用`↓`键，让光标来到exit 0 的上方，然后摁 `i` 键，进入vim 的编辑模式，输入如下代码

```shell
python3 /home/orangepi/boot.py &
```

如图所示：

![image-20240618155337306](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618155337306.png)

接着 按`ESC`，敲 `：` 键，输入`wq`，保存文件并退出。这样，以后每次开机时，都会自动启动这段代码了，并且是后台执行的。

![image-20240618155526750](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240618155526750.png)

# 三、小车组装

Linux至此已经安装成功，接下来可以组装小车了。

这个环节主要包括这几个部分：车架、车轮、电机，3d打印的支架，以及这块绿色的小板子

这步安装好后的样子是什么样：

![869309778aecd53fb77c0b5be1914e6](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/869309778aecd53fb77c0b5be1914e6.jpg)

## 3.1 车轮安装

这里我示范一个车轮怎么安装，其余的都类似，注意方向即可

这步需要的零件如下图：

![7f73ae76e4306ad09c46805291fd212](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/7f73ae76e4306ad09c46805291fd212.jpg)

步骤如下

1. 对准电机和车架上的孔位

![2252e615bf26e05a746a90d51aa6b10](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/2252e615bf26e05a746a90d51aa6b10.jpg)

2. 置入两颗长的螺丝

   ![fed026b05b880c2fd3dddf88ee08014](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/fed026b05b880c2fd3dddf88ee08014.jpg)

3. 拧螺母

   ![53d0d1bda71307fcc80ce628eabd809](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/53d0d1bda71307fcc80ce628eabd809.jpg)

4. 装上轴承套（我也不知道这个叫啥，就这个白色的塑料的小玩意）

![d4d6926db0a48a75fd83cbe2ebce5d5](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/d4d6926db0a48a75fd83cbe2ebce5d5.jpg)

5. 对准，装车轮

   ![7ad0eccf46450152a808243519d9db9](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/7ad0eccf46450152a808243519d9db9.jpg)

6. 拧螺丝

   ![06dcb6618a85d073b8f87af76993028](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/06dcb6618a85d073b8f87af76993028.jpg)

> 其余三个步骤都一样的，注意电机安装的方向即可。

## 3.2 固定orangepi 和电机控制板

先看这步完成的效果

![f1df81b54cd6645904cf414a60eaa5a](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/f1df81b54cd6645904cf414a60eaa5a.jpg)

可以看到需要这些东西：3D支撑，电机控制板，OrangePi，螺丝螺母（需用到一字螺丝刀）

这步最好给四个车轮标个号，不然一会就不知道装的哪个了，此步骤所需零件如下图

![a26869d718f0b559ccc15f590a3b720](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/a26869d718f0b559ccc15f590a3b720.jpg)

**具体步骤如下**

1. 提前装上这6颗螺丝，注意左边这两个是长的

![b40d91c1aa6b3fa6e9bfe4cf3751a20](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/b40d91c1aa6b3fa6e9bfe4cf3751a20.jpg)

2. 将3D支撑装到车轮上，注意我在图中圈出来的孔位，要对准，然后拧上螺丝和螺母

![5860285c0e7b9ae70dab85420a4d953](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/5860285c0e7b9ae70dab85420a4d953.jpg)

3. 将Orangepi给固定住，注意四个角的螺丝（可以找个镊子，这个不太好用力）

![3d448d92d281ac5f64314c3b95868dc](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/3d448d92d281ac5f64314c3b95868dc.jpg)

4. 安装和固定 电机控制板（对齐+拧螺丝）

![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/89193d364d65355b074293137d78fa5.jpg)

用线连接电机

注意，我这里为了方便，给四个轮子进行了编号，我的做法是

- 1号轮子连接板子上的po1
- 2号轮子连接板子上的po2
- 3号轮子连接板子上的po3
- 4号轮子连接板子上的po4

> 我这里只是个示范，为了方便，这样连接。
>
> 如果不这样连接，后边在编程时需要自己一个一个调试，哪个GPIO口对应哪个轮子（电机），其实都可以的，后边都可以自己慢慢调。

5. 连接小车电机电源线。

   为了驱动小车，我们使用外置电源给小车的电机供电，可以看到我们有一个USB线（红线+黑线）

   我们让红色的线连上UCC，黑色的线连上GND。

   USB口连接外置电源（安装完毕后再连），如图所示

   ![c3828835f709832175162a720c16e81](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/c3828835f709832175162a720c16e81.jpg)

   

------

至此，小车部分安装完成，开始下一个环节，机械臂组装。

# 四、机械臂组装

我们还是先看组装完是什么样，如下图

需要提醒的是，安装机械臂的时候，有一些细节需要注意，各种微调。一定要心细一点。

最后是需要将 机械臂安装到小车上固定的，但是为了调试方便，我们就先单独安装机械臂调试。

![60ffb5890660f146d26f2cfde7a253a](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/60ffb5890660f146d26f2cfde7a253a.jpg)

我先给大家讲下这部分包含什么：6个小电机，机械臂架子、固定的小片、螺丝若干、平面轴承

## 4.1 安装教程

### 4.1.0 电机还原到初始位置

这步的目的是把电机的选择角度设置一个固定的位置，比如我这里设置的是90°（电机的范围是0到180°），这样每次连上，电机都在一个固定的位置，方便后续操作。

非常简单，这个绿色arduino板子提前刷好了代码，只要把电机插入对应位置，然后usb连接到电源通电，就会自动转到90°的位置（初始位置）大家可以装一个试一个，也可以一次性全还原到初始位置（后续需要一点点微调）

如图所示，大家要注意电机的线是如何插到板子上的，注意方向。

![b0033db05f2527678fa85e80b341db8](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/b0033db05f2527678fa85e80b341db8.jpg)

![06ac6e8738babe72d25c1434b473be6](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/06ac6e8738babe72d25c1434b473be6.jpg)

### 4.1.1 安装底座

把舵机插入底座，把平面轴承放在底座里，安装底座上盖

注意：要对准位置，下图3中，电机的方向和我盖子上的方向要一致，这样才能实现让初始位置在一个合适的位置。

![90c3b3aa1e9b5a6598044943a73a1fd](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/90c3b3aa1e9b5a6598044943a73a1fd.jpg)

下边这个是个示意图，看看就行，不太对的上

![image-20240620105751047](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620105751047.png)

### 4.1.2 安装大臂舵机

![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/caa3453de2c948f6878d045d620dc2f.jpg)

拧上边那个螺丝的时候还是有点技巧的，先从正面那一个镊子或者有磁力的螺丝刀给捅进去，然后再用螺丝刀从右边那个孔穿过去拧紧

![5bce231c4fde66f34121dd14c731e76](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/5bce231c4fde66f34121dd14c731e76.jpg)

![](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620151809116.png)

![image-20240620152012090](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620152012090.png)

![image-20240620152145408](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620152145408.png)

还有两个关节跟这个一模一样，效果如下

![743bf32d4f71f82ae2cc621768491c9](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/743bf32d4f71f82ae2cc621768491c9.jpg)

### 4.1.3 安装夹子

需要的零部件如下：

![a3996e36d64e8a9c865994de49505d5](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/a3996e36d64e8a9c865994de49505d5.jpg)

![b88f67856a63142168a2a3c841848f8](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/b88f67856a63142168a2a3c841848f8.jpg)

![image-20240620152652263](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620152652263.png)

![image-20240620152721890](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620152721890.png)

![bd1eb31aae36ddb39eb64930c7dfff6](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/bd1eb31aae36ddb39eb64930c7dfff6.jpg)

![e74e35143c473ae5b81dd3666e9565c](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/e74e35143c473ae5b81dd3666e9565c.jpg)

拧螺丝记得

![51f326effa1d8482d39b9ed9bae3bc8](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/51f326effa1d8482d39b9ed9bae3bc8.jpg)最后把这个夹子跟之前的装一块就完事了

![77706d8486dcedde0053ca345654dc5](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/77706d8486dcedde0053ca345654dc5.jpg)

![9361fd29c128f4d9209ddbef9650d98](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/9361fd29c128f4d9209ddbef9650d98.jpg)

![e9bddae17b2d398dbaae99b47f5b642](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/e9bddae17b2d398dbaae99b47f5b642.jpg)

> ❗ 还是要说，装舵机之前记得要提前给调整到初始位置，然后就是不要拧太紧，插上电之后看有没有异响（有就说明某个舵机被卡住了），需要一个个排查好

## 4.2 机械臂调试教程

我们在组装好之后，可以对机械臂进行调试了，当然，调试非常简单，需要用到 **电脑**，**那块带usb口的绿色板子**

我们需要一个调试工具，就下边的这个XCOM，在之前的压缩包里也有，双击打开就行

![image-20240620153820900](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620153820900.png)

我们先把机械臂上的线接到板子上，记得自己接的顺序，我的建议是从上到下，分别接板子上的M01,M02...M06。如下图所示

![fc2001018601d33436002c6188c22f5](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/fc2001018601d33436002c6188c22f5.jpg)

我们打开 XCOM这个软件，界面如下

我们先选到我们的这个串口( CH340)

![image-20240620154805193](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620154805193.png)

波特率调到115200

![image-20240620154841568](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620154841568.png)

勾选 16进制发送，输入对应的指令 发送即可

![image-20240620154934507](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620154934507.png)

**指令格式说明**

为了方便说明，大家可以看下给这个板子刷的源码(看懂即可)

```c
#include <Servo.h>

unsigned char buf[6];

//标志位
int sm=0;
Servo servo0, servo1, servo2, servo3, servo4, servo5;

void setup() {
  Serial.begin(115200);
  servo0.attach(3);
  servo1.attach(5);
  servo2.attach(6);
  servo3.attach(9);
  servo4.attach(10);
  servo5.attach(11);
  servo0.write(90);
  servo1.write(90);
  servo2.write(90);
  servo3.write(90);
  servo4.write(90);
  servo5.write(90);
}

void loop() {
  char str[255];
  if (Serial.available() > 0) {

    int inByte = Serial.read();

    switch(sm){
      case 0:
        if(inByte==0xaa){
         sm=1;
        }
        break;
      case 1:
        if(inByte==0xbb){
         sm=2;
        }
        break;
      case 2:
        buf[0]=inByte;
        sm=3;
        break;
      case 3:
        buf[1]=inByte;
        sm=4;
        break;
      case 4:
        buf[2]=inByte;
        sm=5;
        break;
      case 5:
        buf[3]=inByte;
        sm=6;
        break;
      case 6:
        buf[4]=inByte;
        sm=7;
        break;
      case 7:
        buf[5]=inByte;
        sm=8;
        break;
      case 8:
        if(inByte==0xcc){
          sm=9;
        }
        else{
          sm=0;
        }
        break;
      case 9:
        if(inByte==0xdd){
          servo0.write(buf[0]);
          servo1.write(buf[1]);
          servo2.write(buf[2]);
          servo3.write(buf[3]);
          servo4.write(buf[4]);
          servo5.write(buf[5]);
        }
        sm=0;
        break;
      default:
        sm=0;      
    }
  }
}
```

------

指令格式如下（示例）

`aa bb 3c 5a 5a 5a 5a 5a cc dd`

其中，aa bb 和 cc dd 是指令的头和尾，没啥用

3c 5a 5a 5a 5a 5a 都代表16进制的角度（比如，5a=90°）

而且这六个位置分别代表 M01 , M02 , M03 , M04 , M05 , M06 接口对应的舵机的角度（自己看对应的是哪个）

------

❗**注意**：第一个位置（夹子对应的那个电机）设置的时候一定不要超过90°！！！！！！不然会卡死

# 五、机械臂和小车结合

我们在把机械臂给调试完成后，就可以开始这一步了。

我们需要先把底座给拆下来，方便拧螺丝

## 5.1 机械臂固定

在小车上选个合适的孔位，拧上螺丝和螺母（垫片）固定住即可

![7895ad72092dc2458ac3dc7d7a57f5c](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/7895ad72092dc2458ac3dc7d7a57f5c.jpg)

装好后如下图

![2f201ef2871b83fd4910e4d9fb2940a](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/2f201ef2871b83fd4910e4d9fb2940a.jpg)

## 5.2 固定板

应该是有一颗比较细的螺丝和螺母，固定到如下图的位置，以免板子给掉下来

![image-20240620180558797](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620180558797.png)

## 5.3 机械臂供电

这里需要给机械臂拉一根5V的线来给其供电，不然会无法驱动机械臂。如下：

![image-20240620180902249](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620180902249.png)

## 5.4 外接电源

这里我讲下：

那个有着红黑线的USB口连接充电宝上的USB口

再找一根有Typec的线利用充电宝给OrangePi供电

![image-20240620181412064](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240620181412064.png)

------

至此，所有的硬件安装教程已结束。

# 六、代码及小车控制原理详解

概述：在orangepi 上创建一个HTTP服务器，然后通过客户端给服务端发HTTP请求，服务器根据请求的类型和参数进行相应的操作。

​			其中，操纵小车使用的是GPIO（利用Linux命令），操作机械臂使用的是串口通信（调用相应的Serial库）

本教程中 服务器端使用的python，客户端使用的是JavaScript

## 6.1 HTTP基本知识

大家作为计算机相关专业，相比对HTTP这些使用早已烂熟于心，但为了教程的完整性，在这里进行一个概述

### 6.1.1 服务器端

### 6.1.2 客户端

## 6.2 小车代码详解

## 6.3 机械臂代码详解

