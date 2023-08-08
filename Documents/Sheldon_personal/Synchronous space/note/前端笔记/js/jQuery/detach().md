# .detach()
**作用：** 从DOM中去掉所有匹配的元素。
>`.detach()` 方法和[[.remove()]]一样, 除了 `.detach()`保存所有jQuery数据和被移走的元素相关联。当需要移走一个元素，不久又将该元素插入DOM时，这种方法很有用。

### 使用方法：
删除DOM中所有段落
```html
<body>
	<p>Hello</p>
	how are
	<p>you?</p>
	<button>Attach/detach paragraphs</button>
<script>
	$("p").click(function(){
		$(this).toggleClass("off");
	});
	$("button").click(function(){
		if ( p ) {
			p.appendTo("body");		//将p中存储的元素，添加到body里的最后面
			p = null;
			} else {
			p = $("p").detach();	//删除p标签，p中存储了被移走的元素。
		}
	});
</script>
</body>
```