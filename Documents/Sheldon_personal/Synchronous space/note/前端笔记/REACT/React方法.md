## cloneElement()

```js
React.cloneElement(
  element,
  [config],
  [...children]
)
```

以 `element` 元素为样板克隆并返回新的 React 元素。`config` 中应包含新的 props，`key` 或 `ref`。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 `config`中未出现 `key` 或 `ref`，那么原始元素的 `key` 和 `ref` 将被保留。

`React.cloneElement()` 几乎等同于：

```html
<element.type {...element.props} {...props}>{children}</element.type>
```

但是，这也保留了组件的 `ref`。这意味着当通过 `ref` 获取子节点时，你将不会意外地从你祖先节点上窃取它。相同的 `ref` 将添加到克隆后的新元素中。如果存在新的 `ref` 或 `key` 将覆盖之前的。

引入此 API 是为了替换已弃用的 `React.addons.cloneWithProps()`。

如果你不想每次都键入 `React.createElement`，通常的做法是创建快捷方式：

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

如果你使用了 `React.createElement` 的快捷方式，那么在没有 [[JSX]] 的情况下使用 React 几乎一样方便。

## createElement()

```
React.createElement(
  type,
  [props],
  [...children]
)
```
**参数**
	- type：要创建的React元素名称；
	- \[props\]：该React元素的属性
	- \[...children\]：该元素的子节点
	
实例：
```js
React.createElement('div', {toWhat: 'World'}, 'Hello, React'),

//当有子元素的写法
React.createElement('div', null, 
	React.createElement(h1, {toWhat: 'World'}, 'Hello, React')
),
```
创建并返回指定类型的新 React 元素。其中的类型参数既可以是标签名字符串（如 `'div'` 或 `'span'`），也可以是 React 组件类型 （class 组件或函数组件），或是 React fragment类型。

使用 [JSX](https://zh-hans.reactjs.org/docs/introducing-jsx.html) 编写的代码将会被转换成使用 `React.createElement()` 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 `React.createElement()`。请查阅[不使用 JSX](https://zh-hans.reactjs.org/docs/react-without-jsx.html) 章节获得更多信息。

## createContext

  

### `React.createContext`

  

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

  

### `Context.Provider`

  

Provider 接收一个 `value` 属性，传递给消费组件，允许消费组件订阅 context 的变化。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

  

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

  

### `Class.contextType`

  

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 [`React.createContext()`](https://react.docschina.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

  

> 你只通过该 API 订阅单一 context。

  

### `Context.Consumer`

  

这里，React 组件也可以订阅到 context 变更。这能让你在[函数式组件](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)中完成订阅 context。

  

这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

  

### `useContext`

  

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。只能用在 function 组件中。