---
title: 'Object, array, và interface'
date: 2023-05-08
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683546584/ehkoo/01.png
tags: TypeScript, Dành cho người mới
excerpt: 'Sử dụng interface để định nghĩa kiểu cho object, array, hay tuple.'
author: kcjpop
draft: true
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683546584/ehkoo/01.png)

_Hình minh họa: [**Livre-Jeu Objectif Espace**](https://www.sounasdesign.com/portfolio/livre-jeu-objectif-espace-space-game-book-with-a-board/) của [**Elias Sounas**](https://www.sounasdesign.com)_

Trong bài viết trước chúng ta đã xem qua kiểu dữ liệu của các giá trị cơ bản như số `number`, chuỗi `string`, hay giá trị luận lý `boolean`. Hãy xem cách sử dụng chúng khi khai báo kiểu cho đối tượng (_object_), mảng (_array_), hay lớp (_class_).

## Đối tượng chân phương (_literal objects_)

TS cho phép bạn khai báo kiểu cho các thuộc tính (_properties_) của một object, giúp bạn hình dung cấu trúc dữ liệu của đối tượng đó. Cú pháp thì cũng tương tự, chỉ khác là thay vì `khóa - giá trị` chúng ta dùng `khóa - kiểu dữ liệu`.

```ts
let user: {
  id: string | number
  username: string
}
```

Ví dụ ở trên khai báo một đối tượng `user` có hai thuộc tính:

- `id` có kiểu union, hoặc là `string`, hoặc là `number`
- `username` là kiểu `string`

```ts
user = { id: 123, username: 'kcjpop' } // ✅ OK
user = { id: '933b-df4ce7725dbc', username: 'popjck' } // ✅ OK

user = {}
// ❌
// Type '{}' is missing the following properties from type '{ id: string | number; username: string; }': id, username

user = null
// ❌
// Type 'null' is not assignable to type '{ id: string | number; username: string; }'.

user = { id: 456, foo: 1 }
// ❌
// Type '{ id: number; foo: number; }' is not assignable to type '{ id: string | number; username: string; }'.
//   Object literal may only specify known properties, and 'foo' does not exist in type '{ id: string | number; username: string; }'.
```

Trong ví dụ cuối cùng ở trên, chúng ta thấy TS phàn nàn về thuộc tính `foo` không tồn tại trong kiểu được khai báo từ trước.

Nếu object có một thuộc tính không bắt buộc, bạn có thể thêm `?` vào sau tên thuộc tính đó.

```ts
let user: {
  id: string | number
  username: string
  age?: number
}

user = { id: 123, username: 'kcjpop' } // ✅ OK
user = { id: 123, username: 'kcjpop', age: 40 } // ✅ OK
```

Chúng ta cũng có thể khai báo kiểu object cho tham số của hàm. Bạn có thể dùng dấu phẩy `,` để phân cách giữa các thuộc tính, mặc dù dấu chấm phẩy `;` phổ biến hơn.

```ts
function printUser(user: { id: string | number; username: string; age?: number }) {
  // Khi bạn truy xuất một thuộc tính không tồn tại, JavaScript sẽ trả về undefined.
  if (user.age !== undefined) {
    console.log(`Hello ${user.username}, age: ${user.age}`)
  } else {
    console.log(`Hello ${user.username}`)
  }
}
```

## Interface

Bạn có thể thấy là khai báo kiểu cho object khá dài dòng, nếu phải lặp đi lặp lại thì thật là bất tiện.

```ts
type User = {
  id: string | number
  username: string
  age?: number
}

function printUser(user: User) {
  console.log(`Hello ${user.name}`)
}
```

Nhưng TS có một cách khác hay hơn cho trường hợp này. Đó là **interface**.

```ts
interface User = {
  id: string | number
  username: string
  age?: number
}

function printUser(user: User) {
  console.log(`Hello ${user.name}`)
}
```

So với type alias, `interface` cho phép bạn kế thừa một interface khác.

```ts
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const pet: Bear = { name: 'Poo', honey: true }
```

Ngoài ra bạn cũng có thể thêm thuộc tính cho một interface đã được khai báo từ trước.

```ts
interface Bear {
  name: string
}

// ✅ OK. Bear sẽ có hai thuộc tính `name` và `honey`
interface Bear {
  honey: boolean
}
```

So sánh với `type` thì…

```ts
type Bear = {
  name: string
}

// ❌ Error: Duplicate identifier 'Bear'.
type Bear = {
  honey: boolean
}
```

Trong hầu hết các trường hợp, bạn nên dùng `interface` để khai báo kiểu cho object nhe.

## Mảng và tuple

Đối với mảng, bạn dùng cú pháp `kiểu[]` (thông dụng hơn) hoặc `Array<kiểu>`:

```ts
const evens: number[] = [0, 2, 4, 6, 8]
const seasons: Array<string> = ['spring', 'summer', 'autumn', 'winter']
const xs: boolean[] = [true, false, true, false]

// Khai báo hàm nhận vào một mảng chuỗi
function joinWithComma(arr: string[]) {
  return arr.join(', ')
}
```

Với cú pháp này, các phần tử trong mảng có cùng một kiểu. TS sẽ báo lỗi nếu bạn thêm vào mảng một phần tử khác kiểu dữ liệu đã khai báo.

```ts
const a: string[] = ['foo', 'bar']
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
a.push(123)
```

TS cũng có khái niệm _tuple_, cho phép mảng chứa các phần tử có các kiểu dữ liệu khác nhau. Thường gặp nhất là mảng có 2 phần tử, hay còn gọi là _**pair**_. Tuple có 3 phần tử thì gọi là _**triple**_, 4 phần tử thì gọi là _**quadruple**_. 5 trở lên thì thôi bạn [đọc thêm ở đây](https://en.wikipedia.org/wiki/Tuple#Names_for_tuples_of_specific_lengths) cho nhanh 😮‍💨

Với tuple thì bạn có thể thêm vào giá trị thuộc về một trong các kiểu dữ liệu đã mô tả.

```ts
const pair: [string, number] = ['kcjpop', 123]
pair.push('popjck') // ✅ OK
pair.push(321) // ✅ OK

// Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
pair.push(false)
```
