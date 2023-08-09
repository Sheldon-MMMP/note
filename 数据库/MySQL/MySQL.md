#数据库 
# MySQL基础操作

- 启动MySQL服务：net start mysql
- 关闭MySQL服务：net stop mysql
- 查看MySQL状态：net status mysql
## MySQL的登录和退出
- 登录MySQL服务器：mysql -u root -p
- 退出MySQL：exit 或者 quit

## 创建数据库
MySQL服务器中的数据库可以有多个。

| 命令                                            | 说明                                                |
| ----------------------------------------------- | --------------------------------------------------- |
| CREATE DATABASE 数据库名称                      | 创建指定名称的数据                                  |
| CREATE DATABASE 数据库名称 CHARACTER SET 字符集 | 创建指定名称的数据,并且指定字符集（一般都指定utf8） |
| SHOW CREATE DATABASE 数据库名称                 | 查看数据库定义信息                                  |
| SHOW DATABASES                                  | 查看mysql中有哪些数据库                             |
| SELECT DATABASE()                               | 查看当前所使用的数据库                              |
| SELECT DATABASE();                              | 查找数据表                                          | 

##  数据库更改
| 命令                      | 说明       |
| ------------------------- | ---------- |
| DROP DATABASE 数据库名称  | 删除数据库 |
| ALTER DATABASE 数据库名称 CHARACTER SET utf8| 更改数据库 | 

## 常见的数据类型
| 类型    | 描述                                              |
| ------- | ------------------------------------------------- |
| int     | 整型                                              |
| double  | 浮点型                                            |
| varchar | 字符串型                                          |
| date    | 日期类型，给是为yyyy-MM-dd,只有年月日，没有时分秒 | 
```ad-warning

MySQL中的cahr类型与varchar类型，区别在于:
- char类型是==**固定长度**==的：根据定义的字符串长度分配足够的空间。如：char(10)固定占有10个字符
- varchar类型是==**可变长度**==的：只使用字符串长度所需的空间。如：varchar(10)使用了多少字符就占用多少。
```

## 创建数据表
一个数据库中可以创建多个表。
```js
	CREATE TABLE 表名(
	字段名称1 字段类型(长度),
	....
	字段名称2 字段类型 注意:最后一列不要加逗号
	)
```
创建语法：create table 表名（字段名 类型 长度 约束，注释）
```js
##判断数据库是否存在
DROP DATABASE IF EXISTS test1;
##创建数据库
CREATE DATABASE test1;
##使用数据库
USE test1;
##判断创建表是否存在
DROP TABLE IF EXISTS ts_testInfo;
##创建表
-- create table 表名（字段名 类型 长度 约束，注释）
CREATE TABLE ts_testInfo
(
test_id INT(10),
test_name CHAR(30)
)
```

创建一个表和另一个表的表结构一样
```js
CREATE TABLE 创建的表名 like	被复制的表名;
```
## 查看表

| 命令        | 说明                       |
| ----------- | -------------------------- |
| `SHOW TABLES` | 查看当前数据库中的所有表名 |
| `DESC 表名`   | 查看数据表结构             | 


## 删除表

| 命令                      | 说明               |
| ------------------------- | ------------------ |
| `DROP TABLE 表名`           | 删除数据库/表      |
| `DROP TABLE IF EXISTS 表名` | 判断是否存在再删除 |

## 修改表名
```js
rename table 旧表名 to 新表名
```
## 向表中添加列
```js
ALTER TABLE 表名 ADD 字段名称 字段类型

例：

#为分类表添加一个新的字段为 cdesc
ALTER TABLE category ADD cdesc VARCHAR(20)
```
### 更改表中列的数据类型或长度
```js
ALTER TABLE 表名 MODIFY 字段名称 字段类型
```
## 删除列
```js
ALTER TABLE 表名 DROP 列名
```
## 插入数据
```js
INSERT INTO 表名(字段名1 ，字段名2...) VALUES(字段值1,字段值2...);

例子：

#写SQL向student表中插入数据
#方式一：插入数据时，把所有字段名称全部显示写出
INSERT INTO student(sid,sname,age,sex,address) VALUES(1,"张三",18,"女","北京");
#方式二：插入全部字段，不再写字段名称了
INSERT INTO student VALUES(2,"李四",20,"男","南京");
#方式三：插入指定字段的数据
INSERT INTO student(sname,address) VALUES("王五","杭州");
```
结果

| sid  | sname | age  | se   | address |
| ---- | ----- | ---- | ---- | ------- |
| 1    | 张三  | 18   | 女   | 北京    |
| 2    | 李四  | 20   | 男   | 南京    |
| null | 王五  | null | null | 杭州    | 

## 修改数据
```js
UPDATE student SET 需要修改的数据（可以修改多个） where 条件

例如：
#修改数据
UPDATE student SET address="成都" WHERE sname="王五";
#将数据中的`address`全改成成都
UPDATE student SET address="成都";
```

## 删除数据
```js
#删除所有数据
delete from 表名

#指定条件删除数据
DELETE FROM 表名 WHERE 条件
```

```ad-note
如果要删除表中的所有数据，有两种做法
1.delete from 表名; 不推荐.有多少条记录就执行多少次删除操作.效率低
2.truncate table 表名; 推荐.先删除整张表，然后再重新创建一张一模一样的表.效率
```

## DQL查询表中数据

### 简单查询

```js
SELECT 列名 FROM 表名
```
- 列名可以是一个或多个，当多个列名时用`,`隔开。
- 用`*`所有列
#### 创建别名 关键字（as）
```js
SELECT 列名 AS `别名` FROM 表名
```

#### 查询去重 关键字（DISTINCT）
```js
SELECT DISTINCT 列名 FROM 表名
```
`DISTINCT`的作用去掉重复的数据。
#### 运算查询（查询结果参与运算）
```js
SELECT 列名+1000 FROM 表名
```
- 将列名的值进行加1000。

### 条件查询
>如果查询语句中没有设置条件，就会查询所有的行信息，在实际应用中，一定要指定查询条件，对记录进行过滤

语法格式
```js
SELECT 列名 FROM 表名 WHERE 条件表达式
```
### 运算符

| 运算符                | 说明                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| >, <, >=, <=, =, <>!= | 大于、小于、大于（小于）等于、不等于                                                                              |
| BETWEEN ...AND...     | 显示在某一区间的值 <br> 例如：2000-10000之间：BETWEEN 2000 AND 10000                                              |
| IN(集合)              | 集合表示多个值，使用逗号分隔，例如：name in (悟空，八戒)<br> in中的每个数据都会作为一次条件，只要满足条件就会显示 |
| LIKE '%张%'           | 模糊查询                                                                                                          |
| IS NULL               | 查询某一列为NULL的值，注：不能写=NULL                                                                             |
| AND,&&                | 多个条件同时成立                                                                                                  |
| OR,\|\|               | 多个条件任一成立                                                                                                  |
| NOT                   | 不成立，取反                                                                                                      |

### 列的最大值 MAX()
```js
SELECT MAX(列名称)  FROM 表名;


例：
SELECT MAX(article) AS article FROM shop;
结果：
+---------+
| article |
+---------+
|       4 |
+---------+
```

###  查找某个列的最大值的行

```js
SELECT article, dealer, price
FROM   shop
WHERE  price=(SELECT MAX(price) FROM shop);
```

###  列的最大值：按组	
作用：查找不同东西的最大值
例：每项物品的的最高价格是多少?
```js
SELECT article, MAX(price) AS price
FROM   shop
GROUP BY article

+---------+-------+
| article | price |
+---------+-------+
|    0001 |  3.99 |
|    0002 | 10.99 |
|    0003 |  1.69 |
|    0004 | 19.95 |
+---------+-------+
```