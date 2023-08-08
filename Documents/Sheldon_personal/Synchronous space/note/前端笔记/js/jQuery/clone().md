# .clone()

**描述:** 创建一个匹配的元素集合的深度拷贝副本。
>`.clone()`方法_深度_ 复制所有匹配的元素集合，包括所有匹配元素、匹配元素的下级元素、文字节点。出于性能方面的考虑，表单元素动态的状态（例如，用户将数据输入到`input`和 `textarea`，或者 用户在`select`中已经选中某一项）不会被复制到克隆元素。克隆操作将设置  这些字段为HTML中指定的默认值。

### 使用方式
一般我们会结合其他的方法进行使用。
但是我们如果需要的是复制而不是移除，我们可以像下面这样写代码：
```js
$('.hello').clone().appendTo('.goodbye');
```
结果会是：
```html
<div class="container">
	<div class="hello">Hello</div>
	<div class="goodbye">
		Goodbye
		<div class="hello">Hello</div>
	</div>
</div>
```