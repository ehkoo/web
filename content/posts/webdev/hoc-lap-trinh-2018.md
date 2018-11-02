---
layout: post.njk
title: Học lập trình web trong năm 2018
slug: hoc-lap-trinh-web-trong-năm-moi
date: 2018-01-20
cover: https://i.imgur.com/CNheflH.jpg
tags: Kinh nghiệm
excerpt: Lalalala
author: kcjpop
draft: true
---

![](https://i.imgur.com/CNheflH.jpg)
<small style="text-align: center; display: block">_Coding photo by Christopher Gower from [Unsplash](https://unsplash.com/photos/m_HRfLhgABo)_</small>

Một trong những mục tiêu năm 2018 của bạn là học lập trình web, cụ thể hơn, trở thành lập trình viên mặt tiền a.k.a "front-end developer". Bạn hào hứng vào Google và gõ "học lập trình web" hoặc "learn web development" nếu bạn thích xài tiếng Anh. Và không hổ danh là trùm tìm kiếm, Google trả về cho bạn 5.2 triệu kết quả tiếng Việt, 42 triệu kết quả tiếng Anh. Quào! Bạn click thử một, hai trang đầu tiên: HTML, CSS, JavaScript, jQuery, MySQL, PHP, Bootstrap, CodeIgniter, Laravel, React, Vue, Angular...Bạn vào lại Google và gõ "đăng ký grabbike".

**Khoan đã bạn ơi, thật ra viết web không cần phải biết hết những cái đó đâu.**

Có một sự thật là lĩnh vực phát triển đang thay đổi với tốc độ chóng mặt, và nếu chân ướt chân ráo bước vào, bạn rất dễ bị ngợp trong hàng đống thông tin. Có quá nhiều công nghệ, quá nhiều lựa chọn, dễ làm cho bạn bối rối và không biết bắt đầu từ đâu.

Nhưng không sao hết. Hãy để Ehkoo đưa đường dẫn lối cho bạn. Bài viết này sẽ liệt kê những chủ đề tối cần thiết để bạn có thể bắt đầu một cách thoải mái hơn. Một vấn đề thường thấy ở những bài hướng dẫn "học gì để trở thành XXX" là đưa ra [quá nhiều lựa chọn](https://en.wikipedia.org/wiki/Overchoice). Do đó bài viết này sẽ đưa ra một, và chỉ một lựa chọn mà theo Ehkoo là tốt nhất cho bạn.

Thôi chúng ta bắt đầu.

### 1. Công cụ

Trước tiên bạn cần chuẩn bị cho mình một số thiết bị và phần mềm:

* Một máy tính -- máy để bàn hay xách tay đều được. Bạn có thể dùng hệ điều hành nào tùy thích. Trong bài viết này Ehkoo ngầm định là bạn sử dụng Windows, vì đây là OS thông dụng nhất.
* Một trình duyệt tốt -- [Firefox](https://www.mozilla.org/en-US/firefox/new/) hoặc [Chrome](https://www.google.com/chrome/). Tuyệt đối không dùng Cốc Cốc.
* Một trình soạn thảo -- [VS Code](https://code.visualstudio.com/)

### 2. HTML căn bản

HTML là ngôn ngữ để định dạng và hiển thị nội dung trên websites. Do đó HTML luôn là chủ đề cần được tìm hiểu đầu tiên. Phiên bản hiện tại là HTML5. Trong mục này, bạn cần nắm:

* [Cấu trúc căn bản của một tập tin HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started): thẻ HTML (HTML element) là gì, thuộc tính (attributes) trong một thẻ, DOCTYPE, các thẻ `HEAD`, `TITLE`, `META CHARSET`, và `BODY`.
* [Các thẻ nội dung](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals): các thẻ tiêu đề `H1`, `H2`, `H3`, `H4`, `H5`, `H6`; thẻ đoạn văn bản `P`; thẻ danh sách, bao gồm danh sách không thứ tự `UL` `LI` và danh sách có thứ tự `OL` `LI`.
* [Tạo đường dẫn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks) bằng thẻ `A`: cần biết về đường dẫn tương đối (relative URLs) và đường dẫn tuyệt đối (absolute URLs), các thuộc tính quan trọng của thẻ `A` như `href`, `target`, và `title`.
* [Chèn hình](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) bằng thẻ `IMG`. Bạn không cần quan tâm thẻ `FIGURE` ở thời điểm hiện tại.
* [Tạo bảng](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics) với thẻ `TABLE`. Đọc từ phần "Active learning: Creating your first table". Yêu cầu thành thạo `TR`, `TD`.

Như vậy là đủ.

### 3. CSS căn bản

Nếu HTML là viên gạch để xây dựng nền tảng cho website của bạn, thì CSS đóng vai trò như nước sơn, làm cho website của bạn trở nên bắt mắt và thu hút người truy cập hơn. Để tìm hiểu CSS, bạn cần nắm.

* [Cách sử dụng CSS trong tập tin HTML](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/How_CSS_works): bằng cách khai báo trong thuộc tính `style` của các thẻ HTML, hoặc khai báo CSS với thẻ `STYLE`, hoặc chèn tập tin CSS bằng thẻ `LINK`.
* [Cú pháp CSS căn bản](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Syntax): chỉ cần đọc phần "CSS declarations" và đừng quan tâm những khai báo bắt đầu bằng @, ví dụ như `@import` hay `@media`.
* Cách viết CSS selectors: [chọn bằng thẻ HTML](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors), [chọn bằng class](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) (bạn sẽ biết thêm thuộc tính `class` của các thẻ HTML), [chọn bằng ID](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors) (tương tự, bạn biết thêm thuộc tính `id`).
* Hai CSS combinators thông dụng nhất: [chọn phần tử con](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_selectors) và [chọn phần tử kế thừa](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors).
* [Các đơn vị trong CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units): px, em, rem, %, mã màu hex, RGB(A), HSL(A)

Những thuộc tính CSS bạn nên biết đến thời điểm này:

* `background-color`
* `background-image`
* `background-position`
* `background-repeat`
* `background-size`
* `background`
* `border-color`
* `border-radius`
* `border-style`
* `border-width`
* `border`
* `color`
* `font-family`
* `font-size`
* `font-style`
* `font-weight`
* `font`
* `height`
* `width`
* `margin`
* `padding`
* `text-align`
* `text-decoration`

Bạn có thể dùng [bảng tham khảo các thuộc tính CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) để xem chi tiết cách sử dụng.

### 4. HTML và CSS nâng cao với Bootstrap

Đến thời điểm này bạn đã có biết căn bản về HTML, đã có thể tự mình viết một trang web đơn giản với chút định dạng từ CSS. Trả lời thật lòng đi, có phải trang web của bạn đang...xấu đau xấu đớn không? Chúng ta sẽ nâng cao khả năng của bạn bằng cách học sử dụng [Bootstrap 4](http://getbootstrap.com/), một bộ công cụ xây dựng giao diện với HTML và CSS. Bootstrap cũng bao gồm một chút JavaScript nhưng bạn có thể bỏ qua ở lúc này.

> **Tại sao lại đưa ra framework vào lúc này?**
> Một số bạn đọc nhiều kinh nghiệm sẽ nhăn mặt khi thấy Bootstrap ở đây. Theo ý kiến của tác giả, vừa học vừa làm là cách tốt nhất để tiếp cận công nghệ mới. Bằng cách sử dụng Bootstrap lúc này, bạn được tiếp cận với một trong những thư viện HTML/CSS tốt nhất. Bạn sẽ học thêm những khái niệm về layout, responsive design...đồng thời làm quen với những components quen thuộc trên web như badges, buttons, cards, navbar...Ngoài việc sự dụng, bằng cách dùng Developer Tool của trình duyệt để xem code cũng là một cách học.

Trước khi bắt đầu, bạn cần tìm hiểu thêm về:
* Thẻ [`DIV`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) và [`SPAN`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)
* Cách sử dụng Inspector của Firefox Developer Tools: [mở Inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Open_the_Inspector), [kiểm tra và thay đổi HTML](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_HTML), [kiểm tra và thay đổi CSS](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_CSS), và [đổi màu](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Inspect_and_select_colors).

Sau đó, bạn chuyển qua tìm hiểu về những chủ đề sau của Bootstrap:

* [Dựng layout bằng Flexbox](http://getbootstrap.com/docs/4.0/layout/overview/): [responsive design với CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries), [Flexbox căn bản](https://css-tricks.com/snippets/css/a-guide-to-flexbox), [sử dụng Responsive Design Mode trong Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode), [Bootstrap Grid](http://getbootstrap.com/docs/4.0/layout/grid/).
* [Chỉnh sửa nội dung trong Bootstrap](http://getbootstrap.com/docs/4.0/content/reboot/)
* Một số components: bạn không cần phải nhớ hết các components của Bootstrap, chỉ cần xem qua giao diện và cấu trúc của chúng, cách người ta viết HTML và CSS. Khi nào cần thì quay lại sau.

Khi xem code của Bootstrap, có thể bạn sẽ gặp những [thẻ HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)/thuộc tính CSS mới. Lúc này bạn có thể tham khảo trên Mozilla Developer Network (MDN).

### Một số chủ đề nâng cao

#### CSS

* Grid
* Animation

### Kết
