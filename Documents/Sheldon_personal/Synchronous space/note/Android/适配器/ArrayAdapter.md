## ArrayAdapter
### 简介

适配器（adapter）在android中是数据和视图（View）之间的一个桥梁，通过适配器以便于数据在view视图上显示。现在主要对ArrayAdapter、SimpleAdapter、BaseAdapter进行简单的演示。

>使用时具有局限性，默认情况下不支持imageview等非文本以外的内容，如果要显示的话需要重写getView方法。

基本使用：
1、 在布局文件中创建listview控件：
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <ListView
        android:id="@+id/listview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >
    </ListView>

</LinearLayout>
```

2、 声明数据源
```java
private String[] itemData = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15" };
```
3、 初始化适配器
```java
adapter = new ArrayAdapter<String>(ArrayAdapterActiity.this, android.R.layout.simple_expandable_list_item_1, itemData);
```
**参数**
参数一：指定上下文对象。
参数二：布局资源索引，指的是每一项数据所呈现的样式`android.R.layout.xxx`。
4、 绑定适配器
```java
listView.setAdapter(adapter);
```