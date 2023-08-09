# capitalize()
#python/string函数

---
**功能：**：将字符串的首字母大写，其他字母小写

### 使用方式：
```python
newstr = string.capitalize()		//将string的首字母变成大写传给newstr
```
参数：
>函数括弧内不能传入参数

实例：
```python
name = 'xiaoMu';
new_name=name.capitalize();
print(new_name);		//输出结果：Xiaomu
```

```ad-warning
1. capitalize只对字母是有效的，中文字符是不行的

2. 如果首字母已经大写，则无效
```