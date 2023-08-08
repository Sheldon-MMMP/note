### 什么是fs文件系统模块
fs模块是Node.js官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。
>如果要在javaScript代码中，使用fs模块来操作文件，则需要使用如下的方式先导入它。

```js
const fs = require('fs');
```

### fs.readFile()

作用：用来读取指定文件中的内容。
```js
// 异步
fs.readFile(path[,options],callback)

// 同步
fs.readFileSync(path[,options])
```
**参数**
- **path**：字符串，表示文件路径。
- **options**：表示以什么编码格式来读取文件。
- **callback**：文件读取完成后，通过回调函数拿到读取结果。

**代码实例**
```js
// 1.导入fs模块，来操作文件  
const fs = require('fs');  
  
// 2.调用fs.redFile()方法读取文件  
fs.readFile('./files/1.text', 'utf-8', function (err, dataStr) {  
    //打印失败的结果  
    //如果读取成功则err值为null  
    //如果读取失败，则err的值为错误对象，dataStr的值为undefined  
    if (err) {  
        return console.log(err)  
    }  
    //打印成功的结果  
    return console.log(dataStr)  
})
```
### fs.writeFile()

作用：用来向指定的文件中写入内容，将文件中的内容替换成写入的内容，原内容将消失。
```js
fs.writeFile(file,data[,options],callback)
```
**参数**
- file：字符串，表示文件路径。
- data：写入的内容
- options：写入的编码格式，默认值utf8。
- 文件写入完成后的回调函数。

**代码实例**
```js
fs.writeFile('./files/1.text', '我爱符霞', function (err) {
 //如果文件写入成功，则err的值等于null
 //如果文件写入失败，则err的值等于一个错误对象
 console.log(err)
})
```


## 路径动态拼接的问题
在使用fs模块操作文件时，如果提供的操作路径是以` ./`和 `../`开头的相对路径时，很容易出现路径动态拼接错误的问题。
原因：代码运行时，==**会以执行node命令时所处的目录**==，动态拼接出被操作文件的完整路径

```js
fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
if(err) {
	return console.log('读取文件失败!'+err.message)
}
console.log('读取文件成功!' + dataStr)
})
```

这里我们读取的访问路径是以`./`开头的，我们来运行这个文件。
![[Pasted image 20220119155015.png]]
我们通过了两种方式来运行这个文件，但我们发现第二种出错了。

错误原因：第二种方式寻找1.txt是在`day1\files\1.txt`来进行寻找。这就是应为node寻找相对路径的方式导致的。当node遇到了相对路径就会使用调用路径（就是node前面的路径）和`./`后面的路径进行拼接。

解决方法：将相对路径更改为绝对路径


### fs.existsSync
path | | 返回: 如果路径存在，则返回 true，否则返回 false。

### \_\_dirname
作用：表示当前所处的目录

