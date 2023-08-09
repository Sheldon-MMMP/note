---
id: d3bb2fd0-c4de-463a-8066-df1afff42585
---

# 类
### 类的创建 ^pycreate

```js
class 类名(object):
```

#### 类创建实例
```js
class Person(object):
	name='小慕'
	def dump(self):
		print(f'{self.name} is dumping')
```

#### self参数
##### 什么是self
>self是一个类函数中必传参数，且必须放在第一个参数位置
>self是一个对象，他代表实例化的变量自身
>self可以直接通过点来定义一个类变量		self.name = 'dewei'
>self中的变量与含有self参数的函数可以在类中的任何一个函数内随意调用

### 创建对象
```js
对象名 = 类名()
```
### 构造函数
```js
def __init__(self,a ,b):
```
构造函数定义方式是固定的，\_inint\_是python创建构造函数的固定写法
构造函数要写在函数的最上面

#### 使用实例：
```js
class Test(object):
	
	def __init__(self,a):
		self.a=a
	
	def run(self):
		print(self.a)
		
t =Test(1)
t.run()
```

### 私有函数或变量
定义方式：在变量或函数前添加  \_ \_(两个下横线)，变量或函数名后边无需添加
```js
def __cry(self, a):
	self.__age = a
```
在类外面是无法正常调用变量的，需要绕过路
```js
class Test(object):  
  
    def __init__(self, a):  
        self.a = a  
  
    def __cry(self):  
        print("我是私有函数，我被外部访问了")  
  
  
t = Test(1)  
t._Test__cry()
```
但我们一般都不希望直接函数和变量被访问。


### 装饰器
#### 什么是装饰器
>也是一种函数
>可以接受函数作为参数
>可以返回函数
>接收—个函数,内部对其处理,然后返回一个新函数,动态的增强函数功能
>将c函数在a函数中执行,在a函数中可以选择执行或不执行c函数,也可以对c函数数的结果进行二次加工处理

```js
def out(func_args):				//外围函数	func_args是要被装饰的函数
	def inter(*args,**kwargs):	//内嵌函数
```

#### classmethod
**功能**：将类函数可以不经过实例化二直接被调用
```js
@classmethod
def func(cls,...)
	do
```
 cls：代替普通类函数中的self
 变为cls，代表当前操作的类
 ##### 使用实例
 ```js
class Test(object):  
    @classmethod  
	def add(cls, a, b):  
        return a + b  
  
  
Test.add(1, 2)
 ```
 
 ```ad-warning
 在类中，普通的函数可以调用带有@classmethod的函数，但是带有@classmethod是无法调用普通的函数
 ```
 
 #### staticmethod
 **功能**：将类函数可以不经过实例化而直接被调用，被该装饰器调用的函数不许传递`self`和`cls`参数，且无法再该函数内其他类函数或类变量
 ```js
 @staaticmethod
 def func(...):
 	do
 ```
 **参数**：函数体内无`cls`和`self`参数
 
 #### property
 **作用**：将内函数的执行免去括弧，类似于调用属性
 ```js
 @property
 def func(self):
 	do
	
//调用时
对象名.func			//不用写()
 ```
 
###  继承
#### 继承的定义
在定义类的时候，将类的括号里写上要继承类的名字（可以继承多个父类）
```js
class 类名(父类名):
//继承多个父类

class 类名(父类名,父类名):
```
**使用实例**
```js
class Parent(object):  
  
    def talk(self):  
        print('taLk')  
  
    def think(self):  
        print('think')  
  
//继承Parent  
class Child(Parent):  
  
    def swimming(self):  
        print('child can swimming')  
  
  
cs = Child()  
cs.talk();				//结果：taLk
```

#### super()
**作用**：当父类方法中，有和子类同名函数时，调用父类的方法
```js
super(Child, self).方法名()
```
注：在python 3.0 以后，可以写成`super().方法名()`
**使用实例**
```js
class Parent(object):  
  
    def talk(self):  
        print('taLk')  
  
    def think(self):  
        print('think')  
  
  
class Child(Parent):  
  
    def talk(self):  
        print('我是子类的taLk')  
  
    def swimming(self):  
        super().talk()  
        self.think()  
  
    def swimming2(self):  
        self.talk()  
  
  
cs = Child()  
cs.swimming()  		//结果：talk   think
cs.swimming2()			//结果：我是子类的taLk
```

### 类的高级函数
#### \_\_str\_\_()
定义在类中，当类创建对象时，直接输出对象将输出和这个函数的返回值
```js
def __str__(self):
	return 类的描述信息
```
**使用实例**
```js
class Test(object):  
    def __str__(self):  
        return "这是关于这个类的描述"  
  
  
test = Test()  
print(test)			//结果：这是关于这个类的描述
```
#### \_\_getattr\_\_()
**作用**：当调用的属性或者方法不存在时，会返回该方法定义的信息
```js
def __getattr__(self,key):
	print(...)
```
参数： 
>key：调用任意不存在的属性名
##### 使用实例
```js
class Test(object):  
    def __getattr__(self, item):  
            print('这个key：{}不存在'.format(item))  
  
  
cs = Test()  
cs.a					//这个key：a不存在
```

#### \_\_setatter\_\_()
**作用**：当对属性进行修改时将会被调用。
```js
def __setattr__(self, key, value):  
    print('我被调用了')
```
参数
>key：调用的属性
>value：调用的值

**使用实例**
```js
class Test(object):  
    def __getattr__(self, item):  
        print('这个key：{}不存在'.format(item))  
  
    def __setattr__(self, key, value):  
        print('我被调用了')  
        if key not in self.__dict__:  
            self.__dict__[key] = value  
  
  
cs = Test()  
cs.c = 3  
print(cs.c)			//结果：3
```
注意到我在函数中写了一条赋值语句
当我将函数中的赋值语句删除，将会赋值失败。
```js
 class Test(object):  
	c = None
	
    def __setattr__(self, key, value):  
        print('我被调用了')  

cs = Test()  
cs.c = 3  
print(cs.c)			//结果：None
```

#### \_\_call\_\_()
**作用**：让对象可以像函数一样调用，当对象用函数的写法时，就会调用这个函数。
```js
class Person(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender

    def __call__(self, friend):
        print 'My name is %s...' % self.name
        print 'My friend is %s...' % friend
	   
	   
p = Person('Tom','male')
p('Tony')					//结果：My friend is Tony...
```