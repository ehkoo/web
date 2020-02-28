---
layout: post.njk
title: ES2020 có gì hot?
slug: whats-new-in-javascript-es2020
date: 2020-02-28
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1571507839/cf0c7c0e69d51d97044a8431da9175e3_dkkaql.jpg
tags: JavaScript, ES2020, Dành cho người mới
excerpt: 2020 đã ập vào mặt, và lại một phiên bản nữa của EcmaScript/ JavaScript sắp (hay đã) được các trình duyệt hỗ trợ. Cùng Ehkoo điểm qua những tính năng mới của ES2020 nhé.
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1571507839/cf0c7c0e69d51d97044a8431da9175e3_dkkaql.jpg)

Bài viết này chỉ mang tính chất chỉ mặt điểm danh những điểm đáng lưu ý của ES2020. Để xem danh sách chi tiết, bạn hãy nhảy ngay đến trang [https://tc39.es](https://tc39.es). Nếu chưa quen thuộc với quy trình TC39, đừng ngại ngùng và hãy đọc ngay [bài viết này](https://kipalog.com/posts/Tim-hieu-quy-trinh-TC39) của anh Dong Nguyen.

## Nullish coalescing

Đầu tiên phải nhắc đến nullish coalescing hay toán tử `??`. Theo định nghĩa của [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator), `??` là một toán tử logic sẽ trả về vế phải nếu vế trái là `null` hoặc `undefined`. Do đó bạn có thể dùng nó để short-circuit như thế này.

```js
function a() {
  return null
}
function b() {
  return 1
}
function c() {
  return 2
}

console.log(a() ?? c()) // 2
console.log(b() ?? c()) // 1
```

Có lẽ trường hợp sử dụng thường gặp nhất là khi cần khai báo biến là thuộc tính của một đối tượng. Để đề phòng thuộc tính đó không tồn tại (trả về `undefined`) hoặc có giá trị `null`, chúng ta hay sử dụng `||` để gán một giá trị mặc định.

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

// Kết quả: 'for undefined'
const undefinedValue = response.settings.undefinedValue || 'for undefined'

// Kết quả: 'for null'
const nullValue = response.settings.nullValue || 'for null'
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

Toán tử `??` được đề xuất để giải quyết vấn đề này. Bạn cũng có thể đoán `??` hoạt động tương tự như `||`, nhưng vẫn chạy đúng với các giá trị falsy.

```js
// Kết quả: 'for undefined'
const undefinedValue = response.settings.undefinedValue ?? 'for undefined'

// Kết quả: 'for null'
const nullValue = response.settings.nullValue ?? 'for null'

// Kết quả: ''
const headerText = response.settings.headerText ?? 'Hello, world!'

// Kết quả: 0
const animationDuration = response.settings.animationDuration ?? 300

// Kết quả: false
const showSplashScreen = response.settings.showSplashScreen ?? true
```

**Bất ngờ thay**

Xem thử đoạn mã sau sử dụng phân rã biến (object destructuring).

```js
const {
  underfinedValue = 'for undefined',
  nullValue = 'for null',
  headerText = 'Hello, world',
} = response.settings

console.log(underfinedValue) // 'for undefined'
console.log(nullValue) // null
console.log(headerText) // ''
```

Có thể thấy là chỉ khi thuộc tính có giá trị `undefined` thì giá trị mặc định mới được sử dụng. Ngoài ra `null` và các giá trị falsy vẫn được gán chính xác.

## Optional chaining

Chuyện gì sẽ xảy ra với đoạn mã sau?

```js
const station = {
  id: 123,
  name: 'EVN Q7 Station',
  type: { id: 1, vendor: 'EhkooEV', model: null },
}

console.log(station.type.model.id) // Error: can't access property "id", station.type.model is null
console.log(station.foo.bar) // Error: can't access property "bar", station.foo is undefined
```

Có lẽ đây là một trong những lỗi thường gặp nhất khi làm việc với JavaScript :( Nhưng không sao, đã có cú pháp `?.` để giải quyết vấn đề. `?.` cho phép bạn truy xuất sâu vào thuộc tính của các đối tượng lồng nhau, và lỡ như trên đường đời tấp nập, ta vô tình vấp phải một giá trị `null` hay `undefined` thì cũng không có lỗi xảy ra.

```js
console.log(station?.foo?.bar) // undefined
console.log(station.type.model?.id) // undefined
```

`?.` còn có thể dùng để kiểm tra một phương thức có tồn tại hay không trước khi gọi.

```js
const station = {
  id: 123,
  name: 'EVN Q7 Station',
}

console.log(station.getName?.()) // undefined

// Hoặc thử đi sâu hơn
console.log(station?.model?.getModelName?.()) // undefined

// Nhưng bạn phải cẩn thận nhe, nếu gọi trúng thuộc tính có tồn tại nhưng không phải là function
console.log(station?.name?.()) // Error: station.name is not a function
```

`?.` cũng hoạt động tốt khi truy xuất phần tử của mảng.

```js
const arr = [1, 2, 3, 4, 5]
console.log(arr[999]?.[888]) // undefined

// Thử gọi hàm
console.log(arr[999]?.[888]?.()) // undefined
```

## `Promise.allSettled`

Chắc bạn đã biết về hàm `Promise.all(promises)` nhận vào một mảng các promises và trả về kết quả của các promises đó, sau khi chúng được resolved/ fulfilled (chạy thành công). Trong quá trình thực thi `Promise.all()`, nếu một trong số các promises bị rejected thì `Promise.all()` cũng sẽ bị rejected. Tương tự như vậy, `Promise.allSettled(promises)` cũng nhận vào một mảng các promises, nhưng nó sẽ chờ _bất đồng bộ_ cho tất cả các promises được thực thi hết, không quan tâm resolved/ rejected. Sau đó, `Promise.allSettled()` sẽ trả về một mảng kết quả. Mỗi phần tử của mảng sẽ có thuộc tính sau:

- Nếu promise được resolved: `{ status: 'fulfilled', value: <kết quả trả về của promise> }`
- Nếu promise bị rejected: `{ status: 'rejected', reason: <vì sao promise bị rejected> }`

Ví dụ:

```js
const p1 = Promise.resolve(122)
const p2 = Promise.reject(new Error('Me do not like this'))
const p3 = Promise.resolve('foo')

Promise.allSettled([p1, p2, p3]).then(results => console.log(results))
/*
Kết quả là:
[
  {
    "status": "fulfilled",
    "value": 122
  },
  {
    "status": "rejected",
    "reason": Error("Me do not like this")
  },
  {
    "status": "fulfilled",
    "value": "foo"
  }
]
*/
```

## Dynamic `import`

Bạn đã biết đến dùng `import` trong ES6 để...à um...import một module.

```js
import fs from 'fs'
import React from 'react'
```

Cách dùng `import` như thế này được gọi là static `import`, và nó cho phép các công cụ đóng gói (build tools) như webpack hay rollup phân tích và tối ưu kết quả sau cùng, chẳng hạn như thực hiện rung cây (tree-shaking). Điểm hạn chế của static `import` là bạn bắt buộc phải khai báo `import` ở đầu module, và không thể import module dựa theo một điều kiện nào đó.

Dynamic `import`, như cái tên gợi ý, cho phép bạn sử dụng module một cách linh động hơn. Cú pháp:

```js
// my/module.js
export function sayOhYeah() {
  console.log('Oh yeah!')
}

export default function() {
  return 1
}

// index.js
import('/my/module').then(module => {
  module.sayOhYeah() // 'Oh yeah!'
  module.default() // 1
})
```

Bạn có thể thấy `import()` trả về một promise. Do đó bạn có thể dùng `async/await` để nhìn gọn gàng đẹp đẽ hơn.

```js
// index.js
const module = await import('/my/module')
module.sayOhYeah() // 'Oh yeah!'
module.default() // 1
```

Lưu ý là mặc dù `import()` nhìn như một lời gọi hàm, nhưng bản thân `import` không phải là một hàm đâu nha. Do đó nó không thừa kế từ `Function.prototype`, nên bạn cũng không thể `.call()` hay `.apply()`. Bạn cũng không thể `const myImport = import` được mô.

Một trong những lợi ích dễ thấy nhất của dynamic `import` là nó cho phép bạn lazy-loading: chỉ tải các module khi cần thiết. Điều này đặc biệt hữu ích cho các tính năng như bản địa hóa (i18n), khi bạn chỉ cần load tập tin ngôn ngữ trong trường hợp người dùng thay đổi lựa chọn. Hoặc trong các SPA, bạn có thể lazy-load các components dựa vào route.

## Top-level `await`

Giả sử bạn có một module như thế này.

```js
// module.js
import fetchUser from 'states/fetchUser'

// Bạn không thể
const user = await fetchUser() // SyntaxError: await is only valid in async function
console.log(user)

// Mà thay vào đó:
async function run() {
  const user = await fetchUser()
  console.log(user)
}
run()
```

Với top-level `await`, bạn có thể xem module như một async function thật bự và sử dụng từ khóa `await` thoải mái.

```js
// module.js
import fetchUser from 'states/fetchUser'

// Với top-level await, đoạn mã sau sẽ không sinh ra lỗi
const user = await fetchUser()
console.log(user)
```

Kết hợp với dynamic `import` ở trên, code của bạn có thể gọn gàng hơn như thế này.

```js
import getUserPreferences from 'states/getUserPreferences'

const pref = await getUserPreferences()
const lang = await import(`lang/${pref.language}`)
console.log(lang)
```

Lưu ý là bạn không thể dùng `await` trong các function không phải async đâu nhe.

```js
function foo() {
  const a = await bar() // 💥
}
```

**Đọc thêm:** [Top level await](https://v8.dev/features/top-level-await) trên blog của V8.

## Dấu phân cách số

Tính năng này cho phép bạn đặt dấu phân cách phần ngàn khi khai báo số lớn, giống như thế này.

```js
const motTyHai = 1_200_000_000
const motTyHaiLeNam = 1_200_000_000.05
```

## `globalThis`

Trước khi có `globalThis` thì để xác định biến global ở các môi trường khác nhau (node/ service worker/ trình duyệt), bạn phải kiểm tra như thế này:

```js
var getGlobal = function() {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}
```

Sử dụng `globalThis` sẽ giải quyết vấn đề trên. Đọc thêm: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

## Kết

Hết rồi đó.
