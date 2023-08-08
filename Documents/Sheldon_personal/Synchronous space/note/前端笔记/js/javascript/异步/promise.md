### Promise的含义：

Promise 是一个对象，从它可以获取异步操作的消息。Promise 是目前前端解决异步问题的统一方案

### Promise对象有以下两个特点：

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从进行中变为已成功和从进行中变为已失败。

只要这两种情况发生，状态就不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。

### promise优点：

promise对象，可以将 异步操作 以 同步操作的流程 表达出来，避免层层嵌套

### Promise缺点：

首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。

其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

第三，当处于进行中状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### promise的基本用法：

**_promise内部是同步的，但是then方法是异步的_**

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve 函数的作用是，将Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject 函数的作用是，将Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定fulfilled状态和rejected状态的回调函数。
```js
 Promise.then(function(value) {
    // success
 
 }, function(error) {
 
     // failure
 
 })
 ```

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise 对象的状态变为resolved时调用，第二个回调函数是Promise 对象的状态变为rejected时调用。

其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise 对象传出的值作为参数。

下面是一个用Promise对象实现的 Ajax 操作的例子。
```js const getJSON = function(url) {
 
   const promise = new Promise(function(resolve, reject){
 
     const handler = function() {
 
       if (this.readyState !== 4) {
 
         return;
 
       }
 
       if (this.status === 200) {
 
         resolve(this.response);
 
       } else {
 
         reject(new Error(this.statusText));
 
       }
 
     };
 
     const client = new XMLHttpRequest();
 
     client.open("GET", url);
 
     client.onreadystatechange = handler;
 
     client.responseType = "json";
 
     client.setRequestHeader("Accept", "application/json");
 
     client.send();
 
   });
 
   return promise;
 
 };
 
 getJSON("/posts.json").then(function(json) {
 
   console.log('Contents: ' + json);
 
 }, function(error) {
 
   console.error('出错了', error);
 
 });
```

resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
```js
 const p1 = new Promise(function (resolve, reject) {
 
   // ...
 
 });
 
 const p2 = new Promise(function (resolve, reject) {
 
   // ...
 
   resolve(p1);
 
 })
 ```
上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；

如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

### Promise.prototype.then()：  

总结三点：

_**(1) 当前一个then中的代码都是同步执行的，执行结束后第二个then即可注册进入微任务队列。**_

_**(2) 当前一个then中有return 关键字，需要return的内容完全执行结束,第二个then才会注册进入微任务队列。**_

_**（3）then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。**_
```js
Promise.resolve(1)

  .then(2)

  .then(Promise.resolve(3))

  .then(console.log)

// 1
```
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。

前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

**_then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。_**
```js
 const getJSON = ()=>(new Promise((resolve,reject)=>resolve(1)))
 
 getJSON().then(function(json) {
 
 console.log(json)
 
 return json;
 
 }).then(function(post) {
 
 console.log(post)

 });
 ```
上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），

这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
```js
 const getJSON = (num)=>(new Promise((resolve,reject)=>resolve(num)))
 
 getJSON(1).then(function(post) {
 
 return getJSON(2);
 
 }).then(function (comments) {
 
 console.log("resolved: ", comments);
 
 }, function (err){
 
 console.log("rejected: ", err);
 
 });
 ```
 // 打印：resolved:  2
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。

如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。

### Promise.resolve()：  

promise.resolve()可以将对象转换为promise对象
```js
Promise.resolve('foo')

// 等价于

new Promise(resolve => resolve('foo'))
```

Promise.resolve方法的参数分成四种情况。

#### （1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

#### （2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。
```js
let thenable = {

  then: function(resolve, reject) {

    resolve(42);

  }

};
```
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
```js
let thenable = {

  then: function(resolve, reject) {

    resolve(42);

  }

};

let p1 = Promise.resolve(thenable);

p1.then(function(value) {

  console.log(value);  // 42

});
```
上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

#### （3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
```js
const p = Promise.resolve('Hello');

p.then(function (s){

  console.log(s)

});

// Hello
```
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

### Promise.prototype.catch()：  

Promise.prototype.catch() 是 .then(null, rejection) 的别名，用于指定发生错误时的回调函数

如果promise实例对象的状态变为rejected，

就会触发 catch() 方法指定的回调函数

如果 .then() 方法指定的回调函数在运行中抛出错误，也会被 catch() 方法捕获

promise对象的错误具有冒泡性质，

会一直向后传递，直到被捕获为止

( 也就是说错误总是会被下一个catch语句捕获 )

一般来说，不要在.then()方法中定义rejected状态的回调函数，

而总是使用 .catch()方法

一般总是建议，promise对象后要跟 catch()方法，这样可以处理 promise内部发生法的错误，catch() 方法返回的还是promise对象，

因此后面还可以接着调用 then() 方法

catch() 方法中还能再抛错误，如果 catch()方法抛出错误后，后面没有catch()方法，错误就不会被捕获，也不会传递到外层。

如果catch()方法抛出错误后，后面有then()方法，会照常执行，后面有catch()方法，错误还会被再一次捕获

### async和await：

Async返回的是Promise对象

async/await其实就是promise和generator的语法糖：
```js
 async function demo01() {
 
 console.log(1)
 
 return ‘demo1’;
 
 }
 
 demo01().then(function(a){
 
 console.log(a)
 
 });
```
 输出结果为1，demo1
async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。上列代码中的async函数中的console.log(1)可以当一个同步的队列执行，也就是说但你在定义async function的时候 里面的代码是以同步的方式执行，只不过async的返回是一个promise，可以用.then（）的方式去执行回调，如同上述内容。若 async 定义的函数有返回值，return ‘demo1’;相当于Promise.resolve('demo1’),没有声明式的 return则相当于执行了Promise.resolve();

await是和async一起来使用，一般为：
```js
 async function demo2(){
 
 console.log(7)
 
 await a()
 
 console.log(6)
 
 }
 
 demo2()
 
 function a() {
 
 console.log(‘demo2’)
 
 }
```
当他和promise一起用的话：
```js
async myFun( ){ await new Promise(resolve=>{ }) }
```
  

总结：

一般async与await同步出现

async返回promise对象

await出现在async函数内部，单独只用会报错
```js
 componentDidMount() {
 
         const funSync1 = () => console.log('我是同步函数1111111')
 
         const funSync2 = () => console.log('我是同步函数2222222')
 
         const funAsync = async () => {    // async关键字，定义的函数是异步函数，返回promise对象
 
             await funSync1()
 
         }
 
         funAsync().then(funSync2())
 
         console.log('bbbb')
 
 }
 
 // 先把两个同步函数变成了异步，在异步函数中，先执行funSync1，后执行funSync2
 
 // 使用async关键字后，会把同步包装成的异步函数，按同步方式执行
 
 // 所以最后得到的输出顺序是：
 
 // 我是同步函数1111111
 
 // 我是同步函数2222222
 
 // bbbb
```  