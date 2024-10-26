---
title: 'CSS media queries range và custom media queries'
date: 2022-09-13
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683438302/ehkoo/7c9069af240c1a0bf718768f90d09927.png
tags:
  - CSS
  - Media Queries
excerpt: 'Sử dụng cú pháp đến từ tương lai ngay hôm nay'
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683438302/ehkoo/7c9069af240c1a0bf718768f90d09927.png)

_Hình minh họa: [**The Social Dilemma**](https://dribbble.com/shots/14182464-The-Social-Dilemma) bởi [**Defaced**](https://dribbble.com/defacedstudio) từ Dribbble_

Lại một bài ngắn ngủn nữa 🥲 Lần này chúng ta sẽ nói về những tính năng mới khi viết CSS media queries.

## Media Queries Range

Từ xưa tới nay khi khai báo breakpoints (_điểm ngắt_), chúng ta dùng cú pháp này:

```css
@media (min-width: 30em) {
}

/* hoặc */
@media (max-width: 60em) {
}

/* hoặc */
@media (min-width: 30em) and (max-width: 60em) {
}
```

Media Queries Range (_Khoảng truy vấn phương tiện_) cho phép bạn khai báo breakpoints ngắn gọn hơn.

```css
@media (width >= 30em) {
}

/* hoặc */
@media (width <= 60em) {
}

/* hoặc */
@media (30em <= width <= 60em) {
}

/* hoặc */
@media (60em >= width >= 30em) {
}
```

Dĩ nhiên là bạn có thể dùng cú pháp này cho `min/max-height` hay `min/max-resolution`.

Hiện tại hầu hết các trình duyệt đã hỗ trợ tính năng này, ~ngoại trừ Safari~ 🙁

> **Cập nhật tháng 04 năm 2023**:
>
> Safari 16.4 đã hỗ trợ sử dụng CSS range media queries rồi nha 🥳

Cho chắc ăn, chúng ta có thể dùng plugin `postcss-media-minmax` của PostCSS để chuyển đổi từ cú pháp mới qua cú pháp cũ.

```bash
$ npm install postcss-media-minmax
```

Và trong tập tin `postcss.config.js`, chúng ta khai báo sử dụng plugin này.

```js
const plugins = [require('postcss-media-minmax')]

module.exports = { plugins }
```

Vậy là xong.

## Custom Media Queries

Custom Media Queries (_Truy vấn phương tiện tùy chỉnh_) giống như khai báo biến cho media queries vậy. Tính năng này được định nghĩa trong [Bản đặc tả truy vấn phương tiện mức 5](https://www.w3.org/TR/mediaqueries-5/#custom-mq) và vẫn đang thảo luận nên chưa có trình duyệt nào hỗ trợ chính thức đâu. Tuy nhiên chúng ta vẫn có thể sử dụng thông qua PostCSS.

Để sử dụng custom media queries, bạn dùng cú pháp sau:

```css
@custom-media --small-viewport (max-width: 30em);

@media (--small-viewport) {
  /* styles dành cho màn hình nhỏ */
}
```

Kết quả là:

```css
@media (max-width: 30em) {
  /* styles dành cho màn hình nhỏ */
}
```

Để tích hợp vào PostCSS, bạn cần cài đặt plugin `postcss postcss-custom-media`.

```bash
$ npm install --save-dev --exact postcss postcss-custom-media
```

Sau đó trong tập tin `postcss.config.js`:

```js
const postcssCustomMedia = require('postcss-custom-media')

const plugins = [
  postcssCustomMedia({
    importFrom: [
      {
        customMedia: {
          '--md': '(min-width: 768px)',
          '--lg': '(min-width: 960px)',
          '--xl': '(min-width: 1280px)',
        },
      },
    ],
  }),
]

module.exports = { plugins }
```

Bằng cách định nghĩa trực tiếp bên trong `postcss.config.js`, những media queries này sẽ có mặt ở tất cả tập tin được PostCSS xử lý, giúp bạn không phải `@import` bằng tay nữa. Rất là tiện nếu bạn làm việc với SPA components và CSS modules ha.
