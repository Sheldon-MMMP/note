# popitem
#python/字典函数 

---

**作用**：删除当前字典里末尾一组键值对并将其返回

### 使用方式
```js
dict.popitem()
```
#### 参数
>无需传参
>>返回被删除的键值对，用元祖调用，0是key，1是value

#### 使用实例
```js
my_dict ={'name':'dewei','age': 33}
my_dict.popitem()			//返回结果：("age',33)
```