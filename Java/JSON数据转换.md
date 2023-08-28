# JSON数据转换

## 解析JSON字符串

#### **纯数组(Array)的解析{ }:**
```java
//创建JSON解析对象(两条规则的体现:大括号用JSONObject,注意传入数据对象)
JSONObject obj = new JSONObject(json);
//obj.后面有各种数据类型,根据对象来选择使用的数据类型
String name = obj.getString("name");
//同理如上，这里的age为Int类型，我们就用对应的类型进行解析
int age = obj.getInt("age");
```

#### **纯数组(Array)的解析[]:**
```java
//创建JSON解析对象(两条规则的体现:中括号用JSONArray,注意传入数据对象)
JSONArray jArray = new JSONArray(json);
//取得数组长度
int length = jArray.length();
//回想数组的取值的方式？ --->for循环遍历数组--->得到值
for (int i = 0; i < length; i++) {
//根据解析的数据类型使用该类型的get方法得到该值，打印输出
String string = jArray.getString(i);
System.out.print(string+",");
```

## GSON
解析GSON的包

#### 1. 需要先创建依赖包

android依赖创建：在Gradle Scripts/build.gradle中
```
dependencies {  
  ...
 implementation 'com.google.code.gson:gson:2.3'
 }
```

#### 2. 创建接收数据的类
```
// 包一(InfoResponse)：这个包是创建json最外面对象下的东西
public class InfoResponse {  
 private int status;  
 private List<Base> data;  

// 包二( Base)：这个包是创建json中list下的对象数据
puvlic class Base {  
// json中有多少数据，就对应创建几个
 private int id;  
 private String name;  
 private String picSmall;  
 private String picBig;  
 private String description;  
 private String learner;
```
>嵌套多少层就需要创建多少对象
然后
```

```