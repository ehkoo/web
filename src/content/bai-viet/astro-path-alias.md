---
title: 'Thiết lập path alias cho Astro'
date: 2022-09-07
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1683356089/ehkoo/f630e798064c365211cd53162d28f213.jpg
tags: Astro
excerpt: 'Hay chính xác hơn là sử dụng PostCSS trong Astro như thế nào'
author: kcjpop
draft: true
---

```js
import * as path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  },
})
```

```js
{
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
