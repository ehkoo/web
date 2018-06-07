---
layout: post.njk
title: 10+ giao diện đẹp xuất sắc cho Sublime Text 3
slug: 10-giao-dien-theme-dep-xuat-sac-cho-sublime-text-3
date: 2018-06-03
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1519462144/img_qtzogc.jpg
tags: Thủ thuật, Sublime Text 3, Themes, Text Editor
excerpt: ""
author: nguyenhaiduc06
editor: kcjpop, chubbyanh
draft: true
---

Bên cạnh kho plugin đồ sộ thì Sublime Text 3 cũng hấp dẫn người sử dụng bởi vô vàn giao diện bắt mắt và thân thiện. Cùng xem những theme và color scheme nào đáng được dùng nhất nhé.

**Bạn đừng bỏ qua: [9+ thủ thuật giúp sử dụng Sublime Text 3 hiệu quả hơn](https://ehkoo.com/bai-viet/sublime-text-3-tips-tricks)**

#### Ủa nhưng bạn đã biết cài đặt và thay đổi giao diện trong Sublime Text chưa?

Trước hết, hãy chắc chắn bạn đã cài đặt [Package Control](https://packagecontrol.io/installation). Sau đó, bạn làm theo các bước sau:

1.  Nhấn `Ctrl + Shift + P` trên Windows/Linux hoặc `Cmd + Shift + p` với Mac để mở Command Palette
2. Tìm và chọn `Package Control: Install Package`, nhấn Enter
3. Nhập vào tên theme cần cài đặt, nhấn Enter

Sau khi cài đặt xong, bạn có thể thiết lập giao diện bằng cách mở Command Palette, tìm và chọn`Preferences - Settings`. Ở tab `Preferences.sublime-settings - User` bên phải, bạn thay đổi giá trị thuộc tính `theme`  bằng tên giao diện muốn đổi. Ví dụ:

```json
{
    // Thay đổi giao diện
    "theme": "Boxy Monokai.sublime-theme",
}
```

Lưu ý: Mỗi giao diện -- **theme** sẽ có thể có nhiều mẫu màu -- **color scheme** khác nhau. Để thay đổi mẫu màu, bạn thay đổi thuộc tính `color_scheme`.

```json
{
    // Thay đổi mẫu màu
    "color_scheme": "Packages/Boxy Theme/schemes/Boxy Monokai.tmTheme",
}
```

Hoặc bạn có thể thay đổi giao diện và mẫu màu một cách trực quan hơn bằng cách mở Command Palette và tìm đến `UI: Select Theme` hoặc `UI: Select Color Scheme`

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1528051401/rYYVNwv_vcddyf.png)

Còn bây giờ thì mời bạn thưởng lãm những giao diện được Ehkoo tuyển chọn nhé.

### Predawn

Một trong những theme đẹp và được tải nhiều nhất hiện nay, [Predawn](https://packagecontrol.io/packages/Predawn) có mẫu màu tối và đi kèm vài tùy chọn cho phép thay đổi kích thước của sidebar và tab.

![](https://packagecontrol.io/readmes/img/bed33bfef41e7ae64086cc47ec88c6b1abd08b0f.png)

Cài đặt

```json
{
  "theme": "predawn.sublime-theme",
  "color_scheme": "Packages/Predawn/predawn.tmTheme",
}
```


### Materialize

Dựa trên hệ thống thiết kế Material Design của Google, [Materialize](https://packagecontrol.io/packages/Materialize) là một giao diện tối, có đi kèm một số mẫu màu và thiết lập. Điều đáng tiếc là giao diện này đã không còn được phát triển tiếp nữa.

![](https://packagecontrol.io/readmes/img/d7e771c4b9966da6731bc57df6c2fbb317780556.png)


Cài đặt

```json
{
  // Materialize
  "theme": "Materialize-Theme.sublime-theme",
  "color_scheme": "Packages/Materialize/schemes/Material Brogrammer.tmTheme",
}
```

### Seti UI

Là một bản port của giao diện Seti cho Atom, [Seti UI](https://packagecontrol.io/packages/Seti_UI) trên vẫn giữ được tinh thần của phiên bản gốc: giao diện tối đi kèm với 7 mẫu màu. Seti UI hỗ trợ khá nhiều tùy chỉnh mà bạn có thể tham khảo trong trang chủ của nó.

![](https://packagecontrol.io/readmes/img/a71e34c2a47ecd2afd719a2dc9f70e38d2a0d69c.png)


Cài đặt

```json
{
  // Seti_UI
  "theme": "Seti_UI-Theme.sublime-theme",
}
```


### Afterglow
[Afterglow](https://yabatadesign.github.io/afterglow-theme/) là một giao diện tối được thiết kế khá chi tiết, với các tính năng nổi bật như:

* 3 chiều cao tab khác nhau
* Hỗ trợ markdown
* Tùy chỉnh nhiều màu sắc khác nhau

![](https://packagecontrol.io/readmes/img/a71e34c2a47ecd2afd719a2dc9f70e38d2a0d69c.png)


Cài đặt

```json
{
  // Afterglow
  "theme": "afterglow.sublime-theme",
}
```

### Darkmatter

Giao diện [Darkmatter](https://github.com/patrickemuller/Sublime-Darkmatter-Theme) nổi bật với màu xanh neon chủ đạo.

![](https://raw.githubusercontent.com/patrickemuller/Sublime-Darkmatter-Theme/master/Screenshots/darkmatter.png)


Cài đặt

```json
{
  // Darkmatter
  "theme": "Darkmatter.sublime-theme",
  "color_scheme": "Packages/Theme - Darkmatter/Darkmatter.tmTheme",
}
```


### Arc dark

[Arc dark](https://github.com/GarthTheChicken/Sublime-Text-3-Arc-Dark-theme)

![](https://raw.githubusercontent.com/GarthTheChicken/Sublime-Text-3-Arc-Dark-theme/master/arc-dark.png)


Cài đặt

```json
{
  // Arc dark
  "theme": "Arc-Dark-Master.sublime-theme",
  color_scheme": "Packages/User/Arc-Dark/schemes/Arc.tmTheme,
}
```

### Dracula

[Dracula](https://github.com/dracula/dracula-theme) là một dự án không chỉ cung cấp giao diện tối cho Sublime mà còn cho cả các trình soạn thảo khác như Atom, VSCode...

![](https://draculatheme.com/assets/img/screenshots/sublime.png)

### Boxy

[Boxy](https://packagecontrol.io/packages/Boxy%20Theme) là một trong những theme có khả năng tùy chỉnh nhiều nhất, cung cấp 6 giao diện với nhiều mẫu màu khác nhau.


Cài đặt

```json
{
  // Boxy Monokai
  "theme": "Boxy Monokai.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Monokai.tmTheme",
}

{
  // Boxy Nova
  "theme": "Boxy Nova.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Nova.tmTheme",
}

{
  // Boxy Ocean
  "theme": "Boxy Ocean.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Ocean.tmTheme",
}

{
  // Boxy Solarized Dark
  "theme": "Boxy Solarized Dark.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Solarized Dark.tmTheme",
}

{
  // Boxy Solarized Light
  "theme": "Boxy Solarized Light.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Solarized Light.tmTheme",
}

{
  // Boxy Tomorrow
  "theme": "Boxy Tomorrow.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Tomorrow.tmTheme",
}

{
  // Boxy Yesterday
  "theme": "Boxy Yesterday.sublime-theme",
  "color_scheme": "Packages/Boxy Theme/schemes/Boxy Yesterday.tmTheme",
}
```

### Ayu

Đơn giản mà hiện đại, [Ayu](https://github.com/dempfi/ayu) là một trong số những giao diện đẹp nhất dành cho Sublime Text. Bao gồm 3 themes: Ayu light, Ayu mirage, và Ayu dark.

![](https://camo.githubusercontent.com/c69b7f43f42cf3135f3f0f1c7a7e04f57762daf2/68747470733a2f2f692e696d6775722e636f6d2f7051516649696f2e706e67)

Cài đặt

```json
{
  // Ayu light
  "theme": "ayu-light.sublime-theme",
  "color_scheme": "Packages/ayu/ayu-light.tmTheme",
}

{
  // Ayu migrate
  "theme": "ayu-mirage.sublime-theme",
  "color_scheme": "Packages/ayu/ayu-mirage.tmTheme",
}

{
  // Ayu dark
  "theme": "ayu-dark.sublime-theme",
  "color_scheme": "Packages/ayu/ayu-dark.tmTheme",
}
```


### Agila

[Agila](https://packagecontrol.io/packages/Agila%20Theme) đi kèm theo 7 mẫu màu.


### Spacegray
Một trong những giao diện được ưa chuộng nhất trong cộng đồng, [Spacegray](https://packagecontrol.io/packages/Theme%20-%20Spacegray) kèm theo 3 giao diện: Dark, Light, và Eighties.

![](https://packagecontrol.io/readmes/img/a0b57c3d90be54892fa645dab621920bfe69ca7e.png)

Cài đặt

```json
{
  // Spacegray
  "theme": "Spacegray.sublime-theme",
  "color_scheme": "Packages/Theme - Spacegray/base16-ocean.dark.tmTheme"
}

{
  // Spacegray light
  "theme": "Spacegray Light.sublime-theme",
  "color_scheme": "Packages/Theme - Spacegray/base16-ocean.light.tmTheme"
}

{
  // Spacegray Eighties
  "theme": "Spacegray Eighties.sublime-theme",
  "color_scheme": "Packages/Theme - Spacegray/base16-eighties.dark.tmTheme"
}
```

### Numix Theme

Dựa vào giao diện Numix dành cho GTK, [Numix Theme](https://packagecontrol.io/packages/Numix%20Theme) mang đến phong cách thiết kế quen thuộc, đồng thời đi kèm khá nhiều mẫu màu.


### Tổng kết
Trên đây là tổng hợp một số theme dành cho Sublime text, dựa trên ý kiến của người dùng từ các forum, blog, mức độ phổ biến cũng như lượt cài đặt. Ehkoo hy vọng các bạn có thể tìm cho mình một theme ưng ý, góp phần làm đẹp thêm cho workspace của mình. Ngoài ra, nếu các bạn biết thêm những theme nào khác, đừng quên cho Ehkoo và mọi người biết trong phần bình luận nhé!
