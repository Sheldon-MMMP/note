# Flask()
```js
from flask import Flask  
  
app = Flask(__name__)  
  
  
@app.route('/')  
def hello_world():  
    return 'Hello World!'  
  
  
if __name__ == '__main__':  	//不推荐用这种方式启动
    app.run()
```
**参数**
- __name__：是系统变量，该变量指的是本py文件的文件名
- 装饰器：app.route()
	- 表示一个路由配置
	- 一个函数可以不止一个路由配置

##### 路由配置
方式一：使用装饰器
```js
@app.route(url_name, methods)
```
###### 路由的匹配规则
- 匹配整个文字
```js
@app.route('/hello')
```
- 传递参数
```js
@app.route('/user/<username>')
```
- 指定参数类型
```js
@app.route('/post/<int:post_id>')
```
**传递参数注意事项**：

- 如果设置了传参，在定义函数的时候也要有传参，
如`def r(post_id):`

- 但是我们有些时候我们给了指定参数，但是我们又不想传了，这时，我就可以给参数一个默认值
如：`def r(post_id=None):`

###### URL配置及路由
- 查看URL规则列表
```js
app.url_map
```
- URL逆向解析
	- 正向解析:  
	 程序自动解析,根据@app.route()中的访问路径,来匹配处理函数
	- 反向解析:  
	通过视图处理函数的名称自动生成对应的访问路径
```js
url_for(url_name,**kwargs)
```
**参数**

- url_name：函数名称
- \*\*kwargs：是函数需要的参数，如果没有，可以不写

返回值：函数对应的路由路径。如：'/'
### 启动服务器	
步骤一：设置环境变量
```js
Windows: set FLASK_APP = 文件名
Linux: export FLASK_APP = 文件名
```

步骤二：`flask run` 启动内置web服务器

步骤三：修改指定IP及端口：
```js
flask run --host = 0.0.0.0 --port = 8001
或
flask run -h 0.0.0.0 -p 8001
```
只有进行了步骤三修改ip，在局域网下，其他设备才能进行访问。访问IP:`本机IP:端口号`
##### 开启调试模式
作用：代码修改后服务器自动重启。
```js
Windows: set FLASK_ENV=development

Linux: Export FLASK_ENV=development
```
```ad-warning
生产模式下，不要开启调试模式
```

## Flask的扩展

## Flask的上下文

其实翻译成上下文会对我们的理解有很大的困扰，因为总是感觉上下文是和当前所处的函数有关。真正的还是和flask访问机制有关
注意：使用前是需要引用的
```js
from flask import Flask,current_app,g,request,session
```
#### 应用上下文对象
##### current_app
说明：当前应用的实例


##### g
说明：处理请求时的临时存储对象，每次请求都会重设这个变量

#### 请求上下文对象
##### request
说明：请求对象，封装了客户端发出的HTTP请求中的内容

##### session
说明：用户会话，各个请求之间的数据共享
![[Pasted image 20211116103127.png]]

我们知道浏览器中有cookie，浏览器发送数据的时候，会将cookie发送给服务器，后端就收到发送过来的cookie，我们要将收到的值进行在Session中进行对比，就是可以找对应的数据