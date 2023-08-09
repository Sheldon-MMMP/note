# BaseExpandableListAdapter

我们可以使用该适配器为[[ExpandableListView]]里的数据进行适配。

## 使用方式
直接自定义Adapter继承BaseExpandableListAdapter.
```java
public class MyExpandableListAdapter extends BaseExpandableListAdapter{
	private String[]   classes;  
	private String[][] students;  
	private Context context;  
	View.OnClickListener ivGoToChildClickListener;  
	  //定义一个构造函数，接收数据
	public MyExpandableListAdapter(String[] classes,  
							 String[][] students,  
							 Context context,  
							 View.OnClickListener ivGoToChildClickListener) 
	{  
		 this.classes = classes;  
		 this.students = students;  
		 this.context = context;  
		 this.ivGoToChildClickListener = ivGoToChildClickListener;  
	}

	。。。
}
```

适配器是有一个抽象类，里面有很多方法需要我们进行重写
```java
// 组的数量  
@Override  
public int getGroupCount() {  
    return classes.length;  
}  
  
//某组中子项数量  
@Override  
public int getChildrenCount(int groupPosition) {  
    return students[groupPosition].length;  
}  
  
//返回某个组  
@Override  
public Object getGroup(int groupPosition) {  
    return classes[groupPosition];  
}  
// 返回某个组的某个子项  
@Override  
public Object getChild(int groupPosition, int childPosition) {  
    return students[groupPosition][childPosition];  
}  
// 返回某组的id  
@Override  
public long getGroupId(int groupPosition) {  
    return groupPosition;  
}  
// 返回某组的子项的的id  
@Override  
public long getChildId(int groupPosition, int childPosition) {  
    return childPosition;  
}  
  
@Override  
public boolean hasStableIds() {  
    return false;  
}  
  
@Override  
public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {  
    return null;  
}  
  
@Override  
public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {  
    return null;  
}  
  
@Override  
public boolean isChildSelectable(int groupPosition, int childPosition) {  
    return false;  
}
```