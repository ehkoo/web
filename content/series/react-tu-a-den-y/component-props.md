---
layout: series.njk
title: Component và props
date: 2017-10-12
tags: JavaScript, React, Frontend
slug: component-props
series: react-tu-a-den-y
author: kcjpop
---
### Căn bản về React component và props
Component trong React được tạo ra bằng cách kế thừa từ lớp `React.Component`.

```javascript
class Hello extends React.Component {
  render() {
    return <h1>Hello World</h1>
  }
}
```

Bạn render component vào ứng dụng bằng cách gọi đến `React.render(component, domElement)` như sau:

```javascript
ReactDOM.render(<Hello />, document.getElementById('root'))
```

Bạn có thể đưa dữ liệu bất kỳ từ bên ngoài vào component bằng cách khai báo thuộc tính như JSX, nghĩa là:

```javascript
ReactDOM.render(
  <Hello className="bold" name="John" />,
  document.getElementById('root')
)
```

Bên trong component bạn có thể truy xuất đến dữ liệu ngoài này thông qua thuộc tính `this.props`.

```javascript
class Hello extends React.Component {
  render() {
    return <h1 className={this.props.className}>Hello {this.props.name}</h1>
  }
}
```

Cần lưu ý là `this.props` có tính chất chỉ đọc (read-only), nghĩa là bạn không thể thay đổi giá trị của nó từ bên trong component.

Cũng như JSX, chúng ta có thể lồng các component vào với nhau. Giả sử bạn có một component `Avatar`, bạn có thể dùng nó như một tag JSX bình thường.

```javascript
class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className={this.props.className}>Hello {this.props.name}</h1>
        <Avatar url={this.props.avatar} />
      </div>
    )
  }
}
```

### Viết demo nào

Bạn còn nhớ ứng dụng demo của chúng ta chứ. Bây giờ hãy bắt tay vào viết component đầu tiên: hiển thị danh sách sản phẩm.

Để cho ứng dụng thêm phần "màu mè" hấp dẫn, hãy thêm [Semantic UI](https://semantic-ui.com/) vào tập tin `public/index.html`.

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
```

Sau đó bạn tạo tập tin `src/List.jsx`:

```javascript
import React from 'react'

const products = [
  { id: 1, name: 'Anak Meat', price: 80 },
  { id: 2, name: 'Birdbeast Egg', price: 20 },
  { id: 3, name: 'Bulette Shank', price: 220 },
  { id: 4, name: 'Daggerquill Breast', price: 60 },
  { id: 5, name: 'Dualhorn Steak', price: 160 },
  { id: 6, name: 'Garula Sirloin', price: 120 },
  { id: 7, name: 'Gighee Ham', price: 30 },
  { id: 8, name: 'Lucian Tomato', price: 200 },
  { id: 9, name: 'Luncheon Meat', price: 100 },
  { id: 10, name: 'Sheep Milk', price: 10 }
]

class List extends React.Component {
  render() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} gil</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default List
```

> **`.js` hay `.jsx`?**
> Trang chủ của React không có bắt buộc bạn nên dùng phần mở rộng nào, nên việc này tùy thuộc vào sở thích cá nhân. Riêng mình thấy dùng `.jsx` ngoài việc giúp phân biệt JSX và tập tin JS thường còn giúp mình có thể nhảy nhanh đến tập tin cần tìm (bằng phím tắt Ctrl + P trong Sublime Text/Atom). Do đó mình đổi tên `src/App.js` thành `src/App.jsx` luôn.

Sau đó bạn cần cập nhật lại `App.jsx`.

```javascript
import React from 'react'
import List from './List'

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <List />
      </div>
    )
  }
}

export default App
```

Nếu không có vấn đề gì, trình duyệt của bạn sẽ hiển thị giống như thế này:

<iframe src="https://codesandbox.io/embed/7j12n5rp4j?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Mở Developer Tool lên (nhấn F12), tab Console và bạn sẽ thấy React la làng vì chúng ta không khai báo `key` cho phần tử của mảng.

> Warning: Each child in an array or iterator should have a unique "key" prop.

`key` là một `props` đặt biệt bắt buộc phải có trong mỗi phần tử của mảng. `key` giúp React phân biệt được phần tử nào được thêm mới, cập nhật hay xóa khỏi mảng.  `key` đặc biệt hữu ích trong các trường hợp như kéo thả và sắp xếp phần tử. Thông thường bạn có thể dùng ID từ dữ liệu làm `key`, trường hợp hạn hữu lắm có thể dùng chỉ mục (index) của phần tử trong mảng, tuy nhiên điều này không được khuyến khích vì chỉ mục có thể bị thay đổi.

Chúng ta sửa lại hàm `render()` trong `List` với `key`:

```javascript
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} gil</td>
            </tr>
          ))}
```

Bây giờ React không còn hó hé gì nữa rồi.

### Kết

Chúng ta đã điểm qua cách tạo component trong React với ES6 class, và cách sử dụng `props`. Trong phần tiếp theo mình sẽ hướng dẫn bạn viết unit tests cho những components này, vì ["I enjoy watching those tests run and pass"](https://i.imgur.com/6Scde0x.jpg).
