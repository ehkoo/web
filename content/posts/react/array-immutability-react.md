---
layout: post.njk
title: Những kỹ thuật đảm bảo tính bất biến (immutability) trong React
slug: array-object-immutability-react
date: 2018-01-31
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1517427149/REACTjs-cover_xd5qrm.jpg
tags: React, JavaScript
excerpt: Mảng (array) là một trong những cấu trúc dữ liệu thường gặp nhất trong JavaScript. Nhưng liệu bạn đã biết dùng nó đúng cách để đạt được tính bất biến (immutability)?
author: kcjpop
draft: true
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1517427149/REACTjs-cover_xd5qrm.jpg)

Khi làm việc với React, hẳn bạn đã nghe đến tính bất biến của dữ liệu (immutability) và được khuyến khích viết code để hướng đến đặc tính này. Tuy vậy, nếu bạn mới làm quen với JavaScript và React, có thể bạn sẽ hơi bỡ ngỡ và không biết làm thế nào cho "chuẩn nhất".

Không sao hết, bài viết dưới đây sẽ giới thiệu một số kỹ thuật giúp bạn hướng đến immutability một cách dễ dàng. Chúng ta cũng sẽ làm thử một demo nhỏ để ứng dụng những "tuyệt chiêu" được giới thiệu ở đây. Một lưu ý nhỏ là trong các đoạn code dưới đây, mình sẽ dùng kí hiệu 😃 để thể hiện đây là kết quả/hiệu ứng mong muốn.

Bắt đầu thôi!

### Luôn dùng `const` khi khai báo

ES6 với hai cách khai báo biến mới `let` và `const` .

### Giữ cho phương thức `render()` thuần khiết

Một hàm được xem là thuần khiết (pure) khi nó luôn trả về cùng một kết quả, nếu giá trị của tham số truyền vào không đổi, đồng thời bản thân hàm không thực hiện những thao tác có thể tạo ra [hiệu ứng lề](<https://vi.wikipedia.org/wiki/Hi%E1%BB%87u_%E1%BB%A9ng_l%E1%BB%81_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh)>). Ví dụ:

```js
// pure 😃
function add(x, y) {
  return x + y
}

// impure
function addAndShow(x, y) {
  console.log(x + y)
}
```

Hàm `add()` được xem là thuần khiết vì `add(2, 3)` luôn trả về giá trị 5. Hàm `Math.random()` thì ngược lại, vì giá trị trả về luôn thay đổi. Bên cạnh đó, `addAndShow()` cũng bị xem là không thuần khiết, vì nó in kết quả ra console.

Quay trở lại với React, bạn nên xem `render()` như một hàm thuần khiết với dữ liệu đầu vào là `this.props`. Hạn chế viết logic bên trong hàm `render()` mà thay vào đó nên đưa các bước thao tác dữ liệu thành từng phương thức riêng.

**Không nên**

```js
class Cart extends React.Component {
  render() {
    let total = 0
    for (let i = 0; i < this.props.cart.products; i++) {
      total = this.props.cart.products[i].price + total
    }

    return <h1>Cart total: {total}</h1>
  }
}
```

**Nên**

```js
class Cart extends React.Component {
  getCartTotal(cart) {
    return cart.products.reduce((acc, product) => acc + product.price, 0)
  }

  render() {
    const total = this.getCartTotal(this.props.cart)

    return <h1>Cart total: {total}</h1>
  }
}
```

### Thao tác trên object

Như đã nói ở phần trên, `const` không ngăn chặn việc thay đổi giá trị thuộc tính của các đối tượng. Nghĩa là:

```js
const a = { name: 'foo' }
a.name = 'bar'

console.log(a) // { name: 'bar' }
```

Để đảm bảo tính bất biến với object, chúng ta thường sử dụng những hàm tĩnh của đối tượng Object, chẳng hạn như `keys()`, `values()`, `entries()`, `assign()`...

Thay đổi giá trị của thuộc tính trong object

```js
const a = { name: 'foo' }
const b = Object.assign(a, { name: 'bar' }) // { name: 'bar' }
```

### Thao tác trên mảng

Bên cạnh object, mảng là cấu trúc dữ liệu rất thường gặp khi làm việc trong JavaScript. Để thay đổi dữ liệu của một mảng mà vẫn đảm bảo tính bất biến, bạn có thể sử dụng toán tử spread, được giới thiệu từ ES5. Với một số yêu cầu khác, chúng ta có thể áp dụng các hàm có sẵn của lớp Array, như `map()`, `filter()`, `reduce()`. Một đặc điểm của các hàm này là chúng luôn trả về mảng/giá trị mới chứ không thay đổi mảng ban đầu.

#### Áp dụng toán tử spread

Bạn có thể dùng spread để nhân bản một mảng.

```js
const a = [1, 2, 3, 4, 5]
const b = a
console.log(a === b) // true

const c = [...a]
console.log(a === c) // false 😃
```

Thêm một phần tử vào mảng

```js
const a = [1, 2, 3]

// Không nên: a.push(4)
const b = [...a, 4] // [1, 2, 3, 4]

// Không nên: a.unshift(0)
const c = [0, ...a] // [0, 1, 2, 3]
```

Nối hai mảng với nhau

```js
const a = [0, 1]
const b = [2, 3]

// Không nên: a.concat(b)
const c = [...a, ...b]
```

#### Áp dụng hàm có sẵn

Xóa một phần tử ra khỏi mảng các đối tượng

```js
const a = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' }]

const b = a.filter(obj => obj.id !== 2)
// [ { id: 1, name: 'Foo' }, { id: 3, name: 'Baz' } ]
```

Xóa một phần tử ở đầu mảng, cuối mảng hay ở bất cứ vị trí nào

```js
const a = [0, 1, 2, 3, 4]

// Không nên: a.pop()
const b = a.filter((_, index) => index !== 0) // [1, 2, 3, 4]
// Không nên: a.unshift()
const c = a.filter((_, index, arr) => index != arr.length - 1) // [0, 1, 2, 3]
const d = a.filter((_, index) => index !== 3) // [0, 1, 2, 4]
```

Thay đổi dữ liệu của mảng

```js
const a = [1, 2, 3]
const b = a.map(x => x * 2) // [2, 4, 6]

const c = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' }]
// [{ id: 1, name: 'FOO' }, { id: 2, name: 'BAR' }, { id: 3, name: 'BAZ' }]
const d = c.map(obj => Object.assign(obj, { name: obj.name.toUppercase() }))
```

### Demo
