---
layout: post.njk
title: Tổng hợp những tính năng ES6 nổi bật
slug: tong-hop-tinh-nang-noi-bat-es6
date: 2017-10-29
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1516116299/es6-recursion-600x360_sifpgq.png
tags: JavaScript, ES6, ES2015, Kinh nghiệm
excerpt: ES6 đã và đang dần được hỗ trợ bởi tất cả các trình duyệt. Hãy cùng điểm qua những tính năng thông dụng nhất nhé.
author: kcjpop
grid: big
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1509504402/PTLHvdFMQuW7VhAXQc0G_es6_what_to_use_and_what_not_to.png_rgvxgq.jpg)

2017 có thể nói là năm tuyệt vời với dân lập trình web, khi hầu hết những tính năng hay ho hấp dẫn của ES6 đều đã được [các trình duyệt hỗ trợ](https://kangax.github.io/compat-table/es6/). Nhờ đó nhà phát triển gần như có thể xây dựng ứng dụng trực tiếp bằng ES6 mà không cần phải thông qua các công cụ chuyển đổi như [Babel](http://babeljs.io/) hay [Bublé](https://buble.surge.sh/guide/), giúp cho ứng dụng trở nên gọn nhẹ hơn, giảm thiểu kích thước tập tin khi chuyển đến người sử dụng.

Hãy cùng Ehkoo điểm lại những tính năng chính trong ES6, cũng như khả năng tương thích của chúng với các trình duyệt.

### Nội dung

1. `let` và `const`
2. Hàm mũi tên (arrow functions)
3. Chuỗi bản mẫu (template strings)
4. Object chân phương (object literals)
5. Phân rã biến (destructuring)
6. Rest và Spread
7. Giá trị mặc định cho tham số
8. Lớp (class)
9. Promise

### 1. `let` và `const`

Ngày xa xưa ấy, bạn khai báo biến trong JavaScript bằng `var`, giống như ví dụ dưới đây.

```javascript
var foo = 1
function printFoo(shouldDo) {
  if (shouldDo) {
    var foo = 2
  }
  return foo
}
console.log(printFoo(false)) // undefined
console.log(printFoo(true)) // 2
```

Biến được khai báo với `var` sẽ có tầm vực bên trong hàm gần nhất (function scope), và sẽ được đẩy lên đầu của tầm vực (hoisting). Đó là lý do tại sao `foo` lại có giá trị `undefined` trong dòng `console.log` đầu tiên.

ES6 giới thiệu `let` và `const` như hai cách khai báo biến mới, hỗ trợ tầm vực theo khối (block scope) và không thực hiện hoisting.

```javascript
let foo = 1
function printFoo(shouldDo) {
  if (shouldDo) {
    let foo = 2
    console.log('Value of foo in scope', foo) // 2
  }
  console.log('foo is out of block scope', foo) // 1
  return foo
}
console.log(printFoo(false)) // 1
console.log(printFoo(true)) // 1
```

Điểm khác biệt giữa `let` và `const` là với `const`, bạn không thể gán giá trị mới cho biến sau khi khai báo, trong khi điều này lại có thể với `let`.

```javascript
let foo = 2
foo = 3
console.log(foo) // 3

const baz = 2
baz = 3 // Error: Assignment to constant variable.
```

`const` mang ý nghĩa "constant" chứ không phải "immutability". Nghĩa là với các biến là object hay array, bạn vẫn có thể thay đổi giá trị bên trong của chúng.

```javascript
const obj = { foo: 2 }
obj.foo = 5
obj.bar = 3
console.log(obj) // { foo: 5, bar: 3 }

const arr = [1]
arr.push(2)
console.log(arr) // [1, 2]

// Tuy vậy bạn không thể gán một đối tượng khác cho obj/arr
obj = { baz: 4 } // Error: Assignment to constant variable.
arr = [] // Error: Assignment to constant variable.
```

> **Tính tương thích:** [Được hỗ trợ](http://caniuse.com/#feat=let,const) trên tất cả trình duyệt, kể cả IE11.
> **Lời khuyên:** Dùng `const` cho tất cả khai báo biến vì nó sẽ giúp bạn hạn chế trường hợp "vô tình" thay đổi giá trị của biến. Chỉ dùng `let` trong trường hợp bất khả kháng, và tránh xa `var`.

### 2. Hàm mũi tên

Hàm mũi tên -- (fat) arrow functions -- là một kiểu cú pháp rút gọn cho khai báo hàm trong JavaScript. Trước ES6, bạn khai báo một hàm trong JavaScript với từ khóa `function`.

```javascript
function add(x, y) {
  return x + y
}

// Hàm add() ở trên là syntactic sugar cho...
var add = function(x, y) {
  return x + y
}
```

> "Syntactic sugar" là cú pháp làm cho ngôn ngữ trở nên dễ đọc và dễ hiểu hơn, theo kiểu nó làm cho ngôn ngữ "ngọt ngào hơn" (sweeter) với lập trình viên.

Với hàm mũi tên trong ES6, bạn có thể viết lại thành:

```javascript
const add = (x, y) => {
  return x + y
}

// Bạn cũng có thể viết dưới dạng biểu thức (expression), hàm mũi
// tên sẽ tự động trả giá trị về (auto-return).
const add = (x, y) => x + y
```

Hàm mũi tên cũng hữu dụng để giải quyết vấn đề muôn thuở trong JavaScript: "which `this` is this?" -- khái niệm con trỏ `this`. Với ES5, bạn hay gặp trường hợp giống như thế này:

```javascript
'use strict'
function App() {
  this.count = 0
  setInterval(function() {
    console.log(this.count++)
  }, 1000)
}

var a = new App()
```

Trước ES6, mỗi khai báo hàm đều có một giá trị `this` tách biệt. Điều này làm cho đoạn code ở trên không hoạt động, vì `this.count` bên trong hàm của `setInterval` mang giá trị `undefined`. Cách giải quyết thông thường là đặt một biến `self`, `that` hay `_this` để giữ reference, hoặc sử dụng `Function.prototype.bind`.

```javascript
function App() {
  this.count = 0
  var self = this
  setInterval(function() {
    console.log(self.count++)
  }, 1000)
}

// hoặc
function App() {
  this.count = 0

  function counter() {
    console.log(this.count++)
  }

  setInterval(counter.bind(this), 1000)
}
```

Với hàm mũi tên trong ES6, giá trị của `this` chính là `this` trong tầm vực gần nhất với nó (lexical `this`). Do đó chúng ta không cần phải khai báo biến tạm hay dùng `.bind` nữa.

```javascript
function App() {
  this.count = 0

  setInterval(() => console.log(this.count++), 1000)
}
```

Hàm mũi tên cũng rất hữu ích khi thao tác trên mảng và tiến hành chuyển đổi dữ liệu, giúp mã nguồn dễ đọc và rõ ràng hơn.

```javascript
const subtotal = products.filter(product => product.price > 500).reduce((acc, product) => acc + product.price, 0)
```

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ.
> **Lời khuyên:** Nếu có dùng đến `this` thì hàm mũi tên rất hữu dụng. Trường hợp không dùng thì...cũng hữu dụng luôn vì mã nguồn gọn gàng dễ đọc hơn. Với những trường hợp bạn muốn bao đóng giá trị của `this` chỉ gói gọn trong hàm của nó, dùng `function`.

### 3. Chuỗi bản mẫu

Chuỗi bản mẫu (template strings) là chuỗi chân phương (string literals) nhưng cho phép đính kèm biểu thức. Nó cũng cho phép khai báo chuỗi trên nhiều dòng. Để sử dụng, bạn dùng ký tự backtick `` ` `` (dấu huyền). Ví dụ như là:

```javascript
const name = 'John'

const greetings = `Hello ${name},
The result of 1 + 1 is ${1 + 1}, and the time is now ${Date.now()}.`
```

Vì chuỗi bản mẫu cũng chỉ là chuỗi nên bạn có thể gọi đến những phương thức của `String.prototype`.

```javascript
;`Hello World`.substr(0, 5).toUpperCase()
```

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ.
> **Lời khuyên:** Dùng chuỗi bản mẫu khi bạn cần gắn biểu thức hay chuỗi có nội dung ở nhiều dòng. Còn lại thì vẫn dùng chuỗi bình thường với `'` hay `"`.

### 4. Object chân phương (object literals)

Object chân phương (object literals) chỉ đơn giản là khai báo một object trong JavaScript như bạn đã làm bao năm nay.

```javascript
var birthYear = 2000
var obj = {
  name: 'John',
  birthYear: birthYear,
  getAge: function(currentYear) {
    return currentYear - obj.birthYear
  }
}
```

ES6 nâng cấp object chân phương, cho phép bạn khai báo tắt thuộc tính của object với biến cùng tên, và khai báo phương thức cho object.

```javascript
const birthYear = 2000
const obj = {
  name: 'John',
  birthYear, // khai báo tắt birthYear: birthYear
  getAge(currentYear) {
    // `this` được gán trực tiếp vào bản thân object
    return currentYear - this.birthYear
  }
}
```

Một lưu ý với `this` là khi bạn dùng hàm mũi tên, `this` sẽ được lấy từ `this` trong tầm vực gần với nó nhất, chứ không trỏ đến đối tượng hiện tại. Do đó...

```javascript
{
  getAge: currentYear => currentYear - this.birthYear
}
```

...sẽ không chạy như mong muốn, vì có thể `this.birthYear` mang giá trị `undefined`. Để sử dụng hàm mũi tên bạn phải viết lại như trước ES6.

```javascript
{
  getAge: currentYear => currentYear - obj.birthYear
}
```

Ngoài ra từ ES6 bạn cũng có thể khai báo thuộc tính cho object một cách linh động bằng cách sử dụng cú pháp `[]`.

```javascript
const attr = 'foo'
const year = 2017
const obj = { [attr]: 1, ['now' + year]: 'wow' }
console.log(obj) // { foo: 1, now2017: 'wow' }
```

> **Tính tương thích:** Được hỗ trợ bởi tất cả trình duyệt
> **Lời khuyên:** Tính năng khai báo tắt thuộc tính của object cực ký hữu dụng => nên dùng. Nếu không bận tâm đến `this` thì bạn có thể dùng hàm mũi tên khi khai báo phương thức cho object để mã nguồn gọn gàng sạch đẹp hơn.

### 5. Phân rã biến

Phân rã biến -- destructuring -- theo mình là tính năng tiện dụng nhất của ES6. Tính năng này giúp bạn tách biến từ thuộc tính của đối tượng hay phần tử trong các đối tượng có thể duyệt với `for`, như mảng hoặc chuỗi. Chẳng hạn như:

```javascript
const user = { name: 'John', age: 21 }
const { name } = user
console.log(name) // 'John'

const arr = [1, 2, 3]
const [first, second] = arr
console.log(first, second) // 1, 2

const str = 'Hello'
const [first, second] = str
console.log(first, second) // 'H', 'e'
```

Bạn cũng có thể phân rã các thuộc tính lồng nhau.

```javascript
const userList = [
  {
    name: 'John',
    age: 21,
    products: [{ name: 'Creamy Crustacean Omelette', price: 1200 }, { name: 'Galdin Gratin', price: 2300 }]
  }
]

const [{ products: [{ price }] }] = userList
console.log(price) // 1200
```

Với mảng hay chuỗi, bạn có thể bỏ qua phần tử không mong muốn khi phân rã.

```javascript
const arr = [1, 2, 3]
const [first, , third] = arr
console.log(first, third) // 1, 3

const str = 'Hello'
const [fst, , , , lst] = str
console.log(fst, lst) // 'H', 'o'
```

Phân rã biến cũng rất thường gặp khi bạn sử dụng ES6 module.

```
import { Component } from 'react'
import { render } from 'react-dom'
```

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ.

### 6. Rest và spread

Rest -- phần còn lại -- là một bổ sung của phân rã biến mảng ở trên. Bạn dùng ba dấu chấm `...` để biểu thị rest.

```javascript
const [first, second, ...others] = [1, 2, 3, 4, 5]

console.log(first, second, others)
// 1
// 2
// [3, 4, 5]
```

Rest cũng được dùng khi khai báo hàm có thể nhận nhiều tham số

```javascript
const foo = (...args) => console.log('You passed', args)
console.log(foo(1, 2, 3)) // You passed[ 1, 2, 3 ]

const bar = (x, y, ...rest) => console.log(rest, x, y)
```

Bạn lưu ý biến `args` ở trên khác với biến đặc biệt `arguments` vốn có sẵn bên trong hàm. `arguments` là một đối tượng giống Array, với những thuộc tính đặc biệt như `callee`, trong khi `args` chỉ là một mảng bình thường.

Spread -- rải -- là thao tác ngược lại với rest, giúp bạn kết hợp một mảng đã có sẵn thành mảng mới.

```javascript
const arr = [3, 4, 5]
const newArr = [1, 2, ...arr, 6]
console.log(newArr) // [1, 2, 3, 4, 5, 6]
```

Spread rất hữu ích để thay thế các thao tác thên mảng, như `.concat()`.

```javascript
const head = [1, 2]
const tail = [3, 4, 5]
console.log([...head, ...tail]) // [1, 2, 3, 4, 5]
```

Spread cũng rất ngon khi thay thế cho `Function.prototype.apply`.

```javascript
const mul = (x, y, z) => x * y * z
const params = [1, 2, 3]

// Thay thế cho
// mul.prototype.apply(null, params)
mul(...params)
```

Rest/spread cũng có thể hoạt động trên object, tương tự như `Object.assign()`, nhưng bạn lưu ý tính năng vẫn đang được [đề xuất](https://github.com/tc39/proposal-object-rest-spread) (proposal). Về phía trình duyệt, có Firefox và Chrome là hỗ trợ, trong khi Edge và Safari hoàn toàn không hoạt động.

```javascript
const user = { name: 'John' }

// ES5
const userWithAgeEs5 = Object.assign({}, user, { age: 21 })

// Thời đại mới với spread
const userWithAge = { ...user, age: 21 }
console.log(userWithAge) // { name: 'John', age: 21 }

// Và rest
const { name, ...others } = userWithAge
console.log(others) // { age: 21 }
```

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ rest và spread với mảng hay chuỗi. Với spread object, Edge và Safari chưa hỗ trợ.

### 7. Giá trị mặc định cho tham số

Khi khai báo hàm, tính năng này cho phép bạn thiết lập giá trị mặc định của tham số khi nó không được truyền giá trị hoặc có giá trị `undefined`.

```javascript
function getDiscountedPrice(price, discountRate = 0.1) {
  return price * (1 + discountRate)
}
```

Dĩ nhiên bạn có thể dùng bất cứ giá trị nào làm giá trị mặc định.

```javascript
function processItems(items = []) {
  return items.map(transformItemData)
}

// hoặc dùng biến
const DISCOUNT_RATE = 0.1
const getDiscountedPrice = (price, discountRate = DISCOUNT_RATE) => price * (1 + discountRate)
```

### 8. Lớp (class)

Với ES5, chúng ta sử dụng `function` để tạo lớp và thêm các phương thức vào lớp bằng cách mở rộng `prototype`.

```javascript
function Foo(x) {
  this.x = x
}

Foo.prototype.add = function(y) {
  return this.x + y
}

var f = new Foo(3)
console.log(f.add(2)) // 5
```

ES6 mang đến cú pháp mới giúp tạo lớp trực tiếp và dễ dàng hơn.

```javascript
class Foo {
  constructor(x) {
    this.x = x
  }

  add(y) {
    return this.x + y
  }

  // Khai báo phương thức tĩnh (static method)
  static whoAmI() {
    return 'I am a Foo class'
  }
}

const f = new Foo(3)
console.log(f.add(2)) // 5
console.log(Foo.whoAmI()) // I am a Foo class
```

Bạn cũng có thể kế thừa từ lớp khác bằng từ khóa `extends`.

```javascript
class Bar extends Foo {
  constructor(x, y) {
    // Gọi đến hàm dựng của lớp cha
    super(x)
    this.y = y
  }

  calculate() {
    return this.add(4) + this.y
  }
}

const f = new Bar(3, 4)
console.log(f.calculate()) // 11
```

Ngoài ra với bạn cũng có thể dùng hàm mũi tên khi khai báo phương thức trong lớp. Điều này giúp đảm bảo `this` luôn trỏ đến đối tượng hiện tại. Cú pháp này đặc biệt thông dụng trong các ứng dụng React, tuy nhiên **vẫn chưa được hỗ trợ mặc định** bởi các trình duyệt, nên bạn phải dùng Babel để chuyển đổi mã nguồn.

```javascript
class Button extends React.Component {
  state = { name: 'Fabulous button' }

  doClick = e => {
    e.preventDefault()
    // 'You clicked Fabulous button'
    console.log(`You clicked ${this.state.name}`)
  }

  render = () => {
    return <button onClick={this.doClick} />
  }
}
```

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ lớp căn bản.

### 9. Promise

Nếu bạn chưa biết Promise là gì thì [click vào đây](https://kipalog.com/posts/Promise-la-khi-gi-).

Vì Promise đã được công nhận như một phần của đặc tả ECMAScript 6 nên các trình duyệt có nghĩa vụ phải hỗ trợ mặc định. So với những thư viện chuyên biệt như [bluebird](http://bluebirdjs.com) hay [q](https://github.com/kriskowal/q) thì phiên bản mặc định có ít tính năng hơn, nhưng cũng vừa đủ để dùng. Quan trọng là không cần thư viện thứ ba.

```javascript
const showUser = user => console.log(`Your name is ${user.name}`)

const getUserData = userId =>
  new Promise((resolve, reject) => {
    return RemoteApi.get(`/users/${userId}`, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })

getUserData(123)
  .then(response => response.data)
  .then(showUser)
  .catch(err => console.error('Oh no', err))
```

Promise còn có các hàm tĩnh khác:

##### `Promise.all(iterator)`

Nhận vào một mảng các promises và chỉ resolve khi tất cả promises trong mảng được resolve.

##### `Promise.race(iterator)`

Nhận vào một mảng các promises và resolve/reject ngay khi một trong các promises trong mảng resolve/reject.

##### `Promise.resolve()`

Trả về một promise được tự động resolve.

##### `Promise.reject()`

Trả về một promise được tự động reject.

> **Tính tương thích:** Trừ IE11, tất cả các trình duyệt còn lại đều hỗ trợ.

### Kết

ES6 mang đến những tính năng tuyệt vời cho lập trình viên, giúp cho làm việc với JavaScript trở nên dễ thở hơn, đồng thời nâng cao hiệu suất, cải thiện mã nguồn và giảm dung lượng tập tin khi truyền tải trên mạng. Nếu ứng dụng của bạn hướng đến các trình duyệt hiện đại, đừng chần chờ gì, hãy dùng ES6 ngay hôm nay.

Bonus: [Cheatsheet](https://devhints.io/es6) cho bạn nào làm biếng đọc ;)
