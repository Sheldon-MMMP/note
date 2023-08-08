# HttpURLConnection类
**作用：进行网络交互，获取数据，发送数据等。**
## GET
在获取HttpURLConnection类前需要先获取URL对象。
```java
URL urlStr = new URL("https://www.imooc.com/api/teacher?type=2&page=1"); //获取访问连接（但还没有发送请求）
HttpURLConnection connection = (HttpURLConnection) urlStr.openConnection();// 创建访问对象
```
当们获取到了HttpURLConnection对象时我们就可以调用里面的方法了：
```java
//请求的方法
conection.setRequestMethod("GET");//以get为例
//设置主机连接超时(单位：毫秒)
// 发送请求端 连接到 url目标地址端的时间   受距离长短和网络速度的影响
conection.setConnectTimeout(15000);
//设置从主机读取数据超时（单位：毫秒)
// 连接成功后 获取数据的时间   受数据量和服务器处理数据的影响
conection.setReadTimeout(60000);
//设置请求参数  可以指定接收json参数  服务端的key为content-type
conection.setRequestProperty("Accept","application/json");
//发送请求
conection.connect();
connection.getResponseCode(); // 获取状态码
connection.getResponseMessage(); //获取响应状态描述
connection.getInputStream(); //获取数据
```

## POST
post请求和get请求的传参方式是不一样的。
```java
URL urlStr = new URL("https://www.imooc.com/api/teacher"); //获取访问连接（但还没有发送请求）
HttpURLConnection connection = (HttpURLConnection) urlStr.openConnection();// 创建访问对象
//设置是否向connection输出，因为这个是post请求，参数要放在http正文内，因此需要设为true
conection.setDoOutput(true);
conection.setDoInput(true);
conection.setRequestMethod("POST");
// Post 请求不能使用缓存
conection.setUseCaches(false);
conection.connect();
// post传参
String data = "type=2&page=1";  
OutputStream outputStream = connection.getOutputStream();  
outputStream.write(data.getBytes());  
outputStream.flush();  
outputStream.close();

```
## 问题
### 1.0问题
>当我们在主线程上访问网络时，就会发生报错。

**解决方法：**
开设一个新的子线程
```java
private Thread newThread;         //声明子线程   
new Thread()   
{   
public void run()   
{   
  //要做的工作   
}   
}.start();
```

### 1.1问题
>添加视图必须在主线程上添加视图，我们怎么在主线程上运行子线程上的代码呢。

在子线程上添加下面的代码
```java
runOnUiThread(()->{  
	// 要做的工作
});
```