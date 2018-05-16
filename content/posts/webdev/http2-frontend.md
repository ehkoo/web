---
layout: post.njk
title: Lập trình front-end hưởng lợi gì từ HTTP/2?
slug: lap-trinh-front-end-duoc-loi-ich-gi-tu-http2
date: 2018-05-14
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1526386160/sls-rocket-scene-1_ruuwgh.png
tags: Frontend, HTTP2
excerpt: "Chúng ta chắc đều biết HTTP/2 sẽ là phiên bản thay thế cho HTTP/1.1. Nhưng chính xác thì HTTP/2 là gì, và đem lại những lợi ích nào cho lập trình viên front-end?"
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1526386160/sls-rocket-scene-1_ruuwgh.png)

Mạng Internet mà chúng ta đang sử dụng hàng ngày được dựa trên giao thức truyền tải siêu văn bản (Hypertext Transfer Protocol, hay còn biết với cụm viết tắt thân thuộc hơn: HTTP), được giới thiệu lần đầu tiên vào năm 1991; và phiên bản 1.1 được công bố vào năm 1999. Từ đó đến nay đã gần 20 năm trôi qua. Các website đã tiến hóa từ những trang chỉ đơn thuần gồm chữ và hình thành những ứng dụng web đồ sộ với hàng tá CSS, JavaScript, media... cùng vô vàn tính năng khác. Do đó, năm 2015, phiên bản HTTP/2 được công bố, giúp giải quyết một số hạn chế của HTTP/1.1, đồng thời hứa hẹn sẽ tăng tốc độ tải của các website - đặc biệt là trên các thiết bị di động.

### Vậy HTTP/2 có gì hot?

#### Giữa client và server chỉ còn một kết nối

Trong HTTP/1.1, một kết nối TCP chỉ có thể truyền tải duy nhất một tài nguyên giữa client và server. Nghĩa là, nếu cần file `index.html` bạn phải mở một kết nối; nếu cần `avatar.jpg` bạn phải mở một kết nối khác. Trình duyệt có thể tăng tốc độ tải trang bằng cách mở nhiều kết nối TCP, nhưng rất tiếc đây không phải là công việc nhẹ nhàng. Hơn nữa, để giảm tải cho server, các trình duyệt cũng [giới hạn số lượng kết nối đồng thời](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser) trên một domain.

Nhưng với HTTP/2, giữa client với server chỉ còn một kết nối TCP duy nhất. Điều này giúp loại bỏ chi phí khởi tạo tạo kết nối mới nặng nề, đồng thời giúp tránh đi tình trạng một request nào đó chiếm dụng đường truyền quá lâu. Khi gửi request lên phía server, client có thể "đánh dấu" tài nguyên nào có quyền ưu tiên cao hơn (high priority) để server sẽ nhanh chóng trả về tài nguyên đó trước.

Hình minh họa dưới đây của [Mariko Kosaka](https://twitter.com/kosamari/status/859958929484337152) sẽ giúp bạn hình dung điểm khác nhau này.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1526295127/C-8t64sXYAEf7GG_dcxvqc.jpg)
_Với HTTP/1.x Chrome chỉ có thể gửi tối đa 6 request đến cùng một domain_

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1526295115/C-8t70YXoAEShUL_ykkmgx.jpg)
_Trong khi ở HTTP/2, giữa client và server chỉ còn một kết nối duy nhất_

Bên cạnh đó, dữ liệu truyền tải giữa client và server không còn ở dạng văn bản nữa mà sẽ dưới dạng nhị phân; giúp giảm dung lượng, đồng thời tăng tốc độ truyền.

#### Các headers được nén và theo dõi trạng thái

Headers trong HTTP/1.1 được gửi đi dưới dạng _key:value_, giống như thế này:

```bash
GET /index.html HTTP/1.1
Host: ehkoo.com
Referer:https://ehkoo.com/
Accept-Encoding:gzip
```

Những requests tiếp theo sẽ có dạng:

```bash
GET /logo.png HTTP/1.1
Host: ehkoo.com
Referer:https://ehkoo.com/index.html
Accept-Encoding:gzip
```

Như bạn có thể thấy, giá trị của `Host` và `Accept-Encoding` giống nhau ở cả hai requests. HTTP/2 đưa ra cải tiến bằng cách quy định các headers chỉ gửi đi những thay đổi so với trạng thái trước của nó. Nghĩa là:

```bash
# Đây là request đầu tiên
:method: GET
:scheme: https
:host: ehkoo.com
:path: /index.html
referer: https://ehkoo.com/
accept-encoding: gzip
```

```bash
# Request thứ hai chỉ thay đổi path và referer mà thôi
:path: /logo.svg
referer: https://ehkoo.com/index.html
```

Dữ liệu bên trong headers thường không quá nặng nề, nhưng nếu có hàng trăm requests được gửi qua lại, đồng thời cookie được đính kèm vào header để xác thực khi gọi đến RESTful APIs chẳng hạn, dung lượng trao đổi có thể trở nên đáng kể. Do đó, headers của HTTP/2 sẽ được nén bằng thuật toán [mã hóa Huffman ](https://vi.wikipedia.org/wiki/M%C3%A3_h%C3%B3a_Huffman). Theo [thống kê của KeyCDN](https://www.keycdn.com/blog/http2-hpack-compression/), headers được nén có thể giảm khoảng 30% dung lượng.

#### Server đẩy tài nguyên về phía client

Push Server có lẽ là tính năng thú vị nhất của HTTP/2. Với HTTP/1.1 khi client truy xuất một trang, đoạn đối thoại sau đây diễn ra:

- Phục vụ khí đại ca, tiểu đệ cần `index.html`. Phiền huynh gửi cho đệ được không?
- Lưu lãm khí hiền đệ, `index.html` của đệ đây.
- Ây da, cám ơn huynh nha. Hả, thì ra tập tin `index.html` này còn cần thêm `style.css` với `app.js` nữa. Phiền huynh gửi bọn chúng cho ta được không?
- Không thành vấn đề.

Nhưng với HTTP/2, server có thể chủ động gửi trước tài nguyên về phía client.

- Phục vụ khí đại ca, phiền huynh quá. Có thể gửi cho ta `index.html` được không?
- Hiền đệ à, chỗ huynh đệ với nhau, đừng khách khí như vậy. `index.html` của đệ đây, đừng quên lấy thêm chỗ `style.css` với `app.js` này nữa. Hữu ích về sau đó.
- Đa tạ huynh, thật không biết phải báo đáp thế nào cho phải.

Bạn có thể quay lại phía trên xem hình minh họa của Mariko, để hiểu rõ hơn về Push Server. Do server nhận biết được các tài nguyên cần thiết và chủ động gửi trả về, đến khi client cần sử dụng thì tài nguyên đã được tải sẵn, giúp giảm thời gian chờ đợi.

### Frontend: phương án tối ưu ở HTTP/1.x có thể là sai lầm ở HTTP/2

Những cải tiến kể trên của HTTP/2 có thể giúp tăng tốc độ tải trang, nhưng cũng làm cho một số phương án tối ưu của HTTP/1.x trở nên thừa thãi, thậm chí có phần làm website chậm đi.

#### Nối files, CSS sprite, và inline assets

Một trong những cách làm phổ biến khi triển khai ứng dụng web là nối tất cả tập tin JS/CSS lại (concatenation) để giảm số lượng kết nối cần thiết. Cách làm này có chút vấn đề với những đoạn code ít khi được thay đổi, như CSS reset hay các thư viện JS ngoài: mỗi lần triển khai chúng ta lại phải nối chúng lại vào ứng dụng và đẩy về phía người dùng. Nhờ vào khả năng yêu cầu nhiều tài nguyên trên cùng một kết nối của HTTP/2, bạn có thể tách riêng các tập tin này ra, và để trình duyệt lưu đệm chúng. Những lần sau, khi chúng ta triển khai ứng dụng, chỉ phần code mới sẽ được trả về phía người dùng mà thôi.

Cũng tương tự với inline assets và CSS sprite. Inline assets là cách chúng ta chèn trực tiếp những tài nguyên nhỏ, ví dụ như logo hay icon vào HTML/CSS dưới dạng base64, trong khi CSS sprite là cách nối nhiều hình lại làm một. Hai cách làm này không giúp chúng ta tận dụng được bộ đệm của trình duyệt với HTTP/2.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1526386548/nav_logo107_kh5shk.png)
_CSS Sprite không còn hữu dụng với HTTP/2_

#### Phân mảnh tên miền (domain sharding)

Như đã đề cập ở trên, do trình duyệt chỉ được gửi tối đa một số lượng nhất định các request đồng thời đến cùng một máy chủ, nên các ứng dụng thường có thêm `cdn.domain.com` hay `assets.domain.com` để tăng số lượng request đồng thời từ phía trình duyệt lên. Với HTTP/2, nhiều tên miền đồng nghĩa với nhiều kết nối được tạo ra, điều này có phần đi ngược lại với tiêu chí "giảm kết nối" của HTTP/2.

#### Vậy ta còn lại gì?

Không phải tất cả phương án tối ưu của HTTP/1.1 đều bỏ đi. Bạn vẫn cần bật tính năng nén gzip trên server, đồng thời phương pháp làm xấu code (uglification/ minification) vẫn còn hữu dụng.

### Kết

HTTP/2 đem đến những cải tiến đầy hứa hẹn cho một thế hệ web nhanh và nhẹ hơn. Tuy nhiên, chúng ta cũng cần phải lưu ý những đặc điểm của nó, để tránh phạm phải những sai lầm trong quá trình phát triển dự án.
