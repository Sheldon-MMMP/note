# ORM
作用：主要实现模型对象到关系数据库数据的映射.
特性：
- 面向对像的编程思想，方便扩充
- 少写（几乎不写）SQL，提升开发效率
- 支持多种类型的数据库，方便切换

### flask-sqlalchemy安装
pip安装
```js
pip install -U Flask-SQLAlchemy
```

### 配置
#### 数据库设置
链接数据库的格式:  
```python
<协议名称>://<⽤户名>:<密码>@<ip地址>:<端⼝>/<数据库名>  
如果使⽤的是mysqldb驱动,协议名: mysql  
如果使⽤的是pymysql驱动,协议名: mysql+pymysql
```
在Flask中，既可以使用关系型数据库，还可以使用非关系型数据库。一切都可以由你自己控制。这里先拿关系型数据库入手吧。

对于关系型数据库，常见的有这么几个，sqlite3, MySQL, PostgreSQL, Oracle, MSSQL

SQLAlchemy连接数据库的时候需要一个特殊的URI（统一资源定位符）来创建数据库的连接。这个URI的是一个有特殊格式的字符串，包含了SQLAlchemy连接数据库所需要的所有信息。

```csharp
databasetype+driver://user:password@ip:port/db_name
```

从上面也可以看出，需要**driver** 的支持。当然了，这个**driver**是需要你自己手动安装好的。对于这几个数据库而言，常见的URI如下：

-   SQLite：

```csharp
sqlite:///database.db
```

-   MySQL：

```csharp
mysql+pymysql://user:password@ip:port/db_name
```

-   PostgreSQL：

```csharp
postgresql+psycopg2://user:password@ip:port/db_name
```

-   MSSQL：

```csharp
mssql+pyodbc://user:password@ip:port/db_name
```

-   Oracle：

```csharp
oracle+cx_oracle://user:password@ip:port/db_name
```
- 绑定到Flask对象
```python
db = SQLAlchemy(app)
```
- ORM模型创建
```python
class User(db.Model):
	__tablename__ = '表的名称'	#指定表名称
	id = db.Column(db.Integer,primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
```
**参数**
>id：是列名称
>db.数据类型
>primary_key：主键
>db.Foreignkey('关联地址')

当我们遇到一些数据需要一对多时，如一个用户有多个地址。
```python
addresses = db.relationship('UserAddress',backref='address',lazy=True)
```
- 创建和删除表
以下指令要在python console中执行
需要先进入`from app import db`
```python
#创建表
>>>db.create_all(bind='数据库名称')

#删除表
>>>db.drop_all()
```
由于Flask可以通过一个类对象来加载相关的配置。所以我们可以轻松的把这些配置信息，写到一个类中，这样对于代码的管理和维护都会十分的有帮助。   
比如我们可以这么写：

```python
class Config(object):    
	DEBUG = True    
	SQLALCHEMY_DATABASE_URI = "path.db" 
	# 然后可以通过下面的这行代码进行加载
	app.config.from_object(Config)
```

### 使用

在Flask中，要想使用某一个拓展，仅仅需要把flask对象当做构造参数传递给拓展类即可。

比如拓展一个管理类：

```python  
from flask.ext.script import Manager
from flask import Flask
    
app = Flask(__name__)
manager = Manager(app)
# 然后就可以使用manager对象开始对flask应用进行管理了
```

再者，拓展一个数据库：

```python
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy 
class Config(object):    
	SQLALCHEMY_DATABASE_URI = "sqlite:///test.db" 
	
app = Flask(__name__)
# 需要加载一下数据库的URI等配置信息
app.config.from_object(Config) 
	
	
# 开启对数据库的拓展
db = SQLAlchemy(app)
```

开启一个就是这么简单， 而且flask官网上有太多太多已经很完善的拓展了，可以轻松的拿来使用。

### 新增/修改数据
步骤一：构造ORM模型对象
```python
>>>user = User('admin', 'admin@example.com')
```
步骤二：添加到db.session（备注：可以添加多个对象）
```js
>>>db.session.add(user)
```
如果想要修改，将user修改，之后再执行一次。
```js
>>>user.username='zhangsan'
>>>db.session.add(user)
```
这样就可以修改数据库中的数据了。



#### 物理删除

- 物理删除
```python
#先要获取数据对象,如果已经有了，就不用执行这一步
user = User.query.filter_by(username='zhangsan').first()

#删除对象
db.session.delete(user)
```
提交到数据库。
```js
>>>db.session.commit()
```
上面所有的操作都必须要提交了才算执行成功


#### ORM查询
注意：返回结果是一个list
- 查询所有数据
```js
User.query.all()
```
- 按条件查询
```python
User.query.filter_by(username=Zhangsan")

#查询字符串最后是'三'的数据
User.query.filter(User.username.endswith('三')).all()

#排序
User.query.order_by(User.username)

#查询前10个数据
User.query.limit(10).all()

#获取第一条记录
User.query.first()

#根据主键查询
#查询主键为1的记录，主键都是不同的。
User.query.get(1)


#视图快捷函数：有则返回，无则返回404
first() vs first_or_404()
get()   vs get_or_404()
```
