---
title: Có thể bạn không cần jQuery
slug: co-the-ban-khong-can-jquery
date: 2018-03-05
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1520068065/jquery_fbntr4.jpg
tags: JavaScript, jQuery, Dành cho người mới
excerpt: 'Năm nay đã là 2018, liệu jQuery có còn cần thiết trong các dự án front-end?'
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1520068065/jquery_fbntr4.jpg)

jQuery là một trong những framework được yêu thích và sử dụng bởi phần lớn lập trình viên front-end. jQuery cung cấp hàm và phương thức giúp đơn giản hóa tác vụ thường gặp trong quá trình viết web. Giờ đây, khi các trình duyệt ngày càng được phát triển và hỗ trợ nhiều tính năng hơn, chúng ta có thể thay thế những tác vụ của jQuery bằng các phương thức mặc định.

Điều này đem đến nhiều lợi ích như:

- Không phụ thuộc vào jQuery, đồng thời người dùng không cần phải download thêm thư viện
- Được trình duyệt tối ưu, có khả năng tăng hiệu suất (dù chỉ là chút xíu)
- Về mặt lâu dài, sử dụng phương thức mặc định của trình duyệt đảm bảo tính tương thích trong ứng dụng, đặc biệt hữu ích phải bảo trì những ứng dụng cũ.

Chính vì thế, Ehkoo sẽ giới thiệu cho các bạn một số cách thay thế jQuery bằng JavaScript thuần, hay còn gọi là _"vanilla JS"_.

### Kiểm tra khi trang được tải xong

Một trang web không thể thao tác an toàn trừ khi document đã sẵn sàng (ready): các tập tin JS, CSS hay hình ảnh được tải hết, cấu trúc DOM được xây dựng xong. Chính vì vậy, các lập trình viên được khuyến khích đặt toàn bộ code bên trong hàm `$(document).ready()`:

```javascript
$(document).ready(function () {
  console.log('Ready')
})

// hoặc
$(function () {
  console.log('Ready')
})
```

Với vanilla JS, bạn có thể dùng `window.onload`.

```js
window.onload = function () {
  console.log('Ready!')
}
```

Điểm khác biệt giữa `window.onload` và sự kiện `DOMContentLoaded` là `DOMContentLoaded` không chờ đợi các tài nguyên khác như JS, CSS hay hình ảnh được tải, mà sự kiện này được kích hoạt ngay khi cấu trúc DOM được xây dựng xong.

Xem thêm về `onload` ở [MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).

Hoặc bạn cũng có thể dùng thư viện [`domready`](https://github.com/ded/domready).

### Chọn elements

jQuery giúp chúng ta chọn các element trong cây DOM rất dễ dàng

```js
// Chọn bằng ID
$('#myElement')

// Chọn bằng CSS class
$('.myElement')

// Chọn bằng tên thẻ
$('div')

// Phức tạp hơn
$('article#first p.summary')
```

Với vanilla JS, bạn có thể dùng những phương thức sau, hỗ trợ bởi tất cả trình duyệt kể cả IE8+:

```js
// Chọn bằng ID
document.getElementById('myElement')
document.querySelector('#myElement')

// Chọn bằng CSS class
document.getElementsByClassName('myElement')
document.querySelectorAll('.myElement')

// By tag name
document.getElementsByTagName('div')
document.querySelectorAll('div')

// Phức tạp hơn
document.querySelectorAll('article#first p.summary')
```

Bạn cần lưu ý sự khác nhau giữa `document.querySelector()` và `document.querySelectorAll()`. `querySelectorAll()` sẽ trả về một danh sách `NodeList` các element phù hợp với điều kiện tìm kiếm, trong khi `querySelector` chỉ trả về một element duy nhất. Do đó, `document.querySelector('div')` sẽ trả về thẻ DIV đầu tiên được tìm thấy, chứ không phải tất cả thẻ DIV trong trang.

### Lắng nghe sự kiện

Xử lý sự kiện là một phần rất quan trọng trong JavaScript, và với jQuery bạn có thể lắng nghe sự kiện bằng phương thức `.on`.

```js
$(someElement).on('click', function (e) {
  // TODO event handler logic
})
```

Với vanilla JS, chúng ta phải dùng phương thức `addEventListener` dài dòng hơn.

```js
someElement.addEventListener('click', function (e) {
  // TODO event handler logic
})
```

Nếu bạn muốn sự kiện chỉ được xử lý một lần, giống như phương thức `.one()` của jQuery.

```js
someElement.addEventListener(
  'click',
  function (e) {
    // TODO event handler logic
  },
  { once: true },
)
```

### Promise

Bản thân jQuery có đính kèm một lớp Deferred, giúp bạn thực hiện các thao tác bất đồng bộ mà không phải lâm vào callback-hell.

```js
function getDataFromApi() {
  const defer = $.Deferred()
  MyApiService.call({
    onSuccess(result) {
      defer.resolve(result)
    },
    onError(err) {
      defer.reject(err)
    },
  })

  return defer.promise()
}
```

Mặc dù trông có vẻ giống Promise, nhưng Deferred có nhiều phương thức hỗ trợ hơn, chẳng hạn như `.always()`, `.pipe()`, `progress()`...

Với vanilla JS, hầu hết các trình duyệt đều đã hỗ trợ Promise theo mặc định.

```js
function getDataFromApi() {
  return new Promise((resolve, reject) => {
    MyApiService.call({
      onSuccess: resolve,
      onError: reject,
    })
  })
}
```

### Gửi AJAX requests

Hầu hết các bạn cũng đều biết, AJAX giúp chúng ta tương tác với server một cách bất đồng bộ. jQuery hỗ trợ gửi AJAX requests bằng `$.ajax()` cùng với với các phương thức hỗ trợ như `.get()` hay `.post()`.

```js
$.get('ajax/test.html', function (data) {
  $('.result').html(data)
  alert('Load was performed.')
})
```

Với vanilla JS, bạn có thể dùng API mới: `fetch`

```js
fetch('ajax/test.html')
  .then(function (data) {
    $('.result').html(data)
    alert('Load was performed.')
  })
  .catch(function (err) {
    console.error(err)
  })
```

Xem thêm về [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### Thao tác trên thuộc tính `class` của một element

jQuery có các phương thức `addClass()`, `hasClass()`, `removeClass()` và `toggleClass()` để thao tác trên thuộc tính `class` của một element.

```js
const $foo = $('#foo')
$foo.addClass('bold')
$foo.hasClass('bold') // true
$foo.toggleClass('bold') // $foo.hasClass('bold') === false
$foo.removeClass('bold')
```

Không cần jQuery, chúng ta vẫn có thể làm điều này dễ dàng với thuộc tính `classList` của element.

```js
// <div id="foo" class="text"></div>

const foo = document.getElementById('foo')
foo.classList.add('bold', 'italic') // class="text bold italic"
foo.classList.contains('bold') // true
foo.classList.toggle('bold') // class="text italic"
foo.classList.replace('text', 'new-text') // class="new-text italic"
foo.classList.remove('new-text') // class="italic"
```

Xem thêm về [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).

### Animation

jQuery hỗ trợ các hiệu ứng `fadeIn/fadeOut/slideUp/slideDown`... theo mặc định.

```js
$(el).fadeIn()
```

Với sự hỗ trợ của CSS animation, chúng ta có thể đạt được hiệu quả tương tự.

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation: fadeIn ease-in 1s;
}
```

```js
document.getElementById('el').classList.add('fadeIn')
```

Bạn cũng có thể dùng sẵn thư viện [animate.css](https://daneden.github.io/animate.css/), cung cấp sẵn các hiệu ứng thông dụng như fading, sliding, bouncing...

Đối với các hiệu ứng animation phức tạp khác, bạn có thể dùng [velocity.js](http://velocityjs.org/), [anime.js](http://animejs.com/), [Popmotion](https://popmotion.io/) hay [GreenSock](https://greensock.com/). Các thư viện này hứa hẹn đem đến hiệu suất tốt hơn cho `$.animate()`.

### Ẩn/hiện elements

Ẩn/hiện elements là một trong những tác vụ phổ biến, và jQuery làm điều này trong vòng một nốt nhạc:

```js
// Hiding element
$(el).hide()

// Showing element
$(el).show()
```

Với Javascript, điều này cũng chẳng khó khăn hơn là bao:

```js
// Hiding element
el.style.display = 'none'

// Showing element
el.style.display = 'block'
```

### Thao tác với DOM

Thao tác với DOM rất dễ dàng khi sử dụng jQuery. Ví dụ khi bạn muốn chèn thêm một phần tử `<p>` vào `#container`:

```js
$('#container').append('<p>more content</p>')
```

Vanilla JS cũng có thể làm điều này một cách dễ dàng:

```js
document.getElementById('container').innerHTML += '<p>more content</p>'
```

Tuy nhiên bạn cũng có thể nhận thấy cách làm trên hoàn toàn không ổn về lâu dài, vì bất tiện và khó bảo trì. Cách tốt hơn là sử dụng một thư viện virtual DOM nhỏ gọn, chẳng hạn như [redom](https://redom.js.org/), [ultradom](https://github.com/jorgebucaran/ultradom) hay [preact](https://preactjs.com/).

### Kết luận

Bạn có nên từ bỏ jQuery không? Câu trả lời là... hên xui. Nếu dự án của bạn đang dùng một thư viện ngoài phụ thuộc vào jQuery, chẳng hạn như FancyBox, và việc thay đổi có thể đòi hỏi nhiều thời gian để hoàn thành, thì câu trả lời là không nên. Nhưng nếu bạn chọn một thư viện mới thì nên ưu tiên những giải pháp không cần jQuery.

Tặng bạn một mẩu truyện vui "lụm trên mạng".

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1528048468/zq4bm9kdplg01_qspcbr_rq4c4e.jpg)
_- Coi gì đó? Phim heo phải hông?_
_- Hông phải đâu má! Chỉ là..._
_- Hmm..._
