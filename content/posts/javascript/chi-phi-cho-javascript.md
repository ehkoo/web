---
layout: post.njk
title: Chi phí cho JavaScript
slug: chi-phi-cho-javascript
date: 2018-06-03
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1511057423/1_ioAGDTcSCZycQBjrQi5o8w_rihvi1.jpg
tags: JavaScript, Web Performance, Web Optimization
excerpt: 5+ bài toán hóc búa khi xử lý JavaScript trên các thiết bị di động; và một số giải pháp do Addy Osmani, Eng. Manager tại Google đề xuất, giúp nâng cao hiệu suất website.
author: kcjpop
translation: https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e
---

> **Về tác giả:**
> Addy Osmani là một gương mặt rất quen thuộc trong cộng đồng phát triển web. Anh là tác giả của TodoMVC, Yeoman, và Material Design Lite. Bên cạnh đó anh cũng rất quan tâm đến vấn đề nâng cao hiệu suất của các website. Hiện tại Addy đảm nhiệm vị trí Eng. Manager tại Google. Bạn có thể theo dõi Addy trên Twitter [@addyosmani](https://twitter.com/addyosmani) hay Facebook [@articlesfordevelopers](https://www.facebook.com/articlesfordevelopers/).

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511057423/1_ioAGDTcSCZycQBjrQi5o8w_rihvi1.jpg)

Khi các website chúng ta xây dựng ngày càng phụ thuộc vào JavaScript, thỉnh thoảng chúng ta cũng phải trả giá cho những gì được gửi về phía người dùng, theo những cách không dễ nhìn thấy . Trong bài viết này, tôi sẽ nói về lý do tại sao một chút **kỷ luật** có thể giúp nếu bạn muốn website của mình có thể tải và phản ứng một cách nhanh chóng trên các thiết bị di động.

> tl;dr: less code = less parse/compile + less transfer + less to decompress
>
> Dài quá ngại đọc: ít mã lệnh = ít thời gian phân tách/biên dịch + ít dung lượng trao đổi + ít phải giải nén

### 1. Kết nối mạng

Khi nghĩ về chi phí cho JavaScript, hầu hết các lập trình viên nghĩ về mặt **chi phí tải và thực thi mã lệnh**. Kết nối Internet của người dùng càng chậm thì gửi nhiều bytes JavaScript về phía họ càng lâu.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511058700/1_U00XcnhqoczTuJ8NH8UhOw_ktoece.png)

Điều này cũng có thể là một vấn đề với cả những nước đã phát triển, vì **kết nối mạng đang sử dụng** của một người dùng có thể không thật sự là 3G, 4G hay WiFi. Bạn có thể đang vào mạng WiFi của một quán cà phê, nhưng đang kết nối với một hotspot di động với tốc độ 2G.

Bạn có thể **giảm** chi phí truyền tải JavaScript bằng cách:
- **Chỉ chuyển đến người dùng phần mã lệnh cần thiết**. Kỹ thuật chia mã (code-splitting) có thể hữu ích ở đây.
- [**Tối giản hóa**](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer) mã lệnh (sử dụng Uglify cho ES5, [babel-minify](https://github.com/babel/minify) hay [uglify-es](https://www.npmjs.com/package/uglify-es) cho ES2015)
- [**Nén mã lệnh**](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer) tới mức tối đa, bằng cách dùng [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/) ~ [q11](https://twitter.com/paulcalvano/status/924660429846208514), Zopfli hay gzip. Brotli hoàn toàn qua mặt gzip khi xét về tỉ lệ nén. Giải thuật này đã giúp cho CertSimple giảm 17% dung lượng nén tập tin JS, và LinkedIn tiết kiệm 4% thời gian tải.
- **Xóa mã lệnh không dùng tới**. Với [DevTools code coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes), bạn có thể nhận dạng phần mã nào không được thực thi. Để loại bỏ mã nguồn không cần thiết, bạn có thể sử dụng kỹ thuật ["rung cây"](https://webpack.js.org/guides/tree-shaking/) (tree-shaking) của Webpack, các kỹ thuật tối ưu hóa nâng cao của [Closure Compiler](https://developers.google.com/closure/compiler/), và các plugin hỗ trợ tỉa tót mã lệnh như `lodash-babel-plugin` hay `ContextReplacementPlugin` của Webpack dành cho các thư viện như `moment.js`. Sử dụng `babel-preset-env` và `browserlist` để tránh tình trạng chuyển đổi những tính năng ES2015 đã được hỗ trợ mặc định trong các trình duyệt. Những lập trình viên nhiều kinh nghiệm có thể phân tích các bản đóng gói (bundles) của Webpack và tìm cách bỏ đi những thư viện phụ thuộc không cần thiết.
- **Lưu bộ đệm để giảm tải các yêu cầu mạng**. Xác định thời gian sống tối ưu cho các tập tin JS (`max-age`) và cung cấp các token thẩm định (`ETag`) để tránh phải truyền tải những bytes không cần thiết. Lưu bộ đệm bằng Service Worker có thể giúp ứng dụng của bạn trở nên chủ động hơn trong trường hợp mất kết nối, đồng thời cho phép bạn truy xuất đến những tính năng đặc biệt, chẳng hạn như [bộ đệm lưu trữ mã trong V8](https://v8project.blogspot.com/2015/07/code-caching.html). Hãy tìm hiểu về lưu đệm dài hạn với kỹ thuật băm tên tập tin (filename hashing).

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059041/1_8Spf9To8dzTG3Xy9s57oVA_rqr8y7.jpg)

### 2. Phân tách/Biên dịch

Sau khi đã tải, một trong những chi phí JavaScript **nặng nề** nhất là thời gian để một trình xử lý JS tiến hành phân tách/biên dịch mã nguồn. Trong Chrome DevTools, phân tách và biên dịch là những phần trong thời gian "Scripting" màu vàng, có thể thấy trong bảng Performance.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059144/1__4gNDmBlXxOF2-KmsOrKkw_hvtq4n.png)

Phần Bottom-Up/Call Tree cho phép xem chính xác thời gian phân tách và biên dịch mã:

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059175/1_GdrVt_BTTzzBOIoyZZsQZQ_oruogc.png)

<small>_Trong bản Performance của Chrome DevTools, tìm đến phần Bottom-Up. Khi Runtime Call Stats trong V8 được kích hoạt, chúng ta có thể thấy thời gian cần thiết của những tiến trình như Phân Tách và Biên Dịch_</small>

Nhưng mà, tại sao điều này lại quan trọng?

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059291/1_Dirw7RdQj9Dktc-Ny6-xbA_bw6pov.png)

**Mất nhiều thời gian để phân tách/biên dịch mã nguồn có thể làm chậm đi đáng kể thời gian người dùng có thể tương tác với website. Bạn càng gửi xuống nhiều tập tin JavaScript, trình duyệt càng tốn thời gian để phân tách và biên dịch trước khi website của bạn có thể tương tác được.**

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059346/1_6Y665hpxfWNMu2EXu3VGlw_nvifdv.png)

> Ăn byte nào trả byte đó, **JavaScript ngày càng trở nên đắt đỏ cho trình duyệt để xử lý hơn là một bức hình hay web font có cùng dung lượng tương ứng** -- _Tom Dale - tác giả của Ember.js_

So với JavaScript, cũng có nhiều chi phí tham gia vào quá trình xử lý một bức ảnh có dung lượng tương tự (chúng vẫn cần phải được giải mã!) nhưng đối với phần cứng của thiết bị di động trung bình, có vẻ như tác động của JS có phần tiêu cực hơn đến khả năng tương tác của website.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059392/1_PRVzNizF9jQ_QADF5lQHpA_ida1me.jpg)
<small>_Các byte của JavaScript và hình ảnh cần đến những chi phí rất khác nhau. Hình ảnh thường không chặn luồng chính (main thread) hay ngăn cản tương tác với các giao diện trong quá trình giải mã và hiển thị lên màn hình (rasterization). Ngược lại JS có thể làm chậm quá trình tương tác vì các chi phí phân tách, biên dịch và thực thi._</small>

Khi chúng ta nói về phân tách và biên dịch bị chậm, ngữ cảnh rất quan trọng -- vì ở đây chúng ta đang nói về những chiếc điện thoại ở phân khúc trung bình. Người dùng bình dân có thể dùng những thiết bị với CPUs và GPUs chậm chạp, hoàn toàn không có bộ đệm L2/L3 và thậm chí còn bị giới hạn bộ nhớ.

> Năng lực mạng và năng lực của thiết bị thường không đi chung với nhau. Một người dùng sử dụng kết nối Fiber siêu tốc không nhất thiết phải có CPU tốt nhất để phân tách và thực thi JavaScript được gửi đến. Điều ngược lại cũng chính xác...kết nối cùi mía, nhưng CPU lại nhanh như điện. -- Kristofer Baxter, LinkedIn.

Trong bài [JavaScript Start-up Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201), tôi có lưu ý về chi phí phân tách một tập tin JavaScript (đơn giản) đã được giải nén có dung lượng khoảng 1MB trên phần cứng bình dân và cao cấp. **Thời gian phân tách/biên tịch mã lệnh giữa chiếc điện thoại nhanh nhất với chiếc điện thoại trung bình khác nhau từ 2 đến 5 lần.**

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059660/1_8BQ3bCYu1AVvJWPR1x8Yig_by3zen.jpg)

<small>_**Thời gian phân tách một bản đóng gói JavaScript có dung lượng 1MB (~250KB gzipped)** giữa các thiết bị máy tính cá nhân và di động thuộc nhiều dòng khác nhau. Khi nhìn vào chi phí cho việc phân tách, chúng ta phải xem xét khi tập tin đã **được giải nén**, chẳng hạn như ~250KB gzipped khi giải nén thì khoảng 1MB._</small>

Đối với những trang trong thực tế, như CNN.com thì sao?

**Trên một chiếc iPhone 8 cao cấp thì mất khoảng 4 giây để phân tách/biên dịch JS trên CNN.com, so với khoảng 13 giây cho một chiếc điện thoại bình dân (Moto G4)**. Điều này có thể tác động rõ ràng đến khả năng tương tác của người dùng với website.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059819/1_7ysArXJ4nN0rQEMT9yZ_Sg_ygsaoo.png)
<small>_So sánh thời gian phân tách mã nguồn trên chip A11 Bionic của Apple với Snapdragon 617 trên các thiết bị Android bình dân_</small>

Điều này nêu bật tầm quan trọng của việc kiểm thử ứng dụng trên các phần cứng **trung bình** (như chiếc Moto G4) thay vì chiếc điện thoại trong túi của bạn. Nói gì thì nói, ngữ cảnh cũng quan trọng: **tối ưu hóa cho thiết bị và điều kiện kết nối mà người dùng _của bạn_ có.**

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511059937/1_6oEpMEi_pjRNjmtN9i2TCA_myocjq.jpg)

Các ứng dụng phân tích thống kê (analytics) có thể đưa ra một cái nhìn về [dòng thiết bị di động](https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/) mà người dùng thực tế của bạn đang sử dụng. Thông tin này đem đến cơ hội để hiểu hơn về các điều kiện giới hạn của CPU/GPU trên các thiết bị đó.

**Mà có thật là chúng ta đang gửi xuống người dùng quá nhiều JavaScript không? Hên xui :)**

Bằng cách sử dụng HTTP Archive (với khoảng 500K websites) để phân tích hiện trạng JavaScript trên các thiết bị di động, chúng ta có thể thấy rằng 50% website cần đến hơn 14 giây để có thể tương tác. Những trang này bỏ ra đến hơn 4 giây chỉ để phân tách và biên dịch JS.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511060037/1_sVgunAoet0i5FWEI9NSyMg_dojl4x.jpg)

Thời gian để tải và xử lý JS và các tài nguyên khác đóng một vai trò ở đây, và có lẽ không quá ngạc nhiên khi người dùng phải chờ một lúc trước khi cảm giác website đã có thể sử dụng. Rõ ràng chúng ta có thể làm tốt hơn.

**Loại bỏ những phần JavaScript không quan trọng trong trang có thể giảm thiểu thời gian truyền tải, quá trình phân tách và biên dịch vốn ngốn CPU, và cả việc ngốn bộ nhớ. Nó cũng làm cho website trở nên có thể tương tác được nhanh hơn.**

### 3. Thời gian thực thi

Chi phí không chỉ nằm ở quá trình phân tách và biên dịch. **Quá trình thực thi JavaScript** (chạy mã lệnh sau khi đã phân tách/biên dịch) là một trong những thao tác phải xảy ra trong luồng chính. Thời gian thực thi quá lâu có thể làm trì hoãn thời gian người dùng có thể tương tác với website.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511060134/1_ec0wEKKVl7iQidBks3oDKg_a2tcnm.png)

> If script executes for more than 50ms, time-to-interactive is delayed by the entire amount of time it takes to download, compile, and execute the JS — Alex Russell
>
> Nếu một đoạn mã phải thực thi trong hơn 50ms, thời gian để tương tác bị trì hoãn bằng nguyên cả thời gian cần thiết để tải, biên dịch và thực thi JS -- Alex Russell

Để giải quyết vấn đề này, JavaScript tận dụng khả năng chia nhỏ thành từng phần (small chunks) để tránh không khóa hoàn toàn luồng chính. Bạn hãy tìm hiểu để xem có thể giảm thiểu công việc trong quá trình thực thi hay không.

### 4. Một số khuôn mẫu để giảm thiểu chi phí truyền tải JavaScript

Khi bạn đang tìm cách để giảm thiểu thời gian truyền tải, phân tách và biên dịch JavaScript, có vài khuôn mẫu có thể hữu ích, như kỹ thuật chia nhỏ theo định tuyến (route-based chunking) hay còn gọi là [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/).

PRPL là một kỹ thuật để tối ưu hóa khả năng tương tác trên website bằng cách chia nhỏ mã nguồn và lưu bộ đệm một cách quyết liệt.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1510975518/1_VgdNbnl08gcetpqE1t9P9w_a4niqe.png)

Hãy xem những tác động nó có thể mang lại.

Chúng ta phân tính thời gian tải của những trang web di động thông dụng và các ứng dụng web tăng tiến (Progressive Web Apps -- PWAs) bằng cách sử dụng Runtime Call Stats trong V8. Như chúng ta có thể thấy, thời gian phân tách (phần màu cam) chiếm một phần lớn trong tổng thời gian của các website này.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1511060274/1_9BMRW5i_bS4By_JSESXX8A_btkwtw.png)

[Wego](https://wego.com/), một trang sử dụng PRPL, xoay xở để giữ cho thời gian phân tách ở mức thấp, giúp cho website có thể tương tác nhanh hơn. Những trang còn lại cũng đã thực hiện kỹ thuật chia mã và dự toán hiệu suất (performance budgeting) để giảm chi phí JS.

### 5. Những chi phí khác

JavaScript cũng có thể tác động đến hiệu suất của website theo những hướng khác:

- Bộ nhớ. Website có thể cảm thấy bị giựt (jank) hay tạm dừng thường xuyên do bộ gom rác (garbage collector - GC) hoạt động. Khi trình duyệt tiến hành thu hồi bộ nhớ, quá trình thực thi JS bị tạm dừng. Do đó khi trình duyệt thu hồi bộ nhớ quá thường xuyên, tiến trình JS cũng bị dừng liên tục hơn chúng ta mong muốn. Lập trình viên cần tránh bị rò rỉ bộ nhớ và tiến trình dừng của GC để website có thể hoạt động ổn định hơn.
- Trong quá trình chạy, mã JavaScript chạy quá lâu có thể khóa luồng chính, làm cho website trở nên không tương tác được. Bằng cách chia nhỏ công việc ra thành từng phần (sử dụng `requestAnimationFrame()` hay `requestIdleCallback()` để phân lịch) có thể giúp giảm thiểu các vấn đề về tương tác.

### 6. Kỹ thuật Khởi động Tăng tiến (progressive bootstrapping)

Nhiều website xem tính ẩn hiện của nội dung trên trang là một chi phí đắt đỏ khi tối ưu hóa tính tương tác. Để có thể thực hiện tiến trình vẽ đầu tiên (first paint) một cách nhanh chóng, lập trình viên thường sử dụng kỹ thuật tạo nội dung trước ở phía server (server-side rendering - SSR), sau đó "nâng cấp" bằng cách gắn các hàm xử lý sự kiện sau khi JavaScript đã được tải về.

Nhưng hãy cẩn thận -- kỹ thuật này cũng có chi phí riêng của nó. Bạn 1) nhìn chung sẽ gửi xuống một tập tin HTML _nặng ký hơn_ và có thể ảnh hưởng đến tính tương tác của site, hoặc 2) có thể đưa người dùng vào một vùng thung lũng huyền bí (uncanny valley) nơi một nửa trải nghiệm không thật sự có thể tương tác được, cho đến khi JavaScript hoàn tất quá trình xử lý.

Kỹ thuật Khởi động Tăng tiến có thể là một hướng tiếp cận tốt hơn. Bạn chỉ cần gửi xuống một trang vừa đủ có thể hoạt động, bao gồm chỉ HTML/JS/CSS cần thiết cho định tuyến hiện tại. Khi các tài nguyên khác đã được tải xong, ứng dụng có thể lazy-load vào và mở ra các chức năng khác.

![](http://res.cloudinary.com/duqeezi8j/image/upload/v1510980837/1_zY03Y5nVEY21FXA63Qe8PA_utrthy.jpg)
<small>[Kỹ thuật Khởi động Tăng tiến](https://twitter.com/aerotwist/status/729712502943174657) minh họa bởi Paul Lewis</small>

**Kỹ thuật tải mã lệnh tương ứng với những gì đang được hiển thị chính là cứu cánh. PRPL và Khởi động Tăng tiến là hai khuôn mẫu giúp đạt được mục tiêu này.**


### Kết luận

**Kích thước tập tin khi truyền tải rất quan trọng đối với những kết nối mạng cấp thấp. Thời gian phân tách mã nguồn lại quan trọng đối với những thiết bị có giới hạn về CPU. Chúng ta cần phải giữ cho các chỉ số này ở mức thấp.**

Nhiều nhóm phát triển đã thành công trong việc làm theo các dự toán hiệu suất nghiêm ngặt, để giảm thiểu thời gian truyền tải và phân tách/biên dịch. Bạn có thể xem hướng dẫn “[Can You Afford It?: Real-world Web Performance Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)” của Alex Russell về dự toán hiệu suất cho các thiết bị di động.

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,w_1080/v1510981775/1_U8PJVNrA_tYADQ6_S4HUYw_uza2ix.jpg)

Nếu bạn đang phát triển một website hướng đến các thiết bị di động, hãy cố gắng hết sức để xây dựng nó trên phần cứng tiêu biểu, giữ cho thời gian phân tách/biên dịch JavaScript ở mức thấp, và thu nhận một dự toán hiệu suất để chắc chắn rằng nhóm của bạn luôn theo sát chi phí JavaScript.

### Tìm hiểu thêm

<iframe width="100%" height="400" src="https://www.youtube.com/embed/_srJ7eHS3IM" frameborder="0" allowfullscreen></iframe>

<small>_Bài nói chuyện của tôi ở Chrome Dev Summit 2017 về chi phí cho JavaScript. Phần sau của bài nói có nhắc đến những ví dụ thực tế từ các trang như Pinterest hay Tinder._</small>

- [JavaScript Start-up Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
- [Solving the web performance crisis ](https://nolanlawson.github.io/frontendday-2016/) —  Nolan Lawson
- [Can you afford it? Real-world performance budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)  —  Alex Russell
- [Evaluating web frameworks and libraries ](https://twitter.com/kristoferbaxter/status/908144931125858304) —  Kristofer Baxter
- [Kết quả thử nghiệm của Cloudflare cho giải thuật nén Brotli](https://blog.cloudflare.com/results-experimenting-brotli/) (lưu ý là nén Brotli động ở chất lượng cao có thể làm chậm quá trình hiển thị trang lần đầu tiên nên bạn cần đánh giá một cách thận trọng. Có khi bạn sẽ muốn nén theo phương pháp tĩnh hơn.)
- [Performance Futures ](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5) —  Sam Saccone

_Chân thành cám ơn Nolan Lawson, Kristofer Baxter và Jeremy Wagner vì những phản hồi của mọi người._
