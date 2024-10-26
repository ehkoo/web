---
title: 'Tìm hiểu về CSS logical properties'
date: 2023-03-22
tags: CSS, Dành cho người mới
cover: https://assetstorev1-prd-cdn.unity3d.com/key-image/1ba69ccc-bdc3-42bf-b108-5cae0b3678ef.png
excerpt: 'Thiết kế giao diện cho website đa ngôn ngữ dễ dàng hơn'
author: kcjpop
draft: true
---

!["Hình minh họa"](https://assetstorev1-prd-cdn.unity3d.com/key-image/1ba69ccc-bdc3-42bf-b108-5cae0b3678ef.png)

Trước giờ thì chúng ta đã rất quen thuộc với các

Ví dụ để thêm vào một khoảng trống bên trái.

```css
.content {
  margin-left: 1em;
}
```

Hay quy định chiều dài/ cao của một đối tượng.

```css
.elem {
  width: 5em;
  height: 7em;
}
```

Mọi chuyện vẫn ổn cho đến khi bạn cần phải hỗ trợ các ngôn ngữ không đọc/ viết từ trái qua phải.

> **Chuyện về hướng viết chữ**
>
> Theo như [Wikipedia](https://commons.wikimedia.org/wiki/File:Writing_directions_of_the_world.svg#/media/File:Writing_directions_of_the_world.svg) thì đa số các ngôn ngữ trên thế giới đều viết từ trái qua phải (left-to-right hay `ltr`). Giải thích thì có lẽ là do đa số mọi người thuận tay phải, nên khi viết như vậy sẽ tiện hơn, tay sẽ không bị dính mực vào phần vừa viết.
>
> Trong khi đó tiếng Do Thái, tiếng Ả Rập, và tiếng Ba Tư (hay còn gọi là tiếng Farsi hoặc tiếng Persia) lại viết từ phải qua trái (right-to-left hay `rtl`). Một phần là tại vì thời cổ đại ở khu vực này người ta khắc chữ trên đá. Khi tay phải cầm đục, tay trái cầm búa thì viết từ phải qua sẽ thuận tiện hơn.
>
> Riêng tiếng Mông Cổ, tiếng Hoa, tiếng Nhật, tiếng Hàn, và chữ Nôm thì lại viết từ trên xuống dưới, vì hồi xưa xửa xừa xưa trước khi phát minh ra giấy, người ta viết trên thẻ tre hoặc gỗ. Sau khi viết xong thì đóng lại thành từng cuộn. Thành ra khi mở ra đọc, chúng ta sẽ bắt đầu đọc từ phải qua trái.
>
> ![](https://upload.wikimedia.org/wikipedia/commons/9/94/Bamboo_book_-_binding_-_UCR.jpg)
>
> _Binh pháp Tôn Tử viết trên thẻ tre, thế kỷ 18. Nguồn: [Wikipedia](https://commons.wikimedia.org/wiki/File:Bamboo_book_-_binding_-_UCR.jpg#/media/File:Bamboo_book_-_binding_-_UCR.jpg)_
>
> Ngày nay do ảnh hưởng của văn hóa phương Tây, tiếng Hoa/ Nhật/ Hàn đã chuyển sang viết từ trái sang phải, nhưng trong một số trường hợp sẽ viết từ trên xuống dưới để thể hiện tính hoài cổ chẳng hạn.

## CSS logical properties là gì?

Các thuộc tính logic (_logical properties_) giúp bạn canh chỉnh layout dựa vào.

## Block và inline

Đối với các ngôn ngữ LTR, trục block và inline sẽ giống như vầy:

Trong khi với các ngôn ngữ RTL

## Kết luận
