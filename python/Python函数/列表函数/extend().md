# extend()
#python/list函数 

---

**作用**：将一个列表或元祖导入到另一个列表中

### 使用方式
```js
list.extend(iterable)
```

#### 参数
>iterable：代表列表或元组，该函数无反回值


#### 使用实例
```js
students =['dewei','xiaomu','xiaogang']
new_students =('xiaowang','xiaohong')
students.extend (new students)
students		//['dewei','xiaomu','xiaogang','xiaowang','xiaohong']
```