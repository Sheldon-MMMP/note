# 字典

### 什么是字典
>由key和value组合在一起的属性叫做字典
>一个key对应一个value

### 字典value的获取
```js
name = my_dict[key]
```
key：就是需要获取到的value的key
#### get获取
```js
dict.get(key,default=None)
```
###### 参数：
>key：需要获取value的key
>default：key不存在则返回此默认值，默认是None，我们也可以自定义