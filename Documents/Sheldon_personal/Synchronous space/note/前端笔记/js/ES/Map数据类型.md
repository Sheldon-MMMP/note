# Map数据类型
## 创建Map对象
**`Map`** 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型都可以作为一个键或一个值。
```js
const map = new Map();
```
Map接收一个可以Iterator对象,来进行创建，Iterator对象中的元素就会添加进入Map中。
```js
const map = new Map([["name","Alex"],["title","sheldon"]])
map.size //2
```
这样看来，`Set`和`Map`都可以用来生成新的 Map。
```javascript
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

## 属性
- **size 属性**:返回Map结构的成员总数。
## 操作方法
### Map.prototype.set()
为 `Map` 对象添加或更新一个指定了键（`key`）和值（`value`）的（新）键值对。
```js
const map = new Map();
map.set(3,5).set(new Set(),new Map);
```
#### 参数
- **key**
	要添加至相应 `Map` 对象的元素的键。

- **value**
	要添加至相应 `Map` 对象的元素的值。

#### 返回值
- `Map` 对象
```ad-info
当我们设置了多个条数据时，当后面设置的数据和前面的数据的key是一样的，后面的数据会覆盖前面的数据。
```
```javascript
const map = new Map();

map
.set("Alex", 'Alex')
.set("Alex", 'sheldon');

map.get("Alex") // "sheldon"
```
### Map,prototype.get()
返回某个 `Map` 对象中的一个指定元素。
```js
const map1 = new Map();
map1.set('bar', 'foo');
console.log(map1.get('bar'));
```
#### 参数

-  key

	- 必须参数，也是它唯一的参数，要从目标 `Map` 对象中获取的元素的键。

#### 返回值
- 返回一个 `Map` 对象中与指定键相关联的值，如果找不到这个键则返回 `undefined`。
### Map.prototype.has()
方法`has()` 返回一个 bool 值，用来表明 map 中是否存在指定元素。
```js
const map = new Map();
map.set(3,5).set(new Set(),new Map);
console.log(map.has(3)); //true
console.log(map.has(new Set())); //false
```
因为`new Set()`是引用类型，所有无法找到相同的key，就报false。
```ad-info
如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。
```
### Map.prototype.delete()
用于移除 `Map` 对象中指定的元素。
```js
const map1 = new Map();
map1.set('bar', 'foo');

console.log(map1.delete('bar')); //true
console.log(map1.delete("123")); //false
```
#### 参数
- key 
	- 从Map对象中删除的键
#### 返回值
- 删除成功返回`true`;
- 删除失败返回`false`;
### Map.prototype.clear()
移除 Map 对象中的所有元素
```js
const map1 = new Map();

map1.set('bar', 'baz');
map1.set(1, 'foo');

console.log(map1.size);
// expected output: 2

map1.clear();

console.log(map1.size);
// expected output: 0

```

## 遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

-   `Map.prototype.keys()`：返回键名的遍历器。
-   `Map.prototype.values()`：返回键值的遍历器。
-   `Map.prototype.entries()`：返回所有成员的遍历器。
-   `Map.prototype.forEach()`：遍历 Map 的所有成员。


### 与其他数据结构的互相转换

**（1）Map 转为数组**

前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

```javascript
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

**（2）数组 转为 Map**

将数组传入 Map 构造函数，就可以转为 Map。

```javascript
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

**（3）Map 转为对象**

如果所有 Map 的键都是字符串，它可以无损地转为对象。

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

**（4）对象转为 Map**

对象转为 Map 可以通过`Object.entries()`。

```javascript
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

此外，也可以自己实现一个转换函数。

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

**（5）Map 转为 JSON**

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```javascript
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

**（6）JSON 转为 Map**

JSON 转为 Map，正常情况下，所有键名都是字符串。

```javascript
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
```