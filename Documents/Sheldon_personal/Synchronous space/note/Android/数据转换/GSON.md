# GSON

>Gson是目前功能最全的Json解析神器，Gson当初是为因应Google公司内部需求而由Google自行研发而来，但自从在2008年五月公开发布第一版后已被许多公司或用户应用。 Gson的应用主要为toJson与fromJson两个转换函数，无依赖，不需要例外额外的jar，能够直接跑在JDK上。而在使用这种对象转换之前需先创建好对象的类型以及其成员才能成功的将JSON字符串成功转换成相对应的对象。类里面只要有get和set方法，Gson完全可以将复杂类型的json到bean或bean到json的转换，是JSON解析的神器。 Gson在功能上面无可挑剔，但是性能上面比FastJson有所差距。

## 基本使用
### 构造方法
使用Gson的第一步是创建一个Gson对象，创建Gson对象有两种方式：
-   使用 new Gson()
-   创建GsonBuilder实例，使用 create() 方法
```java
Gson gson = new Gson();
Gson gson = new GsonBuilder().create();
```
>在creater()前加入setPrettyPrinting()时，输出出来的 json格式更加好看
### fromJson()
- ==**作用：将JSON对象转换为java对象  JSON-->Java对象**==

**使用方法**
```java
int i = gson.fromJson("100", int.class);  // i = 100

double d = gson.fromJson("99.99", double.class); // d = 99.99

boolean b = gson.fromJson("true", boolean.class); // b = true

String str = gson.fromJson("String", String.class);// str = String
```
**参数**

- 第一个参数是JSON对象的字符串

- 第二个参数是预期的Java类型

### toJson()
- ==**作用：将java对象转换成json对象，Java对象-->JSON**==

**使用方法**
```java
Employee emp = new Employee(1001, "Lokesh", "Gupta", "howtodoinjava@gmail.com");
String jsonString = gson.toJson(emp);  // jsonString就是JSON对象了。
```
**参数**
- emp：该参数是java对象，在传入之前我们需要创建该对象类。
```java
public class Employee { 
	private int id; 
	private String firstName; 
	private String lastName; 
	private String email; 
	//省略getter/setter，构造方法，toSting方法 
}
```
>这个类需要我们根据不同形式的JOSN数据来确定模型

## JSON array --> Java array/list
假如我们有以下数据
```json
[ 
	{ 
		"name": "Alex", 
		"id": 1 
	}, 
	{ 
		"name": "Brian", 
		"id": 2 
	},
	{ 
		"name": "Charles",
		 "id": 3 
	 } 
]
```
我需要先定义类
```java
public class User 
{
    private long id;
    private String name;
     
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
 
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + "]";
    }
}
```
对于这种情况，我们只需要定义出每个对象的实体类就可以了，然后在声明实体类引用的时候使用集合类型来进行声明。

将json数组反序列化为Java对象数组：
```java
String userJson = "[{'name': 'Alex','id': 1}, "
                + "{'name': 'Brian','id':2}, "
                + "{'name': 'Charles','id': 3}]";
         
Gson gson = new Gson(); 
 
User[] userArray = gson.fromJson(userJson, User[].class);  
 
for(User user : userArray) {
    System.out.println(user);
}
```


## @Since注解
在GSON中，我们可对属性定义不同的版本，在我们创建对象时，也可以定义一个版本，当属性的版本大于对象的版本时，就会被忽略。

在Employee类下面，我们对三个字段进行了版本控制，即firstName，lastName和email。
```java
public class Employee 
{
    private Integer id;
 
    @Since(1.0)
    private String firstName;
     
    @Since(1.1)
    private String lastName;
     
    @Since(1.2)
    private String email;
}
```
**创建对象**

要给对象添加版本需要使用`.setVersion()`方法：
```java
Gson gson = new GsonBuilder() .setVersion(1.1) .create();
```
**参数**
- 参数一（1.1）：对象的版本号

### 实例
```java
Employee employeeObj = new Employee(1, "Lokesh", "Gupta", "howtogoinjava@gmail.com");
 
Gson gson = new GsonBuilder()
        .setVersion(1.1)
        .setPrettyPrinting()
        .create();
 
System.out.println(gson.toJson(employeeObj));
```
**输出**
```java
{
  "id": 1,
  "firstName": "Lokesh",
  "lastName": "Gupta"
}
```

```ad-info
在我们将JSON数据转换为java对象时也是一样的。
```

## @SerializedName
- ==**作用：将JSON中某条数据的字段名在转换成java类时，将某条字段名映射给java类中某个属性名，在java转换成JSON中同理**==

**使用方式**
```java
public class Employee 
{
    private Integer id;
    private String firstName;
    private String lastName;
 
    @SerializedName(value = "emailId", alternate = "emailAddress")
    private String email;
}
```

**参数**
- value：在java类转换成JSON时，将email名转换成value的值（`emailId`）
- emailAddress：在JSON转换成java类时，将JSON中字段`emailAddress`的数据映射给`email`

### 实例
```java
Employee emp = new Employee(1001, "Lokesh", "Gupta", "howtodoinjava@gmail.com"); 
Gson gson = new GsonBuilder().setPrettyPrinting().create(); 
System.out.println(gson.toJson(emp));
```
**结果**
```json
{ 
	"id": 1001,
	"firstName": "Lokesh", 
	"lastName": "Gupta", 
	"emailId": "howtodoinjava@gmail.com" 
}
```