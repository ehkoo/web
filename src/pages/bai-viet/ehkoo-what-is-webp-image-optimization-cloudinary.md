---
layout: ../../layouts/Post.astro
title: Tối ưu hoá hình ảnh cho Ehkoo
slug: ehkoo-what-is-webp-image-optimization-cloudinary
date: 2018-11-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543147161/photo-1534367507873-d2d7e24c797f_bnafmj.jpg
tags: Web Performance, Image Optimization, WebP, MozJPG
excerpt: '...hay câu chuyện WebP là gì, và mần răng để giảm bandwidth của Cloudinary với WebP.'
author: kcjpop
editor: chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543147161/photo-1534367507873-d2d7e24c797f_bnafmj.jpg)
_Hình chụp bởi [Alora Griffiths](https://unsplash.com/@aloragriffiths). Nguồn: [Unsplash](https://unsplash.com/photos/TTrTW-pFxKw)_

## Chuyện như chưa bắt đầu

Nếu bạn chưa biết thì [Cloudinary](https://cloudinary.com) là một dịch vụ lưu trữ, quản lý và phân phối media gần như miễn phí. Bạn có thể upload hình ảnh, video lên Cloudinary rồi phân phối chúng qua hệ thống CDN. Cloudinary dựa vào CDN của những ông lớn như Akamai, Fastly, và CloudFront, tự động chọn lấy nhà phân phối đang có hiệu suất tốt nhất để đảm bảo tài liệu được chuyển đến người sử dụng chỉ trong vòng vài nốt nhạc.

Ngoài chuyện upload, bạn còn có thể trực tiếp chỉnh sửa tài liệu (gọi là "transformation") chỉ bằng việc thay đổi tham số trên URL của tài liệu, chẳng hạn như chỉnh kích thước ảnh, đổi định dạng, crop hình, vân vân và mây mây. Cloudinary còn có những tính năng nâng cao khác mà bạn có thể tìm hiểu thêm [ở đây](https://cloudinary.com/solutions).

> **Công khai dụ dỗ**
> Nếu muốn đăng ký xài thử Cloudinary, bạn có thể click vào liên kết giới thiệu này [https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/xkykkalctvz2xm29zkev](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/xkykkalctvz2xm29zkev). Với mỗi tài khoản mới được tạo thì Ehkoo sẽ được "ăn theo" 1GB bandwidth. Còn nếu bạn hông muốn thì cũng hông sao.

Ehkoo sử dụng Cloudinary từ những ngày đầu tiên. Cloudinary đặc biệt hào phóng khi cung cấp gói Free cho phép chứa 10GB media, 20GB bandwidth, 300k tập tin và 20k thao tác chuyển đổi hàng tháng. Theo ước lượng ban đầu của một trang không ai thèm vào thì gói này là đủ rồi, cho đến một ngày...

Khoảng 3 tuần trước, Ehkoo nhận được một email từ Cloudinary nhắc nhở rằng tài khoản đã sử dụng gần hết bandwidth trong tháng. Bình thường thì website sử dụng khoảng 80-90% bandwidth cho phép, nên chuyện này cũng không có gì lạ lắm. Nhưng vì đây là lần đầu tiên nhận được email cảnh báo nên cũng đáng để xem xét thử.

Thống kê cho thấy ngày hôm đó có 8.64k requests, ngốn 1.06GB bandwidth.

**_Suy nghĩ đầu tiên: Hmm, anh đẹp trai nào hotlink mấy tấm hình của iem rồi._**

Nhưng "Thật bất ngờ - Trúc Nhân", thống kê khác cho thấy phần lớn requests lại đến từ chính ehkoo.com. Có nghĩa là website "vô tình" có thêm traffic, đẩy bandwidth hình ảnh lên cao.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543136369/undefined_fiw5jq.jpg)
_Tuy nhiên cũng không quên chỉ mặt điểm danh anh Tét Văn Thót Chấm Vê Nờ đã tích cực lấy bài đồng thời tích cực hotlink nha_

**_Suy nghĩ tiếp theo: Có khi nào Cloudinary giả vờ tính sai để ép mình mua gói trả phí không?_**

Trong khoảng thời gian từ 1/10 đến 31/10/2018 thì Ehkoo có 12,637 lượt truy cập. Tính trung bình mỗi lần load trang khoảng 10 hình (ngoài trang chủ thì nhiều hình hơn), mỗi hình tầm 200KB, vị chi là khoảng 25,274,000KB ~ 25.274GB 😱. Vậy là Cloudinary có lý khi gửi email cảnh báo.

Thành thật xin lỗi anh Cloudinary vì em đã nghi ngờ anh 🙇.

Thiệt may vì ngoài chuyện "la làng", Cloudinary còn tốt bụng gợi ý thêm vài chiêu để giảm bandwidth xuống.

> 25% of your bandwidth is being used to deliver PNG images. You can save considerable bandwidth by delivering non-transparent PNGs as JPGs. If you aren’t already doing so, consider using the ‘lossy’ flag to do this conversion automatically.
>
> Consider using automatic WebP, JPEG-XR and JPEG image format selection for each different browser using 'f_auto' in delivery URLs.
>
> Accessing original images without any transformation is responsible for 89% of your bandwidth usage. If possible, specify image dimensions to match the actual view size.

Ồ kê, đã có hướng dẫn, bắt đầu làm thôi.

## Bắt đầu tối ưu hoá

### Chuyển PNG thành JPG

Bước đầu tiên quá rõ ràng rồi, chuyển tất cả hình PNG thành JPG để giảm dung lượng file xuống. Thao tác này khá đơn giản vì Cloudinary cho phép bạn đổi định dạng hình ảnh chỉ bằng cách đổi đuôi file trên URL là xong.

```diff
-https://res.cloudinary.com/ehkoo/image/upload/v1541164603/imqusj.png
+https://res.cloudinary.com/ehkoo/image/upload/v1541164603/imqusj.jpg
```

Có một điểm lưu ý là tập tin JPG không hỗ trợ nền trong suốt (transparent background), nhưng vì web của Ehkoo nền trắng nên cũng không thành vấn đề. Bài học ở đây là nên thiết kế web nền trắng nhé.

### Tự động chuyển qua WebP nếu trình duyệt hỗ trợ

WebP là một định dạng ảnh mới được phát triển bởi Google từ 2010. So với JPG thì WebP thường có dung lượng nhỏ hơn khoảng 30%, nhưng vẫn đảm bảo chất lượng tương đương. WebP hỗ trợ nền trong suốt như với PNG nhưng có thể nhẹ hơn đến 25%. WebP cũng hỗ trợ ảnh động như GIF nhưng có vẻ vẫn chưa phổ biến lắm.

Hiện tại các trình duyệt có thể đọc hiểu WebP bao gồm Chrome (duh), Opera và Edge. [Firefox](https://twitter.com/FirefoxNightly/status/1063325897263071232) sẽ hỗ trợ WebP từ phiên bản 65, riêng Safari thì vẫn chưa thấy nói gì.

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"></script>
<p class="ciu_embed" data-feature="webp" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <a href="http://caniuse.com/#feat=webp">Can I Use webp?</a> Data on support for the webp feature across the major browsers from caniuse.com.
</p>

Bằng cách thêm vào tham số `f_auto`, Cloudinary sẽ tự động trả về file hình ở định dạng WebP nếu trình duyệt của người dùng hỗ trợ. Trong trường hợp còn lại, hình JPG sẽ được trả về.

```diff
-https://res.cloudinary.com/ehkoo/image/upload/v1541164603/imqusj.jpg
+https://res.cloudinary.com/ehkoo/image/upload/f_auto/v1541164603/imqusj.jpg
```

Thêm lý do nữa, là 63% lượng khách truy cập Ehkoo sử dụng Chrome cùng với 11% sử dụng Chrome Mobile, nên chỉ cần hiển thị WebP cho 3/4 tổng lượng truy cập cũng đã là một cải tiến lớn rồi.

**Ngoài lề, liệu WebP có thống trị định dạng hình ảnh sau này?**

Hên xui. Một trong những những hạn chế của WebP là không hỗ trợ tải ảnh theo kiểu tăng tiến (progressively). Nghĩa là trình duyệt vẫn phải download hết file ảnh trước khi hiển thị. Ở mức độ nào đó thì hạn chế này có thể ảnh hưởng đến trải nghiệm người dùng. [MozJPEG](https://github.com/mozilla/mozjpeg), một định dạng ảnh được phát triển bởi Mozilla, có thể giải quyết hạn chế này, đồng thời vẫn đảm bảo những tính năng hay ho của WebP.

Nếu bạn quan tâm hơn về chủ đề tối ưu hoá hình ảnh, đừng bỏ qua bài thuyết trình dưới đây của Kornel Lesiński tại hội nghị [performance.now()](https://perfnow.nl/) vừa diễn ra hồi đầu tháng 11. Kornel giải thích cách tập tin JPG được mã hoá, trình bày một kỹ thuật sử dụng HTTP2 để tiến hành tải ảnh một cách tăng tiến (ở cả server của bạn lẫn CDN), và một mẹo "kỳ cục" để sử dụng hình được nén bằng AV1 ngay hôm nay.

<div class="tc">
<iframe width="560" height="315" src="https://www.youtube.com/embed/jTXhYj2aCDU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Ehkoo khuyên xem_

</div>

> **Mách nhỏ**
> Bạn nên nghía qua [https://squoosh.app/](https://squoosh.app/), công cụ chuyển đổi ảnh trực tuyến vừa được Google giới thiệu tại hội nghị Chrome Dev Summit 2018 vừa qua. Ứng dụng này cho phép bạn chuyển đổi qua lại giữa các định dạng với nhau, hỗ trợ cả WebP và MozJPEG.

Nếu không sử dụng Cloudinary để tự động truyền tải WebP, bạn có thể dùng thẻ `PICTURE` để thực hiện fallback.

```html
<picture>
  <source srcset="img.webp" type="image/webp" />
  <img src="img.jpg" alt="My image" />
</picture>
```

Trình duyệt sẽ tự động chọn lấy nguồn ảnh phù hợp, và trong trường hợp xấu nhất, sử dụng hình của thẻ `IMG`. Thẻ `SOURCE` còn hỗ trợ thuộc tính `media`, cho phép bạn quy định media queries khi hình ảnh này được hiển thị.

```html
<picture>
  <source srcset="/media/examples/surfer-240-200.jpg" media="(min-width: 800px)" />
  <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```

Hiện tại thì thẻ `PICTURE` đã có thể dùng được trên tất cả trình duyệt thường xuân (evergreen) trừ IE ra nhé :p

### Thu nhỏ hình ảnh

Cái này thì nhờ vào tình hình thực tế của Ehkoo thôi. Website hiện tại đang có giao diện giống như bên dưới.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543138020/Untitled_Diagram_rb0fg8.jpg)

Vì container không bao giờ vượt quá 1280px và nội dung chính không vượt quá 960px, Ehkoo chỉ cần để chiều rộng của hình trong khoảng 1000px là tương đối hiệu quả rồi. Để tự động điều chỉnh kích thước ảnh, bạn thêm vào tham số `c_scale,w_XXX` với `XXX` là chiều rộng mong muốn. Cloudinary sẽ giữ nguyên tỉ lệ ảnh sau khi chỉnh sửa.

```diff
-https://res.cloudinary.com/ehkoo/image/upload/v1541164603/imqusj.jpg
+https://res.cloudinary.com/ehkoo/image/upload/f_auto,c_scale,w_1000/v1541164603/imqusj.jpg
```

## Kết quả

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543139832/undefined_vn2xhn.jpg)
_Ngày 1/11 là khi bắt đầu sử dụng WebP đó nha_

Đây là tình hình của Ehkoo trong 30 ngày qua. Sau khi áp dụng tất cả chiêu trò ở trên thì mọi thứ có vẻ khá khả quan. Lấy con số ra hù nhau một chút:

| Ngày  | Requests (1000) | Bandwidth (GB) |
| ----- | --------------- | -------------- |
| 29/10 | 8.64            | 1.06           |
| 06/11 | 22.2 (257%)     | 1.25 (118%)    |
| 12/11 | 25.7 (297%)     | 1.71 (161%)    |

<p class="tc"><em>Số % là so sánh với ngày 29/10 - trước khi áp dụng tối ưu hóa</em></p>

Trong những ngày đỉnh điểm, lượng request tăng lên 2.5 - 3 lần, trong khi bandwidth tiêu thụ chỉ tăng khoảng 1.2 - 1.6 lần. Hiện tại, Ehkoo chỉ đang sử dụng khoảng 74% tổng lượng bandwidth cho phép.

Trong khi đó, số pageviews và sessions vẫn tiếp tục tăng (ơn trời, và ơn các bạn nữa 🤗).

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543141145/undefined_wsusxt.jpg)

> **Tâm sự mỏng**
> Đến bây giờ Ehkoo vẫn không biết vì sao traffic ngày 12/11 đột nhiên tăng vọt, vì ngày hôm đó không có bài viết nào mới cả. Theo dõi cho thấy lượng lớn truy cập đến từ Facebook, làm Ehkoo băn khoăn mãi không biết có phải bài viết được người nổi tiếng nào chia sẻ lại không.

## Tạm kết

Tình hình đã tạm ổn nhưng vẫn còn nhiều chỗ cần cải tiến thêm. Chẳng hạn như hình ảnh ngoài trang chủ vẫn đang sử dụng hình với kích thước gốc, hay hình thu nhỏ ở phần Bài viết liên quan cũng vậy. Dù sao thì nếu website/ứng dụng của bạn cần chứa hình ảnh, hãy cân nhắc chuyển qua WebP và sử dụng Cloudinary nhé.
