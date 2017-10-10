---
layout: post.njk
title: Thống nhất thiết lập giữa trình soạn thảo/IDE bằng EditorConfig
slug: thong-nhat-thiet-lap-giua-editor-ide-bang-editorconfig
date: 2014-04-17
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1507300408/tweet-editorconfig_lssmtc.png
tags: TextEditor, IDE, SublimeText, Atom, VSCode, vim, emacs
excerpt: EditorConfig giúp thiết lập một format chung cho tất cả các text editor và IDE, nhờ đó giúp nâng cao tính thống nhất, giúp việc đọc, hiểu và bảo trì code dễ dàng hơn.
author: kcjpop
---
![Imgur](http://i.imgur.com/hXZDHDI.png)
EditorConfig giúp thiết lập một format chung cho tất cả các text editor và IDE, nhờ đó giúp nâng cao tính thống nhất, giúp việc đọc, hiểu và bảo trì code dễ dàng hơn. 

### EditorConfig là gì?

Từ website của EditorConfig [http://editorconfig.org/](http://editorconfig.org/)
> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

> *EditorConfig giúp lập trình viên định nghĩa và duy trì một phong cách viết code thống nhất giữa các editor và IDE khác nhau. Dự án EditorConfig bao gồm một hướng dẫn định nghĩa các phong cách lập trình và tập hợp plugin cho các editor, giúp cho editor có thể đọc file thiết lập và thay đổi tương ứng. Tập tin EditorConfig dễ đọc và hoàn toàn phù hợp với các chương trình quản lý phiên bản.*

### Ví dụ

Dưới đây là một ví dụ của tập tin `.editorconfig`

``` 
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

### Sử dụng
Trước tiên cần cài đặt plugin EditorConfig cho text editor hay IDE của bạn. Danh sách các text editor/IDE có thể xem ở trang [http://editorconfig.org/#download](http://editorconfig.org/#download).

Bạn chỉ cần đặt file `.editorconfig` ở thư mục gốc của dự án, chương trình editor sẽ tự động nhận và thiết lập. Trong các thư mục con cũng có thể có file `.editorconfig` và file này sẽ đè lên file ở thư mục gốc.

Sau này, khi tạo file mới, chương trình text editor/IDE sẽ tự động đọc file `.editorconfig` và thiết lập style cho bạn.
