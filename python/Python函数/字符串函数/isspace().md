# isspace()
#python/string函数 

---
**作用**：判断字符串是否是空字符串(如’ ‘，’ a ‘这种包含空字符的不叫空字符串)

### 使用方式
```js
booltype=string.isspace()
```
#### 参数
>无参数可传，返回一个布尔类型

#### 使用实例
```js
'   '.isspace()		//结果：true
' fal '.isspace()		//结果：false
```

```ad-warning
有空格组成的字符串不是空字符串
```