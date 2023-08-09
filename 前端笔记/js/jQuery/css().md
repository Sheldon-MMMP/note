# .css()
**描述:** 获取匹配元素集合中的第一个元素的样式属性的值

>`.css()`方法可以非常方便地获取匹配的元素集合中第一个元素的样式属性值，

### 使用方式：
**从jQuery 1.9开始**, 传递一个CSS的样式属性的数组给`.css()`将返回 属性 - 值 配对的对象。例如，要获取元素4个边距宽度值`border-width`，你可以使用`元素.css([ "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth" ])`.

```html
<html>
<head>
div { width:60px; height:60px; margin:5px; float:left; }
</style>
<script src="https://code.jquery.com/jquery-latest.js"></script>
</head>
<body>
	<span id="result">&nbsp;</span>
	<div style="background-color:rgb(15,99,30);"></div>
	<div style="background-color:#123456;"></div>
	<div style="background-color:#f11;"></div>
<script>
	$("div").click(function () {
	 var color = $(this).css("background-color");
	 $("#result").html("That div is <span style='color:" +color + ";'>" + color + "</span>.");
	});
</script>
</body>
</html>
```