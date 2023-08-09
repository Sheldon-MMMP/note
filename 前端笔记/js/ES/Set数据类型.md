> ES6 提供了新的数据结构 Set和weakSet。它类似于数组，==**但是成员的值都是唯一的，没有重复的值**==。


# 创建Set类型
Set本身是构造函数，用来创建Set数据类型。
```js
const s = new Set();

const s = new Set([1,2,3,3,4,5]);
const s = new Set('fjdaslkfj');
const s = new Set(document.querySelectorAll('div'));
```
`Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

我们了解了Set的特性，我们就知道Set可以用来去除数组的重复元素,也可以去除字符串中的重复项。
```js
[...new Set(array)]
[...new Set(string)].join('')
```
```ad-warning
向 Set 加入值的时候，不会发生类型转换，所以`10`和`"10"`是两个不同的值。因为Set使用了一个叫“Same-value-zero equality”的算法，类似精确运算符，区别在于NaN在加入Set时，NaN等于自身，而精确相等运算符认为不等于自身。
```

```js
const s = new Set([NaN,NaN]);
console.log([...s]); //[NaN]
```
上面加入了两个NaN，最后只有一个NaN。


# Set对象的属性与方法
## 属性
-   `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
-   `Set.prototype.size`：返回`Set`实例的成员总数。

## 方法
###  Set.prototype.add(value)
向Set对象中添加一个值，返回Set对象本身。
```js 
const s = new Set();
s.add('1').add(1);
console.log([...s]) //['1', 1]
```
这里注意`1`和`'1'`是两个不同数据类型的元素，不算重复值。


###  Set.prototype.delete(value)
删除某个值，返回一个布尔值。
 - true：表示删除成功。
 - false：表示删除失败。
```js
console.log(s.delete(1)); // true

console.log(s.delete(2)); // false
```

### Set.prototype.has(value)
查看这个值是否存在，返回一个`Boolean`
- true：表示存在
- false：表示不存在
```js
console.log(s.has("1")); //true;
console.log(s.has(1));   //false;
```

### Set.prototype.clear()
清除所有成员，没有返回值。
```js
s.clear()
console.log([...s]); //[]
```
以上就是操作Set对象的方法，接下来我们来讲遍历Set对象的方法。
## 遍历方法
Set 结构的实例有四个遍历方法，可以用于遍历成员。

-   `Set.prototype.keys()`：返回键名的遍历器
-   `Set.prototype.values()`：返回键值的遍历器
-   `Set.prototype.entries()`：返回键值对的遍历器
-   `Set.prototype.forEach()`：使用回调函数遍历每个成员

### keys(), value(),entries()
我们将这个三个方法一起说，这三个方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```
由于Set对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法。

```javascript
Set.prototype[Symbol.iterator] === Set.prototype.values // true
```

这也说明，可以省略`values`方法，直接用`for...of`循环遍历 Set。

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

### forEach()
这个方法和数组的forEach()的方法是一样的。
```js
const s = new Set();
s.add('1').add(1);
s.forEach((item,key,set)=>{
    console.log(key+":"+item,set)
})
//1:1 Set(2) {size: 2, 1, 1}
//1:1 Set(2) {size: 2, 1, 1}
```

```ad-info
注意：`forEach`方法还可以有第二个参数，表示绑定处理函数内部的`this`对象。
```

### 其他遍历方法

扩展运算符（`...`）内部使用`for...of`循环，所以也可以用于 Set 结构。

利用这些特性我们可以做什么呢，前面讲过我们可以使用Set去除掉数组中重复的值。
```js
let a = [1,2,3,4,5,6,6,6];
a = [...new Set(a)]
console.log(a);  //[1, 2, 3, 4, 5, 6]
```
那么我们也可以通过数组使用数组的方法，例如使用`filter()`创建Set对象。
```js
let s = new Set([1,2,3,4,5,6])
s = new Set([...s].filter((item)=>item>=2))
console.log(s);
```
这里只是举例了`filter()`函数，这里可以搭配更多的函数，==**但要注意数组方法的返回值是什么**==

因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```


# weakSet
weakSet和Set比较类似，都是不能有重复的元素。区别在于weakSet的元素只能是对象，而不能是其他类型的值。
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
## 创建weakSet
```js
const ws = new WeakSet()
```
WeakSet 结构有以下三个方法。

-   **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
-   **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
-   **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

```js
let user = {name:"Alex"};

let user2 = user;

const weakset = new WeakSet();

weakset.add(user2);

console.log(weakset.has(user));

weakset.delete(user);

console.log(weakset);
```
这个三个方法和`Set`是一样的。