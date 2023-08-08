# keys()
#python/字典函数

---

**作用**：获取字典的所有key

### 使用方式
```js
dict_ keys = dict.keys()
```
#### 参数
>无需传参，返回一个key集合的伪列表

 #### 使用实例
 
 ```js
 my__dict ={}'name':'dewei,'age':33}
 dict_keys=my_dict keys()			//dict_ keys(['name,'age'1)
 ```
 dict_keys完全没有具备列表的功能，他是一个伪列表
 如何让它变成一个列表呢
 ```js
 key_list = list(my_dict.keys())
 ```