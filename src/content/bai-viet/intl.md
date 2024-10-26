---
title: 'Tổng quan về Intl trong JavaScript'
date: 2023-09-01
cover: https://cdn.dribbble.com/users/500444/screenshots/7000116/media/3d991b06019eeaa8572306a1e524167c.jpg
tags: JavaScript, Intl
excerpt: 'Cùng xem những ứng dụng của lớp Intl trong JavaScript nhe'
author: kcjpop
draft: true
---

![](https://cdn.dribbble.com/users/500444/screenshots/7000116/media/3d991b06019eeaa8572306a1e524167c.jpg)

https://dribbble.com/shots/7000116-Illustration-for-website-about-us-page

##

## Sắp xếp chuỗi theo ngôn ngữ với `Intl.Collator`

Mỗi ngôn ngữ đều có quy định về thứ tự sắp xếp trong bản chữ cái của mình. Ví dụ như tiếng Việt thì "ă" phải trước "â", hay "ô" xong rồi mới tới "ư" vậy. Cái này tiếng Anh gọi là _"collation"_ ha. Xem thử việc sắp xếp các tỉnh thành bằng JavaScript.

```js
const provinces = ['Bến Tre', 'Bình Định', 'Bắc Giang']
provinces.sort()
// [ "Bình Định", "Bắc Giang", "Bến Tre" ] 👎
// Không đúng vì "ă" phải đi trước "ê" rồi mới tới "i"
```

Một cách để giải quyết là dùng `String#localeCompare` như sau:

```js
provinces.sort(((a, b) => a.localeCompare(b))
// [ "Bắc Giang", "Bến Tre", "Bình Định" ] 👍
```

Hoặc chúng ta có thể dùng thẳng `Intl.Collator#compare` vì theo [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare), `String#localeCompare` cũng sử dụng phương thức này trong các hệ thống có hỗ trợ `Intl`. Cách sử dụng đơn giản nhất là:

```js
provinces.sort(new Intl.Collator('vi').compare)
// [ "Bắc Giang", "Bến Tre", "Bình Định" ] 👍
```

> Theo specs thì bạn có thể không cần `new` để khởi tạo đối tượng `Intl.Collator()` 👉 `Intl.Collator()` hay `new Intl.Collator()` cũng như nhau.

Hàm dựng (_constructor_) của `Intl.Collator` có chữ ký là:

```js
new Intl.Collator()
new Intl.Collator(locales)
new Intl.Collator(locales, options)
```

Trong đó:

- `locales`: Là chuỗi định dạng ngôn ngữ theo chuẩn BCP 47, hoặc mảng các chuỗi này
- `options`: Là một object tùy chọn. Chi tiết thì có thể tham khảo [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options). Theo mình thì có hai thuộc tính thường sử dụng:
  - `options.numeric`:
  - `options.caseFirst`:

```js

```

## Định dạng tiền tệ

## Định dạng đơn vị

## Lấy danh sách múi giờ

## Kết
