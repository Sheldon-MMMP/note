# values()

#python/字典函数 

---

**作用**：获取字典中的所有value

### 使用方法
```js
dict_values = dict.values()
```
#### 参数
>无需传参，返回一个value集合的伪列表

#### 使用实例
```js
my_dict ={'name': 'dewei','age': 33}
my_dict values()
dict_values(['dewei',331)]
```
 dict_keys完全没有具备列表的功能，他是一个伪列表
 如何让它变成一个列表呢
 ```js
 key_list = list(my_dict.values())
 ```