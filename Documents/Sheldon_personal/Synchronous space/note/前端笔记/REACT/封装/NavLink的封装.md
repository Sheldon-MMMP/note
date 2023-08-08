# NavLink的封装
当我们需要写很多NavLink的时候，我们需要写很多的NavLink样式，和点击样式，这样让我们写的很复杂。
这时，我们就可以对NavLink进行封装。
### 封装步骤
1. 我们创建一个NavLInk.jsx文件，然后开始封装：
```js
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MyNavLink extends Component {
    render() {
        return (
            <NavLink activeClassName='atguigu' className='list-group-item' {...this.props} />
        )
    }
}
```
页面上

```html
<MyNavLink to='/Home'>Home</MyNavLink>
```

代码解释：
在`<NavLink>`标签中，我们需要一个属性`to`来导航地址。在这里我们通过`props`将`to`属性传给`<NavLink>`，这时，我们还可以传入一些其他我们需要的数据。

你肯定会好奇，Home这个值`<NavLink>`标签没有用上呀。而且这个标签没有内容，我想要添加不同的文字怎么办。其实我们在这里通过`props.children`的方式已经传过来了，你想这时想，但是你没使用啊，还是没有添加不同的文字，其实这里已经添加了，`<NavLink>`中的`children`属性其实就是这个标签中的内容。`<NavLink children='Home'>`就等于`<NavLink>Home<NavLink>`