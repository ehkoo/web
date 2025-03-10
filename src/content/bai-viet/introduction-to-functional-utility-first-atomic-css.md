---
title: Atomic CSS, vì một thế giới hoà bình
slug: introduction-to-functional-utility-first-atomic-css
date: 2018-12-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1545725279/shOliZI_ovxxbt.jpg
tags: CSS, Atomic CSS, Functional CSS, Utility-First CSS
excerpt: Atomic CSS là một hướng tiếp cận khác để đặt tên class và quản lý code trong CSS. So với BEM, atomic CSS giúp cho tập tin CSS nhẹ hơn, lập trình viên đỡ phải suy nghĩ và viết ít CSS lại. Nhưng atomic CSS cũng khá là quái dị.
author: kcjpop
editor: chubbyanh, huytd, nhducit
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1545725279/shOliZI_ovxxbt.jpg)
_Concept art trong bộ phim "Our Friend The Atom" (1957) của Walt Disney - [Nguồn](http://www.disneyhipsters.com/2013/11/two-stunning-concepts-from-our-friend.html)_

## Những vấn đề với cách viết CSS hiện tại

### Specificity war, thâm cung nội chiến

Bạn còn nhớ lần đầu bạn viết CSS giống như thế nào không? Có thể là khai báo style cho một thẻ HTML nào đó.

```css
a {
  text-decoration: none;
}

p {
  color: rainbow;
}
```

Sau đó bạn biết thêm về ID và class:

```css
#header {
  margin: 10px;
  text-align: center;
  color: fabulous;
}

.text {
  font-weight: 700;
  font-size: 20px;
}
```

Và bạn học được cách xử lý các pseudo selectors, hoặc khai báo cho các phần tử anh chị em con cháu họ hàng, v.v...

```css
#header > a:first-child {
  color: unicorn;
}

#header p > a.text::before {
  content: '⛓';
  font-family: Comic Sans;
}
```

Rồi khi bạn đã quen với CSS và bắt tay vào làm dự án thực tế, bạn bàng hoàng nhận ra kẻ thù không ở đâu xa, chúng đang lởn vởn quanh ta í mà. Bạn bước vào cuộc chiến gọi là ["specificity war"](https://css-tricks.com/a-specificity-battle/), đánh nhau tơi bời khói lửa với class được viết bởi các chiến hữu trong team. Quả là một trận đấu kinh hoàng khi ai cũng muốn đè đầu cưỡi cổ (override) người đi trước. Kẻ nắm giữ `!important` trong tay cứ nghĩ đã gần với chiến thắng, nào ngờ xuất hiện tiểu nhân dùng `inline style + !important`. Tình anh em sứt mẻ, chiến hữu quay đầu không nhìn mặt nhau. Bạn ức chế và gào lên "đậu phộng CSS 🥜".

> **Specificity là gì?**
>
> Specificity là một trọng số được trình duyệt sử dụng để quyết định CSS style nào sẽ được áp dụng cho các element. Specificity được tính toán dựa vào phân loại selector và số lượng selector áp dụng lên một element. Bạn có thể đọc thêm về chủ đề này [ở đây](http://gockinhnghiem.com/2011/11/09/specificity-trong-css-la-gi/) hoặc trên trang [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). [http://cssspecificity.com](http://cssspecificity.com) minh hoạ khá cụ thể cách tính specificity.

### `Block__Element--Modifier`

Dân tay to mặt bự đọc đến đây có lẽ đang âm thầm (hoặc công khai) cười khẩy: "Ai kêu gà, xài BEM là được rồi". Chíp chíp 🐥

> **Cho những bạn chưa biết:**
>
> [BEM - Block Element Modifier](https://css-tricks.com/bem-101/) là một phương pháp đặt tên CSS class được phát triển bởi Yandex. Theo lý thuyết, BEM giúp bạn xây dựng các class theo từng block, mỗi block lại có element con, và các element này có thể sẽ có giao diện khác nhau tuỳ thuộc vào modifier của nó.
>
> Ví dụ đây là CSS:
>
> ```css
> /* Block */
> .btn {
> }
>
> /* Element */
> .btn__price {
> }
>
> /* Modifier */
> .btn--big {
> }
>
> .btn--green {
> }
> ```
>
> Áp dụng vào HTML:
>
> ```html
> <button class="btn btn--big btn--green">
>   <span class="btn__price">$9.99</span>
> </button>
> ```

Hoàn toàn không sai. BEM là một phương pháp hiệu quả để chia nhỏ trang thành từng component, và bạn hoàn toàn có thể tránh được cuộc thánh chiến ở trên bằng cách chỉ sử dụng class được đặt tên theo BEM. Ngoài ra, khi một component không còn được dùng nữa, bạn có thể tự tin xoá đi class của nó mà không sợ ảnh hưởng đến các component khác.

Tuy nhiên BEM cũng có những vấn đề "khó chịu" mà bạn có thể xem thêm ở bài viết [Battling BEM CSS: 10 Common Problems And How To Avoid Them](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/). Kinh nghiệm cá nhân là khi làm việc với BEM, có thể bạn sẽ bỏ kha khá thời gian chỉ để suy nghĩ về ngữ nghĩa (semantics) của class. Bạn sẽ phải cân nhắc block này nên đặt tên là gì, những thành phần con của nó có nên là element hay là một component khác, rồi element này nên có tên chi, nên gọi nó là `wrapper`, `container`, hay `body`, v.v... Đừng coi thường việc đặt tên nhé, một trong những vấn đề khó nhai nhất của khoa học máy tính đấy. Ngoài ra tên class thường dính liền với cấu trúc/ nội dung HTML mà nó được sử dụng, dẫn đến việc khi refactor code lại (chuyển thành component tổng quát hơn), chúng ta phải tốn thời gian suy nghĩ tên khác cho hợp lý.

Với mình, việc suy nghĩ thêm về ngữ nghĩa cho CSS class không đem lại hiệu quả đáng kể. Vì không giống như HTML, trình duyệt và crawlers không quan tâm bạn đặt tên class có ý nghĩa hay không. Chúng chỉ có giá trị với lập trình viên, và thường thì chúng ta chỉ muốn viết HTML/CSS sao cho giống với thiết kế từ designers nhất mà thôi.

### Tính tái sử dụng và kích thước tập tin CSS

Mỉa mai thay, tính chất "cascading" của CSS vốn được sinh ra để hỗ trợ tái sử dụng code lại là một con dao 2 lưỡi và đem đến phiền muộn cho biết bao nhiêu người. Cascading cùng với specificity làm cho CSS trở nên khó dự đoán và lời khuyên là hạn chế cascading được bao nhiêu hay bấy nhiêu. Điều này dẫn đến tập tin CSS chứa nhiều khai báo bị trùng lắp.

```css
.ie6 #footer-content .flex-control-nav li a,
.ie7 #footer-content .flex-control-nav li a,
.ie8 #footer-content .flex-control-nav li a {
  float: left;
}

#nav.challenger-a li.menu-products {
  float: left;
}
```

Khi dự án của bạn phát triển, nhiều component xuất hiện đồng nghĩa với kích thước tập tin CSS ngày càng to ra. Đáng buồn là, không phải tất cả CSS được gửi xuống cho người dùng sẽ thật sự được sử dụng trong trang.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1000/v1545725390/1_qoyWe6NLqjzVRlDb5YWQAA_nhykgd.jpg)
_Kích thước tập tin CSS của các website lớn, tính đến tháng 11 năm 2016. Nguồn: [1]_

## Vậy atomic CSS giải quyết được những vấn đề trên à?

Có thể. Nhưng trước hết hãy xem atomic CSS là gì đã.

Atomic CSS là cách khai báo các class sao cho mỗi class chỉ mô tả một tính năng duy nhất. Để xây dựng component lớn hơn, chúng ta sẽ kết hợp các class nguyên tử này lại với nhau. Chẳng hạn như:

```css
.white {
  color: #fff;
}

.bg-green {
  background-color: #3d9970;
}

.px-10 {
  padding-left: 10px;
  padding-right: 10px;
}
/*  Oát đờ hợi (ಠ_ಠ) */
```

Trong ví dụ trên, class `white` chỉ làm duy nhất một việc là đổi chữ sang màu trắng, `bg-green` sẽ thiết lập nền sang màu xanh, trong khi `px-10` chỉnh padding ở bên trái và phải (trục x/ trục hoành) thành 10px. Một component được viết theo atomic CSS sẽ giống như thế này:

```html
<button class="b1 b--green bg-green white br-5 ma-10 f3 ttu fw-400 padding-10">
  <span class="bg-dark o4 white padding-x-12 fw-600 br-left-5">$9.99</span>
  Purchase
</button>
```

<p data-height="265" data-theme-id="0" data-slug-hash="KbmGEq" data-default-tab="css,result" data-user="ehkoo" data-pen-title="BEM vs atomic CSS" class="codepen">See the Pen <a href="https://codepen.io/ehkoo/pen/KbmGEq/">BEM vs atomic CSS</a> by Ehkoo (<a href="https://codepen.io/ehkoo">@ehkoo</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Atomic CSS đang được sử dụng bởi các công ty như [npm](https://www.npmjs.com/), [StackOverflow](https://stackoverflow.design/product/guidelines/using-stacks#goals), [Heroku](https://design.herokai.com/purple3), v.v...

**Chuyện bên lề: Functional CSS, Atomic CSS, hay Utility-first CSS?**

"Functional CSS" là tên gọi đầu tiên mình bắt gặp khi tìm hiểu về cách viết CSS này. Từ "functional" ngoài nghĩa như trong "functional programming" còn có nghĩa là "hoạt động" (trích [từ điển Oxford](https://en.oxforddictionaries.com/definition/functional)). Do đó "functional CSS" có thể hiểu là "CSS hoạt động được", hoàn toàn không liên quan đến ý tưởng chính: đặt CSS class thành từng hàm nhỏ.

Một tên gọi khác là "Atomic CSS", theo nghĩa mỗi class là một "nguyên tử" độc lập. Tên gọi này rất phù hợp với tiêu chí chia nhỏ class, nhưng đáng tiếc thay khi nó "có thể" nhầm lẫn là có liên quan tới phương thức [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/). Ngoài ra, có một thư viện của Yahoo! cũng tên là [Atomic CSS](https://acss.io/).

Cuối cùng, "Utility-first CSS" có lẽ là tên gọi mô tả chính xác nhất. "Utility-first" mang nghĩa "tập trung xây dựng các class hỗ trợ". Điểm trừ của thuật ngữ này là…tên dài quá.

Suy đi xét lại thiệt hơn thì trong bài viết này mình chọn "atomic CSS" (chữ "a" viết thường) vì…gõ nhanh thôi. Nhưng bạn để ý là 3 thuật ngữ này đều dùng chung cho một cách viết CSS nhé.

## Vậy có gì hay?

### Tránh cảnh binh đao

Lợi ích đầu tiên là cũng giống như BEM, atomic CSS chỉ cho phép khai báo các class nên chúng không xảy ra tranh chấp specificity. Đồng thời vì mỗi class chỉ mô tả một tính năng duy nhất, việc các thuộc tính giẫm chân lên nhau được hạn chế ở mức thấp nhất.

Còn vẫn ghét nhau quá, muốn đạp nhau cho chết thì đây:

```html
<div class="red">
  Roses are red
  <div class="blue">
    Violets are blue
    <div class="yellow">
      Honey is sweet
      <div class="brown">But not as sweet as you</div>
    </div>
  </div>
</div>
```

_Credit: @huytd_

### Tập tin CSS nhẹ hơn

Bằng cách xây dựng component bằng những class nguyên tử, bạn không cần phải lặp đi lặp lại những khai báo đã có. Khi nhận được thiết kế cho component mới, bạn chỉ cần kết hợp những class đã có sẵn với nhau hoặc viết thêm atomic classes. Những class mới xuất hiện sẽ tiếp tục được tái sử dụng nên số lượng class bạn thêm vào sẽ ngày càng giảm đi khi tuổi thọ của dự án dài ra. Trong bài viết [By The Numbers: A Year and Half with Atomic CSS](https://medium.com/@johnpolacek/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4), John Polacek đã thử nghiệm chuyển đổi từ CSS truyền thống sang atomic CSS và kết quả là dung lượng tập tin giảm từ 123.1KB xuống còn 72.7KB (chưa nén gzip).

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1545725434/1_Tvxaigmr3ve2GrWDwHB9Pw_qtsoai.jpg)

Kết quả cuối cùng là càng ngày bạn sẽ càng viết ít CSS lại.

### Không phải suy nghĩ chuyện đặt tên class

Vì các atomic classes được đặt tên gần với thuộc tính của chúng, bạn không cần phải suy nghĩ nên đặt tên gì. Một lợi ích nữa là nhìn vào HTML bạn có thể tương đối biết được style của một element. Lấy ví dụ:

```html
<!-- BEM -->
<button class="btn btn--big btn--green"><span class="btn__price">$9.99</span> Purchase</button>

<!-- atomic CSS -->
<button class="b1 b--green bg-green white br-5 ma-10 f3 ttu fw-400 padding-10">
  <span class="bg-dark o4 white padding-x-12 fw-600 br-left-5">$9.99</span>
  Purchase
</button>
```

Với BEM, bạn có thể sơ đoán "à cái nút này là cái nút màu xanh bự nè", nhưng "bự" là cái gì "bự", `font size` hay `height`, và cái gì "xanh", chữ xanh, nền xanh hay viền xanh. Khi đi đến `btn__price` thì hoàn toàn không thể biết được style của nó. So sánh với atomic CSS, bạn có thể đọc ngay là "nút này có viền 1px, viền màu xanh, nền xanh, chữ trắng, bo tròn góc 5px, margin ở bốn phía 10px, font ở level 3, chữ được chuyển thành chữ hoa có font weight 400, padding bốn phía 10px". Tương tự với thẻ SPAN, bạn có thể đọc là "nền đen có opacity 0.4, chữ trắng, padding trái phải 12px, font weight 600, bo tròn góc bên trái 5px".

Liệu việc đọc style như thế này có cần thiết? Nếu bạn mới bắt đầu, câu trả lời có thể là không, nhưng khi đã quen rồi, đọc class nhanh giúp bạn debug và thay đổi style dễ dàng hơn.

### Xây dựng prototype nhanh hơn

Prototyping, hay là chuyện làm những giao diện giả để kiểm tra UI/UX, không còn lạ với dân làm frontend nữa. Một trong những lý do bạn chọn Bootstrap, Foundation, hay Bulma... cho dự án vì đơn giản chúng cung cấp những component được xây dựng sẵn, cùng với hệ thống grid và các class hỗ trợ. Nhưng rồi bạn sẽ lâm vào cảnh đánh nhau với các class của framework để tuỳ biến cho phù hợp với chuẩn thiết kế. Kết quả ra sao thì bạn biết rồi.

Các framework được thiết kế theo hướng atomic không có nhiều component, nhưng bù lại chúng không đặt quá nhiều ý kiến riêng và ép buộc bạn phải làm theo. Hầu hết đều cho phép bạn tuỳ chỉnh màu sắc, kích thước theo ý, từ đó bạn có thể xây dựng lên những component cần thiết.

## Hạn chế

### Bùng nổ class

[Tachyons](http://tachyons.io/docs/themes/skins/) là một trong những atomic CSS framework phổ biến nhất. Trong phiên bản 4.10.0, Tachyons hỗ trợ 37 màu. Giả sử mỗi màu sẽ có class tương ứng với màu chữ, màu nền, màu viền, hover đổi màu chữ, hover đổi màu nền, và hover đổi màu viền. Tachyons có 3 breakpoints. Như vậy tổng số class được tạo ra là 37 x 8 (thuộc tính) x 3 = 888 classes. Nếu bạn phải sử dụng nhiều màu hơn, ví dụ như color palette của [Material Design](https://material.io/design/color/the-color-system.html#tools-for-picking-colors), hỗ trợ nhiều thuộc tính và pseudo selector hơn, thêm vài breakpoints nữa, bạn cũng có thể đoán được số lượng class phình ra như thế nào.

Thực tế là không phải tất cả class màu đều được sử dụng, nên việc tạo ra class để bao gồm tất cả các trường hợp là không cần thiết. Cách giải quyết ở đây là chỉ viết thêm class khi bạn thật sự cần đến nó.

### Tìm và thay đổi class theo yêu cầu mới khó hơn

Giả sử một ngày đẹp trời nào đó, đồng chí Nguyễn Văn Xài Nơ quyết định nền màu xanh của tất cả các nút phải đậm hơn chút xíu, nút bự nghĩa là font size phải ở level 2. Với BEM, bạn chỉ cần thay đổi giá trị của class `.btn--green` và `.btn--big` là xong. Trong khi đó bạn không thể đổi mã màu của `.bg-green` bởi vì thay đổi này chỉ áp dụng trên nút và biết đâu được màu cũ vẫn được dùng ở nơi khác. Bạn cũng không thể tuỳ tiện tăng font size của `.f3`. Giải pháp an toàn nhất là tìm tất cả các nút, xoá đi class cũ và thêm vào `f2 bg-dark-green`. Bạn tìm các nút bằng cách nào? Search and Replace… `bg-green white br-5 ma-10 f3` -> `bg-dark-green white br-5 ma-10 f2`? Lỡ như có một class nào đó chen vào giữa `bg-green white br-5 ma-10 letter-spacing-1 f3` và thế là tèn tén ten.

Nếu dự án của bạn sử dụng React, Vue, hay các thư viện hỗ trợ (web) component khác, việc thay đổi này không thành vấn đề. Còn với thuần HTML thì…coi bộ cực đó. Bạn có thể đặt tên cho UI component bằng `data-`, nhưng như vậy markup sẽ bị rối và ở phía người dùng, các thuộc tính này hoàn toàn không được dùng đến.

```html
<button data-ui-name="button-big-green" class="b1 b--green bg-green white br-5 ma-10 f3 ttu fw-400 padding-10">
  <span class="bg-dark o4 white padding-x-12 fw-600 br-left-5">$9.99</span>
  Purchase
</button>
```

### Nghi ngờ từ cộng đồng

Thành thật mà nói, atomic CSS rất không tự nhiên khi tiếp xúc lần đầu tiên. Chúng ta đã quá quen với cách viết CSS truyền thống/ BEM, và khi nhìn thấy một đống class đi chung với những cái tên xa lạ như `ma`, `px`, hay `ttu`, nghi ngờ là phản ứng rất dễ hiểu.

> **Vậy có khác gì inline style?**

Nhìn sơ qua thì đúng là giống như inline style vậy, và ai cũng biết inline style là bad practice. Nhưng atomic classes khác hoàn toàn và mạnh mẽ hơn inline style nhiều. Atomic classes cho phép bạn viết media queries, `@support`, pseudo selectors hay sử dụng animation, những điều mà inline style không làm được. Và vì atomic CSS được lưu trong tập tin CSS, trình duyệt có thể lưu vào bộ nhớ đệm, không giống như inline style.

> **Tên class thấy gớm**

Kiểu viết tắt `ma` (margin all), `px` (padding x), `ph` (padding horizontal) hay `bg` rất phổ biến trong cộng đồng atomic CSS. Ban đầu bạn có thể thấy khó hiểu và tốn thời gian để học, nhưng sau một thời gian chúng sẽ trở nên tự nhiên.

Ngoài ra còn một số ý kiến phản đối atomic CSS nữa mà nếu muốn, bạn có thể đọc bài viết [The Problem with Atomic CSS](https://medium.com/simple-human/the-problem-with-atomic-css-d0c09c7aa38e) rồi tự đưa ra nhận xét. Spoiler alert: không phải tất cả luận điểm trong bài đều hợp lý.

## Tích hợp vào dự án

Nếu bạn đọc đến đây và không cảm thấy atomic CSS là một ý tưởng dị hợm thì bài viết này coi như đã thành công. Để dùng atomic CSS trong dự án, bạn có thể chọn cách dùng các thư viện có sẵn, hoặc tự xây dựng thư viện riêng.

### Dùng hàng ăn sẵn

Cách này phù hợp với những dự án mới hoặc bạn muốn thử nghiệm với atomic CSS. Hiện tại thì hai thư viện phổ biến nhất là [Tachyons](http://tachyons.io/) và [Tailwind](http://tailwindcss.com/). Tachyons có lượng người dùng đông đảo vì xuất hiện trước, nhưng Tailwind lại mạnh mẽ hơn vì cho phép bạn thay đổi màu sắc, kích thước, v.v... hoàn toàn theo ý muốn. Không thì bạn có thể dùng hệ thống thiết kế của [StackOverflow](https://stackoverflow.design/product/guidelines/using-stacks#goals) hay [Heroku](https://design.herokai.com/purple3) cũng được.

Sự thật là các atomic classes quá nhỏ nên chúng gần như giống hệt nhau ở tất cả framework, có khác chăng chỉ là tên gọi mà thôi.

### Tự trồng

Trong một dự án đang chạy, nếu muốn áp dụng atomic CSS thì không gì tốt hơn là tự trồng lấy một framework. Các atomic classes rất nhỏ và đơn giản nên hoàn toàn không có gì khó để tự viết cả. Bạn có thể từ từ bóc tách các thuộc tính của các class cũ và chuyển chúng thành atomic classes. Dự án của bạn có thể sắp xếp các tập tin (S)CSS như thế này.

```bash
styles/utils/
├── _animation.scss
├── _background.scss
├── _border.scss
├── _box-shadow.scss
├── _color.scss
├── _cursor.scss
├── _display.scss
├── _flex.scss
├── _font-size.scss
├── _font-weight.scss
├── _height.scss
├── _letter-spacing.scss
├── _line-height.scss
├── _list.scss
├── _margin.scss
├── _max-width.scss
├── _padding.scss
├── _ratio.scss
├── _text-align.scss
└── _width.scss
```

Về việc đặt tên, bạn có thể chọn kiểu viết tắt `px`, `ma` hay `ttu` như trong Tachyons, hoặc kiểu đầy đủ `padding-x`, `margin-all`, `text-transform-uppercase`. Cái này tuỳ thuộc vào sở thích của từng team.

Ngoài ra, việc viết lặp đi lặp lại nhóm class có thể gây nhàm chán, do đó bạn đừng quên tận dụng các công cụ tiền xử lý CSS như SASS, LESS, hay Stylus để cuộc sống dễ thở hơn. Chẳng hạn như đoạn code dưới đây để tạo ra các class liên quan đến height:

```scss
$list: 28 96 128 640;

@each $value in $list {
  .h-#{$value} {
    height: #{$value}px;
  }
}
```

Khi cần thêm một giá trị mới, bạn chỉ cần bỏ nó vào `$list`. Bạn cũng có thể dùng mixin để tạo ra các class responsive:

```scss
@include media(extra-large) {
  $list: 28 96 128 640;

  @each $value in $list {
    .h-#{$value}-xl {
      height: #{$value}px;
    }
  }
}
```

## Kết

Nếu nhóm của bạn đang dùng BEM hay các phương pháp phát triển CSS khác và hài lòng với chúng, bạn có thể không cần atomic CSS. Atomic CSS không phải sinh ra là để triệt tiêu BEM, mà bổ sung và giúp bạn làm việc với CSS một cách hiệu quả hơn.

Cuối cùng, hãy xem video này và quyết định có nên xài atomic CSS không nhé ;)

<iframe width="100%" height="480" src="https://www.youtube.com/embed/16W7c0mb-rE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Trân trọng cảm ơn [Huy Tran](https://thefullsnack.com/), [Duc Nguyen Huu](https://nhducit.com/), và đồng bọn trong channel [#frontend @ WeBuild](https://we-build-vn.slack.com/messages/C32HMMUAW/) đã góp ý cho bài viết hoàn thiện hơn.

## Tham khảo

[1] Philip Ardeljan. 15kb of CSS is all you’ll ever need ⚡️. https://medium.com/@philipardeljan/15kb-of-css-is-all-youll-ever-need-%EF%B8%8F-634da7258338

[2] John Polacek. By The Numbers: A Year and Half with Atomic CSS. https://medium.com/@johnpolacek/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4

[3] Ferdy Christant. In Defense of Expressive CSS. https://ferdychristant.com/in-defense-of-expressive-css-5d44862d5c56

[4] John Polacek. The Case of Atomic CSS. https://johnpolacek.github.io/the-case-for-atomic-css/

<script  async  src="https://static.codepen.io/assets/embed/ei.js"></script>
