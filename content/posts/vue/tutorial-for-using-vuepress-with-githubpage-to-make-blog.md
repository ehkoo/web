---
layout: post.njk
title: Tạo web siêu dễ với VuePress và Github Pages
slug: static-web-vuepress-github-pages
date: 2019-02-23
tags: Vue, VueJS, VuePress, Blog, Github Pages
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1550909045/vuepress_tfaf8i.png
excerpt: "Nếu đã làm việc với Vue, đừng bỏ qua VuePress khi bạn muốn tạo blog, trang tài liệu hay bất cứ web tĩnh nào."
author: nqdai1992
editor: kcjpop, chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1550909045/vuepress_tfaf8i.jpg)

Gần đây mình có tìm hiểu cách tạo blog bằng Github Pages (GP). Mình bắt đầu bằng cách làm theo theo hướng dẫn trên trang chủ GP, và đúng là chỉ sau vài phút, bạn đã có ngay một trang web "coi cũng được". Tuy nhiên nhìn blog thiên hạ màu mè các kiểu làm mình cũng muốn xem cách thiết kế giao diện và trang trí cho website bắt mắt hơn thì gặp Jekyll. Jekyll đã có sẵn hỗ trợ cho GP, mỗi tội máy tính của bạn phải có Ruby mới dùng được. Mình thì không thích cài những gì mà cả năm mới dùng tới và nếu chỉ để phục vụ mỗi việc tạo blog thì cũng không đáng. Thế là mình mò thêm các giải pháp khác và bắt gặp VuePress. Vô tình mình cũng đang làm việc với Vue nên "sao lại không nhỉ?"

## VuePress là gì?

VuePress là một sản phẩm của Evan You, tác giả của Vue, với mục đích tạo web tĩnh (static webpages). Về căn bản website xây dựng bằng VuePress là một SPA trên nền của Vue, Vue Router, và webpack. VuePress giúp bạn đơn giản hoá việc thiết lập SSR bằng Nuxt, cùng ti tỉ thứ khác.

Những tính năng chính của VuePress bao gồm:

* Hỗ trợ Markdown ngay từ đầu
* Cho phép xây dựng theme bằng template của Vue
* Hỗ trợ Service Worker
* Tích hợp sẵn Google Analytics
* Hiển thị "Lần cập nhật gần nhất" dựa vào thông tin từ Git
* Hỗ trợ đã ngôn ngữ

Chi tiết hơn bạn có thể xem [ở đây](https://vuepress.vuejs.org/guide/#features).

## Cài đặt và chạy VuePress

Để bắt đầu, bạn cài đặt VuePress bằng npm:

```bash
$ mkdir blog
$ cd blog
$ npm init
$ npm install --save vuepress
```

Sau đó thêm vào `scripts` của `package.json` để chạy hai lệnh `dev` và `build`.

```json
{
  "scripts": {
    "dev": "vuepress dev",
    "build": "vuepress build"
  }
}
```

Chúng ta có thể kiểm tra thử quá trình cài đặt bằng cách chạy lệnh.

```bash
$ npm run dev

VuePress dev server listening at http://localhost:8080/
[18:50:15] ✔ successfully compiled.
```

Hãy thử truy cập vào [http://localhost:8080](http://localhost:8080) và kết quả là...

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/bo_1px_solid_rgb:eeeeee/v1550919592/gwq0kjncxuh49uqd4o8q.jpg)

Lý do là vì chúng ta chưa tạo tập tin markdown đóng vai trò làm trang chủ. Theo mặc định, VuePress sẽ đọc các tập tin `README.md` và chuyển thành `index.html` tương ứng. Do đó chúng ta sẽ tạo một file `README.md` ở thư mục gốc có nội dung như sau:

```md
---
home: true
---

# Hello VuePress
```

VuePress sẽ tự động compile lại khi có thay đổi xảy ra trong thư mục làm việc hiện tại. Thử vào trang [http://localhost:8080](http://localhost:8080), chúng ta sẽ thấy không còn lỗi 404 nữa.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/bo_1px_solid_rgb:eeeeee/v1550931526/zqnbda0jcgtf33zphcpy.jpg)


## Thiết lập cấu hình cho VuePress

Để tuỳ chỉnh VuePress, bạn cần một file `.vuepress/config.js`. Lúc đó cấu trúc thư mục của bạn sẽ như thế này.

```bash
.
├─ README.md
└─ .vuepress
│  └─ config.js
└─ package.json
```

Trong tập tin `config.js`, chúng ta có thể cấu hình được các thành phần cơ bản của trang web như:

* `title`: Tên website
* `description`: Giới thiệu về website
* `head`: Những tag sẽ được thêm vào phần HEAD của website
* `locales`: Thiết lập đa ngôn ngữ
* `ga`: ID của Google Analytics nếu bạn muốn tích hợp

```javascript
module.exports  =  {
  title: 'Tên blog',
  description: 'Mô tả về blog',
  locales:  {
    '/vi':  {
      lang:  'vi-VN',
      title:  'Tên blog tiếng việt',
      description:  'Mô tả tiếng việt'
    },
    '/en':  {
      lang:  'en-VN',
      title:  'Tên blog tiếng anh',
      description:  'Mô tả tiếng anh'
    }
  }
}
```

Bạn có thể xem danh sách đầy đủ các thiết lập của VuePress [ở đường dẫn này](https://vuepress.vuejs.org/config/#basic-config).

> Mách nhỏ: Bạn cũng có thể dùng YAML (config.yml) hay TOML (config.toml) để cấu hình VuePress.

VuePress sau khi được cài đặt đã kèm theo một giao diện mặc định. Cá nhân thì mình khá thích giao diện này, nhưng tùy mỗi người sẽ có những nhu cầu thay đổi khác nhau. Để thay đổi thiết lập cho giao diện mặc định, bạn thêm vào thuộc tính `themeConfig` trong tập tin `config.js`.

```js
module.exports  =  {
  themeConfig: {
    sidebar: 'auto' // Luôn hiển thị sidebar trong bài viết
    // Thiết lập các liên kế trên navbar
    nav: [
      { text: 'Trang Chủ', link: '/' },
      { text: 'Giới Thiệu', link: '/about/' },
      { text: 'Ehkoo', link: 'https://ehkoo.com' },
    ],
  }
}
```

Chi tiết hơn về các thiết lập của giao diện mặc định có thể xem [ở đây](https://vuepress.vuejs.org/theme/default-theme-config.html#homepage).

## Thêm bài viết mới

Cũng như các công cụ tạo web tĩnh khác, VuePress hỗ trợ [YAML front matter](https://jekyllrb.com/docs/frontmatter/), cho phép chúng ta khai báo các giá trị của một bài viết, chẳng hạn như tên bài, ngày khởi tạo, tên tác giả, tags, v.v...Phần front matter này sẽ được viết với cú pháp YAML, và đặt ở ngay đầu tập tin markdown.

Chúng ta có thể quy ước tất cả bài viết sẽ nằm trong thư mục `/posts`. Bạn tạo một tập tin `/posts/simple-post.md` có nội dung như sau:

```markdown
---
title: A Simple Post
---

# A Simple Post

## Lorem ipsum

Lorem ipsum dolor sit amet, legere mnesarchum sea ad, animal utamur dolores in his, per solet diceret rationibus no. Sit et timeam accusamus rationibus, no usu labitur bonorum constituto. Has delicata percipitur no, ut sit magna nulla sadipscing. Vis ad modo scaevola, ex vix delicata theophrastus deterruisset, an fabellas sensibus sed. Vim quaestio percipitur ne, modus ipsum saperet has cu. Ne nemore aliquid incorrupte eam, quo ad civibus interpretaris, per cu urbanitas deterruisset.

## Duis paulo utamur

Duis paulo utamur eu cum, suas luptatum dignissim est at. Ad duo dicat theophrastus, diceret aliquam te vis. Quo illum putant incorrupte id. Ea melius democritum consequuntur qui, in mea dicta dicant. Tollit copiosae voluptatibus mel te. Labore feugiat cu eos, ex primis iudicabit signiferumque quo.

Natum simul dolor ut sed, ut quod rationibus referrentur mea. Zril periculis eu sit. Eos ea audiam nusquam, ex eos paulo detraxit, has partem graeci ea. Per et possim cetero laoreet. No accusam fastidii vel. At eos esse solet, mentitum convenire an eos.

### Ut corpora

Ut corpora omnesque has, eam fugit splendide eu. Ad has assum possim, augue movet denique sed an, ne pro saperet prodesset. Ex vim fugit laboramus. Te sed tibique honestatis. Mei ad albucius quaestio, epicurei sententiae cum ne, nobis probatus recusabo pri ex. Alterum dissentiet in has, sea movet putent habemus ex, duo deleniti suscipiantur ei.

### An mea

An mea meis dolor, nam summo viris nominavi eu. Wisi justo nec eu, meis omnesque nam id. Ludus dicam duo et. Ut instructior consectetuer mei. Quot complectitur ex eum, quo fugit dissentiet ei, solum ridens apeirian mei et.
```

Sau đó truy cập vào [http://localhost:8080/posts/simple-post.html](http://localhost:8080/posts/simple-post.html) để xem kết quả. VuePress đã chuyển nội dung markdown thành HTML, đồng thời hiển thị một sidebar chứ đầu mục của các tiêu đề trong bài.


## Tạo trang nội dung tĩnh

Thông thường website sẽ có những trang nội dung tĩnh, chẳng hạn như "Giới thiệu", "Liên hệ", "Cộng tác", v.v...Chúng ta có thể tạo những trang như vậy và hiển thị đường dẫn đến chúng ở navbar của website. Chẳng hạn, bạn có thể tạo tập tin `/about/README.md` như sau:

```markdown
---
title: Giới thiệu
sidebar: false
---

# Giới thiệu

Không có gì cả
```

Sau đó, bạn thay đổi tập tin `config.js` và thêm `nav` vào thuộc tính `themeConfig`.

```js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Trang Chủ', link: '/' },
      { text: 'Giới Thiệu', link: '/about/' },
      { text: 'Ehkoo', link: 'https://ehkoo.com' },
    ],
  }
}
```

Trong ví dụ ở trên, mình thêm vào đường dẫn đến trang Giới thiệu, và một đường dẫn đến website ngoài. Bạn lưu ý là đường dẫn tới các routes trong ứng dụng phải kết thúc bằng `/`, chẳng hạn như `/about/`.

## Sử dụng Vue components

Một trong những điểm sáng của VuePress là cho phép bạn sử dụng các Vue components ngay trong tập tin markdown. Các components này sẽ được đặt ở thư mục `.vuepress/components` và chúng ta có thể sử dụng chúng ở bất cứ nơi nào. Bên trong mỗi component sẽ có một biến `$page` chứa các giá trị YAML front matter của tập tin markdown hiện tại. Ngoài ra còn có một biến `$site`, chứa các giá trị thiết lập trong `config.js`, cùng với một số giá trị đặc biệt khác.

Hãy thử tạo một component `all-posts.vue` chứa tất cả những bài viết đang có trong blog.

```js
// .vuepress/components/all-posts.vue
<template>
  <div>
    <p v-for="post in $site.pages.filter(p => p.path.includes('/posts'))">
      <router-link :to="post.path">{{ post.title }}</router-link>
    </p>
  </div>
</template>
```

Sau đó chúng ta khai báo sử dụng component này trong tập tin `/README.md`.

```markdown
---
home: true
---

# All Posts

<all-posts />
```

Kết quả là:

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/bo_1px_solid_rgb:eeeeee/v1551034876/x6qfn2h39xj95zuukzvp.jpg)


## Build và xuất bản lên Github Pages

Để build website thành các tập tin HTML, bạn chạy lệnh:

```bash
$ npm run build
```

Các tập tin HTML kết quả sản phẩm sẽ nằm trong thư mục `.vuepress/dist`. Nhưng để xuất bản lên Github Pages (GP) thì bạn phải thay đổi chút xíu. Theo hướng dẫn [ở đây](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages), nếu trong repository của bạn có thư mục `/docs` ở branch `master`, GP sẽ được trỏ đến thư mục đó. Do đó chúng ta sẽ chỉnh lại tập tin `config.js`.


```js
module.exports  =  {
  dest: 'docs'
}
```

Như vậy website được built ra sẽ nằm ở thư mục `/docs` thay vì `.vuepress/dist`. Sau đó bạn bật tính năng Github Pages cho repo bằng cách vào trang **Settings** - **GitHub Pages** - **Source** và chọn **master branch /docs folder** như hình.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/bo_1px_solid_rgb:eeeeee/v1551035145/dmpegfe5ubhjvuo75tlb.jpg)

## Tổng kết

Trên đây mình đã trình bày sơ lược các tạo blog bằng VuePress. Mình cũng có xem qua Gastby của React thì có thể do mình không quen nên cảm thấy khá sơ khai và có nhiều thứ phải làm lại hơn. Dù vậy quyền quyết định ở các bạn. Công nghệ không quan trọng, quan trọng là phù hợp với mục tiêu đề ra. Với tiêu chí đơn giản, nhanh gọn và code ít, mình chọn VuePress.

> Bạn có thể tham khảo mã nguồn của demo trong bài viết này tại [https://github.com/ehkoo/vuepress-demo](https://github.com/ehkoo/vuepress-demo). Đừng quên thả sao nhé ;)
