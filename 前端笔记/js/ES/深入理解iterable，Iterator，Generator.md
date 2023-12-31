# 理解迭代
在了解Iterable，Iterator，Generator之前，我们需要理解什么是迭代。

在javascript中，循环就是一种迭代
```js
for(let i=1;i<100;i++){
	console.log(i);
}
```
循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要做什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的。

迭代会在一个有序的对象上进行（“有序”可以理解为集合中所有项都可以按照既定的顺序被遍历到，特别是开始和结束项有明确的定义。），如数组：
```js
const arr =  [1,2,3,4];
for(let i=0; i < arr.length;i++){
	console.log(arr[i])
}
```
因为数组有已知的长度，且数组每一项都可以通过索引获取，所以整个数组可以通过递增索引来遍历。

那既然for循环那么好用，为什么js还需要Iterator呢？

因为通过循环来迭代是不理想的，有很多情况无法使用for循环来进行的迭代：
 - 数组有下标，可以通过下标引用获取元素，但js中有许多类型是没有下标的。
 - 通过增加索引来获取元素，并不适用于其他具有隐式顺序的数据结构。

ES5新增了`Array.prototype.forEach()`方法，向通用迭代需求迈进了一步（但仍然不够理想）：
```js
let arr = [1,2,3,4]
arr.forEach((item)=>console.log(item)) // 1 2 3 4 
```
这个确实解决了上面我们提到的问题，但这个办法没法表示迭代何时终止。