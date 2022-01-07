---
layout: ../../layouts/Post.astro
title: Tuyệt chiêu thiết lập VSCode hoạt động hiệu quả hơn
slug: tips-fine-tune-vscode-settings
date: 2019-05-05
cover: https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1557047779/photo-1473621038790-b778b4750efe_xrvewx.jpg
tags: Thủ thuật, VSCode, Plugins, Text Editor
excerpt: 'VSCode '
author: kcjpop
editor: chubbyanh
draft: true
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1557047779/photo-1473621038790-b778b4750efe_xrvewx.jpg)
_Nguồn: [Clark Young](https://unsplash.com/@cbyoung) @ [Unsplash](https://unsplash.com/photos/fQxMGkYXqFU)_

Có thể thấy VSCode đang ngày càng được các lập trình viên JavaScript ưa thích bởi dung lượng gọn nhẹ lại đầy đủ tính năng.

**Bạn đừng bỏ qua**: [Những plugins không thể thiếu cho VSCode](https://ehkoo.com/bai-viet/vscode-must-have-plugins)

## Căn bản về thiết lập trong VSCode

Bạn có thể truy xuất vào bảng tùy chỉnh của VSCode bằng cách vào menu **File** - **Preferences** - **Settings** trên Windows/Linux hoặc **Code** - **Preferences** - **Settings** trên MacOS. Một cách khác là bạn có thể nhấn phím tắt `Ctrl + ,` hoặc `Cmd + ,`. Giao diện mặc định trông sẽ như thế này.

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,f_auto,w_1000/v1557050284/JVCA6PJ_iyse90.jpg)

Tại đây bạn có thể tùy chỉnh bằng cách click và chọn. Một cách nâng cao hơn là mở tập tin `settings.json` bằng cách click vào biểu tượng `{}` như trong hình.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1557050501/pwnfslviddpubsiy9vqu.jpg)

## Bật ruler, chỉnh lề, khoảng trắng

Ruler cho phép bạn theo dõi chiều dài của dòng trong tập tin. Bình thường thì mọi người sẽ viết code sao cho một dòng không vượt quá 80 ký tự, nhưng trong một số trường hợp, 120 ký tự cũng được chấp nhận. Nếu bạn có dùng Prettier, thiết lập này tương ứng với `printWidth`.

```json
"editor.rulers": [80, 120],
```

Thiết lập dưới đây sẽ tự động nhận dạng tập tin đang mở được chỉnh lề theo tab hay space, và chỉ hiển thị mỗi tab tương ứng với 2 space.

```json
"editor.detectIndentation": true,
"editor.insertSpaces": true
"editor.tabSize": 2
```

Chúng ta cũng nên để VSCode hiển thị tất cả khoảng trắng trong tập tin. Điều này giúp dễ dàng nhận dạng các khoảng trắng dư thừa.

```json
"editor.renderWhitespace": "all",
```

Cuối cùng, VSCode sẽ tự động chèn một dòng trắng vào cuối tập tin, đồng thời xóa tất cả khoảng trắng dư ở cuối mỗi dòng nếu có.

```json
"files.insertFinalNewline": true,
"files.trimTrailingWhitespace": true
```

## Con trỏ

Sử dụng hiệu ứng "phase" khi con trỏ nhấp nháy, đồng thời bật chế độ làm mượt chuyển động của con trỏ.

```json
"editor.cursorBlinking": "phase",
"editor.cursorSmoothCaretAnimation": true,
```

## Mở nhanh tập tin

Theo mặc định thì khi bạn click vào một tập tin ở sidebar, VSCode sẽ cho bạn xem trước chứ không thật sự mở tập tin đó luôn. Bạn có thể tắt chế độ preview này bằng thiết lập bên dưới.

```json
"workbench.editor.enablePreviewFromQuickOpen": false,
```

## Bật breadcrumbs

## Thiết lập sidebar

Theo mặc định thì sidebar của VSCode sẽ nằm bên trái. Bạn có thể đổi vị trí của sidebar sang bên phải để khi bật/tắt sidebar, nội dung tập tin không bị nhảy theo.

```json
"workbench.sideBar.location": "right",
```

**Mách nhỏ**: Phím tắt để bật tắt sidebar là `Ctrl + B`, và để nhảy qua lại giữa trình soạn thảo và sidebar, bạn có thể nhấn `Ctrl + Shift + E`.

Ngoài ra chúng ta cũng có thể tắt luôn danh sách các tập tin đang mở bằng thiết lập bên dưới.

```json
  "explorer.openEditors.visible": 0,
```

## Thiết lập minimap

Thành thật mà nói thì mình không dùng Minimap nhiều lắm vì cảm thấy nó hơi vô dụng, nhưng những thiết lập dưới đây làm cho minimap của VSCode đẹp hơn và cũng đáng để thử.

```json
"editor.minimap.renderCharacters": false,
"editor.minimap.maxColumn": 200,
"editor.minimap.showSlider": "always",
```

## Tắt tín năng telemetry

```json
"telemetry.enableCrashReporter": false
"telemetry.enableTelemetry": false,
"workbench.settings.enableNaturalLanguageSearch": false,
```

```json
"workbench.statusBar.feedback.visible": false
```

## Bật word wrap cho tập tin Markdown

```json
  "[markdown]": {
    "editor.wordWrap": "bounded",
    "editor.wordWrapColumn": 80,
    "editor.wrappingIndent": "same"
  },
```

## Kết
