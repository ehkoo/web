---
layout: ../../layouts/Post.astro
title: Tìm hiểu về Proxy trong ES6
slug: tim-hieu-ve-proxy-trong-es6
date: 2018-06-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1530343978/ehkoo/dragon_knight_by_peridott.jpg
tags: JavaScript, ES6, ES2015, Proxy, Dành cho người mới
excerpt: ES6 giới thiệu lớp Proxy giúp việc lập trình meta trong JavaScript trở nên dễ dàng hơn. Hãy cùng Ehkoo tìm hiểu Proxy là gì và viết thử một demo nho nhỏ nhé.
author: kcjpop
editor: chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1530343978/ehkoo/dragon_knight_by_peridott.jpg)
_Dragon Knight -- Minh họa bởi [MelDraws](https://meldraws.deviantart.com/art/Dragon-Knight-160860604)_

Nói về ES6 có lẽ chúng ta đã quá quen thuộc với các khái niệm như `const` và `let`, hàm mũi tên, class hay [những tính năng hay ho hấp dẫn khác](https://ehkoo.com/bai-viet/tong-hop-tinh-nang-noi-bat-es6). Ngoài ra, ES6 cũng kèm theo những tính năng ít người biết hơn nhưng cũng rất thú vị, và một trong số đó là Proxy.

**Bạn đừng bỏ qua: [Tìm hiểu Map và Set trong JavaScript](https://ehkoo.com/bai-viet/map-set-javascript-es6-es2015)**

### Proxy là gì?

Proxy là một class được giới thiệu từ ES6, cho phép bạn can thiệp và thay đổi hành vi của một đối tượng (object). Các hành vi này bao gồm: truy xuất/thiết lập thuộc tính của một đối tượng, thay đổi prototype, gọi hàm, khởi tạo đối tượng bằng từ khóa `new`... Để hiểu rõ hơn về khái niệm, bạn có thể xem qua ví dụ sau:

```js
const u = { name: 'Công Tằng Tôn Nữ Tạ Thị Tòn Ten' }

// Thiết lập proxy cho đối tượng `u`
const p = new Proxy(u, {
  // `get` là một trap, sẽ được gọi khi truy xuất đến thuộc tính
  // của đối tượng
  get(target, prop, receiver) {
    // Thay đổi hành vi khi truy xuất đến một thuộc tính: Nếu là
    // chuỗi, chuyển sang chữ hoa
    if (typeof target[prop] === 'string') return target[prop].toUpperCase()

    return target[prop]
  },
})

console.log(p.name) // CÔNG TẰNG TÔN NỮ TẠ THỊ TÒN TEN
p.email = 'ta.thi@ton.ten'
console.log(p.email) // TA.THI@TON.TEN
```

Chúng ta có thể áp dụng Proxy cho bất cứ object nào trong JavaScript, kể cả mảng, hàm hay một proxy khác.

> **Có thể bạn thừa biết**
> Một hàm trong JavaScript là một thể hiện của lớp Function.

Hiện tại Proxy đã được hỗ trợ bởi các trình duyệt xịn (nghĩa là không có IE đó) và node.js v6 trở đi.

> **Tin vắn**
> Phiên bản 5.0 của [MobX](https://github.com/mobxjs/mobx) đã hoàn toàn sử dụng ES6 Proxy.

### Sử dụng như thế nào?

Trước hết, hãy xem qua những thuật ngữ thông dụng khi làm việc với Proxy:

- **target**: là đối tượng sẽ được áp dụng proxy vào
- **traps**: là những phương thức giúp bạn thay đổi hành vi của đối tượng
- **handler**: là một object chứa các traps, được đưa vào hàm dựng của lớp Proxy

Để khởi tạo proxy, bạn dùng `new Proxy(target, handler)` như bên dưới:

```js
const p = new Proxy(target, handler)
```

Chúng ta sẽ cùng đi qua những traps thông dụng.

#### `handler.get()` và `handler.set()`

Như tên gọi, `handler.get()` và `handler.set()` cho phép bạn can thiệp khi truy xuất và thiết lập giá trị một thuộc tính của đối tượng.

```js
// property: tên của thuộc tính được truy xuất
// receiver: đối tượng sau khi đã được gắn proxy
handler.get(target, property, receiver)

// value: giá trị sẽ được thiết lập cho thuộc tính
// handler.set() phải trả về một giá trị boolean. Nếu là true thì xem như thiết lập
// thành công, ngược lại nếu là false thì xảy ra lỗi TypeError.
handler.set(target, property, value, receiver)
```

Chúng ta có thể dùng `handler.set()` để kiểm tra tính đúng đắn dữ liệu (data validation) trên thuộc tính của đối tượng. Chẳng hạn như:

```js
const u = { age: null }
const p = new Proxy(u, {
  set(target, prop, val) {
    if (prop === 'age' && typeof val !== 'number') throw new TypeError('Age must be a number')

    target[prop] = val
    return true
  },
})

p.age = '10' // Error: Age must be a number
p.age = 10 // OK!
```

#### `handler.defineProperty()` và `handler.deleteProperty()`

`handle.defineProperty(target, property, descriptor)` là trap được kích hoạt khi sử dụng `Object.defineProperty()`. Phương thức này đòi hỏi phải trả về một giá trị boolean. Ví dụ:

```js
const p = new Proxy(
  { foo: 1, bar: true },
  {
    defineProperty(target, property, descriptor) {
      if (property.startsWith('_')) throw new Error('Properties starting with _ are not allowed')
      return Object.defineProperty(...arguments)
    },
  },
)

p._hello = 1 // Error
Object.defineProperty(p, '_hello', { value: 1 }) // Error

p.hello = 1
Object.defineProperty(p, 'hello', { value: 1 })
```

> `descriptor` là một object quy định hành vi của thuộc tính được khai báo. Chi tiết về `descriptor` bạn có thể xem ở trang [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) hoặc hóng bài viết tiếp theo của Ehkoo.

`handle.deleteProperty(target, property)` sẽ được kích hoạt khi thực hiện `delete` một thuộc tính. Phương thức này phải trả về `true` nếu quá trình xóa được chấp nhận. Ví dụ:

```js
const p = new Proxy(
  { foo: 1, bar: true },
  {
    deleteProperty(target, property) {
      delete target[property]
      console.log(`${property} was removed`)
      return true
    },
  },
)

delete p.foo // foo was removed
delete p.bar // bar was removed
```

#### `handler.has()`

`handler.has()` sẽ được kích hoạt khi sử dụng `in`. Phương thức này cũng đòi hỏi phải trả về một giá trị boolean. Ví dụ:

```js
const p = new Proxy(
  { _foo: 1, bar: true },
  {
    has(target, property) {
      if (property.startsWith('_')) return false
      return property in target
    },
  },
)

console.log('bar' in p) // true
console.log('_foo' in p) // true
```

#### `handler.apply()`

`handler.apply(target, thisArg, args)` là trap dành cho các hàm, sẽ được khởi động khi hàm được gọi. Ví dụ:

```js
const sum = (a, b) => a + b
const f = new Proxy(sum, {
  apply(target, thisArg, args) {
    const [a, b] = args
    return target.call(thisArg, a * 2, b * 2)
  },
})

f(1, 2) // 6
```

#### `handler.construct()`

`handler.construct(target, args)` là trap sẽ được gọi khi khởi tạo đối tượng bằng `new`. Ví dụ:

```js
class User {
  constructor(username) {
    this.username = username
  }
}

const PUser = new Proxy(User, {
  construct(target, args) {
    const [username] = args
    return new target(username.toUpperCase())
  },
})

const u = new PUser('pikalong')
console.log(u.username) // PIKALONG
```

#### `handler.getPrototypeOf()` và `handler.setPrototypeOf()`

Như tên gọi, hai traps này sẽ được kích hoạt khi sử dụng `Object.getPrototypeOf()` và `Object.setPrototypeOf()` trên đối tượng.

> **Ghi chú**
> Bên cạnh những traps được giới thiệu ở đây, còn có một số traps khác mà bạn có thể tham khảo ở trang [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Viết thử nào

Bạn có dùng thử [`chai`](http://www.chaijs.com/) chưa? Thư viện này hỗ trợ viết kiểm chứng (assertion) theo phong cách BDD/TDD, giống như thế này:

```js
// chai.expect
expect(foo).to.be.a('string')
expect(foo).to.equal('bar')
expect(foo).to.have.lengthOf(3)

// hoặc chai.should
foo.should.be.a('string')
foo.should.equal('bar')
foo.should.have.lengthOf(3)
```

Cách thiết kế này rõ ràng giúp cho chương trình trở nên mạch lạc và dễ theo dõi vì câu kiểm chứng được viết như một câu tiếng Anh vậy. Chúng ta có thể bắt chước `chai` và thử viết một lớp `Thing` có những khả năng sau:

```js
// Khởi tạo một đối tượng của lớp Thing với tên là "Phương"
const t = new Thing('Phương')
t.name // 'Phương'

// Khai báo các thuộc tính boolean
t.is_a.singer
t.is_not_a.man

// Kiểm tra thuộc tính
t.is_a_singer // true
t.is_a_man // false

// Khai báo phương thức
t.can.sing('Yêu hay không yêu không yêu hay yêu nói một lời')
t.sing() // Phương sings: Yêu hay không yêu không yêu hay yêu nói một lời
```

> Đây là một phần trong bài [The builder of things](https://www.codewars.com/kata/5571d9fc11526780a000011a) được lấy từ Codewars. Sau khi đọc hết bài viết này thì bạn hãy thử giải thử thách trên xem sao, bảo đảm kết quả không làm bạn thất vọng đâu.
> Ngoài ra nếu bạn có tham gia Codewars thì đừng quên gia nhập clan Ehkoo nhé ;)

Đầu tiên, để truy xuất thuộc tính `name`, chúng ta có thể nghĩ đến giải pháp "vô cùng rõ ràng và ngây thơ" sau:

```js
class Thing {
  constructor(name) {
    this.name = name
  }
}
```

Đoạn code trên hoàn toàn hợp lý, nhưng sẽ không giúp chúng ta giải quyết những yêu cầu tiếp theo của bài toán. Phân tích kỹ một chút ta có thể thấy việc dùng Proxy là không thể tránh khỏi. Do đó để cài đặt `t.name` bằng Proxy, ta có thể viết lại thành:

```js
class Thing {
  constructor(name) {
    this.state = { name }
    return proxify(this, this.state)
  }
}

// Hàm proxify() nhận vào một target và một object chứa state.
// State này sẽ được sử dụng để giải quyết những yêu cầu tiếp theo.
function proxify(target, state) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      // Nếu truy xuất đến thuộc tính `name`, lấy ra dữ liệu trong state
      if (prop === 'name') return state[prop]

      // Còn lại thì sử dụng hành vi mặc định
      return target[prop]
    },
  })
}

const t = new Thing('Phương')
console.log(t.name) // Phương
console.log(t.age) // undefined
```

Vậy là tạm ổn phần lấy `name`. Chúng ta xem tiếp đến hành vi tiếp theo của lớp Thing.

```js
t.is_a.singer
t.is_not_a.man

t.is_a_singer // true
t.is_a_man // false
```

Hành vi này cho phép khai báo thuộc tính boolean trên đối tượng bằng cách sử dụng `is_a` cho giá trị `true` và `is_not_a` cho giá trị `false`. Sau đó ta có thể kiểm tra thuộc tính bằng cách truy xuất đến `is_a_${prop}`. Để cài đặt hành vi này, chúng ta có thể làm như sau:

1. Khai báo thêm một khóa `booleans: {}` cho `state`. Khóa này đóng vai trò như một bảng tham chiếu giữa tên thuộc tính boolean và giá trị của nó, chẳng hạn như `{ singer: true, man: false }`. Ngoài ra chúng ta cũng cần thêm vào `state` một cờ `inBooleanMode: false`.
2. Nếu `prop` là `is_a` hoặc `is_not_a`, bật cờ `inBooleanMode: true`
3. Nếu cờ `inBooleanMode` đang bật, thuộc tính tiếp theo sẽ là thuộc tính boolean. Do đó ta cập nhật `booleans` của `state` thành `{ ...booleans, [prop]: state.booleanValue }`

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1530343401/ehkoo/proxy_iah0182.jpg)

```js
function enterBooleanMode(receiver, state, booleanValue) {
  // Bật cờ
  state.inBooleanMode = true
  // Lưu lại giá trị boolean tùy thuộc vào là `is_a` hay `is_not_a`
  state.booleanValue = booleanValue
  return receiver
}

function setBoolean(receiver, state, prop) {
  state.booleans = {...state.booleans, [prop]: state.booleanValue }
  // Reset lại các giá trị
  state.inBooleanMode = false
  state.booleanValue = null

  return receiver
}

get(target, prop, receiver) {
  // Đặt ở đây để tránh trường hợp gọi t.is_a.is_a
  if (state.inBooleanMode) return setBoolean(this, state, prop)

  if (prop === 'name') return state[prop]
  if (prop === 'is_a') return enterBooleanMode(receiver, state, true)
  if (prop === 'is_not_a') return enterBooleanMode(receiver, state, false)
  if (prop.startsWith('is_a_')) return state.booleans[prop.replace('is_a_', '')]

  return target[prop]
}
```

Kiểm tra thử.

```js
const t = new Thing('Phương')

t.is_a.singer
t.is_not_a.man
console.log(t.is_a_singer) // true
console.log(t.is_a_man) // false
```

Để cài đặt hành vi tiếp theo, chúng ta cũng có thể làm tương tự như khai báo thuộc tính boolean bằng cách đặt thêm một cờ `inDefineMethodMode` và bật/tắt cờ này tương ứng. Bên cạnh đó chúng ta cũng đặt thêm một khóa `methods` trong `state` để chứa các phương thức được khai báo thông qua `can`.

```js
get(target, prop, receiver) {
  // ...
  if (state.inDefineMethodMode) return setMethod(receiver, state, prop)
  if (prop === 'can') return enterDefineMethodMode(receiver, state)

  // Lấy ra phương thức được khai báo bởi `t.can`
  if (state.methods[prop]) return state.methods[prop]
  // ...
}
```

Ở đây có một chút khó khăn. Có thể thấy trong `t.can.sing(phrase)`, `sing` phải là một hàm. Do đó giá trị trả về của `setMethod()` có thể được viết như sau:

```js
function setMethod(receiver, state, prop) {
  // Đừng quên tắt cờ sau khi cài đặt method
  state.inDefineMethodMode = false

  return (phrase) => {
    // Tạo ra hàm mới
    const f = () => `${state.name} ${prop}: ${phrase}`
    // Lưu vào danh sách các phương thức được khai báo bởi `t.can`
    state.methods = { ...state.methods, [prop]: f }
  }
}

t.can.sing('Yêu hay không yêu không yêu hay yêu nói một lời')
console.log(t.sing()) // Phương sing: Yêu hay không yêu không yêu hay yêu nói một lời
```

Vậy là được rồi. Chúng ta chỉ còn một bước nữa là chia "sing" sang ngôi thứ ba số ít "sings", nhưng thôi cái này để bạn tự làm nhé. Bạn có thể xem đầy đủ mã nguồn [ở đây](https://repl.it/repls/MiniCornyEditors).

### Kết

Proxy là một công cụ mạnh mẽ, giúp cho việc lập trình meta trong JavaScript trở nên dễ dàng hơn. Hi vọng bài viết này đã giúp bạn hiểu rõ hơn về Proxy và có thể ứng dụng nó trong công việc.

#### Tham khảo

_Proxy - MDN_ - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

_ES6 Proxies in Depth_ - [https://ponyfoo.com/articles/es6-proxies-in-depth](https://ponyfoo.com/articles/es6-proxies-in-depth)
