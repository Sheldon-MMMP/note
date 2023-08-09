# .after()和.insertAfter()
作用：在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点。

`.after()`和`.insertAfter()`实现同样的功能。主要的不同是语法。

## 使用方式：
HTML:
```HTML
<div class="container">
	 <h2>Greetings</h2>
	 <div class="inner">Hello</div>
	 <div class="inner">Goodbye</div>
</div>
```

我们可以创建内容然后同时插在好几个元素后面：
```JS
$('.inner').after('<p>Test</p>');
```
我们也可以用来移动内容中的元素
```js
$('.container').after($('h2'));	//将h2移动到.container后面
```
从jQuery 1.4开始, `.after()`允许我们传入一个函数，该函数返回要被插入的元素。
```js
$('p').after(function() {

 return '<div>' + this.className + '</div>';

});
```
上面的代码在每个段落后插入一个`<div>`，`<div>`里面是该段落的class名称。