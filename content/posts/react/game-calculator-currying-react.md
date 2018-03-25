---
layout: post.njk
title: Làm game Calculator với kỹ thuật currying và React
slug: lam-game-calculator-voi-ky-thuat-currying-va-react
date: 2018-03-19
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1517867795/_curry_advc1m.jpg
tags: React, JavaScript, Game Making
excerpt: Cùng Ehkoo tìm hiểu kỹ thuật currying, và áp dụng để xây dựng một game Calculator đơn giản bằng React nhé.
author: kcjpop
draft: true
---
Bạn đã chơi game [Calculator](http://www.simplemachine.co/game/calculator-the-game/) của công ty Simple Machine chưa? Đây là một game giải đố với cách chơi đơn giản nhưng khá "hack não": với mỗi màn chơi, bạn có một giá trị ban đầu, một giá trị đích, số bước thực hiện cho phép cùng với các nút phép tính. Nhiệm vụ của bạn là đạt được giá trị đích bằng cách bấm CHÍNH XÁC số bước cho phép, như trong hình dưới đây.

![](https://i.imgur.com/Dvfg94g.png)
_Sử dụng +4, x4, /4 để đạt được giá trị 4 từ giá trị ban đầu là 3 trong 3 bước_

Game khá thú vị, dùng để luyện não + giết thời gian khá tốt. Nhưng hôm nay chúng ta sẽ luyện não theo kiểu khác, bằng cách làm một game tương tự với kỹ thuật currying và React.

### Phân tích

### Currying là gì?

Currying là kỹ thuật tách một hàm nhận nhiều tham số thành một chuỗi các hàm, với mỗi hàm chỉ nhận một tham số. Lấy ví dụ đơn giản, dưới đây là hàm `add()` bình thường.

```js
function add(a, b) {
  return a + b
}
```

Để currying hàm `add()`, chúng ta chuyển thành.

```js
function add(a) {
  return function(b) {
    return a + b
  }
}

// Hoặc với hàm mũi tên
const add = a => b => a + b
```

Sử dụng

```js
add(5)(6) // 11
```

Vậy currying có ứng dụng gì? Nhờ vào đặc tính trả về hàm của nó, bạn có thể tạo hàm mới một cách linh động.

```js
const add5 = add(5)

add5(6) // 11
```

Một ứng dụng thực tế hơn, chẳng hạn bạn có object sau:

```js
const series = [
  {
    "id": 4,
    "name": "South Park"
  },
  {
    "id": 5,
    "name": "The Simpsons"
  },
  {
    "id": 6,
    "name": "The Big Bang Theory"
  }
]
```

Giả sử bạn muốn lấy ra danh sách  các ID, bạn có thể dùng hàm `map()`.

```js
series.map(item => item.id) // [4, 5, 6]
```

Một lúc sau, bạn lại cần danh sách tên các bộ phim. Bạn cũng có thể dùng hàm `map` một cách tương tự.

```js
series.map(item => item.name) // ['South Park', 'The Simpsons', 'The Big Bang Theory']
```

Nhưng bạn thấy đó, hàm được đưa vào `map()` ở cả hai trường hợp khá giống nhau, chỉ khác về tên thuộc tính cần lấy ra. Chúng ta có thể dùng currying trong trường hợp này.

```js
const get = attr => item => item[attr]

const getId = get('id')      // curried
const getName =  get('name') // curried

series.map(getId)   // [4, 5, 6]
series.map(getName) // ['South Park', 'The Simpsons', 'The Big Bang Theory']
```

Quay trở lại trò chơi của chúng ta, vì mỗi màn chơi có thể sẽ có những nút phép tính khác nhau, bạn không thể/không nên hard-code chúng. Thay vào đó, các phép tính này có thể được tạo ra tự động bằng cách dùng currying.

```js
const add = a => b => a + b
const sub = a => b => a - b
const div = a => b => a / b

const operators = [add(4), sub(4), div(4)]
```

### Thực hiện

### Kiểm tra

### Kết
