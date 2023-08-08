# redirect()

作用：跳转到指定[[请求到相应#path 函数|path()]]函数中`name`参数名字绑定的链接。
### 语法
```python
from django.shortcuts import redirect
def detail(request,acticle_id):  
    if acticle_id<200:  
        #return HttpResponseRedirect('/404/')  
 		return redirect('404')  
    return HttpResponse('获取的到的id是{}'.format(acticle_id))
```
**参数**
- 404：是path函数中的name参数。