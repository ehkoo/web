---
layout: post.njk
title: ES2020 có gì hot?
slug: whats-new-in-javascript-es2020
date: 2019-10-19
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1571507839/cf0c7c0e69d51d97044a8431da9175e3_dkkaql.jpg
tags: JavaScript, ES2020, Dành cho người mới
excerpt: 2019 đang qua, 2020 sắp tới. Lại một phiên bản nữa của EcmaScript/ JavaScript sắp (hay đã) được các trình duyệt hỗ trợ. Cùng Ehkoo điểm qua những tính năng mới của ES2020 nhé.
author: kcjpop
draft: true
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1571507839/cf0c7c0e69d51d97044a8431da9175e3_dkkaql.jpg)

Bài viết này không có ý định liệt kê tất cả. Bạn có thể xem danh sách đầy đủ những tính năng tại trang [https://tc39.es](https://tc39.es)

Để tìm hiểu thêm về quy trình TC39, bạn có thể đọc [bài viết này](https://kipalog.com/posts/Tim-hieu-quy-trinh-TC39).

## Top-level `await`

## Nullish coalescing hay cú pháp `??`

Trong các trường hợp cần truy xuất thuộc tính của một đối tượng, chúng ta hay sử dụng `||` để gán giá trị mặc định cho một thuộc tính, nếu thuộc tính đó là `null` hoặc `undefined`.

```js
const response = {
  settings: {
    nullValue: null,
    height: 400,
    animationDuration: 0,
    headerText: '',
    showSplashScreen: false,
  },
}

// Kết quả: 'some other default'
const undefinedValue = response.settings.undefinedValue || 'some other default'

// Kết quả: 'some other default'
const nullValue = response.settings.nullValue || 'some other default'
```

Nhưng nếu xui trúng phải thuộc tính có giá trị falsy như `0`, `''` hay `false`, `||` sẽ không hoạt động như mong muốn.

```js
// Boolean('') === false --> 'Hello, world!'
const headerText = response.settings.headerText || 'Hello, world!'

// Boolean(0) === false --> 300
const animationDuration = response.settings.animationDuration || 300

// Boolean(false) === false --> true
const showSplashScreen = response.settings.showSplashScreen || true
```

Cú pháp `??` cho phép

```js
// Kết quả: 'some other default'
const undefinedValue = response.settings.undefinedValue ?? 'some other default'

// Kết quả: 'some other default'
const nullValue = response.settings.nullValue ?? 'some other default'

// Kết quả: ''
const headerText = response.settings.headerText ?? 'Hello, world!'

// Kết quả: 0
const animationDuration = response.settings.animationDuration ?? 300

// Kết quả: false
const showSplashScreen = response.settings.showSplashScreen ?? true
```

## Optional chaining

## `Promise.allSettled`

## Dynamic `import`

## Private properties

## Numeric separator

```js
const motTyHai = 1_200_000_000
const motTyHaiLeNam = 1_200_000_000.05
```

## `globalThis`

## BigInt
