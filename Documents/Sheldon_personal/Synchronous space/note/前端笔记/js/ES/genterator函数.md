`generator函数`跟普通函数在写法上的区别就是，多了一个星号`*`，并且只有在`generator函数`中才能使用`yield`，什么是`yield`呢，他相当于`generator函数`执行的`中途暂停点`，比如下方有3个暂停点。而怎么才能暂停后继续走呢？那就得使用到`next方法`，`next方法`执行后会返回一个对象，对象中有`value 和 done`两个属性

-   value：暂停点后面接的值，也就是yield后面接的值
-   done：是否generator函数已走完，没走完为false，走完为true

```js
function* gen() {
  yield 1
  yield 2
  yield 3
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: undefined, done: true }
```