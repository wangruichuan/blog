> 写在前面：本教材纯纯面向面试，基于JS语言

## 常见的时间复杂度

1. sort函数时间复杂度：O(nlogn)
2. set的查找是  O(1)

## 贪心算法

### 跳跃游戏2
给出几个概念，便于理解这道题的解法

- 覆盖范围：只要覆盖范围覆盖了终点，就不用管是怎么跳过去的。我们每跳一步，就是要尽可能的去增加我们的覆盖范围。只要我们的覆盖范围，一旦把我们的终点位置给覆盖了，那么就说明我们用当前的步数就可以跳到终点位置



## 哈希表
键值对结构。

哈希表的核心特点是：

- ​键的唯一性​：每个键只能出现一次。
- ​快速查找​：**平均时间复杂度为 ​O(1)​**​（最坏情况是 ​O(n)​，取决于哈希冲突的处理方式）。

### has() 方法的工作原理
1. 计算key的哈希值
2. 去哈希表中查找该哈希值对应的存储位置是否有数据。如果没有，返回false
3. 如果有，通过=== 进行全等判断。

如果多个键的哈希值相同（哈希冲突），引擎会采用 **​链地址法**（Chaining）​​ 或 **​开放寻址法**（Open Addressing）​​ 来存储这些键值对。

### 探讨最坏情况
JavaScript 引擎（如 V8）通常采用以下两种方式处理哈希冲突：

1. 链地址法（Chaining）​​
   
如果多个键的哈希值相同，它们会被存储在同一个 ​桶（bucket）​​ 中，形成一个链表（或类似结构）。

当调用 has(key) 时：

- 先计算 key 的哈希值，找到对应的桶。
- 然后遍历链表，逐个比较键是否严格相等（===）。
- **​最坏情况**​：如果所有键都哈希到同一个桶，查找会退化成 ​链表遍历（O(n)）​。
2. 开放寻址法（Open Addressing）​​

- 如果发生冲突，引擎会尝试在哈希表中 ​寻找下一个可用的位置​（如线性探测、二次探测等）。
- 当调用 has(key) 时：
- 先计算 key 的哈希值，检查该位置。
- 如果该位置的键不匹配，则继续探测下一个位置，直到找到或遍历完整个表。
- **​最坏情况**：如果哈希表几乎被填满，探测过程可能需要遍历整个表（O(n)）。

### 练习题

#### 快乐数

![](https://pic1.imgdb.cn/item/68920fdf58cb8da5c806fbd0.png)

判断一个数是否是快乐数，本质上是判断一个链表是否有环。

![](https://pic1.imgdb.cn/item/689210e458cb8da5c806fceb.png)

核心思路：​​ 在计算过程中，需要 ​记录已经出现过的数字，如果某个数字重复出现，说明进入了循环，即该数不是快乐数。

​实现方式：​​ 使用 Set（哈希表）存储计算过的数字，每次检查新数字是否已存在：

```javascript
var isHappy = function (n) {
    const _set = new Set()

    while (n !== 1) {
        if (_set.has(n)) return false
        _set.add(n)
        n = getNext(n)
    }
    return true

};
function getNext(num) {
    return [...(num + '')].map(i => Number(i) * Number(i)).reduce((acc, cur) => acc + cur, 0)
}
}
```
#### 最长连续序列

![](https://pic1.imgdb.cn/item/6893006b58cb8da5c80953e8.png)

**哈希表的value存什么**

- key存数字，value存什么？
  新存入的数字，需要左邻居告诉它左边能提供的连续长度，右邻居告诉它右边能提供的连续长度
  加上它自己的长度，就有了自己处在的连续序列的长度

![](https://pic1.imgdb.cn/item/689300d758cb8da5c8095662.png)

**更新新序列的两端数字的value**

- 同处一个连续序列的数字的value理应都相同，这是它们共同特征
- 但**没有必要每个的value都是序列长度**，只需要两端的数存序列的长度就好，因为靠的是两端和新数对接，序列是连续的，中间没有空位


```javascript
var longestConsecutive = (nums) => {
  let map = new Map()
  let max = 0
  for (const num of nums) { // 遍历nums数组
    if (!map.has(num)) { // 重复的数字不考察，跳过
      let preLen = map.get(num - 1) || 0  // 获取左邻居所在序列的长度 
      let nextLen = map.get(num + 1) || 0 // 获取右邻居所在序列的长度 
      let curLen = preLen + 1 + nextLen   // 新序列的长度
      map.set(num, curLen) // 将自己存入 map
      max = Math.max(max, curLen) // 和 max 比较，试图刷新max
      map.set(num - preLen, curLen)  // 更新新序列的左端数字的value
      map.set(num + nextLen, curLen) // 更新新序列的右端数字的value
    }
  }
  return max
}
```


## 动态规划

### 基础知识

在所有的算法题中，公认最难的永远是动态规划，你可以看下力扣里面，基本上是属于困难和中等，很少遇到简单类型，那我们在这块就是要解决动态规划。

> 顺便说一下，目前在整个软件开发领域里边，都 2025 年了，居然还存在一种思想，认为这个算法无所谓的，平时开发又不怎么用，但我觉得，这种思想的生存空间会越来越窄。这里直接下一个死结论：你不会算法，在这个行业里，要么走不长，要么走不好，有的时候，两者皆有。
> 为什么，程序的本质是什么？为了解决一个需求而去寻找实现它的方法吗。这不是算法这是啥啊。可以说，算法就是对整个程序的高度浓缩。你能搞定复杂的算法问题，就一定能搞定复杂的业务问题！

解决动态规划问题，就两个步骤：

1. 思路
2. 实现

一定是先想好了思路，再去实现，这不仅仅是解决动态规划的一个流程，而是所有的算法题，甚至所有的需求实现都应该如此，那么在这两步中，最难的就是思路了。

那么解决动态规划问题，需要使用一种什么样的思路来解题呢？最难的一个点：**确定状态转移方程**

> 什么是状态转移方程？答：不同规模的相同问题之间的关系。

这里来看一个具体的例子：

比方说动态规划里的入门题是什么：斐波那契数列。

1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765...
除了前两位固定为 1 之外，每一位实际上等于前两位之和。比方说让你求一个斐波那契数列第 N 位的值，我们用一个函数 f(n)来表示：那这个 n 就表示的是问题的规模。n 越大，问题是规模越大。比方说，f(5)表示的是斐波那契数列的第 5 位。这些不同规模的相同问题，他们之间的关系就是状态转移方程。
就是 **f(n)=f(n-1)+f(n-2)**

然后就是确定一些特殊解，f(1)=1,f(2)=1。

我们把这个 f 通常叫做 dp (dynamic programming) 动态规划，大家不用理解这个动态规划这个词到底是什么意思，它解题的本质就是这样，甚至对于很多题，你只要列出一些方程，代码都出来了，来吧，比方说我们就求一个斐波那契数列。

```javascript
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
```

当然这个斐波那契数列，它是把它的状态转移方程直接拍你脑门上了，你一眼就看出来了，但大部分情况可能没有那么容易看出来，这就需要去思考去寻找了。

比方说经典的 **青蛙跳台阶问题** ：

![guagua](https://img.picgo.net/2025/07/25/image1a6cdfd57fd9c8d2.png)

有 n 级台阶，有这么一个青蛙，他可以一次跳一阶，也可以跳两阶，问他从台阶底部跳到达台阶的顶部，一共有多少种跳法，这也是一个动态规划的问题，只不过这个问题呢，没有那么容易的看出它的状态转移方程。

我们假设有这么一个函数，表示的是青蛙从底部跳到 n 级台阶，一共有多少种跳法。
dp(6)就表示青蛙从底部跳完六级台阶，一共的跳法数量，dp(5)就表示青蛙从底部到第五级台阶，一共的跳法数量。

他们之间有没有关系呢，可以看到。跳完六级台阶，无非就两种情况，就是最后一步跳两阶和最后一步跳一阶，那我只要找出跳到这有多少种跳法，那么最后跳一步的情况就有多少种。比方说，在最后只跳一步的前提下，有 1000 种情况，最后跳两步的情况下有 500 种情况，那么于是，dp(6)就应该等于 dp(5) + dp(4) ==> 最后只跳一阶的情况+最后只跳两阶的情况，状态转移方程就出来了，我们发现，居然还是斐波那契数列，但这一次的斐波那契数列是我们通过分析得出来的，而不是一眼就看出来的，这就是解决动态规划问题的最困难的地方，虽然困难，我们也有专门的训练方式，以及这里边有一些找到状态转移方程的技巧。

### 背包问题

> 01 背包问题他是一个守门员，就是说，你如果过了它，就拿到了去力扣上做动态规划题的入场券，如果你过不了，那我就不建议你去力扣刷题。为啥呢，不说你能不能写出来了，你就是直接看题解你都不一定看得懂。

![bagpack.png](https://i.imgs.ovh/2025/07/25/We67h.png)

这个问题怎么说的呢？就是说给你一些物品，数量是任意的，每件物品呢有它的价值和重量，让你在这些物品里选一些，放入一个背包，这个背包他有一个支持的最大重量，你不能超过它，请问我该如何选择，才能够使利益最大化，让你求出那个最大的价值。

整个问题里，有三个维度：价值、重量、背包的容量。三个维度往往可以构建出一个二维表

![二维表](https://i.imgs.ovh/2025/07/25/WeeJa.png)

每一个格子就是一个 dp[i][j],比方说 dp[3][5]它表达的意思就是 在物品下标在 0~3 的情况下，在这些物品当中，选择重量不超过 5 的物品，所得到的最优解。

如果说我能填完整个 dp 表格，那你想一下，这个表格的最后一个格子，它表达的是总重在 6 的情况下，0 到 4 的物品区间内能拿到的最优解，不就是我们的最终结果吗。

那接下来我们就需要分析，这每一个格子是一个局部问题，它的局部问题到底应该怎么解出来。比方说这个格子，其实他只有两种情况：这件物品选还是不选。是不是就这两种情况，我要在选和不选里边找一个最优解，那么这个表达式就应该写成这样：dp[i][j] = max(选第 i 件物品，不选第 i 件物品)

- 不选第 i 件物品：最优解为 同等重量下，前边这些格子的最优解，也就是 dp[i-1][j]，也就是上一行的相同列
- 选第 i 件物品：关键就在于选这件物品，选这件物品比较复杂。如果说我选了这件物品，那么这件物品呢有它自身的价值，所以说选这件物品的情况下，一定要把这个值给考虑进去。因此，表达式里边至少其中有一段可以写成 value[i],但是光有它还不够，因为你选了它之后，可能还有剩余的空间，比方说我这个空间呢占了 4，总空间是 5，5-4 是不是还剩余一些空间，剩余空间是 1，那么我们就要得到在这个空间下前边这一部分的最优解，再给他加上不就完事了，那前边的最优解是啥呢。不就是 dp[i-1]j-w[i]]吗（j - 重量这一列），然后最终的状态转移方程就列出来了。
  `dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])`

最难的部分就结束了。

剩下的无非就是一些边界情况了，比方说，有可能呢当前的格子本身就装不下，那直接就不选就完事了。

还有就是第一行的时候呢，由于它没有上边这一行，只看它自己重量能不能放进去，能放进去就放进去，这里把填完之后的表格给填一下。

![填完之后的图片](https://i.imgs.ovh/2025/07/25/W90xm.png)

这个问题貌似就解决了，现在呢我们要考虑一下效率了，用这种方案的话，它的空间复杂度是多少？O（n\*bagWeight），能不能优化呢?

我们观察到，在每一行运算的时候，我们其实只需要上一行结果，所以，我们可以用一个一维数组（滚动数组）来代替二维数组，空间复杂度降为 O（bagWeight），时间复杂度不变。
`next[j] = max(result[j], result[j-w[i]] + v[i])`

那么好，这里直接给出最终的代码：

```javascript
function package01(bagWeight, value, weight) {
  let result = [];
  for (let j = 0; j <= bagWeight; j++) {
    result[j] = j >= value[0] ? value[0] : 0;
  }
  for (let i = 1; i < value.length; i++) {
    const next = [];
    for (let j = 0; j <= bagWeight; j++) {
      if (j >= weight[i]) {
        next[j] = Math.max(result[j], value[i] + result[j - weight[i]]);
      } else {
        next[j] = result[j];
      }
    }
    result = next;
  }
  return result[bagWeight];
}

const result = package01(6, [5, 10, 3, 6, 3], [2, 5, 1, 4, 3]);

console.log(result);
```

这道题非常具有借鉴意义，难度适中，搞清了很多题，力扣上的很多的动态规划问题，不能说做不出来，至少它的题解你就能看懂了。

### 最优解问题

动态规划里最常见的一个问题就是求一个最优解。这里看一个 打家劫舍 的例子。至于它罗里吧嗦的描述呢，我就不一一念了。就是说，给你一个数组，这个数组里边，每一个数字他一定是大于等于 0 的，然后希望你从数组里边取出数字，问你取出的所有数字相加之和，它的最大值是多少，那么在取的时候，有一个规则，就是 **相邻的两个数字是不能取的**，比方说把数组 [1,2,3,1] 拿过来，你只能取 1 和 3，不能取 1 和 2，不能取 2 和 3，不能取 3 和 1。只要不相邻就可以取出来，问取出的总量的最大值为多少，那么像这个问题呢，最优解就是 4，可以取 1 和 3。这就是一个求最优解的问题。

面对这种求最优解的问题，他往往的特点是什么呢？就是这个问题的整体上，它的情况非常之多，你很难从一个整体上能够迅速的抓到他的逻辑和规律，就是整体上他很复杂，但是往往在局部上他是非常简单的，我们来看一下吧。

![最优解问题](https://img.picgo.net/2025/07/25/imageb72ab1c841f5983b.png)

它给了你一个数组，这个数组里边有各种各样的数字，你要整体去求就比较麻烦，但是你想一想局部呢，比方说我们定义一个 dp[i],这个 dp[i]表示什么意思呢，他表示说从数组的下标 0 开始，到下标 i 之间，在这个范围内我找一个最优解，那么这就是一个一般性的解。一般性的解解出来了，那么整个全局的解我一定能解出来，为啥呢，因为我无非就是让 i 等于数组的长度-1 不就行了。

好，那么这个整体的问题呢，就变成了一个局部的问题了，整体的问题可能比较复杂，但是局部问题往往是很简单的，我们就来观察一下这一部分，他要找到最优解该怎么去找，无非就两种情况：i 这个位置我要不要。在这两种情况，我取一个最大值不就完了吗，所以这个表达式应该写成什么样子呢：
dp[i] = max(i 要取，i 不取)

- i 要取：i 要取的话，i-1 这个位置就不能取了，这个位置的表达式就是 nums[i]+前边的最优解(dp[i-2])
- i 不取：i 不取，那么表达式就是 dp[i-1]

最终的状态转移方程就是：

`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

考虑几种边界情况：

- i=0 时：dp[0] = nums[0]
- i=1 时：dp[1] = max(nums[0], nums[1])

好，给出最终的代码：

```javascript
function rob(nums) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      dp[i] = nums[i];
    } else if (i === 1) {
      dp[i] = Math.max(nums[i], nums[i - 1]);
    } else {
      dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }
  }
  return dp[nums.length - 1];
}

console.log(rob([1, 2, 3, 1]));
```

### 不同路径 问题

> 这里总结下 寻找状态转移方程的一般性步骤：
>
> 1. 找到相同问题(重叠子问题)：「相同问题」必须能适配不同的规模
> 2. 找到重叠子问题之间的关系
> 3. 找到重叠子问题特殊解

那么好，来看这道题：有一些格子，给你一个行数，给你一个列数，那么就生成了一个棋盘，然后呢，有个机器人在左上角，这个机器人每一步可以向右，也可以向下，请问他从左上角到达右下角，一共有多少条路径。

![不同路径问题](https://img.picgo.net/2025/07/26/image19ea0234fbbf4190.png)

这里有行也有列，那么它有两个东西来表示它的规模，分别用 i 和 j 来表示 dp(i,j)，表达机器人从左上角到达第 i 行，第 j 列一共有多少条路径。
第二步，找到重叠子问题的关系。我们观察到，比方说要达到某个点,无非就两种方式：要么从这个点的上方过来，要么从它的左边过来。所以状态转移方程应该这么写：

`dp(i,j)=dp(i-1,j)+dp(i,j-1)  `

第三步，找特殊解。 如果是第一行，那你只能一直向右走；如果是第一列，那你就只能一直向下走：

当 i=0 或 j=0 时：dp(i,j) = 1

到这里，状态转移方程就列出来了

```javascript
var uniquePaths = function (m, n) {
  const dp = new Array(m).fill().map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};
```

### 最小路径问题

给你一个二维数组，不一定行列相同。从左上角走到右下角，可以向右可以向下，那么在到达右下角的路径当中，经过的数字之和的最小的那个值。

![最小路径问题](https://i.imgs.ovh/2025/07/26/WmU3g.png)

还是要列出 重叠子问题：到达某个点的最小路径值。无非就两种情况，要么从这个点的上面来，要么从这个点的左边来。两者求最小去比较一下，找到最小的，再加上自身。

dp(i,j)=min(dp(i-1,j),dp(i,j-1))+grid(i,j)

然后考虑边界情况：当 i=0&&j=0 时，dp(i,j) = grid[i][j]。

考虑完这些，写代码就是非常简单的事情了。

```javascript
var minPathSum = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const dp = new Array(m).fill().map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j];
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
  }
  return dp[m - 1][n - 1];
};
```

### 无后效性

https://leetcode.cn/problems/dungeon-game/

通过这道题，可以认识到动态规划里一个重要的点，如果你稍不留神，你列出来的状态转移方程，就完全是错误的。

给你一个二维数组，有一个骑士，从数组的左上角出发，要去右下角去救公主，它每一步可以向右，也可以向下，每个格子会有一个恶魔，会让这个骑士扣去生命值，有些格子住着一些医生 or 血包，他可能会让这个骑士加一些血量，当然，这个骑士在行进过程中，要适中保持 >=1,请问这个骑士至少需要多少血量。

![image](https://img.picgo.net/2025/07/28/imageb0d9c89141964f93.png)

看上去这个问题好像很好解，比方说我们用一个 dp[i][j] 表示他到达(i,j)这个点需要多少血量。

比方说到右下角 -2 这个点，它应该等于啥呢？应该等于 0 和 -2 这两点初始血量的最小值。

但是，这种方法是行不通的？因为在这道题中，动态规划进行到下一个阶段的时候，会影响到上一个阶段的最优解，这就叫做后效性。也就是动态规划的解，不仅仅要参考上一个阶段的最优解，还要看这个解是怎么出来的，那如果说遇到这种情况，就需要好好想一下了。因为动态规划有一个前提条件，必须要保证**无后效性**。

我们现在尝试着把它反过来看一下呢？格子里的点不再表示骑士到达某个点的初始血量。而表示**骑士就从这个点出发，到达右下角的初始血量**，比方说 dp[0][0],就代表骑士从（0，0）这个点出发，到达右下角的初始血量。那我只需要分别计算出来 dp[0][1] 和 dp[1][0]就可以了。然后通过比较这两个数，来找出 dp[0][0]的结果。这就保证了动态规划的这个式子没有后效性，下一个阶段的值，我只需要考虑上一个阶段的他们的最终值就可以了，不用考虑怎么来的。

当然了，骑士的血不能是负数，所以呢这个状态转移方程还要在加上一个限制。至少得有一点血

这个时候得出来的
`dp[i][j] =Math.max( Math.min(dp[i+1][j], dp[i][j+1]) - grid[i][j],1)`。

剩下的就是填这个表格了，我们就需要从右下角开始，一直填到左上角，那最终这个左上角的值就是我们需要的值。

考虑下边界情况，比方说 gird[0][2] 这个格子，应该是下边这个格子和右边这个格子，求一个最小值，但是右边没格子啊，这种情况怎么保证这个在边界的位置一定是往下走呢？那你只需要把右边这个那个格子设一个无穷大，一求最小值，他只能往下走。所以，在构建这个 dp 表格的时候，给它多加一行一列，全部填上无穷大。
但你要注意，还有一个情况：对于最后一个右下角的格子，它的下边和右边的格子都是无穷大，你让两个无穷大去比较就不合适了，**所以需要把这俩给设为 1**。

![nekON.png](https://i.imgs.ovh/2025/07/28/nekON.png)

直接给出题解：

```javascript
var calculateMinimumHP = function (dungeon) {
  // 拿到行和列
  const m = dungeon.length;
  const n = dungeon[0].length;

  // 初始化
  const dp = new Array(m + 1).fill().map(() => new Array(n + 1).fill(Infinity));

  //处理右下角的情况

  dp[m - 1][n] = 1;
  dp[m][n - 1] = 1;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = Math.max(Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j], 1);
    }
  }

  return dp[0][0];
};
```
好，通过这个问题，我们可以注意到，在这种复杂的动态规划问题里，一定要注意到 无后效性。不然呢，你想了半天，写出来的方程根本是解不出来的。

### 优化动态规划的空间复杂度

对于最简单斐波那契数列，我们可以用一个数组来装，比方说你给我的n是6，那么我就建立一个长度为6的数组来装，

这种方法虽然容易理解，但是它太浪费空间了。那怎么办呢？

我能不能降低一下呢？其实仔细思考一下，是比较容易想到的，就是我在求某一位的时候我只与它前两位有关系，跟再前两位有没有什么关系，我只求这一位只和他有关系的，跟再前两边有啥关系呢？所以这样思考之后，我们原来是不需要一个数组去装的，而只需要两个变量就可以了，我把它命名为p1和p2，不断的更新p1和p2就可以了。

![neKIL.png](https://i.imgs.ovh/2025/07/28/neKIL.png)

```javascript
function getFib(n) {
  if (n <= 2) {
    return 1;
  }
  let p1 = 1;
  let p2 = 1;
  let r ;
  for (let i = 3; i <= n; i++) {
    r = p1 + p2;
    p1 = p2;
    p2 = r;
  }
  return r;
}

```

这时候再看之前的一个例子：```不同路径问题```

![neNI4.png](https://i.imgs.ovh/2025/07/28/neNI4.png)

按照之前减少空间复杂度的思路，在求某一个格子的时候，其实只需要它上边跟左边的数据，那其实**只需要一个一维数组去保存上一行的数据**即可。当然了，这种做法他有一个专业的名词叫做 滚动数组。

![ne3DC.png](https://i.imgs.ovh/2025/07/28/ne3DC.png)

至此，动态规划的理论与例题部分就已经结束了，通过以上内容，我们已经掌握了动态规划的最基本的一些思想和理论，当然，关于动态规划还有很多的知识点。


## A*寻路算法 (TODO)


## 二叉树

### 基础知识

1. **数据结构基础**

```javascript
class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}
// 创建一个简单的树：
//   1
//  / \
// 2   3
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
```

2. 核心操作：**二叉树的遍历**。分为递归与非递归
   1. 深度优先搜索（DFS）​:
      1. ​前序遍历​：根 -> 左 -> 右
         1. ​应用​：深度复制一棵树、序列化、显示目录结构。
      2. ​中序遍历​：左 -> 根 -> 右
         1. ​应用​：在二叉搜索树（BST）​​ 中得到升序序列。
      3. ​后序遍历​：左 -> 右 -> 根
         1. ​应用​：计算子树的大小、释放二叉树的内存（必须先释放子节点再释放根）。
   2. ​广度优先搜索（BFS / 层次遍历）​:
      1. 使用队列（Queue）​​ 实现。在 JavaScript 中可以用数组的 push和 shift方法模拟。
      2. ​应用​：按层处理节点、求树的深度、找最短路径（在树中）。
  
### 延伸知识
1. 特殊的二叉树​
   1. ​二叉搜索树（BST）​​：**左子树所有节点 < 根节点 < 右子树所有节点**。时间复杂度：O(logN)
      1. ​中序遍历的结果是升序数组。这是最重要的特性，很多题目都围绕它展开。
   2. ​平衡二叉树（如AVL树、红黑树）​​：左子树和右子树的高度的绝对值的差不超过1.
      1. 主要保证树的高度不会过高，查询效率稳定。力扣中常出现的是平衡二叉搜索树。
   3. ​完全二叉树 & 满二叉树​：与堆的结构密切相关，常用于优先级队列/堆排序。
      1. 满二叉树：数量 = `2^h - 1`
      2. 完全二叉树：除了底层外，其他层都是满的，底层是从左到右连续的。
   
2. 算法技巧
   1. ​分治法​：将大问题（整棵树）分解为小问题（左子树和右子树），分别解决后再合并结果。这是解决二叉树问题的核心思想。
   2. ​回溯法​：在遍历时记录路径，并在退回时撤销选择（例如，从路径数组中 pop掉当前节点）。常用于路径总和这类问题。
3. 以数组形式去存储二叉树时：
   ![](https://pic1.imgdb.cn/item/68abb3f758cb8da5c8493b8d.png)

   - 左孩子：**2 * i + 1**
   - 右孩子：**2 * i + 2**



### 刷题顺序

好的，这是为您重新排版的二叉树刷题顺序清单，格式更清晰，便于查阅和跟踪进度。

二叉树刷题顺序指南 (JavaScript)

1. 基础遍历 (必须熟练掌握)

   • https://leetcode.cn/problems/binary-tree-preorder-traversal/ (前序)

   • https://leetcode.cn/problems/binary-tree-inorder-traversal/ (中序)

   • https://leetcode.cn/problems/binary-tree-postorder-traversal/ (后序)

   • https://leetcode.cn/problems/binary-tree-level-order-traversal/ (层序)

2. 简单属性与操作 (巩固递归和分治思想)

   • https://leetcode.cn/problems/maximum-depth-of-binary-tree/ (分治法经典入门)

   • https://leetcode.cn/problems/same-tree/ (相同的树)

   • https://leetcode.cn/problems/invert-binary-tree/ (翻转二叉树超级经典)

   • https://leetcode.cn/problems/symmetric-tree/ ( 对称二叉树)

   • https://leetcode.cn/problems/path-sum/ (二叉搜索树的最近公共祖先)

3. 二叉搜索树 (BST) (理解中序遍历特性)

   • https://leetcode.cn/problems/search-in-a-binary-search-tree/ 

   • https://leetcode.cn/problems/validate-binary-search-tree/ (中序遍历特性)

   • https://leetcode.cn/problems/minimum-absolute-difference-in-bst/ (中序遍历特性)

   • https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/

4. 构造与序列化 (提升综合应用能力)

   • https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/

   • https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ (经典难题)

   • https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/

5. 进阶问题 (挑战高频难题)

   • https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/ (非常高频)

   • https://leetcode.cn/problems/binary-tree-maximum-path-sum/ (困难但经典)

建议：
 - 按顺序逐个专题攻克，确保掌握一类问题后再进入下一类。
 - 每道题尝试用递归和迭代两种方法实现（尤其是遍历题）。
 - 做好总结，记录解题思路和易错点。

### 递归遍历

1. 前序
```javascript
var preorderTraversal = function(root) {
    const result = [];
    
    const traverse = (node) => {
        if (node === null) return; // 递归终止条件
        result.push(node.val);     // 访问根节点
        traverse(node.left);       // 遍历左子树
        traverse(node.right);      // 遍历右子树
    };
    
    traverse(root);
    return result;
};
```

2. 中序

```javascript
var inorderTraversal = function(root) {
    const result = [];
    
    const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);       // 遍历左子树
        result.push(node.val);     // 访问根节点
        traverse(node.right);      // 遍历右子树
    };
    
    traverse(root);
    return result;
};
```

3. 后序

```javascript
var postorderTraversal = function(root) {
    const result = [];
    
    const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);       // 遍历左子树
        traverse(node.right);      // 遍历右子树
        result.push(node.val);     // 访问根节点
    };
    
    traverse(root);
    return result;
};
```

### 层序遍历

1. 返回一维数组版本

```javascript
var levelOrder = function(root) {
    if (root === null) return [];
    
    const result = [];
    const queue = [root]; // 初始化队列，放入根节点
    
    while (queue.length > 0) {
        const currentNode = queue.shift(); // 从队列头部取出节点
        result.push(currentNode.val);      // 访问该节点
        
        // 将该节点的子节点按顺序加入队列尾部
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
    
    return result;
};
```
2. 返回二维数组版本

```javascript

var levelOrder = function(root) {
    if (root === null) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length; // 当前层的节点数
        const currentLevel = [];        // 存储当前层的节点值
        
        // 处理当前层的所有节点
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevel.push(currentNode.val);
            
            // 将下一层的节点加入队列
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        
        result.push(currentLevel); // 将当前层加入结果
    }
    
    return result;
};
```

### 判断是否为相同的树

```javascript
var isSameTree = function(p, q) {
    const diff = (p, q) => {
        if (!p && !q) return true;
        if (!p || !q) return false;
        if (p.val !== q.val) return false;
        return diff(p.left, q.left) && diff(p.right, q.right);
    }
    return diff(p, q);
};
```

### 翻转二叉树
```javascript
var invertTree = function(root) {
    if (!root) return null;
    const left = invertTree(root.left);//递归左子树
    const right = invertTree(root.right);//递归右子树
  	//交换左右节点
    root.left = right;
    root.right = left;
    return root;
};
```
