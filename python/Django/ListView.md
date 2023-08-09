# ListView
经常有从数据库中获取一批数据，然后在前端以列表的形式展现，比如：获取到所有的用户，然后在用户列表页面展示。

**作用：分页技术**

## 使用方式
这样能够解决问题，但是Django针对这种常用场景，提供了一个更快速便捷的方式，那就是`ListView`，用法如下：

**第一步继承`ListView`**
```python
from django.views.generic import ListView

class UsersView(ListView):

    model = UserProfile
    template_name = 'talks/users_list.html'
    context_object_name = 'user_list'
```
**第二步：重写get_queryset方法**

获取所有is_deleted为False的用户，并且以时间倒序返回数据
```python
 return UserProfile.objects.filter(is_deleted=False).order_by('-create_time')
```
如果你要对数据做更多维度的过滤，比如：既要用户是某部门的，还只要获取到性别是男的，这时候，可以使用Django提供的Q函数来实现。