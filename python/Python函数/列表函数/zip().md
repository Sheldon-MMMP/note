# zip()
**作用**：将可迭代的对象中对应的元素打包成一个个元组，然后返回由这些元组组成的对象。

## 使用方式：

```python
a = [1,2,3]
b = [4,5,6]
c = [7,8,9,10,11]
# 打包为元组的列表，返回zip类对象
zipped_1 = zip(a,b)     
print(list(zipped_1))
# 元素个数与最短的列表一致
zipped_2 = zip(a,c)              
print(list(zipped_2))
# 与 zip 相反，*zipped 可理解为解压，返回二维矩阵式
# 这里注意python2.7， zip()返回一个list，python3.6中返回zip类
a_1, b_1 = zipped(*zip(a,b))          
print(a == list(a_1) and b == list(b_1))
```
输出：
```
[(1, 4), (2, 5), (3, 6)]
[(1, 7), (2, 8), (3, 9)]
True
```
