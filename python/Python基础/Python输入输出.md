# 输出
输出语句`print()`和c语言类似。
`print()`函数也可以接受多个字符串，用逗号“,”隔开，就可以连成一串输出：
```js
print(300)				//结果：300
print(100 + 200)			//结果：300
```
### 输出变量
方式一：逗号都相当于一个空格
```js
print('My friend is',friend,'...')		//结果：My friend is Tony ...
```
方式二：变量`%`号输出，但学习输出前需要了解


| 格式 | 数据类型                                     |
| ---- | -------------------------------------------- |
| %%   | 百分号标记#就是输出一个%                     |
| %c   | 字符及其ASCII码                              |
| %s   | 字符串                                       |
| %d   | 有符号整数(十进制)                           |
| %u   | 无符号整数(十进制)                           |
| %o   | 无符号整数(八进制)                           |
| %x   | 无符号整数(十六进制)                         |
| %X   | 无符号整数(十六进制大写字符)                 |
| %e   | 浮点数字(科学计数法)                         |
| %E   | 浮点数字(科学计数法，用E代替e)               |
| %f   | 浮点数字(用小数点符号)                       |
| %g   | 浮点数字(根据值的大小采用%e或%f)             |
| %G   | 浮点数字(类似于%g)                           |
| %p   | 指针(用十六进制打印值的内存地址)             |
| %n   | 存储输出字符的数量放进参数列表的下一个变量中 |

```js
print('My name is %s...' % self.name)  				//结果：My name is Tom...

#多个变量时
print('My friend is %s...%s'% (friend,self.name))		//结果：My friend is Tony...Tom
```

第三种方式：Python2.6 开始，新增了一种格式化字符串的函数 `str.format()`，它增强了字符串格式化的功能。

```js
"{} {}".format("hello", "world") # 不设置指定位置，按默认顺序 
'hello world' 

"{0} {1}".format("hello", "world") # 设置指定位置 
'hello world'  

"{1} {0} {1}".format("hello", "world") # 设置指定位置 
'world hello world'
```
```js
print("网站名：{name}, 地址 {url}".format(name="菜鸟教程", url="www.runoob.com"))

# 通过字典设置参数
site = {"name": "菜鸟教程", "url": "www.runoob.com"} 
print("网站名：{name}, 地址 {url}".format(**site))

# 通过列表索引设置参数
my_list = ['菜鸟教程', 'www.runoob.com']
print("网站名：{0[0]}, 地址 {0[1]}".format(my_list)) # "0" 是必须的
```

# 输入
现在，你已经可以用`print()`输出你想要的结果了。但是，如果要让用户从电脑输入一些字符怎么办？Python提供了一个`input()`，可以让用户输入字符串，并存放到一个变量里。比如输入用户的名字：

```python
name = input()
```