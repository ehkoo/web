---
layout: post.njk
title: 9+ thủ thuật giúp sử dụng Sublime Text 3 hiệu quả hơn
slug: sublime-text-3-tips-tricks
date: 2018-02-23
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519462144/img_qtzogc.jpg
tags: Thủ thuật, Sublime Text 3, Text Editor
excerpt: Sublime Text 3 vượt trội hơn các trình soạn thảo khác nhờ tốc độ nhanh và kho plugin hữu ích. Những thủ thuật "nhỏ mà có võ" dưới đây sẽ giúp bạn khai thác tối đa tiện ích của Sublime.
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519462144/img_qtzogc.jpg)

Sublime Text 3 là một trong những trình soạn thảo phổ biến nhất hiện nay. So với Atom hay VSCode, Sublime chiếm ưu thế hơn hẳn nhờ tốc độ nhanh, giao diện đơn giản, và có đầy đủ các tính năng mạnh mẽ. Để khai thác hết khả năng của Sublime, bạn nên lưu ý một số thủ thuật "nhỏ mà có võ" dưới đây.

Nhắn nhủ: [Package Control](https://packagecontrol.io/) là kho plugin dành riêng Sublime, bạn rất nên sử dụng để quản lý các phần mở rộng dễ dàng hơn. Để cài đặt Package Control, bạn có thể làm theo [hướng dẫn này](https://packagecontrol.io/installation).

## Tận dụng phím tắt

Dùng phím tắt để thực hiện tác vụ luôn nhanh hơn dùng chuột hay menu. Bạn không nhất thiết phải học thuộc lòng mọi phím tắt này, mà chỉ cần nhớ là chúng có tồn tại để dễ bề "lục lọi" khi cần.

| **Chung**                    |                                                                 |
| ---------------------------- | --------------------------------------------------------------- |
| Ctrl+Shift+P                 | Mở Command Prompt                                               |
| Ctrl+K, Ctrl+B               | Ẩn/hiện side bar                                                |
| **Chỉnh sửa**                |                                                                 |
| Ctrl+Shift+↑                 | Dịch chuyển dòng/vùng chọn lên 1 dòng                           |
| Ctrl+Shift+↓                 | Dịch chuyển dòng/vùng chọn xuống 1 dòng                         |
| Ctrl+L                       | Chọn dòng hiện tại, tiếp tục nhấn Ctrl+L để chọn dòng tiếp theo |
| Ctrl+D                       | Chọn một từ, tiếp tục nhấn Ctrl+D để chọn những từ giống vậy    |
| Ctrl+Shift+D                 | Nhân đôi dòng hiện tại                                          |
| Ctrl+M                       | Đi tới dấu đóng ngoặc gần nhất - Lặp lại để đi tới dấu mở ngoặc |
| Ctrl+Shift+M                 | Chọn toàn bộ nội dung trong dấu ngoặc                           |
| Ctrl+Shift+K                 | Xóa toàn bộ dòng                                                |
| Ctrl+]                       | Lùi dòng hiện tại vào trong 1 tab                               |
| Ctrl+[                       | Lùi dòng hiện tại ra ngoài 1 tab                                |
| Ctrl+/                       | Comment/Un-comment dòng/vùng chọn hiện tại                      |
| **Điều hướng/di chuyển**     |                                                                 |
| Ctrl+P                       | Mở nhanh file bằng tên                                          |
| Ctrl+R                       | Đi đến kí tự cần tìm                                            |
| Ctrl+;                       | Đi đến từ trong file hiện tại                                   |
| Ctrl+G                       | Đi đến dòng trong file hiện tại                                 |
| **Tìm kiếm và thay thế**     |                                                                 |
| Ctrl+F                       | Tìm                                                             |
| Ctrl+H                       | Thay thế                                                        |
| Ctrl+Shift+F                 | Tìm trong các file đang mở                                      |
| **Tabs**                     |                                                                 |
| Ctrl+Shift+T                 | Mở tab đã đóng gần nhất                                         |
| Ctrl+Tab                     | Di chuyển qua lại giữa các tab                                  |
| Ctrl+W                       | Đóng tab hiện tại                                               |
| Alt+[NUM]                    | Đi tới tab thứ [NUM]                                            |
| **Chia màn hình**            |                                                                 |
| Alt+Shift+[NUM](1<=[NUM]<=4) | Chia màn hình thành [NUM] cột                                   |
| Alt+Shift+5                  | Chia màn hình thành grid gồm 4 groups                           |
| Alt+Shift+8                  | Chia màn hình thành 2 hàng                                      |
| Ctrl+[NUM]                   | Đi tới group thứ [NUM]                                          |
| Ctrl+[NUM]                   | Chuyển file tới group thứ [NUM]                                 |
| **Bookmarks**                |                                                                 |
| Ctrl+F2                      | Bookmarks/Bỏ bookmarks                                          |
| F2                           | Đi tới bookmarks tiếp theo                                      |
| Shift+F2                     | Đi tới bookmarks trước                                          |
| Ctrl+Shift+F2                | Xóa tất cả bookmarks                                            |
| **Thao tác với văn bản**     |                                                                 |
| Ctrl+K, Ctrl+U               | Chuyển vùng chọn sang chữ in hoa                                |
| Ctrl+K, Ctrl+L               | Chuyển vùng chọn sang chữ thường                                |

## Tô màu mã nguồn với các gói mở rộng ngôn ngữ

Sau khi cài đặt, Sublime hỗ trợ đến hơn 50 ngôn ngữ lập trình. Tuy nhiên, nếu làm việc với Angular, Vue, React hay những framework/ngôn ngữ mới, bạn cần phải cài đặt thêm các phần mở rộng để Sublime có thể hiểu và tô màu mã nguồn. Tùy nhu cầu cụ thể mà bạn có thể tìm thấy plugin tương ứng trên Package Control. Ehkoo liệt kê dưới đây những plugin thông dụng nhất.

**Ngôn ngữ**

- [Babel (React)](https://packagecontrol.io/packages/Babel): bên cạnh hỗ trợ các tính năng mới trong ES6, ES7, plugin này cũng hỗ trợ tô màu cho JSX
- [Better CoffeeScript](https://packagecontrol.io/packages/Better%20CoffeeScript)
- [Flow](https://packagecontrol.io/packages/Flow)
- [TypeScript](https://packagecontrol.io/packages/TypeScript)

**Thư viện**

- [AngularJS](https://packagecontrol.io/packages/AngularJS)
- [Vue Syntax Highlight](https://packagecontrol.io/packages/Vue%20Syntax%20Highlight)
- [EmberScript](https://packagecontrol.io/packages/EmberScript)

## Emmet

Với lập trình viên front-end, [Emmet](https://packagecontrol.io/packages/Emmet) là plugin không thể thiếu rồi. Emmet cho phép bạn viết HTML "nhanh như chảo chớp" bằng cách dùng biểu thức mô tả HTML, sau đó Emmer sẽ mở rộng biểu thức này. Chẳng hạn, khi bạn viết `#content>p.text*5>lorem`, Emmet sẽ "úm ba la" thành:

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519453034/emmet_v6sguq.gif)

Không chỉ hỗ trợ làm việc với HTML, Emmet cũng biểu thức HTML bên trong JSX. Để tìm hiểu thêm về cách viết biểu thức, bạn có thể tham khảo [ở đây](https://docs.emmet.io/).

## Các gói snippets hữu ích

[JavaScript & NodeJS Snippets](https://packagecontrol.io/packages/JavaScript%20%26%20NodeJS%20Snippets), như tên gọi, bao gồm các snippets dành riêng cho JavaScript, giúp bạn gõ một đoạn mã thông dụng nhanh hơn. Ví dụ, thay vì gõ `document.querySelector('selector');`, bạn chỉ cần gõ `qs`, nhấn `Tab`, và Sublime sẽ làm phần việc còn lại giúp bạn. Hoặc `gi` như ví dụ dưới đây.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519453494/js_xjhiwe.gif)

Nếu thấy Emmet hơi phức tạp, bạn có thể sử dụng một plugin khác tương tự là [HTML Snippets](https://packagecontrol.io/packages/HTML%20Page%20Snippets). Plugin này có ít tính năng hơn, nhưng dễ sử dụng hơn.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541164603/e4f7dae026dace69b92b7fc96e8d6f7d2816d117_imqusj.jpg)

Bên cạnh đó, cũng đừng quên những gói snippets khi làm việc với các thư viện/framework, chẳng hạn như [ReactJS Snippets](https://packagecontrol.io/packages/ReactJS%20Snippets), [AngularJS Snippets](https://packagecontrol.io/packages/AngularJS%20Snippets), [VueJS Snippets](https://packagecontrol.io/packages/Vuejs%20Snippets)...

Với CSS, bạn chỉ cần cài [CSS Snippets](https://packagecontrol.io/packages/CSS%20Snippets) là có hỗ trợ CSS, LESS, SASS và Stylus.

## Định dạng mã nguồn

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519453811/6qtoxbb_j3y6mn.jpg)
Bằng cách sử dụng [HTMLBeautify](https://packagecontrol.io/packages/HTMLBeautify), [CSS Format](https://packagecontrol.io/packages/CSS%20Format), [Pretty JSON](https://packagecontrol.io/packages/Pretty%20JSON) hoặc [jsfmt](https://packagecontrol.io/packages/jsfmt), bạn có thể chọn tự động định dạng mã nguồn khi lưu files. Nếu là fan của [Prettier](https://prettier.io/), bạn đừng quên plugin [JsPrettier](https://packagecontrol.io/packages/JsPrettier).

## Canh hàng với Alignment

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519454084/align_my1rf8.gif)

[Alignment](https://packagecontrol.io/packages/Alignment) giúp bạn canh hàng khi khai báo nhiều biến. Không chỉ hoạt động trên JS, Alignment còn hỗ trợ PHP. Để tùy chỉnh plugin này, bạn có thể xem [hướng dẫn](https://www.granneman.com/webdev/editors/sublime-text/packages/how-to-install-and-use-sublime-alignment/).

## Loại bỏ khoảng trắng dư thừa bằng Trimmer

[Trimmer](https://packagecontrol.io/packages/Trimmer) giúp bạn loại bỏ những khoảng trắng thừa một cách nhanh chóng. Bên cạnh đó plugin này còn có tính năng Replace Smart Characters, giúp thay thế những ký tự đặc biệt như « thành `<<`.

## Dùng DocBlockr để viết tài liệu

Trong quá trình viết code, đôi khi chúng ta phải viết thêm tài liệu mô tả về hàm hay lớp đang xây dựng. Mục đích là để quá trình bảo trì ứng dụng dễ dàng hơn, các thành viên mới gia nhập team cũng dễ nắm bắt thông tin hơn. [Doc​Blockr](https://packagecontrol.io/packages/DocBlockr) là plugin giúp bạn viết những tài liệu này nhanh chóng, tiện lợi. Chỉ cần để con trỏ ở trước hàm hay phương thức, gõ `/**` và Tab, DocBlockr sẽ tự động nhận biết các tham số và giá trị trả về.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519395682/docblockr_sxcpwa.gif)

DocBlockr không chỉ hỗ trợ JavaScript mà còn dùng được với nhiều ngôn ngữ khác như PHP, CoffeeScript, TypeScript...

## Làm việc với git và GitHub

[Git](https://packagecontrol.io/packages/Git)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519455517/TQWRoYv_hkvkxr.jpg)

Plugin này giúp bạn sử dụng Git trực tiếp bên trong Sublime, bao gồm khá nhiều chức năng thông dụng, chẳng hạn như thêm files, tạo commits, xem logs... mà không cần rời khỏi trình soạn thảo.

[GitGutter](https://packagecontrol.io/packages/GitGutter)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519455495/BxmEwGr_oh5i02.jpg)

GitGutter theo dõi repo ở thư mục hiện tại, cho bạn biết trạng thái của mỗi dòng và mang đến một cái nhìn tổng quan về những thay đổi trong tập tin đang được chỉnh sửa.

[GitHubinator](https://packagecontrol.io/packages/GitHubinator)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541166878/3e8d982a16c2689eec272dfb39baf3f93585593c_mrzmme.jpg)

GitHubinator là một plugin cho phép bạn bôi đen code trong Sublime text, và hightlight đoạn code đó trên remote repo của Github (nếu như đoạn code đó tồn tại).

[Gist](https://packagecontrol.io/packages/Gist)
Gist cho phép bạn gửi đoạn code được chọn lên dịch vụ [Gist](https://gist.github.com) của Github.

## Linter

[Sublime Linter](https://packagecontrol.io/packages/SublimeLinter)

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1541164660/4433bce011a7db90487417bb2a4c7238fc178735_dzlc93.jpg)

Trong quá trình code, việc mắc phải những lỗi về cú pháp là không thể tránh khỏi. Plugin này cung cấp một nền tảng để các chương trình kiểm tra lỗi, ví dụ như ESLint, có thể được kết hợp vào Sublime. Sau khi cài đặt Sublime Linter, bạn cần cài riêng các gói [riêng cho từng ngôn ngữ](https://packagecontrol.io/search/sublime%20linter).

## Nâng cấp sidebar

[Side Bar Enhancements](https://packagecontrol.io/packages/SideBarEnhancements)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541164831/Untitled_axpvvt.jpg)

Sidebar mặc định của Sublime cung cấp số lựa chọn giới hạn để thao tác với tập tin hay tìm kiếm. Sử dụng plugin này, bạn sẽ có thêm khoảng 20 lựa chọn mới, bao gồm Open in browser, Duplicate, Refresh, Reveal...

## AdvancedNewFile

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519398149/newfile_jpp0in.gif)

[AdvancedNewFile](https://packagecontrol.io/packages/AdvancedNewFile) là plugin giúp tăng tốc tạo tập tin mới. Bạn chỉ cần nhấn `Ctrl + Alt + N` trong Windows, `Super + Alt + N` trong Mac/Linux để trực tiếp gõ đường dẫn đến tập tin mới. Và yên tâm, nếu tập tin nằm trong thư mục chưa tồn tại, thư mục mới sẽ được tạo ra luôn.

## Chọn màu nhanh với ColorPicker

[ColorPicker](https://packagecontrol.io/packages/ColorPicker)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541165047/Untitled_vdzcur.jpg)

Plugin này sẽ cho bạn một hộp thoại nhỏ để chọn màu từ bảng màu, hoặc bạn cũng có thể sử dụng Eye dropper để chọn màu từ bất kì vị trí nào trên màn hình của bạn.

[Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519462308/Xme7H5J_mjuw0d.gif)

Sử dụng plugin này, bạn có thể nhìn thấy trực quan những màu sắc tương ứng với mỗi giá trị màu như HEX, RGBA...ngay trong mã nguồn.

[Ghost​Text](https://packagecontrol.io/packages/GhostText)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541165396/b34dc4d3dfe0069426110bd1669198433961cd30_v1ar2e.png)

Đây là một plugin thực sự rất thú vị. Nó giúp bạn kết nối Sublime text đến một vùng text trên browser. Ví dụ, bạn có thể làm việc với CodePen, nhưng toàn bộ quá trình code của bạn sẽ được thực hiện trên Sublime text, và bạn có thể sử dụng tất cả những chức năng, plugin của Sublime text. Sau khi cài plugin này, bạn cần cài thêm extension cho browser.

### **Bonus**

[Emoji](https://packagecontrol.io/packages/Emoji)

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1541165193/undefined_zuii3s.jpg)

Sử dụng plugin này, bạn có thể chèn thêm emoji từ Command palette. Có lẽ không cần thiết lắm với những ai sử dụng Mac vì bạn có thể mở emoji panel bằng cách nhấn `Control + Command + Space` rồi.

## Kết

Với những plugin được giới thiệu ở đây, Ehkoo mong là sẽ giúp bạn nâng cao hiệu suất làm việc trong Sublime Text. Nếu bạn biết plugin nào hay ho, hãy chia sẻ ở phần bình luận phía dưới nhé!
