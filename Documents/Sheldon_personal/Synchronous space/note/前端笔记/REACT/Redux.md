# Redux

### 安装

安装稳定版：

```
npm install --save redux
```


## 三大核心
![[Pasted image 20221021081306.png]]
### action
1. 描述如何改变`state`
2. 包含两个属性：
	- type: 标识属性，值为字符串，唯一，必要属性
	- data：数据属性，值类型任意，可选属性 
3. action有两种类型
	- object：是同步action
	- function：是异步action
### reducer
1. 根据`action`执行改变`state`的动作

### store
1. 将`state、action、reducer`联系在一起的对象


## 使用步骤
#### 1. 创建文件夹

在src文件夹下，创建一个redux文件夹（redux的文件都放这里面）
在redux文件夹中创建四个文件`store.js`和`count_reducer.js`

- store.js

```js
/*  
    该文件专门用于暴露一个store对象，整个应用只有一个store对象  
*/  
  
// 引入createStore,专门用于创建redux  
// 引入applyMiddleware,作为createStore的第二个参数，可以让action进行异步操作
import { createStore,applyMiddleware } from 'redux'  
// 引入为Count组件服务的reducer  
import countReducer from './count_reducer'
// 引入redux-thunk,用于支持异步action
// 使用前需要安装：npm add redux-thunk
import thunk from 'redux-thunk'
  
export default createStore(countReducer);
// 需要使用异步的action时，创建store就需要第二参数
export default createStore(countReducer, applyMiddleware(thunk));
// 平时项目中不会只定义一个Reducer
export default createStore(combineReduucers({count:countReducer,....}), applyMiddleware(thunk));
````

- count_reducer.js

```js
/*  
    1. 该文件时用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数  
    2. reducer函数会接到两个参数，分别为：之前状态（preState）,动作对象（action）  
*/  
  
//preState=0:第一次加载组件时，preState是undifind。  
export default function countReducer(preState=0, action) {    
    //从action对象中获取：type、data  
    const { type, data } = action;  
  
    switch (type) {  
        case 'increment':  			//给操作取的名字
            return preState + data;   	//指定的操作
        case 'decrement':  
            return preState - data;  
        default:  
            return preState;  
    }  
}
```

- constart.js

```js
/*
 该模块是用于定义action对象中type类型的常量值
 目的：便于管理的同时方便程序员写错。
 当字符串赋值给变量时，变量写错了会报错
*/

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```

- count_action.js

```js
/*  
    该文件专门为Count组件生成action对象  
*/
import {INCREMENT,DECREMENT} from './constart'  
  
export const createIncrementAction = data => ({ type: INCREMENT, data });  
export const createDecrementAction = data => ({ type: DECREMENT, data });

//异步的action
export const createIncrementAsyncAction = (data, time) => {  
    return () => {  
        setTimeout(() => {  
            store.dispatch(createIncrementAction(data))  
        },time)  
    }  
}
```
当需要使用上面的action对象时，只需要导入进组件
```js
import ...

export default class Count extends Component {  
    increment = () => {  
        const { value } = this.selectNumber
	   // 只需要调用store.dispatch,异步action也是一样的
        store.dispatch(createIncrementAction(value*1))
	   // 异步
	   store.dispatch(createIncrementAsyncAction(value*1,500))
    }
}


```



#### 2. 还有些其他的文件需要进行一些更改。
- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
// 导入前面配置好的文件
import store from './redux/store'

ReactDOM.render(<App />, document.getElementById('root'))

// 路由中的store更新了，但是组件不会更新，通过subscribe()进行更新
store.subscribe(() => {
	ReactDOM.render(<App />, document.getElementById('root'))
})
```
- App.jsx

```js
import React, { Component } from 'react'  
import Count from './components/Count'  
  
// 引入store  
import store from './redux/store'  
  
export default class App extends Component {  
    render() {  
        return (  
            <div>  
                <Count store={store} />  		//添加`store={store}`
            </div>  
        )  
    }  
}
```

#### 3. 使用Redux
当上面的配置完成后，就可以使用Redux了。那要怎么使用呢？

在需要使用的组件进行导入`store`
```js
import store from '../../redux/store'
```

store下的函数
```js
// 参数是action对象，对组件进行修改值
store.dispatch(action对象)

// 获取store中的state值 
store.getState()

// 如果使用了combineReducers
store.getState().count
```


## react-redux
####  安装
```cmd
npm add react-redux
```
>我们为了让redux更加容易管理(全局可以直接使用redux)。

**react-redux将所有的组件分成两大类：**

### UI组件：

- 只负责UI的呈现，不带有任何业务逻辑
- 通过props接受属性（非函数属性）
- 不使用任何redux的API
- 一般保存在components文件夹下

### 容器组件

- 负责管理数据和业务逻辑，不负责UI的呈现
- 使用redux的API
- 一般保存在containers文件夹下

react-redux的相关API：
- Provider
让所有组件都可以使用state数据


![[Pasted image 20211209212921.png]]

我们看上图，我们知道要完成上面的通信，需要完成两条线路
>注意，进行以下操作需要先进行redux配置。

### 两条线路的开发
1. 先创建一文件夹`containers`,这个文件夹就是存放容器组件的位置。
2. 在这个文件夹下创建一个`Count`文件夹并在里面创建`index.jsx`，这个文件夹表示容器组件的分类。不同的组件需要创建不同的文件夹，名字和组件名相同。

- index.jsx
```js
// 引入Count的UI组件  
import CountUI from '../../components/Count/index';  
  
  
// 引入connect用于连接UI组件与redux  
import { connect } from 'react-redux'
// 导入之前封装好的action
import { createIncrementAction } from '../../redux/count_action'
  
//a函数返回的对象中的key就作为传递给UI组件props的key  
//value就作为传递给UI组件props的value-状态  
// 这里返回对象的原因是UI组件中的props是存储对象的形式，而不能直接是一个值
// 这里state参数已经获取到了redux中的state，这里不需要我们手动引入就可以使用了。
// 因为react-redux这个包已经帮我们封装好了。
// UI组件里使用方式：this.props.count
function mapStateToProps(state) {  
	return {count:state}
}  
  
//b函数返回的对象中的key就作为传递给UI组件props的key  
//value就作为传递给UI组件props的value-操作状态的方法
// UI组件里使用方式：this.props.jia()
function mapDispatchToProps(dispatch) {
    return {
        jia: (number) => {
            dispatch(createIncrementAction(number))
    		}
	   jian:(number) => {
            dispatch(createDecrementAction(number))
    }
}
  
//使用connect()()创建并暴露一个Count的容器组件
// Count组件props就可以获取到a，b返回的数据了。
export default connect(mapStateToProps,mapDispatchToProp)(CountUI)
```

我觉得上面的写法太复杂了，我们可以简化一下`mapStateToProp`和`mapDispatchToProp`的写法，把这两个函数写进`connect()()`双函数里。

```js
export default connect(
	state=>({count:state}),
	dispatch=>({  
	    jia:number=>dispatch(createIncrementAction(number)),  
	    jian:number=>dispatch(createDecrementAction(number))  
}))(CountUI)
```


`react-redux`提供了一种更简洁的写法，极简的写上面的形式

```js
export default connect(
	state=>({count:state}),
{  
    jia: createIncrementAction,  
    jian: createDecrementAction  
})(CountUI)
```
当我们创建了这组件就要开始使用了，我们需要修改使用count组件的导入,这是我们就不通过component文件中去导入了，而是导入这个文件。
```js
import Count from './containers/Count'
```
基本上`react-redux`我们就会使用了，但我们还忽略了一个很麻烦的地方，就是[[#2 还有些其他的文件需要进行一些更改。|给count组件传入store]]这个个地方，如果每个组件都需要这样导入，是不还是很麻烦，这是就需要接下来这个组件
### Provider组件
这个组件就是为了一次性导入`store`这个对象，那怎么使用呢。我们找src下的index.js

改成这样
```js
import React from 'react';  
import ReactDOM from 'react-dom';  
import App from './App'  
import store from 'react-redux''  
import { Provider} from 'react-redux'  
  
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
```
当改成这样，我们都不用写`store.subscribe()`来进行检查更新，`Provider组件`会帮我们检查state的值是否发送改变，并且更新页面


### react-redux的整合
什么是整合呢，当我们写一个组件时，当这个组件需要state时，我们需要配置react-redux的文件。这样太麻烦了，当我们有20个组件时，我们就要写20个react-redux的文件，这样太复杂了，我们需要进行整合。


### 多个组件的通信

当我们需要多个组件需要通信时，我们像上面给count一样建立，但是我们需要注意`redux/store.js`这个文件。
我们注意这一句。
```js
export default createStore(countReducer, applyMiddleware(thunk));
```
这里的countReducer参数，是给count提供服务的，但是我们需要给多个组件提供服务怎么办呢。
1. 导入一个`combineReducers`组件
```js
import {combineReducers} from 'redux'
```
2. 然后将需要服务的组件进行合并。
```js
const allReducer = combineReducers({

 count:countReducer,

 person:personReducer

})

export default createStore(allReducer, applyMiddleware(thunk));
```

这里的`count`和`person`就是调用数据的名称。
