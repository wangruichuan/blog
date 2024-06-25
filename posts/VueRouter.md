<a name="F6Z1E"></a>
# 一、引言
<a name="iumO5"></a>
## 1.1 安装
```shell
npm install vue-router
```
<a name="qhvy7"></a>
## 1.2 上手

1. 在`src`下新建文件夹`router`，新建文件`index.js`
2. 引入组件` import xxx.vue`
3. `router/index.js`
```vue
import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  ]
const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router
```

4. `main.js`中挂载

![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715331813543-210e293e-33e0-482a-87a0-e8c61cab4197.png)
<a name="QYraf"></a>
## 1.3 路由入口与出口
```html
<p>
  <!-- 路由入口 -->
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
</p>
<!-- 路由出口 -->
<router-view></router-view>
```
<a name="PwoHD"></a>
## 1.4 不同的历史模式
> 先说为什么有这个东西?
> 使用hash模式,在进行页面跳转时,就不会向服务器发送请求

切换为HTML5模式
```vue
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```
为什么默认不使用这种模式?
> 当使用这种历史模式时，URL 会看起来很 "正常"，例如 `https://example.com/user/id`。漂亮!
> 不过，问题来了。由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中**直接访问** `https://example.com/user/id`，就会得到一个 404 错误。这就尴尬了。
> 不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个**简单的回退路由**。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面。漂亮依旧!

<a name="GS3Ja"></a>
## 1.5 路由懒加载
![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715431507348-2b5feaf9-4063-4509-bd4c-0646be6f7815.jpeg)
<a name="hUpwK"></a>
# 二、基础
<a name="OPxIF"></a>
## 2.1 路由传参
<a name="RBaOD"></a>
### 通过路径传参

1. 路由表编写

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715384603421-a974defe-ece7-4780-9fd2-5aac6e430726.jpeg)<br />注意这个`:id`的用法

2. 发数据时（与上边的路由表是对应的）

![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715384681187-9c0a4818-9dbf-4aea-bdbf-733d5a8498db.png)

3. 如何拿到这个参数？
> _官方文档：路径参数_ 用冒号 : 表示。当一个路由被匹配时，它的 _params_ 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。因此，我们可以通过更新 User 的模板来呈现当前的用户 ID：（这个只适用于选项式API）

组合式API如何拿到？<br />![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715385279282-882358c7-c2dd-4314-a400-35adb1ad7824.jpeg)
<a name="iSRbD"></a>
### 通过props传参
当 `props` 设置为 `true `时，`route.params`将被设置为组件的 props。

1. 路由表声明

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415633504-173d50e1-6a27-435f-8383-078ae89d02f8.jpeg)

2. 拿参数
- 选项式API:

![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715416306791-c3ae7a8a-f6b1-4e64-a62b-d3df00dc1fd5.png)

- 组合式API:

![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715416424887-2c8d7adb-e87f-43e2-8f7d-c3e675cbfc9f.png)
> 搭配 命名视图 时一起使用时:
> 必须为每个命名视图定义 props 配置


```vue
const routes = [
  {
  path: '/user/:id',
  components: { default: User, sidebar: Sidebar },
  props: { default: true, sidebar: false }
  }
  ]
```

<a name="dpino"></a>
## 2.2 404
思路：只有所有的路由都不匹配到时，才返回<br />路由表的编写（404放最下面），使用 正则 的方式<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715388334524-39c3a5bc-c95a-42b1-916f-86f79da165dc.png)
<a name="y3j33"></a>
## 2.3 路由正则
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715388472079-8a99d6cc-d9ab-4d4b-a7c1-117061b7a926.png)
<a name="lTYUI"></a>
## 2.4 子路由
![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715411993864-27283fc6-ead7-4b25-9ab1-821d7f828dca.jpeg)
<a name="Wwgal"></a>
## 2.5 通过JS跳转
为什么需要？
> 在进行跳转时，需要进行一些条件验证，比如说登录

官网文档
> 在组件内部，你可以使用` $router` 属性访问路由，例如 this.$router.push(...)。
> 如果使用组合式 API，你可以通过调用` useRouter()` 来访问路由器。

分析
> 这个`$router`就是个路由器，包含各种信息，全局的路由对象，
> 而`$route`是当前活跃的路由对象

一句话解释：通过router去传参数，通过route去接受参数
<a name="fPG2x"></a>
### push
> 使用细节：可以给之前的路由表**起别名**然后跳转，**可携带参数**
> ![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715412904611-0c6c7e25-8baf-45c4-8b3c-a1bcf4d58a41.png)
> ![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715412847450-9adc0141-bd7a-4cdd-9823-81d64c569054.jpeg)
> 通过问号传参，不过这块好像直接自己拼接也可以
> ![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715413135346-811d5359-c6aa-47e2-b33b-43ca973c3258.png)

<a name="sRJ1E"></a>
### replace
与push类似，不过不会向 history 添加新记录<br />![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715413397698-d6d3422a-4d5c-4660-be50-3a2405a7d15d.jpeg)
<a name="VocOZ"></a>
### go
![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715413676001-ebc88e77-7632-4e4b-94c1-04efe9c49841.jpeg)
<a name="KnSwt"></a>
## 2.6 命名路由
```javascript
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]
```
```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```
> 起别名:多个路径访问到一个

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415242374-50bf2c63-ce5f-4500-90fb-f5c80c625582.jpeg)<br />![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415247749-efdf8276-671a-4657-b555-a205af5108bc.jpeg)
<a name="U4UqU"></a>
## 2.7 命名视图
使用场景**:访问一个路径，展示多个界面**<br />![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715414686412-a82cf16e-a8a0-44d5-a343-a97a0f631b50.jpeg)<br />在进行展示的时候,需要设置多个出口<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715414865550-c0d4a8fb-ed5f-44f6-b37a-33f4d591ffd1.png)**<br />
<a name="yMl53"></a>
## 2.8 重定向
场景:两个路径访问一个组件

1. 配置路由表

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415031603-692a22ac-2d25-400f-bb4c-6ec9da2f9d56.jpeg)

2. 搭配命名路由

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415052240-478bd76d-909c-4a70-bda5-004b1321aee2.jpeg)

3. 跳转需要**判断**的情况

![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715415180734-408f51e6-c947-453d-9595-ad5f1c6e94ae.jpeg)
<a name="vMRGW"></a>
# 三、导航守卫
<a name="JTcjB"></a>
## 3.1 全局守卫
进入每个页面都会触发,在router的index.js修改<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/36049076/1715429873409-f8711cfd-8dc1-4609-9e83-8279016bb7e8.png)
<a name="NQhIk"></a>
## 3.2 每路守卫
某个页面的守卫,在路由表进行修改<br />![](https://cdn.nlark.com/yuque/0/2024/jpeg/36049076/1715429974932-e575473d-8fe4-4316-8b6b-37acc13e4e26.jpeg)
<a name="DArYq"></a>
## 3.3 几个钩子
```vue
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {

  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

重点是第二个:   <br />在当前路由改变，但是该组件被复用时调用<br />举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，<br />由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。<br />因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
