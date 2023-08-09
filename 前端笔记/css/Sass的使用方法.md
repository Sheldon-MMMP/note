# Sass使用方式
#css #sass/scss 
## Sass服务器启动方式：
1.  `Watch Sass`从状态栏单击以打开实时编译，然后`Stop Watching Sass`从状态栏单击以打开实时编译。
<br>		
3.  按`F1`或`ctrl+shift+P`键入`Live Sass: Watch Sass`以开始实时编译，或者按键入`Live Sass: Stop Watching Sass`以停止实时编译。
  <br>
3.  按`F1`或`ctrl+shift+P`键入一次`Live Sass: Compile Sass - Without Watch Mode` 以编译Sass或Scss。
<br>
使用前需要先配置 [[Live   Sass   Compiler]]

## 使用变量
### 变量的声明
 `sass`使用`$`符号来标识变量:
 
 ```
 $highlight-color: #F90;
```

这意味着变量`$highlight-color`现在的值是`#F90`。

任何可以用作`css`属性值的赋值都 可以用作`sass`的变量值，甚至是以空格分割的多个属性值，如`$basic-border: 1px solid black;`，或以逗号分割的多个属性值，如`$plain-font: "Myriad Pro"、Myriad、"Helvetica Neue"、Helvetica、"Liberation Sans"、Arial和sans-serif; sans-serif;`。

与`CSS`属性不同，变量可以在`css`规则块定义之外存在。当变量定义在`css`规则块内，那么该变量只能在此规则块内使用。如果它们出现在任何形式的`{...}`块中（如`@media`或者`@font-face`块），情况也是如此：
```
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}
```

``` ad-warning
在变量的命名中可以使用中划线`-`和下划线`_`。但是用中划线命名的也可以写下划线来调用，反之同理。
```
```
$link-color: blue;
a {
  color: $link_color;
}
```

## 嵌套CSS规则
`css`中重复写选择器是非常恼人的。如果要写一大串指向页面中同一块的样式时，往往需要 一遍又一遍地写同一个`ID`
<br>
`sass`可以让你只写一遍，且使样式可读性更高

```
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```
## 父类选择器的标识符

>一般情况下，`sass`在解开一个嵌套规则时就会把父选择器（`#content`）通过一个空格连接到子选择器的前边（`article`和`aside`）形成（`#content article`和`#content aside`）。这种在CSS里边被称为后代选择器，因为它选择ID为`content`的元素内所有命中选择器`article`和`aside`的元素。

当我们在写伪类的时候如：`:hover`的时候，在`:`前需要有一个后代选择器 ，就需要一个东西来代替我们写的标识符，简单的`&`符号。
```
article a {
  color: blue;
  &:hover { color: red }
}
```

当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，而是`&`被父选择器直接替换：

```
article a { color: blue }
article a:hover { color: red }
```

## 属性嵌套
有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中

```
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

//编译后

.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }

```

```ad-warning 

1. Sass 支持标准的 CSS 多行注释 `/* */`，以及单行注释 `//`，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会
2. 将 `!` 作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。
```


## 数据类型
SassScript 支持 6 种主要的数据类型：

-   数字，`1, 2, 13, 10px`
-   字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
-   颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
-   布尔型，`true, false`
-   空值，`null`
-   数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
-   maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

### 字符串
SassScript 支持 CSS 的两种字符串类型：有引号字符串 (quoted strings)，如 `"Lucida Grande"` `'http://sass-lang.com'`；与无引号字符串 (unquoted strings)，如 `sans-serif` `bold`，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：

```
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

编译为

```
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

### 数组
>组 (lists) 指 Sass 如何处理 CSS 中 `margin: 10px 15px 0 0` 或者 `font-face: Helvetica, Arial, sans-serif` 这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。

数组本身没有太多功能，但 [Sass list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 赋予了数组更多新功能：
- `nth` 函数可以直接访问数组中的某一项；
- `join` 函数可以将多个数组连接在一起；
- `append` 函数可以在数组中添加新值；
- 而 `@each` 指令能够遍历数组中的每一项。
- [[Sass 详细用法#数组]]

### 除法运算
```ad-note
`/` 在 CSS 中通常起到分隔数字的用途，SassScript 作为 CSS 语言的拓展当然也支持这个功能，同时也赋予了 `/` 除法运算的功能。也就是说，如果 `/` 在 SassScript 中把两个数字分隔，编译后的 CSS 文件中也是同样的作用。
```

以下三种情况 `/` 将被视为除法运算符号
-   如果值，或值的一部分，是变量或者函数的返回值
-   如果值被圆括号包裹
-   如果值是算数表达式的一部分

```
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

编译为

```
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; }
```

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#{}` 插值语句将变量包裹。
```
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译为

```
p {
  font: 12px/30px; }
```

```ad-info
在有引号的文本字符串中使用 `#{}` 插值语句可以添加动态的值：
```

```
p:before {
  content: "I ate #{5 + 10} pies!";
}
```

编译为

```
p:before {
  content: "I ate 15 pies!"; }
```

### 变量定义 !default
作用：给变量设置默认值，当变量没有赋值时，就会赋予默认值。

```
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
```

编译为

```
#main {
  content: "First content";
  new-content: "First time reference"; }
```

```ad-warning
变量是 null 空值时将视为未被 `!default` 赋值。
```

## 导入
ass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

Sass 在当前地址，或 Rack, Rails, Merb 的 Sass 文件地址寻找 Sass 文件，如果需要设定其他地址，可以用 `:load_paths` 选项，或者在命令行中输入 `--load-path` 命令。
[[Sass 详细用法#导入]]

## @media
Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。[[Sass 详细用法#media]]

## @extend
作用：让class的css继承另一个class的css样式

```
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
上面代码的意思是将 `.error` 下的所有样式继承给 `.seriousError`，`border-width: 3px;` 是单独给 `.seriousError` 设定特殊样式，这样，使用 `.seriousError` 的地方可以不再使用 `.error`。
选择器列的详细用法：[[Sass 详细用法#extend]]
当在@media中使用@extend时：[[Sass 详细用法#在指令中延伸 extend in Directives]]
### @extend-Only 选择器 (@extend-Only Selectors)
>有时，需要定义一套样式并不是给某个元素用，而是只通过 `@extend` 指令使用，尤其是在制作 Sass 样式库的时候，希望 Sass 能够忽略用不到的样式。
### `!optional` 声明
在某段代码后面加上这声明，将不会编译这段代码。
## @at-root
>当我们写在父选择器下的选择器，不想他继承父选择器。就可以用这个

详细的使用方式：[[Sass 详细用法#at-root]]

##  @if
`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明，例如：

```
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

编译为

```
p {
  color: green; }
```

## @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：_当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值_。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

编译为

```
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

## @each

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：

```
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

编译为

```
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

## @while

`@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。例如：

```
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

```
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```

## 混合指令
### 定义混合指令@mixin
混合指令的用法是在 `@mixin` 后添加名称与样式，比如名为 `large-text` 的混合通过下面的代码定义：

```
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

混合也需要包含选择器和属性，甚至可以用 `&` 引用父选择器：

```
@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}
```

```ad-warning
光定义是无法进行使用的，需要引用
```

### 引用混合样式 `@include` (Including a Mixin: `@include`)

使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）：

```
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

编译为

```
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```

还可以给混合指令定义样式添加参数：[[Sass 详细用法#参数 Arguments]]
```ad-note
**为便于书写，`@mixin` 可以用 `=` 表示，而 `@include` 可以用 `+` 表示**
```

## 函数指令 (Function Directives)

Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：

```
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

编译为

```
#sidebar {
  width: 240px; }
```

与 mixin 相同，也可以传递若干个全局变量给函数作为参数。一个函数可以含有多条语句，需要调用 `@return` 输出结果。

自定义的函数也可以使用关键词参数，上面的例子还可以这样写：

```
#sidebar { width: grid-width($n: 5); }
```

建议在自定义函数前添加前缀避免命名冲突，其他人阅读代码时也会知道这不是 Sass 或者 CSS 的自带功能。

## 输出
ass 默认的 CSS 输出格式很美观也能清晰反映文档结构，为满足其他需求 Sass 也提供了多种输出格式。

Sass 提供了四种输出格式，可以通过 `:style option` 选项设定，或者在命令行中使用 `--style` 选项。

### 11.1. `:nested`

Nested （嵌套）样式是 Sass 默认的输出格式，能够清晰反映 CSS 与 HTML 的结构关系。选择器与属性等单独占用一行，缩进量与 Sass 文件中一致，每行的缩进量反映了其在嵌套规则内的层数。当阅读大型 CSS 文件时，这种样式可以很容易地分析文件的主要结构。

```
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline; }
```

### 11.2. `:expanded`

Expanded 输出更像是手写的样式，选择器、属性等各占用一行，属性根据选择器缩进，而选择器不做任何缩进。

```
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}
```

### 11.3. `:compact`

Compact 输出方式比起上面两种占用的空间更少，每条 CSS 规则只占一行，包含其下的所有属性。嵌套过的选择器在输出时没有空行，不嵌套的选择器会输出空白行作为分隔符。

```
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }
```

### 11.4. `:compressed`

Compressed 输出方式删除所有无意义的空格、空白行、以及注释，力求将文件体积压缩到最小，同时也会做出其他调整，比如会自动替换占用空间最小的颜色表达方式。

```
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```