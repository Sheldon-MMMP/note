# .empty()
**描述:** 从DOM中移除集合中匹配元素的所有子节点。

这个方法不仅移除子元素（和其他后代元素），同样移除元素里的文本。因为，根据说明，元素里任何文本字符串都被看做是该元素的子节点。请看下面的HTML：
```html
<div class="container">

 <div class="hello">Hello</div>

 <div class="goodbye">Goodbye</div>

</div>
```
我们可以移除里面的任何元素


```js
$('.hello').empty();
```
结果文本 `Hello`文本被删除：

```html
<div class="container">

 <div class="hello"></div>

 <div class="goodbye">Goodbye</div>

</div>
```
如果 `<div class="hello">`里面包含任何数量的嵌套元素，他们也会被移走。

为了避免内存泄漏，jQuery先移除子元素的数据和事件处理函数，然后移除子元素。

如果你想删除元素，不破坏他们的数据或事件处理程序（这些绑定的信息还可以在之后被重新添加回来），请使用[[detach()]]代替 。