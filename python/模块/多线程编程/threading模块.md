# threading模块

## 线程的创建
### thread()
**使用方式**
```js
Thread(target, args)
```
**参数**
- target：执行的函数
- args：传入函数的参数

返回值：线程对象

#### 线程对象的方法
![[Pasted image 20211111145337.png]]

**使用实例**
`lists`中的列表导入到`new_list`中，并且删除导入成功的内容，用多线程完成
```js
import time  
import random  
import threading  
  
lists = ['python', 'django', 'tornado', 'flask', 'bs5', 'requests', 'uvloop']  
  
new_lists = []  
  
  
def work():  
    if len(lists) == 0:  
        return  
 data = random.choice(lists)  
    lists.remove(data)  
    new_data = '%s_new' % data  
    new_lists.append(new_data)  
    time.sleep(1)  
  
  
if __name__ == '__main__':  
    start = time.time()  
    for i in range(len(lists)):  
        t = threading.Thread(target=work)  
        t.start()  				
  
  
    print('old list:', lists)  
    print('new list:', new_lists)  
    print('time is %s' % (time.time()-start))
```

#### 线程池
##### concurrent()
**使用方式**
```js
futures.ThreadPoolExecutor(线程数量)
```

| 方法名 | 说明                             | 用法                 |
| ------ | -------------------------------- | -------------------- |
| submit | 往线程池中加入任务               | submit(target, args) |
| done   | 线程池中的某个线程是否完成了任务 | done()               |
| result | 获取当前线程执行任务的结果       | result()             |

```ad-warning
通过线程执行的函数无法获取返回值

多个线程同时修改文件可能造成数据错乱
```