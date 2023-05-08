---
title: 'Kiểu của hàm'
date: 2022-02-10
cover: https://www.sounasdesign.com/wp-content/uploads/2021/08/AstronautGame_ObjectifEspace03_sounas.png
tags: TypeScript, Dành cho người mới
excerpt: 'Trong phần đầu tiên của series này, chúng ta hãy tìm hiểu về các kiểu dữ liệu căn bản trong TypeScript (TS) với Ehkoo nhe.'
author: kcjpop
draft: true
---

Đối với các hàm không trả về kết quả nào, bạn có thể dùng `void`.

```ts
// Thật ra hàm này trả về `undefined` đó
function printGreeting(name: string): void {
  console.log(`Hello ${name}`)
}
```

Và `never` dành cho hàm không bao giờ trả về kết quả.

```ts
function doSomething(message: string): never {
  throw new Error(message)
}
```

> 💡 **Tự suy kiểu dữ liệu**
>
> Trong những trường hợp quá rõ ràng, TS có thể tự suy luận (infer) kiểu dữ liệu của biến nên bạn có thể không cần
> mô tả kiểu dữ liệu. Làm như vậy phần nào giúp chương trình dễ đọc hơn.
>
> ```ts
> const n = 42 // → number
>
> // TS thừa thông minh để biết hàm trả về kiểu string
> function getGreeting(name: string) {
>   return `Hello ${name.toUpperCase()}`
> }
> ```
