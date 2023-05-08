---
title: 'Object, array, và interface'
date: 2023-05-08
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683546584/ehkoo/01.png
tags: TypeScript, Dành cho người mới
excerpt: 'Sử dụng interface để định nghĩa kiểu cho object, array, hay tuple.'
author: kcjpop
---

### Mảng và tuple

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

TS cũng có khái niệm _tuple_, cho phép mảng chứa các phần tử có các kiểu dữ liệu khác nhau. Thường gặp nhất là mảng có 2 phần tử, hay còn gọi là _pair_. Tuple có 3 phần tử thì gọi là _triple_, 4 phần tử thì gọi là _quadruple_. 5 trở lên thì thôi bạn [đọc thêm ở đây](https://en.wikipedia.org/wiki/Tuple#Names_for_tuples_of_specific_lengths) cho nhanh.

Với tuple thì bạn có thể thêm vào giá trị thuộc về một trong các kiểu dữ liệu đã mô tả.

```ts
const pair: [string, number] = ['kcjpop', 123]
pair.push('popjck') // ✅ OK
pair.push(321) // ✅ OK

// Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
pair.push(false)
```

> ❓ **`string | number` là cái gì vậy?**
>
> Trả lời nhanh: là kiểu union đó. Bạn sẽ biết về union ngay trong phần dưới của bài viết này.

### object

Bên cạnh các kiểu giá trị phổ thông, chúng ta cũng rất hay làm việc với object. Bạn có thể mô tả kiểu cho thuộc tính của object như sau:

```ts
// Bạn cũng có thể dùng , để ngăn cách các thuộc tính, mặc dù ; phổ biến hơn.
// { id: number, username: string }
function printUser(user: { id: number; username: string }) {
  console.log(`Hello ${user.username}`)
}
```

Nếu object có một thuộc tính không bắt buộc, bạn có thể thêm `?` vào sau tên thuộc tính đó.

```ts
function printUser(user: { id: number; username: string; role?: string }) {
  // Khi bạn truy xuất một thuộc tính không tồn tại, JavaScript sẽ trả về undefined.
  if (role !== undefined) {
    console.log(`Hello ${user.username} of role ${user.role}`)
  } else {
    console.log(`Hello ${user.username}`)
  }
}
```

### Type alias

TS cho phép bạn đặt lại tên cho các kiểu dữ liệu bằng từ khóa `type`.

```ts
// Đặt một kiểu Username là tên gọi khác của kiểu string
type Username = string

// Đặt một union type có tên là UserId
type UserId = string | number

// Đặt ứng dụng
// Bạn không cần dùng ; hay , nếu mỗi thuộc tính nằm ở một dòng riêng
type User = {
  id: UserId
  name: Username
  role?: string
}

function printUser(user: User) {
  console.log(`Hello ${user.name}`)
}
```

Sử dụng type alias giúp giảm trùng lặp và cho phép tái sử dụng các kiểu dữ liệu một cách thống nhất trong toàn bộ ứng dụng. `type` còn có các thao tác khác mà chúng ta sẽ tìm hiểu ở các bài viết sau.

### Interface

Interface là một cách khác để khai báo kiểu cho các object.

```ts
interface User = {
  id: string | number
  name: string
  role?: string
}

function printUser(user: User) {
  console.log(`Hello ${user.name}`)
}
```

So với type alias ở trên, `interface` cho phép bạn kế thừa một interface khác.

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
