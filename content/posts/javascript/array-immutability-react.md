---
layout: post.njk
title: Tuyệt chiêu đảm bảo tính bất biến trong JavaScript
slug: array-object-immutability-javascript
date: 2018-01-31
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1517427149/REACTjs-cover_xd5qrm.jpg
tags: JavaScript, React, Dành cho người mới
excerpt: Mảng (array) và object là những cấu trúc dữ liệu thường gặp nhất trong JavaScript. Nhưng liệu bạn đã biết cách xử lý chúng để đạt được tính bất biến (immutability)?
author: kcjpop
form_footer: newsletter-footer
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1517427149/REACTjs-cover_xd5qrm.jpg)

Khi làm việc với React, hẳn bạn đã nghe đến tính bất biến của dữ liệu (immutability). Đặc tính này, nói một cách đơn giản, là khả năng giá trị của dữ liệu không bị thay đổi sau khi đã được khai báo. Tính bất biến giúp cho chương trình trở nên dễ dự đoán, ít xảy ra lỗi và trong một số trường hợp còn tăng hiệu suất của ứng dụng. Do đó, React (và Redux) đều khuyến khích mọi người viết code để hướng đến đặc tính này.

Tuy vậy, nếu mới làm quen với JavaScript và React, có thể bạn sẽ bỡ ngỡ không biết làm thế nào cho "chuẩn nhất". Bài viết dưới đây giới thiệu một số kỹ thuật giúp bạn hướng đến immutability một cách dễ dàng hơn. Chúng ta sẽ nói về hàm thuần khiết, các thao tác xử lý dữ liệu trên mảng và object. Cuối cùng, bạn có thể áp dụng ngay những "tuyệt chiêu" vừa học để xây dựng một demo nhỏ bằng React.

_Lưu ý:_ kí hiệu 😃 được sử dụng trong bài viết để thể hiện đây là kết quả/hiệu ứng mong muốn.

Chúng ta bắt đầu thôi!

### Luôn dùng `const` khi khai báo dữ liệu

Lời khuyên đầu tiên và cũng là căn bản nhất, luôn dùng `const` khi khai báo. Chắc bạn cũng đã biết, `let` và `const` được giới thiệu từ phiên bản ES6, cho phép khai báo biến có tầm vực theo khối và không thực hiện hoisting. Điểm khác biệt giữa `let` và `const` là bạn có thể thay đổi giá trị của biến khai báo với `let`, trong khi không thể với `const`.

```js
let foo = 1
foo = 2 // Không thành vấn đề

const bar = 1
bar = 2 // Error: Assignment to constant variable.
```

Do đó, trong hầu hết các trường hợp bạn nên khai báo bằng `const` để tránh xảy ra lỗi khi giá trị của khai báo bị thay đổi bất ngờ. Cũng cần lưu ý là khi khai báo objects với `const`, mặc dù bạn không thể gán giá trị mới cho object nhưng giá trị của các thuộc tính vẫn có thể bị thay đổi.

```js
const obj = { name: 'foo' }
obj = { name: 'bar' } // Error: Assignment to constant variable.

// Nhưng bạn có thể...
obj.name = 'bar'
console.log(obj) // { name: 'bar' }
```
Xem thêm bài: [Tổng hợp những tính năng nổi bật trong ES6](https://ehkoo.com/bai-viet/tong-hop-tinh-nang-noi-bat-es6)

### Thao tác trên object

Như vậy để thay đổi giá trị của object mà vẫn đảm bảo tính chất bất biến, chúng ta cần sử dụng `Object.assign(target, ...sources)`. Hàm này có tác dụng sao chép thuộc tính của các đối tượng `sources` vào `target`. Ví dụ như:

```js
const a = { name: 'foo' }
const b = Object.assign({}, a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
```

Cần lưu ý để đảm bảo tính bất biến thì tham số `target` nên luôn là `{}`, vì khi đó các giá trị của `sources` sẽ được sao chép vào đối tượng mới. Một cách dùng sai là:

```js
const a = { name: 'foo' }
const b = Object.assign(a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a) // Giá trị của a cũng bị thay đổi thành { name: 'bar', age: 1, id: 9 }
console.log(a === b) // true
```

Ngoài `Object.assign()`, bạn cũng có thể dùng cú pháp spread cho object. Ví dụ:

```js
const a = { name: 'foo' }
const b = { ...a, name: 'bar', age: 1, id: 9 }
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a === b) // false
```

Lưu ý là cú pháp này hiện vẫn đang được đề xuất và **chưa được** hỗ trợ trên hầu hết các trình duyệt. Nếu muốn xài thì bạn phải dùng Babel hay Bublé để chuyển đổi nhé.

**Một số thao tác thường gặp khác trên object**

Lấy tên các thuộc tính của một object

```js
const obj = { name: 'bar', age: 1, id: 9 }
Object.keys(obj) // ['name', 'age', 'id']
```

Lấy giá trị của các thuộc tính của một object

```js
const obj = { name: 'bar', age: 1, id: 9 }
Object.values(obj) // ['bar', 1, 9]
```

Lấy cặp [thuộc tính, giá trị] của một object

```js
const obj = { name: 'bar', age: 1, id: 9 }
Object.entries(obj) // [ ['name', 'bar'], ['age', 1], ['id', 9] ]
```

Xóa một thuộc tính ra khỏi object

```js
const a = { name: 'bar', age: 1, id: 9 }

// Xóa thuộc tính age
const b = Object.entries(a).reduce((acc, [key, value]) => {
  return key === 'age' ? acc : { ...acc, [key]: value }
}, {})

console.log(b) // { name: 'bar', id: 9 }
```

### Thao tác trên mảng

Bên cạnh object, mảng là cấu trúc dữ liệu rất thường gặp khi làm việc trong JavaScript. Để thay đổi dữ liệu của một mảng mà vẫn đảm bảo tính bất biến, bạn có thể sử dụng cú pháp spread, được giới thiệu từ ES5. Với một số yêu cầu khác, chúng ta có thể áp dụng các hàm có sẵn của lớp Array, như `map()`, `filter()`, `reduce()`. Một đặc điểm của các hàm này là chúng luôn trả về mảng/giá trị mới chứ không thay đổi mảng ban đầu.

**Áp dụng cú pháp spread**

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

// Hoặc a.concat(b)
const c = [...a, ...b]
```

**Áp dụng hàm có sẵn để:**

Xóa một phần tử ra khỏi mảng các đối tượng

```js
const a = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' }]

const b = a.filter(obj => obj.id !== 2)
console.log(b) // [ { id: 1, name: 'Foo' }, { id: 3, name: 'Baz' } ]
```

Xóa một phần tử ở đầu mảng, cuối mảng hay ở bất cứ vị trí nào

```js
const a = [0, 1, 2, 3, 4]

// Xóa phần tử ở đầu mảng
// Không nên: a.shift()
const b = a.filter((_, index) => index !== 0) // [1, 2, 3, 4] 😃

// Xóa phần tử ở cuối mảng
// Không nên: a.pop()
const c = a.filter((_, index, arr) => index != arr.length - 1) // [0, 1, 2, 3] 😃

// Xóa phần tử ở vị trí bất kỳ
// Không nên: a.splice(3, 1)
const d = a.filter((_, index) => index !== 3) // [0, 1, 2, 4] 😃
```

Thay đổi dữ liệu của mảng

```js
const a = [1, 2, 3]
const b = a.map(x => x * 2) // [2, 4, 6] 😃

const c = [ { id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' } ]
const d = c.map(obj => Object.assign(obj, { name: obj.name.toUppercase() }))
console.log(d) // [ { id: 1, name: 'FOO' }, { id: 2, name: 'BAR' }, { id: 3, name: 'BAZ' } ]
```

Sắp xếp mảng: tránh dùng phương thức `.sort` để sắp xếp mảng, vì phương thức này thay đổi thứ tự của các phần tử trong mảng được sắp xếp. Thay vào đó:

```js
const a = [ { id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }, { id: 3, name: 'Baz' } ]
const b = [...a].sort((x, y) => y.id - x.id)
console.log(b) // [ { id: 3, name: 'Baz' }, { id: 2, name: 'Bar' }, { id: 1, name: 'Foo' } ]
```

Cũng tương tự khi bạn muốn đảo ngược (reverse) mảng.

```js
const a = [0, 1, 2, 3, 4]
const b = [...a].reverse() // [4, 3, 2, 1, 0]
```

### Trong React, giữ cho phương thức `render()` thuần khiết

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

Do đó khi làm việc với React, bạn nên xem `render()` như một hàm thuần khiết với dữ liệu đầu vào là `this.props`. Hạn chế viết logic bên trong hàm `render()` mà thay vào đó nên đưa các bước thao tác dữ liệu thành từng phương thức riêng.

**Không nên**

```js
class Cart extends React.Component {
  render() {
    let total = 0
    for (let i = 0; i < this.props.cart.products; i++) {
      total = this.props.cart.products[i].price + total
    }

    return (
      <div>
        <h1>Cart total: {total}</h1>
        <ProductList products={this.props.sort((a, b) => b.price - a.price)} />
      </div>
    )
  }
}
```

**Nên**

```js
class Cart extends React.Component {
  getSortedProducts(cart) {
    return [..cart.products].sort((a, b) => b.price - a.price)
  }

  getCartTotal(cart) {
    return cart.products.reduce((acc, product) => acc + product.price, 0)
  }

  render() {
    const { cart } = this.props

    const total = this.getCartTotal(cart)
    const sortedProducts = this.getSortedProducts(cart)

    return (
      <div>
        <h1>Cart total: {total}</h1>
        <ProductList products={sortedProducts} />
      </div>
    )
  }
}
```

Hoặc thay vì sử dụng class components, bạn có thể dùng functional components, như kiểu:

```js
function getCartTotal(cart) {
  return cart.products.reduce((acc, product) => acc + product.price, 0)
}

function Cart(props) {
  return <h1>Cart total: {getCartTotal(props.cart)}</h1>
}
```

Functional components có kha khá lợi ích:

* Tương đối thuần khiết, vì được thiết kế theo kiểu một `props` vào, và JSX đi ra. Và không có `this.state`.
* Không phải quan tâm đến `this`
* Khuyến khích tách biệt phần code xử lý business logic và phần xây dựng giao diện
* UI được tách thành những component nhỏ, dễ quản lý hơn
* (Nghe đồn là) nhanh và ít tốn bộ nhớ hơn so với class components

Và dĩ nhiên cũng có những bất lợi:

* Thiếu đi một số tính năng: không hỗ trợ life-cycle hooks, không có `this.state`, không có `this`
* Không thân thuộc với lập trình viên OOP 😱

### Demo

Chúng ta có thể áp dụng những kỹ thuật ở trên để xây dựng một trang liệt kê sản phẩm đơn giản. Bạn có thể xem danh sách sản phẩm, sắp xếp sản phẩm theo tên và giá. Bạn cũng có thể tìm kiếm và xóa sản phẩm. Bên cạnh đó, chúng ta có thể làm thêm 2 nút "rảnh đời", có tác dụng chuyển tên tất cả sản phẩm sang chữ in hoa, và tăng giá sản phẩm lên gấp đôi. Cuối cùng, trong trang có một nút Reset để khôi phục dữ liệu về lại trạng thái ban đầu.

Bạn có thể xem demo ở bên dưới:
<iframe src="https://codesandbox.io/embed/github/ehkoo/react-immutability-techniques/tree/master/?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Mã nguồn có thể tìm thấy tại: [https://github.com/ehkoo/react-immutability-techniques](https://github.com/ehkoo/react-immutability-techniques)

### Kết

Những tuyệt chiêu được đề cập trong bài viết này có thể áp dụng trong tất cả ứng dụng JavaScript, chứ không chỉ dành riêng cho React, Vue hay Angular. Mỗi khi bạn có ý định viết `let`, hãy hít thật sâu, thở chầm chậm và suy nghĩ cách nào đó để chuyển thành `const` (và trong đa số trường hợp đều có thể làm được). Đồng thời khi làm việc với mảng hay object, luôn để ý xem thao tác này có thay đổi bản thân của đối tượng bị tác động hay không.

Cho đến ngày JavaScript ràng buộc tính bất biến cho dữ liệu một cách mặc định, lập trình viên chúng ta còn lắm gian truân.

**Cập nhật:** Ngoài các kỹ thuật ở trên, bạn cũng có thể sử dụng các thư viện được thiết kế riêng cho mục đích giữ tính bất biến, ví dụ như [immutable-js](https://github.com/facebook/immutable-js), [updeep](https://github.com/substantial/updeep), [baobab](https://github.com/Yomguithereal/baobab), [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) hay [mori](https://github.com/swannodette/mori). Điểm bất lợi khi sử dụng các thư viện này, có lẽ là kích thước của chúng.

_Cám ơn anh Nghiệp trong nhóm React Việt Nam, anh Dong Nguyen ở Kipalog đã góp ý cho bài viết._
