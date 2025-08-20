## 模版标记

https://www.bilibili.com/video/BV1Aph7znE2r/

![](https://pic1.imgdb.cn/item/68a3e3fa58cb8da5c8349aa4.png)

这里的 tag 其实是一个函数，本质上这个标记就是一个函数调用，它在帮你调这个 tag 函数，拿到 tag 函数的返回结果，然后赋值给变量。

会传递一系列的参数，第一个参数是一个数组，这个数组就是被表达式分割出来的数组，后续的表达式是依次表达式的结果

![](https://pic1.imgdb.cn/item/68a3e48f58cb8da5c834a29a.png)

![](https://pic1.imgdb.cn/item/68a3e4af58cb8da5c834a44d.png)

## 数据类型与 typeof 并非一一对应

- null 的结果是 object（设计缺陷）
- object 的结果是 object 和 function

## 运算规则

https://www.bilibili.com/video/BV18tM7ziEYv/

## 作用域

定义：**变量与函数的可访问范围**

V8 在预解析阶段，也就是编译阶段，看到代码块，就会把代码块当做一个可执行对象，作用域就是这个对象的成员之一。

分为：1.全局作用域 2.函数作用域 3.块级作用域

作用域链：当前作用域没有查到值，进而向上级作用域查找，直到查到全局作用域，这一查找过程形成的链条，就叫作用域链。

JavaScript 采用的作用域规则是**词法作用域**（静态作用域），**其作用域是由书写时所在位置决定的**，而不是调用位置。在 JS 中有一个常用的东西就是因为词法作用域才得以实现的,即闭包，可以去博客中的执行上下文那块去看看。

## 闭包

在一个函数的环境中，闭包 = 函数+词法环境（定义函数的环境）。

函数本身是个对象，这个对象关联到了另一个环境对象，这个现象就叫做闭包。

```javascript
function m() {
  var a = 1;
  function sub() {
    console.log(a);
  }
}
```

### 内存泄露、垃圾回收

#### 定义

https://v.douyin.com/fbJX3ESHrEc/

内存泄露的含义:**有垃圾，没有被回收**。

- 什么叫垃圾？**你不用的，就叫东西**。

不要以为，一个东西占的大了，就叫垃圾，跟大小没关系。

那怎么判断用不用呢，就取决于你了。

假设你定义了一个数组，你把这个数组求和了，将结果赋给一个变量。好，代码执行到这，这个数组是不是就没用了？这要取决于你，如果你还需要用他，它就不算垃圾。

那么有垃圾，就会有回收？现在很多高级语言，它都有垃圾回收机制，自动的发现你程序里的垃圾并回收掉？

那么问题来，它怎么知道哪些是垃圾，一个程序，他是怎么知道你哪些东西是用不了的。答案是 **它不知道**。

但是这个垃圾回收器，它有这么一个理念：虽然它不知道有些东西你用不用，但是它认为有一个东西，你将来一定不用，就是你 **自己都不可能访问到的东西**，垃圾回收器回收的是 你想用都用不了的东西。

那具体它是怎么发现这些内存的，那有很多算法，比如说，像什么 引用计数、标记清楚（mdn 文档：memory management）、什么新生代、老生代...

但还是会残留一些，这些你明明已经不用了，但是你还能访问到的内存，这就叫做 内存泄露。

### 闭包与内存泄露

假如说，你在一个函数中定义了一个 increase 函数，并将这个 increase 函数返回。

此时这个 increase 函数就跟它这个环境关联了，也就是意味着，这个函数它本身会占用内存，但占用的不多，但这个函数所在的环境占用内存很大。

闭包和内存泄露其实没有直接关系，那为什么我们经常把闭包跟内存泄露关联起来呢。是因为，我们容易掉以轻心：一个函数占不了多少内存，有的时候我们觉得一个函数没有被回收掉无所谓，但是我们就忽略了这个函数它是拖家带口的，函数没被回收，就导致其关联的环境对象也回收不掉，举例一下：

假如我点击按钮，两秒后移除 increase 函数，假设我们将来也不用这个函数了，两秒后这个事件也被移除掉了，那么请问两秒后他是不是垃圾，那这个函数浏览器能不能回收？-> 不能。

所以这里总结一下，闭包导致内存泄露的场景：

1. 有本该被回收的函数没有回收，从而导致其关联的词法环境也无法被回收，最终导致内存泄露，当然解决办法也很简单，如果说你真的不用了，那你就手动将变量的引用置空 null。那它就变成垃圾了，通过这个标记清除法就会被回收掉。
2. 当多个函数共享一个词法环境的时候，可能会造成词法环境的膨胀，从而导致出现无法访问且无法回收的内存空间

   ![](https://pic1.imgdb.cn/item/68901b5458cb8da5c801f0d3.png)

这里 increase 函数没有用到词法环境的任何东西，temp 函数用到了。这两个函数，他们用到的是同一个词法环境，此时词法环境里就会包含 doms（占内存），但是这个函数本身返回的是 increase，那这个函数运行完成之后。此时的这个 temp 函数肯定就是个垃圾，因为再也无法访问到了，但是这个词法环境不能销毁啊，因为 increase 不是垃圾啊，increase 还要用啊，但是词法环境里就保存了 doms，那为什么不顺带把 doms 也销毁掉呢？我不造，反正就是这个现象。

也就是说，现在存在了一个现象，存在了一个我既没办法访问到，但是依然无法被回收的一种情况。那这种情况怎么处理呢：

- 如果说将来 increase 函数不用了，那你就清空
- 在闭包场景下尽量避免多个函数去共享词法环境的情况

## 执行栈与执行上下文

### 预编译

在 JavaScript 中，​ 预编译（Precompilation）​​ 指的是在代码执行之前，JavaScript 引擎对代码进行的一些预处理操作，主要包括 ​ 变量提升（Hoisting）​​ 和 ​ 函数提升。这个过程发生在代码执行前的 ​ 编译阶段 ​（虽然 JavaScript 是解释型语言，但现代引擎会先进行编译优化）。

在 JavaScript 代码执行前，引擎会做以下事情：

1. ​ 创建执行上下文（Execution Context）​​（全局、函数、eval）。
2. ​ 变量和函数声明提升 ​（Hoisting）。
3. ​ 确定作用域链（Scope Chain）​。
4. ​ 确定 this 的指向。

#### 变量提升

- 变量声明（var）会被提升到当前作用域的顶部，但 ​ 赋值不会提升。let 和 const 虽然也有“提升”，但会进入 ​ 暂时性死区（Temporal Dead Zone, TDZ）​，访问会报错。

#### 函数提升

函数声明（function）会被整体提升，而函数表达式（var fn = function() {}）只会提升变量声明。

#### 预编译的步骤--以函数为例

当函数执行时，会进行以下操作：

1. ​ 创建 AO（Activation Object，活动对象）​​（即函数执行上下文）。
2. ​ 查找形参和变量声明，作为 AO 的属性（初始值 undefined）​。
3. ​ 将实参赋值给形参。
4. ​ 查找函数声明，并覆盖同名变量 ​（函数优先级高于变量）。

#### 全局作用域的预编译

全局上下文（GO / Global Object）的预编译类似，但没有形参：

1. ​ 查找变量声明 ​（var），提升并赋值为 undefined。
2. ​ 查找函数声明，直接赋值。

​ 函数声明 > 变量声明 ​（同名时函数覆盖变量）

### 执行上下文（执行栈）

进入一块代码（要运行的时候），为这一块代码建立一个词法环境，词法环境就在执行上下文里。也就是说执行上下文是包含词法环境的，可以把执行上下文想象成一块内存空间，这个内存空间里包含了词法环境。

执行上下文里有一个字段叫做 outerField，这个字段会指向它外部的词法环境，这个其实就是作用域链的一个实现（自身找不到，就去外部的词法环境去找）

举例说明:

```javascript
function m() {
  let a = 1;
  {
    let b = 1;
  }
}

m();
```

在调用这个 m 函数时，会创建这个函数的执行上下文，同时会去执行这个函数，执行之前会创造它的词法环境，这个词法环境里，它会找到所有的顶级变量，这里是 a。目前的 outerField 指向的是全局作用域链（全局的词法环境）。

接下来，就开始运行了，先给 a 赋值，然后进块级作用域，会做这么一件事：把当前的词法环境给移出当前的执行上下文，然后会马上开始分析 这个块级作用域里边的词法环境，建立新的词法环境，里面放个 b 变量，同样，这个词法环境里也有个 outerField，这个 outerField 就执行之前的那个词法环境。所以在块级作用域里就可以用到当前词法环境里边的 b，也可以用到作用域链用到外层的 a，也可以继续通过作用域链用到顶层的一些东西。

运行完成，块级作用域的词法环境销毁，之前的词法环境又回到执行上下文了（类似于一个栈的关系），其实执行上下文是没变，词法环境一直在变，这块其实也涉及到了闭包的实现。

## Proxy

https://www.bilibili.com/video/BV15bEkzuEsC/

https://www.bilibili.com/video/BV11uK3zqEHv/?spm_id_from=333.1387.favlist.content.click

## 迭代器

https://www.bilibili.com/video/BV1hwTkzqEHg/



## 函数中的 this 指向

### 基本知识

我们讨论的 this 指向是指的函数中的 this 指向，如果说不在函数中，那就看环境了，浏览器是 window，node 是一个空对象。

函数中的 this 指向，完全取决于是如何调用这个函数的。

要想完全理解 this 指向，需要理解执行上下文，事实就是，在创建这个执行上下文的时候，来确定这个函数的 this 指向。执行上下文，肯定是执行的时候创建的，所以说，this 指向是调用函数的时候才确定下来的。

1. 通过 new 来调用（构造函数），指向新对象
2. 直接调用，指向全局对象：node 环境中是一个 global(但是全局变量不会放到 global 上)，浏览器环境中是 window
3. 通过对象调用，指向调用的那个对象
4. 通过 bind/call/apply 来调用，指向 call/apply 方法的第一个参数

**箭头函数压根没有 this**：由于箭头函数没有 this，那么会基于闭包，就会从外层去找这个 this，而由于闭包是属于词法作用域的，词法作用域是在编译时就确定了的，（JS 没有编译，只有预编译），因此它不用等到这个函数真正执行的时候才能确定，这就是为什么箭头函数的 this 指向谁，取决于这个箭头函数的的定义位置，而不是运行位置。

### 严格模式

如何开启？

1. 使用 'use strict' 字符串指令显式开启严格模式
2. ES6 类里，类的方法（包括构造函数）会自动处于严格模式
3. 诸如 export/import 和 `<script type=module></script>` 等 ESM 模块语法也会隐式开启严格模式。

严格模式主要是让**原本普通函数调用**和**原本普通函数调用**里指向 window 的 this 变成了 undefined，但在构造函数、对象方法调用等场景下，this 的指向规则没有因为严格模式而改变。

![](https://pic1.imgdb.cn/item/688c498358cb8da5c8f741d3.png)

### 计时器回调中的 this

超时调用的代码都是在**全局作用域**中执行的：

1. 非严格模式下指向 window 对象
2. 在严格模式下是 undefined。

有时我们会遇到两个 this 的情况，如下，一个是 setTimeout 调用环境中的 this，一个是延迟执行函数中的 this，这个时候需要注意区别，可以理解为，setTimeout 中的第一个参数就是一个单纯的函数的引用而已，它的指向跟我们一般的函数调用时一样取决于被调用时所处的环境。

```javascript
let obj = {
  say: function () {
    console.log(this); //延迟执行函数中的this
  },
  print: function () {
    setTimeout(this.say, 0); //setTimeout调用环境中的this，指向调用者即obj
  },
};
obj.print(); //setTimeout: window
```

```javascript
let obj = {
  say: function () {
    console.log(this); //延迟执行函数中的this
  },
  print: function () {
    setTimeout(this.say, 0); //此时的this是window
  },
};
let func = obj.print;
func(); // 直接报错，全局对象里没say这个方法呀
```

```javascript
const obj4 = {
  message: "Hello",
  logMessage: function () {
    setTimeout(() => {
      console.log(this.message);
    }, 500);
  },
};
obj4.logMessage(); //hello
```

我们知道 settimeout 可以输入字符串作为函数指向，类似 eval，此时的函数作用域呢

```javascript
var a = 2;
function test() {
  let a = 1;
  function say(a) {
    console.log(a);
  }
  setTimeout("say(a)", 0);
}
test(); //say is not defined  全局环境根本没say这个函数
```

可见，当把 say 方法移到 test 内部时报错 say is not defined，原因是以字符串形式执行时，javascript 内部实际上调用了 eval(),而 eval 的执行环境是全局作用域 window，全局作用域没有 say 方法所以报错。

```javascript
var a = 2;
function say() {
  console.log(a);
}
function test() {
  let a = 1;
  setTimeout("say(b)", 0);
}
test(); //2
```

在执行 setTimeout("say(b)", 0) ，b 也会去 window 作用域找，上面的代码报错

### dom 事件回调中的 this

1. 普通函数：dom 元素
2. 箭头函数：看所在的函数作用域

### forEach 中的 this

1. 传入的是普通函数：foreach 中的第二个参数 是 执行 callbackFn 时用作 this 的值，如果没传，就是指向全局
2. 传入的是箭头函数：看箭头函数所在的上下文环境。

### 递归中的 this

```javascript
function factorial(n) {
    console.log(this);
    if (n === 0) return 1;
    return n * factorial(n - 1);
  }
  const result6 = factorial.call({q: 40}, 5);![alt text](image-1.png)
```

![](https://pic1.imgdb.cn/item/688c4ad858cb8da5c8f743aa.png)

可以发现，只有第一次是 call 传过去的，这里其实还是涉及到执行上下文

### call 和 apply 的链式调用

https://www.bilibili.com/video/BV1k4uBzDEaj/

![](https://pic1.imgdb.cn/item/68a2fe5858cb8da5c830c7b9.png)

## 如何实现一个私有属性

这里总结下所有的方法：

1. 两个下划线\_ \_：这种是最弱的，这是在过去没办法，根本防不住，私有属性是只能在这个类里边进行使用，下划线只是一个命名规范，是一个弱约束
2. 使用 symbol

   ```javascript
   const key = Symbol("key");
   class A {
     [key] = 1;

     a() {
       console.log(this[key]);
     }
   }

   const a = new A();
   console.log(a[key]); //1
   ```

   现在这种是外边也能用的，我们可以把上边的放到一个单独的模块里，默认只到处这个类，不导出这个符号

   ```javascript
   const key = Symbol("key");
   class A {
     [key] = 1;

     a() {
       console.log(this[key]);
     }
   }
   export default A;
   ```

   然后在另外一个模块中去使用

   ```javascript
   import A from "./A";
   const a = new A();
   ```

   但是呢，它可以使用 `Object.getOwnPropertySymbols` 方法得到这个实例里的所有属性，所以这个符号属于仍然能在外边获取到

   ```javascript
   import A from "./A";
   const a = new A();
   const key = Object.getOwnPropertySymbols(a)[0];
   console.log(a[key]);
   ```

   但是，谁会平时开发写这种代码呢，但现在是面试环境，你要尽可能的把所有的方案、情况都想到。

3. 上 TS，用`private`修饰符，但是 TS 是一个编译时态的东西，这个私有只存在编译时态
4. 最新版的 ES 标准： `# `修饰符，语言层面的终极约束，但是只能在 ES 新标准上才能使用。

   ```javascript
   class A {
     #key = 1;
     a() {
       console.log(this.#key);
     }
   }
   const a = new A();
   a.#key; //Error: a is private and only accessible within class 'A'
   ```

5. 使用`WeakMap`或者`WeakSet`：思路就是，将类的属性名放到 map 中，key 是这个类的 this，value 是私有属性所构造的对象，
   ![](https://pic1.imgdb.cn/item/688840eb58cb8da5c8eaa1f0.png)

   babel 用的就是这种方式。

## 面试题手写系列

### 判断一个对象是否是数组

https://www.bilibili.com/video/BV1jUPyeXE58/

```javascript
// 第一种方法
function isArray(obj){
  return obj instanceof Array
}

//第二种方法:native code
Array.isArray()



```

### 手写 deepClone（TODO）

https://www.bilibili.com/video/BV1m2zwYoEz2/
https://www.bilibili.com/video/BV1tz42187Ln/

### 数组的并集、交集、差集

1. 并集：`Array.from(new Set([...arr1, ...arr2]))`
2. 交集：这里为了避免出现重复的，套个个 Set
   `Array.from(new Set(arr1.filter(item => arr2.includes(item))))`
3. 差集：并集 - 交集。
   `Array.from(new Set(union.filter(item => !intersection.includes(item))))`

### 手写 forEach

```javascript
Array.prototype.myForEach = function (callback) {
  const len = this.length;
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }
  let k = 0;
  while (k < len) {
    let pk = String(k);
    if (prop in this) {
      const kValue = this[pk];
      callback.call(this, kValue, k, this);
    }
  }
};
```

### 防抖 debounce

定义：在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。可以理解为 打断回城。

防抖使用场景三要素：
1. 函数高频调用
2. 这个函数是一个耗时的操作
3. 以最后一次调用为准


```javascript
function debounce(fn,delay){
    let timer = null
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}

function fn(){
    console.log('hello') 
}

let debounceFn = debounce(fn,1000)
window.onresize = debounceFn
```

### 节流 throttle

 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。可以理解为 等待闪现CD

```javascript
function throttle(fn, time) {
    let timer = null;
    return function (...args) {
        if(timer) return;
        fn.apply(this, args);
        timer = setTimeout(() => {
            timer = null;
        }, time);
    }    
}

const interval = 5000
const fn = throttle(() => {
    console.log(new Date());
}, interval);

setInterval(() => {
    fn()
}, 10);


// 第二种 函数节流的实现;记录上次的事件

function throttle2(fn,time){
    let pre = Data.now()
    return function(...args){
        let now = Date.now()
        if(now - pre >= time){
            fn.apply(this,args)
            pre = Date.now()
        }
    }
}

```

## 面向对象

### 访问器成员

这个点是其他语言所不都具备的一个点。

先看场景：一个 Product 类，有商品单价和商品数量两个属性，我们要计算总价，于是写了这么一个方法`getTotal()`：数量\*单价 = 总价

但是你仔细推敲，你会觉得有一个地方不是那么舒服，总价他是上一个名词，按道理来说的话，他应该作为一个属性来书写，但是你一旦把它作为一属性，就又会产生数据冗余的问题，这时就需要一个办法，能不能**让他长得看起来像属性**

**Object.defineProperty**

![](https://pic1.imgdb.cn/item/689fe64258cb8da5c82833ca.png)

这样一来，就相当于给类填了一个属性叫**totalPrice**，这个属性本质上他是一个方法，但是你用的时候可以当成属性来用，一旦读了这个属性，就相当于调用了 get 方法

ES6 里有对应的语法糖，直接一个 GET 就完事

![](https://pic1.imgdb.cn/item/689fe6db58cb8da5c82833fb.png)

### 原型

原型出现的原因本质上是为了支持面向对象。

![](https://pic1.imgdb.cn/item/689fe30e58cb8da5c8283337.png)

![](https://pic1.imgdb.cn/item/689fe33258cb8da5c828333c.png)

https://www.bilibili.com/video/BV1nZKceyET8/

属性到底存在不存在？
https://www.bilibili.com/video/BV199wueyE9C/

### 如何对一个 Class 降级

来看一个 Class，ES6 时的语法

```javascript
class Product {
  static count = 0;

  constructor(name, unitPrice, number) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;
    Product.count++;
  }

  get totalPrice() {
    return this.number * this.unitPrice;
  }

  increase() {
    this.number++;
  }
}
```

先看一个 30 分的写法：

![](https://pic1.imgdb.cn/item/689fe87a58cb8da5c8283430.png)

**作用域死区**：ES6 中的类，和 let/const 一样是有作用域死区的，就是你不能在初始化这个类之前去调用，但是你用这种写法的话，是可以访问的，因为函数有提升，我们无法在 ES5 的环境下模拟 ES6 的暂时性死区。

但我们可以把这些代码改造成一个变量，然后用立即执行函数，把这段代码放到立即执行函数里，函数返回这个构造函数，虽然不能完全模拟 ES6 的暂时性死区，但是这时候你提前访问时，拿到的是 undefined，当成构造函数去访问时会报错。

![](https://pic1.imgdb.cn/item/689fe9e458cb8da5c828346f.png)

好，现在已经四十分了

**new 的处理**

在 ES6 中，对于用 class，必须用 new 去构造，不能去直接调用这个函数，是会报错的，所以这里需要判断一下是不是通过 new 来调用的：这里的方法是通过判断 this 的原型是不是等于该类的 prototype

![](https://pic1.imgdb.cn/item/689feaa858cb8da5c82834a4.png)

好，现在是 50 分了。

**访问器的处理**

使用 Object.defineProperty()来定义属性即可。

![](https://pic1.imgdb.cn/item/689feaf258cb8da5c82834b8.png)

这里需要注意一个小点，es6 的 get 语法糖定义的访问器属性会存在两个地方，一个是实例上，一个是原型上。所以这里不仅要在外部用 Object.defineProperty()，也要在构造函数内部去调用一下。

![](https://pic1.imgdb.cn/item/689feb8558cb8da5c82834dd.png)

到现在，已经 60 分了，及格了。

不可枚举

我们观察到，ES6 里的访问器属性在打印的时候会有淡淡的颜色，这个淡淡的颜色表示不可枚举（无法通过类似 for in，Object.keys()方法来获取）。所以在定义这个访问器属性时，还要加一个属性 enumerable: false，不可枚举

![](https://pic1.imgdb.cn/item/689fec9158cb8da5c8283510.png)

方法也是不可枚举的。故需要改造下

![](https://pic1.imgdb.cn/item/689fedbd58cb8da5c8283580.png)

八十分了

**处理类中的方法**

ES6 中的类中方法只能不能当成构造函数，即不能通过 new 去调用。

![](https://pic1.imgdb.cn/item/689fedf558cb8da5c828358d.png)

所以你在调用这个函数的时候，你也要进行判断，是不是通过 new 去调用的。

这里需要判断一下，this 是否等于这个函数的原型，如果是，则说明通过 new 去调用的。

![](https://pic1.imgdb.cn/item/689feebd58cb8da5c82835dd.png)

好，现在就 90 分了，剩下的十分留着，因为会考察一些继承的转换。ES6 到 ES5 的。

完整代码：

```javascript
var Product = function () {
  function Product(name, unitPrice, number) {
    /**
     * getPrototypeOf : 用于获取指定对象的原型（即其 [[Prototype]]内部属性）
     * const obj = {};
     * const prototype = Object.getPrototypeOf(obj);
     * console.log(prototype === Object.prototype); // true
     */
    if (Object.getPrototypeOf(this) !== Product.prototype) {
      throw new Error("Cannot construct Product instances directly");
    }
    this.name = name;
    this.unitPrice = unitPrice;
    this.number = number;

    Object.defineProperty(this, "totalPrice", {
      get() {
        return this.unitPrice * this.number;
      },
      enumerable: false,
    });
    Product.count++;
  }
  Product.count = 0;
  Product.prototype.increase = function () {
    this.number++;
  };
  Object.defineProperty(Product.prototype, "totalPrice", {
    get() {
      return this.unitPrice * this.number;
    },
    enumerable: false,
  });
  Object.defineProperty(Product.prototype, "increase", {
    enumerable: false,
    value: function () {
      if (Object.getPrototypeOf(this) === Product.increase.prototype) {
        throw new TypeError("it is not a constructor");
      }
      this.number++;
    },
  });

  return Product;
};

new Product("Bread", 1.5, 5);
```

### 手写 new 操作符

## 异步

### 浏览器的进线程模型

> 一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为**主线程**。

> 如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。

**浏览器是一个多进程多线程的应用程序。**

有三个进程：浏览器进程，渲染进程（一个标签页就是一个渲染进程），网络进程。

渲染进程启动后，会开启一个**渲染主线程**，主线程负责执行 HTML、CSS、JS 代码。

#### 渲染主线程

渲染主线程要负责很多的事情，那就会有一个难题：如何调度任务？

比如：

- 我正在执行一个 JS 函数，执行到一半的时候用户点击了按钮，我该立即去执行点击事件的处理函数吗?
- 我正在执行一个 JS 函数，执行到一半的时候某个计时器到达了时间，我该立即去执行它的回调吗?
- 浏览器进程通知我“用户点击了按钮"，与此同时，某个计时器也到达了时间，我应该处理哪一个呢?

渲染主线程想到了一个绝妙的主意来处理这个问题：排队

![](https://pic1.imgdb.cn/item/68a195bb58cb8da5c82a66b4.png)

1. 最开始的时候，渲染主线程会进入一个无限的循环。
2. 每次循环，检查消息队列是否有任务。如果有，就取出一个执行，执行完成后进入下一次循环；如果没有，则进入休眠状态。
3. 其他所有线程可以随时向消息队列添加任务，在添加任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿任务。

整个过程，称为 “**事件循环**”。

面试题：如何理解 JS 的异步？

![](https://pic1.imgdb.cn/item/68a197b258cb8da5c82a76fb.png)

#### JS 为何会阻碍渲染？

因为 JS 的计算和浏览器的渲染都在一个主线程内。




#### 优先级

任务没有优先级，但消息队列是有优先级的

每个任务都有一个任务类型，同一个类型的任务在一个队里。

在一次事件循环中，浏览器会根据情况从不同的队列中取出任务执行。

- 微队列：任务优先级最高。可以通过 Promise、MutationObserver 添加
- 交互队列：用于存放用户操作产生后的事件回调，优先级高。
- 延时队列：计时器的回调，优先级中

面试题：讲下 JS 的事件循环吧

![](https://pic1.imgdb.cn/item/68a19ad658cb8da5c82a8a6a.png)

### Promise

Promise 的出现统一了 JS 中的异步实现方案，减少了心智负担，但并没有解决回调地狱。

直接手写一遍就啥都知道了。

● 构造函数
● then
● catch
● finally


`静态方法`

- any
- all
- race
- allSelected
- resolve
- reject
- try：使用场景：就是一个函数，它返回的有可能是promise，也有可能不是，这时候就可以用try
![](https://pic1.imgdb.cn/item/68a5386a58cb8da5c83bb5b6.png)
- retry

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = "pending";
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;

    this.#run();
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
  #run() {
    if (this.#state === PENDING) return;

    while (this.#handlers.length) {
      const handler = this.#handlers.shift();
      const { onFulfilled, onRejected, resolve, reject } = handler;
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }
  #runOne(callback, resolve, reject) {
    queueMicrotask(() => {
      if (typeof callback !== "function") {
        // 如果then中的参数不是一个函数的情况：

        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        //  判断返回值是否是 promise
        if (this.#isPromiseLike(data)) {
            queueMicrotask(() => {
              data.then(resolve, reject)
            })
        } else {
          // 最关键的一点，然后就是把结果传递给下一个then的resolve
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  #isPromiseLike(data) {
    // 只要这个对象有 then 方法，就认为是 promise
    if (
      data !== null &&
      (typeof data === "object" || typeof data === "function")
    ) {
      return typeof data.then === "function";
    }
    return false;
  }


  // promise A + 中没有的，Es6 新增的
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(
      (data) => {
        callback();
        return data;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;

    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }

  static reject(reason) {
    // 不管你给我传的是什么玩意，我直接给你返回promise，新的promise里直接rejected
    const p = new MyPromise((resolve, reject) => {
      reject(reason);
    });
    return p;
  }

  // proms不一定是promise数组，准确的说是一个可迭代对象
  static all(proms) {
    let _reject, _resolve;
    // 最终肯定要返回一个promise,那就先把这个promise创建处来
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    let fulfilledCount = 0;

    let count = 0;
    // 收集所有promise最终执行的结果
    const result = [];
    // 下标
    let i = 0;

    for (const prom of proms) {
      const index = i;
      i++;

      count++;
      // 这里是防止传入的不是promise数组，先把它变成promise
      MyPromise.resolve(prom).then(
        (data) => {
          result[index] = data;
          fulfilledCount++;
          if (fulfilledCount === count) {
            // 说明所有的promise都已经执行完毕了
            _resolve(result);
          }
        },
        (err) => {
          _reject(err);
        }
      );
    }

    if (count === 0) {
      //如果是一个空数组
      _resolve(result);
    }
    return p;
  }

  // 同样传入的是一个可迭代对象
  // 当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。
  // 当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。
  static any(proms) {
    let _reject, _resolve;
    const p = new MyPromise(
      (resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      }
    )
    // 记录每个promise失败原因的数组
    const errorArr = [];
    let rejectedCount = 0;

    // 下标
    let i = 0;
    let count = 0;
    for (const prom of proms) {
        const index = i;
        i++;
        count++;
        MyPromise.resolve(prom).then(
            (data) => {
              _resolve(data);
            },
            (err) => {
              errorArr[index] = err;
              rejectedCount++
              if (rejectedCount === count) {
                // 说明所有的promise都已经执行完毕了
                _reject(errorArr);
              }
            }
          );
    }
    if (count === 0) {
        //如果是一个空数组
        _reject("你传的是一个空数组")
      }

    return p;
  }

  //接受一个 promise 可迭代对象作为输入，并返回一个 Promise。
  // 这个返回的 promise 会随着第一个 promise 的敲定而敲定。
  static race(proms) {
    let _reject, _resolve;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    for (const prom of proms) {
      MyPromise.resolve(prom).then(
        (data) => {
          _resolve(data);
        }, (err) => {
          _reject(err)
        }
      ) 
    }
    return p
  }
}


MyPromise.resolve().then(() => {
  console.log(0);
  return MyPromise.resolve(4);
}).then((res) => {
  console.log(res); 
})

MyPromise.resolve().then(() => {
  console.log(1); 
}).then(() => {
  console.log(2); 
}).then(() => {
  console.log(3); 
}).then(() => {
  console.log(5); 
})
```


### async/await

状态机
协程
yield：可以理解为 generator 生成器 的语法糖

这里可以去看 babel 将 async/await 转译后的源码


1. 返回的不是promise时

```javascript
async function a(){
  return 1
}

//相当于

async function a(){
  return Promise.resolve(1)
}
```
2. await 后面不是promise时


```javascript
async function a(){
  await 1
}
//相当于
async function a(){
  await Promise.resolve(1)
}
```

3. await的作用

只要后面的Promise完成，就立即把之后的代码推入微队列，即使后面显式的没代码，否则就卡住

```javascript
async function a(){
  await 1
}

// 等价于
async function a(){
  await 1
  return undefined
}

// 等价于
async function a(){
  await 1
  return Promise.resolve()
}
```

面试题：每隔一秒输出 1，2，3，4

```JavaScript
function sleep(wait) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, wait)
    })
}

(async () => {
    for (let i = 1; i <= 5; i++) {
        await sleep(1000)
        console.log(i)
    }
}
)()

```

### requestAnimationFrame

出现的原因：解决 setinterval 的定时器间隔不稳定的问题

60hz：1000/60 = 16.7ms

requestAnimationFrame 并不是由 JS 控制的，由浏览器直接控制的，不会因为 js 代码导致当前这个任务时间间隔不准的问题，所以说这里它的本质解决方式采用系统时间间隔。

和 settimeout 一样，只需要传入回调函数即可，不过这里的时间间隔是固定死了，就是 16.67ms

```javascript
const timer = requestAnimationFrame(() => {
  console.log("tick");
});
```

这里的这个 timer 是定时的序列号，从 1 开始。

demo：进度条

![](https://pic1.imgdb.cn/item/68a2eae258cb8da5c82f7b2e.png)

### requestIdleCallback

大量任务执行的调度： https://www.bilibili.com/video/BV1Hhf8Y3EJ6/

https://www.bilibili.com/video/BV17TcqeoEYb/

就是浏览器需要 16.7ms 去渲染一帧吗，有时候你可能 10ms 就计算完并渲染完，还剩下 6.7ms 的空余时间。

这个闲置时间，你可以做别的事情

![](https://pic1.imgdb.cn/item/68a2ed9c58cb8da5c82fa243.png)

![](https://pic1.imgdb.cn/item/68a2edb658cb8da5c82fa3af.png)

**rAF 和 rIC 的先后问题**

https://www.bilibili.com/video/BV1UR8Fz6EgN/

## Worker

### Web Worker

**使用方法**：

1. 指定一个 js 文件，注册为 worker 线程去执行
2. 通过 message 事件和 postMessage 方法，接收和发送消息给 worker 线程，terminate 方法关闭线程

main.js

```javascript
const worker = new Worker("worker.js");

// 拿到worker给的数据
worker.addEventListener("message", e => {
  console.log("来自worker的数据", e.data);
});

// 发送数据给worker
document.getElementById("btn").addEventListener("click", function () {
  worker.postMessage("Greeting from Main.js");
});

// worker.terminate()
```

worker.js

```javascript
self.addEventListener("message", e => {
  self.postMessage(e.data); // 将接收到的数据直接返回
});
```

**在 worker 中引入其他 js**

在 worker 中，如果要用一些 js 的库，因为不能访问 window 作用域的变量，所以没法用主页面的 js，需要通过如下写法来引入 js。

```javascript
importScripts("test.js");
```

- 如果我们引入的库，有操作 dom 的行为，是会失败的，因为 worker 中的全局 this 不是 window。

- web worker 引入脚本可以是跨域的。

- partytown 是一个基于 web worker 的框架，有兴趣可以去看一下。

**在 node 中使用 web worker**

![](https://pic1.imgdb.cn/item/68a2e2df58cb8da5c82ef112.png)

### Shared Worker

最主要的区别还是 port 的一个区别，用来描述在这个上下文中的这个 worker，shareworker 会根据后边的路径作为一个唯一性的判定，即便你创建十次，你会发现都是执行的同一个 worker。

main.js

```javascript
const worker = new SharedWorker("worker.js");
// 发送消息
worker.port.postMessage("Greeting from Main.js");
// 接收消息
worker.port.onmessage = e => {
  console.log("来自worker的数据", e.data);
};
```

worker.js

```javascript
self.onconnect = e => {
  let port = e.ports[0];
  port.onmessage = e => {
    console.log("来自main的数据", e.data);
  };
};
```

不能操作 dom，还是只能用来进行一些计算密集型的计算。

### Service Worker

`service worker`是浏览器内置的功能，是一个单独运行的线程，他不能操作 dom，主要的作用是缓存资源和推送通知。

`service worker`创建后与当前页面就没有关系了，这个 worker 就会作用于整个浏览器的一个常驻的线程，即使当前页面已经关闭了。

而是作用于**整个域名+scope 范围**，一个脚本对应的 service worker 在整个浏览器中只有一个，可以作用于多个 tab 页。

![](https://pic1.imgdb.cn/item/68a2e08f58cb8da5c82ed18f.png)

#### 使用方法

1. `register`方法是将指定的 js 文件注册为`service worker`，他会将这个 js 下载下来并在后台线程运行。
   1. `register`第二个参数可以指定 scope 范围，默认是当前路径.
   2. scope 的作用是当打开其他 tab 也是这个 scope 范围内的话，这个 service worker 也会被激活，此时生效于多个页面。
2. `message`回调的作用是监听来自`service worker`的消息，是主线程与 worker 通信的方式。
3. `postMessage`方法作用是向 worker 线程发送数据，注意是**深拷贝**的，并不是共享内存。

main.js

```html
<button id="btn">发送消息</button>
<script>
  var t = { id:99 };

  // 注册 Service Worker
  const registration = await navigator.serviceWorker.register('/23.05/sw/service-worker.js');
  console.log('Service worker registered with scope: ', registration.scope);

  // 监听从serviceworker线程发送到主线程的message
  navigator.serviceWorker.addEventListener('message', function (e) {
      console.log('service worker传到主线程的', e.data, e);
      console.log(t);
  });

  // postMessage方法，从主线程发送数据到worker，注意所有的发送数据都是深拷贝，而不是共享内存。避免并发问题
  document.getElementById('btn').addEventListener('click', function() {
      navigator.serviceWorker.controller.postMessage(t);
  });
</script>
```

然后我们来看 service-worker.js 怎么写的，主要是以生命周期函数的形式写了四个回调函数：

1. `install`:在第一次主线程中 register 的时候触发，如果已经 install 过了的 js，就不会再次触发了.
2. `activate`:相同 js 文件在相同域，之后的注册不会再 install，而是只触发 activate。
3. `fetch`:在主线程调用 fetch 函数的时候触发，返回值会作为主线程 fetch 的返回值，所以可以在这里做缓存替换。
4. `message`和`postMessage`与主线程中类似，是和主线程通信用的。

```javascript
// 在worker中如果要使用js文件需要用importScript这种写法 可以是跨域的
importScripts("test.js");

// install事件，在第一次注册的时候会触发
//  这里在install的时候进行了初始化，是将两个资源添加到了cache中
//  caches是浏览器内置的缓存对象，addALL会立即请求该资源并进行缓存
self.addEventListener("install", function (event) {
  console.log("install事件");
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll(["/23.05/sw/index.html", "/23.05/sw/api.json"]);
    })
  );
});

// active事件，在符合scope的页面打开后，就会激活，注意install只有一次，但是激活会有很多个页面激活
//  也可以将一些初始化操作放到active中
self.addEventListener("activate", event => {
  console.log("activate事件，一般是新打开了页面", event);
});

// fetch事件，拦截fetch方法，当页面调用fetch方法，就会被拦截
//  这里的逻辑是结合install中的缓存设置，来判断fetch的资源是否命中缓存实现加速，否则才真正调用fetch
self.addEventListener("fetch", async event => {
  console.log("拦截fetch", event);
  const res = await caches.match(event.request.url);
  if (res) {
    return res;
  } else {
    return fetch(event.request);
  }
});

// 接收来自主线程的消息，并往主线程发送消息
self.addEventListener("message", function (e) {
  console.log("主线程传到service worker", e.data);
  e.data.id++;
  setTimeout(() => {
    e.source.postMessage(e.data);
  }, 5000);
});
```

#### scoped 共享

service worker 是一个线程，对于一个 js 文件是一个单独的线程。

多个 tab 加载的 sw 的 js 文件相同时，不会重复安装，所以只有一个线程。

当打开了两个页面，他们是共用一个 service worker 的，当我们在一个页面中向 sw 发送消息，sw 收到后调用 console.log 实际上是委托给所有符合条件的 tab 都进行打印的。

而 e.source.postMessage 的 source 只是针对发送消息过来的页面，所以有下面现象： 我们在一个页面中发送了消息，另一个页面也打印了接收到了消息。但是返回的消息只有发送的这个页面有打印出来。

所以我们得慎用 console.log 方法，因为会在所有的 tab 中都打印消息。

因为这种共享的机制，也就使得 sw 是不能也不应该操作 dom 元素的，因为会有多个页面都用一个 sw，操作哪个 dom 呢？

目前 sw 主要作用还是缓存资源，众所周知浏览器对于 http 资源本来也是可以进行缓存的，这和手动的 sw 进行缓存的区别是什么呢。

浏览器 network 缓存主要受控于资源的`response header: Cache-Control `中。

#### 应用场景：前端更新部署后，如何通知用户刷新？

https://www.bilibili.com/video/BV1A6hAzrEhL/

其实轮询也行：自动检测更新 - https://www.bilibili.com/video/BV17ih7z6EXy/


## Set

### 手写版本

```javascript
class MySet {
    #data = [];
    *[Symbol.iterator](){
        for (const item of this.#data) {
            yield item; 
        }
    }
    constructor(iterator = []) {
        // 验证是否是一个可迭代对象
        if (typeof iterator[Symbol.iterator] !== "function") {
            throw new TypeError(`${iterator} is not iterable`);
        }

        for (const item of iterator) {
            this.add(item);
        }
    }
    get size(){
        return this.#data.length;
    }
    add(data) {
        if (!this.has(data)) {
            this.#data.push(data);
        }

    }
    has(data) {
        return this.#data.includes(data);  
    }
    delete(data) {
        const index = this.#data.indexOf(data);
        if (index === -1) return false;
        this.#data.splice(index, 1); 
    }
    clear() {
        this.#data.length = 0; 
    }

}
```