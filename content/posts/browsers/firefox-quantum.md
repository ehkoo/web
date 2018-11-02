---
layout: post.njk
title: Mozilla giới thiệu Firefox Quantum
slug: mozilla-gioi-thieu-firefox-quantum
date: 2017-11-17
tags: Firefox, Firefox Quantum, Mozilla, Browsers
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1510882141/LogoTagline_jumkdh.jpg
excerpt: Nhanh hơn, ít tốn bộ nhớ hơn, chứa toàn hàng nóng, và thân thiện với người sử dụng.
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1510887541/2017.25.09.FFQuantumBeta_Quantum-1400x770_burvbv.jpg)

Mozilla vừa trình làng phiên bản 57 cho trình duyệt Firefox với tên gọi Firefox Quantum. Theo [lời giới thiệu](https://blog.mozilla.org/blog/2017/11/14/introducing-firefox-quantum/) trên website chính thức, Quantum gần như nhanh gấp đôi so với phiên bản Firefox 6 tháng trước, với những engine cốt lõi được xây dựng trên thành quả từ các nhóm nghiên cứu của hãng. Bên cạnh đó, Mozilla cũng thay đổi giao diện người dùng của trình duyệt với Photon, một giao diện tinh giản và hiện đại. Quantum hứa hẹn mang đến một trải nghiệm hoàn toàn mới cho người dùng: nhanh hơn, dễ sử dụng và ít tốn bộ nhớ hơn.

### Nhanh hơn và thân thiện hơn

<iframe width="100%" height="315" src="https://www.youtube.com/embed/n6wiRyKkmKc" frameborder="0" gesture="media" allowfullscreen></iframe>

Điểm đáng chú ý đầu tiên là giao diện [Photon](http://design.firefox.com/photon/welcome.html). Theo lời giới thiệu, giao diện này được nhóm thiết kế của Mozilla xây dựng dựa trên những quan sát về hành vi của người dùng web, kết hợp với những nghiên cứu về các lựa chọn phần cứng. Tất cả đều nhằm đảm bảo Firefox sẽ hiển thị tốt trên mọi thiết bị.

Tiếp theo là tốc độ tải trang. Firefox từ nay đã sử dụng kiếu trúc 64-bit và đa tiến trình (multi-process) làm mặc định. Trình duyệt cũng được tái cấu trúc để tận dụng các bộ xử lý đa lõi hiện đại, giúp tăng hiệu suất hoạt động trong khi vẫn tôn trọng dung lượng bộ nhớ cho phép. Bên cạnh đó, Quantum còn đính kèm "Quantum Compositor", giúp giảm thiểu khả năng trình duyệt bị treo vì lỗi từ các driver của card đồ họa.

### Về phía lập trình viên

Về phía nhà lập trình, Quantum giới thiệu hai kiểu nhập liệu mới cho ngày và giờ, `<input type="date">` và `<input type="time">`.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_300/v1510883687/Screen-Shot-2017-09-19-at-13.27.05_ywzegf.jpg)

Bộ công cụ cho nhà phát triển ([devtools](https://hacks.mozilla.org/2017/09/developer-edition-devtools-update-now-with-photon-ui/)) cũng được thay thế, với những tính năng đáng chú ý như:

- Tab Console, Debugger, và Network được xây dựng lại bằng công nghệ web chuẩn, trên nền tảng React và Redux.
- Tab Inspector có thêm những chức năng mới để làm việc với CSS Grid, CSS Variables, hay bật/tắt CSS classes trên nhiều element, v.v...
- Tab Console đã hỗ trợ gom các thông điệp thành từng nhóm, và hỗ trợ mở rộng / phân tích các đối tượng in-line.
- Tab Debugger hỗ trợ tìm kiếm, di chuyển và debug dự án theo hướng hoàn toàn mới.

Nếu quan tâm bạn có thể ghé qua [Github](https://github.com/devtools-html) của devtools.html

Ngoài ra, Quantum còn đóng gói một máy CSS hoàn toàn mới: [Stylo](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/). Stylo được viết bằng Rust dựa trên [Servo](https://servo.org/), tận dụng tính chất đa lõi (multi-core) của các thiết bị phần cứng hiện đại để tăng tốc độ xử lý. Kết quả là Stylo có thể hoạt động nhanh hơn từ 2, 4 đến 18 lần, đồng thời sử dụng ít bộ nhớ và năng lượng hơn.

### Những tính năng khác

#### Screenshot
![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1510886947/Screenshot_Image_2-600x309_obbra2.jpg)

Công cụ Screenshot cho phép người dùng chụp ảnh một phần hay toàn bộ trang web mà không cần phải cài đặt thêm bất cứ phần mềm nào. Hình ảnh được chụp sẽ tự động lưu trên máy chủ của Mozilla trong 2 tuần, nhưng người dùng hoàn toàn có thể chọn thời điểm xóa bất cứ lúc nào.

#### Send Tabs

<iframe width="100%" height="315" src="https://www.youtube.com/embed/CM40b14i41M" frameborder="0" gesture="media" allowfullscreen></iframe>

Send Tabs là tính năng giúp người dùng gửi link từ máy để bàn đến thiết bị di động, hay ngược lại. Để sử dụng tính năng này, yêu cầu người dùng phải đăng nhập vào Firefox Account để bật tính năng Sync giữa các thiết bị.

### Kết luận

Quantum mang đến những cải tiến đáng kể cho Firefox, làm cho trình duyệt này trở nên hấp dẫn hơn so với những đối thủ còn lại. Ngoài những tính năng tiêu biểu đã kể trên, giao diện Photon hoàn toàn mới với khả năng tùy biến cao hi vọng sẽ giúp người dùng vốn đã quen thuộc với Chrome dễ làm quen với Firefox.  Tuy nhiên, đường dài mới biết ngựa hay, hãy chờ xem Quantum sẽ chiến đấu thế nào với Chrome và Safari trong năm 2018.

Bạn có thể tải Firefox Quantum ở trang [https://www.mozilla.org/firefox/new](https://www.mozilla.org/firefox/new).
