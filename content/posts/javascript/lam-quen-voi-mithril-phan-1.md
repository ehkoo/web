---
layout: post.njk
title: Làm quen với MithrilJS - Phần 1
slug: lam-quen-voi-mithriljs-phan-1
date: 2017-10-02
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1507304123/mithril_iecaug.jpg
tags: JavaScript, Frontend, MithrilJS
excerpt: Cùng tìm hiểu MithrilJS, một framework xây dựng UI siêu nhỏ hỗ trợ routing, virtual DOM và được viết hoàn toàn bằng ES5.
author: kcjpop
---
Ngày xưa xửa xừa xưa cách đây chắc hơn 2 năm có lẻ, mình đã viết một bài giới thiệu về mithril v0.2.x. Không ngờ bài viết về một framework ít người quan tâm, giấu ở chốn khỉ ho cò gáy vậy mà vẫn bị rinh đi (và cắt cúp) không một lời thông báo. Buồn vui lẫn lộn.

Thôi thì nhân dịp mithril ra bản 1.x (từ đời tám hoánh nào), mình cập nhật lại.

## Mithril là gì?

[Mithril](https://mithril.js.org) là một JavaScript framework gọn nhẹ nhưng rất mạnh mẽ, được dùng để xây dựng các ứng dụng web một trang (Single Page Applications - SPA). Mithril được viết hoàn toàn bằng ES5, hỗ trợ xây dựng giao diện với virtual DOM, cung cấp một hệ thống routing và một số tiện ích khác như XHR, stream...Tất cả gói gọn trong một tập tin JS nhỏ hơn 8KB gzip. Giao diện viết bằng mithril có thể hoạt động trên tất cả trình duyệt từ IE9 mà không cần bất cứ polyfill nào.

>[Mithril](https://en.wikipedia.org/wiki/Mithril) là tên một kim loại quý thường xuất hiện trong các game nhập vai (RPG). Từ này do tác giả J. R. R. Tolkien nghĩ ra và nó xuất hiện lần đầu tiên trong tác phẩm Chúa tể những chiếc nhẫn :D

## Tại sao lại sử dụng mithril?

#### Nhẹ

Như mình đã nói ở trên, dung lượng của mithril chỉ có 8KB gzip cho tất cả các tính năng. So sánh với [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html#reduced-file-size) (34.8KB gzip), [Vue.js](https://vuejs.org/) (20KB gzip), Angular, hay Ember (thôi khỏi tìm cũng biết 2 em cuối nặng nhất rồi) thì mithril gọn nhẹ hơn hẳn. Dung lượng nhẹ giúp giảm thời gian download, đặc biệt là trên thiết bị di động với kết nối bèo bọt, đồng thời ít code hơn => giảm thời gian parse và execute bên phía trình duyệt.

*Tuy nhiên mithril chưa hẳn là UI framework nhẹ nhất, ít ra còn có [Preact](https://github.com/developit/preact) (3KB) hay [RE:DOM](https://redom.js.org/) (2KB).*

#### Dễ tiếp thu

Bản thân mithril được viết hoàn toàn bằng ES5, do đó bạn gần như không cần phải sử dụng bất cứ transpiler nào như Babel hay TypeScript để sử dụng mithril. Chỉ cần thêm đoạn sau vào tập tin HTML là mọi thứ đã sẵn sàng.

```html
<script src="https://unpkg.com/mithril/mithril.js"></script>
```
Mithril cũng không giới thiệu bất cứ khái niệm nào mới. Mọi thứ đều là JavaScript, không JSX, không directive, không custom attribute, thành ra nếu bạn đã biết JavaScript thì bạn chỉ tốn khoảng vài tiếng đến 1 ngày là có thể nắm bắt mithril.

#### Nhanh vừa phải 

Theo benchmark trên website của mithril thì hiệu suất của mithril vượt trội so với Vue, React, hay Angular, nhưng so sánh với Preact, Inferno hay RE:DOM thì mithril vẫn thuộc kèo dưới. Trên thực tế, mithril nhanh vừa phải để được sử dụng bởi các công ty như Vimeo và Nike, trong game Guild Wars 2 hay các ứng dụng mã nguồn mở như Lichess hay Flarum.

Tác giả [@lhorie](https://github.com/lhorie) có đôi lời thảo luận [ở đây](https://mithril.js.org/framework-comparison.html) về chuyện so sánh các framework, nếu có thời gian bạn nên đọc. Nhìn chung, tất cả framework đều nhanh và đủ mạnh để xây dựng các ứng dụng phức tạp. Việc quyết định sử dụng framework nào tùy thuộc vào trình độ, kinh nghiệm, và khả năng thích ứng + tiếp thu framework mới trong team của bạn mà thôi.

#### Mọi thứ có sẵn (batteries included) và dễ dàng tích hợp với thư viện thứ ba

Tính năng ban đầu của mithril là hỗ trợ xây dựng giao diện người dùng với virtual DOM. Bên cạnh đó mithril cũng có sẵn cơ chế routing với `hash (/#!/foo)`, `queryString (/?/foo)` hay `pathnaname (/foo)`. Và để gửi AJAX request lên server, mithril kèm theo một thư viện `XHR` nhỏ gọn. Ba thành phần này là vừa đủ để xây dựng một SPA. Nhưng nếu bạn muốn sử dụng các thư viện bên ngoài (và chắc chắn bạn sẽ cần) thì việc tích hợp chúng cũng rất dễ dàng, vì "everything is just plain JavaScript." Bạn có thể đưa `redux` hay `MobX` vào để quản lý state, gắn `anime.js` để hỗ trợ các animation phức tạp, hay tích hợp `d3.js` vào để vẽ đồ thị. Mithril cho phép (và không giới hạn) việc tiếp cận trực tiếp vào DOM node (cùng khái niệm với `ref` trong React).

Cá nhân mình nghĩ, hướng tiếp cận này mang đến nhiều tự do cho lập trình viên, vì bạn có thể thoải mái chọn và tích hợp thư viện mà mình cần. So sánh với React, mỗi khi muốn dùng thư viện ngoài mình luôn nghĩ "chắc phải có một wrapper của React cho cái này, hoặc [phải viết sao cho nó giống React](https://reactjs.org/docs/thinking-in-react.html)." Điều này dẫn tới 1/ giới hạn suy nghĩ của lập trình viên 2/ tăng thêm dung lượng cho ứng dụng, 3/ tốn thời gian tìm hiểu wrapper, 4/ chưa chắc wrapper đã hoạt động như mình mong muốn.

Mình không so sánh với Vue hay Angular vì chưa thật sự xài hai cái này. Bạn nào biết có thể nhắn mình trên Twitter để mình cập nhật.

*Bên cạnh "the three pillars of a SPA" đã nói ở trên, mithril còn có một thư viện stream nho nhỏ tương thích với chuẩn của [Fantasy Land](https://github.com/fantasyland/fantasy-land). Bạn có thể dùng thư viện này để viết ứng dụng theo kiểu reactive (nghĩ như RxJS nhưng nhẹ hơn). Cuối cùng, mithril còn có thêm một thư viện test "cây nhà lá vườn" gọi là `ospec`.*

#### Không chỉ dành cho SPAs

Cái này không hẳn là ưu điểm của riêng mithril vì đa số các framework khác cũng làm được. Với mithril bạn có thể gắn ứng dụng vào một DOM node đã có sẵn, dạng như:

```javascript
render(Widget, document.getElementById('js-widget'))
```

Điều này hữu ích với các website có thiết kế "truyền thống" với một phần hay toàn bộ view được trả về từ phía backend server. Một ví dụ là khi dòng đời đưa đẩy bạn phải bảo trì một website PHP 5.2 viết từ hồi tận thế 2012. Bằng cách này bạn có thể quá độ từ "truyền thống" sang thiết kế "nửa nạc nửa mỡ" với một phần của website là ứng dụng JavaScript tương tác với API ở phía server.

## Viết thôi 

Giới thiệu cho dài mà không khoe code cũng bằng thừa. Thay vì [TodoMVC](http://todomvc.com/examples/mithril/#/), mình sẽ viết một ứng dụng bán hàng đơn giản. Tính năng bao gồm: hiển thị danh sách hàng, thêm hàng vào giỏ (cart), và xem giỏ hàng. Thế thôi.

#### Virtual node (vnode)
Trước tiên, cần nói về vnode. Với mithril thì vnode là một JavaScript object được dùng để thể hiện các DOM elements trong một trang. Thư viện virtual DOM của mithril sẽ nhận vào vnode và tạo thay đổi tương ứng trên trang. Bạn dùng hàm `m()` để tạo ra vnode, và hàm này có chữ ký như sau:

```javascript 
/**
 * selector   (String|Object)                 REQUIRED
 * attributes (Object)                
 * children   (Vnode[]|String|Number|Boolean)
 */
m(selector, attributes, children)
```
Bạn dùng `selector` để khai báo tên thẻ HTML và (không bắt buộc) `class`, `id` hay các thuộc tính khác cho nó. Xem ví dụ sau:
```javascript
// <h1></h1>
m('h1')

// <h1 class="foo bar"></h1>
m('h1.foo.bar')

// <h1 class="title" id="heading"></h1>
m('h1.title#heading')

// <h1 class="title" id="heading" title="Hello" data-lang="en"></h1>
m('h1.title#heading[title="Hello"][data-lang="en"]')

// <div></div> là thẻ mặc định
m('')
``` 
Để khai báo các thuộc tính theo hướng lập trình, bạn có thể dùng `attributes`, là một JavaScript object. Ví dụ như:
```javascript
m('h1.title', {
  title: 'Hello',
  style: {
    display: showTitle ? 'block' : 'none'
  }
})

// Nếu showTitle != null thì
// <h1 class="title" title="Hello" style="display: block;"></h1>
```
`attributes` cũng được dùng để khai báo các lifecycle và event handlers, nhưng chúng ta sẽ đề cập đế chúng sau.
`chidlren` để bạn khai báo nội dung của vnode. Nó có thể là `string`, `number`, `boolean` hay một mảng các vnode khác. Ví dụ:
```javascript
// <div>Hello World</div>
m('', 'Hello World')

// <div>123</div>
m('', 123)

const h1 = m('h1', 'Hello')
const h2 = m('h2', 'World')

// <div>
//     <h1>Hello</h1>
//     <h2>World</h2>
// </div>
m('', [h1, h2])
m('', h1, h2 /* ...vnodes */) // Viết như vầy cũng cho kết quả giống như trên

// Chú ý, kế quả của đoạn ở dưới là <div></div>, không phải là <div>null</div>
m('', null)
```

#### Cài đặt mithril

Để bắt đầu, bạn cần cài đặt mithril. Cái này có hơi phức tạp chút, nên bạn hãy chú ý nghen. Tạo một tập tin `index.html` có nội dung như sau:

```html
<!doctype html>
<title>My Shop</title>
<body>
    <script src="https://unpkg.com/mithril/mithril.js"></script>
    <script>
    // Print "Hello World" to the page
    m.render(document.body, m('h1', 'Hello World'))
    </script>
</body>
```
  Yep, tập tin HTML trên hoàn toàn hợp lệ :D
  
`m.render(rootNode, vnodes)` giúp bạn gắn vnode h1 đó vào `rootNode`, ở đây là `document.body`. Bạn có thể thay `rootNode` bằng `document.getElementById('js-app')` hay bất cứ [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/element) nào. Kết quả hiển thị là "Hello World" được in ra trong trang.

>Nếu bạn dùng npm thì có thể cài đặt với `npm i -S mithril` và `import m from 'mithril'` để sử dụng.

#### Component

Component trong mithril chỉ đơn giản là một object có thuộc tính `view` là một hàm, ví dụ như:

```javascript
const Heading = {
  view: vnode => {
    return m('h1', 'Hello World')
  }
}

m.mount(document.body, Heading)
```

Tham số `vnode` của hàm `view()` chính là hiển thị virtual node của component trong cây DOM. Chúng ta sẽ nói rõ hơn về nó ở phía sau.

Để hiển thị component, bạn dùng `m.mount` thay vì `m.render`. Về căn bản `m.mount` có tính năng tương tự như `m.render`. Điểm khác biệt là `m.mount` tích hợp auto-redraw giúp tự động cập nhật DOM mỗi khi có thay đổi xảy ra. Ví dụ:

```javascript
let count = 0
const Heading = {
  view: vnode => {
    return m('h1', {
      onclick: () => (count = count + 1)
    }, `Hello World ${count}`)
  }
}

m.mount(document.body, Heading)
```

Như bạn có thể đoán, mỗi khi click vào H1 thì giá trị của count sẽ tăng lên và hiển thị trên trang "Hello World 0, Hello World 1, Hello World 2..." Bản thân bên trong `m.mount` có sử dụng `m.render` nên hầu như bạn chỉ dùng `m.mount` khi viết ứng dụng. Hệ thống auto-redraw của mithril được kích hoạt khi người dùng chuyển trang làm thay đổi route, khi người dùng tương tác với trang (click chuột, nhập dữ liệu, gửi form...) hay khi ứng dụng gửi AJAX request.

#### Routing

Như đã nói ở trên, ứng dụng của chúng ta có 3 tính năng: hiển thị danh sách hàng, thêm hàng vào giỏ, và xem giỏ hàng. Mình có thể chia thành 2 trang tương ứng với các URI sau: `/list` để xem và thêm hàng, và `/cart` để xem giỏ hàng. Hãy xem mithril khai báo routing như thế nào.

```javascript
const Cart = {
  view () {
    return m('h1', 'Cart')
  }
}

const List = {
  view () {
    return m('h1', 'List')
  }
}

m.route(document.body, '/list', {
  '/cart': Cart,
  '/list': List
})
```

`m.route` có chữ ký như sau:

```javascript
/**
 * root         (Element) REQUIRED
 * defaultRoute (String)  REQUIRED
 * routes       (Object)  REQUIRED
 */
m.route(root, defaultRoute, routes)
```
Như bạn thấy, chúng ta gắn ứng dụng vào `document.body` bằng `m.route` cũng tương tự như `m.mount`. Bạn dùng `/list` là route mặc định, nghĩa là nếu lỡ có ai đó truy cập vào `/danh-sach` hay `/gio-hang` thì người ta sẽ được chuyển tới `/list`. Riêng `routes` là một object với khóa (key) là đường dẫn trên URL, và giá trị (value) là một component.

Chạy thử đoạn code trên bạn sẽ thấy URL thay đổi thành, ví dụ như `/index.html#!/list`. Khi chuyển qua `/index.html#!/cart`, nội dung trang sẽ chuyển thành một chữ "Cart" vô cùng thú vị.

#### Layout

Thông thường một ứng dụng sẽ có những vùng không đổi, ví dụ như navigation bar. Chúng ta có thể khai báo một component Layout như sau:

```javascript
const Layout = {
  view (vnode) {
    return m('section',
      m('nav',
        m('a[href=/list]', { oncreate: m.route.link }, ' List '),
        m('a[href=/cart]', { oncreate: m.route.link }, ' Cart ')
      ),
      vnode.children
    )
  }
}

m.route(document.body, '/list', {
  '/cart': {
    view: () => m(Layout, m(Cart))
  },
  '/list': {
    view: () => m(Layout, m(List))
  }
})
```

Component Layout chỉ đơn giản là một component bình thường nhưng có sử dụng `vnode.children` (xem lại chữ ký của `m()` ở phía trên). Chúng ta dùng `m.route.link` để mithril tự động redraw khi người dùng click vào liên kết. `oncreate` chính là một trong số các life-cycle hook của vnode mà mình sẽ nói rõ hơn ở bài sau.

Phần `m.route` được sửa lại, sử dụng một component không tên và đặt hai component List và Cart thành children của Layout. Khi chạy thử và click vào từng liên kết, bạn sẽ thấy nội dung chính thay đổi.

*Một framework nào đó bắt đầu bằng chữ Rờ gọi đây là "higher-order component".*

#### Hiển thị sản phẩm

Trang hiển thị danh sách sản phẩm của chúng ta có phần hơi buồn tẻ và nghèo nàn. Chúng ta sẽ sửa component List lại như sau:

```javascript
const List = {
  items: [
    { id: 1, name: 'Anak Meat', price: 80 },
    { id: 2, name: 'Birdbeast Egg', price: 20 },
    { id: 3, name: 'Bulette Shank', price: 220 },
    { id: 4, name: 'Daggerquill Breast', price: 60 },
    { id: 5, name: 'Dualhorn Steak', price: 160 },
    { id: 6, name: 'Garula Sirloin', price: 120 },
    { id: 7, name: 'Gighee Ham', price: 30 },
    { id: 8, name: 'Lucian Tomato', price: 200 },
    { id: 9, name: 'Luncheon Meat', price: 100 },
    { id: 10, name: 'Sheep Milk', price: 10 },
  ],
  view () {
    return [
      m('h1', 'List'),
      m('table[border=1][width="100%"]',
        m('thead',
          m('tr',
            m('th', 'ID'),
            m('th', 'Name'),
            m('th', 'Price'),
            m('th')
          )
        ),
        m('tbody', this.items.map(item =>
            m('tr',
              m('td', item.id),
              m('td', item.name),
              m('td', `${item.price} gil`),
              m('td', m('button[type=button]', 'Buy'))
            )
          )
        )
      )
    ]
  }
}
```

Mình khai báo thêm một thuộc tính `items` là một mảng các sản phẩm. Bên dưới mình tạo một TABLE và `map` các item trong `this.items` thành các vnode tương ứng cho thẻ TR. Nếu để ý bạn sẽ thấy hàm `view()` của mình trả về một mảng các vnode chứ không nhất thiết phải là một vnode đơn lẻ.

Có một điều quan trọng là khi dùng một mảng các vnode, mỗi vnode nên có thuộc tính `key` mang giá trị duy nhất để phân biệt các phần tử vnode trong mảng. `key` giúp thuật toán redraw của mithril nhận biết thứ tự của các phần tử khi có sự thay đổi, ví dụ như khi sắp xếp (sorting).

#### Xử lý nút mua hàng

Ở trên mình đã có một nút Buy để người dùng có thể thêm hàng vào giỏ. Để giúp cho việc xử lý giỏ hàng thuận tiện hơn, mình khai báo một `CartModel` như sau:

```javascript
const CartModel = {
  items: [],
  addItem: item => CartModel.items.push(item),
  getSubTotal: () => CartModel.items.reduce(
    (total, item) => total + item.price,
    0
  )
}
```

Sau đó mình thêm sự kiện `onclick` vào nút Buy.

```javascript
m('button[type=button]', { onclick: event => CartModel.addItem(item) }, 'Buy')
```

Trong mithril, các hàm xử lý sự kiện (event handlers) được thiết lập bằng cách đặt `on + tên sự kiện` trực tiếp vào `attributes` của vnode. Bạn có thể gắn bất cứ sự kiện nào có thể xảy ra trên phần tử DOM, ví dụ như `onclick`, `onsubmit`, `onmouseover`, `oninput`...Chú ý là tên của event handler viết thường, không giống như `onClick` hay `onInput` trong React.

Vậy là xong. Mỗi khi người dùng click vào nút Buy, mảng `CartModel.items` sẽ có thêm một phần tử mới.

#### Hiển thị cart

Phần hiển thị Cart không có gì nổi bật. Chúng ta chỉ đưa ra danh sách các sản phẩm có trong `CartModel.items` và tổng giá trị đơn hàng.

```javascript
const Cart = {
  view () {
    return [
      m('h1', 'Cart'),
      CartModel.items.map(item =>
        m('p', { style: { display: 'flex', justifyContent: 'space-between' } },
          m('code', `#${item.id}`),
          m('span', item.name),
          m('span', `${item.price} gil`)
        )
      ),
      m('strong', `Total: ${CartModel.getSubTotal()} gil`)
    ]
  }
}
```

Xong rồi. Bạn có thể xem toàn bộ code và thử click lung tung ở đây https://jsfiddle.net/6ednpwy6/. Bạn có thể cải tiến bản demo này, thêm vài tính năng đơn giản cho nó, chẳng hạn như xóa sản phẩm ra khỏi giỏ hàng (và xem tổng giá trị đơn hàng tự động thay đổi như thế nào), hay xử lý thêm khi một sản phẩm được thêm vào giỏ hàng nhiều lần. *Bạn's biết's đấy's, giới's hạn's chỉ's là's bầu's trời's, Sếp's muôn's năm's.*

## Tạm kết

Hi vọng bài viết trên đã đủ lôi kéo bạn bỏ chút thời gian thử sức với mithril. Nếu có điều gì không rõ hoặc ý kiến đóng góp để bài viết hoàn thiện hơn, vui lòng kiếm mình trên Twitter, hoặc nhảy thẳng vào chatroom của mithril trên [Gitter](https://gitter.im/mithriljs/mithril.js). Huynh đệ nào có hảo tâm muốn post lại, vui lòng nhắn mình một tiếng để mình biết thôi chứ không có gì.

Trong bài viết sau mình sẽ đi sâu hơn về component và life-cycle hooks của nó, đồng thời giới thiệu cách tích hợp thư viện của bên thứ ba vào ứng dụng mithril. Hãy đón đọc.
