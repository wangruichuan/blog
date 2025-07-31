## 如何实现一个私有属性

这里总结下所有的方法：

1. 两个下划线_ _：这种是最弱的，这是在过去没办法，根本防不住，私有属性是只能在这个类里边进行使用，下划线只是一个命名规范，是一个弱约束
2. 使用symbol
   ```javascript
   const key = Symbol('key')
   class A{
      [key] = 1;
      
      a(){
          console.log(this[key])
      }
   }

   const a = new A;
   console.log(a[key]); //1
   ```
   现在这种是外边也能用的，我们可以把上边的放到一个单独的模块里，默认只到处这个类，不导出这个符号

   ```javascript
   const key = Symbol('key')
   class A{
      [key] = 1;
      
      a(){
          console.log(this[key])
      }
   }
   export default A;
   ```

   然后在另外一个模块中去使用
   ```javascript
   import A from './A';
   const a = new A;
   ```
   但是呢，它可以使用 ```Object.getOwnPropertySymbols``` 方法得到这个实例里的所有属性，所以这个符号属于仍然能在外边获取到

   ```javascript
   import A from './A';
   const a = new A;
   const key = Object.getOwnPropertySymbols(a)[0]
   console.log(a[key])
   ```

   但是，谁会平时开发写这种代码呢，但现在是面试环境，你要尽可能的把所有的方案、情况都想到。
3. 上TS，用```private```修饰符，但是TS是一个编译时态的东西，这个私有只存在编译时态
4. 最新版的ES标准： ```# ```修饰符，语言层面的终极约束，但是只能在ES新标准上才能使用。
   ```javascript
   class A{
       #key = 1
       a(){
           console.log(this.#key)
       }
   }
   const a = new A;
   a.#key //Error: a is private and only accessible within class 'A'
   ```

5. 使用```WeakMap```或者```WeakSet```：思路就是，将类的属性名放到map中，key是这个类的this，value是私有属性所构造的对象，
   ![](https://pic1.imgdb.cn/item/688840eb58cb8da5c8eaa1f0.png)

   babel用的就是这种方式。