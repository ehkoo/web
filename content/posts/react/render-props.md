---
layout: post.njk
title: Tái sử dụng code với Render Prop trong ReactJS
slug: render-prop-thay-cho-higher-order-component-reactjs
date: 2017-11-08
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1510109188/blob_ixcygo09d1_wfqumj.png
tags: React, Higher Order Components, Render Prop
excerpt: Render Prop là một hướng tiếp cận khác, bên cạnh Higher-Order Components, để giải quyết vấn đề tái sử dụng code trong ReactJS.
author: kcjpop
---

[Higher-order components](https://reactjs.org/docs/higher-order-components.html) (HOCs) là một kỹ thuật tái sử dụng code rất quen thuộc khi lập trình với React. Nói một cách đơn giản, HOC là một hàm nhận vào một component và trả về một component mới. Nếu sử dụng `react-redux` hay `react-router` bạn hẳn đã quen thuộc với HOC `connect()` và `withRouter()`.

Dưới đây là một HOC đơn giản, giúp gắn tọa độ của con trỏ chuột vào một component.

```javascript
const withMouse = function (Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 }

    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component {...this.props} mouse={this.state}/>
        </div>
      )
    }
  }
}

class MyComponent extends React.Component {
  render () {
    return (
      <div>
      The mouse position is {this.props.mouse.x}:{this.props.mouse.y}
    </div>
    )

  }
}

const ComponentWithMouse = withMouse(MyComponent)
```

Một trong những lý do HOCs trở nên phổ biến là vì kỹ thuật này sử dụng lớp của ES6 (class) ngay từ đầu. Kể từ React 16, lớp là cơ chế mặc định khi xây dựng component, thay thế hoàn toàn cho `React.createClass()` ở các phiên bản trước. Điều này hợp lý vì lớp đã được hầu hết các trình duyệt hiện tại hỗ trợ mặc định. Tuy nhiên HOCs cũng có những hạn chế:

**HOCs dễ gây bối rối**: Việc sử dụng nhiều HOCs cho một component dễ dẫn đến tình trạng không biết `props` này là do HOC nào cung cấp.

**Trùng lặp tên props**: Nếu bạn có 2 HOCs sử dụng cùng một tên cho prop, chúng sẽ bị ghi đè lên nhau.

### Giải quyết với Render Prop

"Render prop", "render callback", hay "function as a child" là những tên gọi cho kỹ thuật đưa một hàm để render vào làm prop. Bằng cách này, các components có thể chia sẻ dữ liệu theo một cách rõ ràng và không bị ràng buộc lẫn nhau.

Chúng ta có thể viết ví dụ `withMouse()` ở trên theo hướng render prop.

```javascript
class Mouse extends React.Component {
  state = { x: 0, y: 0 }

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

// Sử dụng
class MyComponent extends React.Component {
  render() {
    return (
      <Mouse
        render={props => (
          <div>
            The mouse position is {props.x}:{props.y}
          </div>
        )}
      />
    )
  }
}

const ComponentWithMouse = withMouse(MyComponent)
```

hoặc "function as a children".

```javascript
class Mouse extends React.Component {
  // ...
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    )
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <Mouse>
        {props => (
          <div>
            The mouse position is {props.x}:{props.y}
          </div>
        )}
      </Mouse>
    )
  }
}

const ComponentWithMouse = withMouse(MyComponent)
```

Như bạn thấy hàm để render có thể được truyền vào như một prop, hay là children của component. Ý tưởng chính ở đây là chúng ta có một component tên `Mouse` rất rõ ràng, cung cấp giá trị tọa độ (x, y) của con trỏ chuột. Nhờ vào đó `MyComponent` có thể render tùy ý với dữ liệu này. Hướng tiếp cận này giúp giải quyết được hai vấn đề đã nêu với HOCs, vì dữ liệu được truyền một cách trực tiếp thông qua từng component một, và cũng không có cơ chế chia sẻ props hay state giữa các components với nhau, trừ khi chúng ta thật sự muốn điều đó.

Một đặc điểm của render prop là, bạn có thể chuyển đổi từ render prop thành HOC, nhưng không thể làm được điều ngược lại. Chẳng hạn như:

```javascript
const withMouse = function (Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse>
          {mouse => (
            <Component {...this.props} mouse={mouse} />
          )}
        </Mouse>
      )
    }
  }
}
```

### Hạn chế

Điểm hạn chế duy nhất cho đến hiện tại là sử dụng nhiều render props trong một component có thể tạo ra nhiều hàm lồng nhau, làm mã nguồn hơi khó nhìn. Chẳng hạn như khi dùng 2 render props  tưởng tượng `ReactRedux` và `ReactRouter`.

```javascript
class MyComponent extends React.Component {
  render() {
    return (
      <ReactRedux mapActions={actions} mapState={state}>
        {(state, actions) => (
          <ReactRouter>
            {router => (
              <a href={`/users/${state.users.current.id}`} onClick={router.handleLink}>
                View {state.user.current.username}
              </a>
            )}
          </ReactRouter>
        )}
      </ReactRedux>
    )
  }
}
```

Nếu phải thường xuyên dùng hơn 3 render props trong một component, khả năng cao là bạn nên tạo một component bao đóng (wrapper) cả 3 lại để hạn chế code bị trùng lắp.

### Kết luận

Render prop đem đến nhiều lợi thế hơn so với HOC khi giải quyết vấn đề tái sử dụng code trong React. Tuy vậy bạn cũng nên cân nhắc khi sử dụng, vì việc thay thế những HOC quen thuộc như  `connect()` của react-redux hay `withRouter()` của react-router có thể sẽ gây khó hiểu cho thành viên mới trong team của bạn.

#### Nguồn tham khảo

[1] Use a Render Props! -- Michael Jackson -- *https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce*

[2] I’m Breaking up with Higher Order Components. -- David Atchley -- *https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052*
