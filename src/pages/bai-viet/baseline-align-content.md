---
layout: ../../layouts/Post.astro
title: 'Canh giữa dễ như bỡn với `align-content`'
date: 2024-04-21
tags: CSS
excerpt: 'Từ nay chúng ta không cần phải tạo grid hay flex chỉ để canh giữa theo trục dọc nữa.'
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,w_1920/v1713697136/ehkoo/photo-1458682625221-3a45f8a844c7.jpg
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
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```

Flex và sau này là grid xuất hiện đã làm cho mọi chuyện bớt rối rắm và tự nhiên hơn.

```css
display: flex;
align-items: center;
```

Nhưng nhiều khi chúng ta sử dụng flex/ grid chỉ với duy nhất mục đích này. Xấu hay tốt thì mình không rõ, nhưng từ nay bạn có thể áp dụng ngay thuộc tính `align-content: center;` trên nội dung dạng block để có kết quả tương tự. 

```css
display: block;
align-content: center;
```

Không chỉ với `align-content: center`, bạn còn có thể dùng `align-content: space-between` hay `align-content: baseline` nữa.

Trăm nghe không bằng một thấy, bạn có thể xem qua ví dụ dưới đây để thử nghiệm các giá trị khác nhau của `align-content` khi được áp dụng cho nội dung dạng block.

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="NWmEmdz" data-preview="true" data-user="ehkoo" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/ehkoo/pen/NWmEmdz">
  Untitled</a> by Ehkoo (<a href="https://codepen.io/ehkoo">@ehkoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Kết

Bài viết ngắn ngủn đến đây là kết thúc rồi. Từ nay hãy thêm `align-content: center` mỗi khi cần canh giữa nhe.

**Vui vui:**

**Nikita Prokopov**, tác giả của font Fira Code, có [một bài viết](https://tonsky.me/blog/centering/) khá vui giới thiệu các trường hợp canh giữa trật lất trong các ứng dụng của Apple, Microsoft, Github, v.v.
