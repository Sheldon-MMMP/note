# replace()
#python/string函数 

---
**作用**：将字符串中的旧元素替换成新元素，并能指定替换的数量

### 使用方式
```js
newstr = string.replace(old,new,max)
```
#### 参数
>old：被替换的元素
>new：替代old的新元素
>max：可选，代表替换几个，默认全部替换

#### 使用实例
```js
'hello,dewei'.replace('dewei','xiaomu')			//结果：'hello,xiaomu'
'hello,xiaomu'.replace('l','0',1)				//结果：'he0lo,xiaomu'
```

#### 运用案例
1. 敏感字符屏蔽