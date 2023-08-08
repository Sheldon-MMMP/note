# ORM模型
模型准确且唯一的描述了数据。它包含您储存的数据的重要字段和行为。一般来说，每一个模型都映射一张数据库表。

基础：

-   每个模型都是一个 Python 的类，这些类继承 [`django.db.models.Model`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/instances/#django.db.models.Model "django.db.models.Model")
-   模型类的每个属性都相当于一个数据库的字段。
-   利用这些，Django 提供了一个自动生成访问数据库的 API；请参阅 [执行查询](https://docs.djangoproject.com/zh-hans/3.1/topics/db/queries/)。

**配置示例**
连接数据库
```python
DATABASES= {  
    'default':{  
       	 'ENGINE':'django.db.backends.mysql',  
		 'NAME':'mydatabase',  
		 'USER':'mydatabase_user',  
		 'PASSWORD':'mypas.sword',  
		 'HOST':'127.0.0.1',  
		 'PORT':'3306'  
 }  
}
```
**参数**
- default：默认的数据库，可配置多个数据，使用名称来区分
- ENGINE：数据库引擎
	- `'django.db.backends.mysql'`
	- `'django.db.backends.sqlite3'`
	- `'django.db.backends.postgresql'`
	- `'django.db.backends.oracle'`

- NAME：数据库名称
- USER：数据库登录用户名
- PASSWORD：数据库登录密码
- HOST：数据库访问地址
- PORT：数据库访问端口

此外，关注一下文件头部的 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 设置项。这里包括了会在你项目中启用的所有 Django 应用。应用能在多个项目中使用，你也可以打包并且发布应用，让别人使用它们。

通常， [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 默认包括了以下 Django 的自带应用：

-   [`django.contrib.admin`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/admin/#module-django.contrib.admin "django.contrib.admin: Django's admin site.") -- 管理员站点， 你很快就会使用它。
-   [`django.contrib.auth`](https://docs.djangoproject.com/zh-hans/3.1/topics/auth/#module-django.contrib.auth "django.contrib.auth: Django's authentication framework.") -- 认证授权系统。
-   [`django.contrib.contenttypes`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/contenttypes/#module-django.contrib.contenttypes "django.contrib.contenttypes: Provides generic interface to installed models.") -- 内容类型框架。
-   [`django.contrib.sessions`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/sessions/#module-django.contrib.sessions "django.contrib.sessions: Provides session management for Django projects.") -- 会话框架。
-   [`django.contrib.messages`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/messages/#module-django.contrib.messages "django.contrib.messages: Provides cookie- and session-based temporary message storage.") -- 消息框架。
-   [`django.contrib.staticfiles`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/staticfiles/#module-django.contrib.staticfiles "django.contrib.staticfiles: An app for handling static files.") -- 管理静态文件的框架。

这些应用被默认启用是为了给常规项目提供方便。
### 创建数据表
在对应包下的models.py中创建
这个样例定义了一个 `Person` 模型，拥有 `first_name` 和 `last_name`:
```python
from django.db import models
class User(models.Model):  
    name = models.CharField('姓名', max_length=64)  
    sex = models.CharField('性别', max_length=1, choices=(('1', '帅哥'), (0, '美女')), default='1')  
    age = models.PositiveIntegerField('年龄', default=0)  
    username = models.CharField('用户名', max_length=64, unique=True)  
    password = models.CharField('密码', max_length=256)  
    remark = models.CharField('备注', max_length=64, null=True, blank=True)  
    created_at = models.DateTimeField('注册时间', auto_now_add=True)  
    updated_at = models.DateTimeField('最后修改时间', auto_now=True)
```
一些技术上的说明：


-  当没有设置主键时， 一个 `id` 字段会被自动添加，但是这种行为可以被改写。请参阅 [自动设置主键](https://docs.djangoproject.com/zh-hans/3.1/topics/db/models/#automatic-primary-key-fields)。
-   本例子中 `创建数据表` 的语法是 PostgreSQL 格式的。值得注意的是，Django 依据你在 [配置文件](https://docs.djangoproject.com/zh-hans/3.1/topics/settings/) 中指定的数据库后端生成对应的 SQL 语句。

创建数据库的数据类型：
- CharField、TextField：字符串、文本
- FileField、ImageField：文件、图片
- FilePathField：文件路径
- EmailField：邮件地址
- URLField：URL地址
- IntegerField：整数
- SmallIntegerField：整数
- BigIntegerField：整数（这个三个整数的区别是范围不一样大）
- BooleanField：布尔值（1,0）
- PositiveIntegerField：正整数
- FloatField、DecimalField：小数
- DateField：日期（几月几日）
- TimeField：时间（8：00）
- DateTimeField：日期时间
**特殊类型**
- OneToOneField(to,no_delete,parent_link=False,**options)：一对一关联
- ForeignKey(to,on_delete,**options)：外键关联
- ManyToManyField(to,**options)：多对多关联
- GenericForeignKey：复合关联

**参数**
- verbose_name：大多数模型类型的第一个参数，作用是方便阅读，即：该字段的含义。
>特例：ForeignKey、ManyToManyField、OneToOneField。这些的第一个参数不是它。
- null、blank：是否为Null、空值。
- db_column：数据表中对应的字段名称，如上面定义中，我们让`name`等于数据类型，那么我们创建数据表时名字默认就会为`name`，但如果我们不想用`name`成为数据表中对应的字段名称名称，我就可以用这个参数指定字段名称
- default：指定字段默认值
- primary_key、unique：主键、唯一索引
- help_text：帮助文字
- choices：可提供选择的选项。如我们可以用1表示男，2表示女，存储在数据库中。
```python
sex=models.CharField('性别',max_length=1,choices=(('1','帅哥'),(0,'美女')))
```
- get_FOO_display()：展示choices对应的值
- max_length：最大长度，<font color='red'>CharField必须传递的参数</font>

DateTimeField的参数
- auto_now ：更新时间为记录更改时的时间
- auto_now_add：记录创建的时间


现在你的 Django 项目会包含 `accounts` 应用。接着运行下面的命令：
生成数据库修改语句。
```python
py manage.py makemigrations accounts
```
你将会看到类似于下面这样的输出：
```python
Migrations for 'accounts':
  accounts\migrations\0001_initial.py
    - Create model User

```
通过运行 `makemigrations` 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 _迁移_。

[`sqlmigrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-sqlmigrate) 命令接收一个迁移的名称，然后返回对应的 SQL：
```pythton
py manage.py sqlmigrate polls 0001
```

### 元数据的描述
使用`Meta`类来给数据表指定属性，如排序规则，表的名称等
**语法**
```python
class User(models.Model):  
	#创建的数据表的字段
	.....
	
	class Meta:				#Meta这个名称是不能更改的
		db_table='user'		#给这表指定名称叫'user'
		ordering=['age']	#按照age字段进行升序排序，如果是['-age']就是降序
```
还有：
 `abstract`[¶](https://docs.djangoproject.com/zh-hans/3.1/ref/models/options/#abstract "永久链接至标题")
如果 `abstract = True`，这个模型将是一个 [抽象基类](https://docs.djangoproject.com/zh-hans/3.1/topics/db/models/#abstract-base-classes)。


更多Meta属性详看：[Meta选项](https://docs.djangoproject.com/zh-hans/3.1/ref/models/options/#model-meta-options "永久链接至标题")


### 创建表
```python
python manage.py migrate
```
执行了这个命令后就成功的创建了表了。