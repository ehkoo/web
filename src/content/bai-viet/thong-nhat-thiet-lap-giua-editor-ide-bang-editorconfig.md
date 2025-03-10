---
title: Thống nhất thiết lập giữa trình soạn thảo/IDE bằng EditorConfig
slug: thong-nhat-thiet-lap-giua-editor-ide-bang-editorconfig
date: 2018-04-05
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522931819/rzEmfCM_gi7afh.jpg
tags:
  - Trình soạn thảo
  - IDE
  - SublimeText
  - Atom
  - VSCode
  - vim
  - emacs
  - Thủ thuật
excerpt: EditorConfig giúp thiết lập format chung cho tất cả các text editor và IDE; nhờ đó giúp nâng cao tính thống nhất, dễ đọc, hiểu và bảo trì code hơn.
author: kcjpop
---

![Imgur](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1507300408/tweet-editorconfig_lssmtc.jpg)
Mỗi dự án lại có một thiết lập format riêng, cái xài tab, cái thì dùng space. Chưa hết, cũng là space, nhưng ví dụ như JavaScript files chỉ dùng 2, còn PHP files thì dùng tới 4 spaces @.@

Đừng bối rối! ^^' Hãy thử dùng EditorConfig để thiết lập format chung cho tất cả các text editor và IDE xem sao. Nó sẽ giúp nâng cao tính thống nhất, để dễ đọc, hiểu và bảo trì code hơn đấy.

### EditorConfig là gì?

Trích từ website của EditorConfig [http://editorconfig.org/](http://editorconfig.org/)

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

> _EditorConfig giúp lập trình viên định nghĩa và duy trì một phong cách viết code thống nhất giữa các editor và IDE khác nhau. Dự án EditorConfig bao gồm một hướng dẫn định nghĩa các phong cách lập trình và tập hợp plugin cho các editor, giúp cho editor có thể đọc file thiết lập và thay đổi tương ứng. Tập tin EditorConfig dễ đọc và hoàn toàn phù hợp với các chương trình quản lý phiên bản._

### Ví dụ

Dưới đây là một ví dụ của tập tin `.editorconfig`

```ini
# EditorConfig is awesome: http://EditorConfig.org

# Đây là file thiết lập gốc
root = true

# Newline theo chuẩn Unix và luôn có dòng mới ở cuối file
[*]
end_of_line = lf
insert_final_newline = true

# Đối với các tập tin Python thì dùng 4 khoảng trắng
[*.py]
indent_style = space
indent_size = 4

# Với các tập tin JavaScript thì dùng tab, không quy định size
[*.js]
indent_style = tab

# Nhưng với các tập tin JavaScript trong thư mục lib thì dùng 2 khoảng trắng
[lib/**.js]
indent_style = space
indent_size = 2

# Đối với tập tin package.json hoặc .travis.yml thì dùng 2 khoảng trắng
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

### Cách dùng

Trước tiên, cần cài đặt plugin EditorConfig cho text editor hay IDE của bạn. Danh sách các text editor/IDE có thể xem ở trang [http://editorconfig.org/#download](http://editorconfig.org/#download).

Bạn chỉ cần đặt file `.editorconfig` ở thư mục gốc của dự án, chương trình editor sẽ tự động nhận và thiết lập. Trong các thư mục con cũng có thể có file `.editorconfig` và file này sẽ đè lên file ở thư mục gốc.

Sau này, khi tạo file mới, chương trình text editor/IDE sẽ tự động đọc file `.editorconfig` và thiết lập style cho bạn.

### Kết

Bạn đã dùng EditorConfig chưa? Trải nghiệm của bạn như thế nào? Hãy cùng chia sẻ với Ehkoo ở phần bình luận phía dưới nhé!

#### Ngoài lề một chút về hình minh họa của bài viết này

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1522932790/latest_mhcoyu.jpg)

> Hình minh họa hiển thị ngoài trang chủ cho bài này được lấy từ tác phẩm [Mouse Guard](https://www.wikiwand.com/en/Mouse_Guard) của David Petersen. Truyện lấy bối cảnh thời Trung cổ, kể về Hội Hiệp sĩ Chuột có nhiệm vụ bảo vệ sự bình yên cho loài chuột dưới nanh vuốt của bè lũ săn mồi như rắn, chồn, hay cú đêm... Logo của EditorConfig là một chú chuột cưỡi chim, ngoài ra nhiệm vụ của EditorConfig là giúp bảo vệ (và thống nhất) config giữa các dự án với nhau, cũng coi như đem lại yên bình cho dev vậy ^^ Chính vì điểm tương đồng này mà Ehkoo chọn Mouse Guard làm hình minh họa cho EditorConfig đó ahihi
