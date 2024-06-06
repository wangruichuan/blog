# 引言

一个由Spring IoC容器实例化、组装和管理的对象，称其为**Bean**。

参考文档：

🍃spring中文网：https://springdoc.cn/docs/

📚 IT白马：https://www.itbaima.cn/document/h7sjo5oy0l03607e

🏅尚硅谷：https://www.wolai.com/v5Kuct5ZtPeVBk4NBUGBWF

# 一、IOC容器

Spring为我们提供了一个IoC容器，用于去存放需要使用的对象，我们可以将对象交给IoC容器进行管理，当我们需要使用对象时，就可以向IoC容器去索要，并由它来决定给我们哪一个对象。而我们如果需要使用Spring为我们提供的IoC容器，那么就需要创建一个应用程序上下文，它代表的就是IoC容器，它会负责实例化、配置和组装Bean。

## 1.单例模式

每次从IoC容器获取到的对象，始终都是同一个，默认情况下，通过IoC容器进行管理的Bean都是单例模式的，这个对象只会被创建一次。如果我们希望每次拿到的对象都是一个新的，我们也可以将其作用域进行修改。

这里一共有两种作用域，第一种是singleton，默认情况下就是这一种，当然还有prototype，多例模式，每次得到的对象都是一个新的。

当Bean的作用域为单例模式时，那么它会在一开始（容器加载配置时）就被创建，我们之后拿到的都是这个对象。而处于多例模式下，只有在获取时才会被创建，也就是说，单例模式下，Bean会被IoC容器存储，只要容器没有被销毁，那么此对象将一直存在，而原型模式才是相当于在要用的时候直接new了一个对象，并不会被保存。

当然，如果我们希望单例模式下的Bean不用再一开始就加载，而是一样等到需要时再加载（加载后依然会被容器存储，之后一直使用这个对象了，不会再创建新的）我们也可以开启懒加载。

开启懒加载后，只有在真正第一次使用时才会创建对象。

因为单例模式下Bean是由IoC容器加载，但是加载顺序我们并不清楚，如果我们需要维护Bean的加载顺序（比如某个Bean必须要在另一个Bean之前创建）那么我们可以使用`depends-on`来设定前置加载Bean，这样被依赖的Bean一定会在之前加载。

```xml
<bean name="teacher" class="com.test.bean.Teacher"/>
<bean name="student" class="com.test.bean.Student" depends-on="teacher"/>
```

这样被依赖的Bean一定会在之前加载，比如Teacher应该在Student之前加载。

## 2.依赖注入

依赖注入是一种设计模式，也是Spring框架的核心概念之一。

IoC容器默认只会调用无参构造，使用set方法来实现依赖注入。当需要在构造器中完成类的初始化时，可以通过设置，将依赖注入的时机提前到了对象构造时。但是一定要保证我们指定的参数匹配到目标构造方法。

## 3.自动装配

autowire属性有两个值，一个是byName，还有一个是byType，顾名思义，一个是根据类型去寻找合适的Bean自动装配，还有一个是根据名字去找

对于使用构造方法完成的依赖注入，也支持自动装配。

## 4.生命周期与继承

除了修改构造方法，我们也可以为Bean指定初始化方法和销毁方法，以便在对象创建和被销毁时执行一些其他的任务。

那么什么时候是初始化，什么时候又是销毁呢？

当容器创建时，默认情况下Bean都是单例的，那么都会在一开始就加载好，对象构造完成后，会执行init-method
我们可以调用close方法关闭容器，此时容器内存放的Bean也会被一起销毁，会执行destroy-method

如果Bean不是单例模式，而是采用的原型模式，那么就只会在获取时才创建，并调用init-method，而对应的销毁方法不会被调用（因此，对于原型模式下的Bean，Spring无法顾及其完整生命周期，而在单例模式下，Spring能够从Bean对象的创建一直管理到对象的销毁）

Bean之间也是具备继承关系的，只不过这里的继承并不是类的继承，而是属性的继承，不过Bean的继承使用频率不是很高，了解就行。

## 5.工厂模式和工厂Bean

默认情况下，容器会调用Bean对应类型的构造方法进行对象创建，但是在某些时候，我们可能不希望外界使用类的构造方法完成对象创建，比如在工厂方法设计模式中，我们更希望 Spring不要直接利用反射机制通过构造方法创建Bean对象， 而是利用反射机制先找到对应的工厂类，然后利用工厂类去生成需要的Bean对象：

```Java
public class Student {
    Student() {
        System.out.println("我被构造了");
    }
}
```

```Java
public class StudentFactory {
    public static Student getStudent(){
      	System.out.println("欢迎光临电子厂");
        return new Student();
    }
}
```

此时Student有一个工厂，我们正常情况下需要使用工厂才可以得到Student对象，现在我们希望Spring也这样做，不要直接去反射搞构造方法创建，我们可以通过factory-method进行指定。

这里有一个误区，千万不要认为是我们注册了StudentFactory这个Bean，class填写为这个类这个只是为了告诉Spring我们的工厂方法在哪个位置，**真正注册的是工厂方法提供的东西**。

当我们采用工厂模式后，我们就无法再通过配置文件对Bean进行依赖注入等操作了，而是只能在工厂方法中完成，这似乎与Spring的设计理念背道而驰？

当然，可能某些工厂类需要构造出对象之后才能使用，我们也可以将某个工厂类直接注册为工厂Bean：

![img](https://s2.loli.net/2022/11/23/ih1Af7xBdX3ebaG.png)

此时可以看到，工厂方法上同样有了图标，这种方式，由于工厂类被注册为Bean，此时我们就可以在配置文件中为工厂Bean配置依赖注入等内容了。

这里还有一个很细节的操作，如果我们想获取工厂Bean为我们提供的Bean，可以直接输入工厂Bean的名称，这样不会得到工厂Bean的实例，而是工厂Bean生产的Bean的实例：

```Java
Student bean = (Student) context.getBean("studentFactory");
//当然，如果我们需要获取工厂类的实例，可以在名称前面添加`&`符号：
StudentFactory bean = (StudentFactory) context.getBean("&studentFactory");
```

使用注解时，Spring也提供了接口，我们可以直接实现接口表示这个Bean是一个工厂Bean：

```Java
@Component
public class StudentFactory implements FactoryBean<Student> {
    @Override
    public Student getObject() {   //生产的Bean对象
        return new Student();
    }

    @Override
    public Class<?> getObjectType() {   //生产的Bean类型
        return Student.class;
    }

    @Override
    public boolean isSingleton() {   //生产的Bean是否采用单例模式
        return false;
    }
}
```



## 6.基于注解开发（⭐）

### @Configuration

```java
@Configuration
public class MainConfiguration {
}
```

```java
//使用AnnotationConfigApplicationContext作为上下文实现，它是注解配置的。
ApplicationContext context = new AnnotationConfigApplicationContext(MainConfiguration.class);
//这个构造方法可以接收多个配置类（更准确的说是多个组件）
```

- 初始化、摧毁方法、自动装配可以直接在@Bean注解中进行配置：

```java
@Configuration
public class MainConfiguration {
		//注册为Bean
        @Bean(name = "student", initMethod = "", destroyMethod = "", autowireCandidate = false)
        @Lazy(true)     //对应lazy-init属性
        @Scope("prototype")    //对应scope属性
        @DependsOn("teacher")    //对应depends-on属性
        public Student student(){
            return new Student();
        }
}
```

- 像这种需要引入其他Bean进行的注入，我们可以直接将其作为形式参数放到方法中：

```java
@Configuration
public class MainConfiguration {
    @Bean
    public Teacher teacher(){
        return new Teacher();
    }

    @Bean
    public Student student(Teacher teacher){
        return new Student(teacher);
    }
}
```

### @Autowired 

直接到Bean对应的类中使用**自动装配**

```java
public class Student {
    @Autowired   //使用此注解来进行自动装配，由IoC容器自动为其赋值
    private Teacher teacher;
}
```

当然，`@Autowired`并不是只能用于字段，对于构造方法或是Setter，它同样可以：

```java
public class Student {
    private Teacher teacher;

    @Autowired
    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}
```

`@Autowired`默认采用byType的方式进行自动装配，使用类型进行装配，那么要是出现了多个相同类型的Bean，需要指定（前提是给Bean起了名字）

```Java
public class Student {
    @Autowired
    @Qualifier("a")   //匹配名称为a的Teacher类型的Bean
    private Teacher teacher;
}
```

`@Resource`默认ByName如果找不到则ByType，可以添加到set方法、字段上。
`@Autowired`默认是byType，只会根据类型寻找，可以添加在构造方法、set方法、字段、方法参数上。

除了这个注解之外，还有`@PostConstruct`和`@PreDestroy`，它们效果和init-method和destroy-method是一样的：

```java
@PostConstruct
public void init(){
    System.out.println("我是初始化方法");
}

@PreDestroy
public void destroy(){
    System.out.println("我是销毁方法");
}
```

### @Component

前面我们介绍了使用@Bean来注册Bean，但是实际上我们发现，如果只是简单将一个类作为Bean的话，这样写还是不太方便，因为都是固定模式，就是单纯的new一个对象出来，能不能像之前一样，让容器自己反射获取构造方法去生成这个对象呢？

肯定是可以的，我们可以在需要注册为Bean的类上添加`@Component`注解来将一个类进行注册，不过要实现这样的方式，**我们需要添加一个自动扫描来告诉Spring**，它需要在哪些包中查找我们提供的@Component声明的Bean。

```java
@Configuration
@ComponentScan("com.test.bean")   //包扫描，这样Spring就会去扫描对应包下所有的类
public class MainConfiguration {

}
```

Spring在扫描对应包下所有的类时，会自动将那些添加了@Component的类注册为Bean

总结：

**只不过这种方式只适用于我们自己编写类的情况，如果是第三方包提供的类，只能使用前者完成注册，并且这种方式并不是那么的灵活。**

并且，对于这种使用@Component注册的Bean，如果其构造方法不是默认无参构造，那么默认会对其每一个参数都进行自动注入：

### Bean的name

无论是通过@Bean还是@Component形式注册的Bean，Spring都会为其添加一个默认的name属性，它的默认名称生产规则依然是类名并按照首字母小写的驼峰命名法来的。

如果是通过@Bean注册的，默认名称是对应的方法名称

## 7.问题思考

```Java
@Component
public class Student {
    @Resource
    private Teacher teacher;
}
```

```Java
@Component
public class Teacher {
    @Resource
    private Student student;
}
```

这两个类互相需要注入对方的实例对象，这个时候Spring会怎么进行处理呢？如果Bean变成原型模式，Spring又会怎么处理呢？

# 二、AOP面向切面

**AOP 用于解决** **非核心业务** **代码冗余问题**

原理是通过动态代理机制实现的，在JavaWeb阶段我们学过动态代理。不过Spring底层并不是使用的JDK提供的动态代理，而是使用的第三方库实现，它能够以父类的形式代理，而不仅仅是接口。

动态代理技术分类  ：

● JDK动态代理：JDK原生的实现方式，需要被代理的目标类必须实现接口！他会根据目标类的接口动态生成一个代理对象！代理对象和目标对象有相同的接口！（拜把子）

● cglib：通过继承被代理的目标类实现代理，所以不需要目标类实现接口！（认干爹）（已经继承到SPring）

## 1. 术语

1. 横切关注点

> AOP把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处基本相似，比如权限认证、日志、事务、异常等。AOP的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来。

2. 通知（增强）
	● 前置通知：在被代理的目标方法前执行
	● 返回通知：在被代理的目标方法成功结束后执行
	● 异常通知：在被代理的目标方法异常结束后执行
	● 后置通知：在被代理的目标方法最终结束后执行
	● 环绕通知：使用try...catch...finally结构围绕整个被代理的目标方法，包括上面四种通知对应的所有位置
3. 连接点
在 Spring 中，可以被动态代理拦截目标类的方法
4. 切入点
可以理解成被选中的连接点！  
5. 切面
 切入点和通知的结合。是一个类。  

6. 目标
 被代理的目标对象。  
7. 代理
 向目标对象应用通知之后创建的代理对象。  
8. 织入
 指把通知应用到目标上，生成代理对象的过程。可以在编译期织入，也可以在运行期织入，Spring采用后者。

## 2.基于注解形式实现

在主类添加@EnableAspectJAutoProxy注解，开启AOP注解支持：

```java
@EnableAspectJAutoProxy
@ComponentScan("org.example.entity")
@Configuration
public class MainConfiguration {
}
```

接着我们需要在定义AOP增强操作的类上添加@Aspect注解和@Component将其注册为Bean即可，就像我们之前在配置文件中也要将其注册为Bean那样：

```Java
@Aspect
@Component
public class StudentAOP {

}
```

接着，我们可以在里面编写增强方法，并将此方法添加到一个切点中，比如我们希望在Student的study方法执行之前执行我们的before方法，我们可以为其添加`JoinPoint`参数来获取切入点信息

```java
@Before("execution(* org.example.entity.Student.study())")
public void before(JoinPoint point){
    System.out.println("参数列表："+ Arrays.toString(point.getArgs()));
    System.out.println("我是之前执行的内容！");
}
```

使用命名绑定模式，可以快速得到原方法的参数：

```java
@Before(value = "execution(* org.example.entity.Student.study(..)) && args(str)", argNames = "str")
//命名绑定模式就是根据下面的方法参数列表进行匹配
//这里args指明参数，注意需要跟原方法保持一致，然后在argNames中指明
public void before(String str){
    System.out.println(str);   //可以快速得到传入的参数
    System.out.println("我是之前执行的内容！");
}
```

除了@Before，还有很多可以直接使用的注解，比如@AfterReturning、@AfterThrowing等，比如@AfterReturning：

同样的，环绕也可以直接通过注解声明：

```Java
@Around("execution(* com.test.bean.Student.test(..))")
public Object around(ProceedingJoinPoint point) throws Throwable {
    System.out.println("方法执行之前！");
    Object val = point.proceed();
    System.out.println("方法执行之后！");
    return val;
}
```

