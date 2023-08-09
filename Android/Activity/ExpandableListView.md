# ExpandableListView

**和ListView的区别**
ExpandableListView是ListView的子类。而expandable 在英文中的意思是可扩展的，所以ExpandableListView就是一个可以扩展的、有层级的ListView。

ExpandableListView与ListView的区别在于，ExpandableListView 对列表项进行了分组，每个分组中又可以显示具体的子项目。就像QQ中的好友分组，我们登录QQ之后，点击联系人就会显示所有的好友分组，然后点击某个分组，就可以展示这个分组中具体的联系人，这种界面就可以用ExpandableListView 来实现。

**常用的方法和属性**
#### android:groupIndicator 和android:childIndicator

-   android:groupIndicator  
    组指示器。取值可以是任意的Drawable对象。显示在 该分组的最左侧。如果不设置的话，默认是一个向下的箭头，点击展开内容之后会变成向上的箭头。如下图：

![[Pasted image 20220316091449.png]]

-   android:childIndicator  
    子条目指示器。取值可以是任意的Drawable 对象。显示在分组中的每一个 子条目 的最左侧。没有默认图标。

#### 设置和更改indicator时的注意事项：

> **A**  
> 默认情况下，指示器会覆盖组条目内容，就向下图中的这个样子。为了避免这种情况，我们就需要手动的在布局文件中或者代码中将 组条目向右移，以保证条目内容不被覆盖。  
> 
>![[Pasted image 20220316092454.png]]


> **B**  
> 如果想取消 默认的 gropIndicator，可以将它赋值为"@null"，即：`android:groupIndicator="@null"`。这样就不会再显示groupIndicator了

> **C**  
> **替换默认indicator时，我们使用了一个selector，在编写这个selector时需要特别注意，我们用的状态是 ：**state_expanded**，这个状态在编写的时候不会自动补全，必须完全手动拼写！！**

### 主要方法及监听器

-   **collapseGroup( int position)**
    
> 收起 position 位置的分组
    
-   **expandGroup(int position)**

> 展开position位置的分组

-   **isGroupExpanded(int position)**

> 判断position位置的分组是否展开

-   **setAdapter(ExpandableListAdapter adapter)**

> 给ExpandableListView 设置适配器

-   **setOnChildClickListener(OnChildClickListener listener)**

> 设置分组中子条目的点击监听器

-   **setOnGroupClickListener(OnGroupClickListener listener)**

> 设置分组的点击监听器

-   **setOnGroupCollapseListener(OnGroupCollapseListener listener)**

> 设置分组收起的监听器

-   **setOnGroupExpandListener(OnGroupExpandListener listener)**

> 设置分组展开的监听器