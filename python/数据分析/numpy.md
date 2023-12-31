# numpy
[numpy教程](https://www.bilibili.com/video/BV1yi4y147A2?p=2)
NumPy系统是Python的一种开源的数值计算扩展。这种工具可用来存储和处理大型矩阵，比Python自身的嵌套列表（nested list structure)结构要高效的多（该结构也可以用来表示矩阵（matrix））。包括：
- 1、一个强大的N维数组对象Array；
- 2、比较成熟的（广播）函数库；
- 3、用于整合C/C++和Fortran代码的工具包；
- 4、实用的线性代数、傅里叶变换和随机数生成函数。numpy和稀疏矩阵运算包scipy配合使用更加方便。提供了许多高级的数值编程工具，如：矩阵数据类型、矢量处理，以及精密的运算库。
## 安装
```cmd
pip install numpy               # install numpy
```
## 导入包
```python
#导入方式有以下几种
import numpy
#推荐第二种写法
import numpy as np
from numpy import *
```

## 使用方式
>注意：这里我们默认使用的是第二种导入方式。

### 矩阵
1. 创建矩阵
```python
In [1]: import numpy as np

In [2]: all_zero =np.zeros((3,3))

In [3]: all_zero
Out[3]: 
array([[ 0.,  0.,  0.],
       [ 0.,  0.,  0.],
       [ 0.,  0.,  0.]])

In [4]: 
```
2. 从python中的list初始化矩阵
```python
array_numpy = np.array([2,3,4,5])
```
3. 创建多维数组（3\*4\*4）
```python
In [11]: array_n_dim = np.ones((3,4,4),dtype='int8')

In [12]: array_n_dim
Out[12]: 
array([[[1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]],

       [[1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]],

       [[1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]]], dtype=int8)
```
**参数：**
- dtype：数据类型
4. fill设置指定值
```python
In [11]:a = np.array([1,2,3,4])
#使用fill更改数据时，必须要数据类型一样，否则会将fill中的数据强制转换成a中的数据
In [12]:a.fill(5)
Out[12]: array([5,5,5,5])
```
5. 数据转换
```python
In [29]:a.astype('float')
Out[29]:array([1., 2., 3., 4.])

```
6. 生成整数序列
```python
#生成一个1-9的序列
In [32]: a = np.arange(1,10)
Out[32]：array([1, 2, 3, 4, 5, 6, 7, 8, 9])

#第三位是步长
In [33]：a = np.arange(1,10,2)
Out[33]：array([1, 3, 5, 7, 9])
```
7. 生成等差数列
```python
#生成一个1-10之间的等差数列（包括10），生成3位。
In [34]：a=np.linspace(1,10,3)
Out[34]：array([ 1. ,  5.5, 10. ])
```
8. 生成随机数
```python
#生成随机数
In [39]：np.random.rand(10)
Out[39]:
array([0.48663818, 0.85871259, 0.12178781, 0.24125957, 0.97460678,
       0.31447819, 0.68264781, 0.41652965, 0.40581107, 0.94018347])

#生成有正有负的随机数
In [40]：np.random.randn(10)
Out[40]:
array([-0.92770555, -0.60413206,  0.61957126, -0.73504048, -0.42413815,
       -0.04410316, -1.40346285, -0.74005261,  1.56236903,  0.09371861])

#指定生成的数据类型
#生成1-10之间的随机整数（不包括10），生成10个
In [41]:np.random.randint(1,10,10)
Out[41]:array([5, 9, 5, 2, 9, 1, 5, 7, 6, 2])
```
9. 查看属性
```python
#查看数组中的数据类型
a.dtype

#查看元素每个维度的个数，会返回一个元祖，每个元素代表这个一维的元素数目
a.shape

#查看数组里面元素数个数
a.size

#查看数组的维度
a.ndim
```

#### 数学与统计

##### 加法
```python
#必须要长度相等的情况下才能相加
In [11]:a = [1,2,3,4]
In [11]:b = [2,3,4,5]

Out[19]: array([3, 5, 7, 9])
```
##### 排序
```python
#由小大排序，这里并没有赋值给array
np.sort(array)


#获取由小到大的排列在数组中的索引位置
np.argsort(array)
```
**常用计算函数**
```python
In [101]: arr = np.random.randn(4,4)

In [102]: arr
Out[102]: 
array([[ 1.22742206, -0.49602643,  0.06893939, -0.5974265 ],
       [ 1.33043955, -0.24695017,  1.39751381, -0.23691971],
       [-1.25554674,  0.37242292, -0.14985591, -0.11907288],
       [ 0.06103707, -1.28255389, -0.67935123, -1.35710905]])

In [103]: arr.mean()
Out[103]: -0.1226898557091208

In [104]: arr.mean(axis=0)
Out[104]: array([ 0.34083799, -0.41327689,  0.15931151, -0.57763203])

In [105]: arr.mean(axis=1)
Out[105]: array([ 0.05072713,  0.56102087, -0.28801315, -0.81449428])

In [106]: arr.sum()
Out[106]: -1.9630376913459329

In [107]: arr.sum(axis=0)
Out[107]: array([ 1.36335194, -1.65310755,  0.63724605, -2.31052813])
```
![[Pasted image 20220408211832.png]]
**数组的集合运算**
```python
In [108]: values = np.array([2,3,1,6,7,4])

In [109]: values1 = np.array([2,6,8])

In [110]: np.in1d(values, values1) ## 判断values的元素是否在values1中
Out[110]: array([ True, False, False,  True, False, False], dtype=bool)
```
![[Pasted image 20220408211942.png]]

**相关系数矩阵**
```python
np.cov(mv_score,mv_length)
```

### 索引与切片
索引就是a\[0\],不再细说
1. 切片分为正切和负切
```python
a=np.array([11,12,13,14,15])
a[1:3]
#输出：array([12,13])
a[1:-2]
#输出：array([12,13])
#-2表示倒数第二位
```
2. 省略参数
```python
#冒号后面不填数就代表选中全部
a[-2:]
#输出：array([14,15])

#间隔取值
a[::2]
#输出：array([11,13,15])
```
3. 多维数组的索引
```python
a=np.array([[0,1,2,3],[10,11,12,13]])
a[1]   #结果：array([0,1,2,3])

#以下举例解释，冒号前后都为空，表示取a全部的数组，1指取每列数组的第几位。
a[:,1] #结果：array([1,11])
#逗号前表示行索引，逗号后是列索引
```
#### 切片的机制
切片在内存中使用的是引用机制。
```python
a=np.array([0,1,2,3,4])
b=a[2:4]
b[0]=10
a   #结果：array([ 0,  1, 10,  3,  4])
```
引用机制意味着，python并没有为b分配新的空间来存储它的值，而是让b指向了a所分配的内存空间，因此，改变b会改变a的值。
解决方法：使用[[copy()]]方法产生一个复制，这个复制会申请新的内存。
#### 花式索引
切片只能支持连续或者等间隔的切片操作，要想实现任意位置的操作，需要使用花式索引fancy slicing。

花式索引需要指定索引的位置：
```python
a=np.arange(0,100,10)  
#生成：array([ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
index=[1,2,-3]
y=a[index]
print(y)  #结果：[10,20,70]
```
我们还可以定义一个布尔数组来取值：
```python
mask = np.array([0,1,1,0,0,1,0,0,1,0],dtype=bool)
mask  
#结果：array([False,  True,  True, False, False,  True, False, False,  True, False])

#我们将上面的mask用来取值，注意mask和a的长度必须是一样的，否则会报错。
#当获得true对应的数就将会被取出
a[mask]
#结果：array([10, 20, 50, 80])
```

**二维数组**

[视频教学](https://www.bilibili.com/video/BV1yi4y147A2?p=2#t=4510.396773,t=4985.674549)

我们给定数组a的值为：
![[Pasted image 20220408203556.png]]
对于二维花式索引，我们需要给定行和列的值：
```python
a[(0,1,2,3,4),(1,2,3,4,5)]

#结果：array([1,12,23,34,45])

#取出最后三行的第1,3,5列
a[3:,[0,2,4]]
```
二维数组也可以用布尔数组来取值：
```python
mask=np.array([1,0,1,0,0,1],dtype=bool)
a[mask,2]
#结果：array([2,22,52])
```

与切片不同，花式索引返回的是原对象的一个复制而不是引用。


#### where语句

where函数会返回所有非零元素的索引

```python
a = np.array([0,12,5,20])
np.where(a>10)
#结果：(array([1, 3], dtype=int64),)

a[np.where(a>10)]
#结果：array([12, 20])
```
注意：where的返回值是一个元祖。返回的是索引位置，索引[1,3]大于10的数。



#### 多维数组操作

**数组形状**
转置
```python

a = array([0,1,2,3,4,5])

#将数组转换成2行3列的数组
a = a.reshape(2,3)
#结果：array([[0, 1, 2],
       [3, 4, 5]])

a.T
#结果：array([[0, 3],
       [1, 4],
       [2, 5]])
```

#### 数组的连接
有时我们需要将不同的数组按照一定的顺序连接起来：
```python
concatenate((a1, a2, …), axis=0)
```
>注意，这些数组要用()包括到一个元祖中去，
>传入的数组**必须具有相同的形状**，这里的相同的形状可以**满足在拼接方向axis轴上数组间的形状一致即可**

另外需要指定拼接的方向，默认是 axis = 0，也就是说对0轴的数组对象进行纵向的拼接（纵向的拼接沿着axis= 1方向）；**注：一般axis = 0，就是对该轴向的数组进行操作，操作方向是另外一个轴，即axis=1。**

```python
In [23]: a = np.array([[1, 2], [3, 4]])
In [24]: b = np.array([[5, 6]])
In [25]: np.concatenate((a, b), axis=0)
Out[25]:
array([[1, 2],
       [3, 4],
       [5, 6]])
```

这里a和b的形状是一样的还可以连接成三维数组：
```python
In [23]: a = np.array([[1, 2], [3, 4]])
In [24]: b = np.array([[5, 6], [7, 8]])
z = np.array((a,b))
#结果：array([[[1, 2],
        [3, 4]],

       [[5, 6],
        [7, 8]]])
```

事实上，Numpy提供了分别对应这三种情况的函数：
- vstack：`np.vstack((a,b))`
- hstack：`np.hstack((a,b))`
- dstack：`np.dstack((a,b))`


[内置函数还有很多](https://blog.csdn.net/nihaoxiaocui/article/details/51992860?locationNum=5&fps=1)