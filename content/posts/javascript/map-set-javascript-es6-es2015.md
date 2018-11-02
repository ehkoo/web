---
layout: post.njk
title: Tìm hiểu Map và Set trong JavaScript
slug: map-set-javascript-es6-es2015
date: 2018-03-25
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1521964972/Hanoi-01_1250_tqa22l.jpg
tags: JavaScript, Map, Set, WeakMap, WeakSet, ES2015, ES6
excerpt: "ES6 vừa trình làng 2 cấu trúc dữ liệu mới: `Map` và `Set`, nghe đồn là nhanh hơn, được hỗ trợ tốt hơn bởi trình duyệt. Hãy cùng Ehkoo tìm hiểu cách thức hoạt động cũng như ứng dụng của chúng nhé!"
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1521964972/Hanoi-01_1250_tqa22l.jpg)
_Hà Nội -- minh họa bởi [Jing Zhang](http://mazakii.com/Portfolio/Maps-of-Asia)_

Được giới thiệu từ ES6, `Map`, `Set`, `WeakMap`, và `WeakSet` là những cấu trúc dữ liệu giúp thao tác trên tập hợp. Bài viết này sẽ giới thiệu cách hoạt động cũng như các ứng dụng của chúng.

### Map

_Map_, _mảng kết hợp_ (associate arrays) hay _từ điển_ (dictionary/dict) là những thuật ngữ dùng để chỉ một cấu trúc dữ liệu, cho phép bạn ánh xạ từ một _khóa_ (key) tương ứng với một _giá trị_ (value). Trong JavaScript, chúng ta có thể sử dụng _object_ để thể hiện cấu trúc này.

```js
const dict = {
  hello: 'Xin chào',
  bye: 'Tạm biệt',
}

console.log(dict['hello']) // Xin chào
```

Tuy nhiên, nếu dùng _object_ thì bạn chỉ có thể dùng _chuỗi_ làm _khóa_. Ngoài ra, cách này cũng có một số [hạn chế khác](http://speakingjs.com/es5/ch17.html#_pitfalls_using_an_object_as_a_map). Lớp `Map` do ES6 giới thiệu sẽ giúp giải quyết những vấn đề này. Với `Map`, bạn có thể sử dụng bất cứ dạng dữ liệu nào để làm _khóa_.

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

Bạn cũng có thể truyền vào hàm dựng của `Map` một mảng các cặp giá trị dạng `[key, value]`, ví dụ như sau:

```js
const dict = new Map([
  ['foo', 123],
  [obj, 'hello world']
])
```

Như đã nói ở trên, bạn có thể dùng bất cứ dạng dữ liệu gì để làm _khóa_ cho Map, kể cả mảng, object, hàm, hay `NaN`.

```js
const arr = [1]
const f = () => {}
dict
 .set(arr, 'an array')
 .set(f, 'a function')
 .set(NaN, 'not a number')
```

Bản thân `Map` sử dụng phương thức so sánh [`SameValueZero`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#A_model_for_understanding_equality_comparisons) để tìm _khóa_ và giá trị tương ứng. `SameValueZero` hoạt động tương tự như `===`, nhưng xem các giá trị `NaN` bằng nhau, cũng như `+0` bằng `-0`.

> **Đố-hẻm-vui**: Đố bạn kết quả của các biểu thức sau là gì?
>
> `NaN == NaN`
> `NaN === NaN`
> `Object.is(NaN, NaN)`

Do `SameValueZero` nên hai _object_ khác nhau sẽ là hai _khóa_ riêng biệt.

```js
const o1 = {}
const o2 = {}

dict.set(o1, 'Ô Một').set(o2, 'Ô Hai')
dict.get(o2) // Ô Hai
dict.get({}) // undefined
```

Nếu trong map đã có sẵn _khóa_, dữ liệu mới sẽ bị ghi đè lên.

```js
const m = new Map()
m.set('foo', 1)
m.set('foo', 2)

m.get('foo') // 2
```

Để duyệt qua các _khóa_ và giá trị trong `Map`, bạn có thể dùng:

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
> Một số độc giả tinh ý sẽ nhận ra chúng ta dùng `size` thay vì `length` để đếm số cặp giá trị trong map. Lý do là vì: `length` dùng cho những chuỗi có thể index (đánh số) được, ví dụ với _mảng_ ta có thể `arr[3]`. Ngược lại, `size` dành cho những cấu trúc không có thứ tự như `Map`  và `Set`.

### Set

`Set` là tập hợp các giá trị không bị trùng lặp, nghĩa là trong một _set_ không thể có hai giá trị bằng nhau.

```js
const s = new Set()
set
  .add('red')
  .add('blue')
  .add('sweet')
  .add('you')

s.size // 4
```

Bạn cũng có thể truyền một _mảng_ vào hàm dựng của `Set`.

```js
const s = new Set(['red', 'blue', 'sweet', 'red', 'you'])
console.log(s) // Set (4) {'red', 'blue', 'sweet', 'you'}
```

Bạn cũng có thể thấy giá trị `'red'` bị trùng lặp đã được loại bỏ. Chúng ta có thể áp dụng Set để tạo ra một _mảng_ chứa những phần tử duy nhất.

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

ES6 cũng giới thiệu hai lớp `WeakMap` và `WeakSet`. So với `Map`, các _khóa_ của `WeakMap` bắt buộc phải là _object_, và chúng sẽ bị giải phóng khỏi bộ nhớ (garbage-collecting -- "hốt rác") đầu tiên nếu không có tham chiếu nào.

`WeakMap` có các phương thức tương tự như `Map`, ngoại trừ việc bạn không thể duyệt qua `WeakMap` bằng `.keys()`, `.values()`, `.entries()` hay `for..of`. Bạn cũng không thể `.clear()`, vì lý do an toàn dữ liệu.

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

Tương tự như `WeakMap`, `WeakSet` cũng chỉ có thể chứa _object_, và nếu một phần tử trong `WeakSet` không có tham chiếu tới, nó sẽ bị giải phóng khỏi bộ nhớ.

### Kết luận

Với những cải tiến so với _object_ thông thường, `Map` sẽ là công cụ hữu hiệu để lưu trữ dữ liệu dạng `(khóa, giá trị)`. Trong khi đó, `Set` giúp bạn lưu trữ chuỗi dữ liệu mà không lo lắng về việc trùng lắp giá trị.

#### Tham khảo

[1] Axel Rauschmayer. ECMAScript 6: maps and sets. Truy cập ngày 25 tháng 03 năm 2018 từ [http://2ality.com/2015/01/es6-maps-sets.html](http://2ality.com/2015/01/es6-maps-sets.html)

[2] Keyed Collections - JavaScript | MDN. Truy cập ngày 25 tháng 03 năm 2018 từ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)

[3] Steve Brownlee. WeakMap for JavaScript Private Data. Truy cập ngày 25 tháng 03 năm 2018 từ [https://www.stevebrownlee.com/weakmap-javascript-private-data/](https://www.stevebrownlee.com/weakmap-javascript-private-data/)
