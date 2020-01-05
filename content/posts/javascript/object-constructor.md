---
layout: post.njk
title: Những phương thức hữu ích của Object constructor
slug: javascript-useful-object-constructor-methods
date: 2019-03-02
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1551644514/composition-8.jpg
tags: JavaScript, ES6, ES2015, Object, Object constructor, Dành cho người mới
excerpt: 'Có thể bạn đã dùng `Object.keys()` hay `Object.values()` để xử lý objects trong JavaScript, nhưng bạn có biết Object constructor còn có những phương thức hữu ích khác?'
author: kcjpop
editor: chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1551644514/composition-8.jpg)
_Composition VIII -- Wassily Kandinski (1866–1944) [nguồn: Wikipedia](https://www.wikidata.org/wiki/Q19609199)_

Nếu làm việc với JavaScript trong thời gian gần đây, có lẽ bạn đã biết đến lớp `Object` và sử dụng qua những phương thức như `Object.keys()`, `Object.values()` hay `Object.entries()`. Nhưng bạn có biết lớp `Object` còn có những phương thức khác cũng hữu ích không kém. Hãy cùng Ehkoo "chỉ mặt gọi tên" chúng và tìm hiểu cách sử dụng nhé.

## Object

Đầu tiên phải nói về chính `Object`. Bản thân nó là một hàm dựng (constructor) được dùng để tạo ra thể hiện (instance) của lớp kiểu dữ liệu tương ứng cho giá trị được truyền vào. Nếu `value` là `null` hay `undefined`, kết quả sẽ là một đối tượng rỗng.

Nghe có vẻ lùng bùng nhưng nhìn ví dụ dưới đây thì bạn sẽ hiểu ngay thôi.

```js
Object('Hello') // String { "Hello" }
Object(1) // Number { 1 }
Object(true) // Boolean { true }
Object([1, 2, 3]) // Array(3) [ 1, 2, 3 ]
Object({ foo: 1 }) // Object { foo: 1 }
Object(null) // Object { }
```

Lưu ý là `Object(value)` và `new Object(value)` là như nhau.

## Object.create()

`Object.create(prototype, [properties])` cho phép bạn tạo một thể hiện của một lớp bằng cách dùng prototype mà không cần phải gọi đến hàm dựng (constructor). Ví dụ:

```js
class User {
  constructor() {
    this.createdAt = new Date()
  }
}

const u = Object.create(User.prototype)
console.log(u.constructor === User) // true
console.log(u.createdAt) // undefined

// So sánh khi dùng từ khoá `new`
const u2 = new User()
console.log(u2.createdAt) // 2019-03-03T19:19:02.528Z
```

Một trong những ứng dụng phổ biến của `Object.create()` là tạo ra đối tượng không kế thừa từ bất cứ lớp nào, hay nói một cách khác, không có prototype. Vì mặc định trong JavaScript, khi bạn khai báo một object literal như thế này...

```js
const obj = { foo: 1 }
```

...bản thân của `obj` là một thể hiện của lớp `Object` và `obj.constructor === Object`. Bằng cách gọi `Object.create(null)` hoặc `Object.create(undefined)`, chúng ta có thể tạo ra những đối tượng "không cha không mẹ, là tinh tuý của đất trời".

```js
const tonNgoKhong = Object.create(null)
console.log(tonNgoKhong.prototype) // undefined
```

> Nếu đã học qua Java/C# thì chắc bạn đã nghe tới [tất cả các lớp đều được kế thừa từ lớp Object](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html).

Tham số `properties` của `Object.create()` cho phép bạn khai báo những thuộc tính của thể hiện được tạo bằng cách truyền vào các property descriptors.

### Vậy property descriptor là gì?

_Property descriptor_ (mô tả thuộc tính) là một object JavaScript thông thường (Plain Old JavaScript Object - POJO), được sử dụng trong `Object.create()`, `Object.defineProperty(), hoặc`Object.defineProperties()` để thay đổi các thuộc tính đã có của một đối tượng, hoặc tạo đối tượng mới. Ví dụ:

```js
const u = Object.create(User.prototype, {
  id: {
    // Sử dụng data descriptor
    writable: false,
    configurable: true,
    value: UuidV4.generate(),
  },
  name: {
    // Còn đây là accessor descriptor
    get() {
      return this.value
    },
    set(name) {
      this.value = name.toUpperCase()
    },
    configurable: true,
  },
})

u.name = 'pitkalong'
console.log(u.id) // 2c40c95c-845a-4242-85a0-f603ec83fd2e
console.log(u.name) // PITKALONG
```

Property descriptor được chia làm hai loại: _accessor descriptors_ và _data descriptors_. Bạn chỉ có thể sử dụng **MỘT TRONG HAI** loại descriptor này cùng lúc mà thôi.

```js
{
  // Hai thiết lập này dùng chung cho tất cả property descriptors
  configurable: true,
  enumerable: true,

  // Chỉ dành riêng cho accessor descriptors
  get() { return this.value },
  set(newValue) { this.value = newValue },

  // Chỉ dành riêng cho data descriptors
  value: 37,
  writable: true,
}
```

Trong đó:

- **configurable:** Nếu bằng `true`, _property descriptor_ của thuộc tính này có thể được thay đổi, hoặc thuộc tính này có thể được xoá ra khỏi đối tượng. Mặc định: `false`.
- **enumerable**: Nếu bằng `true`, thuộc tính này có thể được truy xuất khi dùng `for...in` hoặc `Object.keys()`. Mặc định: `false`.

Accessor descriptors là một cặp getter/ setter gồm hai hàm:

- **get: () -> any** Hàm `get()` trả về giá trị của thuộc tính, hoặc `undefined` nếu không được khai báo.
- **set: any -> ()** Hàm `set(value)` nhận vào một giá trị bất kì.

Data descriptors lại bao gồm hai thiết lập sau:

- **value**: Cái này quá rõ ràng rồi, không cần phải nói nhiều.
- **writable**: Nếu bằng `true`, thuộc tính này có thể được gán giá trị mới. Mặc định: `false`.

Nếu bạn khai báo một mô tả thuộc tính mà có chứa lẫn lộn accessor và data descriptors, trình biên dịch sẽ quăng ra một TypeError.

```js
Object.create(null, {
  age: {
    get() {
      return this.value
    },
    value: 18,
  },
})
// TypeError: property descriptors must not specify a value or be writable when
// a getter or setter has been specified
```

## Object.defineProperty() và Object.defineProperties()

Hai phương thức này cho phép chúng ta khai báo thuộc tính mới, hoặc thay đổi một thuộc tính đã có của một object bằng cách sử dụng property descriptors, như đã trình bày ở phần trước. `Object.defineProperty(obj, prop, descriptor)` cho phép bạn thay đổi một thuộc tính duy nhất.

```js
const u = {}

Object.defineProperty(u, 'age', {
  value: 24,
  enumerable: true,
})

// Khai báo một thuộc tính để chứa dữ liệu ẩn
Object.defineProperty(u, 'internalName', {
  writable: true, // Đừng quên mặc định `writable` có giá trị false
  enumerable: false, // Không hiển thị thuộc tính này
})

// `this` trong getter/ setter là biến `u`
Object.defineProperty(u, 'name', {
  enumerable: true,
  get() {
    return this.internalName
  },
  set(name) {
    this.internalName = name.toUpperCase()
  },
})

u.name = 'pitkalong'
console.log(u) // { age: 24, name: 'PITKALONG', internalName: 'PITKALONG' }
```

Trong khi `Object.defineProperties(obj, props)` lại cho phép bạn thay đổi nhiều thuộc tính cùng lúc.

```js
const u = {}
Object.defineProperties(u, {
  age: { value: 24 },
  name: { value: 'pitkalong' },
})
```

> Ủa sao không gán đại thuộc tính vô như vầy `u.age = 24` mà phải viết chi dài dòng cực vậy?

Điểm khác nhau ở đây là...

```js
u.age = 24
// tương đương với...
Object.defineProperty(u, 'age', {
  value: 24,
  writable: true,
  configurable: true,
  enumerable: true,
})

// trong khi...
Object.defineProperty(u, 'age', { value: 24 })
// lại là...
Object.defineProperty(u, 'age', {
  value: 24,
  writable: false,
  configurable: false,
  enumerable: false,
})
```

## Object.assign()

Phương thức này chắc khá quen thuộc rồi. `Object.assign(target, ...sources)` sẽ sao chép những thuộc tính có thể duyệt được (enumerable) của các đối tượng nguồn (sources) qua đối tượng đích (target).

```js
const u = Object.create(null, {
  id: { value: 1, enumerable: true },
  name: { value: 'pitkalong', enumerable: true },
  password: { value: 'supersecret', enumerable: false },
})

const u1 = Object.assign(u, { age: 24 })
console.log(u1) // { id: 1, name: 'pitkalong', age: 24 }
console.log(u1 === u) // true
```

Thông thường chúng ta sẽ dùng `Object.assign()` để sao chép một đối tượng, thế nên bạn hay thấy tham số đầu tiên của `Object.assign()` là một đối tượng rỗng.

```js
const u2 = Object.assign({}, u, { age: 24 })
console.log(u2 === u) // false
```

Nhưng giờ thì ai cũng xài object spread cho nhanh hết rồi.

```js
const u3 = { ...u, age: 24 }
console.log(u3) // { id: 1, name: 'pitkalong', age: 24 }
```

## Object.preventExtensions()

`Object.preventExtensions(obj)` làm một chuyện rất đơn giản: không cho phép bạn thêm thuộc tính mới vào đối tượng. Để kiểm tra một đối tượng có thể được mở rộng hay không, bạn có thể dùng phương thức `Object.isExtensible(obj)`.

```js
const obj = {}
Object.isExtensible(obj) // true
Object.preventExtensions(obj)
Object.isExtensible(obj) // false

Object.defineProperty(obj, 'foo', { value: 1 })
// TypeError: Cannot define property foo, objectis not extensible
```

## Object.seal()

`Object.seal(obj)` ngăn không cho bạn thêm thuộc tính mới vào đối tượng, và không cho phép thay đổi _hành vi_ những thuộc tính đã có. Nhưng bạn vẫn có thể thay đổi giá trị của chúng.

Để kiểm tra một đối tượng có bị phong kín hay không, bạn dùng `Object.isSealed(obj)`.

```js
const u = Object.create(null, {
  id: { value: 1, writable: true },
  name: { value: 'pitkalong', enumerable: true },
})
Object.seal(u)

// Thử thay đổi không cho duyệt qua `u.name`
Object.defineProperty(u, 'name', { enumerable: false })
// TypeError: Cannot redefine property: name
```

## Object.freeze()

`Object.freeze(obj)` "đông cứng" một đối tượng: không cho phép thêm vào thuộc tính mới, hay thay đổi hành vi của những thuộc tính đã có, hay xóa thuộc tính. Nói tóm lại, không làm được gì cả :D

Bạn có thể dùng `Object.isFrozen(obj)` để kiểm tra một object có bị đông cứng không. Tình hình là hiện tại không có phương thức nào để "rã đông" một đối tượng hết.

```js
const config = Object.freeze({ USER: 'u', PASS: 'p' })
Object.isFrozen(config) // true
delete config.USER // Không có lỗi xảy ra, nhưng config.USER vẫn tồn tại
console.log(config) // { USER: 'u', PASS: 'p' }

// TypeError: Cannot define property SECRET_KEY, object is not extensible
Object.defineProperty(config, 'SECRET_KEY', { value: 's4cr3d' })

// TypeError: Cannot redefine property: USER
Object.defineProperty(config, 'USER', { value: 'user' })
```

## Object.keys() và Object.values()

Cặp đôi hoàn cảnh này thì quá quen thuộc rồi. `Object.keys(obj)` trả về một mảng chứa tên các thuộc tính của một đối tượng, và `Object.values(obj)` trả về một mảng chứa giá trị của các thuộc tính đó.

```js
const u = { id: 1, name: 'pitkalong', age: 24 }
const keys = Object.keys(u) // [ 'id', 'name', 'age' ]
const values = Object.values(u) // [ 1, 'pitkalong', 24 ]
```

Đừng quên là những thuộc tính này phải có `enumerable = true` nhé.

## Object.entries()

`Object.entries(obj)` trả về một mảng các cặp (pair) thuộc tính có dạng `[tên thuộc tính, giá trị]`. Ví dụ:

```js
const u = { id: 1, name: 'pitkalong', age: 24 }
Object.entries(u)
// Kết quả:
[
  ['id', 1],
  ['name', 'pikalong'],
  ['age', 24],
]
```

`Object.entries()` rất hữu ích khi bạn cần truy xuất tên và giá trị của thuộc tính cùng lúc. Chẳng hạn như:

```js
const settings = {
  websiteUrl: 'https://ehkoo.com',
  facebookUrl: 'https://facebook.com/ehkoo.dev',
}

return (
  <SettingContainer>
    {Object.entries(settings).map(([key, value]) => (
      <TextInputField key={key} name={key} value={value} />
    ))}
  </SettingContainer>
)
```

Lưu ý là thứ tự của các cặp thuộc tính được trả về không phụ thuộc vào thứ tự chúng được khai báo nhé. Bạn cũng có thể dùng `Object.entries()` để chuyển đổi một object thường thành `Map`, `WeakMap` hay bất cứ constructor nào nhận một mảng các cặp `[key, value]`.

```js
const settingMap = new Map(Object.entries(settings))
```

## Object.fromEntries()

`Object.fromEntries(entries)` giúp bạn chuyển đổi mảng, `Map`, hay bất cứ đối tượng nào sử dụng giao thức lặp (iterable protocol) thành object.

```js
const obj = Object.fromEntries(settingMap)
```

`Object.fromEntries()` đã được đề xuất lên TC-39 và đang ở [stage 4](http://2ality.com/2019/01/object-from-entries.html) nên sẽ xuất hiện trong ES2019. Hiện tại Firefox là trình duyệt duy nhất hỗ trợ mặc định phương thức này, V8 (Chrome/Nodejs) đã có kế hoạch trong [tương lai không xa](https://mobile.twitter.com/v8js/status/1093457099441561611).

## Object.is()

Phương thức `Object.is(value1, value2)` giúp bạn so sánh hai giá trị có bằng nhau không. `value1` được xem là bằng `value2` nếu:

- Cả hai cùng là `undefined`
- Cả hai cùng là `null`
- Cả hai cùng là `true`, hoặc cùng là `false`
- Cả hai cùng là chuỗi có độ dài bằng nhau với các ký tự được xếp theo cùng một thứ tự
- Cả hai cùng trỏ về một đối tượng
- Cả hai cùng là `+0`, `-0`, hoặc `NaN`
- Cả hai cùng là số khác 0, không phải `NaN` và có giá trị bằng nhau

Điểm khác nhau giữa phương thức này với `==` là `==` có thực hiện ép kiểu nếu `value1` và `value2` không cùng một kiểu giá trị, trong khi `Object.is()` không thực hiện việc chuyển đổi này. `Object.is()` cũng khác `===` vì `===` xem `+0 === -0` và `Number.NaN !== NaN`.

```js
Object.is('foo', 'foo') // true
Object.is(window, window) // true

Object.is('foo', 'bar') // false
Object.is([], []) // false

const foo = { a: 1 }
const bar = { a: 1 }
Object.is(foo, foo) // true
Object.is(foo, bar) // false

Object.is(null, null) // true

// Trường hợp đặc biệt
Object.is(0, -0) // false
Object.is(-0, -0) // true
Object.is(NaN, 0 / 0) // true
```

## Kết luận

Có lẽ đọc xong bài viết này bạn chỉ cần ghi nhớ về các giá trị `{ writable, enumerable, configurable }` của một thuộc tính trong đối tượng là đủ rồi. Bạn có thể không sử dụng `Object.freeze()` hay `Object.seal()` trong công việc hàng ngày, nhưng biết đến sự tồn tại của chúng có thể sẽ hữu ích trong một số trường hợp đấy.
