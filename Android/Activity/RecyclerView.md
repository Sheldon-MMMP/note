# RecyclerView
[RecyclerView](https://so.csdn.net/so/search?q=RecyclerView&spm=1001.2101.3001.7020)是Android一个更强大的控件,其不仅可以实现和ListView同样的效果,还有优化了ListView中的各种不足。其可以实现数据纵向滚动,也可以实现横向滚动(ListView做不到横向滚动)。

使用前需要添加相应的依赖库打开app/build.gradle文件，在dependencies闭包中添加如下内容：
```java
dependencies {  
 ....
 
 compile 'com.android.support:recyclerview-v7:28.0.0'  
}

```
添加完之后记得要点击一下Sync Now来进行同步。然后修改activity_main.xml中的代码，如下所示：
```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
 xmlns:app="http://schemas.android.com/apk/res-auto"  
 xmlns:tools="http://schemas.android.com/tools"  
 android:layout_width="match_parent"  
 android:layout_height="match_parent"  
 tools:context=".MainActivity">  
  
 <android.support.v7.widget.RecyclerView android:id="@+id/recycler_view"  
 android:layout_width="match_parent"  
 android:layout_height="match_parent"/>  
  
</LinearLayout>
```
在布局中加入RecyclerView控件也是非常简单的，先为RecyclerView指定一个id，然后将宽度和高度都设置为match_parent，这样RecyclerView也就占满了整个布局的空间。
>需要注意的是，由于RecyclerView并不是内置在系统SDK当中的，所以需要把完整的包路径写出来。