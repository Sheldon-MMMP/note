# Connector模块
**作用**：操作[[MySQL]]数据库

## connect数据连接
### 创建连接
```js
import mysql.connector  
con = mysql.connector.connect(  
    host='localhost', port='3306', user='root', password='Ww2512989241.', database='zuoye'  
)
```
**参数**

- host：连接方式，localhost是本地连接
- port：端口号
- user：用户名称，默认的是root
- password：mysql的密码
- database：要连接到的库

返回值：返回一个数据对象

当我们要创建多个数据对象时，我们可以创建一个元祖，把元祖作为参数传进去。
```js
import mysql.connector  
config = {  
 'host': 'localhost',  
 'port': '3306',  
 'user': 'root',  
 'password': 'Ww2512989241.',  
 'database': 'zuoye'  
}  
con = mysql.connector.connect(**config)
```


### 游标
MySQL Connector是通过游标来执行SQL语句，而且查询的结果集也会保存在游标之中
使用实例
```js
cursor = con.cursor()
cursor.execute(sql语句)
```
我们通过之前创建的数据库对象`con`来调用游标`cursor()`对像。
如果我们想循环执行一条SQL语句，可以使用`executemany()`函数
我们来看下面的案例
```js
sql = "INSERT INTO t_dept(deptno,dname,loc) VALUES(%s,%s,%s)"
data = [[100, 'A部门', '北京'], [110, 'B部门', '上海']]
cursor.executemany(sql,data)
```
语句说明，当`data`中有多少条数据，`executemany()`就会执行多少次。上面的代码中，`data`有两条数据，函数就会执行两次。


##### 使用实例
```js
cursor = con.cursor()  
sql = "SELECT 仓库号, 城市, 面积 FROM 仓库;"  
cursor.execute(sql)     #cursor将保存查询的结果集  
for one in cursor:  
    print(one[0], one[1], one[2])
```
### 事务控制
事务的控制就是对[[事务的隔离级别]]进行操作。
```js
con.start_transaction([事务隔离级别])		//修改事务的隔离级别
con.commit()				//提交事务
con.rollback()			//回滚事务
```

### 数据库连接池
数据库连接池( Connection poo)预先创建出一些数据库连接，然后缓存起来,避免了程序语言反复创建和销毁连接昂贵代价
![[Pasted image 20211113170255.png]]
##### 语法
```js
import mysql.connector.pooling
config = {连接信息}
pool = mysql.connector.pooling.MySQLConnectionPool(
	**config,
	pool_size=连接数量
)
con=pool.get_connection()
```

## 项目开发
在项目开发中，我们会创建一个`db`包，所有更数据库有关的都放在这个包里。
![[Pasted image 20211114134949.png]]
然后我们封装的数据库方法都会封装在里面
