---
title: React Hooks là gì?
slug: react-hooks-la-gi
date: 2018-10-28
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1540719936/peter-pan-disney_ylzvm3.jpg
tags:
  - React
  - JavaScript
excerpt: 'Lừng lẫy năm châu, chấn động địa cầu, khiến cả cộng đồng JavaScript sôi sục bàn tán cả tuần qua, không gì có thể khác hơn React Hooks.'
author: kcjpop
editor: chubbyanh
---

Trong React Conf 2018 diễn ra tuần vừa qua ở bang Nevada, Mỹ, nhóm phát triển React đã giới thiệu React Hooks - cho phép sử dụng state và những hiệu ứng lề (side effects) mà không cần phải khai báo ES6 class. Ý tưởng này hứa hẹn sẽ thay đổi khá nhiều bộ mặt của React, khiến các components trở nên gọn nhẹ hơn, giảm đáng kể số lượng code, đồng thời giúp React dễ tiếp cận hơn với những lập trình viên có ít kinh nghiệm với JavaScript.

Không bỏ lỡ cơ hội đi tắt đón đầu, Ehkoo mời bạn nhào lên "chuyến tàu hứng khởi" để xem React Hooks là gì nhé.

> **GHI CHÚ QUAN TRỌNG**
> Hooks vẫn còn đang ở giai đoạn RFC, nên những hàm hay phương thức trong bài viết này có khả năng sẽ thay đổi trong tương lai. Tuy nhiên, ý tưởng chung của Hooks chắc chắn vẫn được giữ lại.

Nếu không thích đọc dài dòng, bạn có thể xem hai videos dưới đây:

<div class="tc">
<iframe width="560" height="315" src="https://www.youtube.com/embed/V-QO-KO90iQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

_Sophie Alpert và Dan Abramov giới thiệu về React Hooks_

<iframe width="560" height="315" src="https://www.youtube.com/embed/wXLf18DsV-I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

_Ryan Florence cho biết: dùng Hooks giảm được 90% số lượng code_

</div>

## Tại sao phải có Hooks?

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1540724318/undefined_nwda0p.jpg)

### Khó khăn khi chia sẻ logic giữa các components

Trong React, việc sử dụng higher-order components và [render props](https://ehkoo.com/bai-viet/render-prop-thay-cho-higher-order-component-reactjs) tương đối phổ biến khi bạn cần chia sẻ logic giữa các components với nhau. Chẳng hạn, để đưa redux actions thành methods, ta có `connect()`, hoặc khi cần thao tác với `location`, `history`, v.v... bạn sẽ dùng `withRouter()`, hay mới đây nhất là dùng [render props để sử dụng React Context](https://ehkoo.com/bai-viet/react-phat-hanh-phien-ban-16-3). Cho đến một ngày nào đó, bạn đụng phải "wrapper hell" như thế này.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Here&#39;s something for ya. Lol. <a href="https://t.co/ZWWAxMFpbZ">pic.twitter.com/ZWWAxMFpbZ</a></p>&mdash; Grex ⚛️ (@AndrewGrexa) <a href="https://twitter.com/AndrewGrexa/status/1045110734550589441?ref_src=twsrc%5Etfw">September 27, 2018</a></blockquote>

### Lifecycles có khả năng tạo bẫy cho người mới

Một trong những quy tắc thông dụng khi muốn lấy dữ liệu bằng AJAX trong React là gửi request trong `componentDidMount()`. Khi props thay đổi, chúng ta sẽ dùng giá trị mới và gọi lại hàm gửi request, nhưng lần này lại là trong `componentDidUpdate()`. Sau đó, giả sử trong `componentDidMount()` bạn gọi `setInteval()` thì bạn phải gọi đến `clearInteval(id)` bên trong lifecycle `componentWillUnmount()` nếu không muốn ứng dụng bị rò rỉ bộ nhớ. Việc phải nhớ chức năng của từng lifecycle có thể gây khó khăn và tạo bẫy cho những người mới làm quen với React.

### ES6 class thật ra không thân thiện lắm

Ai đã từng viết JS mà không đặt câu hỏi "What `this` is `this`?". Cả người mới làm quen với JavaScript lẫn các lập trình viên kì cựu chắc không ít lần dính chưởng `Error: 'this' is undefined`. Rất có thể bạn đã gặp đoạn code như thế này khi mới làm quen với React.

```js
constructor(props) {
  super(props)
  // Hai dòng dưới là cái oát đờ hợi gì vợi (ノ ゜Д゜)ノ ︵ ┻━┻
  this.handleEmailChange = this.handleEmailChange.bind(this)
  this.handlePasswordChange = this.handlePasswordChange.bind(this)
}
```

Vấn đề trên có thể được giải quyết bằng cách dùng hàm mũi tên khi khai báo phương thức trong class, song sẽ có chút không tự nhiên.

Bên cạnh đó, rất khó để thực hiện việc "rung cây" hay loại bỏ code chết (dead code elimination) với các phương thức của class. Cùng với các lifecycles, ứng dụng sau khi build và minify vẫn chiếm dung lượng đáng kể.

## Vậy React Hooks là gì?

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1540726780/undefined_qcvqtw.jpg)

Hooks là những hàm cho phép bạn "kết nối" React state và lifecycle vào các components sử dụng hàm. Với Hooks bạn có thể sử dụng state và lifecycles mà không cần dùng ES6 class. Hãy xem ví dụ sau về hook `useState`.

```js
import { useState } from 'react'

function Counter() {
  // Hàm useState() nhận vào một tham số là giá trị ban đầu
  // của state, trả về một cặp [value, handler] chứa giá trị
  // hiện tại của state, và handler để thay đổi state đó.
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Để tiếp cận vào các lifecycles, chúng ta có `useEffect`. Hook này có tác dụng tương tự như `componentDidMount`, `componentDidUpdate`, và `componentWillUnmount`, nhưng được gom lại thành một hàm duy nhất.

```js
import { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // Giống như componentDidMount và componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Effect hook có thể trả về một hàm, và hàm này sẽ được gọi để thực hiện các tác vụ dọn dẹp, tương tự như `componentWillUnmount()`.

```js
useEffect(() => {
  const id = setInteval(() => setCount(count + 1), 100)

  // Trả về một hàm để xóa inteval
  return () => clearInteval(id)
})
```

Trong cùng một component, bạn có thể sử dụng bao nhiêu `useState` và `useEffect` tùy ý. Nhưng bắt buộc các hooks này phải được đặt ở phía bắt đầu hàm, và không nằm trong `if`, `switch`, vòng lặp `for`, `while`, hay trong các hàm lồng nhau.

```js
function Counter(props) {
  // Như vầy là không được
  if (props.shouldCount) {
    const [count, setCount] = useState(0)
  }
}
```

Hooks thoạt nhìn có vẻ rất là ảo diệu. Làm thế nào React biết được `useState()` được gọi ở component nào để render lại, vì chúng ta có truyền vào tên hàm hay gì đâu? Nhưng theo lời của [acemarke](https://www.reddit.com/r/reactjs/comments/9rbsu5/rfc_react_hooks/e8g9a0i/), ở phía bên dưới `useState()` hoạt động như `this.setState()` và React có cơ chế để theo dõi từng component để rerender cho đúng.

React cung cấp một cơ số hooks có sẵn mà bạn có thể tham khảo [ở đây](https://reactjs.org/docs/hooks-reference.html). Bên cạnh đó, bạn cũng có thể tự viết hook của riêng mình. Phần này dài dòng nên hẹn bạn ở bài viết sau.

## Lợi ích của Hooks

Ngoài việc giải quyết các vấn đề ở trên thì React Hooks còn có những ưu điểm như:

### Code ngắn gọn hơn

So sánh giữa các components sử dụng class và components sử dụng hàm, số lượng code phải viết chênh lệch nhau khá nhiều. Nếu bạn đã xem video của Ryan ở trên, 90% code trở nên sạch sẽ hơn. Ứng dụng sau khi build cũng gọn nhẹ hơn hẳn.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Let&#39;s also compare how well these minify: <a href="https://t.co/2C8ndprQPx">pic.twitter.com/2C8ndprQPx</a></p>&mdash; BOOlean 👻🐶🏳️‍🌈 (@jamiebuilds) <a href="https://twitter.com/jamiebuilds/status/1056015484364087297?ref_src=twsrc%5Etfw">October 27, 2018</a></blockquote>

### Hoàn toàn tự nguyện, 100% tương thích ngược

Việc sử dụng Hooks khi tạo components là hoàn toàn tự nguyện. Nếu không muốn bạn vẫn có thể sử dụng ES6 class như bình thường và React cũng chưa có ý định hoàn toàn loại bỏ class. Ngoài ra các dự án cũ khi được cập nhật lên phiên bản React có hỗ trợ Hooks vẫn có thể hoạt động trơn tru. Bạn cũng không phải bỏ hết những khái niệm đã biết khi dùng Hooks. Thay vào đó, Hooks cung cấp API giúp bạn có thể thao tác sâu hơn vào props, state, context, refs, và các lifecycle.

## Demo

Ehkoo có thử làm một demo nhỏ với React Hook ở đây. Ứng dụng này cho phép bạn xem thông tin của các bộ phim Ghibli bằng cách sử dụng API của [https://ghibliapi.herokuapp.com/](https://ghibliapi.herokuapp.com/). Bạn có thể tham khảo mã nguồn ở đây [https://github.com/ehkoo/react-hooks-demo](https://github.com/ehkoo/react-hooks-demo).

<iframe src="https://codesandbox.io/embed/github/ehkoo/react-hooks-demo/tree/master/?view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Một số điểm cần lưu ý:

- Khi sử dụng `useEffect` để lấy dữ liệu, cần kiểm tra dữ liệu đã tồn tại hay chưa. Nếu không thì hàm sẽ gửi request liên tục.
- Có thể sử dụng tham số thứ hai của hàm `useEffect()` để chỉ định chỉ thực thi hàm khi biến thay đổi giá trị. Xem thêm thông tin [ở đây](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects).

## Kết

Hi vọng bài viết này đã đem lại cho bạn cái nhìn toàn cảnh về React Hooks, và vì sao Hooks có thể thay đổi đáng kể các dự án dùng React. Ehkoo sẽ tiếp tục theo dõi và cập nhật với bạn những thông tin mới nhất về tính năng khá thú vị này. Hãy đón đọc nhé.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
