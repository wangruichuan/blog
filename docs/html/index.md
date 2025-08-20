## 谈谈语义化

HTML5提出来一个很重要的概念叫做语义化，每一个HTML元素都代表一个含义，开发的过程，我们选择一个元素，应该由含义决定，而不是由样式决定。他的样式我们可以用css调。但是含义是无法变化的。
为什么如此重视含义呢
让搜索引擎和浏览器理解网页内容
我写个h1，就知道这里是个标题，写个p，就代表这里是个段落，如果全部用div，会不利于搜索引擎优化
第二个点，利于无障碍访问
第三个点，有利于浏览器插件分析网页的内容


## Cookie的坑

### SameSite

![](https://pic1.imgdb.cn/item/68931f1258cb8da5c809ab90.png)

用于限制跨站请求，如果请求的域和我页面的域不一致，那SameSite属性就会起作用，对这些请求做一些限制是否发送Cookie，由这个属性来决定是否发不发。

![](https://pic1.imgdb.cn/item/68931fbe58cb8da5c809adc8.png)

第五个就有点离谱，涉及到一个东西叫 公共后缀。

取值：
① None ：一旦设置为none，就必须使用https，会有csrf攻击
② Lax：宽松的：阻止所有的跨站请求，但是对超链接放行，点这个超链接的时候要不要带过去cookie
③ Strict：严格：阻止所有的跨站请求，对超链接不放行，场景就是“如果网站的删除用户信息是get的，伪装链接点下 可以直接发送get请求删除用户信息”

### 站点域/公共后缀

`Set-Cookie:...;domain=www.example.com;`

https://www.bilibili.com/video/BV1shRnYyEkr/

## 文件预览

文件预览没有银弹。实现方式强依赖于文件类型。

- 浏览器原生支持类型：图片、PDF、文本、音视频
- 前端库解析型：docx，markdown
- 第三方服务嵌入型：主要是office文档的高保真预览


1. 来看最简单的PDF预览：
把容器的innerHtml 设置成一个 iframe标签，然后src属性指向 pdf文件地址


2. 稍微复杂的word预览：引入mamonth。js

![](https://pic1.imgdb.cn/item/68a31b6c58cb8da5c831ade8.png)
   
3. Excel预览：使用微软的office在线服务

 ![](https://pic1.imgdb.cn/item/68a31bb558cb8da5c831b286.png)


 https://www.bilibili.com/video/BV1Qe41167wq/


## HTMLCollection & NodeList 的区别
- HTMLCollection：DOM对象集合，是一个伪数组，特点就是这个数组是实时的，这个集合里的东西是始终跟当前页面上的元素是挂钩的。对应的一个现象就是，如果说我用一个变量去存住一个HTMLCollection，那么这个变量里的东西，如果页面上的元素被删除了，那么这个变量里的东西就会变成null。这就会导致一些超出预期的行为。
- NodeList：如果我们使用新的API `querySelectorAll`，那么返回的是NodeList。尽管仍然是一个伪数组，但是不跟页面绑定了，你把页面上的元素删了，它dom对象还在，甚至你将来加回去都可以。


## 如何实现精确的setInterval（待完善）

![](https://pic1.imgdb.cn/item/68a19b2958cb8da5c82a8cd0.png)

https://www.bilibili.com/video/BV1Dm62YZEeS/?spm_id_from=333.1387.favlist.content.click&vd_source=d6026c8520318ca0d70d62989ee23568

谈这个问题前，你得首先搞懂清楚setTimeout为什么不是完全精准的定时器。其实这考的还是事件循环。

1. 事件循环影响回调时机，如果有同步阻塞的话，这个肯定是精确不了的
2. 4ms最小时间(嵌套五层以上以后)
3. 失活页面间隔会被调整为1s

这里给出解决方案：
1. 通过```performance.now```调整偏差：每次回调运行的时候调整这个偏差，调整一下时间间隔
2. ```requestAnimationFrame```：渲染帧
3. ```web worker```：不会失活页面影响，不会收到渲染帧的影响

## 资源描述符


**script标签：**

首先是不写的情况下，浏览器如何看待这个元素的呢？当浏览器从头到尾解析dom的时候，如果它遇到一个script元素，它没有任何的资源提示符，按照浏览器的渲染原理，这时候浏览器会等待，等待JS的下载，下载之后再去执行，然后再接着往后去解析dom，那么在这种情况下，咱们的渲染主线程会产生一段空闲时间，也就是阻塞的时间，这段时间它会等待js下载完成，什么也干不了，这就是默认模式。

默认模式的问题就是：明明后边还有很多事情要做，但是遇到了script元素，它就不得不阻塞，效率低下

于是HTML5给我们整了这么两个资源提示符：async和defer

`<script src='./index.js' defer> `

- async：浏览器看到这个标签后，它一边通知网络线程对这个JS文件进行下载，但是这一次它不再阻塞主线程了，等到这个JS下载完成后，再通知到主线程，再去执行这个js，不耽误。但是用这种资源提示符的时候，它JS的执行时机是不确定的，因为你不知道它什么时候下载完成，

- defer：当下载完成后，它不会立即执行，它一定等全部dom解析完成之后再去执行，执行的时机靠后了


**link标签：**

**preload 和 prefetch**：都是提前下载，然后缓存起来，都实际用的时候直接拿过来用，细微的差别就是preload的优先级会高一些


## 浏览器缓存策略（TODO）

## 浏览器跨标签页通信

常见方案
1.​BroadCast Channel​
基于浏览器提供的 BroadcastChannel API，允许同源下的不同标签页通过消息广播进行通信。

2.​Service Worker​
通过 Service Worker 作为中间层，协调多个标签页的消息传递（需结合 postMessage或消息事件）。

3.​LocalStorage + window.onstorage监听​
利用 LocalStorage 存储数据，通过监听 storage事件实现跨标签页实时响应。

4.​Shared Worker + 定时器轮询​
使用 Shared Worker 共享数据，标签页通过 setInterval轮询获取更新（效率较低）。

5.IndexedDB + 定时器轮询​
类似 Shared Worker 方案，但数据存储在 IndexedDB 中，通过轮询检查变更。

6.​Cookie + 定时器轮询​
通过读写 Cookie 共享数据，其他标签页定时轮询 Cookie 变化（不推荐，性能差）。

7.​window.open+ window.postMessage​
直接通过窗口引用（如 window.open打开的页面）发送消息，需同源且维护引用关系。

8.​WebSocket​
基于服务端中转的实时双向通信，标签页通过连接同一 WebSocket 服务同步数据。


### BroadCast Channel


https://www.bilibili.com/video/BV1Gyr8YSEV1/

酷狗音乐官网的效果

```javascript

// 这里的这个参数是频道名称
const channel = new BroadcastChannel("emp")

export function sendMsg(type,msg){
    channel.postMessage({
        type,
        msg
    })
}


export function listenMsg(callback){
    channel.addEventListener("message",(e)=>{
        callback(e.data)
    })
}

```

## 访问文件夹 File API


https://www.bilibili.com/video/BV133PherEn4/
