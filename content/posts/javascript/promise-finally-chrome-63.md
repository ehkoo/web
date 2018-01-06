---
layout: post.njk
title: Promise.prototype.finally được giới thiệu từ Google Chrome 63
slug: promise-finally-duoc-gioi-thieu-tu-google-chrome-63
date: 2017-10-26
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,w_1280/v1516117926/587672-636407233820760106-16x9_zrku2f.jpg
tags: JavaScript, Promise, GoogleChrome
excerpt: Từ phiên bản 63 trở đi, Promise hỗ trợ phương thức `finally()` giúp thực hiện tác vụ trong cả hai trường hợp `fulfilled` và `rejected`.
author: kcjpop
---
Theo tin từ trang [Google Developers](https://developers.google.com/web/updates/2017/10/promise-finally),  `Promise.prototype.finally` sẽ được hỗ trợ mặc định từ phiên bản V8 v6.3.165+ và Chrome 63+. Phương thức này rất hữu dụng trong trường hợp lập trình viên cần thực thi một tác vụ nào đó trong cả hai trường hợp `fulfilled` hoặc `rejected`.

Một ví dụ rất thường gặp là hiển thị biểu tượng quay (loading icon) khi đang lấy dữ liệu từ server bằng AJAX. Khi dữ liệu được lấy thành công, bạn muốn ẩn biểu tượng quay và hiển thị nội dung. Trong trường hợp xảy ra lỗi, bạn cũng muốn ẩn biểu tượng quay và hiển thị thông báo lỗi.

```javascript
const fetchAndDisplay = ({ url, element }) => {
  showLoadingSpinner()

  fetch(url)
    .then(response => response.text())
    .then(text => {
      element.textContent = text
      hideLoadingSpinner()
    })
    .catch(error => {
      element.textContent = error.message
      hideLoadingSpinner()
    })
}
```

Như bạn có thể thấy, hàm `hideLoadingSpinner()` bị trùng lắp trong cả hai trường hợp `fulfilled` và `rejected`. `finally()` có thể giúp giải quyết trường hợp này.

```javascript
const fetchAndDisplay = ({ url, element }) => {
  showLoadingSpinner()

  fetch(url)
    .then(response => response.text())
    .then(text => {
      element.textContent = text
    })
    .catch(error => {
      element.textContent = error.message
    })
    .finally(hideLoadingSpinner)
}
```

Bằng cách sử dụng `finally()` bạn có thể tách biệt phần mã xử lý trường hợp thành công/ lỗi với các tác vụ dọn dẹp. Điều này giúp mã nguồn của bạn gọn gàng hơn.

Bạn cũng có thể làm tương tự với `async/await`.

```javascript
const fetchAndDisplay = async ({ url, element }) => {
  showLoadingSpinner()
  try {
    const response = await fetch(url)
    const text = await response.text()
    element.textContent = text
  } catch (error) {
    element.textContent = error.message
  } finally {
    hideLoadingSpinner()
  }
}
```
