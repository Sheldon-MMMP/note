# jQuery主页
#js #jQuery 
## 向您的页面添加 jQuery 库

jQuery 库位于一个 JavaScript 文件中，其中包含了所有的 jQuery 函数。

可以通过下面的标记把 jQuery 添加到网页中：
```html
<script type="text/javascript" src="jquery.js"></script>
```

### 使用 Google 的 CDN

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
```

### 使用 Microsoft 的 CDN

```html
<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js"></script>
```

## DOM属性
### 添加和删除
[[addClass()]]:给元素添加class名（class名）

[[after()和insertAfter()]]:在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点。

[[before()]]:根据参数设定，在匹配元素的前面插入内容（译者注：外部插入）

[[前端笔记/js/jQuery/append()|append()]]:在每个匹配元素里面的末尾处插入参数内容。

[[prepend()]]:将参数内容插入到每个匹配元素的前面（元素内部）。

[[detach()]]: 从DOM中去掉所有匹配的元素。

[[empty()]]:从DOM中移除集合中匹配元素的所有子节点。

[[removeAttr()]]： 为匹配的元素集合中的每个元素中移除一个属性（attribute）。
### 获取：
[[prop()]]:获取匹配的元素集中第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。

[[html()]]:获取集合中第一个匹配元素的HTML内容 或 设置每一个匹配元素的html内容。

[[css()]]:获取匹配元素集合中的第一个元素的样式属性的值

[[attr()]]: 获取匹配的元素集合中的第一个元素的属性的值。

### 复制
[[clone()]]:创建一个匹配的元素集合的深度拷贝副本。