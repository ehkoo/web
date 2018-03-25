---
layout: post.njk
title: Tìm hiểu Map và Set trong JavaScript
slug: map-set-javascript-es6-es2015
date: 2018-03-25
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1521964972/Hanoi-01_1250_tqa22l.png
tags: JavaScript, Map, Set, WeakMap, WeakSet, ES2015, ES6
excerpt: "ES6 giới thiệu 2 cấu trúc dữ liệu mới: `Map` và `Set`. Hãy cùng Ehkoo tìm hiểu cách thức hoạt động, cũng như ứng dụng của chúng."
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521964972/Hanoi-01_1250_tqa22l.png)
_Hà Nội -- minh họa bởi [Jing Zhang](http://mazakii.com/Portfolio/Maps-of-Asia)_

Được giới thiệu từ ES6, `Map`, `Set`, `WeakMap`, và `WeakSet` là những cấu trúc dữ liệu giúp thao tác trên tập hợp. Bài viết này sẽ giới thiệu cách thức hoạt động và các ứng dụng của chúng.

### Map

Map, mảng kết hợp (associate arrays) hay từ điển (dictionary/dict) là những thuật ngữ để gọi chung một cấu trúc dữ liệu, cho phép bạn ánh xạ từ một khóa (key) tương ứng với một giá trị (value). Trong JavaScript, chúng ta có thể sử dụng object để thể hiện cấu trúc này.

```js
const dict = {
  hello: 'Xin chào',
  bye: 'Tạm biệt',
}

console.log(dict['hello']) // Xin chào
```

Bên cạnh hạn chế là chỉ có thể dùng chuỗi làm khóa, cách thức này cũng có những [hạn chế](http://speakingjs.com/es5/ch17.html#_pitfalls_using_an_object_as_a_map).  ES6 giới thiệu lớp `Map`, giúp giải quyết những vấn đề này. Với `Map`, bạn có thể sử dụng bất cứ dạng dữ liệu nào để làm khóa.

```js
const obj = { bar: 2 }
const dict = new Map()
dict
 .set('foo', 123)
 .set(obj, 'hello world')

dict.get('foo') // 123
dict.get(obj)   // 'hello world'

// Lấy giá trị của một khóa không tồn tại
dict.get('wat') // undefined
```

Bạn cũng có thể truyền vào hàm dựng của `Map` một mảng các cặp giá trị dạng `[key, value]`, như ví dụ sau:

```js
const dict = new Map([
  ['foo', 123],
  [obj, 'hello world']
])
```

Như đã nói ở trên, bạn có thể dùng bất cứ dạng dữ liệu gì để làm khóa cho Map, kể cả mảng, object, hàm, hay `NaN`.

```js
const arr = [1]
const f = () => {}
dict
 .set(arr, 'an array')
 .set(f, 'a function')
 .set(NaN, 'not a number')
```

Bản thân `Map` sử dụng phương thức so sánh [`SameValueZero`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#A_model_for_understanding_equality_comparisons) để tìm khóa và giá trị tương ứng. `SameValueZero` hoạt động tương tự như `===`, nhưng xem các giá trị `NaN` bằng nhau, cũng như `+0` bằng `-0`.

> **Đố không vui**: Đố bạn kết quả của các biểu thức sau là gì?
>
> `NaN == NaN`
> `NaN === NaN`
> `Object.is(NaN, NaN)`

Do `SameValueZero` nên hai object khác nhau sẽ là hai khóa riêng biệt.

```js
const o1 = {}
const o2 = {}

dict.set(o1, 'Ô Một').set(o2, 'Ô Hai')
dict.get(o2) // Ô Hai
dict.get({}) // undefined
```

Nếu trong map đã có sẵn khóa, dữ liệu mới sẽ bị ghi đè lên.

```js
const m = new Map()
m.set('foo', 1)
m.set('foo', 2)

m.get('foo') // 2
```

Để duyệt qua các khóa và giá trị trong `Map`, bạn có thể dùng:

```js
const dict = new Map([
  ['foo', 1], ['bar', 2]
])

dict.keys()    // ['foo', 'bar']
dict.values()  // [1, 2]
dict.entries() // [ ['foo', 1], ['bar', 2] ]
dict.forEach(function(value, key, map) {
  console.log(`${key} has ${value}`)
}, /* thisArgs bạn có thể truyền vào tham chiếu cho `this` ở đây */)

// Sử dụng for..of cùng với destructuring
for (let [key, value] of dict) {
  console.log(`${key} has ${value}`)
}
```

Bạn cũng có thể dùng toán tử spread `...` với `Map`

```js
const dict = new Map([
  ['foo', 1], ['bar', 2]
])
console.log([
  ['wut', 3],
  ...dict
])
// [ [ 'wut', 3 ], [ 'foo', 1 ], [ 'bar', 2 ] ]
```

Một số thao tác khác với `Map`.

```js
const dict = new Map([
  ['foo', 1], ['bar', 2]
])

// Đếm số cặp giá trị trong map
dict.size // 2

// Kiểm tra trong map có khóa "foo" hay không
dict.has('foo') // true
dict.has('wut') // false

// Xóa một khóa, trả về boolean nếu thành công, false nếu thất bại
dict.delete('wut') // false
dict.delete('foo') // true

// Xóa hết các cặp giá trị của map
dict.clear()
```

> **Tại sao lại là `size` mà không phải `length`?**
> Một số độc giả tinh ý sẽ nhận ra chúng ta dùng `size` thay vì `length` để đếm số cặp giá trị trong map. Lý giải cho việc này là, `length` dùng cho những chuỗi có thể index (đánh số) được, ví dụ với mảng ta có thể `arr[3]`. Ngược lại, `size` dành cho những cấu trúc không có thứ tự như `Map`  và `Set`.

### Set

`Set` là tập hợp các giá trị không bị trùng lắp, nghĩa là trông một set không thể có hai giá trị bằng nhau.

```js
const s = new Set()
set
  .add('red')
  .add('blue')
  .add('sweet')
  .add('you')

s.size // 4
```

Bạn cũng có thể truyền một mảng vào hàm dựng của `Set`.

```js
const s = new Set(['red', 'blue', 'sweet', 'red', 'you'])
console.log(s) // Set (4) {'red', 'blue', 'sweet', 'you'}
```

Bạn cũng có thể thấy giá trị `'red'` bị trùng lắp đã được loại bỏ. Chúng ta có thể áp dụng Set để tạo ra một mảng chứa những phần tử duy nhất.

```js
const a = ['red', 'blue', 'sweet', 'red', 'you']
const b = [...new Set(a)]
console.log(b) // [ 'red', 'blue', 'sweet', 'you' ]
```

Cũng tương tự như `Map`, `Set` sử dụng `SameZeroValue` để so sánh các phần tử với nhau.

```js
const obj = {}
const s = new Set([NaN, {}, obj])
s.has(NaN) // true
s.has(obj) // true
s.has({})  // false
```

Để duyệt qua các phần tử của `Set`, bạn có thể dùng các phương thức như với `Map`.

```js
const s = new Set([1, 2, 3, 4, 5])

// Vì Set không có khái niệm keys nên kết quả của `s.keys()` và `s.values()` là như nhau.
s.keys()
s.values()

s.entries()
s.forEach(function(value, key, setReference) {
}, thisArg)

for (let el of s) {
  console.log(el)
}
```

Một số thao tác khác trên `Set`.

```js
const s = new Set([1, 2, 3, 4, 5])

// Xóa một phần tử trong set
s.delete(3) // Set (4) {1, 2, 4, 5}

// Xóa hết phần tử trong set
s.clear()
```

### WeakMap và WeakSet

ES6 cũng giới thiệu hai lớp `WeakMap` và `WeakSet`. So với `Map`, các khóa của `WeakMap` bắt buộc phải là object, và chúng sẽ bị giải phóng khỏi bộ nhớ (garbage-collecting -- "hốt rác") đầu tiên nếu không có tham chiếu nào. `WeakMap` có các phương thức tương tự như `Map`, ngoại trừ bạn không thể duyệt qua `WeakMap` bằng `.keys()`, `.values()`, `.entries()` hay `for..of`. Bạn cũng không thể `.clear()`, vì lý do an toàn dữ liệu.

Một ứng dụng của `WeakMap` là dùng để chứa dữ liệu private mà không gây ra rò rỉ bộ nhớ.

```js
const privates = new WeakMap()

class User {
  constructor() {
    const data = { phoneNumber: 123 }
    privates.set(this, data)
  }

  getPhoneNumber() {
    const data = privates.get(this)
    return data.phoneNumber
  }
}
const u = new User()
console.log(u) // {}
console.log(u.getPhoneNumber()) // 123
```

Tương tự như `WeakMap`, `WeakSet` cũng chỉ có thể chứa object, và nếu một phần tử trong `WeakSet` không có tham chiếu tới, nó sẽ bị giải phóng khỏi bộ nhớ.

### Kết luận

Với những cải tiến so với object thông thường, `Map` sẽ là công cụ hữu hiệu để lưu trữ dữ liệu dạng `(khóa, giá trị)`. Trong khi đó, `Set` giúp bạn lưu trữ chuỗi dữ liệu mà không lo lắng về việc trùng lắp giá trị.

#### Tham khảo

[1] Axel Rauschmayer. ECMAScript 6: maps and sets. Truy cập ngày 25 tháng 03 năm 2018 từ [http://2ality.com/2015/01/es6-maps-sets.html](http://2ality.com/2015/01/es6-maps-sets.html)

[2] Keyed Collections - JavaScript | MDN. Truy cập ngày 25 tháng 03 năm 2018 từ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)

[3] Steve Brownlee. WeakMap for JavaScript Private Data. Truy cập ngày 25 tháng 03 năm 2018 từ [https://www.stevebrownlee.com/weakmap-javascript-private-data/](https://www.stevebrownlee.com/weakmap-javascript-private-data/)
