# Pandas
[教学视频](https://www.bilibili.com/video/BV1yi4y147A2?p=3)

Pandas 是一个开放源码、BSD 许可的库，提供高性能、易于使用的数据结构和数据分析工具。
Pandas 名字衍生自术语 "panel data"（面板数据）和 "Python data analysis"（Python 数据分析）。
Pandas 一个强大的分析结构化数据的工具集，基础是 [Numpy](https://www.runoob.com/numpy/numpy-tutorial.html)（提供高性能的矩阵运算）。
Pandas 可以从各种文件格式比如 CSV、JSON、SQL、Microsoft Excel 导入数据。


**导入**
```
pip install pandas
import pandas as pd
```



## Series
Pandas Series 类似表格中的一个列（column），类似于一维数组，可以保存任何数据类型。
Series 由索引（index）和列组成，函数如下：
```python
pandas.Series( data, index, dtype, name, copy)
```
参数说明：

-   **data**：一组数据(ndarray 类型)。
    
-   **index**：数据索引标签，如果不指定，默认从 0 开始。
    
-   **dtype**：数据类型，默认会自己判断。
    
-   **name**：设置名称。
    
-   **copy**：拷贝数据，默认为 False。

```python
s = pd.Series([1,3,5,np.nan,6,8])

#查看索引
s.index

#查看全部的值
s.values
```
注意：切片和索引和[[numpy]]的操作方式是一样的。


##  DataFrame

DataFrame 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。DataFrame 既有行索引也有列索引，它可以被看做由 Series 组成的字典（共同用一个索引）。
![[Pasted image 20220409094900.png]]
![[Pasted image 20220409094916.png]]

**构造方法**
```python
pd.DataFrame( data, index, columns, dtype, copy)
```
参数说明：

-   **data**：一组数据(ndarray、series, map, lists, dict 等类型)。
    
-   **index**：索引值，或者可以称为行标签。
    
-   **columns**：列标签，默认为 RangeIndex (0, 1, 2, …, n) 。
    
-   **dtype**：数据类型。
    
-   **copy**：拷贝数据，默认为 False。

**实例**
```python
data = [['Google',10],['Runoob',12],['Wiki',13]]  
  
df = pd.DataFrame(data,columns=['Site','Age'],dtype=float)
```
结果：
![[Pasted image 20220409095148.png]]
实例二
以下实例使用 ndarrays 创建，ndarray 的长度必须相同， 如果传递了 index，则索引的长度应等于数组的长度。如果没有传递索引，则默认情况下，索引将是range(n)，其中n是数组长度。
```python
data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}  
  
df = pd.DataFrame(data)
```
结果和上面相同

>从以上输出结果可以知道， DataFrame 数据类型一个表格，包含 rows（行） 和 columns（列）：

Pandas 可以使用 loc 属性返回指定行的数据，如果没有设置索引，第一行索引为 **0**，第二行索引为 **1**，以此类推：
```python
data = {  
 "calories": [420, 380, 390],  
 "duration": [50, 40, 45]  
}  
  
# 数据载入到 DataFrame 对象  
df = pd.DataFrame(data)  
  
# 返回第一行  
print(df.loc[0])  
```
结果：
>calories 420 
>duration 50 
>Name: 0, dtype: int64

**注意：**返回结果其实就是一个 Pandas Series 数据。
>df.iloc[0]也可以取出数据，iloc和loc的区别在于[0:5]的数据，iloc不会包括第5行，loc会包括第5行

也可以返回多行数据，使用[?,?]格式，?为各行的索引，以逗号隔开：
```python
# 返回第一行和第二行  
print(df.loc[[0, 1]])
```

**头尾数据**
head和tail方法可以分别查看最前面几行和最后几行的数据（默认为5）：
```python
#括号里没有填入个数，默认是5行
#查看前5行的数据
df.head()
#查看最后5行的数据
df.tail()
```
**数据类型**
```python
#pandas也是可以通过dtype查看数据类型
df[0].dtype
```
**下标，列标，数据**
```python
#查看行下标
df.index
#查看列下标
df.columns
#查看所有的数据
df.values
```


## pandas读取数据及数据操作


```python
df=pd.read_excel(r'excel的文件路径')
```
>这里加上r是为了防止转义字符影响路径


**添加行**
```python
#先定义数据
dit={"名字":"复仇者联盟3","投票人数":"123456"}
s=pd.Series(dit)
#name填写df中的最后一行并加一，不同的数据数量填入不同的数据数。
s.name=38738
#将s添加至最后一行,要对df进行赋值
df=df.append(s)
```
**删除行**
```python
#填入该行的下标进行删除
df.df.drop([index])
```

**列操作**
```python
#查看该列的数据
df['列名']

#当我们数据过多时，我们只想查看某列的部分数据，我们就需要在后面再加上一个中括号
df['列名'][:5]

#查看多列
df[['列名','列名']]
```
**增加列**
```python
#填入列名，给定列数据。
df['列名']=需要给每行这列添加的数据的规则。

#实例
df['序列']=range(1,len(df)+1)
```
**删除列**
```python
#axis默认是0，默认删除行，当我们要删除列时，需要将axis改成1
df=df.drop('序列'，axis=1)
```

**通过标签选择数据**
```python
df.loc[[index],[colunm]]
```
### 条件选择
```python
#选择产地是美国的行
df[df["产地"]=='美国']

#多条件选择
df[(df.产地=='美国')&(df.评分>9)]

#满足某条件或者某条件
df[((df.产地=='美国')|(df.产地=='中国大陆'))&(df.评分>9)]
```

## 缺失值及异常值处理
**缺失值处理方法：**![[Pasted image 20220409110458.png]]

**判断缺失值**
```python
#查看表格全部缺失值的情况
df.isnull()
```
![[Pasted image 20220409110827.png]]
>True就表示缺失

查看某列是否有缺失值
```python
df["分数"].isnull()
```
```python
# 筛选没有空分数的所有行 
df.loc[studf["分数"].notnull(), :]
```

**删除掉全是空值的行、列**
```python
#删除空行
df.dropna(axis=0, how='all', inplace=True)
```
```python
#删除空列
df.dropna(axis=1, how='all', inplace=True)

```
**填充缺失**
```python
#填充分数这列的缺失数据
df["分数"].fillna(0,inplace=True)
df.fillna({"分数":0},inplace=True)

#填充所有缺失数据
df.fillna(0)
```
>inplace=True：表示直接在原数据上进行更改

**处理异常值**
异常值，即在数据集中存在不合理的值，又称离群点，比如年龄为-1，笔记本电脑重量为1吨等，都是异常值的范围
对于异常值，一般来说数量都会很少，在不影响整体数据分布的情况下，我们直接删除就可以了。
其他属性的异常值处理，我们会在格式转换部分，进一步讨论.

### 数据保存
数据处理之后，然后重新保存到文件.xlse中
```python
df.to_excel(r'路径')
```