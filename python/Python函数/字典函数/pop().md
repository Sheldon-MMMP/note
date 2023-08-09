# pop()
#python/字典函数 

---

**作用**：删除指定的键
### 使用方式
```js
dict.pop(key)
```
#### 参数
>key：希望被删掉的键
>>返回这个key对应的值（value）

#### 使用实例

```js
my_dict ={'name':'dewei','age':33}
pop_value = my_dict.pop('age')
print(pop_value)		//结果：33
```