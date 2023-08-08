# 对象 Object

`**Object**`是JavaScript的一种数据类型它用于存储各种键值集合和更复杂的实体.对象可以通过Object()构造函数或者使用对象字面量的方式创建
## 1. 创建模式
#### 1.1 字面量
使用{}创建对象，并指定属性和方法
```js
const person = {
    name:"Jerry",
    age:18
}
```
对象内部的数据是确定的，但是要创建多个对象的话，有重复 代码
#### 1.2 构造函数模式
使用Object()构造函数
```js
const person = new Object() // 相当于 const person = {}
person.name = "Jerry"
person.age = 18
person.sayName = function(){
    console.log(this.name)
}
```
对象内部的数据是不确定的，并且需要使用大量的语句
#### 1.3 工厂模式
```js
function Person(name,age){
    this.name = name
    this.age = age
}
Person.prototype.sayName = function(){
    console.log(this.name)
}
const person = new Person("Jerry",18)
console.log(person)
```
### 添加属性
```js

```
