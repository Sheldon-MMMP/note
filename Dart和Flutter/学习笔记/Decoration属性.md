# Decoration属性
#flutter 

## 介绍

**作用：** 背景色 背景图 边框 圆角 阴影 渐变色 的等属性

Decoration 是基类，它的子类有下面这些：
-   BoxDecoration:可以实现边框、圆角、阴影、形状、渐变、背景图像
-   ShapeDecoration:实现四边分别指定颜色和宽度、底部线、矩形边色、圆形边色、体育场（竖向椭圆）、 角形（八边角）边色
-   FlutterLogoDecoration:可以展示图片
-   UnderlineTabindicator:下划线

## BoxDecoration
```dart
const BoxDecoration({
	this.color,//背景色
	this.image,//图片
	this.border,//描边
	this.borderRadius,//圆角大小
	this.boxShadow,//阴影
	this.gradient,//渐变色
	this.backgroundBlendMode,//图像混合模式
	this.shape = BoxShape.rectangle,//形状,BoxShape.circle和borderRadius不能同时使用
})
```
**boxShadow 阴影**

-   color - 阴影颜色
-   offset - 阴影相偏移量
-   blurRadius - 高斯模糊数值
-   spreadRadius - 阴影膨胀量，这个值我是真不知有啥用，没场景啊，一般不写这个值

**gradient渐变**

支持2种渐变：LinearGradient线性渐变 和 RadialGradient扫描渐变

-   LinearGradient ：
-   begin - 渐变开始的位置
-   end - 渐变结束的位置
-   colors - 渐变颜色,是数组
-   stops - 值列表，装有0.0到1.0的数值
-   tileMode - 平铺模式