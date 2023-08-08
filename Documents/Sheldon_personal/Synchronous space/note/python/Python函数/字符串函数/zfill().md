# zfill() 
#python/string函数

---
**功能**：为字符串定义长度，如不满足，在字符串前用0填充

### 使用方式
```python
newstr = string.zfill(width)  //给字符串定义新的长度，将新字符串赋值给newstr
```

#### 参数
>width:新字符串的长度

#### 实例：
```pyton
name = 'xiaomu'
new_name=name.zfill(10)
print(new_name)		//输出结果：0000xiaomu
```