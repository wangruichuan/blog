## 学习路线

当然了，我也不是专业的运维，只是有些东西，从运维的角度，学习到一些运维的知识，会让你更好的理解一些前端的东西。

- Linux
- Nginx
- CI/CD
- K8S
- Ansible：自动化工具
- ELK:日志
- Prometheus: 监控
- ...
  
## Nginx

是一个高性能的HTTP和反向代理服务器，也提供了IMAP/POP3/SMTP服务.


### 反向代理

正向代理：就比如我们打游戏需要开加速器，我们的请求到一个服务器，这个服务器帮我们去请求真正的资源。

反向代理：每天很多人去访问百度，难道 `baidu.com` 就一个实体服务器吗？肯定是有多个实体服务器的，但是对于前端来说是感知不到的，我前端只需要访问你这个域名对应的服务器就行了。这就是所谓的反向代理。后面我无论动态增加多少服务器，永远访问的是我们的域名。

![](https://pic1.imgdb.cn/item/68a2d01b58cb8da5c82e29fa.png)

### 负载均衡
- 轮询
- 加权轮询
- ip hash：

### 动静分离

## Cloudflare

https://v.douyin.com/SAlJzwvdcE4/ 

是一家提供 CDN,网络安全，DDos防御 和 卖域名的公司

提供了这些免费服务：
1. DNS:开启代理后，来自浏览器的数据会先流经cloudflare，再到达源服务器。开启后，自动提供CDN,SSL证书，DDoS 防护
2. 隐藏真实IP：攻击者的DDos只能攻击到cloudflare的服务器
3. Pages：静态网站托管
4. Worker：每天十万次，无服务器计算。我们编写一段代码，可以是JS/TS/PY,把代码上传到Worker，用户编写的这个函数就会部署到全世界的CDN节点上，会生成一个地址，每当访问这个地址，就会在最近的CDN上运行并返回数据，从而减少了延迟，这种就叫做 边缘计算，可以干各种各样的事情：重定向、过滤、代理、做内网穿透、做缓存等等。github上一个项目 awesome-cloudflare，里面收录了很多相关的项目。
5. Worker AI:提供在Worker中调用AI的能力
6. R2数据库：对象存储。每月10GB
7. Tunnel:内网穿透
8. Turnstile：又叫 Cloudflare五秒盾，可以为网站添加一个反爬虫人机验证功能
9. Images：图像处理
10. 无限邮箱

## Tmux

全称：Terminal Multiplexe 

通常一个terminal同一时间只会运行一个程序

tmux创建出来的进程以及窗口布局等信息被保存在session中，当用户关闭窗口时，tmux也会跟着退出，但session和其中的进程会继续运行，下次进入tmux可以选择重新进入session。

当我们不带参数调用 tmux 调用时，tmux会创建一个新的session，并且在session中创建一个默认的shell，当前正在运行的程序的名字会在状态栏显示出来

![](https://pic1.imgdb.cn/item/68c9edd2c5157e1a880efd26.png)


ctrl + b % — 左右分屏
ctrl + b “ — 上下分屏
ctrl + b 光标 — 切换焦点（按住CT+B不放是调大小，按下松开再方向键是切换窗口）
ctrl + b c — 创建window (带星号的是当前正在显示的window)
ctrl + b 数字 — 切换window
ctrl + b d — 退出tmux

tmux — 创建session
tmux new -s wang — 创建session，并命名为wang
tmux ls — 列出session
tmux a -t 0 — 重新进入名字为0的sessin
tmux a — 重新进入最新的session
tmux kill-session -t 0 — 退出session 0

~/.tmux.conf — 配置文件
set -g mouse on — 开启鼠标支持
set -g prefix C-s — ctrl + b前缀改成ctrl + s