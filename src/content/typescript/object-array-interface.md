---
title: 'Object, array, và interface'
date: 2023-05-08
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683546584/ehkoo/01.png
tags: TypeScript, Dành cho người mới
excerpt: 'Sử dụng interface để định nghĩa kiểu cho object hay array, đồng thời nghía qua khái niệm tuple ha.'
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683546584/ehkoo/01.png)

_Hình minh họa: [**Livre-Jeu Objectif Espace**](https://www.sounasdesign.com/portfolio/livre-jeu-objectif-espace-space-game-book-with-a-board/) của [**Elias Sounas**](https://www.sounasdesign.com)_

Trong bài viết trước chúng ta đã xem qua kiểu dữ liệu của các giá trị cơ bản như số `number`, chuỗi `string`, hay giá trị luận lý `boolean`. Bài viết này sẽ giới thiệu với bạn cách sử dụng chúng khi khai báo kiểu cho đối tượng (_object_) và mảng (_array_) nhe.

## Đối tượng chân phương (_literal objects_)

TS cho phép bạn khai báo kiểu cho các thuộc tính (_properties_) của một object, giúp bạn hình dung cấu trúc dữ liệu của đối tượng đó. Cú pháp cũng tương tự như khai báo object, chỉ khác là thay vì dùng `khóa: giá trị` chúng ta dùng `khóa: kiểu dữ liệu`.

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

user = {} // ❌
// Type '{}' is missing the following properties from type '{ id: string | number; username: string; }': id, username

user = null // ❌
// Type 'null' is not assignable to type '{ id: string | number; username: string; }'.

user = { id: 123, username: 'kcjpop', foo: 1 } // ❌
// Type '{ id: number; foo: number; }' is not assignable to type '{ id: string | number; username: string; }'.
//   Object literal may only specify known properties, and 'foo' does not exist in type '{ id: string | number; username: string; }'.
```

TS bắt buộc một object khi gán kiểu phải có đầy đủ các thuộc tính đã được khai báo, không hơn, không kém. Trong ví dụ cuối cùng, chúng ta thấy TS phàn nàn về thuộc tính `foo` không tồn tại.

Nếu object có một thuộc tính **không bắt buộc**, bạn có thể thêm `?` vào sau tên thuộc tính đó.

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

Bạn có thể thấy là khai báo kiểu cho object khá dài dòng, nếu phải lặp đi lặp lại thì thật là bất tiện. Chúng ta có thể dùng [**type alias**](/learn-typescript-together/basic-types#%C4%91%E1%BB%95i-t%C3%AAn-ki%E1%BB%83u-b%E1%BA%B1ng-type-alias) đã được giới thiệu trong bài trước:

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

Hoặc sử dụng **interface**.

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

Bạn có thể kế thừa một hay nhiều interface khác.

```ts
interface Animal {
  name: string
}

interface Walkable {
  // Khai báo một hàm `walk()`. Chúng ta sẽ nói thêm về hàm ở bài sau
  walk(): void
}

// Bear sẽ có các thuộc tính: `name`, `honey`, và `walk()`
interface Bear extends Walkable, Animal {
  honey: boolean
}

const pet: Bear = {
  name: 'Poo',
  honey: true,
  walk() {},
}
```

### `interface` vs `type`?

Interface và type alias khá giống nhau khi bạn cần khai báo kiểu cho object. Trong hầu hết các trường hợp bạn có thể dùng cách nào cũng được, nhưng trong các dự án thực tế thì mọi người chuộng `interface` hơn.

Những điểm khác nhau:

- Bạn không thể dùng `interface` để đặt lại tên cho các kiểu dữ liệu khác

- `interface` sẽ kết hợp các thuộc tính của các interface trùng tên, nhưng `type` sẽ báo lỗi. Ví dụ:

```ts
interface Bear {
  name: string
}

// ✅ OK. Bear sẽ có hai thuộc tính `name` và `honey`
interface Bear {
  honey: boolean
}

type Bear = { name: string }

// ❌ Error: Duplicate identifier 'Bear'.
type Bear = { honey: boolean }
```

> 🚨 **Just because you can doesn't mean you should**
>
> Tính năng kết hợp thuộc tính của các interface trùng tên làm cho code bị phân mảnh, và khó theo dõi nên bạn không nên lạm dụng nhé.

## Ngoài lề: Mở rộng type với phép giao `&`

Ở trên chúng ta đã nhắc đến từ khóa `extends` khi bạn cần mở rộng một `interface`. Với `type`, chúng ta dùng phép tính `&` để mở rộng một type mới từ các types đã có.

```ts
type Animal = {
  name: string
}

type Walkable = {
  walk(): void
}

type Bear = Walkable &
  Animal & {
    honey: boolean
  }

const pet: Bear = {
  name: 'Poo',
  honey: true,
  walk() {},
} // ✅ OK.
```

TS gọi đây là kiểu giao (_intersection types_).

Lưu ý là khi giao nhau mà xuất hiện các thuộc tính có kiểu dữ liệu không tương thích, `type` sẽ không báo gì…

```ts
type User = { id: string }
type Member = User & { id: number; name: string }
// Không có thông báo gì hết cho đến khi…

const joe: Member = { id: 1 } // ❌ Error
// Type 'number' is not assignable to type 'never'.
```

Trong khi đó với interface:

```ts
interface User {
  id: string
}

interface Member extends User {
  id: number
} // ❌ Error
// Interface 'Member' incorrectly extends interface 'User'.
//   Types of property 'id' are incompatible.
//     Type 'number' is not assignable to type 'string'.
```

## Mảng

Đối với mảng, bạn dùng cú pháp `kiểu[]` (thường gặp nhất) hoặc `Array<kiểu>`:

```ts
const evens: number[] = [0, 2, 4, 6, 8]
const seasons: Array<string> = ['xuân', 'hạ', 'thu', 'đông', 'rồi lại xuân']
const xs: boolean[] = [true, false, true, false]

// Khai báo hàm nhận vào một mảng chuỗi
function joinWithComma(arr: string[]) {
  return arr.join(', ')
}
```

Với cú pháp này, các phần tử trong mảng có cùng một kiểu. TS sẽ báo lỗi nếu bạn thêm vào một giá trị không đúng với kiểu dữ liệu đã khai báo.

```ts
const a: string[] = ['foo', 'bar']

a.push(123) // ❌ Error
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Bạn cũng có thể dùng kiểu tập hợp để khai báo một mảng mà các phần tử thuộc nhiều kiểu dữ liệu khác nhau.

```ts
const a: (string | number)[] = [1, 'foo', 5, 6, 'bar']

a.push(42) // ✅ OK
a.push('42') // ✅ OK
a.push(true) // ❌ Error
// Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
```

Dĩ nhiên chúng ta cũng có thể dùng type alias hay interface với mảng.

```ts
type UserId = number | string

interface User {
  id: UserId
  name: string
}

const users: User[] = [
  { id: 1, name: 'kcjpop' },
  { id: 'abc123', name: 'popjck' },
]
```

## Tuple

TS cũng có khái niệm _**tuple**_, là những mảng có chiều dài nhất định. Thường gặp nhất là mảng có 2 phần tử, hay còn gọi là _**pair**_, 3 phần tử thì gọi là _**triple**_, 4 phần tử thì gọi là _**quadruple**_. Từ 5 trở lên thì thôi bạn [đọc thêm trên Wikipedia](https://en.wikipedia.org/wiki/Tuple#Names_for_tuples_of_specific_lengths) cho nhanh 😮‍💨

Các phần tử trong tuple không nhất thiết phải có cùng một kiểu dữ liệu. So với kiểu tập hợp, tuple quy định rõ ràng hơn kiểu của phần tử ở từng vị trí nhất định.

```ts
const pair: [string, number] = ['kcjpop', 123]

const [name, id] = pair
// const name: string
// const id: number

pair[4] // ❌ Error
// Tuple type '[string, number]' of length '2' has no element at index '4'.
```

Trong ví dụ trên, TS sẽ báo lỗi khi chúng ta truy xuất vào phần tử thứ 4 vì một pair chỉ có hai phần tử.

Cũng giống như object, mảng trong JS không có tính bất biến nên bạn vẫn có thể đẩy thêm phần tử mới vào mặc dù đã khai báo là pair.

```ts
const pair: [string, number] = ['kcjpop', 123]

pair.push(456) // ✅ OK
pair.push('hello') // ✅ OK
pair.push(false) // ❌ Error
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
```

Chúng ta có thể dùng từ khóa `readonly` để không cho phép thay đổi tuple. Lưu ý là `readonly` chỉ có ý nghĩa khi kiểm tra kiểu dữ liệu (_type checking_) mà thôi.

```ts
const pair: readonly [string, number] = ['kcjpop', 123]

pair.push(1) // ❌ Error
// Property 'push' does not exist on type 'readonly [string, number]'.
```

## Tạm kết

Trong bài viết sau, chúng ta sẽ đi sâu hơn về cách khai báo kiểu khi làm việc với hàm trong TypeScript nha mọi người.
