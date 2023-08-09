# LayoutInflater
相信接触Android久一点的朋友对于LayoutInflater一定不会陌生，都会知道它主要是用于加载布局的。而刚接触Android的朋友可能对LayoutInflater不怎么熟悉，因为加载布局的任务通常都是在Activity中调用setContentView()方法来完成的。其实`setContentView()`方法的内部也是使用LayoutInflater来加载布局的，只不过这部分源码是internal的，不太容易查看到。

### 获取对象
```java
LayoutInflater layoutInflater = LayoutInflater.from(context);
```

得到了LayoutInflater的实例之后就可以调用它的inflate()方法来加载布局了
```java
 layoutInflater.inflate(resourceId, root);
```
**参数**
- **resourceId：**第一个参数就是要加载的布局id
- **root：**第二个参数是指给该布局的外部再嵌套一层父布局，如果不需要就直接传null。

还有三个参数的
```java
View view =layoutInflater.inflate(@LayoutRes int resource, @Nullable ViewGroup root, boolean attachToRoot)
```
**参数**
前两个参数和上面都是一样的

- attachToRoot：表示将第一个参数所指定的布局添加到第二个参数的View中。
>当我们设置为false时，或者不填写第三个参数时，我们需要手动添加一行代码`视图对象.addView(view)`

## [两个参数和三个参数的区别](https://blog.csdn.net/u012702547/article/details/52628453)