# .before()和insertBefore
作用：根据参数设定，在匹配元素的前面插入内容（译者注：外部插入）

## 使用方式：
HTML:
```HTML
<div class="container">
	 <h2>Greetings</h2>
	 <div class="inner">Hello</div>
	 <div class="inner">Goodbye</div>
</div>
```

我们可以创建内容然后同时插在好几个元素前面：
```JS
$('.inner').before('<p>Test</p>');
```
我们也可以用来移动内容中的元素
```js
$('.container').before($('h2'));	//将h2移动到.container前面
```
从jQuery 1.4开始, `.after()`允许我们传入一个函数，该函数返回要被插入的元素。
```js
$('p').before(function() {

 return '<div>' + this.className + '</div>';

});
```
上面的代码在每个段落前插入一个`<div>`，`<div>`里面是该段落的class名称。