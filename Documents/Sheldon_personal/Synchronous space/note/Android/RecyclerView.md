# RecyclerView
[RecyclerView](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fsupport%2Fv7%2Fwidget%2FRecyclerView)是Android一个更强大的控件,其不仅可以实现和ListView同样的效果,还有优化了ListView中的各种不足。其可以实现数据纵向滚动,也可以实现横向滚动(ListView做不到横向滚动)。接下来讲解RecyclerView的用法。

## 添加RecyclerView 依赖库

在`app/build.gradle`中的`dependencies闭包`添加以下内容：

```gradle
    implementation 'com.android.support:recyclerview-v7:27.1.1'
```


## 基本使用
### 适配器
我们在使用RecyclerView需要设置一个适配器。这个适配器需要继承于`RecyclerView.Adapter<>`适配器。我们注意到，这里有个需要我们定义的泛型。这个泛型需要我们在这个类再创建一个类继承`RecyclerView.ViewHolder`，然后将这个类设置为我们的泛型。

我们还需要重写三个方法：
-   `onCreateViewHolder()`用于创建ViewHolder实例,并把加载的布局传入到构造函数去,再把ViewHolder实例返回。
-   `onBindViewHolder()`则是用于对子项的数据进行赋值,会在每个子项被滚动到屏幕内时执行。`position`得到当前项的Fruit实例。
-   `getItemCount()`返回RecyclerView的子项数目。

```java

public class MyRecyclerviewAdapter extends RecyclerView.Adapter<MyRecyclerviewAdapter.MyViewHolder> {  
  
    @NonNull  
 @androidx.annotation.NonNull @Override 
 public MyViewHolder onCreateViewHolder(@NonNull @androidx.annotation.NonNull ViewGroup parent, int viewType) {  
        return null;  
 } 
  //绑定数据
    @Override  
 public void onBindViewHolder(@NonNull @androidx.annotation.NonNull MyViewHolder holder, int position) {  
  
    }  
  // 返回数据的数量
    @Override  
 public int getItemCount() {  
        return 0;  
 }  
  
    class MyViewHolder extends RecyclerView.ViewHolder{  
  
        public MyViewHolder(View itemView) {  
            super(itemView);  
 }  
    }  
}
```

在layout视图中需要定义一个xml
```xml
<androidx.recyclerview.widget.RecyclerView  
 android:id="@+id/recycler_view"  
 android:layout_width="wrap_content"  
 android:layout_height="wrap_content"/>
```
在主函数中使用方式：
- 先定义一个`RecyclerView`对象
- 然后创建视图结构对象`LinearLayoutManager`对象
- 然后使用`setLayoutManager()`函数定义视图结构
- 然后使用`setAdapter()`定义过滤器。
```java
RecyclerView mRecyclerView = findViewById(R.id.recycler_view);  
LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);  
mRecyclerView.setLayoutManager(linearLayoutManager);  
mRecyclerView.setAdapter(myRecyclerviewAdapter);
```
**布局方式**
RecyclerView 三种内置的布局排列方式，可以通过`setLayoutManager()`函数传入不同的视图结构对象获的不同的视图结构。
- **LinearLayoutManager**：线性布局， 可以实现和ListView 类似的效果。
```java
LinearLayoutManager layoutManager = new LinearLayoutManager(this); 
recyclerView.setLayoutManager(layoutManager);
```
![[Pasted image 20220317220318.png]]
- **StaggeredGridLayoutManager**：瀑布布局。
```java
StaggeredGridLayoutManager layoutManager = new StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL);
recyclerView.setLayoutManager(layoutManager);
```
- **GridLayoutManager**： GridLayoutManager布局方式的用法也没什么特别之处，它的构造函数接收两个参数， 第一个是Context， 第二个是列数， 这里我们希望每行中有两列数据。
```java
GridLayoutManager layoutManager = new GridLayoutManager(this, 2); 
recycler_view.setLayoutManager(layoutManager);
```
![[Pasted image 20220317220432.png]]