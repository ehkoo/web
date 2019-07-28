---
layout: post.njk
title: CSS Grid căn bản - Phần 2
slug: can-ban-css-grid-phan-2
date: 2018-04-15
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1523869903/grid_v0olru.jpg
tags: CSS, CSS Grid
excerpt: "Trong phần 2 này, Ehkoo sẽ cùng bạn tìm hiểu những thuộc tính còn lại của CSS Grid."
author: kcjpop
editor: chubbyanh
---
![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1523869903/grid_v0olru.jpg)
_Hình minh họa đẹp xuất sắc từ [Vườn Illustration](https://www.behance.net/gallery/42386173/Tran-Dang-Khoa-Picture-Book) (có chỉnh sửa)_

Ở [bài viết trước](https://ehkoo.com/bai-viet/can-ban-css-grid-phan-1/), Ehkoo đã giới thiệu với bạn cách sử dụng grid căn bản. Chúng ta đã biết cách tạo một grid, quy định số dòng/cột trong grid, thiết lập khoảng cách giữa các dòng/cột, và sắp xếp các phần tử trong grid theo ý muốn.

Trong bài này, Ehkoo sẽ hướng dẫn bạn một số thuộc tính khác CSS Grid. Bắt đầu nào!

### Đơn vị kích thước mới trong CSS: `fr`

Chúng ta đã biết cách khai báo một grid bằng cách sử dụng `grid-template-columns` và `grid-template-rows`, như ví dụ sau:

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```
Bên cạnh việc sử dụng các đơn vị quen thuộc như `px`, `%`,  `em`, `rem`...bạn có thể dùng đến `fr`. `fr`, viết tắt của "fraction" (phân số), là một đơn vị kích thước mới được thiết kế dành riêng cho grid. `1fr` tương ứng với một phần trong **không gian trống** của grid container. Chẳng hạn, bạn có thể khai báo một grid có 3 cột như sau:

```css
.wrapper {
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
}
```
<script async src="//jsfiddle.net/tv2r4ead/43/embed/result,html,css/"></script>

Tùy vào kích thước của wrapper, `1fr` có thể sẽ có những giá trị khác. Trong trường hợp trên, `1fr` sẽ bằng `300 / 3`(px). Bạn đã thấy tại sao đơn vị này lại có tên là "phân số" chưa?.

> **Ủa vậy nó có gì khác so với %?**

Điểm khác biệt ở đây đã được in đậm ở trên, `fr` dựa vào **không gian trống** của grid container. Hãy xem ví dụ sau:

```css
.wrapper {
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  grid-template-rows: 100px 100px;
}
```
Vì chúng ta đã quy định chiều rộng của cột thứ hai là `50px`, nên chiều rộng của phần không gian trống là `500 - 50 = 450px`. Vậy `1fr` sẽ có giá trị là `450 / 2`(px).

<script async src="//jsfiddle.net/tv2r4ead/47/embed/result,html,css/"></script>

### Kí hiệu `repeat()`

Nếu grid của bạn có nhiều hàng/cột có chiều dài giống nhau, bạn có thể dùng kí hiệu `repeat()` để khai báo nhanh hơn. Chẳng hạn như:

```css
.wrapper {
  display: grid;
  grid-gap: 1rem 1rem;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 50px);
}
```

Ở trên chúng ta khai báo một grid có 10 cột, mỗi cột có kích thước `1fr`, và 2 dòng có kích thước `50px`. Và kết quả là:

<script async src="//jsfiddle.net/r16oyx1j/3/embed/result,html,css/"></script>

Bạn cũng có thể dùng lẫn lộn `repeat()` như thế này.

```css
.wrapper {
  display: grid;
  grid-gap: 1rem 1rem;
  grid-template-columns: 100px repeat(10, 1fr) 100px;
  grid-template-rows: repeat(2, 50px);
}
```

Kết quả là chúng ta sẽ có một grid 12 cột, với cột đầu tiên và cuối cùng có chiều rộng `100px`, các cột giữa thì có kích thước `1fr`.

### Canh chỉnh các phần tử của grid

Để canh chỉnh _nội dung_ của các phần tử trong grid, chúng ta sử dụng 2 thuộc tính liên quan đến `items`: `align-items` và `justify-items`.

```css
.wrapper {
  align-items: start | end | center | stretch (mặc định);
  justify-items: start | end | center | stretch (mặc định);
}
```

`align-items` giúp bạn chỉnh nội dung bên trong grid theo trục tung (trục y), trong khi `justify-items` sẽ chỉnh nội dung theo trục hoành (trục x). Để hiểu thêm về các giá trị của hai thuộc tính này, bạn có thể thử qua demo dưới đây.

<script async src="//jsfiddle.net/mkf9tvyh/embed/result,css/"></script>

Bạn có thể dùng thuộc tính `place-items` để viết nhanh `align-items` và `justify-items` làm một.

```css
.wrapper {
  place-items: <align-items> <justify-items>;
}
```
Một trường hợp khác, giả sử bạn có một grid như sau:
```css
.wrapper {
  width: 600px;
  height: 200px;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 50px 50px;
}
```

Trong trường hợp này,  các phần tử của grid chỉ chiếm `300px` chiều rộng và `100px` chiều cao, không lấp đầy container. Chúng ta có thể canh chỉnh cách phân phối của các phần tử bằng 2 thuộc tính:  `align-content` và `justify-content`.

```css
.wrapper {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

Cũng tương tự như trên, `align-content` sẽ phân phối phần tử theo trục tung, trong khi `justify-content` sẽ phân phối theo trục hoành.  Trăm nghe không bằng một demo:

<script async src="//jsfiddle.net/1m9pfr38/embed/result,css/"></script>

Bạn cũng có thể dùng `place-content` như là cách viết ngắn gọn của `align-content` và `justify-content`.

```css
.wrapper {
  place-items: <align-content> <justify-content>;
}
```

Cuối cùng, để tác động đến một phần tử đơn lẻ, bạn có thể dùng:

```css
.item {
  align-self: start | end | center | stretch;
  justify-self: start | end | center | stretch;
}
```

### Kết

Chúng ta đã đi qua những thuộc tính quan trọng nhất khi làm việc với CSS Grid. Vẫn còn những thuộc tính như `grid-template-areas`, `grid-auto-flow`, `grid-auto-columns` hay `grid-auto-rows` nhưng Ehkoo sẽ để bạn tự khám phá. Bài viết tới chúng ta sẽ xem một vài ứng dụng nâng cao của CSS Grid nhé.

#### Tham khảo

* [A Complete Guide to Grid -- CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
* [Basic Concepts of Grid Layout -- MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
* [Learn CSS Grid with Wes Bos in 25 pretty good videos](https://cssgrid.io/) *miễn phí*
