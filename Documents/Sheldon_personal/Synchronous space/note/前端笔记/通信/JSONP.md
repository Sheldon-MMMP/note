# JSOP

是一种解决跨域的解决方案
**安装**
```
npm i jsonp --save-dev
```

### 使用方式

```js
 let url = "https://time.hd.mi.com/gettimestamp";
 jsonp(url, (err, res) => {
	 console.log(res);
 });
```