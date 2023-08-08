# .html()
作用：获取集合中第一个匹配元素的HTML内容 或 设置每一个匹配元素的html内容。
```ad-abstract
 .html( htmlString )：
 用来设置用来设置每个匹配元素的一个HTML 字符串。
 
 .html( function(index, oldhtml) ):
 用来返回设置HTML内容的一个函数。接收元素的索引位置和元素原先的HTML作为参数。jQuery的调用这个函数之前会清空元素;使用oldhtml参数引用先前的内容。在这个函数中，`this`指向元素集合中的当前元素。
```

使用方法：
html如下：
```html
<div class="demo-container">

 <div class="demo-box">Demonstration Box</div>

 </div>
 ```
```js
$('div.demo-container').html();		//获取到了demo中的子元素了
```
获取到的东西是：
```html
<div class="demo-box">Demonstration Box</div>
```