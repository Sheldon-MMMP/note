# sort()
#python/list函数 

---

**作用**：对列表进行升序或降序

### 使用方式
```js
list.sort(key=None, reverse=False)
```

#### 参数
>**key**：接受的函数返回值，表示此元素的权值，sort将按照权值大小进行排序，默认是根据数据类型而定
>
>**reverse**：接受的是一个bool类型的值 (Ture or False),表示是否颠倒排列顺序,一般默认的是False，**<font color=red>注意第一个字母是大写的</font>**

#### 使用方式

```js
books =['python','django','web','flask','tornado']
books.sort()
print(books)		//['django,'flask,'python','tornado','web']
```

```ad-warning
列表中的元素类型必须相同，否则无法排序（报错）
```