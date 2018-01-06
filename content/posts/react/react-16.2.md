---
layout: post.njk
title: React 16.2.0 tiếp tục cải tiến cho Fragments
slug: react-16-2-0-tiep-tuc-cai-tien-cho-fragments
date: 2017-11-29
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1516115630/react_paduom.png
tags: React, JavaScript
excerpt: React 16.2.0 giới thiệu tính năng Fragments, cho phép hàm `render()` trả về nhiều children cùng cấp mà không cần dùng mảng hay thẻ DIV dư thừa.
author: kcjpop
---

Nhóm phát triển React vừa công bố phiên bản 16.2.0, giới thiệu tính năng _Fragments_ cho phép hàm `render()` có thể trả về nhiều children mà không cần phải bao đóng trong thẻ DIV.

```javascript
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

### Fragments là gì?

Một trong những trường hợp thường gặp khi làm việc với React là hiển thị những elements có cùng cấp, chẳng hạn như vầy:

```html
Some text.
<h2>A heading</h2>
More text.
<h2>Another heading</h2>
Even more text.
```

Với React phiên bản trước 16.0, bắt buộc hàm `render` phải trả về một DOM element. Do đó chúng ta thường phải tạo thêm một thẻ bao đóng `DIV` hay `SPAN`.

```javascript
render() {
  return (
   <div>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </div>
  );
}
```

Thẻ bao đóng trên có thể đem đến nhiều vấn đề, chẳng hạn như tạo ra một lớp dư thừa, hay vỡ layout khi sử dụng flexbox. Trong phiên bản 16, React đã giải quyết giới hạn này bằng cách cho phép trả về một mảng các elements cùng cấp.

```javascript
render() {
 return [
  "Some text.",
  <h2 key="heading-1">A heading</h2>,
  "More text.",
  <h2 key="heading-2">Another heading</h2>,
  "Even more text."
 ];
}
```

Dẫu vậy cách làm này vẫn có những hạn chế như:

- Các phần tử văn bản trong mảng phải được đặt vào dấu nháy
- Các phần tử con phải có thuộc tính `key` nếu không muốn bị React "sửa lưng"
- Giữa các phần tử phải được phân cách bởi dấu phẩy

Và trên hết tất cả, hướng giải quyết này không đem lại cảm giác JSX "chính gốc".

Do đó, nhóm phát triển đã giới thiệu component `Fragment` để thay thế cho mảng. Bằng cách sử dụng Fragment, lập trình viên có thể dùng như một thẻ bao đóng, do đó, tạm biệt dấu phẩy, goodbye key và không hẹn ngày gặp dấu nháy.

```javascript
const Fragment = React.Fragment;

<Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</Fragment>

// hoặc
<React.Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</React.Fragment>
```

### Cú pháp cho Fragment trong JSX

Vì khả năng Fragment sẽ được dùng rất thường xuyên, nhóm phát triển React đã giới thiệu một cú pháp riêng cho nó trong JSX.

```javascript
render() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </>
  );
}
```

`<>` sẽ được chuyển đổi thành `<React.Fragment/>` khi ứng dụng được biên dịch. Cần lưu ý là bạn **KHÔNG THỂ** khai báo các thuộc tính cho `<>`, kể cả `key`. Do đó khi cần dùng keyed fragments, bạn phải nhờ tới component `Fragment`.

```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // React sẽ la làng nếu không có `key`
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      )}
    </dl>
  );
}
```

Tại thời điểm hiện tại, `key` là thuộc tính duy nhất `Fragment` có thể nhận. Trong tương lai có thể sẽ được hỗ trợ thêm các thuộc tính khác, chẳng hạn như các hàm xử lý sự kiện.

### Hỗ trợ cho `Fragment` từ các công cụ

#### Create React App

Thử nghiệm hỗ trợ cho cú pháp của Fragment sẽ được thêm vào Create React App trong vài ngày tới. Hỗ trợ hoàn chỉnh có lẽ cần nhiều thời gian hơn để hoàn thiện.

#### Babel

Hỗ trợ cho JSX fragment đã có mặt trong Babel v7.0.0-beta.31. Nếu bạn đang dùng Babel 7, chỉ cần cập nhật Babel lên phiên bản mới nhất và plugin của nó.

```bash
yarn upgrade @babel/core @babel/plugin-transform-react-jsx

npm update @babel/core @babel/plugin-transform-react-jsx
```

Hoặc nếu bạn dùng `react preset`.

```bash
yarn upgrade @babel/core @babel/preset-react

npm update @babel/core @babel/preset-react
```

Rất tiếc chưa có kế hoạch hỗ trợ fragment cho Babel 6, và có khả năng sẽ không có.

#### `webpack` và `babel-loader`

Bạn chỉ cần cập nhật Babel 7 là được rồi.

#### TypeScript

TypeScript đã hỗ trợ cú pháp fragment trong phiên bản 2.6.2.

```bash
yarn upgrade typescript

npm update typescript
```

#### Flow

Flow hỗ trợ cú pháp JSX fragment trong phiên bản 0.59.

```javascript
yarn upgrade flow-bin

npm update flow-bin
```

#### Prettier

Prettier sẽ hỗ trợ fragment trong phiên bản 1.9 sắp ra mắt.

#### ESLint

JSX fragment được hỗ trợ bởi ESLint 3.x khi được dùng chung với `babel-eslint`:

```
yarn add eslint@3.x babel-eslint@7

npm install eslint@3.x babel-eslint@7

// hoặc bạn có thể update
yarn upgrade eslint@3.x babel-eslint@7

npm update eslint@3.x babel-eslint@7
```

Đừng quên thêm dòng sau vào `.babelrc`:

```json
"parser": "babel-eslint"
```

### Tóm lại

Fragment không phải là thay đổi quá lớn trong React, nhưng có thể giải quyết vấn đề rất thường gặp trong React: trả về nhiều children cùng cấp.

Bạn có thể cài đặt React 16.2.0 bằng:

```bash
yarn add react@^16.2.0 react-dom@^16.2.0

npm install --save react@^16.2.0 react-dom@^16.2.0
```

hoặc dùng CDN:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```
