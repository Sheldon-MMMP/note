# Matplotlib

matplotlib是python里用于绘图的专用包，功能十分强大。下面介绍一些最基本的用法

**导入**
```js
pip install matplotlib
import matplotlib
```

## Matplotlib Pyplot
Pyplot 是 Matplotlib 的子库，提供了和 MATLAB 类似的绘图 API。

Pyplot 是常用的绘图模块，能很方便让用户绘制 2D 图表。

Pyplot 包含一系列绘图函数的相关函数，每个函数会对当前的图像进行一些修改，例如：给图像加上标记，生新的图像，在图像中产生新的绘图区域等等。

使用的时候，我们可以使用 import 导入 pyplot 库，并设置一个别名 plt：
```python
import matplotlib.pyplot as plt
```

### plt.show()
作用：展示设置好的图形。
```
plt.show()
```
### plot

**基本用法**
```js
plt.plot(x,y)
```
如果我们只给定义个列表，那么列表的数据将赋值给y，x的值将会是索引。
```js
plt.plot([1,2,3,4],[1,4,9,16])  #给定数据
plt.ylabel('y')   #设置y轴标题
plt.xlabel('x')   #设置x轴标题
plt.show()
```
结果：
![[Pasted image 20220409171215.png]]


##### 字符参数

常用标识颜色的字符参数：  
- **'b'**：蓝色blue  
- **'g'**：绿色green  
- **'r'**：红色red  
- **'c'**：青色cyan  
- **'m'**：品红magenta  
- **'y'**：黄色yellow  
- **'k'**：黑色black  
- **'w'**：白色white

常用表示类型的字符参数：  
- '-'：实线  
- '--'：虚线  
- '-.'：虚点线  
- ':'点线  
- '.'：点  
- ','：像素点  
- 'o'：圆点  
- 'v'：下三角点  
- '`'：上三角点  
- '<'：左三角点  
- '>'：右三角点  
- '1'：下三叉点  
- '2'：上三叉点  
- '3'：左三叉点  
- '4'：右三叉点  
- 's'：正方点  
- 'p'：五角点  
- '*'：星型点  
- 'h'：六边形点1  
- 'H'：六边形点2  
- '+'：加号点  
- 'x'：乘号点  
- 'D'：实心菱形点  
- 'd'：瘦菱形点  
- '_'：横线点


```js
plt.plot([1,2,3,4],[1,4,9,16],'--')
plt.show()
```
结果：
![[Pasted image 20220409171719.png]]

在一个图里画多条线
```js
t=np.arange(0.,5.,0.2)
plt.plot(t,t,'r--',
         t,t**2,'b-.',
         t,t**3,'g-')
plt.show()
```
![[Pasted image 20220409172054.png]]

**传入多组数据**

>画多条线是传入了多组（x,y,format_str），我们可以把这些组合放到一个plot函数中去即可。  plt.plot(x1,y1,'format1',x2,y2,'format2',......)

**线条属性**
以通过linewidth设置线条粗度，通过color设置线条颜色
```js
x=np.linspace(-np.pi,np.pi)
y=np.sin(x)
plt.plot(x,y,linewidth=5,color='r')
plt.show
```

### 子图
figure()函数会产生一个指定编号为num的图：**plt.figure(num)**  
这里，figure(1)其实是可以省略的，因为默认情况下，plt会自动产生一幅图像。  
  
使用subplot()可以在一幅图中生成多个子图，其参数为：**plt.subplot(numrows,numcols,fignum)**  
**参数**
- numrows：几行
- numcols：几列
- fignum：数量
>几行几列表示子图的排列方式

当numrows * numcols < 10时，中间的逗号可以省略，因此plt.subplot(211)就相当于plt.subplot(2,1,1)
```js
def f(t):
    return np.exp(-t)*np.cos(2*np.pi*t)
t1=np.arange(0.,5.,0.1)
t2=np.arange(0.,5.,0.02)

plt.figure(figsize=(10,6))
plt.subplot(211)
plt.plot(t1,f(t1),'bo',t2,f(t2),'k')

plt.subplot(212)
plt.plot(t2,np.cos(2*np.pi*t2),'r--')
plt.show()
```
![[Pasted image 20220409180253.png]]

![[Pasted image 20220409181006.png]]