---
title: 'Tìm hiểu về Web Components'
date: 2022-01-08
cover: https://i.imgur.com/DUDSHph.png
tags: WebComponents, JavaScript, HTML
excerpt: 'Cách tốt nhất để chia sẻ code giữa các dự án sử dụng framework khác nhau? Web Components.'
author: kcjpop
draft: true
---

![](https://i.imgur.com/DUDSHph.png)

## Web Components là gì?

Nếu đã làm việc với các framework như React, Vue hay Angular, chắc hẳn bạn đã quen với khái niệm _component_: tập hợp code HTML, CSS và JavaSript của một tính năng (feature) lại với nhau thành một khối có thể hoạt động độc lập, và tái sử dụng ở bất cứ đâu trong ứng dụng.

Lifecycle callbacks

Web Components bao gồm 3 công nghệ chính:

- **Custom elements**: là các API JavaScript cho phép bạn định nghĩa các thẻ tùy chỉnh.
- **Shadow DOM**: (gọi là _DOM bóng đêm_ cho nó ngầu 😈) là những API JavaScript để gắn cây DOM "shadow" vào một nút. Điểm đặt biệt ở đây là cây DOM này hoàn toàn tách biệt với document gốc, do đó các nút con hay sự kiện xảy ra bên trong cây shadow DOM sẽ không bị môi trường bên ngoài tác động vào.
- **HTML templates**: bao gồm 2 thẻ `<template>` và `<slot>` được dùng để thiết kế giao diện của component.

## Ưu và khuyết điểm

So với các virtual-dom framework, Web Components có những ưu điểm sau:

- **Không cần cài đặt, không phụ thuộc vào bên thứ ba, nhẹ tựa lông hồng, sử dụng ở bất cứ đâu**: Web Components được tất cả các trình duyệt hiện đại hỗ trợ.
- **Tính tái sử dụng cao**: Vì được xây dựng trên các công nghệ web tiêu chuẩn, Web Components có thể được dùng chung với bất cứ framework nào, dù cho đó là React, Vue, Angular hay Svelte. Các thẻ tùy biến cũng "chỉ là HTML" nên chúng rất phù hợp để xây dựng hệ thống thiết kế (design system), cho phép các team khác nhau (tech, marketing, tài chính, v.v.) cùng chia sẻ một giao diện thống nhất.
- **Sử dụng ở bất cứ đâu**: Web Components có thể

Bên cạnh đó cũng có những điểm cần cải thiện:

- Boilerplate: Xây dựng các thẻ tùy chỉnh có giao diện và hành vi phức tạp có thể trở nên chán nản. Để giải quyết vấn đề này, chúng ta có thể sử dụng các framework như [lit-html](https://lit.dev/) hay [Stencil](https://stenciljs.com/) để có trải nghiệm phát triển tốt hơn.
- Hệ sinh thái: So với các framework, hệ sinh thái của Web Component vẫn còn khá nhỏ và chưa có nhiều thư viện phổ biến. Bên cạnh đó, một ứng dụng web không chỉ có components mà cần phải có các giải pháp điều hướng (routing), quản lý trạng thái (state management), v.v.

## Tạo một Web Component đầu tiên.

Để hiểu rõ hơn về Web Component, hãy thử một thẻ tùy chỉnh đơn giản. Chúng ta sẽ tạo một thẻ `<x-hello>` để in ra dòng "Hello $name".

### Sử dụng customElements

Trước tiên, chúng ta sẽ khai báo một class được kế thừa từ `HTMLElement`.

```js
class Hello extends HTMLElement {
  constructor() {
    // Luôn phải gọi đến hàm dựng của lớp cha
    super()

    // Cài đặt tính năng của thẻ ở đây
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `Hello <slot></slot>`
  }
}
```

Bạn có thể không cần quan tâm đến phần cài đặt của class `Hello` ngay lúc này đâu, chúng ta sẽ nói về Shadow DOM và Template ngay thôi. Còn bây giờ, hãy khai báo tên thẻ và đăng ký class này vào [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) bằng cách gọi đến phương thức `window.customElements.define()`. Phương thức này có chữ ký như sau:

```js
customElements.define(name, constructor, options)
```

Trong đó:

- `name`: Tên của thẻ tùy chỉnh. Bạn bắt buộc phải dùng kebab-case để không bị trùng với những thẻ HTML tiêu chuẩn. Ví dụ như `x-number-input` hay `number-input`, những tên như `numberInput` hay `numberinput` sẽ không hợp lệ.
- `constructor`: Tên class của thẻ tùy chỉnh
- `options`: Một object tùy chọn với thuộc tính `{ extends: string }`. Chúng ta sẽ sử dụng tham số này nếu bạn muốn kế thừa từ một thẻ HTML có sẵn.

Từ ví dụ ở trên, chúng ta có thể đăng ký thẻ `<x-hello>` như sau:

```js
window.customElements.define('x-hello', Hello)
```

> 💡 _Mọi người hay dùng tiền tố `x-` để ngầm định đây không phải là thẻ tiêu chuẩn ấy mà_

Vậy là xong, chúng ta đã có thể xài thẻ này trong HTML.

```html
<x-hello>World</x-hello>
```

Kết quả:

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component" src="https://codepen.io/ehkoo/embed/BawOoEJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ehkoo/pen/BawOoEJ">
  Web Component</a> by Ehkoo (<a href="https://codepen.io/ehkoo">@ehkoo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Web Components cũng cho phép kế thừa từ một thẻ HTML đã có sẵn. Khi đó thẻ tùy chỉnh của bạn phải được kế thừa từ interface tương ứng (xem danh sách đầy đủ [ở đây](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API#html_element_interfaces_2)), và khi gọi `customElements.define()`, bạn có thể khai báo thêm tham số `options.extends`.

```js
class Hello extends HTMLParagraphElement {}
window.customElements.define('x-hello', Hello, { extends: 'p' })
```

Thẻ `<x-hello>` có thể được dùng theo 2 cách sau:

```html
<x-hello>Anna</x-hello>
<p is="x-hello">Belle</p>
```

Hoặc với JavaScript.

```js
const helloEl = document.createElement('p', { is: 'x-hello' })
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Web Component: Simple Hello" src="https://codepen.io/ehkoo/embed/MWEqyge?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ehkoo/pen/MWEqyge">
  Web Component: Simple Hello</a> by Ehkoo (<a href="https://codepen.io/ehkoo">@ehkoo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Lưu ý là tới thời điểm hiện tại, Safari vẫn chưa hỗ trợ tính năng kế thừa này và thuộc tính `is` đâu nhe. Theo như [ticket này](https://bugs.webkit.org/show_bug.cgi?id=182671) thì có lẽ không bao giờ luôn 😒.

### Shadow DOM

Shadow DOM đóng vai trò quan trọng để đảm bảo những gì bên trong thẻ tùy biến sẽ không bị rò rỉ ra môi trường bên ngoài. Shadow DOM không phải là một khái niệm mới vì các trình duyệt đã sử dụng tính năng này để bao đóng cấu trúc bên trong của một số thẻ, chẳng hạn như với thẻ `<video>`.

Bạn có thể gắn nút gốc của shadow DOM vào một element nào bằng cách gọi phương thức `Element.attachShadow()` [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow). Phương thức này có chữ ký như sau:

```js
Element.attachShadow(option)
```

Trong đó `option` là một object với `option.mode` mang 2 giá trị: `open` hoặc `closed`. `option.mode = 'open'` cho phép từ bên ngoài truy xuất đến cây shadow DOM thông qua thuộc tính `element.shadowRoot`.

```js
const el = document.createElement('div')
el.attachShadow({ mode: 'open' })

console.log(el.shadowRoot) // ShadowRoot
```

Ngược lại, `option.mode = 'closed'` ngăn không cho truy xuất đến cây shadow DOM từ bên ngoài, và `element.shadowRoot` sẽ trả về `null`.

```js
const el = document.createElement('div')
el.attachShadow({ mode: 'closed' })

console.log(el.shadowRoot) // null
```

Lưu ý là bạn có thể gắn cây shadow DOM vào bất cứ thẻ tùy chỉnh nào. Riêng đối với các thẻ HTML tiêu chuẩn, vì lý do bảo mật (?!) mà bạn chỉ có thể sử dụng shadow DOM cho các thẻ `<article>`, `<aside>`, `<blockquote>`, `<body>`, `<div>`, `<footer>`, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<header>`, `<main>`, `<nav>`, `<p>`, `<section>`, `<span>` mà thôi.

Hãy thử làm một component Card đơn giản.

```js
class MyCard extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = `
div { color: red; border: 1px solid #aaa; }
`
    this.shadow.appendChild(style)

    const title = document.createElement('h1')
    title.textContent = this.getAttribute('title')

    const content = document.createElement('p')
    content.textContent = this.getAttribute('content')

    const wrapper = document.createElement('div')
    wrapper.append(title, content)

    this.shadow.appendChild(wrapper)
  }
}

customElements.define('x-card', MyCard)
```

Sử dụng:

```html
<x-card title="My awesome card" content="Lorem ipsum is so boring"></x-card>
```

> **⚠️ Lưu ý:**
>
> Với các thẻ tùy chỉnh bạn bắt buộc phải có thẻ đóng, dù cho bên trong có nút con (children nodes) hay không. Với ví dụ trên, bạn không thể viết `<x-card title="My awesome card" content="Lorem ipsum is so boring" />`. Nghe vô lý ha, không phải chúng ta không cần đóng các thẻ như `<img>`, `<hr>` hay `<link>` hay sao? Lý do là bên dưới các trình duyệt hard-code một số thẻ nhất định và chúng tự động đóng các thẻ này khi phân tích HTML. Với các thẻ tùy chỉnh, trình duyệt không có cách nào nhận biết và tự đóng thẻ được nên chúng ta phải làm bằng tay thôi.

### Template

Bạn có thể thấy sử dụng các phương thức cấp thấp như `document.createElement()`, `Element.append()`, hay `Node.insertBefore()` để xây dựng giao diện rất là dài dòng, "thủ công mỹ nghệ", và khó bảo trì, trong khi dev chúng ta lại quá quen với trải nghiệm của JSX hay hyperscript nói chung. Chúng ta có thể "tạm" giải quyết vấn đề này bằng thẻ `<template>`. Theo giải thích của [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template), những gì bên trong thẻ `<template>` sẽ không được hiển thị trên trang, mà chúng được dùng như một _bản mẫu_ để JavaScript xử lý.

Để hiểu rõ thêm về thẻ `<template>`, hãy xem qua ví dụ sau. Giả sử chúng ta có một mảng các sản phẩm.

```js
const products = [
  { id: 1, name: 'Bòn bon' },
  { id: 2, name: 'Si-cu-la' },
  { id: 3, name: 'Sữa hột gà' },
  { id: 4, name: 'Cà lem cây' },
]
```

Yêu cầu là hiển thị danh sách sản phẩm bằng thẻ `<table>`. Bạn có thể khai báo một `<template>` như sau:

```html
<table id="js-product-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <!-- Nội dung của bảng sẽ được thêm vào đây -->
  </tbody>
</table>

<template id="tpl-row">
  <tr>
    <td class="product-id"></td>
    <td class="product-name"></td>
  </tr>
</template>
```

Sau đó chúng ta viết JavaScript để thao tác với bảng, đại loại như vầy:

```js
const products = [
  { id: 1, name: 'Bòn bon' },
  { id: 2, name: 'Si-cu-la' },
  { id: 3, name: 'Sữa hột gà' },
  { id: 4, name: 'Cà lem cây' },
]

const tpl = document.getElementById('tpl-row')
const table = document.getElementById('js-product-table')
const tbody = table.querySelector('tbody')

for (const product of products) {
  // Tạo một bản copy của template cho mỗi sản phẩm
  const node = tpl.content.cloneNode(true)

  node.querySelector('td.product-id').textContent = product.id
  node.querySelector('td.product-name').textContent = product.name

  tbody.appendChild(node)
}
```

Kết quả là:

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ehkoo/embed/BawvdQp?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ehkoo/pen/BawvdQp">
  Untitled</a> by Ehkoo (<a href="https://codepen.io/ehkoo">@ehkoo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Có thể thấy sử dụng thẻ `<template>` giúp cho code rõ ràng, dễ hình dung, và dễ bảo trì hơn. Áp dụng vào thẻ `<x-card>` ở trên, chúng ta có thể viết lại như sau:

```js
class MyCard extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    const template = document.createElement('template')
    template.innerHTML = `
<div>
  <h1>${this.getAttribute('title')}</h1>
  <p>${this.getAttribute('content')}</p>
</div>`

    this.shadow.appendChild(template.content.cloneNode(true))
  }
}
```

### Slot

## Kết luận

Như
