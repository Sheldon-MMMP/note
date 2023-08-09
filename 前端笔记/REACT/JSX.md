# JSX
JSX是JavaScript XML的简写，表示在JavaScript代码中写XML(HTML)格式的代码。
优势：声明式语法更加直观、与HTML结构相同，降低了学习成本、提升开发效率。

使用方式一：
CDN引入
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

将你使用有的JSX的`<script>`标签属性中添加`type="text/babel"` 属性。

## 使用步骤：
1. 使用JSX语法创建react元素
```js
const title = <h1>Hello JSX</h1>
```
2. 使用ReactDOM.render()方法渲染react元素页面中
```js
ReactDOM.render(title,root)
```

##  JSX 特定属性

JSX元素的属性名和HTML中设置属性命名是不一样的，使用的是js的属性名，如class->className。

你可以通过使用引号，来将属性值指定为字符串字面量：

```js
const element = <div className="box"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```js
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

> **警告：**
> 
> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
> 
> 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。