---
layout: post.njk
title: Microsoft mở mã nguồn Sonar, công cụ kiểm tra hiệu suất và độ bảo mật cho website
slug: microsoft-sonar-kiem-tra-hieu-suat-bao-mat-website
date: 2017-10-27
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1509076448/6mFAXQp_u8j8jh.jpg
tags: Microsoft, Sonar, Performance, Security, Hiệu Suất, Bảo Mật
excerpt: Sonar là công cụ giúp kiểm tra hiệu suất của website, bao gồm tính dễ sử dụng, tương thích, bảo mật và hơn thế nữa.
author: kcjpop
---
![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1509076448/6mFAXQp_u8j8jh.jpg)

Nhóm phát triển trình duyệt Microsoft Edge vừa công khai mã nguồn của [Sonar](https://sonarwhal.com/), một công cụ giúp kiểm tra hiệu suất website/PWA và các vấn đề liên quan như tính dễ sử dụng (accessibility), khả năng tương thích (interoperability) và bảo mật.

Sonar lần đầu được công bố vào tháng 6/2017 như là [đóng góp của Microsoft cho JS Foundation](https://js.foundation/announcements/2017/06/22/sonar-js-foundation-welcomes-newest-project), là một phần trong nỗ lực làm thân với cộng đồng mã nguồn mở. Hiện tại, Sonar đã có thể được dùng ở tất cả các thể loại website, bao gồm cả các trang intranet và các trang bán hàng điện tử. Lập trình viên được mời gọi tham gia và phát triển thêm tính năng cho Sonar.

Bạn có thể dùng thử Sonar bằng cách truy cập vào [https://sonarwhal.com/scanner/](https://sonarwhal.com/scanner/), nhập đường dẫn của website và click **Run Scan**. Sonar sẽ quét và hiển thị những vấn đề mà nó tìm được, đồng thời cũng gợi ý một số giải pháp. Bạn có thể xem thử kết quả kiểm tra của Ehkoo [ở đây](https://sonarwhal.com/scanner/8b942e21-77f9-46fc-aa23-2f6a35b092b4).

Cách dùng Sonar cũng tương tự như các công cụ kiểm tra lỗi như ESLint hay CSSLint. Bạn sẽ khai báo các [luật kiểm tra](https://sonarwhal.com/docs/user-guide/rules/) và sử dụng một trong số các [connectors](https://sonarwhal.com/docs/user-guide/connectors/index.html) (hiện hỗ trợ `jsdom` và `chrome`) để tiến hành thẩm định website.

Theo lời của [Antón Molleda](https://blogs.windows.com/msedgedev/2017/10/25/introducing-sonar-site-scanner/#t3eD5PWifS4Em4P8.97), nhân viên quản lý cấp cao của Microsoft Edge, điểm khác biệt của Sonar ở chỗ, Sonar thực thi mã nguồn của website bên trong một container riêng biệt, thay vì tiến hành phân tích mã nguồn như những công cụ kiểm lỗi khác. Điều này giúp cho kết quả phân tích của Sonar chính xác hơn, đồng thời vẫn giữ được khả năng tích hợp với các dịch vụ khác. Và nếu bạn không muốn chạy Sonar trên trình duyệt, bạn cũng có thể gọi nó từ giao diện dòng lệnh.

Trong tương lai, Sonar sẽ được phát triển thêm nhiều tính năng, bao gồm plugin cho  Visual Studio Code, các thiết lập để tùy chỉnh cho ứng dụng web, và hỗ trợ thêm nhiều luật kiểm tra khác.

*Nguồn: [TheNextWeb](https://thenextweb.com/apps/2017/10/26/microsoft-launches-sonar-to-test-your-sites-performance-and-security/)*
