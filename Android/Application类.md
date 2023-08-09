# Application类


## 介绍
- **每个APP都有一个Application实例**：如果我们没有继承Application子类自定义它的话，APP会创建一个默认的实例。
- **Application实例拥有着与APP一样长的生命周期**：在APP开启的时候首先就会实例化它，然后才是入口的Activity或者Service等。
- **Application与APP“同生共死”**，在一个APP的生命周期只实例化一次，所以它“天生”就是一个单例，不需要使用单例模式去实现它。
- 而上面的官方Note里面说到，通常是没有必要实现Application的子类的，要用单例的话可以自己使用静态单例类实现，要用它的Context的话用`Context.getApplicationContext()`就行了。然而，Application类的作用可不单单是实现一个全局的单例，还有其他的很多功能，下面一一介绍。
## 应用场景
 **1. 初始化应用程序级别的资源，如全局对象、环境配置变量等 数据共享、数据缓存，如设置全局共享变量、方法等** 

 **2. 获取应用程序当前的内存使用情况，及时释放资源，从而避免被系统杀死** 
 
 **3. 监听应用程序配置信息的改变，如屏幕旋转等** 
 
 **4. 监听应用程序内 所有Activity的生命周期**

## Application类的使用

　　要使用自定义的Application，首先就是要自己新建一个Application的子类，然后把它的名字写在manifest文件里面的application标签里android:name属性就行，如我的Application子类名字是BaseApplication，则：

```xml
<application
	...
     android:name=".BaseApplication"
     />
```
**BaseApplication文件：**

```java
package com.example.application;  
  
import android.app.Application;  
  
public class BaseApplication extends Application {  
    @Override  
	 public void onCreate() {  
	     super.onCreate();  
	 }  
}
```

**使用自定义的 Application 类实例**
```java
private BaseApplication app = (BaseApplication) getApplication();
```


## Application类的方法介绍
![[Pasted image 20220315163702.png]]


[方法使用详细](https://cloud.tencent.com/developer/article/1035690?from=article.detail.1727006)