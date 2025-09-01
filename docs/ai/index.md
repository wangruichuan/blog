## MCP

### 一些网站

- https://github.com/modelcontextprotocol/servers
  
- https://mcpservers.org
  
- https://mcp.so/
  
- https://modelscope.cn/mcp

### MCP 学习的意义

1. 效能工具：AISC(security check)、AIUT(unit test)、AICR(code review)
2. 就业亮点

   ![](https://pic1.imgdb.cn/item/68a3c72758cb8da5c832ec18.png)

### 初步了解

官网：https://modelcontextprotocol.io/docs/getting-started/intro

全称：模型上下文协议 AI Agent Claude 公司推出的

mcp 是注册在类似 cursor 的编辑器（AI 工具）上的

类似于 OpenAI 的 function calling

cursor 最基本的模式就是问一句答一句，然后答的时候还可以帮我修改代码。

比方说我问他今天天气怎么样，这个 AI 是不能回答我的，因为 AI 是基于以前的数据，对于今天的数据它是不知道的，这个时候我就可以给他一个 MCP，比方这个 MCP 给他提供了一个能力，比方说这个能力查询当天的天气。

AI 会根据自己的思考，会去判断我应该在什么时候去调用哪个 MCP，去获得它想要的东西。这时候我再去问他今天天气怎么样，就会通过 MCP 的一个接口去调取当天的天气，然后通过这个 MCP 的答案来回答我。可以把 AI 理解成前端，mcp 理解为后端给你的接口，AI 要实现一个功能的话，它就会自己去思考我需要去调用后端的哪个接口才能完成这个功能，这就是 MCP。

实际操作起来，就是你给它提供一个方法，这个方法你规定一下入参，然后在这个方法里面你做什么事情随便，你可以去请求些接口，但是你只需要返回一段文本，最终 AI 会根据你的问题和 MCP 返回的文本去给出答案。

在写这个 MCP 的时候，你会写一下这个 MCP 它是干什么的，会有个固定的格式，来告诉每个 mcp 的作用是啥。

> 就这么说吧，你用 HBuilderX 开发 App，代码让 AI 修改，但是呢 AI 改完之后又不知道运行的结果对不对。需要有一个东西告诉 AI，去读 HBuilderX 下的哪个文件得到 App 运行后的日志，让 ai 改完代码知道改的对不对.这就是本质。
> 首先输出格式是什么样，在哪里获得…
>
> 比如 ps 或者剪映有了 mcp，你就可以直接让 ai 来操作这些软件，帮你 p 图，剪视频
>
> 在 function calling 时代，假设服务器（也称为 agent）使用 openai 家的大模型，openai 自己规定了一套 fc 格式，那服务器提供的工具都必须遵循它的格式，假设写了 10 个工具（可以简单理解为函数），现在 openai 突然不提供 api 了，只好去用 claude 家的模型服务，结果 claude 家的 fc 格式与 openai 家的不一致，这下服务器就得重写这 10 个工具函数，扩展一下，设模型商家为 n 个，工具函数 m 个，那服务器就得预先写 mn 个，并且这个 m 和 n 都是变化的值，就需要不断修改服务器编写的代码。
>
> 你可能会这样解决这个麻烦:服务器写一个转换函数来统一适配这些模型要求的格式，比如:const 格式 = 转换函数（工具），这样就减轻了编写好几套工具的问题。但是这依然存在问题，转换函数的内部实现会变得异常复杂，因为每个工具函数的返回值数据格式，传入参数都不一致，即使当下适配完了，后续出来新模型新工具，又得在转换函数里不断调整。
>
> function calling 是什么，其实是大模型没有记忆能力。
> 比如用户问明天北京天气怎么样，由于大模型没法预测，所以服务器除了将用户的提问传给大模型，还会传递一个信息 : 调用一个叫 getWeather 的函数就能得到天气，这就是所谓的 tool。
>
> 有个明显的问题，如果大模型返回一句“调用 getWeather 函数”的文本，服务器是很难分析的，因此会在 prompt 中写好一些规则，比如大模型预调用某些能力，就返回 json:{
> “toolName”:欲调用的工具函数名
> }
> 服务器解析 json 是很好解析的。
>
> 但是这样依然存在问题，**大模型并不是每次都按照要求的格式回答，即使 10000 次内出错一次，那也无法接受，使用 prompt 来约束终归有限**。
>
> 只有研究模型的厂家深度调教才行。因此各个模型厂商都制定了一套 function calling 标准，这个标准规定了 tool 的规范，返回的格式，这样就很大程度的避免了模型乱回的问题

### 前置知识

当我们打开 MCP 的官网，我们会发现，MCP 里边用到了一些我们平时很少见到的名词，其中有两个名词你要重点关注。

1. JSON-RPC
2. stdio：标准输入输出

#### stdio

standard input and output 标准输入输出

这个名词在不同的语境下还不一样，在 OS 或者在一些计算机硬件的语境下，还有点区别，但是我们这里或的标准的输入输出，你可以狭义的理解为进程的两个接口。

我们知道，所有的应用程序，启动过后，它在操作系统上都会变成一个进程，那么每一个进程它其实都有两个接口，一个接口呢叫做标准输出接口 stout，一个接口呢叫做标准输入接口 stin。（其实还有一个接口，叫做标准错误接口，不过那个跟我们这里讲的没啥关系）

我们知道，进程与进程之间是相互隔离的，但我们有的时候，可能需要不同的进程之间相互进行通信。就是我这个进程，可能要向外面去输出一些东西，那输出到哪我不管，反正我就向外输出东西，你们谁要用，你们拿去用
；有的时候，别的进程可能需要向我这个进程输入一些东西，我可能要拿到这些东西去做一些事情，那这个时候我就有这么一个需求：我这个进程，它需要跟外界进行通信，通信的方式有很多，其中一种就是 stdio。

所以，stdio 是一种进程之间的通信方式，除了这种通信方式之外，还有一些别的通信方式：HTTP。

为什么要用这种方式呢？是因为在 MCP 的场景下，我们都需要用这种通信方式，而不去使用 HTTP，有人说为什么，你听完之后就明白了。

![](https://pic1.imgdb.cn/item/68a3cb5c58cb8da5c83326cd.png)

我们通过这个图呢，就可以发现，stdio 可以让一个进程通过输出接口向外界发些信息出去，然后外界也可以通过它的标准输入接口向进程里写入一些东西，但还是感觉很模糊，它到底有啥用啊。写段代码就知道了

- **标准输出接口**

```javascript
process.stdout.write("hello world\n");
```

我们用 node 去执行这个代码，就会在终端里输出 hello world

`node server.js`

这句命令会启动一个 名叫 node 的程序，并携带一个参数 server.js。

在整个过程中，会有两个程序，一个是终端程序，一个是 node 程序。好，现在有一个问题，我的代码是在哪个进程中运行的，肯定是在 node 程序中，但问题是它输出的东西为什么会跑到终端里呢，我们觉得是理所当然，其实没有那么理所当然。

这说明，终端程序跟我们的 node 进程一定完成了通信

![](https://pic1.imgdb.cn/item/68a3ce6258cb8da5c8334c4b.png)

我们那个终端进程，在启动子进程的时候，像终端这种呈现，会有一个自动化的处理，当他启动了子进程的时候，它会监听子进程的标准输出接口，只要你的子进程往接口里输出一个东西，终端就能接收到输出到终端界面上。

- **标准输入接口**

```javascript
process.stdin.on("data", data => {
  const res = `回复：${data}\n`;
  process.stdout.write(res);
});
```

![](https://pic1.imgdb.cn/item/68a3cfec58cb8da5c8335f28.png)

这里是不是就是 我问答你回复，跟那个 http 感觉是差不多的，那如果我们把它作为一个请求响应模式的话，这两个进程谁是客户端，谁是服务器？

很明显。父进程是客户端，子进程是服务器。

父进程问，子进程回复。

好，我们到现在为止，我们所有的父进程都是啥呢，都是终端，难道说这父进程监听到子进程的输出，我只能在进程中显示吗？能不能做点别的呀。

这个父进程可以是任何进程，也就是意味着，你能不能自己写一个进程出来，当然是可以的。

stdio 通信简洁高效，但仅适用于本地进程间通信。

#### JSON-RPC

通信格式：我给你发啥，怎么发，我收的时候怎么收。目前我就没有任何格式，格式不标准，我不去约定下格式，我咋传给他嘛。

![](https://pic1.imgdb.cn/item/68a3d4ec58cb8da5c833aac6.png)

第一行写死
第二行表示我希望用你的什么方法，把方法名字传过去
第三行把参数传过去
id 的作用是为了做标识的，因为将来响应的时候，我得知道是第几次请求

![](https://pic1.imgdb.cn/item/68a3d5ab58cb8da5c833b6d1.png)

### MCP 技术层面

<div style="color:red;font-weight:bold">MCP是一套标准协议，它规定了应用程序之间如何通信</div>

如何通信：

- 通信方式
  - stdio：推荐，高效、简洁、本地
  - http：可远程
- 通信格式：基于 JSON-RPC 的进一步规范

<div style="color:red;font-weight:bold">基本规范</div>

1. 初始化：`initialize`

客户端和服务器之间，首先要确认一个眼神，确认一下你是不是满足 MCP 协议的，客户端会问一下：哥们我要来请求你的服务，你是不是满足 MCP 协议，服务端说：我满足！你可以随时来用我。这就是初始化

初始化的时候，分为 请求 和 响应

`request`

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize", // 固定为 initialize
  "params": {
    "protocolVersion": "2024-11-05", // mcp协议的版本，客户端要带一个版本，表示客户端我支持的是哪个版本，版本要一致
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {},
      "elicitation": {}
    },
    "clientInfo": {
      // 告知服务器客户端的信息
      "name": "ExampleClient",
      "title": "Example Client Display Name",
      "version": "1.0.0"
    }
  }
}
```

`response`

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      // 表示服务器具有哪些功能
      "logging": {},
      "prompts": { "listChanged": true },
      "resources": { "subscribe": true, "listChanged": true },
      "tools": { "listChanged": true }
    },
    "serverInfo": {
      // 服务器的自我介绍
      "name": "ExampleServer",
      "title": "Example Server Display Name",
      "version": "1.0.0"
    },
    "instructions": "Optional instructions for the client"
  }
}
```

2. 工具发现 `tools/list`

我们客户端为什么要启动服务器啊，是因为我想用它里边的服务。但是我不知道它里边有哪些服务，那么这个时候就要做工具发现了，服务器有哪些工具函数可以供客户端调用
`request`

```json
{
  "jsonrpc": "2.0", // 协议版本（必填，值为"2.0"）
  "id": 1, // 请求标识符（必填，用于匹配响应）
  "method": "tools/list", // 调用的方法名（此处为列出工具列表）
  "params": {} // 方法参数（此处为空对象，表示无额外参数）
}
```

`response`

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      // 工具集合，一个工具就是一个对象
      {
        "name": "get_weather",
        "title": "Weather Information Provider",
        "description": "Get current weather information for a location",
        "inputSchema": {
          // 参数的格式
          "type": "object", // 参数的类型是一个对象
          "properties": {
            // 参数的属性
            "location": {
              "type": "string",
              "description": "City name or zip code"
            }
          },
          "required": ["location"] // 必填的参数
        }
      }
    ]
  }
}
```

3. 工具调用 `tools/call`

`request`

```json
{
  "jsonrpc": "2.0", // 协议版本（必填）
  "id": 2, // 请求ID（用于匹配响应）
  "method": "tools/call", // 调用工具的方法名
  "params": {
    "name": "get_weather", // 工具名称,对应工具发现中的name
    "arguments": {
      // 工具参数，需要和工具发现中的结果一致
      "location": "New York" // 参数
    }
  }
}
```

`request`

```json
{
  "jsonrpc": "2.0", // 符合JSON-RPC 2.0协议
  "result": {
    // 响应结果主体
    "content": [
      // 结果内容数组，必须是一个数组
      {
        "type": "text", // 内容类型为文本，type字段为必填
        "text": "两数求和结果:3" // 具体结果：两数相加等于3
      }
    ],
    "id": 2 // 对应请求的标识符
  }
}
```

所有的 type 类型：https://modelcontextprotocol.io/specification/2025-06-18/server/tools#data-types

![](https://pic1.imgdb.cn/item/68a40f6658cb8da5c836900f.png)

### 工具和效率

截止到目前，我们使用的是控制台，就是终端这个应用程序作为客户端，跟我们的 MCP Server 进行通信很麻烦，如果我们要测试我们的 MCP 服务器正不正常，用这个玩意通信太麻烦了。能不能有些现成的工具能非常方便的跟我们的服务器通信呢？

#### MCP Server 的调试工具

`npx @modelcontextprotocol/inspector`

![](https://pic1.imgdb.cn/item/68a4119b58cb8da5c836a691.png)

这里的 server.js 写的是相对路径，相当于当前你启动这个工具的目录的路径

点击 start 后会立刻启动服务器，此时马上会有一个初始化（确认眼神）的操作。

![](https://pic1.imgdb.cn/item/68a4124558cb8da5c836af8e.png)

这是一个效能工具，解决了客户端难用的问题。

#### MCP SDK

这个工具是来解决服务器编写的麻烦的问题。

`npm install @modelcontextprotocol/sdk`

这里展示下一个例子：

1. 创建服务器
   ![](https://pic1.imgdb.cn/item/68a4145a58cb8da5c836cbde.png)

2. 选择一种通讯方式，并连接

![](https://pic1.imgdb.cn/item/68a414b758cb8da5c836d11a.png)

3. 如何告诉 mcp 里有哪些工具

```javascript
server.registerTool("sum", {
  title: "两数求和工具", // 工具显示名称
  description: "计算两个数字的和", // 工具功能描述
  inputSchema: { // 这里要求你使用另外一个库的函数，叫做zod库里的z函数，这个zod库是用来做数据类型校验的，可以通过函数z标注数据类型，会自动的帮你完成校验。这里标注z是个number类型，描述为第一个数
    a: z.number().description("第一个加数"),
    b: z.number().description("第二个加数"),
  },
  // handler 函数
  ({a,b}) =>{
   
   // 这里可以做各种处理

   // 返回结果
      return {
         // 这里如果想要去调试程序，需要用console.error()
         content: [
            {
               type: "text",
               text: `${a} + ${b} = ${a + b}`,
            }
         ]
      }
  }
});
```
1
#### MCP SDK

### MCP 功能层面

由AI应用程序自主来决定，什么时候调用，怎么来调用，它在合适的时候就会调用我们的MCP服务器，来搞定一些额外的事情

![](https://pic1.imgdb.cn/item/68a41b5a58cb8da5c8371bce.png)

**对接AI程序**

- ChatGPT
- DeepSeek Chat Page
- Claude Desktop ：支持MCP协议，可充当Mcp客户端
- VSCode：集成了MCP协议，可充当Mcp客户端
- Cursor：支持MCP协议，可充当Mcp客户端

![](https://pic1.imgdb.cn/item/68a41a8758cb8da5c83715ee.png)

![](https://pic1.imgdb.cn/item/68a41aee58cb8da5c83718ca.png)

### 回答问题

1. 如果我写了一个MCP服务器，该如何给别人用呢，难道我要把源码给他发过去？

应该用npx。把写的服务器放到NPM的仓库里，发布到npm的仓库上，那么别人就可以使用npx命令来使用你的服务器了。

到时候配置MCP服务器的时候，就可以使用npx来配置。

2. AI应用程序里的两个概念

- MCP Host ： 往往指代AI应用本身，比方说像这个Cursor。
- MCP Client：用来跟MCP通信的。

![](https://pic1.imgdb.cn/item/68a41ea758cb8da5c8374485.png)

一个MCP Host 里边，往往会包含多个MCP Client，每一个Client，负责跟每一个MCP Server通信。


### MCP 重新认识

<div style="color:red;font-weight:bold">MCP,全称 Model Context Protocal，模型上下文协议。其旨在为AI与外部程序之间建立通信标准，从而使得外部程序可以被部署到任意AI，也使得AI应用可以使用任意的外部程序</div>



### Resources

MCP 中的资源分为两类：Text resources 和 Binary resources

#### URI

- `file:///home/user/documents/report.pdf`：文件资源，这个例子里面没有 host
- `postgres://database/customers/schema`：是一个数据库资源
- `screen://localhost/display1`：屏幕资源

在 MCP 协议中，不强制 URI 规则，允许 Server 自定义。

- notebook://cell/123
- log://app/service/error
- chat://conversation/abc123


#### 发现资源

1. 直接资源

服务器直接暴露一组固定资源，通过 JSON-RPC 方法 resources/list 提供给客户端。

工具：`tools/list`

每个资源包含字段如下：

```typescript
{
  uri: string;         // 资源的唯一 URI（例如 file:///xxx）
  name: string;        // 人类可读的名称
  description?: string;// 可选描述，解释用途或内容
  mimeType?: string;   // MIME 类型，如 text/plain, image/png
  size?: number;       // 文件大小（单位：字节）
}


{
  uri: "file:///logs/build.log",
  name: "构建日志",
  description: "包含最近一次构建的所有输出信息",
  mimeType: "text/plain",
  size: 18423
}

```

2. 资源模版

服务器还可以提供一组 URI 模板，供客户端**根据参数动态构造 URI**（例如选择城市、文件名等）。

这些模板符合 [RFC 6570](https://datatracker.ietf.org/doc/html/rfc6570) 的格式，例如：

- `file:///project/src/{filename}`
- `screen://localhost/{displayId}`

>[!tip]
>
>RFC 6570 是一份由 IETF 制定的标准文档，它定义了一种 URI 模板语法，用于通过填入变量值来构建动态 URI。

每个模板的结构如下：

```json
{
  uriTemplate: string; // 可变 URI 模板（如 file:///{path}）
  name: string;        // 模板的说明名称
  description?: string;// 模板描述
  mimeType?: string;   // 匹配资源的 MIME 类型（适用于所有匹配项）
}
```

例如：

```json
{
  uriTemplate: "file:///home/user/{filename}",
  name: "用户目录下的文件",
  description: "允许读取任意用户目录下的文件名",
  mimeType: "text/plain"
}
```



**课堂练习**

为 MCP Server 注册资源模板。

setRequestHandler

| 功能         | Schema 名                            | 结构                                            |
| ------------ | ------------------------------------ | ----------------------------------------------- |
| 读取资源     | `ReadResourceRequestSchema`          | `{ method: "resources/read", params: { uri } }` |
| 列出资源     | `ListResourcesRequestSchema`         | `{ method: "resources/list", params: {} }`      |
| 列出资源模板 | `ListResourceTemplatesRequestSchema` | `{ method: "resources/templates", params: {} }` |

---


#### 读取资源

客户端通过发送 JSON-RPC 请求，方法名为 `resources/read`，在 params 中写上资源的 URI

```json
{
  "method": "resources/read",
  "params": {
    "uri": "file:///logs/error.log"
  }
}
```

服务器返回一个 JSON 对象，包含一个 contents 数组，每个数组元素表示一个资源内容对象，结构如下：

```json
{
  contents: [
    {
      uri: string;          // 必填，资源的唯一 URI
      mimeType?: string;    // 可选，MIME 类型，如 text/plain、image/png

      // 以下两者二选一
      text?: string;        // 文本资源内容（UTF-8 编码）
      blob?: string;        // 二进制资源内容（Base64 编码）
    }
  ]
}
```
MCP 支持 一次 resources/read 返回多个资源内容。

比如：读取一个目录：file:///project/src/，返回值可能是里面多个文件的内容（如多个 .ts 文件）
#### 监听资源更新

有两种形式：

1. 资源列表变化
2. 资源内容变化


**资源列表变化**

用于监听资源目录是否发生增删改。

当服务器上的资源列表发生变化时（例如 `resources/list` 中的项发生增删），**服务器主动发送通知**：

```json
notifications/resources/list_changed
```

这个方法名也是固定的。

这样客户端就知道资源目录发生了变动，可以重新发起 `resources/list` 重新拉取。

这里需要做 2 件事情：

1. 监听目录（涉及到回调函数，监听的目录发生了变化，就会触发对应的回调函数）
2. 回调函数：向客户端发送通知

**chokidar**

`chokidar` 是一个 **文件系统监听库**，适用于 Node.js 环境，底层使用原生 `fs.watch` 和 `fs.watchFile`，并在 macOS/Linux 上优先使用更高效的 `fsevents`（若可用）。

基本用法：

```js
import chokidar from 'chokidar';

// 监听单个文件或目录
const watcher = chokidar.watch('./some-folder-or-file', {
  ignoreInitial: true, // 不触发初始的 add/addDir 事件
});

// 注册事件监听器
watcher
  .on('add', path => console.log(`📄 文件添加: ${path}`))
  .on('change', path => console.log(`✏️ 文件修改: ${path}`))
  .on('unlink', path => console.log(`❌ 文件删除: ${path}`))
  .on('addDir', path => console.log(`📁 目录添加: ${path}`))
  .on('unlinkDir', path => console.log(`🗑️ 目录删除: ${path}`));
```



**监听多个文件**

```js
chokidar.watch(['src/**/*.js', 'assets/**/*'], {
  ignored: /(^|[\/\\])\../, // 忽略 . 开头的隐藏文件
});
```



**停止监听**

```js
watcher.close().then(() => console.log('已停止监听'));
```



**课堂练习**

实现客户端订阅服务器资源，服务器端资源发生变化的时候，会通知客户端。


**工作机制**

1. **客户端订阅更新**，向服务器发送请求：

   ```json
   resources/subscribe
   ```

   方法名固定为 `resources/subscribe`，表示我要订阅某个资源。

   带上要订阅的资源 URI，例如：

   ```json
   { "uri": "file:///logs/error.log" }
   ```

2. 服务器监听变动并通知客户端。当该资源发生变化时，发送通知：

   ```json
   notifications/resources/updated
   ```

3. 客户端拉取最新内容。收到通知后，客户端可以重新调用：

   ```json
   resources/read
   ```

4. 客户端取消订阅（可选）。如果客户端不再关心此资源，可以发送：

   ```json
   resources/unsubscribe
   ```


### Schema

Schema 定义了各类 JSON‑RPC 请求与响应的 结构、校验规则与类型安全。

#### Zod

```javascript
import { z } from "zod";
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const input = { name: "张三", age: 30 };

const result = userSchema.safeParse(input);

if (result.success) {
  console.log("合法数据", result.data); 
} else {
  console.error("校验失败", result.error.format());
}

```
zod 对象上面的方法：

- `.partial()`: 所有字段都变为可选

  ```js
  const PartialUser = userSchema.partial();
  ```

- `.pick()` 和 `.omit()`

  ```js
  userSchema.pick({ name: true })  // 只保留 name 字段
  userSchema.omit({ age: true })   // 移除 age 字段
  ```

- `.merge()`: 合并两个对象 schema

  ```js
  const schemaA = z.object({ a: z.string() });
  const schemaB = z.object({ b: z.number() });
  const merged = schemaA.merge(schemaB); // { a: string, b: number }
  ```



**常用 Zod 类型**

| 类型        | 写法                                | 说明                                     |
| ----------- | ----------------------------------- | ---------------------------------------- |
| 字符串      | `z.string()`                        | 可链 `.min(n)`、`.max(n)`、`.email()` 等 |
| 数字        | `z.number()`                        | 可链 `.int()`、`.positive()`、`.gte(n)`  |
| 布尔值      | `z.boolean()`                       |                                          |
| 日期        | `z.date()`                          |                                          |
| 数组        | `z.array(z.string())`               | 表示字符串数组                           |
| 对象        | `z.object({})`                      | 用于定义结构                             |
| 可选字段    | `.optional()`                       | 表示字段可缺省                           |
| 可以为 null | `.nullable()`                       |                                          |
| 联合类型    | `z.union([z.string(), z.number()])` |                                          |
| 枚举        | `z.enum(["A", "B", "C"])`           |                                          |



**其它能力**

1. 转换

   ```js
   const TrimmedString = z.string().transform(str => str.trim());
   ```

2. 默认值

   ```js
   const WithDefault = z.string().default("hello");
   ```

3. 自定义校验

   ```js
   const Password = z.string().refine(p => p.length >= 8, {
     message: "密码至少 8 位",
   });
   ```

---

MCP 里面提供了一组 Schema.

Schema 由 TypeScript + Zod 定义，制作成 JSON Schema，用于**验证协议消息结构**。

在 SDK 中，每个 JSON‑RPC 方法（如 `resources/list`、`tools/call`）都对应相应的 Zod Schema，比如：

- `ReadResourceRequestSchema`
- `ListResourcesRequestSchema`
- `CallToolRequestSchema`
- `ListPromptsRequestSchema`

这些 schema 的功能包括：

- **校验请求结构** 严格保证参数类型与字段是否存在；
- **生成 TS 类型**，提高类型安全；
- **生成 JSON Schema**，用于能力声明或与客户端协商能力。

例如 ReadResourceRequestSchema 实际就等价于：

```js
const ReadResourceRequestSchema = z.object({
  method: z.literal("resources/read"),
  params: z.object({
    uri: z.string().describe("资源的 URI，格式如 file://、http://、bananaphone://"),
  }),
});
```

因此 MCP 提供的 Schema 可以调用 zod 对象上面的方法：

```js
import { ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 模拟请求参数
const requestParams = {
  method: "resources/read",
  params: {
    uri: "bananaphone://info",
  },
};
// 校验请求
const result = ReadResourceRequestSchema.safeParse(requestParams);

if (!result.success) {
  console.error("参数格式不对:", result.error.format());
} else {
  console.log("✅ 参数合法:", result.data);
}
```



**常见请求 Schema 结构一览**

| 功能         | Schema 名                            | 结构                                                   |
| ------------ | ------------------------------------ | ------------------------------------------------------ |
| 读取资源     | `ReadResourceRequestSchema`          | `{ method: "resources/read", params: { uri } }`        |
| 列出资源     | `ListResourcesRequestSchema`         | `{ method: "resources/list", params: {} }`             |
| 列出资源模板 | `ListResourceTemplatesRequestSchema` | `{ method: "resources/templates", params: {} }`        |
| 列出工具     | `ListToolsRequestSchema`             | `{ method: "tools/list", params: {} }`                 |
| 调用工具     | `CallToolRequestSchema`              | `{ method: "tools/call", params: { function, args } }` |
| 列出提示词   | `ListPromptsRequestSchema`           | `{ method: "prompts/list", params: {} }`               |
| 调用提示词   | `CallPromptRequestSchema`            | `{ method: "prompts/call", params: { id, input } }`    |



#### setRequestHandler

这是 MCP SDK 提供的**底层方法**，用于注册对某个 **JSON-RPC 请求类型** 的处理函数。

MCP 使用 **JSON-RPC 2.0 协议**，客户端发送：

```json
{
  "jsonrpc": "2.0",
  "method": "resources/read",
  "params": { ... }
}
```

SDK 内部为每种 method 提供一个对应的 Schema，`setRequestHandler()` 会：

1. 接收请求：拦截特定 `method`（如 `"tools/list"`）
2. 用 `Schema` 校验请求结构：如果校验失败，返回错误；否则进入 handler
3. 执行你的 `handlerFunction`：将 `params` 提供给你处理逻辑
4. 将你的返回值转为标准 JSON-RPC 响应：自动处理错误、封装 `result` 字段

```js
server.setRequestHandler(SomeRequestSchema, async (request) => {
  const params = request.params;

  // 做点什么
  return {
    ...yourResponseObject,
  };
});
```



### Prompts
MCP 支持 3 种上下文能力：

1. tools：工具
2. resources：资源
3. prompts：提示词

在 MCP 中，prompts 表示服务端内置的提示词模板（prompt templates）集合，通过 prompt 模板机制，客户端无需硬编码 prompt，而是复用服务端定义的标准提示词，实现统一、版本化、模块化的调用方式。

**1. 获取提示词列表**

```json
{
  jsonrpc: "2.0",
  id: 1,
  method: "prompts/list", // 工具：tools/list、资源：resources/list
  params: {}
}
```

返回：

```json
{
  jsonrpc: "2.0",
  id: 1,
  // prompts对应是一个数组，因为可能有多个提示词模板
  prompts: [
    {
      name: "analyze-code", // 提示词模板的名称
      description: "Analyze code for potential improvements",
      // 提示词模板需要接收的参数
      arguments: [
        {
          name: "language",
          description: "Programming language",
          required: true,
        },
      ],
    },
  ];
}
```



**2. 使用提示词**

```json
{
  jsonrpc: "2.0",
  id: 2,
  method: "prompts/get", // 固定的，工具：tools/call、资源：resources/read
  params: {
    name: "analyze-code", // 要使用的提示词模板
    arguments: {
      language: "python" // 传递给提示词模板的参数
    }
  }
}
```

返回：

```json
{
  jsonrpc: "2.0",
  id: 2,
  description: "Analyze Python code for potential improvements",
  // 返回具体的提示词信息
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: "Please analyze the following Python code for potential improvements:\n\n```python\ndef calculate_sum(numbers):\n    total = 0\n    for num in numbers:\n        total = total + num\n    return total\n\nresult = calculate_sum([1, 2, 3, 4, 5])\nprint(result)\n```"
      }
    }
  ]
}
```


### SSE

Server-Sent Events，中文是“服务器发送事件”。是一种**基于 HTTP** 的单向通信协议，由浏览器**发起连接**，服务器可以**持续不断地向客户端推送数据**。


**消息格式**

SSE 协议规定，服务器以 `text/event-stream` 格式不断推送消息，每条消息格式如下：

```
event: 事件名   # 可选，默认是 message 事件
id: 唯一ID     # 可选
retry: 3000   # 客户端断线重连间隔，单位毫秒，可选
data: 内容     # 必需，可以多行
```

每条消息用空行 `\n\n` 作为结尾。



**事件类型**

如果服务器发送的数据中没有指定事件类型，浏览器端会将其作为默认事件类型 `message` 来处理：

```js
data: 这是默认消息（data 代表要发送的消息）
```

客户端监听方式：

```js
eventSource.addEventListener("message", (e) => {
  console.log("默认事件：", e.data);
});
```

可以自定义事件名：使用 `event:` 字段

```
event: update（事件名）
data: 新的更新内容
```

客户端监听方式：

```js
eventSource.addEventListener("update", (e) => {
  console.log("收到 update 事件：", e.data);
});
```

### StreamableHTTP

Streamable HTTP 是 MCP 中 用于 Web 环境 的通信方式。

客户端基于 HTTP POST 发送 JSON-RPC 请求，例如：

![](https://pic1.imgdb.cn/item/68b136ea58cb8da5c85f16eb.png)

服务端可返回：

- 普通 JSON 响应（application/json）
- 流式 SSE 响应（text/event-stream）

另外，客户端还可以和服务端建立 持久 SSE 连接，用于监听以下事件：

- `notifications/resources/list_changed`
- `notifications/tools/list_changed`

![](https://pic1.imgdb.cn/item/68b1373358cb8da5c85f1706.png)

StreamableHTTP 使用场景

- 通过 HTTP 接收 远程 请求（如前端网页、API 网关）
- 需要支持 多客户端 并发访问
- 浏览器与 MCP Server 通信
- 流式响应（如 SSE 推送）需求

在官方 SDK 里面，提供了相应的接口：StreamableHTTPServerTransport

使用方式：

```js
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { randomUUID } from "crypto";

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(), // 为每个连接生成唯一会话ID
});
```

该接口内部提供了一系列的方法，其中需要了解的，是 handleRequest 方法。

```js
handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  parsedBody: unknown // 解析后的请求体
): Promise<void>;
```

内部处理流程：

1. 解析 body，识别 JSON-RPC 方法（如 "initialize", "callTool"）
2. 将请求路由给 MCP Server 的对应处理函数
3. 根据返回结果的 Content-Type 自动来决定是普通 JSON 响应还是流式响应




## AI 编码提效篇

### Cursor

#### 基本介绍

Cursor 是一款基于 VS Code 打造的 AI 编程增强编辑器，它集成了 GPT-4、Claude 等主流大模型，具备强大的 代码自动补全、对话生成、智能重构 等能力。无论你是初学者还是经验丰富的开发者，Cursor 都能成为你得力的“编程助手”。

Cursor 具备如下的特点：

1. 对新手友好：不懂代码也能通过描述需求，让 AI 帮你构建基本的项目骨架，快速搭建 MVP。
    MVP：Minimun Viable Product（最小可行产品：demo）
  
2. 对开发者高效：支持 Chat、Prompt 模板、函数解释、重构建议等，帮助你提升开发效率。
   
3. 支持 AI 驱动协作开发：结合“结对编程”理念，Cursor 可以成为你随时在线、逻辑清晰、不知疲倦的搭档。
Pair Programming（结对编程）：关键的核心模块、新人培训、复杂的问题的 Debug


Github 上有个开源的仓库，维护了 0.36.2 版本之后所有 Cursor 的历史版本。


https://github.com/oslook/cursor-ai-downloads


#### 对话驱动开发

AI 的出现使其出现了新的开发模式：对话驱动开发

- PDD（Prompt-Driven Development）：提示词驱动开发
- AI-DD（AI-Driven Development）：AI 驱动开发

在 Cursor 中，提供了几种不同的对话模式：

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-13-034448.png)

- Ask：PDD驱动
- Agent：AI 驱动

**ASK模式**：允许你通过 AI 搜索与提问的方式来探索和了解代码库，但不会对代码做出任何修改。它是一个“只读模式（read-only）”。它默认启用了搜索工具，可以更方便地定位和读取项目中的文件内容。Ask 模式与其他默认模式（如 Agent 模式、Manual 模式）相比，最大的不同是不会自动对代码进行任何修改：
- 它拥有完整的读取权限，可以查看项目文件和上下文
- 但不会自动执行 AI 提出的任何更改建议


**Agent模式**

Agent 是一个具备高度自主性的 AI 编码助手，能够独立探索、规划并执行复杂的代码库变更任务，并拥有全套开发工具的支持。

目前，Agent 是 Cursor 中的默认模式，也是最具“自动驾驶”能力的模式。它设计的初衷是为了应对那些复杂度较高、步骤较多的编码任务，并且尽量减少你对 AI 的逐步引导。

在 Agent 模式下，AI 可以自主完成以下操作：

- 浏览和理解整个代码库结构
- 读取项目文档和说明
- 搜索网页（例如查找第三方库用法）
- 编辑文件内容
- 执行终端命令（如安装依赖、运行脚本）

Agent 的目标是帮助你高效完成任务、简化流程，甚至实现从“分析问题”到“提交修改”的完整闭环。


整个 Agent 模式的工作流如下：

1. 理解需求：Agent 会先分析你的任务描述（prompt）以及当前项目的上下文，全面理解你想实现的目标和具体需求。
2. 探索代码库：它会在整个代码库中进行搜索，查阅相关文件、文档，甚至在需要时访问网页，来搞清楚当前项目的实现方式和结构。
3. 制定修改方案：在理解项目和任务的基础上，Agent 会将任务拆解为若干步骤，并制定出一个可执行的修改计划，过程中会不断从上下文中学习补充信息。
4. 执行修改：Agent 根据计划，对项目中的相关文件进行修改。它可能还会建议你引入新的依赖库、执行终端命令，或者提醒你在 Cursor 之外完成一些额外步骤。
5. 验证结果：修改完成后，Agent 会检查改动是否符合预期。如果检测到错误、语法问题或代码风格问题（如语言支持 linter），它会尝试自动修复。
6. 任务完成：当 Agent 确认一切修改都妥当后，它会交还控制权，并为你总结本次修改内容，帮助你快速了解变更点。

在 Chat 窗口中，右下角有一个 Restore 按钮，可以回滚到之前的版本。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-13-085624.png)

在回滚之后，还可以使用撤销按钮，撤销回滚。

**Manual模式**


Manual 模式是一种专注且可控的编辑模式，适用于你已经明确知道要修改什么文件、要怎么改的情况。

与 Agent 模式不同：

- 根据上下文去自动探索代码库
- 不会运行终端命令
- 完全依赖你提供的具体指令和上下文（如通过 @文件名 显式的来指定要修改的文件）

Manual模式用户明确知道要会修改哪些文件，这些要修改的文件都是由用户指定的。Agent模式会自动根据AI的规划，修改一些相关的文件。



下面是 Manual 模式的工作流：

1. 理解请求：像平常一样，在聊天框中输入你想让 AI 做的任务描述。

2. 添加上下文：使用 @文件名 的方式，在请求中明确指出你希望编辑的文件，为 AI 提供准确的上下文。

3. 规划修改：AI 会根据你提供的上下文，给出修改建议。你可以预览修改内容，如果你配置了 Linter，AI 也可能会标出潜在的问题。

4. 执行修改：确认无误后，应用这些修改。任务完成后，Manual 模式不会再进行任何自动处理，始终保持你对过程的掌控。


#### 内联聊天

![](https://pic1.imgdb.cn/item/68aff33d58cb8da5c85952b4.png)

CTRL + K 唤醒，是一个 AI 聊天窗口，不过它不是一个单独的窗口，而是内联在文件中，主要功能包括：

- 输入自然语言描述来提问
- 使用 @ 符号引用其他内容
- 对生成的结果进行多次优化

#### 终端中聊天

打开终端，然后Cmd K 开启聊天栏，按 Esc 关闭内联聊天，按回车键 Enter 执行。


![](https://pic1.imgdb.cn/item/68aff40158cb8da5c8595302.png)

使用示例

- 查找大文件
- 批量重命名
- 进程管理

#### 智能补全

你知道那种打字时 IDE 恰好“读懂”你想做什么的感觉吗？我们说的就是这种体验。

最佳实践：

1. 在编码的时候书写适当的注释
2. 保持良好的命名规范
3. 望文知意
      - 驼峰命名法
      - 适当的使用 TS 类型
4. 保持代码结构良好以及结构的一致性


熟练使用快捷键：

- Tab键：接收建议
- Esc键：不接受建议
- Ctrl/Cmd + →：逐词接受


#### @命令

@ 命令是一个很有用的工具，核心就是为 AI 聊天添加更加具体的上下文信息。

你在 Chat 窗口输入 @ 时，就可以看到很多选项。

你可以这样使用 @ 命令：

1. 输入框中输入 @
2. 用上下键选择你想要的命令
3. 按 Enter 键确认

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-13-115454.png)


1. Files&Folders: 引用项目中的特定文件和文件夹作为上下文。

2. Code: 代码片段

3. Docs： 获取官方文档或者第三方文档信息。

4. Git：
   1. 使用 @Git 相关的特殊指令来分析当前项目的 Git 变更情况、比较分支内容、以及查看未提交的文件状态。
   2. @Commit：引用当前工作状态的改动。使用 @Commit，你可以让 AI 告诉你当前工作区与最近一次提交（HEAD）之间的“未提交变更”。变更包括新增的文件、修改的文件以及删除的文件

      > 例如：你在当前项目中修改了 login.js 和 auth.js，尚未提交.
      > 现在想知道这两处的改动有没有问题。
      > 你可以对 AI 说：请帮我检查一下 @Commit 中的改动有没有潜在的问题，比如逻辑错误或代码风格不统一。
      > AI 会读取尚未提交的变更，并反馈比如：
      > - “auth.js 中的错误处理逻辑存在重复”
      > - “login.js 的登录判断条件可能导致空密码通过验证”
   3.  @Branch：对比当前分支与主分支的差异.
       1.  显示当前分支新增的提交
       2.  展示和主分支不同的代码的变更内容
  
        > 例如：你在一个 feature/signup-flow 分支上开发了注册流程，准备合并回 main，但不确定有哪些重要更改。你可以对 AI 说：请帮我总  结一下 @Branch 中相对于 main 分支的所有功能改动，方便我写 PR 描述。
        > AI 会列出当前分支比 main 多出的提交与变更，比如：
        > - “修改了 API 调用逻辑”
        > - “引入了新的依赖（如 yup 用于表单验证）”
5. Terminals
   用于在 Chat 中引用你**当前终端中的输出结果或状态信息**，让 AI 可以根据终端反馈内容给出解释、建议或下一步操作。

6. Linter Errors
   访问并引用代码中的 Lint 报错与警告信息的快捷符号。这个符号可以自动捕获并提供你当前激活文件中所有的 lint 报错与警告
7. Web:@Web 命令会自动搜索互联网以查找与 Cursor 查询相关的上下文。

#### 代码库索引

将你当前的项目，创建一个嵌入向量（Embeddings），有了嵌入向量，可以帮助 AI 更加准确的去理解的项目。

代码库索引是 Cursor 的核心功能。它会：
- 为代码文件创建嵌入向量
- 把索引数据存储在云端
- 保持代码本身只在本地存储
- 确保项目安全性


最佳实践：
1. 定期检查索引状态
2. 合理设置忽略规则，避免索引无关文件
3. 大型项目考虑模块化索引
4. 团队统一.cursorignore配置
5. 使用代码库索引功能快速理解项目

#### Rules

规则是 Cursor 的一个功能。这些规则会在每次对话时自动使用。本质上就是属于提示词工程的一部分。

主要用途有：

- 设定编码风格
- 定制文档格式
- 统一团队流程
- 个性化代码审查

1. 全局规则

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-06-30-071521.png)

2. 项目规则

在项目根目录的 .cursor/rules 文件夹中创建 .mdc 文件。mdc 是 Cursor 的 Rules 文件的专有格式。它基于 Markdown 格式。这意味着你直接使用最熟悉的 Markdown 语法来写就完事儿了。

支持四种规则类型:

1. Always：自动附加到所有聊天和命令请求（command + k），适用于全局规则。
2. Auto Attached：基于文件模式匹配自动触发，例如: .tsx, .json, Test.cpp。
3. Agent Requested：针对特定任务场景，需要提供任务描述。帮助 AI Agent 更好地理解和执行特定任务
4. Manual：需要手动提及才会被包含，适用于特殊场景的临时规则。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-14-064928.png)

支持的功能：

- 规则内容：用 Markdown 格式写规则
- 规则引用：用 @file 引用其他规则文件

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-14-065419.png)



**使用案例**

`.cursor/rules/base.mdc` 写入如下规则：


```markdown
# 项目基础开发规范

## 基础开发规则
- 使用 ESLint 和 Prettier 进行代码格式化
- 文件命名采用 kebab-case
- 导入语句按类型分组并排序
- 避免魔法数字，使用常量定义
- 函数长度不超过 50 行

## 项目目录结构

├── .cursor/
│   └── rules/
│       ├── base.mdc           # 基础规则
│       ├── react.mdc          # React 相关规则
│       ├── typescript.mdc     # TypeScript 规则
│       ├── testing.mdc        # 测试规则
│       └── docs.mdc           # 文档规则
└── src/
    ├── components/
    ├── features/
    └── tests/
```

React 组件的开发规范，位于 `.cursor/rules/react.mdc`

```markdown
Description:
React 组件开发规范，确保组件的可维护性和性能

Globs:
src/components/**/*.tsx, src/features/**/*.tsx

# React 组件开发规范
- 优先使用函数组件和 Hooks
- 组件文件结构：
  1. 类型定义
  2. 常量声明
  3. 组件实现
  4. 样式定义
- Props 必须使用 interface 定义类型
- 使用 React.memo() 优化渲染性能
- 样式使用 CSS Modules 或 styled-components
- @base.mdc
```


TypeScript 规则，位于 `.cursor/rules/typescript.mdc`


```markdown
Description:
TypeScript 开发规范，确保类型安全和代码质量

Globs:
**/*.ts, **/*.tsx

# TypeScript 规则
- 禁用 any 类型，使用 unknown 替代
- 启用 strict 模式
- 使用类型推导减少冗余类型声明
- 公共函数必须包含 JSDoc 注释
- 使用 type 而不是 interface（除了 Props）
```


测试规则，位于 `.cursor/rules/test.mdc`

```markdown
Description:
单元测试和集成测试规范

Globs:
src/**/*.test.ts, src/**/*.test.tsx

# 测试规则
- 使用 React Testing Library
- 测试文件与源文件同目录
- 测试用例结构：
  1. 准备测试数据
  2. 执行被测试代码
  3. 断言结果
- Mock 外部依赖使用 MSW
- 测试覆盖率要求：
  * 语句覆盖率 > 80%
  * 分支覆盖率 > 70%
  * 函数覆盖率 > 90%

```

最后是文档规则，位于 `.cursor/rules/doc.mdc`



```markdown
Description:
项目文档编写规范

Globs:
**/*.md

# 文档规则
- 使用中文编写
- 包含以下部分：
  1. 功能说明
  2. 使用示例
  3. API 文档
  4. 注意事项
- 代码块标注语言类型
- 配置说明使用表格格式
- 重要信息使用引用块标注
```

---

通过在聊天中使用 @Cursor Rules，你可以明确告诉 AI：“请按照我们项目的规范来生成或修改代码”。这样可以让 AI 的输出更加贴合你项目的实际需求，而不是“随心所欲”。


#### Nodepads

笔记本，你可以在笔记本里面记录一些内容，供 AI 作为参考信息

首先在资源管理器需要开启 Notepads，如下图：

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-07-01-005820.png)

笔记内容会自动注入到 AI 的上下文中，影响它对代码、问题和对话的理解。简单说，就是帮 AI“提前看过项目文档”。


和 Rules 的区别

- Rules：行为规范，指导 AI 应该怎么做。

- Notepads：上下文信息，告诉 AI 发生了什么，你结合这个背景信息，自己去判断该做什么。

#### 自动生成提交信息

Cursor 提供 AI 生成提交消息功能，让我们不再需要花费大量时间思考如何描述代码变更。

1. 完成代码修改后，打开源代码管理面板
2. 在提交消息输入框中，点击右侧的闪光图标 (✨)，AI 会自动生成提交消息

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-15-083241.png)

**工作原理**

Cursor 的 AI 提交消息生成器通过分析以下内容工作：

- 修改的文件
- 具体的代码变更
- 提交的上下文
- 仓库的 Git 历史记录

生成过程包括三个主要步骤：

1. 分析已暂存（staged）的文件变更
2. 学习你的提交历史模式
3. 结合上下文生成合适的提交消息

## LLM

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-22-021534.png)

Transformer 模型现在已经统治了深度学习领域

### NLP 演变史

1. **基于规则**：最初人们尝试通过基于语法和语义规则的方法来解决 NLP 问题。这也是我们人类在学习一门新的语言的时候的主要思路。但语言是变化的艺术，一门语言的规则就非常非常多，而且十分复杂，几乎没有办法基于语法规则来建模。
2. **基于统计**
   1. 1970 年以后采用 **基于统计** 的方法来解决语音识别的问题，把一个基于规则的问题转换成了一个数学问题。至此，人们才纷纷意识到原来基于规则的方法可能是行不通的，采用统计的方法才是一条正确的道路。因此，人们基于统计定义了语言模型（Language Model）(一种捕捉自然语言中词汇、短语和句子概率分布的统计模型。)
   2. 这个时期，语言模型（统计模型）就已经出现了。这个时期还不能称之为大语言模型，只能叫做语言模型。
3. **深度学习和大数据驱动**:   `Transformer`
   1. 第一波（2013～2018）：深度学习技术开始应用于 NLP，词向量（word embedding）等方法显著提升了模型的表示能力；
   2. 第二波（2018～至今）：以 Transformer 为核心架构的大规模预训练模型兴起，依托海量语料数据，实现了更强的语言理解与生成能力。

### 词元

Token，是模型的输出单位，也是模型的输入单位。

发送给模型的提示词（prompt），首先就会被分解为词元。

在 OpenAI 平台官网，提供了在线查看词元的方式。

https://platform.openai.com/tokenizer?utm_source=chatgpt.com

**每一个词元，都会有一个唯一的 ID，因此，最终输入到大模型的数据，是一个词元 ID 列表。**

举个例子：

1. 假设用户输入的文本为："Learn about language model tokenization."
2. 首先进行分词： [Learn] [about] [language] [model] [token] [ization] [.]
3. 查词表映射 ID：每个 token 会被查表映射为一个整数 ID，比如：[1122, 98, 4012, ...]
4. 最终进入模型：[1122, 98, 4012, 3305, 2351, 7489, 13] 这样的整数列

#### 分词策略

- 词级分词 ： 直接以“完整的词”为单位进行切分。适用于空格分隔语言，例如英语。
- 子词级分词 ： 将词分成更小的子词单元，如词干、前缀、后缀，适合处理未知词。 lovely ==> love、ly
- 字符级分词 :  将每个字符作为一个词元，不依赖词典。
- **字节级分词** :  将输入文本首先按UTF-8 字节切分，再对这些字节组成的序列进行建模或进一步压缩。
               换句话说，它的基本单位是字节而不是字符或词，因此具有语言无关性。

```markdown
Hello 😊

[72, 101, 108, 108, 111, 32, 240, 159, 152, 138]

前面 6 个是 ASCII 字符（H e l l o 空格）
后面 4 个是 emoji 表情的 UTF-8 编码
```



### 嵌入

嵌入（Embedding），是一种**寻找词和词之间相似性**的 NLP 技术 : 把词汇各个维度上的特征用数值向量进行表示，利用这些维度上特征的相似程度，就可以判断出哪些词和哪些词语义更加接近。

举个例子：`我喜欢小猫和小狗`

经过分词器（Tokenizer）处理后，会变成词元 ID 列表：

![](https://pic1.imgdb.cn/item/68b0041258cb8da5c859ddd2.png)

到目前为止，对于模型来讲看到的仍然只是一堆编号，没有任何语义信息。接下来要做的嵌入操作，就是要给这些词添加语义信息。

接下来引入一个 嵌入矩阵（embedding matrix），为每个词元嵌入向量信息。向量信息是多（高）维度的，一般能够达到成百上千维度。每一个维度，代表的就是一个语义方向。

这里我们做一个简化，假设就 4 维。如下：

![](https://pic1.imgdb.cn/item/68b003ea58cb8da5c859dcc2.png)

![](https://pic1.imgdb.cn/item/68b003fc58cb8da5c859dd3d.png)

现在，“小猫”和“小狗”不再是冰冷的词元ID，而是“位置相近的向量”，如下表所示：

![](https://pic1.imgdb.cn/item/68b0044958cb8da5c859df52.png)

我们可以将高维向量投影成二维空间来“可视化”它们之间的语义关系：相似的词会靠得更近。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-22-110654.png)

#### Word2Vec

Word2Vec 采用了一种高效的方法来学习词汇的连续向量表示，这种方法将词汇表中的每个词都表示成固定长度的向量，从而使在大规模数据集上进行训练变得可行。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-22-112417.png)

Word2Vec 有两种训练方式：

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-22-113820.png)

**CBOW模型**的核心思想是：给定一个词的上下文（前后词），预测中心词（目标词）。

例如有如下句子：`我 喜欢 吃 苹果`

当输入上下文（“我”，“吃”）的时候，模型能够预测出“喜欢”

**Skip-Gram模型**则刚好相反，核心思想是：给定中心词，预测它的上下文词。

当输入中心词：“喜欢”的时候，模型能够预测上下文词：“我”、“吃”

### Transformer

#### 输入与输出

将 LLM 看作是一个黑盒：输入称之为提示词（prompt）

在使用模型的时候，模型并不是一次性生成所有的文本，而是一次生成一个词元，如下图所示：

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-23-015053.png)

---

模型在生成每一个新词元时，都会基于当前的输入序列进行一次 **前向传播**。

所谓前向传播，是指在神经网络中，从输入层开始，数据依次通过每一层神经元的计算，最终产生输出的过程。


具体步骤：

- 输入嵌入
- 多个神经网络层处理
- 输出一个分布，就是所有词元的一个概率
- 选一个词生成出来

而新生成的词元会被追加到输入序列的末尾，作为下一步生成的提示词上下文，从而逐步影响整个输出。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-23-021537.png)

在机器学习中，有一个专门的词用来描述这种  使用早期预测来进行后续预测  的模型，称之为 **自回归模型**。

Transformer模型就是一个自回归模型。

#### LLM内部结构

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-23-022538.png)

1. 分词器: 将自然语言输入送入分词器（Tokenizer），将其转换为词元 ID
2. 嵌入层: 通过嵌入层将每个 ID 映射为一个向量，形成模型的输入表示。

例如前面得到的词元 ID 列表：`[1, 354, 2764, 77, 199]`

通过嵌入层处理后，得到的嵌入向量：

```
[
 [0.12, -0.87, ...,  0.34],   # 对应 token 1
 [0.02,  0.45, ..., -0.11],   # 对应 token 354
 ...
 [0.76, -0.01, ...,  0.08]    # 对应 token 199
]
```

每个词元 ID 都会被映射为一个固定维度的向量（例如 768 维或 4096 维），这些向量是模型可学习的参数，在训练过程中会被不断优化。

3. 堆叠的Transformer块

每个 Transformer 块内部包含两个主要子模块：

① 自注意力机制：让每一个词元可以“看见”它前面的所有词元，从而理解上下文。 
  
  ```
  “我 今天 很 开心”
   ↑   ↑  ↑   ↑
每个词元都能关注到前面的词元（因自回归模型只看左边）
```
- 比如模型在预测“开心”时，会去关注“我”、“今天”、“很”这些词，理解语义关系。
- 注意力机制会为不同词元分配不同的权重。

② 前馈网络：对每个位置上的词元向量单独做非线性变换，提高模型表达能力。

为什么称之为堆叠呢？因为 Transformer 块并非一层，而是有多层。

```
Transformer块1 → Transformer块2 → Transformer块3 → Transformer块4 → ...
```
每一层都会接收上一层的输出，并进一步处理。

层数越多，大模型就越能够捕捉高层次、复杂的语言结构，也就是说，对输入的文本理解得越准确。


4. 语言建模头
   经过多层 Transformer 块处理后，我们会得到每一个位置上的一个高维向量表示。
   这些向量已经融合了上下文语义信息，接下来需要通过 语言建模头 将这些向量转换为我们最终关心的输出：预测下一个词元。
   在自回归生成中，只用最后一个词元位置上的向量来预测下一个词。

```
[
  [0.12, -0.87, ...,  0.34],   ← 代表“我”
  [0.45,  0.10, ..., -0.77],   ← 代表“今天”
  [-0.22, 0.63, ...,  1.02]    ← 代表“很”
]
```

Transformer 是一个上下文感知的结构。当我们输入“我今天很”，并经过多层 Transformer 处理后，虽然我们只取了最后一个词“很”对应的向量，但这个向量已经不是孤立的“很”了，它已经通过自注意力机制，融合了前面所有词元的信息，即“我”、“今天”、“很”的上下文。


---

假设有一个词表（语料库）大小为 V = 50,000，Transformer 输出的每个向量是 d = 768 维，那么，语言建模头就是一个维度为：

`[768 × 50000]`

的线性变换矩阵，这个矩阵是语言建模头的核心参数，也是参数量最多的一层之一。这里我们把这个矩阵命名为 W。

接下来下一步是针对 词表 里面的每一个词元（50000）进行打分，大致的计算公式如下：

`logits（最终的得分） = z（最后一个词元的向量） · W（线性矩阵）`

- z：Transformer 所输出的最后一个词元的嵌入向量，长度为 768
- W：上面所提到的线性变换矩阵

经过计算后，会得到一个 50000 维的向量数组。这个 50000 维的向量数组里面的每一个值就是词表中词元的得分。

这个分数仅仅是一个未归一化的分数，所谓未归一化，就是指这些分数可以是任何实数（正的、负的、不限制范围），它们还不是概率，还不能直接表示“可能性”。例如假设我们的词表只有 5 个词，这里就能得到词表中每个词元的分数.


![](https://pic1.imgdb.cn/item/68b0097958cb8da5c85af345.png)

最后一步是经过 softmax 转换，目的是将分数转换为概率分布.

#### 完整流程

假设当前输入的是一句未完成的话：我今天很

目标是让大语言模型预测下一个最可能的词元。

1. 分词：["我", "今天", "很"]  => [1, 354, 2764]
2. 嵌入：
```
“我”     → [0.12, -0.87, ..., 0.34]  
“今天”   → [-0.11, 0.45, ..., 0.90]  
“很”     → [0.20, 0.14, ..., -0.06]  
```
嵌入向量会形成一个二维数组，维度是 [3, 768]。

3. Transformer块处理

经过多层 Transformer 块处理之后，得到的仍然是一个维度为 [3, 768] 的向量数组。我们只取最后一个

```
z = [0.12, -0.45, ..., 0.33]  ← 长度为 768
```

虽然这个 z 只是 “很” 这个词元所对应的向量，但是融入了前面词元的意思


4. 语言建模头计算 logits

假设语料库里面的词元数量为 50000

`logits = z × W  →  得到一个 [1 × 50000] 的向量
`

`logits = [0.9, -1.3, 2.1, ..., 5.7]   ← 长度为 50000
`

5. softmax 归一化为概率

```
{
  开心: 0.61,
  累: 0.12,
  忙: 0.08,
  郁闷: 0.04,
  美丽: 0.02,
  ...
}
```

#### 解码策略

根据概率选择词元的方法被称之为解码策略

- 贪婪策略（Greedy）：选最大值。
  - 简单易实现
  - 同样的输入每次都会得到同样的输出
  - 容易陷入局部最优

- 采样策略（Top-k, Top-p）：根据 softmax 概率分布进行随机抽样，即 会根据概率随机抽一个。核心思想是：不是总选最有可能的那个词，而是让 “可能性高的词更有可能被选中”，但不是唯一结果。
  - 可能是“开心”（61%）
  - 也可能是“累”（12%）
  - 有小概率是“美丽”（4%）


在采样策略中，可以引入 温度系数 来控制 softmax 概率分布的“陡峭程度”，影响模型的“随机性”与“确定性”。

默认 softmax 的计算方式如下：`probs = softmax(logits) // 将分数转为概率`

加入温度 T 后，变为： `probs = softmax(logits / T)`

- T 一般取值 0.5 ~ ）
- logits 除以 T 后，整个分布会变化

![](https://pic1.imgdb.cn/item/68b00c3358cb8da5c85b4f31.png)


不同温度下的行为：

- T = 1：开心（61%）仍最可能，但其他词有较低概率
- T = 0.5：开心更具压倒性优势（例如 >80%）
- T = 2.0：其他词概率显著提升，分布变“平”

温度越低，越倾向于选择高概率的词，温度越高，越倾向于选择其他词

> 总结一句话：温度系数是控制生成文本“保守”还是“放飞”的旋钮。

![](https://pic1.imgdb.cn/item/68b00c8258cb8da5c85b52eb.png)


#### Transformer块


在原始的 Transformer 论文中约为 6 块，现在许多 LLM 中已经超过 100 个了。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-27-003618.png)

每个 Transformer 块由以下两首首尾相接的组件构成：

1. 自注意力层
2. 前馈神经网络层

**自注意力层**

注意力机制帮助模型在处理特定词元的时候 整合上下文信息。

`狗追猫，因为它`

为了预测“它”之后的内容，模型需要知道“它”指代的是什么，是“狗”还是“猫” ？

注意力机制会将上下文信息添加到“它”这个词元的表示中。

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-27-012001.png)


原理：

注意力机制会为“它”这个词元计算它与句子中所有其他词元的关联程度。

- 它会算出“它”和“狗”有多相关
- “它”和“猫”有多相关
- 甚至“它”和“追”“因为”等词之间的关系

这些相关性通过一个叫做“**注意力权重**”的分数来表示，相关性越高，注意力分数越大。

下图是另外一段英文提示词文本：The cat sat on the mat

在自注意力层所生成的权重矩阵图：

![](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-05-27-013544.png)

- 横轴（Key）：表示被关注的词，即“被看的对象”；

- 纵轴（Query）：表示当前在处理的词，即“正在看别人的词”；

- 单元格中的值：表示 Query 对应的词对 Key 的关注程度（注意力权重），数值越大，颜色越深。

图中 sat → The 的注意力值是 0.23，意味着在处理 “sat” 这个词时，模型“最关注”的词之一是 “The”；cat → on 的注意力值是 0.21，表示 “cat” 在编码时也部分关注了 “on”。


回到我们上面“狗追猫”的例子，假设注意力机制得出以下权重：


```
"它" 对每个词的注意力权重：
狗：0.3
猫：0.6
其他词：0.1
```

模型“认为”——“它”更可能指的是“猫”。

那么模型可能就会生成诸如“它吓倒了狗”的后续内容。

核心：当前词会去关注其它词，并且根据相关性分配权重，从而形成更有语境感知的一个表达。

---

所谓多头注意力，指的是模型不只使用一个注意力机制去“看”上下文，而是使用多个注意力头（head），每个从不同的角度并行地关注输入中的不同部分。

一个注意力头只关注一套特定的关系（比如“它”和“狗、猫”之间的关系），但现实语言中的语义很复杂：

- 有的头可能专注于语法（主语-动词关系）；
- 有的头可能关注指代（“它”指代谁）；
- 有的头可能关注情感、时间顺序等……

多头注意力可以让模型从多个“子空间”中提取信息，从而提升理解力和泛化能力。

例如：

`狗追猫，因为它`


假设有三个注意力头，它们分别学习到了不同的关注模式：

Head 1：指代消解视角 —— “它”主要关注“猫”，注意力权重为：猫 0.6，狗 0.3，其它词 0.1；
Head 2：句法结构视角 —— “它”关注“追”这个动词，理解句子动作逻辑；在这个头中，“追”的相关性得分最高
Head 3：逻辑关系视角 —— “它”关注“因为”，模型试图理解因果结构。在这个头中，“因为”的相关性得分最高


这些注意力头会各自生成一份“它”的表示，最后再把这些表示合并起来，形成一个更加丰富、综合的向量。这个向量同时融合了：

- 谁是“它”可能指代的对象，
- “它”参与了什么样的动作，
- “它”在语义上处于怎样的逻辑位置。
- .....

“它”所对应的向量的含义背后的语义就非常丰富了。这也是为什么前面说 LLM 只需要取最后一个词元来预测下一个词。

这就像一个小型“专家团队”，每个注意力头都是一个“专家”，专门从某种语言视角来理解当前词元。最终，它们的意见会被整合，让模型拥有更全面的判断力。

--- 

前馈神经网络层

自注意力机制让每个词元在上下文中“看别人”，整合其他词的信息。但仅靠这些信息还不够，Transformer 还需要进一步让每个词自己思考、提炼、变换。这个任务，就交给了前馈神经网络层（Feed Forward Neural Network，简称 FFN）。

前馈神经网络的特别之处在于：它不会“看别人”，只处理自己。

怎么处理？

它是对每一个词元单独做的一次变换处理。你可以理解为：自注意力层结束后，每个词元都从“他人”那里学到了不少内容；接下来轮到它自己好好消化一遍。

如何消化？

其实就是把词元当前的表示向量送入一个小型的神经网络中，通常会包含两层线性变换和一个非线性激活函数，流程如下：

`输入 → 线性变换（升维） → 激活函数 → 线性变换（降维） → 输出`

激活函数，负责加入“非线性思考能力”。

> 狗追猫，因为它

在经过自注意力机制之后，“它”这个词已经看向了上下文，并初步融合了来自“猫”“狗”等词的语义信息。

但是，这样的表示只是“初加工品”。模型还需要进一步处理它，让它具备更强的语义表达能力和推理能力。这时，“它”的向量就会被送入前馈网络中：

- 前馈层会先把这个向量升维到一个更高维度（比如从 768 维扩展到 3072 维）；
- 接着，经过 GELU 激活函数进行非线性处理；
- 然后再降维回原来的大小，形成一个新的、更复杂的向量表示。

这个新表示就是“它”这个词元的升级版本，里面包含了模型对“它”这个词更深层的理解，可以帮助模型提取出更适合判断行为、情感、逻辑的语义特征。最终形成的向量将送入下一层 Transformer，继续处理。

因此，前馈层也是非常重要的一层，看起来只是“对每个词做了一遍变换”，但它非常关键。如果 Transformer 只有注意力层没有前馈层，那它就像是一个只会模仿别人的人，不会自己总结、推理和表达。如果说自注意力阶段是“看外部世界”，那么前馈网络阶段就是“闭上眼睛思考自己”。


### 本地部署（TODO)

学习阶段选择本地部署，部署一个功能不太强的模型。

Ollama 是一个开源的大语言模型**运行平台**，提供简洁易用的 命令行工具 和 REST API，帮助用户在本地轻松下载、部署
和运行各种开源的 LLM（大语言模型），本地会启动一个 Web 服务，监听 11434 端口



## RAG

## AI赋能

![](https://pic1.imgdb.cn/item/68b4e55a58cb8da5c8683158.png)

![](https://pic1.imgdb.cn/item/68b4e70f58cb8da5c8683194.png)


### 安装模型

#### ollama

Ollama 是一个开源的**大语言模型运行平台**，提供简洁易用的 命令行工具 和 REST API，帮助用户在本地轻松下载、部署和运行各种开源的 LLM（大语言模型），提供 REST API，本地会启动一个 Web 服务，监听 `11434` 端口.


默认的安装位置：

![](https://pic1.imgdb.cn/item/68b4ea6958cb8da5c868320b.png)

下载模型：

![](https://pic1.imgdb.cn/item/68b4e9fe58cb8da5c8683201.png)

既是下载，也是安装：`ollama run qwen3:0.6b`, 下载是支持断点续传的


常用命令：

1. ollama list：查看已下载模型
2. ollama show <模型名称>：显示模型信息
3. ollama pull <模型名称>：拉取最新的模型，可以用于更新操作
4. ollama rm <模型名称>：删除模型
5. ollama run <模型名称>：拉取并且运行模型
    - 存在：直接运行模型
    - 不存在：先拉取下来，然后运行
    - `ollama run <模型名称> --verbose`：查看每次对话后模型执行的效率细节
6. /clear：清空上下文



如何开启多行对话？

> 使用 `"""` 来开启多行对话，把要说的给包裹住
> ![](https://pic1.imgdb.cn/item/68b4f2d658cb8da5c86837f5.png)


自定义模型

- 需要自定义一个 modelfile 文件，在文件中设置参数和提示模版相关内容
- ollama create <模型名称> -f <modelfile文件地址>

### 基于LangChainJS的开发


![](https://pic1.imgdb.cn/item/68b5089858cb8da5c868784f.png)


