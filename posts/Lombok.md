# 一、@Getter Setter

可以用在字段和类型上，但是**静态**字段不会生成，**final**字段无法生成set方法。

可以使用**@Accessors**来控制生成Getter和Setter的样式：

链式调用：

![img](https://cdn.nlark.com/yuque/0/2023/png/36049076/1702294399687-4639dc35-2bc9-4397-acb1-1bb40cc24a3a.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/36049076/1702294469624-270e5394-286c-4365-b551-1a8fcf9f3d7b.png)

# 二、@ToString

- exclude：xx排除在外

# 	三、@EqualsAndHashCode

快速生成比较和哈希值方法。

- 重要属性 callSuper=true （不加这个属性的话，默认只会比较子类的属性）
- exclude：不比较某个属性

# 四、构造器

## 1. @AllArgsConstructor

全参构造器

构造器私有化，通过static方法返回：

![img](https://cdn.nlark.com/yuque/0/2023/png/36049076/1702296143241-00468558-2394-4f5c-be87-659c9a3c19c5.png)

把构造器私有化，然后创建一个名为create的静态方法，通过这个方法来返回对象

## 2.@NoArgsConstructor

无参构造

force属性：给final类型的值强制给一个默认值

# 五、@Data

**@Data**=@Setter**、**@Getter**、**@RequiredArgsConstructor**、**@ToString**、**@EqualsAndHashCode。

- 一旦使用@Data就不建议此类有继承关系，因为equal方法可能不符合预期结果（尤其是仅比较子类属性）。
- 使用@Data时，默认存在无参构造器（没手写有参构造器）（当然java默认就是无参构造的）
- 使用@Data时，手写了有参构造器，则无参构造器消失，如果仍需要无参构造器，需要`@NoArgsConstructor`

# 六、@Value

与@Data类似，但是并**不会生成setter**并且成员属性都是**final**的。

# 七、其他

- @SneakyThrows：生成try-catch的

- @Builder：快速生成建造者模式。

  ![img](https://cdn.nlark.com/yuque/0/2023/png/36049076/1702298300096-b8b05b10-81b5-4e76-929e-1de188840755.png)

  ![img](https://cdn.nlark.com/yuque/0/2023/png/36049076/1702297820079-86c33788-69b8-4043-8cf0-9ff773035072.png)