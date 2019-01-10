
---
layout: post.njk
title: Hướng dẫn sử dụng Vuepress và Githubpage để tạo blog
slug: huong-dan-su-dung-vuepress-va-githubpage-de-tao-blog
date: 2019-01-03
tags: Vuejs, Vuepress, blog, github_page
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519195814/pirate_degmn3.jpg
excerpt: "Gần đây mình có tìm hiểu cách tạo blog bằng github page. Mình bắt đầu vọc từ document trên trang chủ của githupage, nói chung tạo một page tĩnh kiểu theo hướng dẫn thì trong vài phút (tùy tốc độ mạng). Tuy nhiên thì nhìn blog thiên hạ màu mè các kiểu nên mình cũng tìm hiểu cách trang trí thì gặp Jekyll. Đọc một hồi thì thấy Jekyll hộ trợ cho githubpage ..."
author: kcjpop
---

<img style="width: 400px; display: block; margin-right: auto; margin-left: auto;" src="https://vuepress.vuejs.org/hero.png">

# Hướng dẫn sử dụng Vuepress và Githubpage để tạo blog

Gần đây mình có tìm hiểu cách tạo blog bằng github page. Mình bắt đầu vọc từ document trên trang chủ của githupage, nói chung tạo một page tĩnh kiểu theo hướng dẫn thì trong vài phút (tùy tốc độ mạng). Tuy nhiên thì nhìn blog thiên hạ màu mè các kiểu nên mình cũng tìm hiểu cách trang trí thì gặp Jekyll. Đọc một hồi thì thấy Jekyll hộ trợ cho githubpage
mỗi tội tự nhiên bắt cài ruby mới dùng được mà mình thì không thích cái nhưng thứ mà cả năm mới dùng và
nếu cài chỉ để phục vụ mỗi việc tạo blog thì cũng không đáng. Vì vậy mình thử tìm hiểu các tạo blog bằng framework
mình hay làm việc là Vuejs và mình chọn Vuepress để vọc.

Vuepress là một sản phẩm nữa của tác giả EvanYou với mục đích tạo web tĩnh và có khả năng SEO,
chi tiết hơn thì bạn có thể đọc thêm ở [đây](https://vuepress.vuejs.org/guide/#features). Vì mình đang tập trung làm blog nên mình cũng không đào sâu chi tiết. Nhìn chung thì ấn tượng đầu tiên là doc của Vuepress vẫn còn
sơ sài và phải tốn khá nhiều thời gian để mò mẫm.

## Cài đặt và chạy Vuepress
Mình bắt đầu với việc tải Vuepress bằng npm:

```bash
$ mkdir blog
$ cd blog
$ npm init
$ npm install --save vuepress
```
vì không có sẵn CLI như Vue nên các anh em sẽ cần thêm chút command trong `package.json` để chạy được chế độ dev và build

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
Anh em chạy thử môi trường dev để kiểm tra luôn
```bash
$ npm run docs:dev
```
sau khi chạy xong thì terminal sẽ bào
```bash
  VuePress dev server listening at http://localhost:8080/
  [18:50:15] ✔ successfully compiled.
```
Anh em truy cập `http://localhost:8080/` sẽ thấy `404 not found`,
vì chúng ta chưa chỉ định nội dung mặc định cho trang.
Trong Vuepress, các trang `README.md` sẽ được chuyển thành `index.html` trong các thư mục.
Vì vậy chúng ta chỉ cần tạo thư mục `docs` và thêm `README.md` và thử lại.
Chú ý mọi động tác đều thực hiện trong thư mục docs Vuepress sẽ compile từ thư mục này ra.

Vậy là xong chế độ dev, chuyển sang chế độ build kiểm tra
```bash
$ npm run docs:build
```
sản phẩm sẽ được đặt trong thư mục `.vuepress` (một thư mục ẩn), chúng ta có thể truy cập thư mục này như bình thường
```
$ cd .vuepress
```
Vậy là việc tạo một trang web tĩnh cơ bản bằng Vuepress chỉ gồm các bước như vậy

## Thay đổi cấu hình  
Về cơ bản thì mình khá thích style và cấu trúc mặc định rồi tuy nhiên thi tùy từng cá nhân sẽ có những nhu cầu khác nhau. Để cấu hình được các bạn sẽ cần 1 file `config.js` đặt trong thư mục `.vuepress`.  Trong file này mọi người có thể cấu hình được các thành phần cơ bản của page như **title**, **description**, **head** hay những biến số liên quan đến việc deploy như **host**, **post** và những tính năng thường gặp như đa ngôn ngữ thông qua tham số **locales** hay thậm chí cả **ga**(Google Analytics) cũng khá đầy đủ và dễ dàng cài cắm. Trong số các config mình mới thử tạo đa ngôn ngữ và đúng là dễ thật.

Trên đây là những config liên quan đến cấu trúc page và các chức năng những thành phần tiểu tiết hơn các anh em sẽ cần config trong **themeConfig**, chắc nghe hơi khó hình dung dưới đây là mẫu 1 file config
```javascript
module.exports  =  {
	title:  'Tên blog',
	description:  'Mô tả về blog',
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
	themeConfig: {
		//Cái gì config chi tiết bỏ vào đây
	}
}
```
Chi tiêt config được những gì thì các bạn có thể tham khảo ở [đường dẫn này](https://vuepress.vuejs.org/theme/default-theme-config.html#homepage) 

Ngoài ra anh em cũng có thể thay đổi style (vuepress sử dụng mặc định là stylus) hay các điều chỉnh liên quan đền file markdown chi tiết tại đây [xem thêm](https://vuepress.vuejs.org/config/#basic-config)

## Cấu trúc file markdown
Cấu trúc file markdown sẽ chia là 2 phần chính là phần nội dung viêt bằng markdown và phần thông tin về page cấu trúc 1 page sẽ như sau
```markdown
---
title:  tiêu đề bài viết
abstract:  tóm tắt bài viết
createdAt:  ngày tạo
sidebar: auto (có sử dụng sidebar để tra đề mục)
sidebarDepth:  2 (chỉ lấy 2 tầng đề mục đầu tiên tức là header 1 và 2)
meta: (ghi tạp nham vào đây được miễn là theo cặp name, content)
 - name: key
   content: value
---
## Nội dung chính viết ở đây
```
Vậy tại sao cần đống thông tin về page, nếu làm blog thì khá cần nhé cần để biết được ngày tạo bài viết, để biết tiêu đề hay các tag, thông tin thêm để từ đó có thể tạo ra dữ liệu động trên trang chủ

## Tạo trang chủ bằng component
Dù sao vuepress cũng là dùng vue nên việc sử dụng các component vue là hoàn toàn có thể. Thậm chí nếu các anh em có đủ kiên nhân có thể đập hết giao diện đi làm lại nếu ai thích sáng tạo thì chi tiết thay đổi thế nào thì xem ở đây nhé [xem thếm](https://vuepress.vuejs.org/theme/writing-a-theme.html#directory-structure). Cá nhân mình chỉ cần trang chủ để giới thiệu các bài viết thì mình chỉ cần tạo 1 component là được.

Để tại component trong vuepress thì các bạn cần tạo 1 thư mục ```components``` trong ```.vuepress``` và các component trong này sẽ tư động để global. Tiếp đến để dùng component này thành trang chủ thì các bạn chỉ cần thêm vào file ```README.md``` ngoài cùng như sau:
```markdown
---

layout:  HomeLayout

meta:

-  name:  description

   content:  Share knownlege about web programing

-  name:  keywords

   content:  Vuejs, Vuepress, Javascript, HTML, CSS, Design_Pattern, Front-end

---

<HomeLayout />
```

Còn cách tạo components thì các anh em tìm hiểu Single Component trong vue để viết nhé cái này thì tùy mỗi người. Mình chỉ lưu ý với mọi người là các thông tin tin của 1 page sẽ nào trong thuộc tính ```$site.pages``` trong component Vue tổng.

## Đưa sản phẩm lên githubpage

Đưa sản phẩm lên thì đã có [hướng dẫn](https://vuepress.vuejs.org/guide/deploy.html#github-pages) chi tiết trong trang chủ rồi.
Bạn chỉ cần tạo file `.sh` đối với Unix và `bash` đối với Window là xong.
Khi chạy thì với nhưng bạn dùng Unix như mình sẽ gặp một số vấn đề sau.
Vấn đề thứ nhất là phân quyền để chạy được file `.sh` bạn sẽ cần phân quyên theo lệnh `chmod 755` để cho phép file `.sh` quyền đọc và thực thi.
Vấn đề thứ 2 bãn sẽ gặp phải đó là không thể push code lên git được, để giải quyết cấn đề này các bạn cần tạo một sha key trong máy (theo [hướng dẫn](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#generating-a-new-ssh-key))
sau đó bạn lấy key trong file `id_rsa.pub` thêm vào tài khoản git (theo [hướng dẫn](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/))

## Tông kết
Trên đây mình đã trình bày sơ lược các tạo blog bằng vuepress. Cá nhân mình thấy việc sử dụng vuepress khá đơn giản và gọn nhẹ cho các bạn muốn làm blog nhanh, mình cũng có xem thử cách làm Gastby của React thì có thể do không quen nhưng mình cảm thấy khá sơ khai và mọi người sẽ phải làm lại nhiều thứ hơn tất nhiên độ tùy biến sẽ cao hơn. Dù vậy quyền quyết định ở các bạn làm bằng gì không quan trọng, quan trọng là phù hợp với mục tiêu của mình, với mình thì nhanh gọn và code ít :D nên mình chọn vuepress
