---
layout: post.njk
title: Có gì mới trong React phiên bản 16.3.0?
slug: react-phat-hanh-phien-ban-16-3
date: 2018-03-30
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1518288221/blog-4_udbwwy.jpg
tags: React, JavaScript
excerpt: Trong phiên bản này, khái niệm `context` được nâng cấp, giúp bạn chia sẻ state một cách đơn giản hơn. Bên cạnh đó, StrictMode được giới thiệu, cùng với một số thay đổi về life-cycle hooks và API để thao tác với `ref`.
author: kcjpop
form_footer: react-footer
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1518288221/blog-4_udbwwy.jpg)

Sau bao ngày chờ đợi ngóng trông, React cuối cùng cũng đã phát hành phiên bản 16.3.  Bạn có thể upgrade trong dự án của mình bằng lệnh.

```bash
yarn add react@16.3 react-dom@16.3
npm install react@16.3 react-dom@16.3
```

Hãy cùng Ehkoo điểm qua những thay đổi trong phiên bản này nhé.

## API mới cho `context`

Trong các phiên bản trước đây, `context` là tham số thứ hai trong constructor của một component, theo kiểu:

```js
class MyComponent extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
}
```

Nhưng thông tin về `context` khá hiếm hoi ngay cả trên trang tài liệu chính thức của React, và lập trình viên được khuyến khích... không sử dụng `context` vì API của nó có thể thay đổi trong các phiên bản sau.

Nhưng đó đã là quá khứ. Kể từ phiên bản 16.3, khái niệm `context` được [cải tiến](https://github.com/reactjs/rfcs/blob/master/text/0002-new-version-of-context.md) và đóng vai trò như một cơ chế quản lý state đơn giản.

```js
import { createContext } from 'react'
const ThemeContext = createContext({ color: 'dark', fontWeight: 400 })
// ThemeContext là một object có hai thuộc tính ThemeContext.Provider và ThemeContext.Consumer
```

Hàm `React.createContext(defaultState)` nhận vào một object như là state ban đầu, và trả về một object có hai thuộc tính `Provider` và `Consumer`. `Provider` là một component có nhiệm vụ truyền dữ liệu xuống tất cả các component con của nó. Theo ví dụ trên, bạn có thể dùng `ThemeContext.Provider` để tạo một context và gán giá thị mới:

```jsx
class App extends React.Component {
  render() {
    const newState = { color: 'green', fontWeight: 300 }
    return (
      <ThemeContext.Provider value={newState}>
        <Header />
        <Content />
        <Footer />
      </ThemeContext.Provider>
    )
  }
}
```

Để sử dụng context được truyền vào, bạn sử dụng `ThemeContext.Consumer`.

```jsx
class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {context => (
          <header style={{ backgroundColor: context.color }}>
            <h1 style={{ fontWeight: context.fontWeight }}>Welcome</h1>
          </header>
        )}
      </ThemeContext.Consumer>
    )
  }
}
```

`ThemeContext.Consumer` sử dụng kỹ thuật render prop để nhận giá trị từ `ThemeContext.Provider`. Nếu bạn không truyền state mới cho `ThemeContext.Provider` thì giá trị mặc định khi gọi `React.createContext()` sẽ được sử dụng.

**Xem thêm:** [Tái sử dụng code với kỹ thuật render prop trong React](https://ehkoo.com/bai-viet/render-prop-thay-cho-higher-order-component-reactjs)

## StrictMode

StrictMode là một component giúp đảm bảo ứng dụng của bạn tuân theo những tiêu chuẩn phát triển đúng nhất. Hiện tại, StrictMode có thể quăng ra lỗi nếu trong ứng dụng của bạn sử dụng một trong những life-cycle hooks bị đánh dấu loại bỏ (xem ở phần sau).

Để sử dụng StrictMode, bạn dùng như sau:

```jsx
import { Component, StrictMode } from 'react'

class App extends Component {
  render() {
    const newState = { color: 'green', fontWeight: 300 }

    return (
      <StrictMode>
        <ThemeContext.Provider value={newState}>
          <Header />
          <Content />
          <Footer />
        </ThemeContext.Provider>
      </StrictMode>
    )
  }
}
```
Trong những phiên bản sau, chắc chắn những quy định mới dành cho StrictMode sẽ được thêm vào.

## Một số thay đổi về life-cycle hooks

Phiên bản 16.3 đánh dấu các life-cycle hooks sau sẽ bị loại bỏ trong phiên bản 17.

* `componentWillMount` -- hãy sử dụng `componentDidMount`
* `componentWillUpdate`-- hãy sử dụng  `componentDidUpdate`
* `componentWillReceiveProps` -- được thay thế bằng `static getDerivedStateFromProps`

Những thay đổi này giúp hoàn thiện hơn tính năng async rendering của kiến trúc Fiber. Trong StrictMode sẽ có lỗi quăng ra khi dùng đến các hook này. Bạn có thể dùng `UNSAFE_componentWillMount`, `UNSAFE_componentWillReceiveProps`, `UNSAFE_componentWillUpdate` nhưng dĩ nhiên là không khuyến khích rồi.

Nói thêm về `static getDerivedStateFromProps`, được giới thiệu để thay thế cho `componentWillReceiveProps` giúp thay đổi `this.state` khi props thay đổi. Đây là một phương thức tĩnh, được khai báo như sau:

```jsx
class App extends React.Component {
  state = { date: new Date }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.date === prevState.date) {
      return null
    }

    return { date: nextProps.date }
  }
}

// hoặc bạn có thể dùng cách này:
App.getDerivedStateFromProps = function(nextProps, prevState) {
  // Logic của bạn ở đây
}
```

Vì là phương thức tĩnh nên trong hàm `getDerivedStateFromProps` bạn không thể dùng `this` hay gọi đến `this.setState()`. Do đó, sau khi thực hiện so sánh và phát hiện cần re-render, bạn chỉ trả về một object chứa các thay đổi của state dựa vào props. Thay đổi này sẽ được merge vào `this.state`. Ngược lại nếu bạn không muốn thực hiện re-render, trả về `null`.

`getDerivedStateFromProps` cũng rất tiện vì nó được gọi khi component được mount lần đầu tiên, và trong mỗi lần component được re-render. Thế nên bên trong constructor, bạn không cần phải tạo state dựa vào nữa. Nếu trong một component có cả hai phương thức `componentWillReceiveProps` và `getDerivedStateFromProps`, `getDerivedStateFromProps` sẽ được gọi.

### API mới để tạo và chuyển `ref`

Trong các phiên bản trước, để tạo `ref` cho một DOM element bạn có thể dùng string hoặc một hàm callback, như ví dụ dưới đây.

```jsx
<input ref="inputRef" />

// hoặc

<input ref={el => (this.inputRef = el)} />
```

Trong phiên bản 16.3, React giới thiệu phương thức `React.createRef()` giúp tạo `ref` một cách thuần túy hơn.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  render() {
    return <input type="text" ref={this.inputRef} />
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }
}
```

Bạn vẫn có thể sử dụng kiểu callback để tạo `ref` trong 16.3, và không nhất thiết phải dùng `React.createRef()`. Trên website của React, cách sử dụng callback được xem như là một kỹ thuật nâng cao.

Bên cạnh đó, React cũng giới thiệu `React.forwardRef(component)` giúp truyền `ref` từ một component trong HOC xuống component con.

```jsx
class FancyButton extends React.Component {
  buttonRef = React.createRef()

  focus() {
    this.buttonRef.current.focus()
  }

  render() {
    const {label, theme, ...rest} = this.props;
    return (
      <button
        {...rest}
        className={`${theme}-button`}
        ref={this.buttonRef}>
        {label}
      </button>
    )
  }
}

// Tạo HOC để sử dụng Theme context
function withTheme(Component) {
  // Để ý tham số `ref` được tạo ra bởi React.forwardRef()
  function ThemedComponent(props, ref) {
    return (
      <ThemeContext.Consumer>
        {theme => (
          // Truyền ref vào component con
          <Component {...props} ref={ref} theme={theme} />
        )}
      </ThemeContext.Consumer>
    )
  }

  return React.forwardRef(ThemedComponent)
}

const FancyThemedButton = withTheme(FancyButton)
const fancyButtonRef = React.createRef()
<FancyThemedButton
  label="Click me!"
  onClick={handleClick}
  ref={fancyButtonRef}
/>

// fancyButtonRef sẽ đi qua HOC `withTheme()`, đi tiếp vào component `FancyButton`,
// và được bắt bởi `React.createRef()`
```

## Kết

Context trong phiên bản 16.3 là một tính năng thú vị, giúp bạn quản lý state một cách đơn giản. Nhưng liệu context có thể thay thế được reudx/MobX hay không, hãy để các dự án thực tế trả lời.

#### Tham khảo

[1] React v16.3.0: New lifecycles and context API. Truy cập ngày 30 tháng 03 năm 2018 từ [https://reactjs.org/blog/2018/03/29/react-v-16-3.html](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)

[2] Update on Async Rendering. Truy cập Truy cập ngày 30 tháng 03 năm 2018 từ [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
