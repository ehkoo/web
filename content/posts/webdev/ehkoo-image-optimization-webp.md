---
layout: post.njk
title: Tối ưu hoá hình ảnh cho Ehkoo
slug: ehkoo-what-is-webp-and-image-optimization-with-cloudinary
date: 2018-11-24
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543089888/photo-1536922246289-88c42f957773_dnqitd.jpg
tags: Web Performance, Image Optimization, WebP, MozJPG
excerpt: '...hay câu chuyện WebP là gì và mần răng để giảm bandwidth của Cloudinary với WebP'
author: kcjpop
editor: chubbyanh
draft: true
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1543089888/photo-1536922246289-88c42f957773_dnqitd.jpg)
_Hình chụp bởi [Meghan Holmes](https://unsplash.com/@yellowteapot). Nguồn: [Unsplash](https://unsplash.com/photos/wy_L8W0zcpI)_

## Chuyện như chưa bắt đầu

Cho những bạn chưa biết, [Cloudinary](https://cloudinary.com) là một dịch vụ lưu trữ, quản lý và phân phối media, bao gồm cả hình ảnh và video gần như miễn phí. Ngoài chuyện upload, bạn còn có thể trực tiếp chỉnh sửa tài liệu (gọi là "transformation") chỉ bằng cách thay đổi tham số trên URL, chẳng hạn như chỉnh kích thước ảnh, đổi định dạng, crop hình, vân vân và mây mây. Tài liệu trên Cloudinary sẽ được phân phối qua CDN. Hệ thống CDN này dựa vào những ông lớn như Akamai, Fastly, và CloudFront, tự động chọn lấy nhà phân phối nhanh nhất, đảm bảo tài liệu được chuyển đến khách truy cập bằng con đường ngắn nhất. Ngoài ra Cloudinary còn có những tính năng nâng cao khác mà bạn có thể tìm hiểu thêm [ở đây](https://cloudinary.com/solutions).

> **Công khai dụ dỗ**
> Nếu bạn muốn đăng ký xài thử Cloudinary, bạn có thể click vào liên kết giới thiệu này [https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/xkykkalctvz2xm29zkev](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/xkykkalctvz2xm29zkev). Với mỗi tài khoản mới được tạo thì Ehkoo sẽ được "ăn theo" 1GB bandwidth. Còn nếu bạn hông muốn thì cũng hông sao.

Ehkoo sử dụng Cloudinary từ những ngày đầu tiên. Cloudinary đặc biệt hào phóng khi cung cấp gói Free cho phép chứa 10GB media, 20GB bandwidth, 300k tập tin và 20k thao tác chuyển đổi hàng tháng. Theo ước lượng ban đầu của một trang không ai thèm vào thì gói này là đủ rồi, cho đến một ngày...

Khoảng 3 tuần trước, Ehkoo nhận được một email từ Cloudinary nhắc nhở rằng tài khoản đã sử dụng gần hết bandwidth trong tháng. Thống kê cho thấy ngày hôm đó có 8.64k requests, ngốn 1.06GB bandwidth.

_Suy nghĩ đầu tiên: Hmm, anh đẹp trai nào hotlink mấy tấm hình của iem rồi._

Nhưng thiệt bất ngờ, thống kê khác cho thấy phần lớn requests lại đến từ chính ehkoo.com. Có nghĩa là website "vô tình" có thêm traffic, đẩy bandwidth hình ảnh lên cao.

_Suy nghĩ tiếp theo: Có khi nào Cloudinary giả vờ tính sai để ép mình mua gói trả phí không?_

Thành thật xin lỗi anh Cloudinary vì em đã nghi ngờ anh.

Thiệt may vì ngoài chuyện "la làng" Ehkoo dùng gần hết bandwidth, Cloudinary còn tốt bụng gợi ý thêm vài chiêu để giảm bandwidth xuống.

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

Chỉ có một điểm lưu ý là tập tin JPG không hỗ trợ nền trong suốt (transparent background), nhưng vì web của Ehkoo nền trắng nên cũng không thành vấn đề. Bài học ở đây là nên thiết kế web nền trắng nhé.

### Tự động chuyển qua WebP nếu trình duyệt hỗ trợ

WebP là một định dạng ảnh mới được phát triển bởi Google từ 2010. So với JPG thì WebP thường có dung lượng nhỏ hơn khoảng 30%, nhưng vẫn đảm bảo chất lượng tương đương. WebP hỗ trợ nền trong suốt như với PNG nhưng có thể nhẹ hơn đến 25%. Và thật bất ngờ WebP cũng hỗ trợ ảnh động như GIF.

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

**Ngoài lề, liệu WebP có thống trị định dạng hình ảnh sau này?**

Hên xui. Một trong những những hạn chế của WebP là không hỗ trợ tải ảnh theo kiểu tăng tiến (progressively). Nghĩa là trình duyệt vẫn phải download hết file ảnh trước khi hiển thị. Ở mức độ nào đó thì hạn chế này có thể ảnh hưởng đến trải nghiệm người dùng. [MozJPEG](https://github.com/mozilla/mozjpeg), một định dạng ảnh được phát triển bởi Mozilla, có thể giải quyết hạn chế này, đồng thời vẫn đảm bảo những tính năng hay ho của WebP.

Nếu bạn quan tâm hơn về chủ đề tối ưu hoá hình ảnh, đừng bỏ qua bài thuyết trình dưới đây của Kornel Lesiński tại hội nghị performance.now() vừa diễn ra hồi đầu tháng 11. Kornel giải thích cách tập tin JPG được mã hoá, trình bày một kỹ thuật sử dụng HTTP2 để tiến hành tải ảnh một cách tăng tiến (ở cả server của bạn lẫn CDN), và một mẹo "kỳ cục" để nâng cao hiệu suất nén của WebP.

<div class="tc">
<iframe width="560" height="315" src="https://www.youtube.com/embed/jTXhYj2aCDU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Ehkoo khuyên xem_

</div>

### Thu nhỏ hình ảnh

## Kết quả

## Tạm kết
