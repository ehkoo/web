---
title: 'Giới thiệu & các kiểu dữ liệu căn bản'
date: 2022-02-19
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683355597/ehkoo/dd614a2e93f10fe4d845522b4dff85f4.webp
tags: TypeScript, Dành cho người mới
excerpt: 'TypeScript là gì? Những lợi ích khi dùng TypeScript? Giới thiệu những kiểu dữ liệu thường gặp nhất.'
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683355597/ehkoo/dd614a2e93f10fe4d845522b4dff85f4.webp)

_Hình minh họa: [**Space**](https://dribbble.com/shots/16279707-Space) bởi [**NICKVECTOR**](https://dribbble.com/nickvector) từ Dribbble_

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

- **Documentations:** Sau khi mô tả thì kiểu dữ liệu trong TS cũng có thể xem như một phần của tài liệu phát triển.

- **Nâng cao kiến thức:** Bên cạnh những gì bạn đã biết về JS, TS cũng có những khái niệm mới như lập trình tổng quát, hay các thao tác với kiểu dữ liệu. Thông qua làm việc với chúng, bạn có thể tự nâng cao kiến thức của mình về lập trình nói chung.

- **Cộng đồng lớn:** Cái này thì không cần phải bàn. TS đang được sử dụng ở các công ty lớn như Microsoft (dĩ nhiên), Google, Airbnb, Uber, v.v. Ngoài ra TypeScript còn được dùng ở rất nhiều [dự án mã nguồn mở lớn](https://github.com/topics/typescript) như VSCode, Angular, Deno, Ant Design, Ionic, v.v.

## Cài đặt

Để cài đặt TypeScript vào dự án, bạn có thể dùng npm/ yarn/ pnpm.

```bash
$ npm install --save-dev typescript
```

Sau khi cài đặt chúng ta có thể sử dụng lệnh `tsc` ở terminal, hoặc bạn có thể dùng thẳng bằng `npx` luôn.

```bash
$ npx tsc example.ts
```

Trong thời gian học bạn cũng có thể chạy trực tiếp TS trên trình duyệt ở trang [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play). Hoặc nếu bạn xài VSCode thì cứ tạo một tập tin mới, dùng menu **Change Language Mode** để đổi thành TypeScript là có thể viết TS rồi.

Series này dựa vào quyển [**The TypeScript Handbook**](https://www.typescriptlang.org/docs/handbook/intro.html), và phần nào mặc định bạn đã có kiến thức căn bản về JavaScript rồi ha. Chúng ta sẽ sử dụng phiên bản TypeScript 5.0.4.

## Mô tả kiểu dữ liệu

### Các kiểu dữ liệu căn bản

Mô tả kiểu dữ liệu (_type annotation_) là cách chúng ta thông báo cho trình biên dịch TS biết giá trị của một biến thuộc kiểu dữ liệu nào. Có 3 kiểu dữ liệu hay gặp trong JavaScript:

- `boolean`: kiểu logic, chỉ có hai giá trị là `true` và `false`.
- `string`: kiểu chuỗi
- `number`: kiểu dữ liệu số, không phân biệt đó là số nguyên (int) hay thực (float). Theo đặc tả [ECMAScript](https://262.ecma-international.org/12.0/#sec-ecmascript-language-types-number-type) mà JavaScript dựa vào thì tất cả giá trị số đều là số thực dấu phẩy động có độ chính xác kép hết.

> 💡 **Ghi chú:**
>
> Thay vì dùng "kiểu dữ liệu" có phần dài dòng, từ đây về sau chúng ta sẽ gọi tắt là "kiểu" cho nhanh nhe.

Để mô tả kiểu dữ liệu khi khai báo biến, bạn dùng cú pháp `tên-biến: kiểu-dữ-liệu` như thế này:

```ts
let n: number = 42
let isMember: boolean = false
let username: string = 'john'
```

Nhờ vào đó, TypeScript có thể ngăn ngừa những lỗi "vớ vẩn" như thế này:

```ts
n = 'hello'
// ❌
// Type 'string' is not assignable to type 'number'.
```

Hoặc thế này:

```ts
n.toUpperCase()
// ❌
// Property 'toUpperCase' does not exist on type 'number'.
```

Hay thế này:

```ts
isMember()
// ❌
// This expression is not callable.
//   Type 'Boolean' has no call signatures.
```

Đồng thời các trình soạn thảo cũng có thể gợi ý những phương thức có thể dùng, tùy thuộc vào kiểu dữ liệu của biến.

!["Gợi ý những phương thức của biến n có kiểu number"](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1683548253/ehkoo/typescript/ts-code-suggestion.png)

Chúng ta cũng có thể mô tả kiểu cho tham số hàm:

```ts
function sayHello(name: string, age: number) {
  return `Hello ${name}, ${age} year(s) old`
}

sayHello('kcjpop', 40)
// → Hello kcjpop, 40 year(s) old

sayHello(40, 'kcjpop')
// Error: Argument of type 'number' is not assignable
// to parameter of type 'string'.
```

> 💡 **Tự suy kiểu dữ liệu**
>
> Trong những trường hợp quá rõ ràng, TS có thể tự suy luận (_infer_) kiểu của biến nên bạn có thể không cần mô tả kiểu dữ liệu luôn. Làm như vậy phần nào giúp chương trình dễ đọc và gọn gàng hơn.
>
> ```ts
> let a = 1
> let b = 'hello'
> let c = a + b // TS đủ thông minh để biết `c: string`
> ```

### Kiểu `any`

Khi bạn **không** khai báo kiểu dữ liệu cho biến và TS không thể tự đoán được, nó sẽ tự gán kiểu dữ liệu `any`, mang ý nghĩa là "sao cũng được".

```ts
let a
// `a` lúc này sẽ có kiểu `any` và TS sẽ cảnh báo là:
//
// Variable 'a' implicitly has an 'any' type, but a better type
// may be inferred from usage
```

Cũng tương tự khi bạn không khai báo kiểu cho tham số của hàm:

```ts
// `name` và `age` đều có kiểu `any` hết
function sayHello(name, age) {
  return `Hello ${name}, ${age} year(s) old`
}
```

Bạn có thể thấy xài `any` giống như không xài TS vậy, nên mọi người thường **KHÔNG** khuyến khích sử dụng nó. Tuy nhiên nếu bạn đang bắt đầu tích hợp TS vào một dự án JS cũ thì `any` có thể sẽ hữu ích.

### Kiểu dữ liệu kết hợp (_Union types_)

Như tên gọi, cho phép bạn kết hợp hai hay nhiều kiểu dữ liệu lại với nhau bằng cách dùng dấu gạch đứng `|` để phân cách chúng. Mỗi kiểu dữ liệu được gọi là **"thành viên"** (_member_) của union.

```ts
// Khai báo `memberId` có thể là giá trị chuỗi hoặc số
let memberId: string | number

// ✅ Ổn
memberId = 102

// ✅ Không thành vấn đề
memberId = '59642d1b-619b-46cf-ad99-5eeb4969031f'

// Chúng ta cũng có thể dùng union cho tham số hàm
function printId(id: string | number) {
  console.log(`Your ID is ${id}`)
}

printId('123') // ✅ OK
printId(456) // ✅ OK
printId({ id: 22342 }) // ❌ Error
```

Thứ tự của các kiểu dữ liệu thành viên không quan trọng, nên `number | string` hay `string | number` đều như nhau.

Khi dùng kiểu kết hợp, TS sẽ kiểm tra để chắc chắn phương thức bạn gọi đến tồn tại trong các kiểu dữ liệu thành viên.

```ts
function printId(id: string | number) {
  // ✅ Vì number và string đều có phương thức `.toLocaleString()`
  console.log(`Your ID is ${id.toLocaleString()}`)
}

function printId(id: string | number) {
  console.log(`Your ID is ${id.toUpperCase()}`) // ❌ Error
  // Property 'toUpperCase' does not exist on type 'string | number'.
  //   Property 'toUpperCase' does not exist on type 'number'.
}
```

Để chương trình chạy đúng và an toàn hơn, chúng ta nên dùng `typeof` để kiểm tra kiểu dữ liệu trước. Kỹ thuật này gọi là **"thu hẹp kiểu"** (_type narrowing_) và chúng ta sẽ đi sâu hơn ở bài sau.

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(`Your ID is ${id.toUpperCase()}`)
  } else {
    console.log(`Your ID is ${id}`)
  }
}
```

### Đổi tên kiểu bằng type alias

TS cho phép bạn đặt lại tên cho các kiểu dữ liệu bằng từ khóa `type`.

```ts
// Đặt một kiểu Username là tên gọi khác của kiểu string
type Username = string

// Đặt một kiểu kết hợp có tên là UserId
type UserId = string | number

function printId(id: UserId) {
  console.log(`Your ID is ${id}`)
}
```

Sử dụng type alias giúp code nhìn gọn và dễ hiểu hơn, giảm trùng lặp, và cho phép tái sử dụng các kiểu dữ liệu một cách thống nhất trong toàn bộ ứng dụng. `type` còn có công dụng khác mà chúng ta sẽ tìm hiểu ở những bài viết sau.

### Kiểu giá trị chân phương (_Literal types_)

Xét đoạn code sau:

```ts
let a = 'Hello'
a = 'Xin chào'

const b = 'World'
```

Bạn có thể đoán được kiểu của `a` và `b` hông? Nhìn qua thì cả hai đều có kiểu `string` đúng hông, nhưng khi thử trên [TS Playground](https://www.typescriptlang.org/play?#code/DYUwLgBAhhC8EHIASJjAPYIFA3ggGgJYB2EAxgBYAHmWWZ6xAzpAEZyIDq6ATsACbYsQA) thì kết quả lại là:

```ts
declare let a: string
declare const b = 'World'
```

`b` có kiểu giá trị bằng chính nó. Nói cách khác:

```ts
let a: string = 'Hello'
const b: 'World' = 'World'
```

Khái niệm này trong TS gọi là kiểu giá trị chân phương hay _literal types_. Lý do là vì khi khai báo biến bằng `var/ let`, chúng có thể mang bất cứ giá trị nào của kiểu dữ liệu được định nghĩa trước, trong khi giá trị của `const` lại không đổi. Do đó TS quyết định nâng cấp lên, dùng giá trị của biến làm kiểu luôn.

Kiểu giá trị chân phương không chỉ áp dụng cho chuỗi mà còn cho giá trị số và luận lý.

```ts
const n: 42 = 42

const isTrue: true = true
```

Điều này dẫn tới kiểu `string`, cũng như `number` có thể được diễn giải bằng tập hợp tất cả các giá trị có thể có của chúng:

```ts
type string = 'a' | 'ab' | 'hello' | 'xin chào' | …

type number = 1 | 23 | 0.1 | -0.000001 | …
```

Trong khi kiểu `boolean` lại là tập hợp của hai kiểu giá trị chân phương: `true` và `false`.

```ts
type boolean = true | false
```

Hầu hết các trường hợp, literal types sẽ được dùng để khai báo tập hợp những giá trị khả dụng, chẳng hạn như Material UI khai báo [color scheme mặc định](https://github.com/mui/material-ui/blob/512d5c7204e4ca30d498cc868e5d8f6ab457081a/packages/mui-joy/src/styles/types/colorScheme.ts#LL6C13-L6C13) như thế này:

```ts
type DefaultColorScheme = 'light' | 'dark'
```

Hoặc bạn có thể kết hợp với kiểu dữ liệu khác trong union types:

```ts
type PortNumber = number | 'random'

const p1: PortNumber = 4000 // ✅ OK

const p2: PortNumber = 'random' // ✅ OK

const p3: PortNumber = 'what' // ❌ Error
// Type '"what"' is not assignable to type 'PortNumber'.
```

## Tạm kết

Bạn đã làm quen với những kiểu dữ liệu cơ bản trong TypeScript: `number`, `string`, `boolean`, `any`; nghía qua cách khai báo kiểu cho tham số hàm, đồng thời nhìn qua union types, type alias, và literal types. Trong bài viết sau chúng ta sẽ nhìn qua cách khai báo kiểu cho object và array, đồng thời tìm hiểu về interface nhe.
