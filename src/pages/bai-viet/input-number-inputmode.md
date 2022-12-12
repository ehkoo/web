---
layout: ../../layouts/Post.astro
title: 'Vì sao bạn nên cẩn thận với input type=number?'
date: 2022-11-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1669298648/input-number-inputmode_uiw15l.jpg
tags: HTML, inputmode
excerpt: 'Và tìm hiểu xem `inputmode` trong HTML là gì nhe'
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1669298648/input-number-inputmode_uiw15l.jpg)
_Photo by [Ugi K.](https://unsplash.com/@wizzyfx?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/old-computer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

Tiêu đề nghe hầm hố vậy thôi chứ bài này ngắn lắm à 😅

## Chuyện về `input type=number`

Công ty của mình có làm một ứng dụng web để người dùng điều chỉnh nhiệt độ trong nhà. Form để nhập nhiệt độ thì đại loại như thế này.

```html
<label for="temp">Nhiệt độ:</label>

<input type="number" name="temp" id="temp" min="15" max="30" step="0.1" />
```

Rất hợp lý đúng hông, nhiệt độ là giá trị số thì dùng `input type=number`. Trên mobile lại hiện ra bàn phím số nữa, quá tiện.

Cho đến một ngày, bọn mình nhận được báo lỗi một người dùng vô tình chỉnh nhiệt độ nhà lên quá cao khi…đang cuộn chuột trên trang 🥲

<video controls>
  <source src="https://res.cloudinary.com/duqeezi8j/video/upload/v1669455081/ehkoo/Kapture_2022-11-26_at_11.30.54.mp4" type="video/mp4">
</video>

_`input type=number` thay đổi giá trị khi scroll chuột trên Safari_

Lỗi đó trông như thế này. Mình kiểm tra trên Mac thì thấy có Safari có tính năng này, và chỉ khi dùng chung với thuộc tính `min` `max`. Khổ ghê 🥲

Tìm hiểu thêm thì mình có thấy bài [**Why the GOV.UK Design System team changed the input type for numbers**](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) có nhắc đến _hành vi không ngờ_ này của `input type=number`, bên cạnh những vấn đề khác về accessibility, hiển thị số lớn, hay trình duyệt tự động làm tròn giá trị.

Chưa hết, bài [**Why the number input is the worst input**](https://stackoverflow.blog/2022/09/15/why-the-number-input-is-the-worst-input/) còn kể thêm những vấn đề như:

- Khi giá trị nhập vào `input type=number` không hợp lệ, kết quả trả về là một chuỗi rỗng.
- Có thể nhập giá trị bằng ký pháp e, ví dụ như `1e7`, hoặc dùng dấu `+` `-`
- `min` `max` có thể qua mặt dễ dàng: Chỉ cần paste một giá trị nào vào là được
- Hành vi không thống nhất giữa các trình duyệt

## Giải quyết bằng `inputmode`

Để giải quyết những vấn đề trên, trang gov.uk đề xuất dùng `input type=text` chung với `inputmode=numeric` để hiển thị bàn phím số trên mobile.

`inputmode` [[MDN]](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) là một thuộc tính có thể được dùng trên các form controls như `input`, `textarea`, hay bất cứ element nào đang trong chế độ `contenteditable`. `inputmode` có thể mang các giá trị sau:

- `none`: Không hiển thị bàn phím ảo. Hữu ích khi ứng dụng tự chế bàn phím riêng.
- `text`: (giá trị mặc định) Hiển thị bàn phím dựa vào lựa chọn ngôn ngữ của người dùng.
- `tel`: Hiển thị bàn phím để nhập số điện thoại, bao gồm phím số `0-9`, dấu `*`, và dấu `#`.
- `url`: Hiển thị bàn phím để nhập URL, chẳng hạn phím `/` rõ hơn, hay có phím `.com`.
- `email`: Hiển thị bàn phím để nhập email.
- `numeric`: Hiển thị bàn phím số cho số nguyên.
- `decimal`: Hiển thị bàn phím số cho số thập phân. Tùy vào lựa chọn ngôn ngữ của người dùng mà dấu thập phân sẽ là `,` hay `.`. Thiết bị có thể hiện hoặc không hiện dấu `-`.
- `search`: Hiển thị bàn phím để nhập từ khóa tìm kiếm.

<div style="display: grid; margin-bottom: 1em; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))">

  <a href="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1669466392/ehkoo/IMG_1324.png" title="Click để xem hình lớn">
    <img src="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,w_960/v1669466392/ehkoo/IMG_1324.png" alt="input type=text inputmode=decimal">
  </a>

  <a href="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1669466392/ehkoo/IMG_1325.png" title="Click để xem hình lớn">
    <img src="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,w_960/v1669466392/ehkoo/IMG_1325.png" alt="input type=text inputmode=numeric">
  </a>

  <a href="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1669466392/ehkoo/IMG_1326.png" title="Click để xem hình lớn">
    <img src="https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,w_960/v1669466392/ehkoo/IMG_1326.png" alt="input type=text inputmode=url">
  </a>

</div>

_Ví dụ về `inputmode` trên mobile_

## Kết luận

Quay lại bug ở trên, mình sẽ đổi thành:

```html
<input type="text" inputmode="decimal" pattern="[0-9,\.]*" />
```

để có thể nhập số với dấu phẩy và dấu chấm. Trường hợp mình cần số nguyên thì dùng `inputmode=numeric` ha. Ngoài ra nếu bạn muốn hỗ trợ nhập giá trị âm thì nên đổi thành `pattern="[+-]?[0-9,\.]*"`.
