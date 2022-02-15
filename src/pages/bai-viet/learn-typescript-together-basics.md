---
layout: ../../layouts/Post.astro
title: 'Cùng học TypeScript: Căn bản về TS'
date: 2022-02-10
cover: https://i.imgur.com/eOpH6MX.png
tags: TypeScript, Dành cho người mới
excerpt: 'Trong phần đầu tiên của series này, chúng ta hãy tìm hiểu về các kiểu dữ liệu căn bản trong TypeScript (TS) với Ehkoo nhe.'
author: kcjpop
---

![](https://i.imgur.com/eOpH6MX.png)

Năm nay đã là năm COVID thứ 2 mà bạn vẫn chưa biết TypeScript (giống mình 🥲) thì quả là một thiếu sót lớn. Như kiểu thời buổi này mang tiếng làm frontend developer mà không biết TS thì bị đồng nghiệp dè bỉu, sếp lớn cười chê, còn nhà tuyển dụng thì bỏ bê không ngó ngàng. Đau khổ lắm (đùa đấy).

Nhưng không sao, muộn còn hơn không. Đầu năm con hổ chúng ta hãy cùng xắn tay áo lên học TS nhe. Có thể sau này không ai xài nữa nhưng biết đâu được 🤷‍♂️.

## TypeScript là gì?

Cho những bạn chưa biết thì TypeScript là một ngôn ngữ lập trình được phát triển bởi Microsoft. Ý tưởng căn bản là dựa trên cú pháp của JavaScript, thêm vào hệ thống kiểu (_type system_) để chương trình (phần nào) chạy đúng hơn, thêm vào vài tính năng hay ho như lập trình tổng quát (_generics programming_) hay kiểu dữ liệu union, hỗ trợ tận răng trong VSCode hay các IDEs khác, và sau vài năm, thống trị cả thế giới 😈.

TypeScript được thiết kế sao cho dễ tích hợp vào chương trình JavaScript sẵn có nhất, nên bất cứ tập tin JS nào cũng là một tập tin TS hợp lệ, nhưng điều ngược lại không đúng nhe.

## Vì sao nên dùng TypeScript?

- **Giảm bug:** Vì TypeScript giúp bạn kiểm tra kiểu dữ liệu ngay từ mã nguồn, nó giúp giảm bớt những lỗi thông dụng như đưa vào hàm một giá trị chuỗi thay vì giá trị số, hay gọi đến một thuộc tính không tồn tại trong object. Lưu ý là TypeScript chỉ _giảm bớt_ chứ không hoàn toàn đảm bảo chương trình của bạn sẽ không bị lỗi ở runtime nhe.
- **Trải nghiệm tốt hơn cho lập trình viên:** Một chương trình được mô tả kiểu dữ liệu đầy đủ có thể giúp bạn có trải nghiệm tốt hơn, theo kiểu bạn biết cần đưa vào hàm tham số như thế nào, hay cấu trúc của một object sẽ ra sao. Bên cạnh đó, các chương trình soạn thảo/ IDEs cũng có thêm thông tin về chương trình, giúp bạn di chuyển giữa các hàm, biến, hay module nhanh hơn, đồng thời có thể gợi ý code cho bạn nữa.
- **Chạy được ở client và server:** Vì TypeScript biên dịch chương trình thành JavaScript nên chương trình của bạn có thể chạy thoải mái trên bất cứ trình duyệt nào. Về phía server, bạn có thể dùng [Deno](https://deno.land/) nếu không muốn mất thời gian biên dịch để chạy trên nodejs.
- **Dễ bắt đầu và áp dụng:** TypeScript căn bản cũng chỉ là JavaScript có thêm kiểu dữ liệu. Nguyên văn từ Microsoft: **_TypeScript is JavaScript’s runtime with a compile-time type checker_**. Do đó nếu bạn đã biết JS thì bắt đầu với TS rất dễ dàng. Ngoài ra việc giới thiệu TS vào chương trình JS đã có sẵn cũng tương đối đơn giản.
- **Documentation:** Sau khi mô tả thì kiểu dữ liệu trong TS cũng có thể xem như một phần của tài liệu phát triển.
- **Nâng cao kiến thức:** Bên cạnh những gì bạn đã biết về JS, TS cũng có những khái niệm mới như lập trình tổng quát, hay các thao tác với kiểu dữ liệu. Thông qua làm việc với chúng, bạn có thể tự nâng cao kiến thức của mình về lập trình nói chung.
- **Cộng đồng lớn:** Cái này thì không cần phải bàn. TS đang được sử dụng ở các công ty lớn như Microsoft (dĩ nhiên), Google, Airbnb, Uber, v.v. Ngoài ra TypeScript còn được dùng ở rất nhiều [dự án mã nguồn mở lớn](https://github.com/topics/typescript) như VSCode, Angular, Deno, Ant Design, Ionic, v.v.

## Cài đặt

Để cài đặt TypeScript vào dự án, bạn có thể dùng npm/ yarn/ pnpm.

```bash
npm install --save-dev typescript
```

Sau khi cài đặt chúng ta có thể sử dụng lệnh `tsc` ở terminal, hoặc bạn có thể dùng thẳng bằng `npx` luôn.

```bash
npx tsc example.ts
```

Trong thời gian học bạn cũng có thể chạy trực tiếp TS trên trình duyệt ở trang [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play).

Series này dựa vào quyển [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), và phần nào mặc định bạn đã có kiến thức căn bản về JavaScript rồi ha.

## Mô tả kiểu dữ liệu

Mô tả kiểu dữ liệu (_type annotation_) là cách chúng ta thông báo cho trình biên dịch TS biết giá trị của một biến thuộc kiểu dữ liệu nào. Có 3 kiểu dữ liệu hay gặp trong JavaScript:

- `boolean`: kiểu logic, chỉ có hai giá trị là `true` và `false`.
- `string`: kiểu chuỗi
- `number`: kiểu dữ liệu số, không phân biệt đó là số nguyên (int) hay thực (float). Theo đặc tả [ECMAScript](https://262.ecma-international.org/12.0/#sec-ecmascript-language-types-number-type) (mà JavaScript dựa vào) thì tất cả giá trị số đều là số thực dấu phẩy động có độ chính xác kép hết.

> 💡 **Ghi chú:**
>
> Thay vì dùng "kiểu dữ liệu" có phần dài dòng, từ đây về sau chúng ta sẽ gọi tắt là "kiểu" cho nhanh nhe.

Để mô tả kiểu dữ liệu khi khai báo biến, bạn dùng cú pháp `tên-biến: kiểu-dữ-liệu` như thế này:

```ts
const n: number = 42
const isMember: boolean = false
const username: string = 'kcjpop'
```

Chúng ta cũng có thể mô tả kiểu cho tham số hàm:

```ts
function say(name: string) {
  return `Hello ${name}`
}

say('kcjpop') // → Hello kcjpop
say(42) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Hoặc giá trị trả về của một hàm:

```ts
// Hàm trả về string
function getGreeting(name: string): string {
  return `Hello ${name}`
}

// Hàm trả về number
function double(x: number): number {
  return x + x
}
```

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

### enum

Kiểu `enum` (viết tắt của _enumeration_: kiểu liệt kê) cho phép bạn khai báo một tập hợp các biến không đổi (constant).

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// Sử dụng
console.log(Direct.Up)

// Hoặc
const userAction: Direction = Direction.Down

// Hoặc
function moveCharacter(d: Direction) {
  // Do something here
}
moveCharacter(Direction.Left)
```

enum giúp mô tả rõ ràng ý định của các constants, cũng như cho phép nhóm những constant liên quan lại với nhau.

Mặc định thì enum sẽ có giá trị số, bắt đầu từ 0. Nghĩa là với enum `Direction` ở trên:

```ts
console.log(Direction.Up) // 0
console.log(Direction.Down) // 1
console.log(Direction.Left) // 2
console.log(Direction.Right) // 3
```

Bạn cũng có thể thay đổi giá trị bắt đầu của giá trị trong enum.

```ts
enum Direction {
  Up = 1,
  Down,
  Left = 6,
  Right,
}

console.log(Direction.Up) // 1
console.log(Direction.Down) // 2
console.log(Direction.Left) // 6
console.log(Direction.Right) // 7
```

TS cũng cho phép bạn sử dụng chuỗi làm giá trị cho enum.

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

Khác với giá trị số, bạn bắt buộc phải gán giá trị cho tất cả lựa chọn trong chuỗi enum, hoặc TS sẽ la làng lỗi `Enum member must have initializer.` Ngoài ra bạn cũng có thể vừa dùng giá trị số vừa dùng giá trị chuỗi trong enum, nhưng nhìn chung là không có lý do gì để phải làm vậy hết.

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

### null và undefined

Cũng như JavaScript, TS có 2 kiểu dữ liệu `null` và `undefined`. Tuy nhiên tùy thuộc vào bạn tùy chỉnh `strictNullChecks` trong `tsconfig.json` thế nào mà chúng sẽ hành xử khác nhau.

- `strictNullChecks: true`: Trình biên dịch TS sẽ báo lỗi nếu bạn không kiểm tra biến có phải `null` hay `undefined` không.
- `strictNullChecks: false`: Gặp nhau làm ngơ

```ts
// strictNullChecks: true
function doSomething(x: string | null) {
  // Error: Object is possibly 'null'.
  console.log('Hello, ' + x.toUpperCase())
}

// Sửa lại
function doSomethingSafer(x: string | null) {
  if (x === null) {
    // Do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase())
  }
}
```

### any

TypeScript còn một kiểu dữ liệu `any`, có ý nghĩa là "sao cũng được". Bạn có thể dùng `any` để TS "nhắm mắt làm ngơ", không kiểm tra kiểu dữ liệu của biến.

```ts
let x: any = { foo: 1 }
x.hello() // TS sẽ không kiểm tra hàm `hello` có tồn tại trong `x` không
x = 123 // Nó cũng không quan tâm bạn gán lại một giá trị số cho `x`
```

Khi bạn không khai báo kiểu dữ liệu cho một biến, và TS không thể tự đoán được, nó sẽ tự gán kiểu dữ liệu `any`.

Bạn có thể thấy xài `any` giống như không xài TS vậy, nên mọi người thường **KHÔNG** khuyến khích sử dụng nó. Tuy nhiên nếu bạn đang bắt đầu tích hợp TS vào một dự án JS cũ thì `any` có thể sẽ hữu ích.

### Union type

Kiểu dữ liệu kết hợp (_union type_), giống như tên gọi, cho phép bạn kết hợp hai hay nhiều kiểu dữ liệu lại với nhau. Mỗi kiểu dữ liệu trong union sẽ được gọi là một kiểu dữ liệu thành viên (_member_).

```ts
function printId(id: string | number) {
  console.log(`Your ID is ${id}`)
}

printId('123') // ✅ OK
printId(456) // ✅ OK
printId({ id: 22342 }) // ❌ Error
```

Khi dùng union type, TS sẽ kiểm tra để chắc chắn phương thức bạn gọi đến tồn tại trong các kiểu dữ liệu thành viên.

```ts
function hasThree(x: string | number[]) {
  return x.includes(3) // ✅ OK vì `includes` đều có trong `Array.prototype` và `String.prototype`
}

function printId(id: string | number) {
  // ❌ Error
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
  console.log(`Your ID is ${id.toUpperCase()}`)
}
```

Để chương trình chạy đúng và an toàn hơn, chúng ta nên dùng `typeof` để kiểm tra kiểu dữ liệu trước.

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(`Your ID is ${id.toUpperCase()}`)
  } else {
    console.log(`Your ID is ${id}`)
  }
}
```

Hoặc kiểm tra mảng với `Array.isArray()`.

```ts
function sayHi(username: string | string[]) {
  if (Array.isArray(username)) {
    console.log(`Hello ${username.join(', ')}`)
  } else {
    console.log(`Hi ${username}`)
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

## Tạm kết

Chúng ta đã làm quen với những kiểu dữ liệu cơ bản trong TypeScript: number, string, boolean, any. Bạn cũng đã biết về type alias, kiểu kết hợp _union type_ và khai báo kiểu cho object với interface. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về kiểu khi làm việc với class nhé.
