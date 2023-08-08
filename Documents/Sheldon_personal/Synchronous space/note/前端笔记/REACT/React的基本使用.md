#React
# React 的基本使用
### 方式一：创建项目
创建react项目，在你要创建项目的文件夹里启动cmd，输入以下代码：
```cmd
npx create-react-app my-app
```
我们通过以上代码创建了一个叫`my-app`项目

启动react项目
```cmd
cd my-app
npm start
```
通过以上代码我们就可以启动React项目

### 方式二：引入React
1. 安装React，我们安装了两个文件，一个是`react`和`react-dom`。
```cmd
npm i react react-dom
```
这时，我们目录下就会有两个文件`package-lock.json`和`package.json`，还有一个文件夹`node_modules`,这个文件夹里有我们需要的文件

2. 引入react和react-dom两个js文件，值得注意的是，这个两个文件的引入顺序不能相反
```html
 <script src='./node_modules/react/umd/react.development.js'></script>

 <script src='./node_modules/react-dom/umd/react-dom.development.js'></script>
```
## 函数组件与 class 组件

定义组件最简单的方式就是编写 JavaScript 函数(无状态组件)：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class来定义组件（有状态组件）：

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上述两个组件在 React 里是等效的。

###  displayName
一般情况下，我们的组件名就是我们的设置的类名和函数名，但有些时候我们不想让组件名和类名和函数名一样，这时，我们就可以使用`displayName`

```js
组件.displayName="设置的组件名"
```
这是写在组件外的。
```js
组件.displayName		//调用组件名

组件.name				//调用组件类名或函数名
```


## 事件处理
### 事件绑定
- React事件绑定语法与DOM事件语法相似
- 语法：<font color='red'>on+事件名称={}</font>，例如：onClick={()=>{}}
- 注意：React事件采用**驼峰命名法**，例如：onMouseEnter、onFocus
- 在函数组件中绑定事件
```js
import React from 'react';

class Hello extends React.Component {

 render() {
 	return (
 		<div onClick={ this.onClick1}>Hello...</div>
 	)
 }

 onClick1() {
 	console.log('我被点击了')
 	}
}

export default Hello ;
```

### 事件对象
- 可以通过事件处理程序的参数获取到事件对象
- React中的事件对象叫做：合成事件（对象）
```js
import React from 'react';

class Hello extends React.Component {

 render() {
 	return (
 		<div onClick={ this.onClick1}>Hello...</div>
 	)
 }

 onClick1(e) {
 	console.log(e)		//这个类是一个对象，里面有很多的方法
 	}
}

export default Hello ;
```
## this存储
- 有很多数据需要被存储起来，并且要在多个方法中用到的数据，应该被放在this里

**语法**
```js
this.变量名=需要被存储的数据，函数等
```
**实例**
```js
class Hello extends React.Component{
//timerId存储到this中
    componentDidMount(){
        this.timerId = setInterval(()=>{},2000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }   
    render(){...}
}
```
## state和setState
### state的基本使用
- state是组件内部的私有数据，只能在组件内部使用
- state的值是对象，表示一个组件中可以有多个数据
- 减轻state：只存储跟组件渲染相关的数据（比如：count/列表数据/loading等）
- 不用做渲染的数据不要放在state中，比如定时器id等这种数据请储存在`this`中[[React的基本使用#this存储|this存储]]
```js
class Hello extends React.Component {

	 constructor() {

		 super();		//super()必须要有,这是ES6的规范

		 this.state = {			

		 	count: 0

		 }
	 }
 }
```
上面的写法太麻烦了，可以简写成：
```js
class Hello extends React.Component {
	 state={
	 	count: 0
	 }
 }
```
当我们定义了state，我们可以通过`this.state`来使用。

### setState()修改数据
- 状态是可变的
- 注意不要直接修改state中的值，要通过这个函数来修改
- 作用：修改state的值，更新UI

**语法**
```js
this.setState({要修改的数据})

//使用实例
 onClick1=(e)=>{
	 console.log(e);
	 this.setState({count:this.state.count+1})
 }
```

```ad-warning
要在函数中使用state和setState,需要使用箭头函数
```

## 表单处理
我们在使用的过程中，让state的值和表单中的数据进行绑定。
1. 在`state`中添加一个状态，作为表单元素的`value`值（控制表单元素值的来源）
2. 给表单元素绑定`change`事件，将表单元素的值设为`state`的值，（控制表单元素的变换）

**使用方式**
```js
 <input value={this.state.account} onChange={e => { this.setState({ account: e.target.value }) }} />
```
注意：复选框是通过`checked`来控制是否勾选的,其他的表单都是一样的。

当我们有多个表单时。
```js
 render() {

	 return (
		 <div className='input'>
		 
		 <input type='text' value={this.state.text} onChange={e => { this.setState({ text: e.target.value }) }} />
		 
		 <input type='checkbox' checked={this.state.ischeckbox} onChange={e => { this.setState({ ischeckbox: e.target.checked }) }} />
		 
		 <textarea value={this.state.isTextarea} onChange={e => { this.setState({ isTextarea: e.target.value }) }} />
		 
		 <select value={this.state.isSelect} onChange={e => { this.setState({ isSelect: e.target.value }) }}>
		 <option>上海</option>
		 <option>北京</option>
		 <option>广州</option>
		 </select>

		 </div>
	 )
 }
```
当我们有多个表单时，往往我们就要写多个函数（这里写的箭头函数），那有没有办法让我们只用写一个函数，来处理所有表单呢。

#### 多表单元素优化步骤：
1. 给表单元素添加`name`属性，名称与`state`相同。
2. 根据表单元素类型获取对应值
3. 在`change`事件处理程序中通过`[name]`来修改对应的`state`。

```js
 isInput = e => {

	 const target = e.target;

	 const value = target === 'checkbox' ? target.checked : target.value;	//要进行判断，不同的表单获取的值的方式不一样

	 const name = target.name;

	 this.setState({

	 	[name]:value			//直接写name会直接被识别成name，但我们需要我们获取到的name字符串，把name写在数组里，就会被识别成name。

	 })

 }

 render() {

	 return (

		 <div className='input'>

			 <input name='text' type='text' value={this.state.text} onChange={this.isInput} />

			 <input name='ischeckbox' type='checkbox' checked={this.state.ischeckbox} onChange={this.isInput} />

			 <textarea name='isTextarea' value={this.state.isTextarea}onChange={this.isInput} />

			 <select name='isSelect' value={this.state.isSelect} onChange={this.isInput}>
			 <option>上海</option>
			 <option>北京</option>
			 <option>广州</option>
			 </select>

		 </div>

	 )

 }
 ```
 # 组件之间的通信方式
### props
组件是封闭的，要接收外部数据应该通过props来实现

**特点**
>可以给组件传递任意类型的数据，如[[JSX]]，函数等
>props是==**只读**==的对象，只能读取属性的值，无法修改对象
>使用类组件时，如果写了构造函数(`constructor()`)，应该将props传递给super(),否则，无法再构造函数中获取到props！
>`constructor(props){super(props)}`,这样写后，才能在构造函数中获取到props

作用：接收传递给组件的数据
[[props深入]]

#### 使用方式

1. 传递数据：给组件标签添加属性
```html
<Hello name='jack' age={19} />
```
我们发现我们传输age时，用的是一个`{}`的东西包裹19，这样表示我们传递的是整型19。

要传递非字符串数据时，我们就要用`{}`来包裹，表示传递非字符串数据。

2. 接收数据：函数组件通过参数`props`接收数据，类组件通过`this.props`接收数据

函数：
```js
function Hello(props){
	console.log(props)
	return(
		<div>接收到数据：{props.name}</div>
	)
}
```

类：
```js
class Hello extends React.Component{
	render(){
		return(
		<div>接收到数据：{this.props.name}</div>
		)
	}
}
```

### 子组件传递数据给父组件
上文中，我们学习的props通常是父组件给子组件传递数据的，但是我们要怎么让子组件传递数据给父组件呢？

**思路**：利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数

1. 父组件提供一个回调函数（用于接收数据）
2. 将该函数作为属性值，传递给子组件
3. 子组件通过props调用回调函数
4. 将子组件的数据作为参数传递给回调函数
```js
import React from 'react';  
//子组件  
class Childrens extends React.Component {  
    state = {  
        Msg: 'Msg',  
    }  
    handleClick = () => {  
        this.props.getMsg(this.state.Msg)  
    }  
    render() {  
        return (  
            <button onClick={this.handleClick}>点我</button> 
        )  
    }  
}  
      
//父组件  
export default class Parent extends React.Component {  
    state = {  
        parentMsg:''  
    }  
    getchildMsg =data=>{  
        this.setState({  
            parentMsg:data  
        })  
    }  
  
    render() {  
        return (  
            <div>  
                <p>子组件传递过来的数据是：{this.state.parentMsg}</p>  
                <Childrens getMsg={this.getchildMsg} />  
            </div>  
        )  
    }  
}
```

### 兄弟组件之间的通讯方式
**思路**
- 将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态，被称为==**<font color='red'>状态提升</font>**==
- 公共父组件职责：提供共享状态、提供操作共享状态的方法
1. 通过子传父的方式，将子组件的数据传个父组件。
2. 父组件通过父传子的方式，再传给兄弟组件。



### Context
思考：App组件要传递数据给Child组件，该如何处理

通过这张图我们知道，现在的处理方式只有使用`props`一层一层往下传，但是这样做太繁琐了，有没有更简单的方式呢，这时我们就需要使用`Context`
**作用**：跨越组件传递数据

##### 使用方式
1. 调用`React.createContext()`创建`Provider`（提供数据）和`Consumer`（使用数据）两个组件。不了解该方法可以看：[[React方法#React createContext|React.createContext()详细]]

```js
const {Provider, Consumer} = React.createContext();
```
注意：这条语句是写在全局中的，不是写在任何类和函数中的。

2. 使用`Provider`组件将提供数据的内容包含住
3. 设置`value`属性，表示要传递的数据。
```js
render(){
	return(
		<Provider value='pink'>
			<div className="App">
				<Child1 />
			</div>
		</Provider>
	)
}
```

4. 在需要接收数据的组件中添加`Consumer`组件接收数据

```js
render(){
	return(
		<div>
			<Consumer>
				{data=><span>data参数表示接收到的数据--{data}</span>}
			</Consumer>
		</div>
	)
}
```

**总结：**
1. 如果两个组件是远方亲戚（比如，嵌套多层）可以使用Context实现组件通信


## render-props和高阶组件
### React组件复用概述
- 思考：如果两个组件中的部分功能相似或相同，该如何处理？
- 处理方式：复用相似的功能（函数封装）
- 两种复用的方式：
	- render props模式
	- 高阶组件（HOC）
	
注意：这两种模式不是React自带的方法，而是程序员利用React自身特点而延时的编码技巧

###  render props模式
**思路分析**

- 将要复用的 state 状态和操作 state 的方法封装到一个组件中

- 使用 复用组件 时为其传递一个函数，通过这个函数来获取 复用组件 中的 state （将 state 暴露到 复用组件的外部）

- 这个函数的返回值为需要渲染的 UI 内容（渲染的 DOM 结构由传入的函数决定）

我们想象一个场景：
图片中有一个鼠标的坐标显示，还有一个红色方块跟着鼠标一动，这时，我们知道这两个样式都需要获取到鼠标的坐标。这时，我们就可以封装一个`Mouse`类。这个类可以提供鼠标的坐标。
封装如下：
```js
class Mouse extends React.Component {
    state = {
        x: 0,
        y: 0
    }
    componentDidMount() {
        window.addEventListener('mousemove',this.handleMouseMove,false)
    }
    handleMouseMove=e =>{
        this.setState({
            x: e.clientX,
            y: e.clientY,
        });
    }
    render() {
        return (
            this.props.render(this.state)
        )
    }
}
```
那我们要怎么调用这个类呢，我们先实现第一个样式，展示鼠标的坐标。
```js
<Mouse render={mouse=>{ return <p>鼠标当前位置{mouse.x},{mouse.y}</p>}} />
```

第二个样式，我们让红色方块跟随鼠标移动，这时我们就可以复用这个类。
```js
<Mouse render={mouse => { return <div style={{ position: 'absolute', height:'20px',width:'20px',backgroundColor:'red',top:mouse.y,left:mouse.x }} /> }} />
```

看了上面的实例是不是恍然大悟，但是我们不能局限这种使用方式，虽然这种思路名字叫`render props`,但是我不不一定必须要用render作为函数传递，我们还可以用`this.props.children`，不知道用法可以看着[[props深入#props children|props.children]]

调用子组件的方式改成这样
```js
<Mouse>{mouse => {return <p>鼠标的坐标是：{mouse.x},{mouse.y}</p> }}</Mouse>
```

把父组件的`render`改成：
```js
 render() {
	 return (
		 <div>
			 {this.props.children(this.state)}
		 </div>
	 )
 }
```

这两种方法实现的思路都是一样的，只是用的方法不同，两种没有太大的区别，但推荐使用第二种，看着更直观

我们可以让这个模式更加可靠一点，方便我们日后调用出现什么问题。
1. 推荐：给`render props`模式添加`props`校验,更多校验规则可以看：[[props深入#使用 PropTypes 进行类型检查|props的校验]]
```js
Mouse.propTypes={
	chidlren:PropTypes.func.isRequired
}
```
2. 推荐：当组件卸载时，移除事件绑定
```js
componentWillUnmount(){
	window.removeEventListener('mousemove',this.handleMouseMove)
}
```
为什么我们要解除事件绑定呢，因为绑定事件和定时器是一样的，当我们卸载组件后，只要我们没有清理他，就会继续执行。


### 高阶组件

**思路分析**
- 高阶组件是一个函数，接收要包装的组件，返回增强后的组件
- 高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，通过`prop`将复用的状态传递给被包装组件`WrappedComponent`

**使用步骤**
1. 创建一个函数，名称约定以==**<font color='red'>with开头</font>**==
2. 指定函数参数，参数应该以大写字母开头（作为要渲染的组件）
3. 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
4. 在该组件中，渲染参数组件，同时将状态通过`props`传递个给参数组件
5. 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中。

```js
// 高阶组件
const withHOC = Component => {
    class Mouse extends React.Component {
        state = {
            x: 0,
            y: 0
        }
        componentDidMount() {
            window.addEventListener('mousemove',this.displayMouse)
        }
        displayMouse = e => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
        componentWillUnmount() {
            window.removeEventListener('mousemove',this.displayMouse)
        }
        render() {
            return <Component {...this.state} />	//通过prop传值给Display2
        }
    }
    Mouse.displayName = `With${Component.name}`	//修改组件名，不然多个组件进行复用时，组件名都叫Mouse,不方便区分
    return Mouse;
}

//需要被传参的组件
class Display2 extends React.Component {
    render() {
        return (
            <p>鼠标的坐标是：{this.props.x},{this.props.y}</p>
        )
    }
}

export default withHOC(Display2);
```

其实高阶函数就是通过父传子的方式，给子组件提供数据，从而达到了组件复用的目的。
