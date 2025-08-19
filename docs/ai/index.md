## MCP

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

### MCP资源站

- https://github.com/modelcontextprotocol/servers
  
- https://mcpservers.org
  
- https://mcp.so/
  
- https://modelscope.cn/mcp


## Vibe Coding
