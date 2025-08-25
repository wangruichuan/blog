> 小满zs - node ：该看p4
## Node 官网

https://nodejs.org/zh-cn

该看：第二节，How much JavaScript do you need to know to use Node.js?

## Node的作用

- 当然，你可以用它来写后端
- BFF
- 工具链


## NVM

- 下载地址：https://github.com/coreybutler/nvm-windows/releases
- 查看本机的各种 node 版本：`nvm list`
- 下载并安装最新版的 node: `nvm install latest`，
- 安装稳定版的 node，也可以输入版本号，安装指定版本 node :` nvm install lts`。
- `nvm use latest`切换到最新版 node，输入`nvm use lts`切换到稳定版 node，也可以输入版本号来切换到指定版本。
- node 环境变量：https://www.cnblogs.com/Juny-J/p/17198460.html
- 安装完 node 后 要使用` nvm use 版本号` 切换版本

## NPM 

### 常用命令

这里记一下没怎么用过的。

1. `npm update <package-name>`：更新指定的包。
2. `npm uninstall <package-name>`：卸载指定的包。
   
3. `npm search <keyword>`：搜索 npm 库中包含指定关键字的包。
4. `npm info <package-name>`：查看指定包的详细信息。
5. `npm outdated`：列出当前项目中需要更新的包。
6. `npm audit`：检查当前项目中的依赖项是否存在安全漏洞。
7. `npm link`: 将本地模块链接到全局的 node_modules 目录下
   
8. `npm publish`：发布自己开发的包到 npm 库中。
9.  `npm login`：登录到 npm 账户。
10. `npm logout`：注销当前 npm 账户。
    
11. `npm config list` 用于列出所有的 npm 配置信息。
    

    > 用于查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）

    ```javascript
        // ​.npmrc文件​：存储用户级别的 npm 配置（优先级高于全局配置）。
        ; "user" config from C:\Users\wangruichuan\.npmrc

        //registry.npmjs.org/:_authToken = (protected)
        registry = "https://registry.npmmirror.com" //镜像仓库地址
        strict-ssl = false //SSL 严格模式关闭

        // 环境信息
        ; node bin location = C:\Program Files\nodejs\node.exe //Node.js 路径
        ; node version = v22.15.0
        ; npm local prefix = C:\Users\wangruichuan //npm install默认将包安装在此目录下
        ; npm version = 11.3.0
        ; cwd = C:\Users\wangruichuan // 当前工作目录（执行命令时的路径）
        ; HOME = C:\Users\wangruichuan // 用户主目录（环境变量 %USERPROFILE%）
        ; Run `npm config ls -l` to show all defaults. // 显示所有默认配置（包括全局和项目级）
    ```

12. `npm get registry` 用于获取当前 npm 配置中的 `registry` 配置项(NPM镜像源)的值。

13. `npm config set registry <registry-url>` : 设置镜像




## 核心模块

## 全局变量

### process 进程

全局变量，通过该对象，可以获取进程的信息，对进程进行各种操作

- `process.exit()`：结束当前进程
- `process.nextTick(callback)`: nextTick 队列放一个任务，nextTick 队列比微任务的优先级更高

### path

通过 path 可以用来获取各种路径

需要引入 path 模块：`const path = require('node:path')`

- `path.resolve()`: 用来生成绝对路径，如果直接调用，会返回当前的工作目录

![](https://pic1.imgdb.cn/item/68a6aca058cb8da5c840927e.png)

如果传入一个相对路径，会自动转换为绝对路径：工作目录+传入的相对路径

这种因为工作目录不同，导致的最终绝对路径不同，其实是很可怕的，所以，我们一般会将一个绝对路径作为第一个参数，一个相对路径作为一个第二个参数，这样会计算出最终路径。

最终版本

`const res =  path.resolve(__dirname, './hello.js')`

### fs

`const fs = require('node:fs')`

- `fs.readFile()` 读取文件

  - 默认是异步的,如果要同步读取，可以使用`fs.readFileSync()`
  - 当我们通过 fs 读取文件时，读取到的数据总会以 Buffer 对象的形式返回（Buffer 就是内存里一个缓冲区）

```javascript
// 回调版本的
const fs = require("node:fs");
fs.readFile("./hello.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
// promise版本的
const fs = require("node:fs/promises");
(async () => {
  const data = await fs.readFile("./hello.txt");
})();
```

- `fs.appendFile()` 创建新文件，或将数据添加到已有文件中
- `fs.mkdir()` 创建目录
- `fs.rmdir()` 删除目录
- `fs.rm()` 删除文件
- `fs.rename()` 重命名
- `fs.copyFile()` 复制文件


## os （TODO）