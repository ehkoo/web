---
title: 'Canh giữa nội dung dễ dàng với `align-content`'
date: 2024-04-21
tags:
  - CSS
excerpt: 'Từ nay chúng ta không cần phải tạo grid hay flex chỉ để canh giữa theo trục dọc nữa.'
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,w_1280/v1713697136/ehkoo/photo-1458682625221-3a45f8a844c7.jpg
author: kcjpop
figure:
  src: &cover
  alt: 'Một bức tường được lợp bằng nhiều mảnh ngói khác màu ở Luân Đôn, Vương quốc Anh'
  author:
    name: 'Andrew Ridley'
    url: https://unsplash.com/@aridley88
  credit:
    from: Unsplash
    url: https://unsplash.com/photos/a-multicolored-tile-wall-with-a-pattern-of-small-squares-jR4Zf-riEjI
---

Firefox 125 vừa được phát hành ngày 16.04.2024 đã hỗ trợ thuộc tính `align-content` cho nội dung dạng block. Cùng với Chrome/ Edge và Safari, giờ đây việc canh giữa nội dung theo chiều dọc đã trở nên vô cùng dễ dàng.

## `align-content` là gì?

Xửa xừa xưa mỗi khi muốn canh giữa nội dung, có thể bạn đã dùng đến "tuyệt chiêu tà đạo" này:

```css
.vcenter {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

Flex và sau này là grid xuất hiện đã làm cho mọi chuyện bớt rối rắm và tự nhiên hơn.

```css
.vcenter {
  display: flex;
  align-items: center;
}
```

Nhưng nhiều khi chúng ta sử dụng flex/ grid chỉ với duy nhất mục đích này. Xấu hay tốt thì mình không rõ, nhưng từ nay bạn có thể áp dụng ngay thuộc tính `align-content: center;` trên nội dung dạng block để có kết quả tương tự.

```css
.vcenter {
  display: block;
  align-content: center;
}
```

Theo lý thuyết thì các giá trị để phân bố phần tử con (_distributed alignment_) như `space-between`, `space-evently`, và phân bố dựa vào baseline (_baseline alignment_) cũng phải được hỗ trợ, nhưng mình thử qua trên Firefox và Chrome thì chỉ thấy dùng với baseline là được thôi. Safari có chút phản ứng khi dùng `align-content: space-evenly` nhưng có gì đó không đúng lắm.

Trăm nghe không bằng một thấy, bạn có thể xem qua ví dụ dưới đây để thử nghiệm các giá trị khác nhau của `align-content` khi được áp dụng cho nội dung dạng block.

<browser-window flush>
    <iframe src="/demo/align-content/index.html"></iframe>
</browser-window>

## Kết

Bài viết ngắn ngủn đến đây là kết thúc rồi. Từ nay hãy thêm `align-content: center` mỗi khi cần canh giữa nhe.

**Ngoài lề:** Tác giả của font Fira Code **Nikita Prokopov** có [một bài viết](https://tonsky.me/blog/centering/) khá vui giới thiệu các trường hợp canh giữa trật lất trong các ứng dụng của Apple, Microsoft, Github, v.v.
