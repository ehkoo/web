---
layout: post.njk
title: Console không chỉ có log
slug: console-khong-chi-co-log
date: 2018-10-20
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1540024419/ehkoo/Apty4iQ.png
tags: JavaScript, Dành cho người mới
excerpt: '`console.log` có lẽ đã quá quen thuộc với dân lập trình JavaScript rồi. Nhưng bạn có biết, `console` còn có những phương thức khác cũng rất hữu ích?'
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
---

> **Bài Của Người Quen**
> Bài viết gốc được đăng tại website của [CodeLabo](https://nguyenhaiduc06.github.io/2018/09/14/console-khong-chi-co-phuong-thuc-log/). Đừng quên ghé qua thăm nha.
>
> Nếu bạn cũng muốn bài viết của mình xuất hiện trên Ehkoo, đừng ngần ngại, hãy email cho `chao [at] ehkoo.com` kèm theo link bài nhé. Ehkoo sẽ thảo luận với bạn trước khi đưa bài lên sóng.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1540024312/FqFLDaS.png)

`console` là công cụ đắc lực hỗ trợ chúng ta trong quá trình phát triển ứng dụng, đặc biệt là khi tìm và sửa lỗi. Tuy nhiên, `console` còn rất nhiều phương thức khác cũng thú vị và hữu ích không kém. Hãy cùng CodeLabo tìm hiểu trong bài viết này nhé!

## `console.log`

`console.log` có lẽ là phương thức được sử dụng nhiều nhất để in giá trị của biến ra màn hình.

```javascript
const name = 'CodeLabo'
console.log('Hello', name) // Hello CodeLabo
```

Bên cạnh đó, `console` còn có 3 phương thức khác có tính năng tương tự: `.warn`, `.info`, và `.error`.

```javascript
console.info('CodeLabo - more experiments, more knowledge')
console.warn('Hãy like Facebook Page của CodeLabo nhé!')
console.error('Đừng quên share cho mọi người cùng biết nha!')
```

Ngoài việc in giá trị, `.warn` và `.info` hiển thị kết quả ở một định dạng khác, giúp bạn phân biệt "mức độ nghiêm trọng" của thông điệp, trong khi `.error` in ra stack trace, giúp bạn xác định lỗi xuất hiện ở đâu.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1540027894/Peek_2018-10-20_12-30_gztnkd.gif)
Bạn có thể dùng tính năng lọc để lựa chọn hiển thị kết quả theo từng loại thông điệp. Tính năng này có mặt ở hầu hết các trình duyệt.

## `console.trace`

Chúng ta cũng có thể in ra stack trace bằng cách sử dụng `console.trace`.

```javascript
function hello(name = 'CodeLabo') {
  console.trace('name:', name)
  return `Hello ${name}!`
}

hello()
```

Kết quả:

![](https://res.cloudinary.com/duqeezi8j/image/upload/bo_1px_solid_rgb:bbbbbb/v1540028454/XORli19_vdnete.png)

## `console.dir` và `console.dirxml`

`console.dir` in ra JavaScript sau khi đã được định dạng đẹp đẽ.

```javascript
const fancyThings = {
  car: '🏎️ Ferrari',
  watch: '⌚ Cartier',
  clothing: {
    shoes: '👠 Christian Louboutin',
    dress: '👗 Versace',
  },
  boat: '🛥️ Sunseeker',
}

console.dir(fancyThings)
```

![](https://i.imgur.com/1uwibZr.png)
Riêng `console.dirxml` thì in ra markup của nút DOM. Ví dụ:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- ... -->
</head>

<body>
  <h1>hello</h1>

  <script>
    console.dirxml(document.body);
  </script>
</body>

</html>
```

![](https://i.imgur.com/KITpc0Y.png)

## `console.assert`

`console.assert` sẽ nhận 2 tham số. Nếu tham số thứ nhất trả về false, tham số thứ 2 sẽ được in ra màn hình.

```javascript
// 1 + 1 == 2, trả về true, không có gì được in ra cả
console.assert(1 + 1 === 2, '1 + 1 khác 2')

// 1 + 1 == 3 trả về false, '1 + 1 khác 3' sẽ được in ra
console.assert(1 + 1 === 3, '1 + 1 khác 3')
```

## `console.clear`

Bạn có thể gọi phương thức `console.clear()` để xóa đi những kết quả đã được in ra trước đó. Hoặc bạn có thể nhấn `Ctrl + L` trong Chrome, hoặc `Ctrl + Shift + L` trong Firefox, để đạt được kết quả tương tự.

```javascript
console.clear()
```

## `console.count` và `console.countReset`

Mỗi lần bạn gọi đến `console.count()`, phương thức này sẽ tự động tăng lên 1. Bạn có thể truyền vào một nhãn tùy ý để đánh dấu các bộ đếm khác nhau. Và bạn dùng `console.countReset(label)` để quay ngược bộ đếm về lại 0.

```javascript
const arr = [1, 2, 3, 4, 5]
arr.forEach(nb => {
  if (nb % 2 === 0) {
    console.count('chẵn')
  } else {
    console.count('lẻ')
  }
})

// lẻ: 1
// chẵn: 1
// lẻ: 2
// chẵn: 2
// lẻ: 3
```

## Đo thời gian thực thi

Để đo thời gian thực thi của một đoạn mã, bạn có thể dùng `console.time` và `console.endTime`. Phương thức `console.time(label)` nhận vào một chuỗi dùng làm nhãn cho bộ đếm giờ. Sau đó gọi đến `console.endTime(label)` với nhãn cùng tên, để hiển thị thời gian thực thi.

```javascript
console.time('fetching data')
fetch('https://jsonplaceholder.typicode.com/users')
  .then(d => d.json())
  .then(() => console.timeEnd('fetching data'))

// fetching data: 424ms
```

## Đặt kết quả vào nhóm

Sử dụng `console.group` và `console.groupEnd` để nhóm các giá trị được hiển thị lại với nhau. Ta cũng có thể đặt tên cho các group, và group này có thể nằm trong group khác.

```javascript
console.group('🖍️ colors')
console.log('green')
console.log('orange')
console.group('HEX')
console.log('#1AB374')
console.log('#FF7B5F')
console.groupEnd()
console.log('blue')
console.groupEnd()
```

![](https://res.cloudinary.com/duqeezi8j/image/upload/bo_1px_solid_rgb:bbbbbb/v1540029061/Do5qXsB_gr8q9c.png)

## `console.table`

Phương thức `console.table` giúp chúng ta hiển thị array hoặc object dưới dạng bảng.

```javascript
function Single(title, singer, year) {
  this.title = title
  this.singer = singer
  this.year = year
}

const s = new Single('Có ai thương em như anh', 'Tóc Tiên', '2018')

console.table(s)
```

![](https://res.cloudinary.com/duqeezi8j/image/upload/bo_1px_solid_rgb:bbbbbb/v1540029213/x19a9s4_mwmtva.png)

## Sử dụng CSS Style

Có bao giờ bạn mở console khi đang xài Facebook và nhận được thông báo như thế này:

![](https://res.cloudinary.com/duqeezi8j/image/upload/bo_1px_solid_rgb:bbbbbb/v1540029354/6yVWesk_kvrzvv.jpg)

Họ đã làm điều đó như thế nào? Hóa ra, ta có thể áp dụng CSS style trong `console.log` bằng cách dùng kí tự đặt chỗ `%c`.

```javascript
console.log(
  'Hello %cCodeLabo%c!',
  'color: #1ab374; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);',
  'color: #ff7b5f; font-weight: bold; font-size: 2rem; text-shadow: 0 0 5px rgba(0,0,0,0.2);',
)
```

Mỗi `%c` sẽ định dạng cho những ký tự phía sau nó. Kết quả là:

![](https://res.cloudinary.com/duqeezi8j/image/upload/bo_1px_solid_rgb:bbbbbb/v1540029449/omGhYJb_oqwo8z.png)

Bên cạnh `%c`, console còn hỗ trợ những kí tự đặt chỗ khác như `%o`, `%f` hay `%d`. Bạn có thể xem chi tiết [ở đây](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions).

## Kết

Ngoài việc cung cấp phương thức `console.log()` rất hữu dụng khi tìm và sửa lỗi, console còn có những phương thức khác cũng rất tiện dụng trong quá trình phát triển dự án. Bạn có biết cách sử dụng console nào sáng tạo hơn nữa không? Hãy cùng chia sẻ nhé.
