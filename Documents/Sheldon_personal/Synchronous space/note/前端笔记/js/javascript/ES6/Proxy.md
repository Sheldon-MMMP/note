# Proxy

roxy用于修改某些操作的默认行为，也可以理解为在目标对象之前架设一层拦截，外部所有的访问都必须先通过这层拦截，因此提供了一种机制，可以对外部的访问进行过滤和修改。这个词的原理为代理，在这里可以表示由它来“代理”某些操作，译为“代理器”。

### 使用方法：
```js
var proxy = new Proxy(target, handler);
```
**参数**
- target：要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- hander：是一个对象，里面可以定义`Provy`的拦截操作函数。
### 实例
```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`); 
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`); 
    return Reflect.set(target, key, value, receiver);
  }
});
// 调用
obj.count = 1
// setting count!
++obj.count // getting count! 
		// setting count! 
		// 2
```
这个方法可以和[[Reflect]]一起使用。
Proxy支持拦截的操作，一共有13种：

-   **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
-   **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
-   **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
-   **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
-   **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
-   **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
-   **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
-   **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
-   **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
-   **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
-   **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
-   **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
-   **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 撤销 `Proxy`

[`Proxy.revocable()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable) 方法被用来创建可撤销的 `Proxy` 对象。这意味着 proxy 可以通过 `revoke` 函数来撤销，并且关闭代理。此后，代理上的任意的操作都会导致[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
var revocable = Proxy.revocable({}, {
  get: function(target, name) {
    return "[[" + name + "]]";
  }
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError is thrown
proxy.foo = 1           // TypeError again
delete proxy.foo;       // still TypeError
typeof proxy            // "object", typeof doesn't trigger any trap
```