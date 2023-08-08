## Express简介


 ###  1. 什么是Express
 
Express的作用和Node.js内置的http模块类似，是专门用来创建Web服务器的。

Express是第三方包，官网：www.expressjs.com.cn/

```
npm install express --save
```

## 基本的使用

### 创建基本的Web服务器
```js
// 导入express

const express = require("express");

// 创建web服务器

const app = express();

app.listen(80, () => {
 console.log("express server running at http://127.0.0.1");
});
```

### 监听请求
```js
//通过app.get()方法，可以监听客户端的GET请求，具体的语法格式如下：
app.get('URL',function(req,res){/*处理函数*/})

//通过app.post()方法，可以监听客户端的POST请求，具体的语法格式如下：
app.post('URL',function(req,res){/*处理函数*/})

//通过res.send()方法，可以把处理好的内容，发送给客户端：
app.post('URL',function(req,res){
	//向客户端发送文本内容
	res.send('请求成功！')
	//req.query对象，可以访问到客户端发送的字符串
	console.log(req.query)
})

// 注意：这里的：id是一个动态参数
app.get('/user/:id',function(req,res){
	// req.parmas是动态匹配到的URL参数，默认也是一个空对象
	// 动态参数就是/:id
	console.log(req.params)
})
```
**参数**

- 参数1：客户端请求的URL地址
- 参数2：请求对应的处理函数
	- req：请求对象（包含了与请求相关的属性与方法）
	- res：响应对象（包含了与响应相关的属性与方法）


## Express.static()
作用：非常方便地创建一个静态资源服务器。
例如，通过如下代码就可以将public目录下的图片、CSS文件、JavaScript文件对外开放访问了：

```js
app.use(express.static('共享的文件夹路径'))
```
现在，你就可以访问public目录中的所有文件了：
- http://localhost:3000/images/bg.jpg
- http://localhost:3000/css/style.css
- http://localhost:3000/js/login.js

如果要托管多个静态资源目录，请多次调用express.static()函数

```js
app.use(express.static('共享的文件夹路径'))
app.use(express.static('共享的文件夹路径2'))
```
访问静态资源文件时，express.static()函数会根据目录的添加顺序查找所需的文件。
```ad-warning
Express在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在URL中。
```

## 挂载路径前缀

当我们托管多个静态资源访问路径时，我们可以挂载路径前缀：
```js
app.use('/共享的文件夹名',express.static('共享的文件夹路径'))
```

现在，你就可以访问public目录中的所有文件了：
- http://localhost:3000/public/images/bg.jpg
- http://localhost:3000/public/css/style.css
- http://localhost:3000/public/js/login.js


# nodemon
## 1.为什么要使用nodemon
在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。
现在，我们可以使用noderdon（https://www.npmjs.com/package/nodemon）这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。
## 安装

```
npm install -g nodemon
```
## 使用
```cmd
node app.js
```
将上面的替换成
```cmd
nodemon app.js
````


## Express路由

### 1. Express中的路由

>在Express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express中的路由分3部分组成，分别是请求的类型、请求的URL地址、处理函数，格式如下:

```JS
app.请求的类型(请求的URL地址,处理函数)
```

### 2. 模块化路由

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

步骤如下：

1. 创建路由模块对应的js文件
2. 调用express.Router()函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用module.exports向外共享路由对象
5. 使用app.use()函数注册路由模块

```js
const express = require("express");
const router = express.Router();

router.get("/files/index", (req, res) => {
 res.send("fadsf");
});


router.post("/files", (req, res) => {
 res.send("jk");
});

module.exports = router;
```

导入路由
```js
const apiRouter = require('./apiRouter.js');
app.use('/api', apiRouter);
```

## Express中间件

### 概念
当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。


![[Pasted image 20220211185441.png]]

作用：多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。
![[Pasted image 20220211203340.png]]


### Express中间件的格式

Express的中间件，本质上就是一个function处理函数，Express中间件的格式如下：

```js
app.get('/',function(req,res,next){
 next();
})
```
```ad-warning
注意：中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req和res
```

### 定义中间件函数
可以通过如下的方式，定义一个最简单的中间件函数：
```js
// 常量mw所指向的，就是一个中间件函数
const mw = function(req,res,next){
	console.log('这是一个最简单的中间件函数');
	//注意：在当前中间件的业务处理完毕后，必须调用next()函数
	//表示把流转关系转交给下一个中间件或路由
	next();
}
```

### 全局生效的中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：
```js
const mw = function(req,res,next){
	console.log('这是一个最简单的中间件函数');
	//注意：在当前中间件的业务处理完毕后，必须调用next()函数
	//表示把流转关系转交给下一个中间件或路由
	next();
}

app.use(mw)
```

如何定义多个全局中间件呢：

```js
app.use(function(req,res,next){  // 第一个全局中间件
	console.log('这是一个最简单的中间件函数');
	//注意：在当前中间件的业务处理完毕后，必须调用next()函数
	//表示把流转关系转交给下一个中间件或路由
	next();
})

app.use(function(req,res,next){   // 第二个全局中间件
	console.log('这是一个最简单的中间件函数');
	//注意：在当前中间件的业务处理完毕后，必须调用next()函数
	//表示把流转关系转交给下一个中间件或路由
	next();
})

app.get('/',function(req,res){   //请求这个路由，会依次触发上述两个全局中间件
 res.send();
})

```


### 局部中间件
不使用app.use()定义的中间件，叫做局部生效中间件，示例代码如下：
```js
const mw = function(req,res,next){
	console.log('这是一个最简单的中间件函数');
	next();
}

// mw这个中间件只在’这个路由中生效‘，这个中用法属于'局部生效的中间件'
app.get('/',mw,function(req,res){
 res.send();
})
```

局部定义多个中间件

```js
//以下两种写法时'完全等价'的，可根据自己的喜好，选择任意一种方式进行使用
app.get('/',mw1,mw2,function(req,res){res.sen()})
app.get('/',[mw1,mw2],function(req,res){res.sen()})
```
执行中间件的顺序也是按照上面添加的顺序执行的。

## 中间件的使用注意事项

![[Pasted image 20220211204858.png]]

### 中间件分类

1.  应用级别的中间件

-   通过 `app.use()` 或 `app.get()` 或 `app.post()` ，绑定到 `app` 实例上的中间件

2.  路由级别的中间件

-   绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件。用法和应用级别中间件没有区别。应用级别中间件是绑定到 `app` 实例上，路由级别中间件绑定到 `router` 实例上。

```js
const app = express()
const router = express.Router()

router.use(function (req, res, next) {
  console.log(1)
  next()
})

app.use('/', router)
```


3.  错误级别的中间件

-   用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
-   错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后分别是 `(err, req, res, next)`。
-   错误级别的中间件必须注册在所有路由之后

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})

// 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```


4.  Express 内置中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

-   `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
-   `express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
-   `express.urlencoded` 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
```
5.  第三方中间件


## CORS 跨域资源共享

### cors 中间件解决跨域

-   安装中间件：`npm install cors`
-   导入中间件：`const cors = require('cors')`
-   配置中间件：`app.use(cors())`

> 配置中间件，一定要在路由之前配置
### CORS

-   CORS（Cross-Origin Resource Sharing，跨域资源共享）解决跨域，是通过 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源
-   浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可解除浏览器端的跨域访问限制
-   CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
-   CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

### CORS 常见响应头

-   `Access-Control-Allow-Origin`：制定了允许访问资源的外域 URL

```js
res.setHeader('Access-Control-Allow-Origin', 'http://bruceblog.io')
res.setHeader('Access-Control-Allow-Origin', '*')
```



-   `Access-Control-Allow-Headers`
-   默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：`Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）`
-   如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 A`ccess-Control-Allow-Headers` 对额外的请求头进行声明，否则这次请求会失败！

```js
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
```
-   `Access-Control-Allow-Methods`
-   默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 `Access-Control-Alow-Methods` 来指明实际请求所允许使用的 HTTP 方法

```js
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
res.setHEader('Access-Control-Allow-Methods', '*')
```


### CORS 请求分类

#### 简单请求

-   请求方式：GET、POST、HEAD 三者之一
-   HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-formurlencoded、multipart/form-data、text/plain）

#### 预检请求

-   请求方式为 GET、POST、HEAD 之外的请求 Method 类型
-   请求头中包含自定义头部字段
-   向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据


### JWT 认证机制

前后端分离推荐使用 JWT（JSON Web Token）认证机制，是目前最流行的跨域认证解决方案

#### [#](https://brucecai55520.gitee.io/bruceblog/notes/nodejs/mysql.html#jwt-%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)JWT 工作原理

Session 认证的局限性：

-   Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。
-   当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
-   当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制

JWT 工作原理图：

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

![JWT](https://brucecai55520.gitee.io/bruceblog/assets/img/JWT.6a82c41d.png)

JWT 组成部分：

-   Header、Payload、Signature
-   Payload 是真正的用户信息，加密后的字符串
-   Header 和 Signature 是安全性相关部分，保证 Token 安全性
-   三者使用 `.` 分隔

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiQnJ1Y2UiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiaGVsbG8iLCJlbWFpbCI6InNjdXRAcXEuY29tIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDE4NjU3MzEsImV4cCI6MTY0MTkwMTczMX0.bmqzAkNSZgD8IZxRGGyVlVwGl7EGMtWitvjGD-a5U5c
```
JWT 使用方式：

-   客户端会把 JWT 存储在 localStorage 或 sessionStorage 中
-   此后客户端与服务端通信需要携带 JWT 进行身份认证，将 JWT 存在 HTTP 请求头 Authorization 字段中
-   加上 Bearer 前缀

```
Authorization: Bearer <token>
```
#### Express 使用 JWT

1.  安装

-   jsonwebtoken 用于生成 JWT 字符串
-   express-jwt 用于将 JWT 字符串解析还原成 JSON 对象

```
npm install jsonwebtoken express-jwt
```

2.  定义 secret 密钥

-   为保证 JWT 字符串的安全性，防止其在网络传输过程中被破解，需定义用于加密和解密的 secret 密钥
-   生成 JWT 字符串时，使用密钥加密信息，得到加密好的 JWT 字符串
-   把 JWT 字符串解析还原成 JSON 对象时，使用密钥解密

```js
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 密钥为任意字符串
const secretKey = 'Bruce'
```

3.  生成 JWT 字符串

```js
app.post('/api/login', (req, res) => {
  ...
  res.send({
    status: 200,
    message: '登录成功',
    // jwt.sign() 生成 JWT 字符串
    // 参数：用户信息对象、加密密钥、配置对象-token有效期
    // 尽量不保存敏感信息，因此只有用户名，没有密码
    token: jwt.sign({username: userInfo.username}, secretKey, {expiresIn: '10h'})
  })
})
```
4.  JWT 字符串还原为 JSON 对象

-   客户端访问有权限的接口时，需通过请求头的 `Authorization` 字段，将 Token 字符串发送到服务器进行身份认证
-   服务器可以通过 express-jwt 中间件将客户端发送过来的 Token 解析还原成 JSON 对象

```js
// unless({ path: [/^\/api\//] }) 指定哪些接口无需访问权限
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```
5.  获取用户信息

-   当 express-jwt 中间件配置成功后，即可在那些有权限的接口中，使用 `req.user` 对象，来访问从 JWT 字符串中解析出来的用户信息

```js
app.get('/admin/getinfo', (req, res) => {
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取信息成功',
    data: req.user,
  })
})
```
6.  捕获解析 JWT 失败后产生的错误

-   当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行
-   通过 Express 的错误中间件，捕获这个错误并进行相关的处理

```js
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 401, message: 'Invalid token' })
  }
  res.send({ status: 500, message: 'Unknown error' })
})
```