# 一、一些小点

- [javadoc标签](https://c.biancheng.net/view/6262.html)
- 基本类型转String： 调用parseXX 方法即可
- 二维数组：定义时必须指定行，列可以不指定
- 重载：要求 **形参不一样**（类型，顺序），**对返回类型没要求**
  - **可变参数：**`public int sum(int... nums）`  可以传多个int类型的值（也可以直接传数组）
  - 对于可变参数，在方法里使用的时候，就把当一个数组变量就好。
  - 可变参数和普通参数混合使用时：可变参数必须是最后一个
  - **一个形参列表中只能有一个可变参数**
- this的小技巧：使用this访问类的构造器：`this("jack","100");`
- 包名规范：`com.公司名.项目名.业务模块名`
  - lang：基本包，默认引入，不需要再引入
  - util：系统工具包
  - net：网络开发
  - awt：GUI

# 二、面向对象

## 2.1 访问修饰符：

protect：子类+同一个包中的类

默认：同一个包中的类

类只有**public**和**默认**

## 2.2 继承

1. 子类继承了所有的属性和方法，但是私有属性和方法不能在子类直接访问，要通过公共的方法去访问。（父类可以提供一个公共的 getter 方法来获取私有属性的值）
2. 当创建子类对象时，不管使用子类的哪个构造器，默认情况下总会去调用父类的无参构造器。
3. 如果父类没有提供无参构造器，则必须在子类的构造器中用 `super（参数列表）` 去指定使用父类的哪个构造器完成对父类的初始化工作。
4. super构造器必须放在第一行，且super只能在构造器中使用。
5. super和this不能共存，因为都要放在第一行
6. super：super.属性名;super.方法名
7. super的访问不限于直接父类，如果爷爷类和本类中有同名的成员，也可以使用super去访问爷爷类的成员;如果多个基类(上级类)中都有同名的成员，使用super访问遵循**就近原则**。

## 2.3 多态

**方法重写**

1. 子类方法不能缩小父类方法的访问权限
2. 子类的返回类型可以跟父类的不一样，前提是**子类的返回类型是父类的返回类型的子类**。
3. 属性没有重写一说，属性只看编译类型

**编译类型 VS 运行类型**

1. 一个对象的编译类型和运行类型可以不一致，编译类型在定义对象时，就确定了，不能改变
2. 运行类型是可以变化的。编译类型看定义时 =号 的**左边**，运行类型看 =号的 **右边**

### 2.3.1 多态的前提

- 有继承关系；
- 有**父类引用指向子类对象**；
- 有方法重写

### 2.3.2 多态的特性

**向上转型**

- 可以调用父类中的所有成员(需遵守访问权限)
- 不能调用子类中特有成员
- 最终运行效果看子类的具体实现

**向下转型**

场景：调用子类的特有成员    eg：`Cat cat = （Cat）animal;`

`instanceof`用于判断对象的类型是否为**XX**类型或**XX类型的子类型**

### 2.3.3 动态绑定

当调用对象方法的时候，该方法会和该对象的内存地址/运行类型绑定

当调用对象属性时，没有动态绑定机制，哪里声明，哪里使用（也就是看 = 左边的类型）

### 2.3.4 多态的应用

**多态数组**

![image-20240602104743651](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602104743651.png)

多态形参：方法中的形参是父类，实参是子类

## 2.4 代码块

分为两类，**静态代码块**和**普通代码块**：静态代码块随着类的加载而执行，并且只会执行一次。如果是普通代码块，每创建一个对象，就执行

顺序：静态代码块>普通代码块>构造方法

![image-20240602105631798](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602105631798.png)

构造器中隐藏着普通代码块：![image-20240602105502868](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602105502868.png)

## 2.5 final

### 2.5.1 使用场景

1. 类不想被继承（包装类都是final）
2. 不希望父类某个方法被重写
3. 不希望类的的某个属性的值被修改
4. 不希望某个局部变量被修改

### 2.5.2 使用细节

1.使用final修饰的变量必须赋值

2.如果final修饰的是static的，赋值的位置只能是**定义时**或者**静态代码块**

3..如果类不是final类，但是含有final方法，则该方法虽然不能重写，但是可以被继承

4.**final不能修饰构造器**

5.final 和 static 往往搭配使用，效率更高，**不会导致类加载**

### 2.6 抽象类

- 当父类的某些方法，需要声明，但是又不确定如何实现时，可以将其声明为抽象方法（没有方法体），那么这个类就是抽象类。
- 当一个类中存在抽象方法时，需要将该类声明为abstract类。
- 抽象类是不能实例化的。
- 抽象类不一定要包含abstract方法
- 如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，除非它自己也声明为abstract类。
- 抽象方法不能使用private、final 和 static来修饰，因为这些关键字都是和重写相违背的.
- 抽象类与动态绑定结合
- ![image-20240602110822363](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602110822363.png)

## 2.6 接口

Jdk8后接口可以有静态方法，默认方法，也就是说**接口中可以有方法的具体实现**，需要加default关键字；甚至可以有静态方法的具体实现（不加default）

一些细节：

- 接口中所有的方法都是public
- 抽象类可以不去实现接口的方法
- **接口中的属性，只能是final的，而且是`public static final`的**
- 接口不能**继承**其它的类,但是可以继承多个别的接口
- 接口多态：其实和类的多态一样

一种特殊情况：

```java
interface A {
    int sharedVar = 10; // 接口中的属性
}

class B {
    int sharedVar = 20; // 类中的属性，隐藏了接口A中的属性
}
//同时实现接口A，已经继承类B，但是A和B中都有一个同名的属性
class C extends B implements A {
    void accessVars() {
        System.out.println(sharedVar); // 默认访问B.sharedVar，因为它隐藏了A.sharedVar
        System.out.println(A.sharedVar); // 显式访问接口A中的属性
    }
}
```

对于上述情况：Java的继承和接口实现规则如下：

1. **类继承**：如果类C继承自类B，那么类C会继承类B中的所有属性和方法。
2. **接口实现**：接口中的属性默认是`public static final`的，也就是说它们是常量，并且可以通过接口名直接访问。
3. **隐藏**：如果类B中的属性与接口A中的属性同名，类B中的属性会隐藏接口A中的属性。这意味着在类C中直接访问该属性时，实际上访问的是类B中的属性。
4. **显式访问接口属性**：如果你想要访问接口A中的属性，你需要通过接口名显式访问，例如：`A.属性名`。
5. **重写**：在类C中，你可以重写接口A中的方法，也可以重写类B中的方法。如果接口A和类B中有同名的方法，类C中的重写方法将优先使用类B的实现，除非你显式地通过`super`关键字调用接口A的方法。

## 2.7 内部类

**内部类可以直接访问私有成员**

分类情况如下：

​		定义在外部类**局部位置**上 (比如方法内)：1. 局部内部类（有类名）2. 匿名内部类

​		定义在外部类的**成员位置**上：1.成员内部类（没有static修饰）2.静态内部类（有static修饰）

### 2.7.1 局部内部类



```java
public class OuterClass
{
    public void outerMethod()
    {
        final int outerVar = 10; // 局部变量，可以被局部内部类访问
        // 定义一个局部内部类
        class LocalInnerClass
        {
            void display()
            {
                System.out.println("Outer method's variable: " + outerVar);
            }
        }
        // 创建局部内部类的实例并调用其方法
        LocalInnerClass innerObject = new LocalInnerClass();
        innerObject.display();
    }
    public static void main(String[] args)
    {
        OuterClass outer = new OuterClass();
        outer.outerMethod();
    }
}
```
1. 可以直接访问外部类的所有成员，包含私有的（直接访问）
2. 对于局部内部类本身，不能添加任何访问修饰符，但是可以添加final（一旦添加final，这个局部内部类就不能被继承了）
3. 外部类如果想要调用内部类的成员，需要在方法中创建内部类的对象实例，然后调用。但是外部其他类 不能访问 局部内部类。
4. 如果 外部类 和 局部内部类 的成员重名时，默认遵循就近原则，如果想访问外部类的成员，使用  **外部类名.this.成员**  去访问

### 2.7.2 **匿名内部类**

1. 基于**接口**的匿名内部类

   1. 

   ```java
    // 定义一个接口
   interface GreetingService {
       void greet();
   }
   
   public class Main {
       public static void main(String[] args) {
           // 创建一个匿名内部类实现GreetingService接口
           GreetingService greeter = new GreetingService() {
               @Override
               public void greet() {
                   System.out.println("Hello, World!");
               }
           };
       // 使用匿名内部类实现的接口对象
       greeter.greet(); // 输出: Hello, World!
   	}
   }
   ```

   匿名内部类使用一次，就不能再使用了。jdk底层在创建匿名内部类 时会给这个类起一个随机的名字，然后立即马上就创建了该类的实例并且把地址返回。

2. 基于 **抽象类** 的匿名内部类

   ![img](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/44e51c55-dca1-4c39-bab8-eecfe4dbed0c-10003240.jpg)

   简洁的写法如下：

   ![image-20240602221201864](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602221201864.png)

3. 使用场景

   当作**实参**直接传递：Lambda表达式就是匿名内部类的简写

   ![image-20240602221410342](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602221410342.png)

   ![image-20240602221432426](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602221432426.png)

### 2.7.3 成员内部类

```java
public class OuterClass
{
    private String outerField = "外部类的私有字段";
    // 成员内部类
    class InnerClass
    {
        public void printOuterField()
        {
            // 直接访问外部类的私有字段
            System.out.println(outerField);
        }
    }
    public void createInnerObject()
    {
        // 在外部类的方法中创建内部类的实例
        InnerClass inner = new InnerClass();
        inner.printOuterField();
    }
    public static void main(String[] args)
    {
        OuterClass outer = new OuterClass();
        outer.createInnerObject(); // 输出: 外部类的私有字段
    }
}
```
成员内部类不能在外部其他类中直接创建实例，因为它们与外部类实例是紧密相关的。要创建成员内部类的实例，你需要先有外部类的实例。这是因为成员内部类的对象与外部类的对象存在一种关联，成员内部类可以访问外部类的成员，包括私有成员。

```Java
public class OuterClass
{
    private String outerField = "外部类的私有字段";
    // 成员内部类
    class InnerClass
    {
        public void display()
        {
            System.out.println(outerField);
        }
    }
    public InnerClass getInner()
    {
        return new InnerClass(); // 在外部类中创建成员内部类的实例
    }
}
public class Test
{
    public static void main(String[] args)
    {
        // 正确：通过外部类的实例来创建成员内部类的实例
        OuterClass outer = new OuterClass();
        OuterClass.InnerClass inner = outer.getInner();
        inner.display(); // 输出: 外部类的私有字段
        // 错误：不能在外部类之外直接创建成员内部类的实例
        // OuterClass.InnerClass innerDirect = new OuterClass.InnerClass(); 
        // 这行代码会导致编译错误
    }
}
```

可以添加任意访问修饰符(public、protected 、默认、private)，因为**它的地位就是一个成员**。

重名问题也是一样的：就近原则+如果想用外部类成员：**外部类名.this.变量名**

### 2.7.4 静态内部类

静态内部类是定义在外部类的成员位置，并且有static修饰，可以**直接访问外部类的所有静态成员**，包含私有的.

![image-20240602224337885](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602224337885.png)

外部其他类，调用静态内部类：

![image-20240602224425064](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240602224425064.png)

## 2.8 枚举

### 2.8.1 枚举的本质

1.将构造器私有化，目的是防止被直接new出来

2.去掉set相关的方法，防止属性被修改

3.在season的内部，直接创建固定的对象

### 2.8.2 enum

```Java
public enum Season
{
    SPRING("春天", 3, 4, 5),
    SUMMER("夏天", 6, 7, 8),
    AUTUMN("秋天", 9, 10, 11),
    WINTER("冬天", 12, 1, 2);
    private String description;
    private int month1;
    private int month2;
    private int month3;
    // 构造函数
    Season(String description, int month1, int month2, int month3)
    {
        this.description = description;
        this.month1 = month1;
        this.month2 = month2;
        this.month3 = month3;
    }
    // 获取描述
    public String getDescription()
    {
        return description;
    }
}
```

当我们使用enum时，这个枚举类默认是继承Enum类，并变成了一个final类，这样我们就可以使用Enum类相关的方法。

传统的 public static final Season SPRING = new Season("春天", 3, 4, 5)，简化成 SPRING("春天", 3, 4, 5)。

如果使用无参构造器 创建 枚举对象，则实参列表和小括号都可以省略。

Enum类常用方法：

1. **values()**: 此方法返回一个数组，包含枚举类中定义的所有枚举常量。
2. **valueOf()**: 根据枚举常量的字符串名称，返回对应的枚举常量对象。
3. **name()**: 返回调用此方法的枚举常量的名称。
4. **ordinal()**: 返回调用此方法的枚举常量在枚举类中的声明顺序，序号从0开始。
5. **toString()**: 返回枚举常量的字符串表示，通常就是枚举常量的名称。
6. **equals()**: 检查传入的对象是否与调用此方法的枚举常量相同。
7. **hashCode()**: 返回枚举常量的哈希码，通常是基于枚举常量的名称。
8. **compareTo()**: 比较调用此方法的枚举常量与另一个枚举常量在枚举类中的顺序。
9. **getDeclaringClass()**: 返回声明了调用此方法的枚举常量的枚举类的 `Class` 对象。

## 2.9 泛型

![image-20240603095403981](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095403981.png)

- T只能是引用类型
- 在指定泛型具体类型后，可以传入该类型或者其子类类型

### 2.9.1 自定义泛型

![image-20240603095331256](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095331256.png)

泛型不具备继承性：

![image-20240603095746848](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095746848.png)

通配符：

![image-20240603095807129](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095807129.png)

# 三、注解

用于修饰解释 包、类、方法、属性、构造器、局部变量等数据信息。

注解可以被编译或运行，相当于嵌入在代码中的补充信息。

JDK内置的基本注解类型：

1. **@Override**: 重写方法
2. **@Deprecated**: 表示该程序元素已经过时
3. **@SuppressWarnings**: 用于类、方法或字段上，用于告诉编译器忽略特定的编译警告。可以填入不同的值，选择忽略不同的警告。

## 3.1 注解类

![image-20240603083434013](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603083434013.png)

`@interface`  表示这是一个注解类

## 3.2 元注解

![image-20240603083640469](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603083640469.png)

# 四、异常

## 4.1 异常体系

![image-20240603085522282](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603085522282.png)

![image-20240603085601046](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603085601046.png)

## 4.2 异常的处理

可以有多个catch语句，捕获不同的异常，要求：父类异常在后边，子类异常在前

几道题：

1. ![image-20240603085858331](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603085858331.png)

这道题 catch会捕获到空指针异常，但是finally是必须执行的，所以不会执行return 3，而是去执行return 4

2. ![image-20240603085948517](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603085948517.png)

   这道题，不会去执行 catch中的return语句，但是会执行catch中的++i语句，i+1+1+1 = 4

   3. 

​		![img](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/a977893e-5c36-47db-9f2a-210781400409-10003240.jpg)

这道题中，finally里没有了return语句，但是finally语句还是要必须执行。执行顺序：执行catch里的++i，然后执行finally里的++i，然后输出，但最终return的是临时变量temp=3。最终，i变成了4，return的是3

## 4.3 throws vs throw

```Java
public void test() {
    if (someCondition) {
        throw new IllegalArgumentException("参数不合法");
    }
}
```

```java
public void test() throws IOException
{
    // 可能会抛出IOException的操作
}
```

子类重写父类的方法时，对抛出异常的规定:子类重写的方法，所抛出的异常类型要么和父类抛出的异常一致，要么为父类抛出的异常的类型的子类型

![image-20240603092021155](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603092021155.png)

**异常分为运行异常和编译异常。对于编译异常，抛出后必须得有处理（main方法不会帮你throw），而对于运行异常，Java并不要求程序员显式的处理，因为有默认处理机制（main方法会自带throw）**

## 4.4 自定义异常

![image-20240603092133160](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603092133160.png)

# 五、工具类

## 5.1 包装类

1. ![image-20240603093157749](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603093157749.png)

**三元运算符是一个整体，这里精度最高是double，会把int转成double，三元运算符会提升到最高精度**

## 5.2 Integer

**查看Integer的valueOf方法的源码**

![image-20240603093358600](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603093358600.png)

-128 到127，在这个范围内，并没有new新的Integer，类似枚举enum。

也就是说，在-128到127这个范围中的数的对象是在数组中已经创建好了的，需要时是直接返回数组的对应的元素的对象的值，所以m，n的值是地址，但这个地址是一样的，但是如果你去new的话，是两个不相干的空间，地址肯定不一样

![image-20240603093451561](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603093451561.png)

![image-20240603093518185](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603093518185.png) 

这个就返回false

一个特殊的情况：只要有基本数据类型，就是判断 值是否相等。这里应该是对i11自动拆箱了

![image-20240603093615172](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603093615172.png)

## 5.3 **Object类**

子类可以重写的几个常用方法：

1. equal方法：用于引用类型，子类可以重写
2. finalize方法：析构函数，可以用于手动垃圾回收
3. getClass方法：返回此 Object 的运行时该对象的类
4. hashCode：返回对象的哈希码值
5. toString：默认返回:**全类名+@+哈希值的十六进制**

## 5.4 日期类

### 5.4.1 Date

![image-20240603094635679](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094635679.png)

![image-20240603094646033](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094646033.png)

![image-20240603094703989](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094703989.png)

### 	5.4.2 LocalDate

![image-20240603094828459](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094828459.png)

![image-20240603094851008](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094851008.png)

1. 使用**now**方法返回localdatetime

![image-20240603094919227](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094919227.png)

![image-20240603094931328](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603094931328.png)

2. 日期格式化：DateTimeFormatter

![image-20240603095005505](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095005505.png)

3. 时间戳：可以与Date转换

   **Instant** 类

   ![image-20240603095113406](https://cdn.jsdelivr.net/gh/wangruichuan/images@main/2024/image-20240603095113406.png)

# 六、字符串

## 6.1 String

