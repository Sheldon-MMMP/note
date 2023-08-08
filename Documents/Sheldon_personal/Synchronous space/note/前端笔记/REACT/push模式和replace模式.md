## push模式和replace模式
这两个模式是浏览记录模式，
push模式下，进行操作是会留下痕迹的，这样方便我们可以放回上一级。
replace模式下，进行操作只会占用一条痕迹，后面的操作会不断的替换上一个操作，这样就不能返回上一级。

**语法**
```html

```

### replace（）用法：

this.props.history.replace(‘router地址’)
注：replace跳转不会形成history，不可返回到上一层。

### push（）用法

this.props.history.push(‘router地址’)
注：push跳转会形成history，可返回到上一层。
