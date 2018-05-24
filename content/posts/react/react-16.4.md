---
layout: post.njk
title: React 16.4 hỗ trợ các sự kiện của pointer
slug: react-phat-hanh-phien-ban-16-4
date: 2018-05-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1518288221/blog-4_udbwwy.jpg
tags: React, JavaScript
excerpt: "React 16.4 hỗ trợ các sự kiện phát sinh bởi các thiết bị không phải chuột như bút chạm, stylus... Ngoài ra, phiên bản này cũng thay đổi hành vi của phương thức`getDerivedStateFromProps`."
author: kcjpop
form_footer: react-footer
---
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">React 16.4 is out, with support for an oft-requested new feature: pointer events!<br><br>Huge thanks to <a href="https://twitter.com/PhilippSpiess?ref_src=twsrc%5Etfw">@PhilippSpiess</a> for contributing this change! <a href="https://t.co/3IAX6Zc1GN">https://t.co/3IAX6Zc1GN</a></p>&mdash; React (@reactjs) <a href="https://twitter.com/reactjs/status/999458533518131200?ref_src=twsrc%5Etfw">May 24, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Pointer events là gì?

Pointer events là các sự kiện phát sinh khi người dùng tương tác với website bằng các thiết bị không phải chuột, ví dụ: bút chạm  (pen/stylus), hoặc dùng tay chạm vào màn hình cảm ứng. Trong DOM, lớp `PointerEvent` kế thừa tất cả thuộc tính của `MouseEvent`, giúp cho việc hỗ trợ xử lý các sự kiện này dễ dàng hơn. Bạn có thể tìm hiểu thêm về pointer events trên trang [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).

React 16.4 giới thiệu các sự kiện của pointer trong React DOM:

-   `onPointerDown`
-   `onPointerMove`
-   `onPointerUp`
-   `onPointerCancel`
-   `onGotPointerCapture`
-   `onLostPointerCapture`
-   `onPointerEnter`
-   `onPointerLeave`
-   `onPointerOver`
-   `onPointerOut`

Lưu ý: các sự kiện này chỉ được hỗ trợ trên phiên bản mới nhất của Chrome, Firefox, Edge và Internet Explorer. Safari, lại một lần nữa, đi sau thế giới.

### Hành vi của `getDerivedStateFromProps` thay đổi

Trong phiên bản 16.3, `static getDerivedStateFromProps()` hoạt động giống như `componentWillReceiveProps()`, chỉ được kích hoạt khi `props` của component thay đổi. Nhưng từ phiên bản 16.4, phương thức này sẽ được gọi mỗi khi component được render lại, bất kể đó là do `props` hay `this.setState()`. Thay đổi này giúp "dọn đường" cho chế độ async render sắp tới của React 17.

Hầu hết ứng dụng sẽ không bị ảnh hưởng từ thay đổi này. Nếu có chỉ là trong những trường hợp rất hiếm, ví dụ như hàm `getDerivedStateFromProps()` có side effects, hoặc thay đổi giá trị của controlled value từ props. Chi tiết bạn có thể xem [ở đây](https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops).

Lời khuyên là gần như 90% bạn **KHÔNG CẦN DÙNG**  `getDerivedStateFromProps`, và nhóm phát triển React sẽ có bài hướng dẫn khi nào nên và không nên dùng phương thức này.

### Kết

Bạn có thể nâng cấp phiên bản React trong dự án bằng cách chạy:

```bash
yarn add react@^16.4.0 react-dom@^16.4.0
npm install --save react@^16.4.0 react-dom@^16.4.0
```
