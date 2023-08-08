# draggable
## 前面的话

　　拖放(drag-and-drop,DnD)其实是两个动作——拖和放。所以，它涉及到两个元素。一个是被拖的元素，称为拖放源；另一个是要放的目标，称为拖放目标。本文将通过拆分这两个概念来详细介绍原生拖放

### 拖放源
- 什么样的元素才是拖放源呢？
- HTML5为所有HTML元素规定了一个draggable属性，表示元素是否可以拖动
- 图像和链接的draggable属性自动被设置成了true，而其他元素这个属性的默认值都是false
- [注意]必须设置draggable='true'才能生效，只设置draggable不起作用
- 默认情况下，文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。而其他元素则无法被拖放

**实例：** 可以对下面的元素进行拖动，这就是上面的代码
```html
<input value="文字可拖动">
<a href="#">链接可拖动</a>
<div id="test" style="height:30px;width:300px;background:pink;">元素不可拖动</div
```


>
><input value="文字可拖动">
><a href="#">链接可拖动</a>
><div id="test" style="height:30px;width:300px;background:pink;">元素不可拖动</div>


当为元素设置`draggable`属性后，普通元素也可以拖动
```html
<div draggable="true" style="height:30px;width:100px;background:pink;"></div>
```
下面的方块设置了`draggable`，可以拖动

<div draggable="true" style="height:30px;width:100px;background:pink;"></div>

下面的方块没有设置了`draggable`，无法拖动

<div style="height:30px;width:100px;background:pink;"></div>


**兼容**

　　IE9-浏览器不支持draggable属性，但可通过mousedown事件处理程序调用dragDrop()方法来实现拖动效果
  
```js
<div id="test" style="height:30px;width:300px;background:pink;"></div>    


<script> 
test.onmousedown = function(){ 
	this.dragDrop();
} 
</script>
```

#### 拖放事件

　　拖放源涉及到3个拖放事件。拖动拖放源时，依次触发dragstart、drag和dragend这3个事件

**dragstart**

　　按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发dragstart事件。此时光标变成“不能放”符号(圆环中有一条反斜线)，表示不能把元素放到自己上面

**drag**

　　触发dragstart事件后，随即会触发drag事件，而且在元素被拖动期间会持续触发该事件

**dragend**

　　当拖动停止时(无论是把元素放到了有效的放置目标，还是放到了无效的放置目标上)，会触发dragend事件


#### 拖放目标

　　拖放目标是指被拖动的元素松开鼠标时被放置的目标

　　拖放源被拖动到拖放目标上时，将依次触发dragenter、dragover和dragleave或drop这四个事件

**dragenter**

　　只要有元素被拖动到放置目标上，触发dragenter事件

**dragover**

　　被拖动的元素在放置目标的范围内移动时，持续触发dragover事件

**dragleave**

　　如果元素被拖出了放置目标，触发dragleave事件

**drop**

　　如果元素被放到了放置目标中，触发drop事件
```ad-warning
　　[注意]firefox浏览器的drop事件的默认行为是打开被放到放置目标上的URL。为了让firefox支持正常的拖放，还要取消drop事件的默认行为
````
　　默认情况下，目标元素是不允许被放置的，所以不会发生drop事件。只要在dragover和dragenter事件中阻止默认行为，才能成为被允许的放置目标，才能允许发生drop事件。此时，光标变成了允许放置的符号
  
  ### dataTransfer对象

　　为了在拖放操作时实现数据交换，引入了dataTransfer对象，它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据

　　dataTransfer对象有两个主要方法：getData()和setData()

　　getData()可以取得由setData()保存的值。setData()方法的第一个参数，也是getData()方法唯一的一个参数，是一个字符串，表示保存的数据类型，取值为"text"或"URL"

　　IE只定义了"text"和"URL"两种有效的数据类型，而HTML5则对此加以扩展,允许指定各种MIME类型。考虑到向后兼容，HTML5也支持"text"和"URL"，但这两种类型会被映射为"text/plain"和"text/uri-list"

　　实际上，dataTransfer对象可以为每种MIME类型都保存一个值。换句话说，同时在这个对象中保存一段文本和一个URL不会有任何问题

　　[注意]保存在dataTransfer对象中的数据只能在drop事件处理程序中读取

　　在拖动文本框中的文本时，浏览器会调用setData()方法，将拖动的文本以"text"格式保存在dataTransfer对象中。类似地，在拖放链接或图像时，会调用setData()方法并保存URL。然后，在这些元素被拖放到放置目标时，就可以通过getData()读到这些数据
```js
<div>请将从这行文字中挑选一些移动到拖放目标中</div>    
<div id="target" style="margin-top:20px;height: 100px;width:200px;background:lightblue;">拖放目标</div>
<div id="result"></div>
<script> target.ondragenter = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    } this.innerHTML = '有元素进入目标区域'; this.style.background = 'red';
}
target.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
target.ondragleave = function(e){
    e = e || event; this.innerHTML = '元素已离开目标区域'; this.style.backgroundColor = 'lightblue';
}
target.ondrop = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text'); this.innerHTML = '元素已落在目标区域'; this.style.backgroundColor = 'orange';    
} </script>
```

　　当然，也可以在dragstart事件处理程序中调用setData()，手动保存自己要传输的数据，以便将来使用


```js
<div id="test" draggable="true" data-value="这是一个秘密" style="height:30px;width:100px;background:pink;">拖动源</div>    
<div id="target" style="margin-top:20px;height: 100px;width:200px;background:lightblue;">拖放目标</div>
<div id="result"></div>
<script>
 //兼容IE8-浏览器
test.onmousedown = function(){ if(this.dragDrop){ this.dragDrop();
    }
}
test.ondragstart = function(e){
    e = e || event;
    e.dataTransfer.setData('text',test.getAttribute('data-value')); //传入两个数据，一个是key，一个是value
}
target.ondragenter = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    } this.innerHTML = '有元素进入目标区域'; this.style.background = 'red';
}
target.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
target.ondragleave = function(e){
    e = e || event; this.innerHTML = '元素已离开目标区域'; this.style.backgroundColor = 'lightblue';
}
target.ondrop = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text'); this.innerHTML = '元素已落在目标区域'; this.style.backgroundColor = 'orange';    
} </script>
```
### 改变光标

　　利用dataTransfer对象，不仅可以传输数据，还能通过它来确定被拖动的元素以及作为放罝目标的元素能够接收什么操作。为此，需要访问dataTransfer对象的两个属性：dropEffect和effectAllowed

　　实际上，这两个属性并没有什么用，只是拖动源在拖动目标上移动时，改变不同的光标而已(但是，有一种情况除外)

**dropEffect**

　　dropEffect属性可以知道被拖动的元素能够执行哪种放置行为。这个属性有下列4个可能的值

　　"none":不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值(此时，将无法触发drop事件)

　　"move":应该把拖动的元素移动到放置目标

　　"copy":应该把拖动的元素复制到放置目标

　　"link":表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有URL)

　　在把元素拖动到放置目标上时，以上每一个值都会导致光标显示为不同的符号

　　[注意]必须在ondragover事件处理程序中针对放置目标来设置dropEffect属性

**effectAllowed**

　　dropEffect属性只有搭配effectAllowed属性才有用。effectAllowed属性表示允许拖动元素的哪种dropEffect

　　effectAllowed属性可能的值如下

　　"uninitialized":没有给被拖动的元素设置任何放置行为

　　"none":被拖动的元素不能有任何行为

　　"copy":只允许值为"copy"的dropEffect

　　"link"只允许值为"link"的dropEffect

　　"move":只允许值为"move"的dropEffect

　　"copyLink":允许值为"copy"和"link"的dropEffect

　　"copyMove":允许值为"copy"和"move"的dropEffect

　　"linkMove":允许值为"link"和"move"的dropEffect

　　"all":允许任意dropEffect

　　[注意]必须在ondragstart事件处理程序中设置effectAllowed属性

```js
<div id="test" draggable="true" style="height:30px;width:100px;background:pink;display:inline-block;">拖放源</div>
<br>
<div id="target1" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(none)拖放目标</div>
<div id="target2" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(move)拖放目标</div>
<div id="target3" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(copy)拖放目标</div>
<div id="target4" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(link)拖放目标</div>
<div id="result"></div>
<script>
//兼容IE8-浏览器
test.onmousedown =function(){ if(this.dragDrop){ this.dragDrop();
    }
}
test.ondragstart = function(e){
    e = e || event; //兼容firefox浏览器
 e.dataTransfer.setData('text','');
      e.dataTransfer.effectAllowed = 'all';
}
target1.ondragenter = target2.ondragenter =target3.ondragenter =target4.ondragenter =function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }this.style.background = 'red';
}
target1.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    e.dataTransfer.dropEffect = 'none';
}
target2.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    e.dataTransfer.dropEffect = 'move';
}
target3.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    e.dataTransfer.dropEffect = 'copy';
}
target4.ondragover = function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    e.dataTransfer.dropEffect = 'link';
}
target1.ondragleave = target2.ondragleave =target3.ondragleave =target4.ondragleave =function(e){
    e = e || event; this.style.backgroundColor = 'lightblue';
}
target1.ondrop = target2.ondrop =target3.ondrop =target4.ondrop =function(e){
    e = e || event; if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    } this.style.backgroundColor = 'orange';    
} </script>
```