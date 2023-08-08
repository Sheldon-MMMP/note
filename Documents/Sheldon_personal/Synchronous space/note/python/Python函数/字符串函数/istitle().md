# istitle()
#python/string函数 

---
**作用**：判断字符串是否是一个标题类型
>标题类型：字符串中的的字符串的首字母大写，如’Holle‘。当字符串中有空格时，空格后的字符串也要大写，如'Holle Xiaomu'

### 使用方式
```js
booltype = String.istitle()
```
#### 参数
>无参数可传，返回一个布尔类型

#### 使用实例
```js
'Hello Xiaomu'.istitle()		//结果：true
'hello xiaomu'.istitle()		//结果：false
```