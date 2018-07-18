---
layout: post.njk
title: Căn bản về CSS Variables
slug: can-ban-ve-css-variables
date: 2018-07-07
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1531667456/ehkoo/fpTuJ9r_kuo40g.jpg
tags: CSS, CSS Variables, CSS Custom Properties, CSS Next
excerpt: "Thuộc tính tùy chỉnh -- custom properties, hay còn được biết đến với cái tên thông dụng CSS variables -- là một tính năng mới được giới thiệu gần đây, nhưng đã thay đổi mạnh mẽ cách quản lý và làm việc với các tập tin CSS."
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
---
![](https://res.cloudinary.com/duqeezi8j/image/upload/v1531667456/ehkoo/fpTuJ9r_kuo40g.jpg)
_Hình minh họa bởi Aleksei Bitskoff - [www.alekseibitskoff.com](http://www.alekseibitskoff.com/)_

### Giới thiệu

Biến (variables) có lẽ là một trong những khái niệm căn bản nhất khi lập trình. Bằng cách sử dụng biến, chúng ta có thể: 1- khai báo một tên, 2- gán giá trị vào biến và sử dụng nó trong suốt ứng dụng.

Đối với CSS, điều này đặc biệt hữu ích khi phải làm việc trên những stylesheet phức tạp và có nhiều quy luật.

Trước khi CSS variables được giới thiệu, chúng ta phải dựa vào các chương trình tiền xử lý CSS (CSS pre-processors) như SASS, LESS hay Stylus để có thể sử dụng biến. Mỗi chương trình tiền xử lý lại đi kèm với một ngôn ngữ của riêng nó, có thể tương thích hoặc không tương thích với CSS thuần. Chẳng hạn như, đoạn code dưới đây được viết bằng SASS:

```sass
// Khai báo biến màu chính
$mainColor: white

.main-header
  // Sử dụng biến
  color: $mainColor

.main-footer
  background-color: $mainColor
```

Bạn không thể trực tiếp chạy đoạn SASS này trên trình duyệt, mà cần biên dịch chúng lại thành CSS thông thường. Và đây là kết quả:

```css
/* Sau khi biên dịch, các biến đã bị xóa ra khỏi tài liệu. */
.main-header {
  color: white;
}

.main-footer {
  background-color: white;
}
```

CSS Custom Properties -- thuộc tính tùy chỉnh ra đời, cho phép chúng ta thao tác, làm việc trực tiếp với biến ngay bên trong stylesheet mà không cần phải qua bước biên dịch.

```css
:root {
  --main-color: white;
}

.main-header {
  color: var(--main-color);
}

.main-footer {
  background-color: var(--main-color);
}
```

Kết quả của đoạn mã ở trên hoàn toàn giống với đoạn SASS ban đầu. Tuy nhiên, so với các chương trình tiền xử lý, CSS variables có những lợi ích nhất định:

- Được hỗ trợ trực tiếp bởi trình duyệt, không phải biên dịch.
- Tồn tại trong DOM, có thể được truy xuất và thay đổi bằng JavaScript. Tính năng này mở ra những cơ hội mới rất hữu ích khi lập trình frontend.
- Các biến được chia theo tầng (cascading). Cũng như CSS selectors, thuộc tính tùy biển có thể được quy định lại bởi những luật ở tầng thấp hơn.
- Khi các giá trị như media queries thay đổi, giá trị của biến cũng thay đổi.
- Giúp mã nguồn dễ đọc và có ý nghĩa hơn, nâng cao tính tùy biến và khả năng bảo trì.

Hiện tại, thuộc tính tùy chỉnh đã được [hỗ trợ mặc định](https://caniuse.com/#feat=css-variables) trên tất cả các trình duyệt hiện đại.

Hãy cùng xem các cách sử dụng căn bản nhé.

### Cú pháp

#### Khai báo

Thuộc tính tùy chỉnh được khai báo bằng cách đặt `--` phía trước. Ví dụ:

```css
.block {
  --my-color: blue;
  --my-font-size: 11px;
  color: green;
}
```

Trong đoạn code trên, chúng ta khai báo một thuộc tính tùy chỉnh `--my-color` có giá trị là `blue`, đồng thời một thuộc tính khác `--my-font-size` có giá trị là `11px`.

Bạn có thể khai báo bao nhiêu thuộc tính tùy ý, và hiện tại thì tên các thuộc tính được đặt theo dạng kebab-case, với các từ được phân cách bằng dấu gạch ngang `-`.

Dĩ nhiên đây chỉ là quy ước và bạn có thể tùy ý chọn tên biến tùy thích. Nhưng cần lưu ý là tên của thuộc tính tùy chỉnh **có phân biệt chữ hoa/thường**, tức là `--my-color` và `--my-Color` là hai thuộc tính khác nhau.


#### Phạm vi (scope)

Tương tự như trong JavaScript, CSS variables cũng có khái niệm biến toàn cục và biến địa phương. Các biến toàn cục cần được khai báo trong selector `:root`, tương ứng với phần tử cấp cao nhất trong cây DOM.

```css
:root {
  --main-color: white;
  --default-font-size: 1.1rem;
}
```

Các biến được khai báo trong các selector khác với `:root` đều là biến cục bộ.

```css
div {
  --color: red;
}

.block {
  --color: green;
}

#blue {
  --color: blue;
}
```

#### Sử dụng

Sau khi biến đã được khai báo và gán giá trị, chúng ta có thể sử dụng biến với hàm `var()`.

```css
.block {
  color: var(--color);
}
```

Biến toàn cục có thể sử dụng trong tất cả các selector, trong khi biến địa phương chỉ hiện hữu bên trong block của nó.
```css
div {
  /* Chỉ có thể sử dụng trong các thẻ DIV và các phần tử con của nó */
  --color: red;
}

.block {
  /* Chỉ có thể sử dụng trong class .block và các phần tử con */
  --color: green;
}

#blue {
  /* Chỉ có thể sử dụng trong id #blue và các phần tử con */
  --color: blue;
}

div.test {
  color: var(--color); /* color: red; */
}

.block > h1 {
  color: var(--color); /* color: green; */
}

#blue > p {
  color: var(--color); /* color: blue; */
}
```

Hàm `var()` còn nhận vào một tham số thứ hai, là giá trị mặc định được sử dụng trong trường hợp biến chưa được khai báo.

```css
.block > h1 {
  font-size: var(--my-font-size, 1.2em); /* font-size: 1.2em; vì --my-font-size chưa được khai báo */
}
```

Bạn cũng có thể kết hợp với hàm `calc()` khi sử dụng CSS variables:

```css
:root {
  --default-font-size: 1.1rem;
}

h1 {
  font-size: calc(var(--default-font-size) * 5); /* 5.5rem */
}
```

#### Thay đổi giá trị của biến

Chúng ta có thể thay đổi giá trị của biến trong tùy thuộc vào `@media`, `@document`, hay `@support`...

```css
:root {
 --gutter: 10px;
}

@media screen and (min-width: 768px) {
  :root {
    --gutter: 30px;
  }
}
```

#### Truy xuất bằng JavaScript

```js
const root = document.querySelector(':root')
const rootStyles = getComputedStyle(root)
const mainColor = rootStyles.getPropertyValue('--main-color')
console.log(mainColor) // #ffffff

const div = document.querySelector('div')
const divStyles = getComputedStyle(div)
const divColor = rootStyles.getPropertyValue('--color')
console.log(divColor) // red
```

#### Thay đổi giá trị của biến bằng Javascript

```js
const root = document.querySelector(':root')
root.style.setProperty('--main-color', 'black')

const div = document.querySelector('div')
div.style.setProperty('--color', 'orange')
```

### Kết

Thuộc tính tùy chỉnh đem đến một cơ chế mạnh mẽ để quản lý và làm việc với CSS. Tính năng này đặc biệt hữu ích khi các ứng dụng web ngày càng phức tạp về tính năng cũng như giao diện người dùng. Trong những bài viết tiếp theo, Ehkoo sẽ giới thiệu với các bạn những ứng dụng của CSS variables vào thực tế. Hãy cùng chờ xem nhé.
