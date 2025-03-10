---
title: 'Tích hợp OpenProps vào dự án Astro'
date: 2022-09-07
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683356089/ehkoo/f630e798064c365211cd53162d28f213.jpg
tags:
  - Astro
  - OpenProps
  - PostCSS
  - Bài mì ăn liền
excerpt: 'Hay chính xác hơn là sử dụng PostCSS trong Astro như thế nào'
author: kcjpop
figure:
  src: &cover
  alt: 'Space Mosaic'
  author:
    name: 'Fábio Lobo'
    url: https://dribbble.com/fabiolobodesign
  credit:
    from: 'Dribbble'
    url: 'https://dribbble.com/shots/17111564--Space-Mosaic'
---

Bài này ngắn ngủn à 🥲

## Astro và OpenProps là gì?

Rần rần mấy nay, [Astro](https://astro.build) (lại) là một web framework mới. Điểm khác biệt so với NextJS hay Remix là Astro tập trung ưu tiên vào server-side rendering (SSR) trước, giúp giảm phần JavaScript được gửi xuống client. Sau đó đối với những phần cần tương tác trong ứng dụng (ví dụ như carousel, collapsible, etc.), Astro sẽ coi nó như một hòn đảo độc lập và render riêng. Hướng tiếp cận này gọi là _Component Islands_. Astro xịn ở chỗ cho phép bạn render component của bất cứ thư viện nào, dù đó là React, Vue, Solid, etc. vào các _hòn đảo_. Ehkoo sẽ có bài riêng về Astro sau này, đón đọc nhe.

Còn [OpenProps](https://open-props.style) là một tập hợp các biến CSS (_CSS variables_ hay _CSS custom properties_). OpenProps sử dụng bảng màu của [Open Color](https://yeun.github.io/open-color/), ngoài ra còn khai báo thêm những biến khác liên quan đến border, border radius, spacing, gradients, typography, animations, etc. Nói chung nhiều lắm 😃

Bạn có thể dùng các biến của OpenProps như thế này:

```css
.block-wrap {
  display: flex;
  flex-wrap: wrap;
  flex-basis: var(--size-content-2);
  gap: var(--size-5) var(--size-8);
  align-items: flex-start;
}
```

Vì khả năng rất cao là bạn không sử dụng hết tất cả biến CSS trong OpenProps nên chúng ta sẽ dùng thêm `postcss-jit-props`. Đây là một plugin của PostCSS giúp bạn quét hết tất cả stylesheets và loại bỏ những biến không được sử dụng. Kết quả cuối cùng sẽ làm tập tin CSS nhỏ gọn hơn 🥳

## Bắt đầu

Trước hết hãy tạo một dự án Astro căn bản bằng lệnh:

```bash
$ npm create astro@latest
```

Bạn có thể bỏ qua bước này nếu dự án đã có sẵn ha. Sau đó chúng ta cài `open-props` và `postcss-jit-props`.

```bash
$ npm install -S -E open-props postcss-jit-props
```

Chúng ta sẽ tạo một tập tin `postcss.config.js` tại thư mục gốc của dự án. Vì Astro dùng Vite bên dưới nên [PostCSS](https://docs.astro.build/en/guides/styling/#postcss) đã được hỗ trợ ngay từ đầu rồi.

```js
// postcss.config.js
const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')

module.exports = {
  plugins: [postcssJitProps(OpenProps)],
}
```

Sau đó chúng ta cần `import 'open-props'` vào `src/layouts/Layout.astro` nữa là xong.

```astro
---
import 'open-props'
// Còn đây là CSS chính cho toàn dự án
import '../styles/main.css'
---

<!DOCTYPE html>
<html lang="en">…</html>
```

> ⁉️ **Tại sao phải import vào Layout.astro mà không bỏ vào thư mục `public/` và dùng `<link />`?**
>
> Vì Astro sẽ bỏ qua việc xử lý, chuyển đổi, tối ưu các tập tin CSS trong thư mục `public/` nên chúng ta sẽ không tận dụng được `postcss-jit-props`. Cũng vì lý do này mà bạn nên đưa phần CSS mà bạn viết vào `src/`
>
> ```
> src/styles/
> ├── _normalize.css
> ├── _spacing.css
> └── main.css
> ```
>
> Nếu bạn dùng stylesheets của các thư viện khác như Bootstrap hay Bulma, và bạn biết chắc là mình không muốn chỉnh sửa gì chúng thì có thể bỏ vào `public/` ha.

## Kết quả

Nếu bạn thử inspect [demo ở đây 🔗](https://stackblitz.com/edit/github-z2hiyt?file=src/components/Card.css) sẽ thấy `:root` chỉ chứa những props được sử dụng trong `src/components/Card.css`. Hoặc bạn inspect Ehkoo cũng được 😉.

Chúng ta cũng có thể sử dụng những plugins khác của PostCSS, chẳng hạn như:

```js
// postcss.config.js
const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')

const plugins = [
  // Cho phép bạn import CSS từ node_modules, etc.
  // Lưu ý là plugin này luôn phải là plugin đầu tiên nhe.
  require('postcss-import'),
  require('postcss-custom-media'),
  require('postcss-calc'),
  require('postcss-each'),
  require('postcss-nested'),
  require('autoprefixer'),
  postcssJitProps(OpenProps),
]

module.exports = { plugins }
```

Hi vọng bạn thấy bài viết này hữu ích. Hẹn gặp lại 👋
