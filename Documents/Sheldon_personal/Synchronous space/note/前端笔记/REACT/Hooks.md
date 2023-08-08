
### React Hook/Hooks是什么
1. Hook是React 16.8.0版本新增的特性/语法
2. 可以让你在函数组件中使用state以及其他的React特性

## React.useState()

1. State Hook让函数组件也可以有state状态，并进行状态数据的读写操作
2. 语法: const [xxx, setxxx] = React.useState(initValue)
3.  usestate()说明：
	- 参数：第一次初始化指定的值在内部作缓存
	- 返回值：包含2个元素的数组，第1个为内部当前状态值，第2个为更新状态值的函数
4.  setxxx()2种写法:
	- setxxx(newValue)：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
	- setxxx（value => newValue）：参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值



>使用setxxx更改状态的时候，必须传入一个新数组(地址和原来不一样)，不能是原数组,即使原数组中的数据改变了也不能。


## React.useEffect()
在class组件中，有生命周期的概念，最常用的，我们通常会在componentDidMount这个生命周期中做数据请求，偶尔，我们也会用一些其它的生命周期，像是componentDidUpdata，componentWillReceiveProps等。在hooks中，没有生命周期的概念，但是，有副作用函数useEffect。

使用useEffect，和使用useState相同，必须得先引入`import React, { useState, useEffect } from 'react';`,默认情况下，==**useEffect会在第一次和每次更新之后都会执行，useEffect函数接受两个参数，第一个参数是一个函数，每次执行的就是函数中的内容**==，第二个函数是个数组，数组中可选择性写state中的数据，代表只有当数组中的state发生变化是才执行函数内的语句。==**如果是个空数组，代表只执行一次**==，类似于componentDidUpdata。所以，向后端请求可以写成下面这种方式：
```js
// 页面进来只调用一次
useEffect(()=>{
    axios.get('/getYearMonth').then(res=> {
        console.log('getYearMonth',res);
        setValues(oldValues => ({
            ...oldValues,
            fileList:res.data.msg
        }));
    })
    //函数返回的东西只有在组件卸载的时候才会执行，类似于componentWillUnmount组件
    return ...
},[]);
```
effect函数会在浏览器完成画面渲染之后延迟调用

在一个hooks函数中，可以同时存在多个effect函数，所以，当有需求每次更新都执行useEffect中的代码时，可以用一个useEffect请求数据，用其他的useEffect做另外的事情。只需根据第二个参数即可区别不同作用。

//官方示例性能优化

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```


## React.useRef()

（1）. Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据

（2）. 语法: const refContainer = useRef()

（3）. 作用:保存标签对象，功能与React .createRef()一样


## React.useContext()

**作用：** 可以跨组件传递数据，不用像props一样需要层层传递。

### 使用方式：
```js
const {Provider} = useContent();
```

### Provider 指定使用的范围

在圈定的范围内，传入读操作和写操作对象，然后可以使用上下文

```js
    <Provider value={{n,setN}}>
      这是爷爷
      <Baba></Baba>
    </Provider>
```

### 3.最后使用useContext

使用useContext接受上下文，因为传入的是对象，则接受的也应该是对象

```js
const {n,setN} = useContext(C)；
```

## Fragment标签
 在写jsx语法中，每个组件都需要被`<div>`来进行包裹，当渲染到页面上时，就可以用`<Fragment>`标签来进行包裹，并不会渲染到页面上。
 ```js
 import React,{Component,Fragment} from 'react'
 
 
在组件中
class  ... {
	render(){
		return(
			//只接收两个参数key和chiden
			<Fragment  key=''>....<Fragment>
		)
	}
}
 ```