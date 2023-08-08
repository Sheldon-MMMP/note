# .append()

**作用:** 在每个匹配元素里面的末尾处插入参数内容。
>`.append()`函数将特定内容插入到每个匹配元素里面的最后面，作为它的最后一个子元素（last child）, (如果要作为_第一个_子元素 （first child）, 用[[prepend()]]

请看下面的HTML:

```html
<h2>Greetings</h2>
<div class="container">
 	<div class="inner">Hello</div>
 	<div class="inner">Goodbye</div>
</div>
```
你可以创建内容然后同时插入到好几个元素里面：
```js
$('.inner').append('<p>Test</p>');
```
每个新的inner `<div>`元素会得到新的内容：

```html
<h2>Greetings</h2>
 <div class="container">
	 <div class="inner">
		 Hello
		 <p>Test</p>
	 </div>
	 <div class="inner">
		 Goodbye
		 <p>Test</p>
	 </div>
 </div>
```