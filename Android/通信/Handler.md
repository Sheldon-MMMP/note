 # Handler
 >在api 30（Android 11)中AsyncTask被正式废弃：

Handler 是SDK中处理异步消息的核心类。主要接受子线程发送的数据， 并用此数据配合主线程更新UI

>在官方的描述中提到了Handler两个主要作用：
>-   延时处理消息或者Runnable
>-   跨进程通信

Handler不仅可以完成主线程与子线程之间的通信，也可以做到子线程与子线程之间的通信

