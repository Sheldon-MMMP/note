# views配置
这个文件的作用是返回数据或者视图，配合[[urls配置]]进行使用。

```python
def slider_list(request):  
    data = {  
        "meta": {},  
	   "objects": []  
    }  
    # 获取数据
    queryset = Slider.objects.filter(is_valid=True)  
    # 变量数据
    for item in queryset:  
        data['objects'].append({  
           'id': item.id,  
		 "img_url": item.img,  
		 'target_url': item.target_url,  
		 'name': item.name  
        })  
  
    return http.JsonResponse(data)
```