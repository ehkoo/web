---
layout: ../../layouts/Post.astro
title:
slug: html-form-elements-formdata
date: 2018-01-16
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1516254753/jLxMOZg_egcfqa.jpg
tags:
excerpt:
author: kcjpop
draft: true
---

## #TIL `HTMLFormElement.elements`

Thật ra là _biết_ cũng mấy bữa rồi mà giờ mới ghi lại. Đại loại khi làm form _"đơn giản"_ trong React thì chúng ta hay viết như thế này.

```js
const PLANS = [
  { value: '30-days', label: '30 days' },
  { value: '90-days', label: '90 days' },
  { value: 'lifetime', label: 'Lifetime' },
]

function FormRegister() {
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState(PLANS[0].value)

  const doSubmit = e => {
    e.preventDefault()
    const input = { plan, email }
    console.log(input)
  }

  return (
    <form onSubmit={doSubmit}>
      <label htmlFor="email">
        Email*
        <input
          type="email"
          id="email"
          name="email"
          placeholder="kcjpop@ehkoo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <fieldset required>
        <legend>Membership plan*</legend>
        {PLANS.map(item => (
          <label htmlFor={item.value} key={item.label}>
            <input
              required
              type="radio"
              id={item.value}
              name="plan"
              value={item.value}
              onChange={e => setPlan(e.target.value)}
              checked={item.value === plan}
            />
            {item.label}
          </label>
        ))}
      </fieldset>

      <button type="submit">Register</button>
    </form>
  )
}
```

Ở trên sử dụng `useState` và [controlled components](https://reactjs.org/docs/forms.html#controlled-components) để lưu lại các giá trị do người dùng nhập vào. Ở form này bạn không thực hiện các thao tác phức tạp hơn như validation, hay giá trị của input này phụ thuộc vào một input khác, v.v…Một cách khác là chúng ta có thể dùng `HTMLFormElement.elements` hoặc `FormData` trong hàm `doSubmit` để lấy hết các giá trị trong form.

### `HTMLFormElement.elements`

Thuộc tính [HTMLFormElement.elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) trả về một tập hợp các điều khiển (controls) trong form. Những điều khiển này bao gồm các thẻ `<button>`, `<fieldset>`, `<input>`, `<object>`, `<output>`, `<select>`, và `<textarea>`. Một ngoại lệ là thẻ `<input type="image">` không tính nhe, vì lý do lịch sử 🤷‍♂️. Bạn có thể truy xuất đến một điều khiển thông qua `name` hay `id` của nó. Như trong form ở trên.

```js
const doSubmit = e => {
  e.preventDefault()
  const plan = e.target.elements.plan.value
  const email = e.target.elements.email.value
  const input = { plan, email }
}
```

Các controls cũng có thể được truy xuất thông qua thứ tự nó xuất hiện trong form. Trích dẫn từ MDN.

> The form controls in the returned collection are in the same order in which they appear in the form by following a preorder, depth-first traversal of the tree. This is called **tree order**.

Khi thay đổi vị trí của một control thì thứ tự cũng có thể thay đổi. Do đó sử dụng `name` hay `id` vẫn là chắc ăn nhất.

### `FormData`

Nếu bạn muốn "một phát ăn luôn", gom hết tất cả giá trị trong form thì sao nè? Chúng ta có thể dùng `FormData`.

```js
const doSubmit = e => {
  e.preventDefault()
  const data = new FormData(e.target)
  const input = Object.fromEntries(data.entries())
  console.log(input)
}
```

### Kết

Code sau khi sửa lại.

```jsx
function FormRegister() {
  const doSubmit = e => {
    e.preventDefault()
    const input = Object.fromEntries(new FormData(e.target).entries())
    console.log(input)
  }

  return (
    <form onSubmit={doSubmit}>
      <label htmlFor="email">
        Email*
        <input
          type="email"
          id="email"
          name="email"
          placeholder="kcjpop@ehkoo.com"
          required
        />
      </label>

      <fieldset required>
        <legend>Membership plan*</legend>
        {PLANS.map(item => (
          <label htmlFor={item.value} key={item.label}>
            <input required type="radio" id={item.value} name="plan" />
            {item.label}
          </label>
        ))}
      </fieldset>

      <button type="submit">Register</button>
    </form>
  )
}
```

**🚨 LƯU Ý:** Dùng `form.elements` hay `FormData` rất tiện nếu bạn chỉ muốn thu thập dữ liệu người dùng nhập vào và chuyển qua nơi khác xử lý. Nếu muốn làm những thao tác phức tạp hơn, có lẽ bạn nên dùng `react-hook-form` hoặc `formik`.
