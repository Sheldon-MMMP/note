# SharedPreferences

SharedPreferences是Android平台上一个轻量级的存储类，当程序中有一些少量数据需要持久化存储时，可以使用SharedPreferences类进行存储。
- 用于存放一些类似登录的配置信息

## 使用方法
使用SharedPreferences类存储数据时，首先需要调用getSharedPreferences(String name,int mode)方法获取实例对象。

由于该对象本身只能获取数据，不能对数据进行存储和修改，所以需要调用SharedPreferences类的edit()方法获取到可编辑的Editor对象
```java
SharedPreferences sp = getSharedPreferences("data",MODE_PRIVATE);

SharedPreferences.Editor editor = sp.edit();  
```
**参数**
- 参数一：参数data表示文件名(自己定义，也就是一个文件名)
- 参数二：MODE_PRIVATE表示文件操作模式(默认的模式为0或MODE_PRIVATE)
	- mode指定为`MODE_PRIVATE`，则该配置文件只能被自己的应用程序访问。  
	- mode指定为`MODE_WORLD_READABLE`，则该配置文件除了自己访问外还可以被其它应该程序读取。  
	- mode指定为`MODE_WORLD_WRITEABLE`，则该配置文件除了自己访问外还可以被其它应该程序读取和写入


### 存储数据
，最后通过该对象的putXxx()方法存储数据，示例代码如下面这样：
```java
editor.putString("name", "传智播客"); // 存入String类型数据  
editor.putInt("age",8);  
// 提交修改  
editor.commit();
```

由上述代码可知，Editor对象是以key/value的形式保存数据的，并且根据数据类型的不同，会调用不同的方法。需要注意的是，操作完数据后，一定要调用commit()方法进行数据提交，否则所有操作不生效。
```ad-warning
SharedPreferences中的Editor编辑器是通过key/value（键值对）的形式将数据保存在data/data/<packagename>/shared_prefs文件夹下XML文件中，其中value值只能是float、int、long、boolean、String、Set<String>类型数据。
```

### 删除数据
如果需要删除SharedPreferences中的数据，则只需要调用Editor对象的remove(String key)方法或者clear()方法即可，示例代码如下面这样：
```java
editor.remove("name");     // 删除一条数据
editor.clear(); // 删除所有数据
```

### 读取数据
通过该对象的getXXX()方法获取到相应key的值即可，示例代码如下面这样：

```java
String data = sp.getString("name","");
String dataAll = sp.getAll(); //返回一个对象
```
需要注意的是，getXXX()方法的第二个参数为默认值，如果sp中不存在该key，将返回默认值，例如getString("name", "")，若name不存在则key就返回空字符串。


```ad-warning
保存SharedPreferences的key值时，可以用静态变量保存，以免存储、删除时写错了。如：private static final String key = “itcast”。
```