### .addClass()
作用：给元素添加class名（class名）
```js
$("p").addClass("myClass yourClass");
```
```ad-warning
值得注意的是这个方法不会替换一个样式类名。它只是简单的添加一个样式类名到元素上。
```

自 jQuery 1.4开始, `.addClass()` 方法允许我们通过传递一个用来设置样式类名的函数。
```js
$("ul li:last").addClass(function(index，currentClass) {

 	return "item-" + index;

});
```
使用函数时可以传入两个值：
- index是元素的下标
- currentClass是元素的class名。