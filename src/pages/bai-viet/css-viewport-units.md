---
layout: ../../layouts/Post.astro
title: 'Những viewport units mới trong CSS'
date: 2023-01-11
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1673459845/ehkoo/photo-1472201248592-1241c92256ff.jpg
tags: CSS, Bài mì ăn liền
excerpt: 'Bự, Nhỏ, và Linh Động (đậy)'
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1673459845/ehkoo/photo-1472201248592-1241c92256ff.jpg)

_Hình chụp bởi [Gareth Harper](https://unsplash.com/@garethharper). Nguồn: [Unsplash](https://unsplash.com/photos/yACpBcInUos)_

**Cảnh báo**

Bài viết này sẽ dùng "_viewport_" để chỉ không gian (thường là hình chữ nhật) trên màn hình mà người dùng đang nhìn thấy. Đối với desktop thì đó là kích thước của trình duyệt, còn trên mobile thì toàn bộ màn hình. Ngoài ra nội dung dưới đây có thể _không chính xác 100%_ theo định nghĩa vì đã bị giản lược theo cách mình hiểu, nên mọi người thấy chỗ nào chưa đúng/ có thể gây hiểu lầm thì để lại bình luận nha.

## Viewport units là gì?

Hồi đâu gần 10 năm trước, các trình duyệt (kể cả IE 11) đã hỗ trợ (hầu hết) viewport units trong CSS, bao gồm:

- `vw` 1% chiều dài (width) của viewport
- `vh`: 1% chiều cao (height) của viewport
- `vmin`: giá trị NHỎ HƠN giữa `vw` và `vh`, tức là `= min(vh, vw)`
- `vmax`: giá trị LỚN HƠN giữa `vw` và `vh`, tức là `= max(vh, vw)`

Vấn đề là giá trị của `vw` và `vh` được tính theo kích thước của "initial containing block", khi root element (thẻ `<html>`) vừa được tạo ra. Khi kích thước của "initial containing block" thay đổi thì giá thị của `vw` và `vh` cũng đổi theo, tuy nhiên vẫn **KHÔNG TÍNH** đến trường hợp có các thanh cuộn xuất hiện.

> **JavaScript, The More You Know**
>
> Tìm hiểu về "initial containing block" thì mình đụng đến chuyện cần phải tính width/ height của document. Dẫn tới câu hỏi làm sao để truy cập vào thẻ `<html>` trong JavaScript.
>
> Câu trả lời là: `document.documentElement` chính là thẻ `<html>`, và 2 thuộc tính `document.documentElement.clientWidth`/ `document.documentElement.clientHeight` sẽ trả về chiều dài và chiều cao mà không tính scrollbar vào. Chỉ áp dụng cho `<html>` và `document.body` ở _quirks mode_ thôi.

Thành ra sẽ có trường hợp `width: 100vw` hay `height: 100vh` nhưng vẫn bị _"nước tràn bờ đê"_. Ngoài ra còn có trường hợp khi thanh địa chỉ ẩn/ hiện trên mobile nữa, như hình dưới đây.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1673460127/ehkoo/100vh_problem.png)

## Những viewport units mới

Chrome 108 vừa phát hành hồi đầu tháng 12 năm 2022 đánh dấu sự có mặt của 3 nhóm viewport units mới trên tất cả các trình duyệt: **Large**, **Small**, và **Dynamic**.

### Large viewport units

Nhóm **Bự** là viewport **KHÔNG** bao gồm mấy cái linh tinh như thanh địa chỉ hay thanh cuộn. Tương tự như trên chúng ta sẽ có `lvw`, `lvh`, `lvmin`, và `lvmax`.

Một ứng dụng thực tế là dùng để tạo cover ở đầu bài viết chẳng hạn.

```css
article > header {
  width: 100lvw;
  height: 75lvh;
  background-image: url(cover-illo.jpg);
  background-size: cover;
}
```

### Small viewport units

Nhóm **Nhỏ** là viewport khi thanh địa chỉ hay scrollbar hiển thị. Bao gồm các units như `svw`, `svh`, `svmin`, và `svmax`. Một ví dụ cụ thể là khi làm modal và chúng ta muốn modal luôn nằm trong vùng nhìn thấy, thay vì bị UI của trình duyệt che lại.

```css
.warning {
  width: 40em;
  height: auto;
  max-width: 100svh;
  max-height: 100svh;
}
```

So sánh giữa large và small viewport units.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1673460156/ehkoo/714b4e4d-0d28-467c-9571-6946ab487e35_viewports2.jpg)

> **Ghi chú:**
>
> Trong hình có nhắc đến `*vb` với `*vi` units. Hai cái này là thay vì dùng `width/ height` lại dựa vào trục `block/ inline`. Còn trục `block/ inline` là gì thì hẹn mấy bạn ở một bài viết khác.

### Dynamic viewport units

Cuối cùng là vũ đoàn **LiDo**, bao gồm `dvw`, `dvh`, `dvmin`, và `dvmax`, theo ý nghĩa là:

- Nếu UI của trình duyệt hiển thị => dynamic viewport units = small viewport units
- Ngược lại, nếu UI của trình duyệt ẩn đi => dynamic viewport units = large viewport units

Vì giá trị của nhóm `dv*` tùy thuộc vào UI của trình duyệt, và UI của trình duyệt thì thay đổi liên tục, nên cần phải cân nhắc khi dùng các giá trị này vì chúng có thể làm web chậm hơn, cũng như tạo ra chuyển động (animation) không cần thiết làm ảnh hưởng đến những người nhạy cảm về tiền đình.

## Kết luận

Hi vọng qua bài viết này, bạn đã biết được sự có mặt của những viewport units mới và có thể sử dụng chúng trong công việc. Câu hỏi tiếp theo là làm sao để chọn đúng viewport units 🤔? Có lẽ cách tốt nhất là thử trực tiếp trên thiết bị di động và nhiều trình duyệt khác nhau. Bạn cũng nhớ nên kiểm tra khi xoay màn hình nữa nha.
