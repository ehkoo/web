---
title: 'Thao tác trên kiểu dữ liệu'
date: 2022-02-10
cover: https://www.sounasdesign.com/wp-content/uploads/2021/08/AstronautGame_ObjectifEspace05_sounas.png
tags: TypeScript, Dành cho người mới
excerpt: 'Trong phần đầu tiên của series này, chúng ta hãy tìm hiểu về các kiểu dữ liệu căn bản trong TypeScript (TS) với Ehkoo nhe.'
author: kcjpop
draft: true
---

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
