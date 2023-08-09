# Viewpager

Viewpager，视图翻页工具，提供了多页面切换的效果。Android3.0后引入的一个UI控件，位于v4包中。低版本使用需要导入v4包。

```java
package com.example.viewpageertest;  
  
import androidx.annotation.NonNull;  
import androidx.appcompat.app.AppCompatActivity;  
import androidx.viewpager.widget.PagerAdapter;  
import androidx.viewpager.widget.ViewPager;  
  
import android.os.Bundle;  
import android.view.View;  
import android.view.ViewGroup;  
  
import java.util.ArrayList;  
import java.util.List;  
  
public class ImageViewPagerAdapter extends AppCompatActivity {  
  
    private ViewPager mViewPager;  
 private int[] mLayoutIDs = {  
            R.layout.view_first,  
		 R.layout.view_second,  
		 R.layout.view_third  
 };  
 private List<View> views;  
  
 @Override  
 protected void onCreate(Bundle savedInstanceState) {  
 super.onCreate(savedInstanceState);  
 setContentView(R.layout.activity_image_view_adapter);  
 final int view_pager = R.id.view_pager;  
 mViewPager = (ViewPager) findViewById(view_pager);  
 // 初始化数据  
 views = new ArrayList<>();  
 for(int index = 0; index<mLayoutIDs.length;index++){  
           View inflate = getLayoutInflater().inflate(mLayoutIDs[index], null);  
		 views.add(inflate);  
 }  
        mViewPager.setAdapter(mPagerAdapter);  
 }  
//以下部分可以拆成一个类
    PagerAdapter mPagerAdapter =  new PagerAdapter(){  
        // 获取多少页  
 @Override  
 public int getCount() {  
            return mLayoutIDs.length;  
 }  
  
        @Override  
 public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {  
            return view==object;  
 }  
  
        // 把每张的视图都添加进去  
 /*参数一：  
 * 参数二：当前视图的位置  
 * */ @NonNull  
 @Override public Object instantiateItem(@NonNull ViewGroup container, int position) {  
            View child = views.get(position);// 获取视图  
 container.addView(child); // 添加视图  
 return child;  
 }  
  
        @Override  
 public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {  
            container.removeView(views.get(position)); //销毁视图  
 }  
    };  
}
```