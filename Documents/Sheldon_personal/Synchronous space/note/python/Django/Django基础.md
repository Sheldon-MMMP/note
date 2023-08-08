# Django基础
## 创建项目

如果这是你第一次使用 Django 的话，你需要一些初始化设置。也就是说，你需要用一些自动生成的代码配置一个 Django project —— 即一个 Django 项目实例需要的设置项集合，包括数据库配置、Django 配置和应用程序配置。

打开命令行，`cd` 到一个你想放置你代码的目录，然后运行以下命令：
```cmd
 django-admin startproject mysite
```
这行代码将会在当前目录下创建一个 `mysite` 目录。如果命令失败了，查看 [运行 django-admin 时遇到的问题](https://docs.djangoproject.com/zh-hans/3.1/faq/troubleshooting/#troubleshooting-django-admin)，可能能给你提供帮助。

```ad-warning
你得避免使用 Python 或 Django 的内部保留字来命名你的项目。具体地说，你得避免使用像 `django` (会和 Django 自己产生冲突)或 `test` (会和 Python 的内置组件产生冲突)这样的名字。
````
我的代码该放在哪？

如果你曾经是原生 PHP 程序员（没有使用过现代框架），你可能会习惯于把代码放在 Web 服务器的文档根目录(诸如 `/var/www`)。当使用 Django 时不需要这样做。把所有 Python 代码放在 Web 服务器的根目录不是个好主意，因为这样会有风险。比如会提高人们在网站上看到你的代码的可能性。这不利于网站的安全。

把你的代码放在文档根目录 **以外** 的某些地方吧，比如 /home/mycode。

让我们看看 [`startproject`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-startproject) 创建了些什么:
```
mysite/
	- manage.py
	- mysite/
			- __init__.py
			-  settings.py
			- urls.py
			- asgi.py
			- wsgi.py
```
这些目录和文件的用处是：

-   最外层的 `mysite/` 根目录只是你项目的容器， 根目录名称对 Django 没有影响，你可以将它重命名为任何你喜欢的名称。
-   `manage.py`: 一个让你用各种方式管理 Django 项目的命令行工具。你可以阅读 [django-admin 和 manage.py](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/) 获取所有 `manage.py` 的细节。
-   里面一层的 `mysite/` 目录包含你的项目，它是一个纯 Python 包。它的名字就是当你引用它内部任何东西时需要用到的 Python 包名。 (比如 `mysite.urls`).
-   `mysite/__init__.py`：一个空文件，告诉 Python 这个目录应该被认为是一个 Python 包。如果你是 Python 初学者，阅读官方文档中的 [更多关于包的知识](https://docs.python.org/3/tutorial/modules.html#tut-packages "(在 Python v3.9)")。
-   `mysite/settings.py`：Django 项目的配置文件。如果你想知道这个文件是如何工作的，请查看 [Django 配置](https://docs.djangoproject.com/zh-hans/3.1/topics/settings/) 了解细节。
-   `mysite/urls.py`：Django 项目的 URL 声明，就像你网站的“目录”。阅读 [URL调度器](https://docs.djangoproject.com/zh-hans/3.1/topics/http/urls/) 文档来获取更多关于 URL 的内容。
-   `mysite/asgi.py`：作为你的项目的运行在 ASGI 兼容的 Web 服务器上的入口。阅读 [如何使用 ASGI 来部署](https://docs.djangoproject.com/zh-hans/3.1/howto/deployment/asgi/) 了解更多细节。
-   `mysite/wsgi.py`：作为你的项目的运行在 WSGI 兼容的Web服务器上的入口。阅读 [如何使用 WSGI 进行部署](https://docs.djangoproject.com/zh-hans/3.1/howto/deployment/wsgi/) 了解更多细节。


## 创建模块
现在你的开发环境——这个“项目” ——已经配置好了，你可以开始干活了。

在 Django 中，每一个应用都是一个 Python 包，并且遵循着相同的约定。Django 自带一个工具，可以帮你生成应用的基础目录结构，这样你就能专心写代码，而不是创建目录了。
**创建一个模块**：
```python
py manage.py startapp polls
```
`polls`是文件名，根据项目的不同可以取不同的名字

这将会创建一个 `polls` 目录，它的目录结构大致如下：
```
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```
这个文件里缺少了一个URL映射，我们需要一个URL映射到它

我们创建完成后，需要给他创建应用对象，怎么配置呢？
我们找到`settings.py`文件中的`INSTALLED_APPS`配置项，然后我们添加polls的应用文件如下：
```python
INSTALLED_APPS = [
 'polls.apps.PollsConfig',  	#配置的polls应用
 'django.contrib.admin',  
 'django.contrib.auth',  
 'django.contrib.contenttypes',  
 'django.contrib.sessions',  
 'django.contrib.messages',  
 'django.contrib.staticfiles',  
]
```
可以通过下面的代码检查是否配置正确，也可以检查[[ORM模型]]是否正确是否正确
```python
python manage.py check
```


### 服务器的启动流程
**启动服务器**
```python
python manage.py runserver

python manage.py runserver 9527
```
还可以在后面加入端口号，指定端口，我们将端口号改成了`9527`默认端口是`localhost:8000`
如果想要局域网都可以访问它话
```
python manage.py runserver 0:8000
```
>**0** 是 **0.0.0.0** 的简写

创建数据库：[[ORM模型]]

视图的创建：[[请求到相应]]