# Intent
intent是Android程序中各组件之间进行交互的一种重要方式
>它不仅可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据。Intent一般可用于启动Activity、启动Service以及发送广播等场景，由于Service、广播等概念你暂时还未涉及，那么本章我们的目光无疑就锁定在了启动Activity上面。

Intent大致可以分为两种：显式Intent和隐式Intent。
#### 显示Intent
语法：
Intent有多个构造函数的重载，其中一个是
```java
Intent(Context packageContext, Class<?> cls)。
```
**参数**：
- 第一个参数Context要求提供一个启动Activity的上下文；
- 第二个参数Class用于指定想要启动的目标Activity，通过这个构造函数就可以构建出Intent的“意图”。

**实例**

我们构键一个FistActivity的活动，给他添加一个按钮，我们在构建SecondActivity的活动，我们让FistActivity点击Button1跳转到SecondActivity活动中。
```java
button1.setOnClickListener(new View.OnClickListener(){  
    @Override  
 public void onClick(View v){  
        Intent intent =new Intent(FirstActivity.this, SecondActivity.class);  
 startActivity(intent);  
 }  
  
});
```
Activity类中提供了一个`startActivity()`方法，这个方法是专门用于启动活动的，它接收一个Intent参数，这里我们将构建好的Intent传入`startActivity()`方法就可以启动目标活动了。

使用这种方式来启动活动，Intent的“意图”非常明显，因此我们称之为显式Intent。


#### 隐式Intent
下面以Action为例：  
`AndroidManifest.xml`文件中，首先被调用的Activity要有一个带有`<intent-filter>`并且包含`<action>`的Activity，设定它能处理的Intent，并且`category`设为`"android.intent.category.DEFAULT"`。action的name是一个字符串，可以自定义，例如这里设成为`"mark"`：

```xml
<activity  
    android:name="com.example.app.SecondActivity">  
    <intent-filter>  
        <action android:name="mark"/>  
        <category android:name="android.intent.category.DEFAULT"/>  
    </intent-filter>  
</activity>  
```

然后，在MainActivity，才可以通过这个action name找到上面的Activity。下面两种方式分别通过setAction和构造方法方法设置Action，两种方式效果相同。  
1）**setAction** 方法

```cpp
Intent intent = new Intent();  
intent.setAction("mark");  
startActivity(intent);  
```

2）构造方法直接设置 **Action**

```cpp
Intent intent = new Intent("mark");  
startActivity(intent);  
```

为了防止应用程序之间互相影响，一般命名方式是**包名+Action名**，例如这里命名`"mark"`就很不合理了，就应该改成`"com.example.app.Test"`。

每个Intent中只能指定一个action，但却能指定多个category。目前我们的Intent中只有一个默认的category，那么现在再来增加一个吧。

修改FirstActivity中按钮的点击事件，代码如下所示：
```java
button1.setOnClickListener(new View.OnClickListener(){  
    @Override  
 public void onClick(View v){  
        Intent intent =new Intent("com.example.activitytest.ACTION_START");  
 intent.addCategory("com.example.activitytest.MY_CATEGORY");  
 startActivity(intent);  
 }  
});
```

现在我们在`<intent-filter>`中再添加一个category的声明
```xml
<activity  
 android:name=".SecondActivity"  
 android:exported="false"  
 android:label="This is SecondActivity!">  
	 <intent-filter>
		<action android:name="com.example.activitytest.ACTION_START"/>  
		<category android:name="android.intent.category.DEFAULT"/>  
		<category android:name="com.example.activitytest.MY_CATEGORY"/>  
	 </intent-filter>
</activity>
```

### 调用其他程序的Activity
用隐式Intent，我们不仅可以启动自己程序内的活动，还可以启动其他程序的活动，这使得Android多个应用程序之间的功能共享成为了可能。比如说你的应用程序中需要展示一个网页，这时你没有必要自己去实现一个浏览器（事实上也不太可能），而是只需要调用系统的浏览器来打开这个网页就行了。

修改FirstActivity中按钮点击事件的代码，如下所示：
```java
button1.setOnClickListener(new View.OnClickListener(){  
    @Override  
 public void onClick(View v){  
        Intent intent =new Intent(Intent.ACTION_VIEW);  
 intent.setData(Uri.parse("https://www.baidu.com"));  
 startActivity(intent);  
 }  
  
});
```
这里我们首先指定了Intent的action是Intent.ACTION_VIEW，这是一个Android系统内置的动作，其常量值为android.intent.action.VIEW。然后通过Uri.parse()方法，将一个网址字符串解析成一个Uri对象，再调用Intent的setData()方法将这个Uri对象传递进去。
与此对应，我们还可以在`<intent-filter>`标签中再配置一个`<data>`标签，用于更精确地指定当前活动能够响应什么类型的数据。`<data>`标签中主要可以配置以下内容。
- android:scheme。用于指定数据的协议部分，如上例中的http部分。
-  android:host。用于指定数据的主机名部分，如上例中的www.baidu.com部分。
- android:port。用于指定数据的端口部分，一般紧随在主机名之后
- android:path。用于指定主机名和端口之后的部分，如一段网址中跟在域名之后的内容。
-  android:mimeType。用于指定可以处理的数据类型，允许使用通配符的方式进行指定。

只有`<data>`标签中指定的内容和Intent中携带的Data完全一致时，当前活动才能够响应该Intent。不过一般在`<data>`标签中都不会指定过多的内容

## 向下一个活动传递数据
在启动活动时传递数据的思路很简单，Intent中提供了一系列putExtra()方法的重载，可以把我们想要传递的数据暂存在Intent中，启动了另一个活动后，只需要把这些数据再从Intent中取出就可以了。
```java
button1.setOnClickListener(new View.OnClickListener(){
   @Override  
 public void onClick(View v){  
     String data = "Hello SecondActivity";  
	 Intent intent=new Intent(FirstActivity.this,SecondActivity.class);  
	 intent.putExtra("extra data",data);  
	 startActivity(intent);  
 }  
});
```
>这里putExtra()方法接收两个参数，第一个参数是键，用于后面从Intent中取值，第二个参数才是真正要传递的数据。

然后我们在SecondActivity中将传递的数据取出，并打印出来
```java
public class SecondActivity extends AppCompatActivity {  
  
    @Override  
 protected void onCreate(Bundle savedInstanceState) {  
     super.onCreate(savedInstanceState);  
	 setContentView(R.layout.second_second);  
	 Intent intent = getIntent();  
	 String data = intent.getStringExtra("extra data");  
	 Log.d("SecondActivity",data);  
 }  
}
```
首先可以通过getIntent()方法获取到用于启动SecondActivity的Intent，然后调用getStringExtra()方法，传入相应的键值，就可以得到传递的数据了
```ad-info
首先可以通过getIntent()方法获取到用于启动SecondActivity的Intent，然后调用getStringExtra()方法，传入相应的键值，就可以得到传递的数据了
```