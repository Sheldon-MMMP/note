# this和event的区别

今天在看javascript入门经典-事件一章中看到了 this 和 event 两种传参形式。因为作为一个初级的前端开发人员平时只用过 this传参，so很想弄清楚，this和event的区别是什么，什么情况下用什么比较合适。

**onclick = changeImg(this)       vs     onclick = changeImg(event)  
**
```js
<img src='usa.gif' onclick="changeImg(event)" />
<script>
　　var myImages = [
　　　　'usa.gif'，'canada.gif','jamaica.gif','mexico.gif'
　　];
　　function changeImg(e) {
　　　　var el = e.target;
　　　　var newImgNumber = Math.round(Math.round()*3);
　　　　while(el.src.indexOf(myImages[newImgNumber]) != -1){
　　　　　　el.src =myImages[newImgNumber];
　　　　}
　　}
</script>
```
1.this是Javascript语言的一个关键字。

2.this代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。

3.this和event.target的区别：

js中事件是会冒泡的，所以this是可以变化的，但event.target不会变化（在事件触发时，只传递当前event对象的引用），它永远是直接接受事件的目标DOM元素；

另外，this和event.target都是dom对象，如果要使用jquey中的方法可以将他们转换为jquery对象：$(this)和$(event.target);