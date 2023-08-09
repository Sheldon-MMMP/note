# multiprocessing

| 函数名  | 介绍         | 参数         | 返回值   |
| ------- | ------------ | ------------ | -------- |
| Process | 创建一个进程 | target，args | 进程对象 |

**参数**
- target：需要执行的函数的函数名
- arges：传入为函数传参

| 函数名   | 介绍         | 参数 | 返回值 |
| -------- | ------------ | ---- | ------ |
| start    | 执行进程     | 无   | 无     |
| join     | 阻塞程序     | 无   | 无     |
| kill     | 杀死进程     | 无   | 无     |
| is_alive | 进程是否存活 | 无   | bool   |

#### 使用实例
```js
import time  
import os  
import multiprocessing  
  
def work_a(b):  
    for i in range(10):  
        print(i, b, os.getpid())  
        time.sleep(1)  
  
  
def work_b():  
    for i in range(10):  
        print(i, 'b', os.getpid())  //os.getpid()为了记录执行地址
        time.sleep(1)  
  
  
if __name__ == '__main__':  
    start = time.time()  
    a_p = multiprocessing.Process(target=work_a, args='a')  
    a_p.start()  	//函数work_a就可以和work_b一起执行
    work_b()  
    print(time.time() - start)
```

### 创建进程池
#### Pool类
Pool类可以提供指定数量的进程供用户调用，当有新的请求提交到Pool中时，如果池还没有满，就会创建一个新的进程来执行请求。如果池满，请求就会告知先等待，直到池中有进程结束，才会创建新的进程来执行这些请求
**创建方式**
```js
pool = multiprocessing.Pool(n)		//注意大小写
```
**参数**：
- n：进程池中进程的个数

返回值：返回一个进程池对象
下面介绍一下multiprocessing 模块下的Pool类下的几个方法：
##### apply()

函数原型：apply(func[, args=()[, kwds={}]])

该函数用于传递不定参数，同python中的apply函数一致，主进程会被阻塞直到函数执行结束（不建议使用，并且3.x以后不再出现）

##### apply_async()

函数原型：apply_async(func=函数, args=()[, kwds={}[, callback=None]]])
- args：是函数的参数，传入类型是元组

与apply用法一致，但它是非阻塞的且支持结果返回后进行回调

##### map()

函数原型：map(func, iterable[, chunksize=None])

Pool类中的map方法，与内置的map函数用法行为基本一致，它会使进程阻塞直到结果返回
注意：虽然第二个参数是一个迭代器，但在实际使用中，必须在整个队列都就绪后，程序才会运行子进程

##### map_async()

函数原型：map_async(func, iterable[, chunksize[, callback]])
与map用法一致，但是它是非阻塞的

##### close()

关闭进程池（pool），使其不再接受新的任务

##### terminal()

结束工作进程，不再处理未处理的任务

##### join()

主进程阻塞等待子进程的退出， join方法要在close或terminate之后使用

### Manager
#### Lock()
作用：为进程加锁和解锁
```js
from multiprocessing import Manager  
  
lock = Manager().Lock()
```
##### acquire()
作用：上锁
**使用实例**：
在上面我们已经创建了一个`Lock()`对象，我们在这里直接调用
```js
lock.acquire()
```
**参数**
- 没有参数

##### release()
作用：开锁（解锁）

**使用实例**：
在上面我们已经创建了一个`Lock()`对象，我们在这里直接调用
```js
lock.release()
```


##### 实例：
```js
import time  
import os  
import multiprocessing  
from multiprocessing import Manager  
  
def work(cout, lock):  
    lock.acquire()  		//将进程锁住，其他的程序无法进来
    print(cout, os.getpid())  
    time.sleep(5)  
    lock.release()  		//解开进程，让其他的程序进来
    return 'i am %s and %s' % (cout, os.getpid())  
  
  
if __name__ == '__main__':  
    lock = Manager().Lock()  
    results = []  
    pool = multiprocessing.Pool(5)  
    for i in range(20):  
        result = pool.apply_async(func=work, args=(i, lock))  
        results.append(result)  
    for res in results:  
        print(res.get())
```



### 进程直接的通信
#### Queue()
**作用**：队列的创建

##### 使用实例
```js

```
**参数**
- mac_cout：队列可以传入多少信息，默认是无限

返回值：队列对象

当我们创建好了队列对象，我们就可以使用对列中的函数
```js
put(message)		//信息放入队列	message：字符串

get()				//获取队列信息
````