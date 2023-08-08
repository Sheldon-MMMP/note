# Fragment
作用：解决不同设备的分辨率问题。
## 生命周期
![[Pasted image 20220307111909.png]]

## 静态Fragment
### 使用方式
我们让一块屏幕展示两个页面

新建一个左侧碎片布局left_fragment.xml，代码如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
 android:orientation="vertical"  
 android:layout_width="match_parent"  
 android:layout_height="match_parent">  
<Button  
 android:id="@+id/button"  
 android:layout_width="wrap_content"  
 android:layout_height="wrap_content"  
 android:layout_gravity="center_horizontal"  
 android:text="Button"  
 />  
</LinearLayout>
```

然后新建右侧碎片布局right_fragment.xml，

```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
 android:orientation="vertical"  
 android:layout_width="match_parent"  
 android:background="#00ff00"  
 android:layout_height="match_parent">  
<TextView  
 android:layout_width="wrap_content"  
 android:layout_height="wrap_content"  
 android:layout_gravity="center_horizontal"  
 android:textSize="20sp"  
 android:text="This is right fragment" />  
</LinearLayout>
```
>我们将这个布局的背景色设置成了绿色，并放置了一个TextView用于显示一段文本。


接着新建一个LeftFragment类，并让它继承自Fragment。现在编写一下LeftFragment中的代码，如下所示：
>使用前：建议使用一个是support-v4库android.support.v4.app.Fragment。

```java
public class LeftFragment extends Fragment {  
    @Override  
 public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){  
        View view= inflater.inflate(R.layout.left_fragment,container,false);  
 return view;  
 }  
}
```

再新建一个和LeftFragment类一样的类。

接下来修改activity_main.xml中的代码，如下所示：
```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
 xmlns:app="http://schemas.android.com/apk/res-auto"  
 xmlns:tools="http://schemas.android.com/tools"  
 android:layout_width="match_parent"  
 android:layout_height="match_parent"  
 android:orientation="horizontal"  
 tools:context=".MainActivity">  
  
<fragment  
 android:layout_width="0dp"  
 android:layout_height="match_parent"  
 android:id="@+id/left_fragment"  
 android:name="com.example.fragmenttext.LeftFragment"  
 android:layout_weight='1'/>  
 <fragment android:layout_width="0dp"  
 android:layout_height="match_parent"  
 android:id="@+id/right_fragment"  
 android:name="com.example.fragmenttext.LeftFragment"  
 android:layout_weight='1'/>  
</LinearLayout>
```

## 动态Fragment
**动态添加碎片主要分为5步：**
1. 创建待添加的碎片实例。
2. 获取FragmentManager，在活动中可以直接通过调用`getSupportFragmentManager()`方法得到。
3. 开启一个事务，通过调用`beginTransaction()`方法开启。
4. 向容器内添加或替换碎片，一般使用`replace()`方法实现，需要传入容器的id和待添加的碎片实例。
5. 提交事务，调用`commit()`方法来完成。
```java
private void replaceFragment(Fragment fragment) {  
	 FragmentManager fragmentManager =getSupportFragmentManager();  
	 FragmentTransaction transaction = fragmentManager.beginTransaction();  
	 transaction.replace(R.id.right_layout,fragment);  
	 /*transaction.addToBackStack(null);*/
	 transaction.commit();  
}
```
如果我们在事务提交之前调用了FragmentTransaction的addToBackStack()方法，它可以接收一个名字用于描述返回栈的状态，一般传入null即可。现在重新运行程序，并点击按钮将AnotherRightFragment添加到活动中，然后按下Back键，你会发现程序并没有退出，而是回到了RightFragment界面，继续按下Back键，RightFragment界面也会消失，再次按下Back键，程序才会退出。

## Fragment和活动之间的通信
如果想要在活动中调用碎片里的方法，或者在碎片中调用活动里的方法，应该如何实现呢？为了方便碎片和活动之间进行通信，FragmentManager提供了一个类似于findViewById()的方法，专门用于从布局文件中获取碎片的实例，代码如下所示：
```java
RightFragment rightFragment = (RightFragment) getSupportFragme().findFragmentById(R.id.right_fragment);
```
调用FragmentManager的findFragmentById()方法，可以在活动中得到相应碎片的实例，然后就能轻松地调用碎片里的方法了。掌握了如何在活动中调用碎片里的方法，那在碎片中又该怎样调用活动里的方法呢？其实这就更简单了，在每个碎片中都可以通过调用getActivity()方法来得到和当前碎片相关联的活动实例，代码如下所示：
```java
MainActivity activity = (MainActivity) getActivity();
```
有了活动实例之后，在碎片中调用活动里的方法就变得轻而易举了。另外当碎片中需要使用Context对象时，也可以使用getActivity()方法，因为获取到的活动本身就是一个Context对象。