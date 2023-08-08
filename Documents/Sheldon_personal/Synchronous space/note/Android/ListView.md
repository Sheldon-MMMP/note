# ListView 简介

## ListView 继承关系如下：

```swift
java.lang.Object
   ↳	android.view.View
 	   ↳	android.view.ViewGroup
 	 	   ↳	android.widget.AdapterView<android.widget.ListAdapter>
 	 	 	   ↳	android.widget.AbsListView
 	 	 	 	   ↳	android.widget.ListView
复制代码
```

## ListView 常用XML属性

##### ListView XML常用属性如下：

1.  `android:divider`
2.  `android:dividerHeight`
3.  `android:entries`
4.  `android:footerDividersEnabled`
5.  `android:headerDividersEnabled`

# 1.ListView主要使用方法如下：

`ListView` 常用来显示同分类数据，常用使用方法如下：

## 1. 准备数据源

```ini
    List mAddHeaderFooterList = new ArrayList<String>();
```

## 2.将数据源添加到适配器中

```arduino
        ArrayAdapter adapter = new ArrayAdapter<String>(this, 
                               android.R.layout.simple_list_item_1, mAddHeaderFooterList);

```

## 3. 将适配器中的数据添加到ListView 中

```ini
        mListView.setAdapter(adapter);
```

# 2. 使用android:entries 为ListView准备数据

-   实现效果如下

![android:entries](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371ea69147c~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下 在`Listview`标签中直接用数组为`ListView`填充数据 `entries` 属性使用方法:

```ini
    <ListView
        android:id="@+id/lv_entries"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:divider="@android:color/darker_gray"
        android:dividerHeight="2dp"
        android:visibility="gone"
        android:entries="@array/citys" />
复制代码
```

-   填充数据如下 `array` 数组资源

```typescript
    <string-array name="citys">
        <item>北京</item>
        <item>上海</item>
        <item>广州</item>
        <item>深圳</item>
        <item>郑州</item>
        <item>成都</item>
    </string-array>
复制代码
```

# 3. 使用List 为ListView 准备数据

-   实现效果如下

![ListView](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371eac6771b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   部分实现代码如下：

```scss
	public void ListViewArrayList(View view) {

		ClearAllView();
		mListViewArray.setVisibility(View.VISIBLE);
		// 1.准备数据源
		final String[] citys = getResources().getStringArray(R.array.citys);
		// 2.将数据源加载到适配器中
		// ArrayAdapter adapter = new ArrayAdapter<String>(ListViewMethods.this,
		// android.R.layout.simple_expandable_list_item_1, citys);
		// 3.将适配器中的数据加载到ListView控件中

		mArrayList = Arrays.asList(citys);
		ArrayAdapter adapter = new ArrayAdapter<String>(ListViewMethods.this,
				android.R.layout.simple_expandable_list_item_1, mArrayList);

		mListViewArray.setAdapter(adapter);

	}
复制代码
```

# 4. 为ListView 添加头，尾，以及空布局

-   实现效果如下

![ListView添加头 尾 空布局](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371ead0d531~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   主要方法如下：

## 1. 添加头布局方法

```scss
ListView.addHeaderView(View)
复制代码
```

## 2.添加尾布局方法

```scss
ListView.addFooterView(View)
复制代码
```

## 3. ListView数据为空时， 设置空布局方法

```scss
ListView.setEmptyView(View)
复制代码
```

-   效果图实现代码如下

```ini

	public void ListViewHAddHeaderFooter(View view) {
		ClearAllView();
		mListAddHeadFooter.setVisibility(View.VISIBLE);

		// 准备数据源
		mAddHeaderFooterList = new ArrayList<String>();

		for (int i = 0; i < 6; i++) {
			mAddHeaderFooterList.add("测试" + i);
		}
		// 将数据源添加到适配器中
		final ArrayAdapter adapter = new ArrayAdapter<String>(
				ListViewMethods.this, android.R.layout.simple_list_item_1,
				mAddHeaderFooterList);
		// 添加listview 头
		imageHeader = new ImageView(this);
		imageHeader.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		imageHeader.setImageResource(R.drawable.gril);
		imageHeader.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				int index = mAddHeaderFooterList.size();
				for (int i = index; i < index + 20; i++) {
					mAddHeaderFooterList.add("加载更多数据内容" + i);
				}
				adapter.notifyDataSetChanged();
			}
		});
		mListAddHeadFooter.addHeaderView(imageHeader);

		// 添加listview 尾
		btnFooter = new Button(this);
		btnFooter.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		btnFooter.setText("点击加载更多");
		btnFooter.setOnClickListener(new View.OnClickListener() {

			public void onClick(View v) {
				int index = mAddHeaderFooterList.size();
				for (int i = index; i < index + 20; i++) {
					mAddHeaderFooterList.add("加载更多" + i);
				}
				adapter.notifyDataSetChanged();
			}
		});
		mListAddHeadFooter.addFooterView(btnFooter);

		TextView tv = new TextView(this);
		tv.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		tv.setText("数据为空");
		mListAddHeadFooter.setEmptyView(tv);

		// 将适配器中的数据添加到ListView 中
		mListAddHeadFooter.setAdapter(adapter);
	}

复制代码
```

# 5. 使用SimpleAdapter 为Listview 适配图文

-   实现效果如下

![SimpleAdapter](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371eae8c09f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下

```arduino

	public void ListViewSimpleAdapter(View view) {
		ClearAllView();
		mListViewSimple.setVisibility(View.VISIBLE);
		int[] images = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril, };

		mSimpleList = new ArrayList<Object>();
		// 准备数据
		for (int i = 0; i < images.length; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("img", images[i]);
			map.put("text", "item" + i);
			mSimpleList.add(map);
		}

		/**
		 * 将数据源的数据加载到适配器中 SimpleAdapter context: 上下文对象 data：表示加载到适配器中的数据对象
		 * resource： 表示adapter控件中每项资源id from:表示数据源map 中key 的数组，表示key指定的值
		 * to：表示需要展示对应数据的控件资源id
		 * 
		 * 通过from 和to的对应，将from 中key值对应的数据指定的显示到to 指定资源id的控件中
		 * 
		 * **/

		SimpleAdapter adapter = new SimpleAdapter(ListViewMethods.this,
				mSimpleList, R.layout.listview_item_img_tv, new String[] {
						"img", "text" }, new int[] { R.id.img, R.id.tv });
		// 将适配器中的数据添加到控件中
		mListViewSimple.setAdapter(adapter);
	}

复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/img"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:gravity="center_vertical"
        android:src="@drawable/ic_launcher" />

    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:textColor="@android:color/darker_gray"
        android:text="test"
        android:gravity="center_vertical"
        android:textSize="25sp" />
</LinearLayout>
复制代码
```

# 6. 使用BaseAdapter 为Listview适配图文

-   实现效果如下

![BaseAdapter](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371f09f88ac~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-实现代码如下

```ini

	public void ListViewBaseAdapter(View view) {
		ClearAllView();
		mListViewBase.setVisibility(View.VISIBLE);

		mBaseAdapterList = new ArrayList<Map<String, Object>>();
		int[] images = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril, };

		for (int i = 0; i < images.length; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("img", images[i]);
			map.put("text", "数据" + i);
			mBaseAdapterList.add(map);
		}

		MyBaseAdapter adapter = new MyBaseAdapter();
		mListViewBase.setAdapter(adapter);

	}

复制代码
```

自定义适配器实现的方法

```csharp

	class MyBaseAdapter extends BaseAdapter {

		// 当前适配器中加载数据的总条目
		@Override
		public int getCount() {
			return mBaseAdapterList.size();
		}

		// 根据指定下标获取对应item 的view
		@Override
		public Object getItem(int position) {
			return mBaseAdapterList.get(position);
		}

		// 根据指定下标获取当前item的id
		@Override
		public long getItemId(int position) {
			return position;
		}

		/**
		 * 获取适配器控件中的View对象，得到用于展示数据的视图 int position,：当前item的下标 View convertView,
		 * 表示可复用的View ViewGroup parent 当前绘制的item 所属的listview
		 */

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			// 表示第一次运行创建，否则复用view
			if (convertView == null) {

				convertView = LayoutInflater.from(ListViewMethods.this)
						.inflate(R.layout.listview_item_img_tv, null);
				mHolder = new Holder();
				mHolder.tv = (TextView) convertView.findViewById(R.id.tv);
				mHolder.img = (ImageView) convertView.findViewById(R.id.img);
				convertView.setTag(mHolder);

			} else {
				// 进行复用
				mHolder = (Holder) convertView.getTag();
			}

			mHolder.tv.setText((String) mBaseAdapterList.get(position).get(
					"text"));
			mHolder.img.setImageResource((Integer) mBaseAdapterList.get(
					position).get("img"));

			return convertView;
		}
	}

	class Holder {
		public TextView tv;
		public ImageView img;

	}
复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/img"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:gravity="center_vertical"
        android:src="@drawable/ic_launcher" />

    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:textColor="@android:color/darker_gray"
        android:text="test"
        android:gravity="center_vertical"
        android:textSize="25sp" />
</LinearLayout>
复制代码
```

# 7. ListView 分类显示

-   实现效果如下：

![ListView 分类显示](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371f0af7772~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下：

```ini

	public void ListViewTypeBaseAdapter(View view) {
		ClearAllView();
		mListViewType.setVisibility(View.VISIBLE);

		MyTypeBaseAdapter myTypeBaseAdapter = new MyTypeBaseAdapter();
		mListViewType.setAdapter(myTypeBaseAdapter);

	}

	class MyTypeBaseAdapter extends BaseAdapter {
		private String[] tittles = { "分类一 :水果", "分类二 ：蔬菜" };
		private String[] mTypeOneList = { "苹果", "香蕉", "梨", "西瓜", "菠萝" };
		private String[] mTypeTwoList = { "番茄", "土豆", "大葱", "辣椒", "莲藕", "白菜",
				"萝卜", "豆角", "芹菜", "茄子" };
		int[] typeOneImages = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril };
		int[] typeTwoImages = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril };

		@Override
		public int getCount() {
			return mTypeOneList.length + mTypeTwoList.length + 2;
		}

		@Override
		public Object getItem(int position) {
			if (position == 0 || position == mTypeOneList.length + 1) {
				return 0;
			} else {
				if (position < mTypeOneList.length + 1) {
					return mTypeOneList[position];
				} else {
					return mTypeTwoList[position - mTypeOneList.length - 2];
				}

			}
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			int mode = getItemViewType(position);
			if (mode == 0) {
				ViewTitleHolder holder = null;
				if (convertView == null) {
					convertView = View.inflate(getApplicationContext(),
							R.layout.listview_type_tv, null);
					holder = new ViewTitleHolder();
					holder.textView = (TextView) convertView
							.findViewById(R.id.tv);
					convertView.setTag(holder);
				} else {
					holder = (ViewTitleHolder) convertView.getTag();
				}

				if (position == 0) {
					holder.textView.setText(tittles[position]);
				} else {
					holder.textView.setText(tittles[1]);
				}

				return convertView;

			} else {
				ViewHolder holder = null;
				if (convertView == null) {
					convertView = View.inflate(getApplicationContext(),
							R.layout.listview_item_img_tv, null);
					holder = new ViewHolder();
					holder.imageView = (ImageView) convertView
							.findViewById(R.id.img);
					holder.textView = (TextView) convertView
							.findViewById(R.id.tv);

					convertView.setTag(holder);
				} else {
					holder = (ViewHolder) convertView.getTag();
				}
				if (position < mTypeOneList.length + 1) {
					holder.textView.setText(mTypeOneList[position - 1]);
					holder.imageView
							.setImageResource(typeOneImages[position - 1]);
				} else {
					holder.textView.setText(mTypeTwoList[position
							- mTypeOneList.length - 2]);
					holder.imageView.setImageResource(typeTwoImages[position
							- mTypeOneList.length - 2]);
				}

				return convertView;
			}

		}

		@Override
		public int getItemViewType(int position) {
			if (position == 0 || position == mTypeOneList.length + 1) {
				return 0;
			} else {
				return 1;
			}
		}

		@Override
		public int getViewTypeCount() {
			return super.getViewTypeCount() + 1;
		}
	}

	static class ViewHolder {
		ImageView imageView;
		TextView textView;

	}

	static class ViewTitleHolder {
		TextView textView;
	}
复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical" >
    <TextView
        android:id="@+id/tv"
        android:background="@android:color/darker_gray"
        android:padding="5dp"
        android:paddingLeft="10dp"
        android:textSize="16sp"
        android:textColor="@android:color/white"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
```

  

作者：程序员Android  
链接：https://juejin.cn/post/6844903911401193479  
来源：稀土掘金  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。# ListView 简介

## ListView 继承关系如下：

```swift
java.lang.Object
   ↳	android.view.View
 	   ↳	android.view.ViewGroup
 	 	   ↳	android.widget.AdapterView<android.widget.ListAdapter>
 	 	 	   ↳	android.widget.AbsListView
 	 	 	 	   ↳	android.widget.ListView
复制代码
```

## ListView 常用XML属性

#####ListView XML常用属性如下：

1.  `android:divider`
2.  `android:dividerHeight`
3.  `android:entries`
4.  `android:footerDividersEnabled`
5.  `android:headerDividersEnabled`

# 1.ListView主要使用方法如下：

`ListView` 常用来显示同分类数据，常用使用方法如下：

## 1. 准备数据源

```ini
    List mAddHeaderFooterList = new ArrayList<String>();
复制代码
```

## 2.将数据源添加到适配器中

```arduino
        ArrayAdapter adapter = new ArrayAdapter<String>(this, 
                               android.R.layout.simple_list_item_1, mAddHeaderFooterList);
复制代码
```

## 3. 将适配器中的数据添加到ListView 中

```ini
        mListView.setAdapter(adapter);
复制代码
```

# 2. 使用android:entries 为ListView准备数据

-   实现效果如下

![android:entries](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371ea69147c~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下 在`Listview`标签中直接用数组为`ListView`填充数据 `entries` 属性使用方法:

```ini
    <ListView
        android:id="@+id/lv_entries"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:divider="@android:color/darker_gray"
        android:dividerHeight="2dp"
        android:visibility="gone"
        android:entries="@array/citys" />
复制代码
```

-   填充数据如下 `array` 数组资源

```typescript
    <string-array name="citys">
        <item>北京</item>
        <item>上海</item>
        <item>广州</item>
        <item>深圳</item>
        <item>郑州</item>
        <item>成都</item>
    </string-array>
复制代码
```

# 3. 使用List 为ListView 准备数据

-   实现效果如下

![ListView](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371eac6771b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   部分实现代码如下：

```scss
	public void ListViewArrayList(View view) {

		ClearAllView();
		mListViewArray.setVisibility(View.VISIBLE);
		// 1.准备数据源
		final String[] citys = getResources().getStringArray(R.array.citys);
		// 2.将数据源加载到适配器中
		// ArrayAdapter adapter = new ArrayAdapter<String>(ListViewMethods.this,
		// android.R.layout.simple_expandable_list_item_1, citys);
		// 3.将适配器中的数据加载到ListView控件中

		mArrayList = Arrays.asList(citys);
		ArrayAdapter adapter = new ArrayAdapter<String>(ListViewMethods.this,
				android.R.layout.simple_expandable_list_item_1, mArrayList);

		mListViewArray.setAdapter(adapter);

	}
复制代码
```

# 4. 为ListView 添加头，尾，以及空布局

-   实现效果如下

![ListView添加头 尾 空布局](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371ead0d531~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   主要方法如下：

## 1. 添加头布局方法

```scss
ListView.addHeaderView(View)
复制代码
```

## 2.添加尾布局方法

```scss
ListView.addFooterView(View)
复制代码
```

## 3. ListView数据为空时， 设置空布局方法

```scss
ListView.setEmptyView(View)
复制代码
```

-   效果图实现代码如下

```ini

	public void ListViewHAddHeaderFooter(View view) {
		ClearAllView();
		mListAddHeadFooter.setVisibility(View.VISIBLE);

		// 准备数据源
		mAddHeaderFooterList = new ArrayList<String>();

		for (int i = 0; i < 6; i++) {
			mAddHeaderFooterList.add("测试" + i);
		}
		// 将数据源添加到适配器中
		final ArrayAdapter adapter = new ArrayAdapter<String>(
				ListViewMethods.this, android.R.layout.simple_list_item_1,
				mAddHeaderFooterList);
		// 添加listview 头
		imageHeader = new ImageView(this);
		imageHeader.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		imageHeader.setImageResource(R.drawable.gril);
		imageHeader.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				int index = mAddHeaderFooterList.size();
				for (int i = index; i < index + 20; i++) {
					mAddHeaderFooterList.add("加载更多数据内容" + i);
				}
				adapter.notifyDataSetChanged();
			}
		});
		mListAddHeadFooter.addHeaderView(imageHeader);

		// 添加listview 尾
		btnFooter = new Button(this);
		btnFooter.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		btnFooter.setText("点击加载更多");
		btnFooter.setOnClickListener(new View.OnClickListener() {

			public void onClick(View v) {
				int index = mAddHeaderFooterList.size();
				for (int i = index; i < index + 20; i++) {
					mAddHeaderFooterList.add("加载更多" + i);
				}
				adapter.notifyDataSetChanged();
			}
		});
		mListAddHeadFooter.addFooterView(btnFooter);

		TextView tv = new TextView(this);
		tv.setLayoutParams(new AbsListView.LayoutParams(
				ViewGroup.LayoutParams.MATCH_PARENT,
				ViewGroup.LayoutParams.WRAP_CONTENT));
		tv.setText("数据为空");
		mListAddHeadFooter.setEmptyView(tv);

		// 将适配器中的数据添加到ListView 中
		mListAddHeadFooter.setAdapter(adapter);
	}

复制代码
```

# 5. 使用SimpleAdapter 为Listview 适配图文

-   实现效果如下

![SimpleAdapter](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371eae8c09f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下

```arduino

	public void ListViewSimpleAdapter(View view) {
		ClearAllView();
		mListViewSimple.setVisibility(View.VISIBLE);
		int[] images = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril, };

		mSimpleList = new ArrayList<Object>();
		// 准备数据
		for (int i = 0; i < images.length; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("img", images[i]);
			map.put("text", "item" + i);
			mSimpleList.add(map);
		}

		/**
		 * 将数据源的数据加载到适配器中 SimpleAdapter context: 上下文对象 data：表示加载到适配器中的数据对象
		 * resource： 表示adapter控件中每项资源id from:表示数据源map 中key 的数组，表示key指定的值
		 * to：表示需要展示对应数据的控件资源id
		 * 
		 * 通过from 和to的对应，将from 中key值对应的数据指定的显示到to 指定资源id的控件中
		 * 
		 * **/

		SimpleAdapter adapter = new SimpleAdapter(ListViewMethods.this,
				mSimpleList, R.layout.listview_item_img_tv, new String[] {
						"img", "text" }, new int[] { R.id.img, R.id.tv });
		// 将适配器中的数据添加到控件中
		mListViewSimple.setAdapter(adapter);
	}

复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/img"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:gravity="center_vertical"
        android:src="@drawable/ic_launcher" />

    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:textColor="@android:color/darker_gray"
        android:text="test"
        android:gravity="center_vertical"
        android:textSize="25sp" />
</LinearLayout>
复制代码
```

# 6. 使用BaseAdapter 为Listview适配图文

-   实现效果如下

![BaseAdapter](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371f09f88ac~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-实现代码如下

```ini

	public void ListViewBaseAdapter(View view) {
		ClearAllView();
		mListViewBase.setVisibility(View.VISIBLE);

		mBaseAdapterList = new ArrayList<Map<String, Object>>();
		int[] images = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril, };

		for (int i = 0; i < images.length; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("img", images[i]);
			map.put("text", "数据" + i);
			mBaseAdapterList.add(map);
		}

		MyBaseAdapter adapter = new MyBaseAdapter();
		mListViewBase.setAdapter(adapter);

	}

复制代码
```

自定义适配器实现的方法

```csharp

	class MyBaseAdapter extends BaseAdapter {

		// 当前适配器中加载数据的总条目
		@Override
		public int getCount() {
			return mBaseAdapterList.size();
		}

		// 根据指定下标获取对应item 的view
		@Override
		public Object getItem(int position) {
			return mBaseAdapterList.get(position);
		}

		// 根据指定下标获取当前item的id
		@Override
		public long getItemId(int position) {
			return position;
		}

		/**
		 * 获取适配器控件中的View对象，得到用于展示数据的视图 int position,：当前item的下标 View convertView,
		 * 表示可复用的View ViewGroup parent 当前绘制的item 所属的listview
		 */

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			// 表示第一次运行创建，否则复用view
			if (convertView == null) {

				convertView = LayoutInflater.from(ListViewMethods.this)
						.inflate(R.layout.listview_item_img_tv, null);
				mHolder = new Holder();
				mHolder.tv = (TextView) convertView.findViewById(R.id.tv);
				mHolder.img = (ImageView) convertView.findViewById(R.id.img);
				convertView.setTag(mHolder);

			} else {
				// 进行复用
				mHolder = (Holder) convertView.getTag();
			}

			mHolder.tv.setText((String) mBaseAdapterList.get(position).get(
					"text"));
			mHolder.img.setImageResource((Integer) mBaseAdapterList.get(
					position).get("img"));

			return convertView;
		}
	}

	class Holder {
		public TextView tv;
		public ImageView img;

	}
复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/img"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:gravity="center_vertical"
        android:src="@drawable/ic_launcher" />

    <TextView
        android:id="@+id/tv"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dp"
        android:textColor="@android:color/darker_gray"
        android:text="test"
        android:gravity="center_vertical"
        android:textSize="25sp" />
</LinearLayout>
复制代码
```

# 7. ListView 分类显示

-   实现效果如下：

![ListView 分类显示](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c85371f0af7772~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

-   实现代码如下：

```ini

	public void ListViewTypeBaseAdapter(View view) {
		ClearAllView();
		mListViewType.setVisibility(View.VISIBLE);

		MyTypeBaseAdapter myTypeBaseAdapter = new MyTypeBaseAdapter();
		mListViewType.setAdapter(myTypeBaseAdapter);

	}

	class MyTypeBaseAdapter extends BaseAdapter {
		private String[] tittles = { "分类一 :水果", "分类二 ：蔬菜" };
		private String[] mTypeOneList = { "苹果", "香蕉", "梨", "西瓜", "菠萝" };
		private String[] mTypeTwoList = { "番茄", "土豆", "大葱", "辣椒", "莲藕", "白菜",
				"萝卜", "豆角", "芹菜", "茄子" };
		int[] typeOneImages = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril };
		int[] typeTwoImages = { R.drawable.gril, R.drawable.ic_launcher,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.gril, R.drawable.ic_launcher, R.drawable.gril,
				R.drawable.ic_launcher, R.drawable.gril };

		@Override
		public int getCount() {
			return mTypeOneList.length + mTypeTwoList.length + 2;
		}

		@Override
		public Object getItem(int position) {
			if (position == 0 || position == mTypeOneList.length + 1) {
				return 0;
			} else {
				if (position < mTypeOneList.length + 1) {
					return mTypeOneList[position];
				} else {
					return mTypeTwoList[position - mTypeOneList.length - 2];
				}

			}
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			int mode = getItemViewType(position);
			if (mode == 0) {
				ViewTitleHolder holder = null;
				if (convertView == null) {
					convertView = View.inflate(getApplicationContext(),
							R.layout.listview_type_tv, null);
					holder = new ViewTitleHolder();
					holder.textView = (TextView) convertView
							.findViewById(R.id.tv);
					convertView.setTag(holder);
				} else {
					holder = (ViewTitleHolder) convertView.getTag();
				}

				if (position == 0) {
					holder.textView.setText(tittles[position]);
				} else {
					holder.textView.setText(tittles[1]);
				}

				return convertView;

			} else {
				ViewHolder holder = null;
				if (convertView == null) {
					convertView = View.inflate(getApplicationContext(),
							R.layout.listview_item_img_tv, null);
					holder = new ViewHolder();
					holder.imageView = (ImageView) convertView
							.findViewById(R.id.img);
					holder.textView = (TextView) convertView
							.findViewById(R.id.tv);

					convertView.setTag(holder);
				} else {
					holder = (ViewHolder) convertView.getTag();
				}
				if (position < mTypeOneList.length + 1) {
					holder.textView.setText(mTypeOneList[position - 1]);
					holder.imageView
							.setImageResource(typeOneImages[position - 1]);
				} else {
					holder.textView.setText(mTypeTwoList[position
							- mTypeOneList.length - 2]);
					holder.imageView.setImageResource(typeTwoImages[position
							- mTypeOneList.length - 2]);
				}

				return convertView;
			}

		}

		@Override
		public int getItemViewType(int position) {
			if (position == 0 || position == mTypeOneList.length + 1) {
				return 0;
			} else {
				return 1;
			}
		}

		@Override
		public int getViewTypeCount() {
			return super.getViewTypeCount() + 1;
		}
	}

	static class ViewHolder {
		ImageView imageView;
		TextView textView;

	}

	static class ViewTitleHolder {
		TextView textView;
	}
复制代码
```

-   使用的item 布局如下

```ini
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical" >
    <TextView
        android:id="@+id/tv"
        android:background="@android:color/darker_gray"
        android:padding="5dp"
        android:paddingLeft="10dp"
        android:textSize="16sp"
        android:textColor="@android:color/white"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
```
