---
layout: post.njk
title: Làm game Calculator với kỹ thuật currying và React
slug: lam-game-calculator-voi-ky-thuat-currying-va-react
date: 2018-05-04
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1517867795/_curry_advc1m.jpg
tags: React, JavaScript, Game Making
excerpt: Currying? Nghe sao giống cà ri vậy? Hãy cùng Ehkoo tìm hiểu xem nó là gì, và áp dụng để xây dựng một game Calculator đơn giản bằng React nhé.
author: kcjpop
draft: true
---
Bạn đã chơi game [Calculator](http://www.simplemachine.co/game/calculator-the-game/) của công ty Simple Machine chưa? Đây là một game giải đố với cách chơi đơn giản nhưng khá "hack não": với mỗi màn chơi, bạn có một giá trị ban đầu, một giá trị đích, số bước thực hiện cho phép cùng với các nút phép tính. Nhiệm vụ của bạn là đạt được giá trị đích bằng cách bấm CHÍNH XÁC số bước cho phép, như trong hình dưới đây.

![](https://i.imgur.com/Dvfg94g.png)
_Sử dụng +4, x4, /4 để đạt được giá trị 4 từ giá trị ban đầu là 3 trong 3 bước_

Game khá thú vị, dùng để luyện não + giết thời gian khá tốt. Nhưng hôm nay chúng ta sẽ thử thách trí tuệ theo kiểu khác, bằng cách làm một game tương tự với kỹ thuật currying và React.

### Phân tích game

Dựa vào hình chụp ở trên, bước đầu ta có thể nghĩ một game bao gồm những thuộc tính sau:

```js
const game = {
  goal: 4,
  moves: 3,
  initResult: 3,
  currentResult: 3,
  operators: [ Operator('+4'), Operator('x4'), Operator('/4') ]
}
```

Luồng của game có thể được biểu diễn theo sơ đồ sau:

![](https://i.imgur.com/ZlDZJOl.png)

Vấn đề đầu tiên chúng ta gặp phải: làm sao để tạo ra các nút bấm một cách tự động mỗi khi game mới được tạo ra? Câu trả lời là dùng kỹ thuật currying.

### Currying là gì?

Currying là kỹ thuật tách một hàm nhận nhiều tham số thành một chuỗi các hàm, với mỗi hàm chỉ nhận một tham số. Lấy ví dụ, dưới đây là hàm `add()` bình thường.

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
const songs = [
  { id: 4, name: 'Người nạ ơi' },
  { id: 5, name: 'Yêu với chả đương' },
  { id: 6, name: 'Cô gái 5m2' }
]
```

Giả sử bạn muốn lấy ra danh sách các ID, bạn có thể dùng hàm `map()`.

```js
series.map(item => item.id) // [4, 5, 6]
```

Một lúc sau, bạn lại cần danh sách tên các bài hát. Bạn cũng có thể dùng hàm `map` một cách tương tự.

```js
series.map(item => item.name) // ['Người nạ ơi', 'Yêu với chả đương', 'Cô gái 5m2']
```

Nhưng bạn thấy đó, hàm được đưa vào `map()` ở cả hai trường hợp khá giống nhau, chỉ khác về tên thuộc tính cần lấy ra. Chúng ta có thể dùng currying trong trường hợp này.

```js
const get = attr => item => item[attr]

const getId = get('id')      // curried
const getName =  get('name') // curried

series.map(getId)   // [4, 5, 6]
series.map(getName) // ['Người nạ ơi', 'Yêu với chả đương', 'Cô gái 5m2']
```

Quay trở lại trò chơi của chúng ta, vì mỗi màn chơi có thể sẽ có những nút phép tính khác nhau, bạn không thể/không nên hard-code chúng. Thay vào đó, các phép tính này có thể được tạo ra tự động bằng cách dùng currying.

```js
const add = a => b => a + b
const sub = a => b => a - b
const div = a => b => a / b

const operators = [add(4), sub(4), div(4)]
```

### Thực hiện

Ehkoo sẽ dùng `create-react-app` để tạo ra một dự án mới.

```bash
npx create-react-app calc
cd calc
npm i
npm start
```

Sau đó, chúng ta có thể tạo giao diện cho game tương tự như bên dưới.

<iframe src="https://codesandbox.io/embed/r07lx5x2lm?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Lúc này một vấn đề khác lại xuất hiện: Chúng ta đã có thể dùng currying để tạo ra một phép tính, làm thế nào để hiển thị nhãn (label) của phép tính đó lên nút bấm? Một cách giải quyết là thay vì chỉ trả về hàm tính toán, chúng ta trả về một object bao gồm nhãn và hàm.

```js
// operators.js
export function sub(x) {
  return {
    label: `-${x}`,
    func: y => y - x
  }
}

const sub4 = sub(4)
// { label: '-4', func }
```

> **LƯU Ý**: Bạn có để ý thấy tham số `y` đã được lật ngược lại `y - x` thay vì `x - y` không? Đó là vì trong trò chơi của chúng ta, khi người chơi click vào một phép tính, kết quả hiện tại (tương ứng với tham số `y`) sẽ bị trừ đi giá trị định trước của nút bấm. Do đó chúng ta phải đảo ngược thứ tự tham số ở đây.

Bạn tự viết tiếp hàm để tạo ra phép tính trừ, nhân, chia và lưu vào tập tin `src/operators.js` nhé. Chúng ta có thể cập nhật  lại `state` của `src/App.js` để thử các nút bấm.

```jsx
// src/App.js
import { add, sub, div } from './operators'

class App extends React.Component {
  state = {
    goal: 4,
    moves: 3,
    initResult: 3,
    currentResult: 3,
    operators: [add(4), sub(4), div(4)]
  }

  render() {
    // ...
    {this.state.operators.map(op => (
      <button key={op.label} className="button" onClick={this.doClickButton(op)}>
        {op.label}
      </button>
    ))}
  }
}
```

Phương thức `this.doClickButton` có thể được viết như sau:

```js
doClickButton = op => e => {
  e.preventDefault()
  this.setState(prevState => {
    // Calculate current result
    const currentResult = op.func(prevState.currentResult)
    // Reduce remaining moves
    const moves = prevState.moves - 1

    if (moves === 0) {
      console.log(currentResult === prevState.goal ? 'WIN' : 'LOSE')
    }

    return { currentResult, moves }
  })
}
```

Chúng ta cần thêm một trạng thái để đánh dấu trò chơi đã kết thúc khi `moves === 0` và hiển thị kết quả. Do đó Ehkoo khai báo thêm 2 hằng số `WIN` và `LOST`, đồng thời thêm vào `state` thuộc tính `gameEnd` và `gameResult`.

```js
const WIN = 'WIN'
const LOSE = 'LOSE'

state = { ...state, gameEnd: false, gameResult: null }

doClickButton = op => e => {
  // Nếu trò chơi đã kết thúc, chúng ta không xử lý sự kiện nữa
  if (this.state.gameEnd) return

  // ...
  const gameEnd = moves === 0
  const gameResult = currentResult === prevState.goal ? WIN : LOSE
}
```

Bên trong hàm `render()` ta có thể thêm vào thông báo kết quả khi trò chơi kết thúc.

```jsx
{this.state.gameEnd ? this.state.gameResult : null}
```

<iframe src="https://codesandbox.io/embed/jjjxpw7679?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Phần xử lý trò chơi tới đây cũng tương đối ổn rồi. Tiếp theo hãy xem làm sao để tạo màn chơi mới.

### Tạo màn chơi mới

Chúng ta sẽ viết một hàm `generate(options = {})` để khởi tạo màn chơi mới. Hàm này nhận vào một object chứa các thiết lập cho màn chơi, chẳng hạn như giá trị ban đầu, số lượng phép tính, khoảng giá trị của các phép tính này...Kết quả trả về của hàm `generate()` sẽ được kết hợp vào `state` của `src/App.jsx`.

Tham số `options` ở trên bao gồm những thuộc tính sau:

Để tạo màn chơi mới, chúng ta sẽ đi qua những bước sau:
* `initResult`: giá trị ban đầu của màn chơi
* `numberOfMoves`: số bước đi cho phép. Số bước đi càng nhiều thì trò chơi càng khó
* `numberOfOperators`: số lượng phép tính
* `operatorRange`: khoảng giá trị của các phép tính. Trò chơi sẽ dễ hơn nếu bạn chỉ có các phép tính như `+3`, `-6`, `*2`, nhưng sẽ khó hơn nếu là các phép tính `+12`, `*8`, `-23`...

Chúng ta sẽ lần được đi qua các bước

* Khởi tạo options dựa vào thiết lập của người dùng
* Tạo ngẫu nhiên một mảng các phép tính
* Áp dụng `moves` lần các phép tính này vào `initResult`
* Kết quả cuối cùng chính là `goal`
* Trả về thiết lập cho màn chơi

![](https://i.imgur.com/BccW92d.png)

Hai hàm bên dưới sẽ rất hữu ích để tạo số ngẫu nhiên trong một khoảng định trước, và lấy ra một phần tử ngẫu nhiên trong mảng.

```js
// src/helpers.js
// Tạo số ngẫu nhiên trong khoảng định trước. Không đính kèm `max` trong kết quả.
export function randomInt(min, max) {
  // Nguồn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}

// Lấy ra phần tử ngẫu nhiên trong mảng
export function pickArrayRandom(array) {
  return array[randomInt(0, array.length - 1)]
}
```

Dựa vào sơ đồ ở trên, ta có thể viết hàm `generate()` như sau:

```js
// src/generate.js
import { randomInt, pickArrayRandom } from './helpers'
import * as allOperators from './operators'

export default function(options = {}) {
  const opt = {
    initResult: randomInt(0, 10),
    numberOfMoves: randomInt(3, 5),
    numberOfOperators: randomInt(3, 5),
    operatorRange: [1, 9],
    ...options
  }

  // Vì ES6 import tất cả operators thành một object,
  // dùng Object.values() để chuyển thành mảng
  const ops = Object.values(allOperators)

  // Tạo ngẫu nhiên mảng các phép tính -> nút bấm
  const operators = Array.from({ length: opt.numberOfOperators }, () => {
    const op = pickArrayRandom(ops)
    return op(randomInt(...opt.operatorRange))
  })

  // Áp dụng ngẫu nhiên các phép tính ở trên vào `initResult`
  const goal = Array.from({ length: opt.numberOfMoves }).reduce(goal => {
    const op = pickArrayRandom(operators)

    return op.func(goal)
  }, opt.initResult)

  return {
    goal,
    operators,
    currentResult: opt.initResult,
    initResult: opt.initResult,
    moves: opt.numberOfMoves
  }
}
```

Áp dụng `generate()` vào `src/App.jsx`.

```jsx
import generate from './generate'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...generate(),
      gameEnd: false,
      gameResult: null
    }
  }
}
```

Kết quả:

<iframe src="https://codesandbox.io/embed/oon5v9nm85?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


### Thêm nút CLR

Nút CLR cho phép khởi động lại màn chơi, trong trường hợp chẳng may tính sai. Không quá khó để làm tính năng này, chúng ta chỉ cần lưu `state` khi khởi tạo game vào một thuộc tính `initState` nào đó, và khi click vào nút CLR thì gọi đến `this.setState(initState)`.

```js
// src/App.jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    const initState = {
      ...generate(),
      gameEnd: false,
      gameResult: null
    }

    this.initState = initState
    this.state = { ...initState }
  }

  doReset = e => {
    e.preventDefault()
    this.setState(this.initState)
  }
}
```

<iframe src="https://codesandbox.io/embed/62119rq3ww?view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Tạm kết

Trò chơi của chúng ta đã tương đối hoàn thành. Dĩ nhiên là còn rất nhiều điểm để cải tiến, chẳng hạn như cài đặt cho nút Help để giới thiệu cách chơi cho người dùng, hoặc cài đặt thêm các phép tính khác. Nhưng phần này Ehkoo để bạn tự do sáng tạo nhé.
