# isinstance()
**作用**：用来判断一个函数是否是一个已知的类型，类似 type()。

### 语法
```js
isinstance(object,classinfo)
```
参数：

-   object : 实例对象。
-   classinfo : 可以是直接或者间接类名、基本类型或者由它们组成的元组。

返回值：如果对象的类型与参数二的类型（classinfo）相同则返回 True，否则返回 False。

#### 实例
以下是使用isinstance()函数的实例：
```js
a = 2
isinstance(a,int)      # 结果返回 True

isinstance(a,str)      # 结果返回 False

isinstance(a,(str,int,list))      # 是元组中的一个，结果返回 True
```