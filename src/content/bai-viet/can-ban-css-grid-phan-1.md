---
title: CSS Grid căn bản - Phần 1
slug: can-ban-css-grid-phan-1
date: 2018-04-02
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522150445/cssgrid.025372ef_dcvvub.jpg
tags: CSS, CSS Grid
excerpt: 'Bạn từng nghe về CSS Grid nhưng chưa có thời gian tìm hiểu cặn kẽ? Không sao, Ehkoo sẽ giúp bạn khám phá NGAY những tính năng vượt trội của CSS Grid trong việc xây dựng layout.'
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522150445/cssgrid.025372ef_dcvvub.jpg)

Layout dạng lưới (grid) là một phần gần như không thể thiếu trong bất cứ website nào. Trước đây, để phát triển grid trong CSS, chúng ta thường sử dụng một số cách như sau:

- Dùng table hoặc float layout. Hai cách này giúp giải quyết ổn thỏa vấn đề, nhưng khi viết code có đôi chút không tự nhiên, dẫn đến khó bảo trì mã nguồn.
- Dùng flexbox. Hạn chế của cách này là thiết kế cho lưới một chiều (chỉ có một dòng duy nhất).

May mắn thay, cuối cùng thì CSS Grid đã xuất hiện - là một giải pháp mạnh mẽ, giúp việc xây dựng grid trở nên dễ dàng hơn bao giờ hết. CSS Grid cũng được hỗ trợ bởi hầu hết các trình duyệt phổ biến hiện nay, như Apple Safari, Google Chrome, Mozilla Firefox hay Microsoft Edge.

Trong bài này, Ehkoo sẽ hướng dẫn các bạn về một số khái niệm cơ bản của CSS Grid. Bắt đầu nào!

### Tạo một grid

Một grid sẽ bao gồm hai thành phần chính: `wrapper` đóng vai trò grid container, và các `item` con là thành phần của grid.

```html
<div class="wrapper">
  <div class="item item1">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
  <div class="item item4">4</div>
  <div class="item item5">5</div>
  <div class="item item6">6</div>
</div>
```

Để chuyển `wrapper` thành grid, chúng ta chỉ cần thay đổi thuộc tính `display`:

```css
.wrapper {
  display: grid; /* hoặc inline-grid | subgrid */
}
```

Bên cạnh giá trị `grid`, chúng ta cũng có thể dùng `inline-grid` để hiển thị grid dưới dạng inline, và `subgrid` dành cho các grid lồng nhau (`subgrid` sẽ được giới thiệu kỹ hơn ở phần sau).

Và đây là kết quả.

<script async src="//jsfiddle.net/tv2r4ead/6/embed/result,html,css/"></script>

**Goắt, a du kít-đinh mi?**
Bạn có thể thấy chuyển sang `display: grid;` không đem lại thay đổi gì rõ rệt. Đó là vì chúng ta chưa quy định số cột và hàng trong grid.

### Cột và hàng

Để chia grid thành các cột và các hàng, chúng ta sẽ sử dụng 2 thuộc tính `grid-template-columns` và `grid-template-rows`.

```css
.wrapper {
  grid-template-columns: <track-size>...;
  grid-template-rows: <track-size>...;
}
```

Trong đó:

- Số giá trị trong thuộc tính `grid-template-columns` sẽ tương ứng với số cột, các giá trị sẽ tương ứng với chiều rộng của các cột lần lượt từ trái sang phải.
- Số giá trị trong thuộc tính `grid-template-rows` sẽ tương ứng số hàng, các giá trị sẽ tương ứng với chiều cao của các hàng lần lượt từ trên xuống dưới.

Để tạo một grid kích thước 3x2, bạn có thể viết như sau:

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

Trong đoạn code trên, chúng ta đưa cho thuộc tính `grid-template-columns` 3 giá trị, như vậy, grid của chúng ta sẽ có 3 cột, mỗi cột đều có chiều rộng là 200px. Tương tự, thuộc tính `grid-template-rows` có 2 giá trị, tương ứng với 2 hàng, mỗi hàng có chiều cao là 100px.

Kết quả:

<script async src="//jsfiddle.net/tv2r4ead/10/embed/result,html,css/"></script>

Chúng ta có thể thay đổi kích thước các dòng và cột tùy ý.

```css
.wrapper {
  display: grid;
  grid-template-columns: 300px 100px 200px;
  grid-template-rows: 125px 75px;
}
```

<script async src="//jsfiddle.net/tv2r4ead/11/embed/result,html,css/"></script>

### Grid gaps

Khoảng cách giữa các cột trong grid được gọi là column-gap, còn khoảng cách giữa các hàng trong grid được gọi là row-gap.
Để thay đổi khoảng cách giữa các cột và các hàng, chúng ta sẽ sử dụng `grid-column-gap` và `grid-row-gap`.

```css
.wrapper {
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
```

Với `<line-size>` là một giá trị chiều dài, chẳng hạn như `50px` hay `1rem`.

```css
.wrapper {
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 25px;
}
```

Để viết ngắn gọn hơn, ta dùng `grid-gap`. Giá trị thứ nhất sẽ tương ứng với `grid-column-gap`, còn giá trị thứ hai sẽ tương ứng với `grid-row-gap`.

```css
.wrapper {
  display: grid;
  grid-gap: 50px 25px;
}
```

<script async src="//jsfiddle.net/tv2r4ead/12/embed/result,html,css/"></script>

### Grid lines

Trước khi tiếp tục, chúng ta cần tìm hiểu khái niệm grid lines. Với CSS grid, các đường nằm giữa các cột được gọi là column line, trong khi các đường nằm giữa các hàng được gọi là row line.

Với một grid 3x3, ta có các grid lines như sau:

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522576022/i3yuE1s_snye0v.jpg)

Cần lưu ý là grid line được đánh số từ 1, không phải từ 0 như thường gặp.

**Mẹo nhỏ**: Nếu đang sử dụng Firefox, bạn có thể dùng tính năng debug CSS Grid trong Developer Tool để nhìn thấy grid lines rõ ràng hơn.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522579953/debugger_zjreqh.jpg)

### Sắp xếp các item trong grid

Sau tất cả, một trong những điều quan trọng nhất mà bạn cần tìm hiểu là cách sắp xếp các item trên grid. Chúng ta hãy bắt đầu bằng việc tạo một grid 3x3.

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px 100px;
}
```

<script async src="//jsfiddle.net/tv2r4ead/14/embed/result,html,css/"></script>

_Chú ý: Mặc dù chúng ta đang tạo một grid 3x3, nhưng trong ví dụ trên lại là một grid 3x2, đó là bởi vì chúng ta chỉ có 6 items để đặt vào grid. Nếu chúng ta có thêm 3 item nữa thì hàng dưới cùng sẽ được lấp đầy._

Với mỗi item, để thay đổi kích thước cũng như vị trí, chúng ta sẽ thay đổi thuộc tính `grid-column` và `grid-row`.

```css
.item1 {
  grid-column-start: 1;
  grid-column-end: 4;
}
```

Đoạn code trên sẽ khiến item1 bắt đầu tại column line 1, và kết thúc tại column line 4. Nói cách khác, item1 sẽ chiếm trọn cả hàng đầu tiên. Bạn có thể xem demo để rõ hơn:

<script async src="//jsfiddle.net/tv2r4ead/15/embed/result,html,css/"></script>

Khi mà item1 chiếm trọn dòng đầu tiên, các item khác sẽ tự động được đẩy xuống dưới. Để được kết quả như trên, chúng ta cũng có thể viết gọn lại như sau:

```css
.item1 {
  grid-column: 1 / 4;
}
```

Bạn cũng có thể làm tương tự với `grid-row-start` và `grid-row-end`.
Để chắc chắn bạn đã hiểu rõ, hãy nhìn vào đoạn code sau và dự đoán kết quả trước khi xem hình.

```css
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}

.item3 {
  grid-row-start: 2;
  grid-row-end: 4;
}

.item4 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

<script async src="//jsfiddle.net/tv2r4ead/17/embed/result,html,css/"></script>

Ngoài cách chỉ định giá trị grid line một cách tường minh, bạn cũng có thể dùng cú pháp `span X` như ví dụ sau:

```css
.item1 {
  grid-column-start: 1;
  grid-column-end: span 3;
  /*
    hoặc
    grid-column: 1 / span 3;
    */
}
```

Chúng ta có thể đọc đoạn CSS trên như là "`item1` bắt đầu ở cột thứ 1, và tự động giãn ra thành 3 cột". Kết quả bạn nhận được cũng tương tự.

<script async src="//jsfiddle.net/tv2r4ead/19/embed/result,html,css/"></script>

Một ví dụ khác có phần phức tạp hơn.

```css
.item3 {
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
}

.item6 {
  grid-column: 2 / span 2;
}
```

<script async src="//jsfiddle.net/tv2r4ead/23/embed/result,html,css/"></script>

> **Nhắc lại**: Nếu bạn gặp khó khăn trong việc xác định số thứ tự của grid lines, đừng quên CSS grid debugger của Firefox.

### Tạm kết

Trên đây là cách sử dụng một số thuộc tính cơ bản nhất của CSS Grid. [Trong bài sau](https://ehkoo.com/bai-viet/can-ban-css-grid-phan-2) chúng ta sẽ nói thêm về những thuộc tính khác, đồng thời xem xét các cách sử dụng CSS Grid nâng cao. Bạn hãy đón đọc nhé!
