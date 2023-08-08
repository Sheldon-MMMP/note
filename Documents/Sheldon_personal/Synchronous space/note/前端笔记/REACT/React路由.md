# React路由

## 路由介绍

现代的前端应用大多都是 SPA（单页应用程序），也就是只有一个HTML 页面的应用程序。因为它的用户体验更好、对服务器的压力更小，所以更受欢迎。为了有效的使用单个页面来管理原来多页面的功能，前端路由应运而生。

- 前端路由的功能：让用户从一个视图（页面）导航到另一个视图（页面）
- 前端路由是一套映射规则，在React中，是URL路径 与 组件 的对应关系
- 使用React路由简单来说，就是配置 路径和组件（配对）

## 使用步骤
1. 安装

```cmd
npm install react-router-dom
npm install react-router
```
2. 导入路由的三个核心组件：Router/Route/Link
```js
import  { BrowserRouter, HashRouter, Link, NavLink, createSearchParams, useLinkClickHandler, useSearchParams } from 'react-router-dom'
```
3. 使用Router组件包裹整个应用（重要）
```js
function App() {
    return (
        <Router>
            <div className='box'>
            <h1>React路由基础</h1>
            </div>
        </Router>
    );
}
```

4. 使用Link组件或者NavLink组件作为导航菜单（路由入口）,在页面中`<Link>`标签会被解析成`<a>`标签
```HTML
<Link to='/first'>页面1</Link>
<NavLink to='/first' activeClassName='active'>页面1</NavLink>
```
**属性**
>- to：浏览器地址栏中的前往的地址。（location.pathname可以获取当前的地址）
>- activeClassName：当该组件被点击后，就会给该组件添加一个`class`名，默认添加的是`active`,只有`NavLink`有，`Link`是没有该属性的。当有多个相同的样式时：[[NavLink的封装]]

5. 使用Route组件配置路由规则和要展示的组件（路由出口）
```HTML
//在版本5以前的写法
<Route path='/first' component={Home} />

//版本6的写法
<Route path='/first' element={ <Home /> } />
还可以传参
<Route path='/first' element={ <Home>传参</Home> } />
// 还可以进行判断
<Route path='/first' element={true?()=><Home>传参</Home>:<Login /> } />
```
**属性**
>path：指定路径。
>component：展示的组件

## \<Switch /\> 标签

作用：阻止路由匹配成功后，继续进行匹配

```ad-warning
 在6.0版本后`<Switch>`重命名为`<Routes>`
```

### 使用步骤
1. 导入标签
```js
import {Switch} from 'react-router-dom'
```
2.将多个标签进行包裹

```HTML
<Switch>
	 <Route path='/Display' component={Display} />
	 <Route path='/Parent' component={Parent} />
	 <Route path='/Parent' component={Comments} />
</Swith>
```

我们假设，现在还没有进行包裹。当我们写了两个相同的`path`属性，但是`component`属性不同，当我们点击路由`Link`时，就会从上到下，进行匹配，当他遇到第二个`<Route>`时，匹配成功就会展示，但是匹配成功后，还会继续匹配，当他遇到第三个`<Route>`时，匹配成功就会展示两个组件，但当我们想让他匹配成功了，就不继续匹配就可以给路由标签外加上一个`<Switch>`标签进行包裹。

## 多级路由(嵌套路由)
```ad-warning
有些时候我们需要写多级路由，但我们需要注意，当我们写多级路由的时候，测试时，请多点击刷新（当存在多级路由时，你点击`Link`标签后，是正常的，但是当你点击刷新就会出现问题)

解决方案：
1. 将index.html中自己引入的css样式的路径最前面的`./`变成`/`
2. public/index.html 中引入样式时不写`./`写`%PUBLIC_URL%`（常用）
3. 使用HashRouter

```
当我们访问`http://localhost:3000/about/message`这样的路由就是嵌套路由，在`/about`中
还有一个`/message`的路由。

下面就是第一段路由
```js
import React, { Component } from 'react';  
import {Link,Route,Routes} from 'react-router-dom'  
import Cs from './cs'  
import About from './about'  
  
  
export default class Routers extends Component {  
    render() {  
        return (  
            <div>  
                <Link className="btn btn-primary" href="#" role="button" to="/home" children='Home' />  
                <Link to="/about" children='About'  className="btn btn-primary" href="#" role="button" />  
                <div>  
                    <Routes>  
                        <Route path="/home/*" element={<Cs />} />  //这里*指可以匹配子路由
                        <Route path='/about/*' element={<About />}  />  
                    </Routes>  
                </div>  
            </div>  
        )  
    }  
}


//第二层路由
import React, { Component } from 'react'  
import { Route,Routes,NavLink} from 'react-router-dom'  
import News  from './news'  
import Message  from './Message'  
  
  
export default class About extends Component {  
    render() {  
        return (  
            <div>  
                <NavLink to='news' className="btn btn-primary"  role="button" children='news' />  
                <NavLink to='message' className="btn btn-primary" role="button" children='message' />  
                <div>  
                    <Routes>  
                        <Route path='news' element={<News />}/>  
                        <Route path='message' element={<Message />} />  
                    </Routes >   
                </div>  
            </div>  
        )  
    }  
}

```
## 严格匹配和模糊匹配
[视频讲解严格匹配和模糊匹配](https://www.bilibili.com/video/BV1wy4y1D7JT?p=83&t=280.7)

路由默认模糊匹配，如果要定义精确匹配需要在路由组件中添加 `exact={true}` 属性，简写：`exact`
```html
<Route component={xxx} path='/xxx' exact={true}/>
```
模糊匹配的规则是子地址可以匹配父地址
```html
<Route component={App} path='/'/>
<Route component={Home} path='/home'/>
<Route component={User} path='/home/users'/>
// 访问/home/user时可以额外匹配到/路由和/home 路由
// 访问/home无法匹配到/home/user路由
```
精确匹配的规则是必须完全满足路由地址才可以进行匹配
```html
<Route component={App} path='/'/>
<Route component={Home} path='/home' exact={true}/>
<Route component={User} path='/home/users'/>

// 访问/home/user时可以额外匹配到/路由，由于/home路由设置了精确匹配，因此无法匹配到
```

##  \<Redict\>重定向
1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到`Redirect`指定路由
```html
<Switch>
	....//写在最后
	<Redirect to="...">
</Switch>
```
React Router v6把`<Redict>`替换为了

故重定向写法更新为

```html
<Routes>
	<Route path="/about" element= {<About />} />
	<Route path="/home" element={<Home/>}/>
	<Route path="*" element={<Navigate to="/about" />}/>
</Routes>
```
	

## 传参
	
### 1.get传值
路由配置还是普通的配置，如：`admin`

传参方式如：`admin?id=‘1111`

通过`this.props.location.search`获取url获取到一个`字符串?id=‘1111`

我们可以用url，qs，querystring，浏览器提供的api URLSearchParams对象（do not need to support IE and do not contain array or object）或者自己封装的方法去解析出id的值。

### 2.动态路由传值params参数
路由需要配置成动态路由：如`path='/admin/:id'`

传参方式，如`admin/111`

通过`this.props.match.params.id`取得url中的动态路由id部分的值，除此之外还可以通过useParams（Hooks）来获取

### 3.通过query或state传值
传参方式如：在Link组件的to属性中可以传递对象`{pathname:’/admin’,query:‘111’,state:‘111’};`

通过`this.props.location.state`或`this.props.location.query`来获取即可，传递的参数可以是对象、数组等，但是存在缺点就是一刷新页面，参数就会丢失

### 4.通过props传值
==**<font color='red'>注意：以下方式适用于v6版本</font>**==

传值方式如：通过`<Route path='...' element={<Home id={111} />}>`就可以将值传过去。


## push模式和replace模式
这两个模式是浏览记录模式，
push模式下，进行操作是会留下痕迹的，这样方便我们可以放回上一级。(默认模式)
replace模式下，进行操作只会占用一条痕迹，后面的操作会不断的替换上一个操作，这样就不能返回上一级。

**语法**
```html
//push模式是默认模式，所有不用开启。
<Link replace to='...' />
```


## 编程式路由导航
编程式路由导航是什么呢，我们知道实现路由跳转需要`<Link>`和`<NavLink>`这两个链接，但是这两种链接都需要点击，如果我们想让我们不点来实现路由导航怎么办呢，==**编程式路由导航就是通过程序来跳转。**==

**语法**
```js
// 两种模式
this.props.history.replace('路由地址')
//replace跳转+params参数
this.props.history.replace(`路由地址/${id}/${title}`)
//replace跳转+get参数
this.props.history.replace(`路由地址?id=${id}&title=${title}`)
//replace跳转+state参数
this.props.history.replace(`路由地址`,{id,title})


this.props.history.push('路由地址')
//多种传参模式同上

//this.props.history不止这两种方法

// 后退一步
this.props.history.goBack()

// 前进一步
this.props.history.goForward()

//根据n来决定前进还是后退
//-1就是后退一步，-2就是后退两步
//1就是前进一步
this.props.history.go(n)
```

通过这两种方式，也可以不用`<Link>`和`<NavLink>`这两个元素来进行实现跳转，放在延时器里，可以实现自动跳转。


## withRouter
### 作用：

>默认情况下必须经过路由匹配渲染的组件才存在this.props,才拥有路由参数，执行`this.props.history.push('/detail')`跳转到对应路由的页面，然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用`withRouter`就可以给此组件传入路由参数，将react-router的history、location、match三个对象传入props对象上，此时就可以使用`this.props`。

### 如何使用：

比如app.js这个组件，一般是首页，不是通过路由跳转过来的，而是直接从浏览器中输入地址打开的，如果不使用withRouter此组件的this.props为空，没法执行props中的history、location、match等方法。

使用时可以通过下面两种方式:

1. 在要注入属性的组件上使用'@withRouter'

2. 类似‘withRouter(App)’

```javascript
import React,{Component} from 'react'
import {Switch,Route,NavLink,Redirect,withRouter} from 'react-router-dom' //引入withRouter
import One from './One'
import NotFound from './NotFound'
/*或者直接在组件上使用‘@withRouter’*/
class App extends Component{
    //此时才能获取this.props,包含（history, match, location）三个对象
    console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
    render(){return (<div className='app'>
            <NavLink to='/one/users'>用户列表</NavLink>
            <NavLink to='/one/companies'>公司列表</NavLink>
            <Switch>
                <Route path='/one/:type?' component={One} />
                <Redirect from='/' to='/one' exact />
                <Route component={NotFound} />
            </Switch>
        </div>)
    }
}
export default withRouter(App);  //这里要执行一下WithRouter
```

## 懒加载
当用户第一次访问页面时,第一次加载会将所有的路由组件都请求回来,如果项目中有10个路由组件可能速度没有太大差别,但是如果一旦有成百上千个路由组件会造成页面的暂时空白和卡顿.

用户访问页面的 2/5/8 原则：2秒之内用户觉得很快，5秒之内用户觉得还可以，8秒之外用户觉得系统慢，无法忍受，甚至会离开页面。因此页面的加载速度是十分重要的，懒加载通过对组件进行分割打包成多个chunk来减少一次性加载的资源大小。从而减少用户不必要的等待。

使用方法 : 
```js
import React, { Component,lazy,Suspense } from 'react'  //引入lazy和Suspense
 
// 引入路由组件
import { NavLink,Route,Switch } from 'react-router-dom'
 
// 懒加载引入组件 在用到路由组件时才发送请求
// 通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包 注意这里的
// 其中函数体需要去除{},否则不生效
const Home = lazy(()=>import('./Home/Home'))
const About = lazy(()=>import('./About/About'))
 
export default class Demo2 extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
 
              <NavLink to='/home'>Home</NavLink>
              <hr/>
              <NavLink to='/about'>About</NavLink>
 
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
 
                  {/* 用Suspense包含所有需要注册的路由 fallback为响应未回来时显示的内容 */}
                  <Suspense fallback={<h1>Loading...</h1>}>
                    {/* 注册路由 */}
                    <Switch>
                      <Route path="/about" component={About} />
                      <Route path="/home" component={Home} />
                    </Switch>
                  </Suspense>
 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
```