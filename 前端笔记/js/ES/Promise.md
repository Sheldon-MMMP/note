---
id: 79208c52-cc24-4783-ade3-1fb6ef2e4d6a
---
ES6的Promise，在前端开发中，其作用是不言而喻的，下面就来好好的聊一聊它。

理解 Promise 分为上、中、下三篇，可以很清晰的了解Promise的整体流程和具体使用。

上篇：理解 promise 的意义以及整体流程。

中篇：掌握 promise的 resolve、reject、then、catch四个方法的使用（重中之重）。

下篇：掌握 promise的类方法（辅助函数：all、any等等）

# 1、理解Promise（上篇）

### 1.1、意义

> 新技术的出现都是为了解决旧技术的痛点。

那么 promise 的出现，解决了什么样的痛点呢？

`MDN`对 Promise 的解释: **Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。**

提取关键词：**异步操作**。

没错，Promise的出现，就是解决了 ES6 以前异步操作的一些技术痛点，并且使编码更加的规范（遵循promise/a+规范）。

#### ES6之前

处理异步的方式，大概是这样的：

```js
 function request(url, successCallback, failureCallback) {
   // jQuery 的 ajax
   $.ajax({
     url,
     success: function (res) {
       successCallback(res)
     },
     error: function (err) {
       failureCallback(err)
     }
   })
 } 
 ​
 request('/api', (res) => {
   console.log('成功调用此函数')
 }, (err) => {
   console.log('失败调用此函数')
 })
```

上面这种写法确确实实可以解决请求函数得到后的结果，但是存在两个主要的问题：

1.  对于不同的人，不同的框架设计出来的方案是不同的，没有形成一种统一的规范，那么就增加了学习成本（需要看别人实现的源码或者使用文档）。
2.  可能会形成回调地狱，代码阅读性差以及难以维护。

#### ES6到来

ES6 的出现，带来了一种新的异步处理方式，**Promise**。

promise: 承诺，许诺。

promise的出现，很好的解决上面的两个问题：

1.  统一了编码规范。只要开发者使用 promise，就会给他一个**承诺**，成功的时候调用 **then** 方法，失败的时候调用 **catch** 方法等等一些列规范。
2.  promise的**链式调用**解决了回调地狱的问题，提升了代码的可读性和可维护性。


知道了promise的意义之后，就来继续学习promise的语法吧（你就是最强的王者）！

### 1.2、理解Promise的传参

ES6 中提供了一个构造函数 `Promise`, 也可以被称为一个类，需要通过 `new` 的方式来进行调用，生成一个实例对象。

构造函数 Promise 接受一个回调函数作为参数，被称为`executor`。该回调函数(executor) 会立即被执行，**同步**的表现方式。

```js
 const executor = function() {
     console.log('executor函数会被立即执行')
 }
 const promise = new Promise(executor) // 接受一个回调函数，立即执行，同步表现形式
```

`executor` 函数也接受两个回调函数作为参数，分别取名是：`resolve` 和 `reject`。这两个回调函数是内部实现的，对于**开发者**而言只需要调用即可。

```js
 const executor = function(resolve, reject) {
     console.log('executor函数会被立即执行')
     // 成功了调用resolve
     resolve()
     // 失败了调用reject
     reject()
 }
 const promise = new Promise(executor)
```

一般简写为：

```js
 const promsie = new Promise((resolve, reject) => {
     console.log('executor函数会被立即执行')
     // 成功了调用resolve
     resolve()
     // 失败了调用reject
     reject()
 })
```

**模拟promise源码的实现**

上面使用大量的回调函数作为参数，可能会看晕，那么使用class来模拟promise的源码，加深一下印象。

```js
class Promise {
   constructor(executor) {
     const resolve = function () {};
     const reject = function () {};
     try {
       executor(resolve, reject); // 调用executor函数，传递两个内部函数作为参数
     } catch (err) {
       // 如果 executor 不是回调函数，报错
       throw new Error(`Promise resolver #<${typeof executor}> is not a function`)
     }
   }
}
```

### 1.3、Promise的三种状态

`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。

1.  只有操作结果，才能决定处于哪个状态，任何其他操作都无法改变这个状态。
2.  一旦状态改变，就不会再变，任何时候都可以得到这个结果。
3.  `Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

```js
 new Promise((resolve, reject) => {
     resolve() // 状态：pending -> fulfilled
     reject()  // 这里的状态就无法改动了（反过来也是一样）
 })
```

### 1.4、Promise的流程图

从上面的 promise的使用 和 promise的三种状态，可以总结出以下的流程过程：

![10_02.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dfbc2602ecf413ea38c4b4786f288d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

### 1.5、Promise的缺点

-   无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。
-   无法知道promise处于哪一个状态。

# 2、掌握 Promise 的重要法则（中篇）

本篇主要讲解 Promise的中几个重要的方法（`resolve`，`reject`，`then`，`catch`），掌握了它们之后，promise 的棘手问题，基本上都能痛快的解决。并且下篇的 promise 的类方法都是基于这四个方法实现的，属于锦上添花，可要可不要。

### 2.1、resolve

在上篇中，介绍到`executor`函数接受两个参数,第一个参数被称为 `resolve`。

`resolve`函数的作用是，将`Promise`对象的状态从`等待(pending)`变为`成功(fulfilled)`。

**resolve接受一个参数，供调用then方法的时候使用。**

参数分为三种：

1.  参数是一个普通的值或则对象（就是不包含下面的两种情况）
2.  参数是promise
3.  参数是thenable对象

#### 情况一：普通值

```js
 // 1、数字
 new Promise((resolve) => {
   resolve(231)
 }).then(res => {
   console.log(res) // 231
 })
 ​
 // 2、字符串
 new Promise((resolve) => {
   resolve('copyer')
 }).then(res => {
   console.log(res) // copyer
 })
 ​
 // 3、对象（thenable对象除外）
 new Promise((resolve) => {
   resolve({ name: "copyer" });
 }).then((res) => {
   console.log(res); // {name: 'copyer'}
 });
 ​
 // 4、boolean
 new Promise((resolve) => {
   resolve(false);
 }).then((res) => {
   console.log(res); // false
 });
 ​
 // 5、undefined
 new Promise((resolve) => {
   resolve(undefined);
 }).then((res) => {
   console.log(res); // undefined
 });
 ​
 // 6、null
 new Promise((resolve) => {
   resolve(null);
 }).then((res) => {
   console.log(res); // null
 });
```

不难发现，针对普通值，resolve传递什么，then就接受什么。

#### 情况二： promise

当`(外promise)`的resolve的参数为**promise对象(`内promise`)** 的时候，那么`外promise`的状态是由`内promise`所决定的。

这里可以先使用**then方法**来操作下。

```js
 // 外promise
 new Promise((resolve) => {
   resolve(p);
 }).then(
   (res) => {
     console.log("成功回调:", res); 
   },
   (err) => {
     console.log("失败回调:", err);
   }
 );
 ​
 // 内promise
 const p = new Promise((resolve, reject) => {
   resolve("success");  // 成功回调: success
 });
 const p = new Promise((resolve, reject) => {
   reject("failure");  // 失败回调: failure
 });
```

-   当`内promise` 调用了**resolve**方法，`外promise`的状态变为**fulfilled**，成功回调。
-   当`内promise` 调用了**reject**方法，`外promise`的状态变为**rejected**, 失败回调。

#### 情况三：thenable方法

当传递的一个对象，对象的属性包含then方法，那么就会执行对象中then的方法。

```js
const thenable = {
  then: function () {
    console.log("thenable的方法会被执行");
  },
};
new Promise((resolve) => {
  resolve(thenable); // 会执行对象中的then方法
}).then((res) => {
  console.log("成功回调", res);
});
```

### 2.2、reject

`executor`函数接受两个参数,第二个参数被称为 `reject`。

`reject`函数的作用是，将`Promise`对象的状态从`等待(pending)`变为`失败(rejected)`。

reject是一个表示失败的回调函数，接受**一个任意类型**的参数，在**then的第二个回调函数**中或则**catch的回调函数**中，拿到失败的结果。

```js
// 方式一： catch的回调函数
new Promise((resolve, reject) => {
  reject("reject不合格的原因");  // 1、传递一个不合格的原因
}).catch((err) => {   
  console.log(err); // reject 不合格的原因
});

// 方式二： then的第二个回调函数
new Promise((resolve, reject) => {
  reject("reject不合格的原因");  // 1、传递一个不合格的原因
}).then((res) => {}, (err) => {
    console.log(err) // reject不合格原因
}) 
```

相对于`resolve`接受的不同类型的参数，表现出不同的形式; `reject`就相当的简单一点，reject传递过去什么，接受到的值就是什么（没有这么多的花里胡哨）。

### 2.3、then

then是promise对象上的一个方法（准确的来说，是在promise的原型**Promise.prototype.then**），供实例调用的。下面具体详解then的具体使用。

#### 2.3.1、接受两个参数

在上面的`resolve`，`reject`方法中，也提及到了 `then` 的大致使用，接受两个参数：

-   参数一：回调函数，接受resolve的成功回调传递的值
-   参数二：回调函数，接受reject的失败回调传递的值

```js
new Promise((resolve, reject) => {
  resolve("成功的值"); // 情况一
  reject("失败的值");  // 情况二
}).then(
  (res) => {
    console.log(res); // 情况一： 成功的值
  },
  (err) => {
    console.log(err); // 情况二： 失败的值
  }
);
```

聊完了then的参数，接下来就来聊一聊then的其他特殊情况吧。

#### 2.3.2、then的多次调用

这里的多次调用，并不是指的是链式调用（**不同promise**的实例），而是针对**同一promise**实例的then方法多次调用。

当执行resolve方法时，状态变为了**fulfilled**，then方法中的回调函数都会执行。（内部实现，就是then中的回调函数，存放在数组中，当状态变为fulfilled时，遍历数组，依次执行函数。）

```js
const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res);  // copyer
});
p.then((res) => {
  console.log(res); // copyer
});
p.then((res) => {
  console.log(res); // copyer
});
```

#### 2.3.3、then的返回值

示例：

```js
const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res) // copyer
}).then((res) => {
  console.log(res) // undefined
})
```

在链式调用的时候，第二个then的`res`为什么是`undefined`?

先搞清楚一件事：

> 为什么可以链式调用？
> 
> `then`是promise原型上的方法，promise的实例可以调用。
> 
> 当第二次继续调用then方法的时候，说明也是调用的promise的then方法，那就说明了两种情况：
> 
> 1.  then的回调函数中返回了`this`，promise的实例对象，可以调用then方法
> 2.  then的回调函数返回了一个新的Promise实例，也是可以调用then方法的
> 
> promise内部采用的是：**第二种**。因为第一种是没有意义的，针对同一个promise，后面拿取的结果跟第一次拿取的结果是一样的。

**结论一：then方法的回调函数，返回一个promise**

**结论二：then方法的链式调用，是针对不同的promise（即每次都是一个新的promise）**

知道了promise的链式调用的原理之后，就来看看返回值的类型吧。

then的返回值也是三种情况（跟 resolve 的三种情况是一样的）：

-   普通的值（除了下面的两种情况）
-   promise
-   thenable

**情况一： 普通的值**

该值会被作为resolve的参数，作为下个promise的返回值。`Promise.resolve(返回值)`

```js
// 普通的值
const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res) // copyer
  // 函数的默认返回值： undefined ====> 被内部转化为 Promise.resolve(undefined)
}).then((res) => {
  console.log(res) // undefined
})



const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res) // copyer
  return {name: 'james'} // 被内部转化为 Promise.resolve({name: 'james'})
}).then((res) => {
  console.log(res) // {name: 'james'}
})
```

**情况二：promise**

如果then方法是一个普通的值，会被转化成promise。如果返回值，本身就是promise，那就不需要转化了，直接根据返回的promise状态执行对应的成功回调还是失败回调。

```js
// 成功回调
const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res) // copyer
  return Promise.resolve('返回值的new_promise_success')
}).then((res) => {
  console.log(res) // 返回值的new_promise_success
})



// 失败回调
const p = new Promise((resolve, reject) => {
  resolve("copyer");
});
p.then((res) => {
  console.log(res) // copyer
  return Promise.reject('返回值的new_promise_failure')
}).then((res) => {
  console.log(res) // 这里不会执行，因为返回的promise状态为rejected
}, (err) => {
    console.log(err) // 返回值的new_promise_failure
})
```

**情况三：thenable对象**

```js
const thenable = {
  then: () => {
    console.log("执行thenable对象中的then方法");
  },
};
new Promise((resolve) => {
    resolve('copyer')
}).then((res) => {
  console.log(res); // copyer
  return thenable;
}).then((res) => {
  console.log(res); // 这里不会执行，会执行thenable对象的then方法
});
```

promise的then方法的大致使用就差不多了，注意事项还是比较多的，可以动手试一试。

### 2.4、catch

catch是promise对象上的一个方法（准确的来说，是在promise的原型**Promise.prototype.catch**），供实例调用的。用于拿取**失败**的信息。

简单使用：

```js
new Promise((resolve, reject) => {
  reject("32132");
}).catch((err) => {
  console.log(err); // 32132
});
```

一般情况下，reject传递什么，catch就接受什么；但是如果reject的参数是一个promise的话，就影响catch的捕获异常。

#### catch的捕获时机

两个promise片段：

```js
// params_promise
const p = new Promise((resolve, reject) => {
  resolve('2321')
})

// main_promise
new Promise((resolve, reject) => {
  reject(p);
}).catch((err) => {
  console.log(err); // 视情况而定
})
```

-   如果 `main_promise` 是 rejected 状态, `params_promise`是 fulfilled 状态，那么 catch 捕获的是 `main_promsie`的异常信息。
-   如果 `main_promise` 是 fulfilled 状态, `params_promise`是 rejected 状态，那么 catch 捕获的是 `params_promsie`的异常信息。
-   如果 `main_promise` 是 rejected 状态, `params_promise`是 rejected 状态，那么 catch 捕获的是 `main_promsie`的异常信息。

从而可以知道： **catch的捕获规则是是`由外向内`的（`就远原则`），在依次执行代码的时候，如果遇到异常，就直捕获停止，不会向下再去捕获。**

catch的返回值还是一个promise，又开启一个新的流程了。

### 2.5、finally

finally是promise对象上的一个方法（准确的来说，是在promise的原型**Promise.prototype.finally**），供实例调用的。

finally 是ES9（ES2018）新增的一个特性：表示Promise对象无论变成fulfilled还是rejected状态，最终都会被执行。

finally 方法是不接收参数的。

**无论promise的状态是成功还是失败，都会执行该方法**。返回值也是一个promise，可以链式调用。

```
new Promise((resolve, reject) => {
  resolve(p);
}).finally(() => {
  // 执行
  console.log(21321)
  return Promise.resolve('123')
}).finally(() => {
  // 执行
  console.log(231321321321)
})
```

# 3、理解 Promise 的类方法（下篇）

在中篇中，学习了 promise 的then、catch、finally方法，它们都是放在原型上的，供实例对象使用的。接下来，了解的几个方法都是Promise的类方法。

### 3.1、resolve

类方法resolve方法其实跟executor方法中的resolve方法是一致的，并且情况都是等价的

```js
Promise.resolve('copyer')

// 等价于
new Promise((resolve) => {
    resolve('copyer')
})
```

参数也分为三种情况：

1.  普通的值
2.  promise
3.  thenable对象

上面提及到了，就不讲述了。

### 3.2、reject

reject方法，会将Promise对象的状态设置为rejected状态。

Promise.reject的用法相当于 new Promise，然后调用reject

```js
Promise.reject('copyer')

// 等价于
new Promise((resolve, reject) => {
    reject('copyer')
})
```

Promise.reject传入的参数无论时候什么类型，都会直接作为reject的参数传递到catch方法中。

### 3.3、all

将多个Promise包裹成一个新的Promise，新的Promise的状态由包裹的Promise的状态共同决定。

-   当所有的Promise的状态变为fulfilled时，新的Promise的状态为fulfilled，并且会将所有Promise的返回值组成一个数组。
-   当有一个Promise的状态为reject时，新的Promise的状态为reject，并且会将第一个reject的返回值作为参数。

**参数接受一个数组**。

**正常情况**下的使用：promise组成一个数组

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 10);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(20);
  }, 20);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(30);
  }, 30);
});

// p1、p2、p3组成一个数组
Promise.all([p1, p2, p3]).then((res) => {
  console.log(res); // [10,20,30]
});
```

**少数情况一**：数组中包含数字，字符串等等其他类型

```js
Promise.all([1, "copyer", p1]).then((res) => {
    console.log(res); // [1, 'copyer', 10]
});
```

当all方法执行是，会遍历里面的数组，检查里面的item是不是promise对象，如果不是，就会转化成promise，比如

-   `1` 会被转化成 `Promise.resolve(1)`
-   `copyer` 会被转化成 `Promise.resolve('copyer')`

当每项都成为 promise对象之后，再来确定新的 promise 的状态。

**少数情况二**：传递了一个thenable对象

```js
const thenable = {
  then: () => {
    console.log(321);
  },
};

Promise.all([1, thenable, p1]).then((res) => {
  console.log(res);
});
```

会直接执行 thenable 对象中的then方法，不会执行promise中的then方法。

> 解释说明：正常情况是在开发中常见的，少数情况是在开发中基本上不可见的

### 3.4、allSettled

all方法有一个缺陷：当其中的一个Promise变成reject状态时，新Promise的状态也就变成了reject状态。

-   那对对于一些已经resolved的结果，也是拿不到的。

在ES11（ES2020）中，添加了一个新的API来解决此类问题，用法跟all基本上是一样的。

-   该方法会在所有的Promise都有结果（settled），无论是fulfilled，还是reject时，才会有最终的状态，返回一个新的Promise。
-   并且这个Promise的结果一定是fulfilled的。

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 10);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(20);
  }, 20);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(30);
  }, 30);
});

Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log(res); 
});
```

返回的格式：

```
[
  { status: 'fulfilled', value: 10 },
  { status: 'fulfilled', value: 20 }, // 成功时value
  { status: 'rejected', reason: 30 }  // 失败是reason
]
```

`status`: 表示其中Promise的状态

`value`: 成功的返回值

`reason`: 失败的返回值

### 3.5、race

如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法：

-   race是竞技、竞赛的意思，表示多个Promise相互竞争，谁先有结果，那么就使用谁的结果

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 10);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(20);
  }, 20);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(30);
  }, 30);
});

Promise.race([p1, p2, p3]).then((res) => {
  console.log(res);  // 10
});
```

### 3.6、any

any方法是ES12中新增的方法，和all方法基本上相反。(还是实验性的语法，暂时没有被所有浏览器支持)。

`MDN`对Promise.any的解释：

`Promise.any()` 接收一个`Promise`可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 `promise` 和`AggregateError`类型的实例