# .prepend()
**作用:** 将参数内容插入到每个匹配元素的前面（元素内部）。

>`.prepend()`方法将指定元素插入到匹配元素里面作为它的第一个子元素 (如果要作为最后一个子元素插入用[[前端笔记/js/jQuery/append()]])

请看下面的HTML:
```html
<h2>Greetings</h2>
<div class="container">
<div class="inner">Hello</div>
<div class="inner">Goodbye</div>
</div>
```
我们可以创建内容然后同时插入到好几个元素里面：

```js
$('.inner').prepend('<p>Test</p>');
```
每个 `<div class="inner">` 元素得到新内容:
```html
<h2>Greetings</h2>
<div class="container">
	<div class="inner">
		<p>Test</p>
		Hello
	</div>
	<div class="inner">
		<p>Test</p>
		Goodbye
	</div>
</div>
```