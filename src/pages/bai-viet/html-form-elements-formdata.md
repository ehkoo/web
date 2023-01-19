---
layout: ../../layouts/Post.astro
title: 'Xử lý form với `HTMLFormElement.elements`'
date: 2023-01-30
cover: https://images.unsplash.com/photo-1554224155-cfa08c2a758f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1726&q=80
excerpt: ''
tags: HTML, React, Bài mì ăn liền
author: kcjpop
draft: true
---

![](https://images.unsplash.com/photo-1554224155-cfa08c2a758f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1726&q=80)

_Hình chụp bởi [Kelly Sikkema](https://unsplash.com/@kellysikkema). Nguồn: [Unsplash](https://unsplash.com/photos/8DEDp6S93Po)_

Đại loại khi làm form _"đơn giản"_ trong React thì chúng ta hay viết như thế này.

```js
const PLANS = [
  { value: '30-days', label: '30 days' },
  { value: '90-days', label: '90 days' },
  { value: 'lifetime', label: 'Lifetime' },
]

function FormRegister() {
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState(PLANS[0].value)

  const doSubmit = (e) => {
    e.preventDefault()
    const payload = { plan, email }
    console.log(payload)
  }

  return (
    <form onSubmit={doSubmit}>
      <label htmlFor="email">
        Email*
        <input
          type="email"
          name="email"
          placeholder="hi@local.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <fieldset required>
        <legend>Membership plan*</legend>
        {PLANS.map((item) => (
          <label htmlFor={item.value} key={item.label}>
            <input
              required
              type="radio"
              name="plan"
              value={item.value}
              onChange={(e) => setPlan(e.target.value)}
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

Ở trên sử dụng `useState` và [controlled components](https://reactjs.org/docs/forms.html#controlled-components) để lưu lại các giá trị do người dùng nhập vào. Ở form này bạn không thực hiện các thao tác phức tạp hơn như validation, hay giá trị của input này phụ thuộc vào một input khác, v.v… Khi người dùng gửi (submit) form, chúng ta sẽ dùng hai states `email` và `plan` để tạo payload.

### Sử dụng `HTMLFormElement.elements`

Một cách khác là chúng ta có thể dùng `HTMLFormElement.elements` trong hàm `doSubmit`.

Thuộc tính [HTMLFormElement.elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) trả về một tập hợp các điều khiển (controls) trong form. Những điều khiển này bao gồm các thẻ `<button>`, `<fieldset>`, `<input>`, `<object>`, `<output>`, `<select>`, và `<textarea>`. Một ngoại lệ là thẻ `<input type="image">`, vì lý do lịch sử (MDN nói vậy, còn cụ thể ra sao thì mình cũng không biết 🤷‍♂️).

Bạn có thể truy xuất đến một điều khiển thông qua `name` hay `id` của nó. Chẳng hạn với form ở trên, chúng ta sẽ làm như sau:

```js
const doSubmit = (e) => {
  e.preventDefault()

  // `e.target` lúc này chính là `HTMLFormElement`
  const plan = e.target.elements.plan.value
  const email = e.target.elements.email.value

  const payload = { plan, email }
  console.log(payload)
}
```

Các controls cũng có thể được truy xuất thông qua thứ tự nó xuất hiện trong form. Trích dẫn từ MDN.

> The form controls in the returned collection are in the same order in which they appear in the form by following a preorder, depth-first traversal of the tree. This is called **tree order**.

Khi thay đổi vị trí của một control thì thứ tự cũng có thể thay đổi. Do đó sử dụng `name` hay `id` vẫn là chắc ăn nhất.

### Hoặc `FormData`

Nếu bạn muốn "một phát ăn luôn", gom hết tất cả giá trị trong form thì sao? Chúng ta có thể dùng `FormData`.

```js
const doSubmit = (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const input = Object.fromEntries(data.entries())
  console.log(input)
}
```

### Kết

`FormRegister` sau khi sửa lại trông ngắn gọn và đẹp hơn hẳn.

```jsx
function FormRegister() {
  const doSubmit = (e) => {
    e.preventDefault()
    const input = Object.fromEntries(new FormData(e.target).entries())
    console.log(input)
  }

  return (
    <form onSubmit={doSubmit}>
      <label htmlFor="email">
        Email*
        <input type="email" name="email" placeholder="hi@local.dev" required />
      </label>

      <fieldset required>
        <legend>Membership plan*</legend>
        {PLANS.map((item) => (
          <label htmlFor={item.value} key={item.label}>
            <input required type="radio" name="plan" />
            {item.label}
          </label>
        ))}
      </fieldset>

      <button type="submit">Register</button>
    </form>
  )
}
```

**🚨 LƯU Ý:** Dùng `form.elements` hay `FormData` rất tiện nếu bạn chỉ muốn thu thập dữ liệu và chuyển qua nơi khác xử lý. Nếu muốn làm những thao tác phức tạp hơn, có lẽ bạn nên dùng `react-hook-form` hoặc `formik`.
