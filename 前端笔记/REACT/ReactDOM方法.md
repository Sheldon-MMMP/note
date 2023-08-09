## render方法

^933a67

==**`render` 方法的返回值_描述_了你希望在屏幕上看到的内容**==。React 根据描述，然后把结果展示出来。更具体地来说，`render` 返回了一个 **React 元素**，这是一种对渲染内容的轻量级描述。大多数的 React 开发者使用了一种名为 “JSX” 的特殊语法，JSX 可以让你更轻松地书写这些结构。语法 `<div />` 会被编译成 `React.createElement('div')`。如下：
```js
/*#__PURE__*/
const el = React.createElement("div", {
  className: "shopping-list"
}, 
/*#__PURE__*/React.createElement("h1", null, "Shopping List for ", props.name),
/*#__PURE__*/React.createElement("ul", null, 
/*#__PURE__*/React.createElement("li", null, "Instagram"), 
/*#__PURE__*/React.createElement("li", null, "WhatsApp"), 
/*#__PURE__*/React.createElement("li", null, "Oculus")));

ReactDOM.render(el, document.getElementById('root'))
```
上面的代码等于下面的部分，
```html
<div id='root'>
	<div className="shopping-list">
	  <h1>Shopping List for {props.name}</h1>
	  <ul>
	    <li>Instagram</li>
	    <li>WhatsApp</li>
	    <li>Oculus</li>
	  </ul>
	</div>
</div>
```