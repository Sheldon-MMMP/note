# urls配置
我们每一个模块都会创建一个`urls.py`文件（创建包的时候是不存在的，需要我们手动创建）；

**配置如下**
```py
rlpatterns = [  
    path('slider/list/', views.slider_list, name="slider_list"),  
]
```
**path参数**
- 参数一：访问路径设置。
- 参数二：被访问时返回的数据（这里是views下的slider_list函数）
- 参数三：备注说明（一般和函数同名）

## 注册urls
当我们在包里创建了url，还不能使用，在主urls下进行注册

```python
urlpatterns = [  
	 path('admin/', admin.site.urls),  
	 path('system/', include('system.urls')),  
]
```
**path参数**
- 参数一：根访问路径。
- 参数二：函数include('包名.urls')，路径访问地址。