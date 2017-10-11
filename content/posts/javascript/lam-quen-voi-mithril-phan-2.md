---
layout: post.njk
title: Làm quen với mithrilJS - Phần 2
slug: lam-quen-voi-mithriljs-phan-2
date: 2017-10-11
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1507304123/mithril_iecaug.jpg
tags: JavaScript, Frontend, mithrilJS
excerpt: Phần 2 của loạt bài về mithrilJS sẽ đi sâu về component và các hook trong vòng đời của chúng. Bên cạnh đó cũng giới thiệu cách tích hợp thư viện ngoài vào ứng dụng.
author: kcjpop
---
### Các hooks trong vòng đời của vnode và component

Trong [bài viết trước](/bai-viet/lam-quen-voi-mithriljs-phan-1) mình đã nói sơ về vnode, là cách thức mithril xây dựng cây DOM trong trang. Bạn dùng hàm `m(selector, attributes, children)` để tạo ra vnode.

```javascript
// <h1 class="title" id="123">Hello World</h1>
m('h1.title', { id: 123 }, 'Hello World')
```

Trong khi đó, component là một JavaScript object có phương thức `view()`. Chẳng hạn như:

```javascript
const Cart = {
  view: () => m('h1', 'Cart')
}

// Kết quả: <h1>Cart</h1>
m(Cart)
```
Để truyền dữ liệu tùy ý, thiết lập thuộc tính hay các hàm xử lý sự kiện của vnode/component, bạn đưa một JavaScript object vào tham số thứ 2 của hàm `m()`. Bên trong component, bạn có thể truy cập chúng thông qua thuộc tính `attrs`.

```javascript
m(Cart, { id: 123 })

const Cart = {
  view: vnode => m('h1', `Cart ${vnode.attrs.id}`)
}

// Kết quả: <h1>Cart 123</h1>
```

Ngoài ra tham số `attributes` của hàm `m()` cũng là nơi để bạn khai báo các hook trong vòng đời của vnode và component.

```javascript
const ComponentWithHooks = {
  oninit: function(vnode) {
    console.log('initialized')
  },

  oncreate: function(vnode) {
    console.log('DOM created')
  },

  onbeforeupdate: function(vnode, old) {
    return true
  },

  onupdate: function(vnode) {
    console.log('DOM updated')
  },

  onbeforeremove: function(vnode) {
    console.log('exit animation can start')
    return new Promise(function(resolve) {
      // call after animation completes
      resolve()
    })
  },

  onremove: function(vnode) {
    console.log('removing DOM element')
  },

  view: function(vnode) {
    return 'hello'
  }
}
```


Chúng ta sẽ đi qua từng hook một.

####  `oninit (vnode)`

Hàm `oninit (vnode)` sẽ được kích hoạt **trước** khi vnode được gắn vào cây DOM. Bên trong hàm này bạn có thể tiến hành các thao tác khởi tạo với `vnode.attrs` hay `vnode.children`, chẳng hạn như khai báo state. Bạn có thể nghĩ `oninit` giống như constructor (hàm dựng) vậy.

Cần nói thêm là thuộc tính `vnode.dom` là tham chiếu đến element thật sự trong cây DOM của vnode hiện tại. Vì `oninit()` không đảm bảo sự tồn tại của element tại giai đoạn này, bạn không nên sử dụng `vnode.dom` ở đây.

```javascript
const ComponentWithState = {
  oninit: function(vnode) {
    this.data = vnode.attrs.data
  },
  view: function() {
    return m('div', this.data)
  }
}

// Kết quả: <div>Hello</div>
m(ComponentWithState, { data: 'Hello' })
```

#### `oncreate`

Hàm `oncreate (vnode)` được kích hoạt **sau** khi vnode được gắn vào cây DOM. Vì lúc này element đã tồn tại trong cây DOM, bạn có thể dùng `vnode.dom` để đọc những thuộc tính về bố cục, ví dụ như `vnode.dom.offsetHeight` hay `vnode.dom.getBoundingClientRect()`. `oncreate` rất hữu dụng khi bạn cần truy xuất những thuộc tính trên, kích hoạt animation hay tích hợp thư viên ngoài.

Hàm `oncreate()` sẽ không được gọi khi vnode được cập nhật.

```javascript
const HeightReporter = {
  oncreate: function(vnode) {
    console.log('Initialized with height of: ', vnode.dom.offsetHeight)
  },
  view: function() {}
}

m(HeightReporter, { data: 'Hello' })
```

#### `onbeforeupdate`

Hàm `onbeforeupdate(vnode, old)` được gọi trước khi một vnode được so sánh trong quá trình redraw. Nếu hàm này được khai báo và trả về giá trị `false`, mithril sẽ không cập nhật giao diện cho vnode/component này. Trên [trang chủ của mithril](https://mithril.js.org/lifecycle-methods.html#avoid-premature-optimizations), `onbeforeupdate()` được khuyến cáo nên sử dụng cẩn thận hoặc không dùng luôn để tránh trường hợp "tối ưu hóa một cách vội vã".

#### `onupdate`

Hàm `onupdate (vnode)` được gọi **sau** khi element trên cây DOM đã được cập nhật, và vẫn còn tồn tại trong cây. Cũng như `oncreate()`, bạn có thể đọc các thuộc tính về bố cục ở hook này. Hàm này đặc biệt hữu ích khi bạn cần truy xuất các thuộc tính kể trên trong trường hợp tích hợp với thư viện bên thứ ba.

```javascript
const RedrawReporter = {
  count: 0,
  onupdate: function(vnode) {
    console.log('Redraws so far: ', ++vnode.state.count)
  },
  view: function() {}
}

m(RedrawReporter, { data: 'Hello' })
```

#### `onbeforeremove`

Hàm `onbeforeremove(vnode)` được gọi **trước** khi element được gỡ ra khỏi cây DOM. Nếu hàm này trả về một Promise, mithril sẽ chờ cho đến khi Promise hoàn thành trước khi tiến hành gỡ element. Hàm này rất hữu dụng khi bạn cần làm animation.

```javascript
const Fader = {
  onbeforeremove: function(vnode) {
    vnode.dom.classList.add('fade-out')
    return new Promise(function(resolve) {
      setTimeout(resolve, 1000)
    })
  },
  view: function() {
    return m('div', 'Bye')
  }
}
```

### `onremove`

Cuối cùng là `onremove(dom)`. Hàm này cũng được gọi **trước** khi element được gỡ ra khỏi cây DOM, nhưng chạy sau `onbeforeremove()`. Nếu `onbeforeremove()` trả về một Promise, `onremove()` sẽ chạy sau khi Promise đó hoàn thành. Hàm `onremove()` rất hữu ích để làm những công việc "hốt rác", ví dụ như `clearTimeout()`.

```javascript
const Timer = {
  oninit: function(vnode) {
    this.timeout = setTimeout(function() {
      console.log('timed out')
    }, 1000)
  },
  onremove: function(vnode) {
    clearTimeout(this.timeout)
  },
  view: function() {}
}
```

### Khai báo component với class và function

Ngoài cách tạo component bằng một object có phương thức `view()`, bạn có thể dùng function hoặc ES6 class như sau:

```javascript
function Cart (vnode) {
  return {
    oninit: () => {
      this.id = vnode.attrs.id
    },
    view: () => m('h1', `Cart ${this.id}`)
  }
}

class Cart {
  constructor (vnode) {
    this.id = vnode.attrs.id
  }

  view () {
    return m('h1', `Cart ${this.id}`)
  }
}
```

Bạn có thể thấy ở cả hai cách đều bắt buộc phải có một phương thức `view()` được trả về, hoặc khai báo bên trong prototype của class. Tuy vậy, mặc dù bạn dùng cách nào thì vẫn có thể đưa vào hàm `m()` mà không cần thay đổi gì hết.

Việc chọn object, function hay class hoàn toàn tùy thuộc vào sở thích của bạn/team. Cá nhân mình thì mình thấy function tốt hơn hết, vì việc truy xuất đến `vnode` rất dễ dàng. Giả sử mình có đoạn code thế này:

```javascript
const Item = {
  doClick: e => {
    e.preventDefault()
    // Muốn truy xuất item ID thì phải làm sao???
  },
  view: vnode => m('p', { onclick: Item.doClick }, vnode.attrs.id)
}

const List = {
  items: [ 1, 2, 3, 4, 5 ],
  view: vnode => {
    return List.items.map(id => m(Item, { id }))
  }
}

m.mount(document.body, List)
```
Mình có thể sửa `Item.doClick(e)` thành `Item.doClick(vnode, e)` nhưng như vậy code bỗng nhiên "vô duyên" vì phải cõng `vnode` trong hàm xử lý sự kiện. Tuy nhiên nếu mình dùng function thì mọi chuyện sẽ khác:

```javascript
function Item (vnode) {
  const doClick = e => {
    e.preventDefault()
    console.log(vnode.attrs.id)
  }

  const view = () => m('p', { onclick: doClick }, vnode.attrs.id)

  return { view }
}
```

Code sạch sẽ khô thoáng hơn nhiều.

### Tích hợp thư viện ngoài

Ở trên mình đã nhắc đến `vnode.dom` như là tham chiếu đến element thật sự trong cây DOM. `vnode.dom` giống như `ref` trong React, và mình có thể dùng nó để tích hợp với thư viện của bên thứ ba. Ví dụ như mình có thể tích hợp [Chart.js](http://www.chartjs.org/) như thế này:

```javascript
function App() {
  // Các thiết lập cho Chart.js
  const config = {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        }
      ]
    }
  }

  const oncreate = vnode => {
    const ctx = vnode.dom.getContext('2d')
    this.chart = new Chart(ctx, config)
  }

  const doDoubleData = e => {
    // Thay đổi giá trị của dataset, sau đó gọi hàm `update()` của Chart.js
    config.data.datasets.forEach(ds => (ds.data = ds.data.map(d => d * 2)))
    this.chart.update()
  }

  const view = _ =>
    m('div',
      m('canvas[width=400][height=400]', { oncreate }),
      m('button', { onclick: doDoubleData }, 'Double data')
    )
  return { view }
}

m.mount(document.body, App)
```
Chart.js yêu cầu phải có một canvas để vẽ đồ thị lên đó. Bằng cách "hook" vào `oncreate` của vnode `m(canvas)`, mình có thể truy xuất canvas element và gọi đến hàm [`getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext). Sau đó mình chỉ việc làm theo hướng dẫn trên website của Chart.js để khởi tạo đồ thị. Bạn có thể coi demo ở đây [https://jsfiddle.net/w32j6hs3/](https://jsfiddle.net/w32j6hs3/).

Ngoài ra mình còn có một ví dụ khác tích hợp [anime.js](http://animejs.com/) bạn có thể tham khảo ở [đây](https://codepen.io/kcjpop/pen/GvdQdX).

### Kết

Trong phần này mình đã giới thiệu về các hook trong vòng đời của vnode/component. Mình cũng nói qua cách tích hợp thư viện thứ ba vào ứng dụng mithril thông qua `vnode.dom`. Phần sau có lẽ mình sẽ nói về hệ thống auto-redraw của mithril, `m.request`, và áp dụng chúng để nâng cấp demo ở Phần 1 lên. Đón đọc nhé ;)
