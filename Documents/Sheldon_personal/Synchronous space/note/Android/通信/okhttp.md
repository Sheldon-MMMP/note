# okhttp
[官网地址](https://square.github.io/okhttp/)
## 简介
HTTP 是现代应用程序网络的方式。这就是我们交换数据和媒体的方式。有效地执行 HTTP 可以使您的内容加载更快并节省带宽。

OkHttp 是一个默认高效的 HTTP 客户端：

-   HTTP/2 支持允许对同一主机的所有请求共享一个套接字。
-   连接池减少了请求延迟（如果 HTTP/2 不可用）。
-   透明 GZIP 缩小了下载大小。
-   响应缓存完全避免了网络重复请求。
## 使用方式
### get（默认请求）
```java
String url = "https://f06f24ba-0d32-41ed-8f08-34df241cd8d1.mock.pstmn.io/mmmp";  
OkHttpClient okHttpClient = new OkHttpClient();  
Request request = new Request.Builder().url(url).get().build();  
Call call = okHttpClient.newCall(request);

/*
* 请求方式二选一：
* 
*/
//异步请求数据  
call.enqueue(new Callback() {  
    private static final String TAG = "请求";  
  
 @Override  
 public void onFailure(Call call, IOException e) {  
        Log.d(TAG, "onFailure: ");  
 }  
  
    @Override  
 public void onResponse(Call call, Response response) throws IOException {  
        Log.d(TAG, "onResponse: " + response.body().string());  
 }  
});


//注意这种方式会阻塞调用线程，所以在Android中应放在子线程中执行，否则有可能引起ANR异常，
// 同步请求数据  
new Thread(new Runnable() {  
    @Override  
 public void run() {  
        try{  
           Response request1 = call.execute();  
		 Log.d(TAG,"Response:"+request1.body().string());  
	 }catch(IOException e){  
	      e.printStackTrace();  
		 Log.d(TAG, "onFailure: "); 
		}  
	    }  
}).start();

```


### POST
这种方式与前面的区别就是在构造Request对象时，需要多构造一个RequestBody对象，用它来携带我们要提交的数据。
```java
// 数据类型
MediaType mediaType = MediaType.parse("text/x-markdown; charset=utf-8");
// 需要传输的数据
// 当需要传输其他数据时，就定义其他数据，不一定是字符串，文件这些也可以。
String data = "type=2&page=1";
```
上面就是post请求需要的参数。

请求方式和get差不多，需要修改的地方在定义请求的方式不同。
```java
Request request = new Request.Builder()
        .url("https://api.github.com/markdown/raw")
        .post(RequestBody.create(mediaType, requestBody))
        .build();

```