---
title: 'Những phương thức mới của mảng trong JavaScript'
date: 2023-05-01
tags:
  - JavaScript
  - Dành cho người mới
excerpt: ''
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1280/v1682681556/ehkoo/photo-1592844002373-a55ecd7af140.jpg
author: kcjpop
figure:
  src: &cover
  alt: 'Đoàn tàu khởi hành từ ga Jodhpur, Ấn Độ'
  author:
    name: Anirudh
    url: https://unsplash.com/@underroot
  credit:
    from: Unsplash
    url: https://unsplash.com/photos/PJUbLL5g9BY
---

## `Array.fromAsync()`

<browser-compat path="javascript.builtins.Array.fromAsync" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Có thể bạn đã biết đến `Array.from()` dùng để tạo mảng từ các đối tượng iterables như Map hay generators, hoặc những đối tượng "giống mảng nhưng hông phải" (_array-like objects_, là những đối tượng có thuộc tính `length`, ví dụ như `{ length: 10 }`, `arguments` hay `NodeList`).

```js
const arr = Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const nodes = Array.from(document.querySelectorAll('div.card'))

function foo() {
  // `arguments` là biến đặc biệt chứa tất cả tham số được truyền
  // vào hàm
  const args = Array.from(arguments)
}
```

Phương thức tĩnh `Array.fromAsync()` cũng tương tự như vậy, nhưng cho phép tạo mảng từ các đối tượng có thể lặp bất đồng bộ (_async interable objects_, dịch ra dài dòng ghê) như `ReadableStream` và `AsyncGenerator`. Phương thức này sẽ trả về một Promise.

```js
function* fiveDouble() {
  let i = 0
  while (i++ < 5) {
    yield i * 2
  }
}

// Kết quả: 2, 4, 6, 8, 10]
// Vì `Array.fromAsync` luôn trả về Promise nên chúng ta phải `await`
await Array.fromAsync(fiveDouble())
```

Một cách nào đó thì `Array.fromAsync()` cũng giống như `for await…of` vậy.

```js
function fetchPokemons() {
  const ids = [1, 4, 7]

  return ids.map(async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    return res.json()
  })
}

// Bạn cũng có thể đưa vào một hàm mapper giống như `Array.from()`
await Array.fromAsync(fetchPokemons(), (pokemon) => pokemon.name)
// Kết quả: ["bulbasaur", "charmander", "squirtle"]

for await (const pokemon of fetchPokemons()) {
  console.log(pokemon.name)
}
// > "bulbasaur"
// > "charmander"
// > "squirtle"
```

So với `Promise.all()` thì `Array.fromAsync()` có khác chút xíu:

- `Array.fromAsync()` sẽ `await` các giá trị một cách tuần tự, trong khi `Promise.all()` được thực thi song song.

- Khi được áp dụng lên async iterables, `Array.fromAsync()` sẽ lần lượt duyệt qua các phần tử, và nó chỉ xử lý phần tử tiếp theo sau khi phần tử hiện tại đã chạy xong. Trong khi đó `Promise.all()` lại chạy hết tất cả phần tử xong gom kết quả cuối cùng lại.

## `Array.prototype.at()`

<browser-compat path="javascript.builtins.Array.at" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Phương thức `.at(index)` giúp bạn truy xuất một phần tử trong mảng bằng chỉ mục của nó. Tương tự như sử dụng `arr[index]` vậy.

```js
const arr = ['a', 'b', 'c']

arr[1] // 'b'
arr.at(1) // 'b'
```

Nhưng điểm khác là `.at()` hỗ trợ chỉ mục âm (_negative index_). Nhắc lại là mảng trong JavaScript thực chất là một object có các thuộc tính (_properties_) là chữ số.

```js
const arr = ['a', 'b', 'c']

console.log(typeof arr) // "object"

// In ra thì `arr` giống vầy
Array(3) [ "a", "b", "c" ]
  "0": "a"
  "1": "b"
  "2": "c"
  length: 3

```

Do đó nếu bạn viết `arr[-1]` sẽ ra `undefined`, vì lúc này bạn đang truy xuất vào thuộc tính `arr."-1"` (cú pháp này không đúng đâu, chỉ để mô tả vấn đề thôi nha).

```js
// Với `.at()` thì dùng chỉ mục âm thoải mái
arr.at(-1) // 'c'
arr.at(-2) // 'b'
```

`.at()` khá tiện nếu bạn cần truy xuất phần tử cuối cùng của mảng, thay cho `arr[arr.length - 1]`.

## `Array.prototype.group() / .groupToMap()`

<browser-compat path="javascript.builtins.Array.groupToMap" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

`.group(callbackFn, thisArg)` giúp bạn nhóm các phần tử của mảng theo một khóa chung nào đó, tương tự như hàm [`groupBy`](https://lodash.com/docs/4.17.15#groupBy) của `lodash` vậy.

```js
const arr = [1, 3, 17, 91, 80, 54, 0]
const grouped = arr.group((x) => (x % 2 === 0 ? 'even' : 'odd'))
/* Kết quả:
   { odd: [1, 3, 17, 91], even: [80, 54, 0] }
*/

const users = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'member' },
  { id: 3, role: 'mod' },
  { id: 4, role: 'member' },
]
users.group((u) => u.role)
/* Kết quả:
   {
     admin: [{ id: 1, role: 'admin' }],
     member: [
       { id: 2, role: 'member' },
       { id: 4, role: 'member' },
     ],
     mod: [{ id: 3, role: 'mod' }],
   }
*/
```

Rất là tiện đúng hông. Ngoài ra chúng ta còn có `.groupToMap(callbackFn, thisArg)` giúp trả về kết quả là một đối tượng của Map, thay vì object thường.

```js
// Sử dụng giá trị `users` ở trên
const usersByRole = users.groupToMap((u) => u.role)
/*
Map {
  "admin" => [{id: 1, role: "admin"}],
  "member" => [{id: 2, role: "member"}, {id: 4, role: "member"}],
  "mod" => [{id: 3, role: "mod"}]
}
*/

usersByRole.get('mod') // [{id: 3, role: "mod"}]
usersByRole.has('supermod') // false
```

## `Array.prototype.with()`

<browser-compat path="javascript.builtins.Array.with" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Để thay thế giá trị của một phần tử tại vị trí nào đó, cách thường gặp nhất là dùng `[]` để truy cập và gán trực tiếp.

```js
const arr = ['a', 'b', 'c']
arr[1] = 'd'
console.log(arr) // ["a", "d", "c"]
```

Dĩ nhiên cách trên sẽ làm thay đổi mảng gốc. Nhưng nếu bạn không muốn vậy thì sao? Phương thức `.with(index, value)` sẽ thay thế `value` vào phần tử ở vị trí `index`, và trả về một mảng mới.

```js
const arr = ['a', 'b', 'c']
const replaced = arr.with(1, 'd') // ["a", "d", "c"]
arr === replaced // false
```

## `Array.prototype.findLast() / .findLastIndex()`

<browser-compat path="javascript.builtins.Array.findLast" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Để tìm kiếm một phần tử trong mảng, chúng ta có thể dùng `.find(fn)` hoặc `.findIndex(fn)`. Hai phương thức này trả về phần tử hoặc vị trí của phần tử đầu tiên thỏa mãn điều kiện của hàm `fn`, **tính từ đầu mảng**. Ví dụ:

```js
const arr = [0, 7, 12, 9, 21, 8]

// Tìm số lẻ đầu tiên trong mảng
arr.find((x) => x % 2 === 1) // 7
arr.findIndex((x) => x % 2 === 1) // 1
```

ES2023 bổ sung hai phương thức mới: `.findLast(fn)` và `.findLastIndex(fn)`. Như tên gọi, hai phương thức này sẽ trả về phần tử/ vị trí của phần tử đầu tiên thỏa mãn hàm `fn`, nhưng **tính từ cuối mảng**.

```js
const arr = [0, 7, 12, 9, 21, 8]

arr.findLast((x) => x % 2 === 1) // 21
arr.findLastIndex((x) => x % 2 === 1) // 4
```

## `Array.prototype.toReversed() / .toSorted() / .toSpliced()`

<browser-compat path="javascript.builtins.Array.toReversed" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Các phương thức `.reverse()`, `.sort()`, và `.splice()` thay đổi (mutate) mảng gốc khi được gọi.

```js
const a = [0, 7, 12, 9, 21, 8]
const sorted = a.sort((x, y) => x - y)

sorted // [ 0, 7, 8, 9, 12, 21 ]

sorted === a // true
```

Từ ES2023 bổ sung các phương thức sau vào `Array.prototype`:

- `toReversed()`: Đảo ngược vị trí các phần tử của mảng từ dưới lên
- `toSorted(compareFn)`: Sắp xếp mảng
- `toSpliced()`: Xóa một/nhiều phần tử trong mảng, hoặc thay thế phần tử ở những vị trí nhất định

```js
const a = [0, 7, 12, 9, 21, 8]

// Đảo ngược mảng
const reversed = a.toReversed()
// → [ 8, 21, 9, 12, 7, 0 ]

// Sắp xếp mảng
const sorted = a.toSorted((x, y) => x - y)
// → [ 0, 7, 8, 9, 12, 21 ]

// Xóa phần tử ở chỉ mục 1
const removed = a.toSpliced(1, 1)
// → [ 0, 12, 9, 21, 8 ]

a === reversed // false
a === sorted // false
a === removed // false
```

Các phương thức `.toReversed()`, `.toSorted()`, và `.toSpliced()` đều đã được hầu hết trình duyệt (trừ Firefox) hỗ trợ.

## `Array.prototype.toLocaleString()`

<browser-compat path="javascript.builtins.Array.toLocaleString" browsers="firefox,chrome, chrome_android, edge, safari, safari_ios, opera, node"></browser-compat>

Phương thức `.toLocaleString(locales, options)` đã xuất hiện từ lâu nhưng mình mới biết và cũng ít xài nên coi như "cũ người mới ta" vậy 😅 Phương thức này gọi đến hàm `.toLocaleString()` cho mỗi phần tử trong mảng, sau đó ghép các kết quả lại bằng dấu phẩy `,`, tùy thuộc vào ngôn ngữ được định dạng. Ví dụ:

```js
const vals = [30_000, 100_000, new Date('2023-04-01'), new Date('2023-03-02')]

const fi = vals.toLocaleString('fi')
// "30 000,100 000,1.4.2023 3.00.00,2.3.2023 2.00.00"

const vi = vals.toLocaleString('vi')
// "30.000,100.000,03:00:00 1/4/2023,02:00:00 2/3/2023"
```

Bạn có thể dùng tham số `options` để tùy chỉnh kết quả định dạng như ý muốn.

```js
const vals = [30_000, 100_000, new Date('2023-04-01'), new Date('2023-03-02')]

const fi = vals.toLocaleString('fi', {
  currencySign: 'standard',
  style: 'currency',
  currency: 'EUR',
  dateStyle: 'full',
})
// "30 000,00 €,100 000,00 €,lauantai 1. huhtikuuta 2023,torstai 2. maaliskuuta 2023"

const vi = vals.toLocaleString('vi', {
  currencySign: 'standard',
  style: 'currency',
  currency: 'VND',
  dateStyle: 'full',
})
// "30.000 ₫,100.000 ₫,Thứ Bảy, 1 tháng 4, 2023,Thứ Năm, 2 tháng 3, 2023"
```

Vì `Array.prototype.toLocaleString()` chỉ gọi đến phương thức `.toLocaleString()` của từng phần tử, chúng ta có thể áp dụng với những class tự đặt.

```js
class Mr {
  constructor(name) {
    this.name = name
  }

  toLocaleString(locale, options) {
    if (locale.includes('en')) return `Mr. ${this.name}`
    if (locale.includes('vi')) return `Anh ${this.name}`

    return this.name
  }
}

const guys = [new Mr('Smith'), new Mr('Nguyen Van A')]
guys.toLocaleString('en-GB') // "Mr. Smith,Mr. Nguyen Van A"
guys.toLocaleString('vi-VN') // "Anh Smith,Anh Nguyen Van A"
```

Nói thiệt là mình vẫn chưa nghĩ ra được trường hợp nào cần phải dùng phương thức này trên mảng 😅

## Kết

Mảng là một trong những kiểu dữ liệu thông dụng nhất khi làm việc với JavaScript. Hi vọng qua bài viết này bạn sẽ biết thêm những phương thức mới vừa được thêm vào `Array.prototype` và sử dụng chúng thay vì dựa vào thư viện thứ ba.
