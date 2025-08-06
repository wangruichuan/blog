## README 文件

### 居中(左右)

<div align="center">
这样就居中了
</div>

```html
<div align="center">这样就居中了</div>
```

### 引用式链接

写法：```[GitHub 中文化插件][github-project-link] ```

需要在文档的 ​其他位置​（通常在文件末尾）定义这个标识对应的实际 URL

``` [github-project-link]: https://github.com/maboloshi/github-chinese "GitHub 中文化插件"```

### 徽章

![](https://pic1.imgdb.cn/item/68904bf458cb8da5c8034e82.png)


语法：```[![名字][图标的地址]][链接地址]```

### 图片适应深浅模式

```html
<picture>
  <!-- 深色模式加载此图片 -->
  <source 
    media="(prefers-color-scheme: dark)" 
    srcset="https://api...&theme=dark" />
  
  <!-- 浅色模式加载此图片 -->
  <source 
    media="(prefers-color-scheme: light)" 
    srcset="https://api...&theme=neutral" />
  
  <!-- 兜底显示（必选） -->
  <img 
    alt="Featured｜HelloGitHub" 
    src="https://api...&theme=neutral" 
    style="width: 250px; height: 54px;" />
</picture>
```

### 提示框

![](https://pic1.imgdb.cn/item/68904e4158cb8da5c80360d9.png)

属于 ​GitHub Flavored Markdown (GFM)​​ 的扩展语法

语法：
```
> [!warning]
> 你的警告内容
```

除 warning 外还支持这些类型：
```
> [!NOTE]
> [!TIP]
> [!IMPORTANT]
> [!CAUTION]
> [!DANGER]
```


### 目录树语法

![](https://pic1.imgdb.cn/item/68904f3158cb8da5c803676d.png)

```
<details>
<summary><kbd>目录树</kbd></summary>

#### TOC
- [🌟 功能特性](#-功能特性)
- [🌐 兼容环境](#-兼容环境)
- [💻 安装指南](#-安装指南)
- [🔧 本地调试](#-本地调试)
- [🔄 更新日志](#-更新日志)
  - [最新版本](#最新版本)
    - [v1.9.3 (2024-08-18)](#v193-2024-08-18)
    - [v1.9.2 (2024-06-14)](#v192-2024-06-14)
    - [v1.9.1 (2024-05-23)](#v191-2024-05-23)
    - [v1.9.0 (2023-12-09)](#v190-2023-12-09)
    - [v1.8.5 (2023-08-31)](#v185-2023-08-31)
    - [v1.8.4 (2023-08-08)](#v184-2023-08-08)
    - [v1.8.3 (2023-08-07)](#v183-2023-08-07)
    - [v1.8.2 (2023-05-15)](#v182-2023-05-15)
    - [v1.8.1 (2023-01-22)](#v181-2023-01-22)
    - [v1.8.0 (2023-01-18)](#v180-2023-01-18)
    - [v1.7.9 (2022-07-17)](#v179-2022-07-17)
    - [v1.7.8 (2022-06-29)](#v178-2022-06-29)
    - [v1.7.7 (2022-06-26)](#v177-2022-06-26)
    - [v1.7.6 (2022-05-12)](#v176-2022-05-12)
- [📌 待办事项](#-待办事项)
- [🤝 参与贡献](#-参与贡献)
  - [翻译参考资源:](#翻译参考资源)
- [🖼️ 效果预览](#️-效果预览)
- [🙏 特别鸣谢](#-特别鸣谢)
  - [核心团队](#核心团队)
  - [贡献者墙](#贡献者墙)
- [📈 项目统计](#-项目统计)
- [🎁 欢迎打赏](#-欢迎打赏)
</details>
```

### CheckBox 多选框

![](https://pic1.imgdb.cn/item/68904f8b58cb8da5c80369ee.png)

语法：
```
- [x] 全面中文化 GitHub 界面元素（菜单栏、标题、按钮等）
- [x] 智能正则匹配功能
- [x] 支持项目描述的人机翻译
- [x] 自动本地化时间元素
- [x] 持续更新词库
```

### 返回顶部效果

![](https://pic1.imgdb.cn/item/6890503b58cb8da5c8036eeb.png)

原理:用的页面内置的锚点实现

```
<div align="right">

[![][back-to-top]](#readme-top)

</div>
```

### 贡献值墙

其实应该可以自动生成，待我研究下

![](https://pic1.imgdb.cn/item/6890510b58cb8da5c803709c.png)

语法：
```
<a href="https://github.com/maboloshi" title="沙漠之子">
  <img src="https://avatars.githubusercontent.com/u/7850715?v=4" width="42;" alt="沙漠之子"/>
</a>
```