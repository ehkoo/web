---
layout: ../../layouts/Post.astro
title: 'Ghi chép về Advent of Code 2023'
date: 2023-12-02
updated: 2023-12-05
tags: JavaScript
excerpt: 'Những điều "hay ho" khi tham gia AoC năm 2023 bằng JavaScript'
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1701506775/ehkoo/photo-1606482512375-f18fa35048c6.jpg
author: kcjpop
figure:
  src: &cover
  alt: 'Lịch mùa Vọng bằng gỗ dành cho trẻ em'
  author:
    name: 'Elena Mozhvilo'
    url: https://unsplash.com/@miracleday
  credit:
    from: Unsplash
    url: https://unsplash.com/photos/pink-and-blue-plastic-bottle-on-brown-wooden-table-CwIOnANQW-A
---

Đến hẹn lại lên, chương trình [**Advent of Code**](https://adventofcode.com/2023) năm nay lại bắt đầu từ ngày 1.12 kéo dài đến 25.12. Mọi năm mình hay thử giải bằng một ngôn ngữ mới nhưng năm nay quyết định quay lại với JavaScript để xem có cần phải sử dụng tính năng gì đặc biệt của ngôn ngữ hay không.

Ngoài ra mình cũng sẽ thử học qua Parsing Expression Grammar (PEG) bằng cách dùng thư viện [`peggy`](https://peggyjs.org/). Mọi người nếu thấy mình viết chưa chuẩn thì để lại bình luận nhe.

## Ngày 01

Giữ chỗ thôi chứ chưa viết xong 😀

## Ngày 05

Sau mấy ngày viết đại viết đùa thì tới ngày 05 mình quyết định tạo project bằng `pnpm` và Node.js v18, và sắp xếp mọi thứ lại cho ngăn nắp hơn.

Để bắt đầu, mình chạy lệnh sau để tạo tập tin `package.json`.

```bash
$ pnpm init
```

Sau đó mình thêm thuộc tính `"type": "module"` vào `package.json`:

```json
{
  "type": "module",
  "engines": {
    "node": ">= 18"
  }
}
```

Khai báo này là để sử dụng ES Modules (cú pháp `import / export`) cho tất cả tập tin có đuôi `*.js`.

Dự án được sắp xếp như sau:

```
src/
├── day05.js
├── day05.test.js
├── helpers.js
└── input
    ├── day05.sample.txt
    └── day05.txt
```

Cũng khá dễ hiểu đúng không? Tập tin `helpers.js` chứa các hàm hỗ trợ như đọc tập tin, hay các tác vụ hay dùng.

### Sử dụng ES Modules trong Node.js

Mình nghĩ viết như vầy là được rồi, nhưng không 😱

```js
import { readFile } from './helpers'

const sample = readFile('./input/day05.sample.txt')
const input = readFile('./input/day05.txt')
```

Chạy thử thì văng lỗi.

```bash
$ node --watch src/day05.js

Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'/Users/an/code/advent-of-code/src/helpers'
imported from /Users/an/code/advent-of-code/src/day05.js
```

Ủa alô? Vô lý hết sức. File `helpers.js` rành rành ra đó mà báo "cannot find module" là sao. Thì ra nếu dùng ES Modules trong Node.js bạn phải kèm theo phần mở rộng khi import nữa.

```diff
-import { readFile } from './helpers'
+import { readFile } from './helpers.js'
```

Hơi mắc công một chút nhưng cũng không tới nỗi nào.

### Watch mode trong Node.js v18

Từ phiên bản 16, Node.js đã có chế độ theo dõi và chạy lại dòng lệnh khi tập tin thay đổi.

```bash
$ node --watch src/day05.js
```

Tính năng này hiện vẫn đang được thử nghiệm và chưa đạt được mức độ ổn định cấp độ 2, nhưng mình thử qua thấy khá ổn. Không cần thiết phải cài `nodemon` nữa rồi.

### Chạy tests trên Node.js v18

Cũng từ v16, Node.js có có đi kèm một [chương trình chạy test](https://nodejs.org/docs/latest-v18.x/api/test.html#test-runner). Ví dụ bạn có tập tin `day05.test.js` như sau:

```js
import test from 'node:test'
import assert from 'node:assert'

import { p1, p2, sample } from './day05.js'

test('Day 05', (t) => {
  assert.strictEqual(p1(sample), 35)
  assert.strictEqual(p2(sample), 46)
})
```

Bạn có thể chạy lệnh:

```bash
$ node --test
```

Ngon lành ở chỗ test runner sẽ tự động scan và chạy các tập tin có đuôi là `.test.(c|m)js`, hoặc có chữ `test-` trong tên, hoặc tất cả tập tin trong thư mục `test`. Các trường hợp này là thường gặp nhất rồi, chi tiết hơn bạn có thể [đọc ở đây](https://nodejs.org/docs/latest-v18.x/api/test.html#test-runner-execution-model).
