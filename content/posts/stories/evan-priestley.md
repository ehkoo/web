---
layout: post.njk
title: Không có bằng cấp 3 lẫn đại học, tôi đã trở thành kĩ sư phần mềm ở Facebook như thế nào?
slug: evan-priestley-facebook
date: 2018-02-13
tags: Kinh nghiệm, Nhân vật, Evan Priestley, Phabricator
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1518530691/to-be-webdev_k23wex.jpg
translation: http://www.quora.com/How-did-Evan-Priestley-learn-to-program
excerpt: Evan Priestley, từng làm việc cho Facebook và là tác giả của phần mềm nguồn mở Phabricator, chia sẻ câu chuyện trở thành lập trình viên của mình.
author: chubbyanh
editor: kcjpop
---

> Trong ngành công nghệ, quan niệm cho rằng tấm bằng đại học là tấm vé bắt buộc để bước lên chuyến tàu sự nghiệp, tiếc thay không chỉ phổ biến ở Việt Nam mà còn cả trên thế giới. Nhưng, vẫn còn có những #unqualified_developer trưởng thành từ quá trình tự đào tạo. Bằng đam mê và nỗ lực làm việc, họ đã đạt được thành tựu không hề kém cạnh các đồng nghiệp được đào tạo chính quy.
>
> Ehkoo xin trân trọng giới thiệu một số tấm gương tự học trong giới lập trình – như lời chia sẻ chân thành tới những ai đang còn băn khoăn: Liệu không học đại học chính quy thì có thể trở thành lập trình viên? Liệu có quá trễ để học lập trình ở tuổi XYZ?…

Sau đây là câu chuyện của Evan Priestley, một lập trình viên thậm chí không có cả bằng tốt nghiệp phổ thông lẫn đại học, đã đảm nhiệm vị trí kĩ sư phần mềm tại Facebook từ 2007 đến 2011. Evan từng gây tranh cãi khi công khai nhận xét rằng Facebook “là chương trình có nhiều bug nhất trên thế giới”. Anh cũng nổi danh trên Quora (Top Writer 2012) với những đóng góp xuất sắc cho phần nội dung liên quan đến Phabricator – một ứng dụng mã nguồn mở được viết bằng PHP, giúp quản lý dự án phần mềm dễ dàng hơn.

<div class="tc"><img src="https://res.cloudinary.com/duqeezi8j/image/upload/v1507302455/evan-priestley.jpg" alt=""></div>
<small class="db tc"><i>Tác giả Evan Priestley</i></small>

### Và câu chuyện bắt đầu

Bằng cách huyền diệu nào mà tôi đã kiếm được việc ở Facebook, dù không bằng cấp?

Nói luôn cho nó vuông: thì miệt mài làm việc suốt nhiều năm, chứ sao!

Tôi thực sự rất, rất thích lập trình. Trong 4 năm trở lại đây, tôi không làm gì khác ngoài công việc ấy. Trước đó, tôi làm việc toàn thời gian 2.5 năm, nhiệm vụ: lập trình phần mềm. Trước đó nữa, gần 6 năm, tôi cũng lập trình liên tục – cho dù không phải để kiếm cơm mà chỉ vì sở thích. Tôi bỏ học đại học, thậm chí bỏ ngang cấp 3 – và dành toàn bộ thời gian cho lập trình. Mới gần đây, tôi nghỉ việc ở Facebook, và bạn thử đoán xem? Đúng vậy, tôi vẫn đang lập trình.

Còn để kể lể dông dài, có lẽ nên bắt đầu từ...

### 1. Lí do tại sao tôi bỏ học ở trường.
Từ nhỏ, tôi đã cực kì hứng thú với máy tính. Năm 8 hay 9 tuổi, tôi học một chút BASIC và đã dùng nó để để viết những chương trình như thế này trên chiếc máy tính Apple IIe ở trường.

```
10 PRINT "HACKING "
20 PRINT RANDOM()
30 GOTO 10
```

Cú pháp của chương trình chắc không còn hợp lệ, song nó cũng đã kịp hiện đầy màn hình những con số ngẫu nhiên khiến một thằng nhóc 9 tuổi ngu ngơ phải sửng sốt vì thích thú.

Tôi cũng mê chơi game từ rất sớm, đã bỏ ra không biết bao nhiêu thời gian để cày Escape Velocity. Sau đó, tôi thậm chí còn cùng với một số người chơi khác thiết kế thêm màn chơi cho game này bằng cách chỉnh sửa resources với ResEdit. Chúng tôi đã làm được một màn chơi lớn có tên là “Final Battle” cho game. Năm đó tôi 12 tuổi. Ừ thì việc này không hẳn là lập trình, song nó vẫn liên quan nhiều đến kĩ thuật và giúp cho tôi làm quen với một số khái niệm cơ bản.

Thấy tôi muốn tự viết game quá, nên sinh nhật năm đó, ba mẹ tặng tôi một CD giới thiệu về lập trình (Metrowerks CodeWarrior IDE), kèm theo một đống sách PDF về các ngôn ngữ lập trình và thư viện khác nhau. Tôi nghiêm túc chìm đắm trong đó suốt một năm ròng. Nhờ vậy, tôi đã học C (ở mức độ căn bản) trong vòng 2 tuần, rồi tiếp tục học về C/C++ và viết chương trình, tiếp đến là OpenGL. Lúc đó là OS9 và tôi nghĩ IIsi là máy tính cá nhân của tôi tại thời điểm này.

<div class="tc"><img src="https://res.cloudinary.com/duqeezi8j/image/upload/v1518532541/dnd1999010101_tfbtbh.gif" alt=""></div>
<small class="db tc"><i>Metrowerks CodeWarrior IDE, chương trình được Evan sử dụng trong những ngày đầu học lập trình</i></small>

Thế rồi nhiều chuyện liên tiếp xảy ra: chuyển nhà, ba mẹ ly hôn, trường học thì buồn tẻ. Tôi chán nản, và tiếc nuối cho bản thân mình, rất nhiều.

Suốt 5 năm, tôi hầu như không thể tập trung làm việc gì. Dĩ nhiên tôi vẫn phát triển kĩ năng theo hướng trở thành lập trình viên, song mọi chuyện tiến triển vô cùng chậm chạp. Tôi chọn học PHP, và dùng nó để làm một trang gọi là Runica – cho phép tìm kiếm runewords trong game Diablo II. Trang web cũng có một vài thứ hay ho, ví dụ như đạt được 1 triệu lượt truy cập, và mở mắt cho tôi về scale của web. Dầu vậy, cuối cùng tôi vẫn quyết định bỏ học phổ thông.

Vào cuối tháng 9 năm tôi 19 tuổi, một người bạn của tôi kết thúc đợt thực tập. Công ty nhờ anh ấy giới thiệu giúp người thay thế. Anh ấy giới thiệu tôi. Thế là, tháng 9 năm đó, tôi được nhận vào làm ở Portland Webworks.

Cũng thời gian này, tôi đăng kí học ở trường đại học Southern Maine, chuyên ngành Khoa học máy tính (Computer Science – CS), với kì vọng trải nghiệm ở đại học sẽ khá hơn so với thời cấp 3. Tôi chọn 2 hay 3 lớp CS gì đấy. Song, rất tiếc, tôi vẫn cảm thấy những gì mình thu nhận được từ trường lớp là không bõ công (bởi vì, đến lúc đó tôi đã tự học lập trình được 6 năm). Tôi bèn chuyển qua học Hóa Sinh và đăng kí liền tù tì một đống môn học cùng lúc.

Nhưng rồi công việc ở công ty ngày càng bận, tôi ngày càng ít có thời gian đến lớp. Tôi đành chuyển qua học Toán, với kì vọng sẽ gom đủ tín chỉ để được tốt nghiệp. Sau rốt, tôi vẫn không có đủ quyết tâm hoàn thành các môn đọc/viết/nhân văn. Bởi vậy, khi nghỉ làm ở Portland Webworks (sau 2.5 năm), tôi cũng dừng học đại học luôn.

Nguyên nhân, có lẽ là vì tôi mau chán với những điều được giảng dạy, việc phải đến lớp, phải làm các thể loại bài tập, vân vân và mây mây – trong khi lại không thấy rõ được lợi ích của chúng. Tôi không tự phụ là mình thông minh hơn người gì đâu nhé. Nhưng hồi phổ thông, tôi học ở một trường công lập nhỏ ở Maine, và năm lớp 11, chúng tôi đã phải bỏ ra tới 2 tuần để học về hệ thống đo lường! Có thể, đó không phải là lỗi của nhà trường. Chỉ đơn giản, đó là cách mà trường học hoạt động, trong khi thế giới bên ngoài lại được vận hành theo một cách hoàn toàn khác.

Cũng như vậy, trường đại học đối với cá nhân tôi là một trải nghiệm tốt, song có rất nhiều điều đang được phát triển ở xã hội ngoài kia cuốn hút tôi hơn. Thôi thì, chí ít tôi đã rời khỏi trường học với khoản nợ ít hơn 7000usd.

### 2. Tôi kiếm được việc ở Facebook như thế nào.

Như đã nói ở trên, tôi bắt đầu làm việc cho Portland Webworks năm 19 tuổi. Đó cũng là “công việc thực sự” đầu tiên mà tôi có được.

Công ty nhỏ, nên tôi được quyền tự do làm theo ý muốn. Suốt thời gian 2.5 năm làm việc ở Portland Webworks, công việc chính của tôi là bảo trì toàn bộ code do mình tự viết ra. Nhờ tham gia vào toàn bộ vòng đời của một phần chương trình, tôi cũng học được bài học quan trọng: cần phải cẩn trọng với mọi quyết định khi thiết kế hệ thống – nếu không muốn lãnh chịu nhiều hậu quả đớn đau về sau.

Đến khoảng đầu năm 2007, Portland Webworks bắt đầu lớn mạnh, việc học đại học của tôi cũng vừa dừng lại. Một lần, đang lướt Reddit thì tôi vô tình trông thấy bài toán tuyển dụng của Facebook, bèn gửi lời giải.
Ít lâu sau, tôi được nhận và bắt đầu làm việc ở Facebook từ tháng 4/2007.

Tôi đã cày cuốc cực kì chăm chỉ ở Facebook, thậm chí còn cày dữ hơn cả thời làm cho Portland Webworks. Không theo học đại học nữa, thời gian của tôi cũng không còn bị phân mảnh. Có những thời điểm, tôi làm 40 tiếng/tuần, chưa kể cày OT cho đến “kịch trần” tổng số giờ được phép theo luật.

Điều tôi gặt hái được nhiều nhất từ 4 năm làm việc cho Facebook, có lẽ là rèn luyện khả năng đánh giá tốt hơn. Hồi mới đi làm, tôi đã đưa ra rất nhiều quyết định sai lầm khi thiết kế hệ thống. Nhưng khi được thuê vào Facebook, tôi đã tích lũy đủ kinh nghiệm để cân bằng giữa tính đơn giản và sự phức tạp, hoặc chỉ ra được vấn đề mà các hệ thống khác gặp phải. Khả năng này rất khó để rèn luyện, và cũng rất khó để có thể hướng dẫn lại cho người khác – song lại cực kì đáng giá. Cách tốt nhất để có được nó, theo tôi, là phải bảo trì hệ thống do chính mình phát triển trong một khoảng thời gian đủ dài với những yêu cầu liên tục thay đổi.

Cũng chính vì vậy, tôi không tán thành cho lắm khẩu hiệu _“Move Fast and Break Things”_ của Facebook. Dường như Facebook (và dường như hầu hết các doanh nghiệp trong ngành công nghệ phần mềm hiện nay) đều tin (ở một mức độ nào đó) vào sự đánh đổi chất lượng cho tốc độ. Cho nên, mọi người sẵn sàng chọn tốc độ, và không mấy ai cảm thấy khó chịu về chuyện không viết code một cách đúng đắn – vì đó là sự đánh đổi dĩ nhiên.

<div class="tc"><img src="https://res.cloudinary.com/duqeezi8j/image/upload/v1518532806/2014_2F04_2F30_2Ffc_2FZuckerberg1.d1a63_cpdufw.jpg" alt=""></div>
<small class="db tc"><i>Mark Zuckerberg tại hội nghị F8 của Facebook</i></small>

Tôi thì không nghĩ vậy. Khẩu hiệu đó, diễn giải trắng phớ ra, chẳng phải nghĩa là: _“Nếu xây dựng một hệ thống thật tệ hại, chúng ta sẽ có thể triển khai nó thật nhanh. Còn nếu cố xây dựng một hệ thống đủ tốt, chúng ta sẽ không bao giờ có thể triển khai nó?”_

Cá nhân tôi thì nghĩ rằng:

* Bạn phải hành động nhanh hơn để xây dựng phần mềm có chất lượng. Nếu không, bạn sẽ không thể phản ứng kịp khi mọi thứ, nhất là sự hiểu biết của bạn, thay đổi – và khi phần mềm của bạn không phải là giải pháp tốt cho vấn đề.
* Nhưng, bạn cũng phải xây dựng phần mềm có chất lượng để hành động nhanh hơn. Nếu không, hạ tầng hệ thống của bạn sẽ luôn có vấn đề, và rốt cuộc, bạn sẽ tốn rất nhiều thời gian để xử lý. Mà, một khi hệ thống đổ vỡ, ý chí của bạn sẽ lung lay theo.

### 3. Lời khuyên của tôi dành cho các bạn trẻ muốn học lập trình.

Trước tiên, tôi muốn được chia sẻ một chút về việc nên chọn học ngôn ngữ lập trình nào. Thú thực, ngôn ngữ mạnh nhất của tôi là PHP – thứ ngôn ngữ bị đánh giá là xấu xí, và bị nhiều lập trình viên rẻ rúng. Song, cũng nhờ PHP mà tôi kiếm được việc làm ở Portland Webworks, và sau đó là ở Facebook.

Trong 4 năm làm việc cho Facebook, tôi hay tự miêu tả mình là “kĩ sư phần mềm ít ghét PHP nhất”, và cũng hay được mọi người gọi là “nhà bác học PHP ngu ngốc”. Dù không thực sự là fan của PHP, kiến thức của tôi về nó thực sự sâu sắc. Và nó cũng là động lực để tôi học những thứ khác.

Bởi vậy, tôi nghĩ sự lựa chọn ngôn ngữ không quá quan trọng như mọi người nghĩ. Mà chính ra, tôi thấy những ai hay chê bai PHP, hoặc khóc lóc rên rỉ suốt ngày về tầm quan trọng của việc lựa chọn ngôn ngữ – thì lại thường chả làm được gì ra hồn với chính thứ ngôn ngữ mà họ ca tụng.

Còn sau đây là một số lời khuyên của tôi cho các bạn trẻ:
* Nghỉ học ở trường ngay lập tức. (Hihi, đùa thôi. Trường học nhìn chung cũng tốt, nhưng bạn nên uống thêm vitamin trong thời gian còn ở đây nhé.)
* Hãy chắc chắn là bạn thật sự thích lập trình.
* Bỏ ra thật nhiều thời gian để rèn luyện. Không có con đường tắt nào cả, và hầu hết mọi bài học đáng giá đều được tích lũy thông qua kinh nghiệm và sai lầm.
* Kĩ năng quan trọng nhất: đánh giá thiết kế một hệ thống. Nhờ vậy, bạn sẽ lựa chọn được các giải pháp càng đơn giản càng tốt – song lại không quá đơn giản. Kĩ năng này cũng không có cách rèn luyện nào khác ngoài kinh nghiệm thực tế.
* Học rộng sẽ tốt hơn là học sâu. Kĩ năng theo chiều rộng sẽ hỗ trợ lẫn nhau, và giúp bạn khai phá những điều mới. Kĩ năng chuyên sâu chỉ hỗ trợ bản thân chúng. Bạn sẽ phát triển nhanh hơn khi có được hiểu biết về toàn bộ hệ thống, thay vì chỉ hiểu rõ một phần nhất định.
* Để học bất kì hệ thống phức tạp nào (kể cả trong lập trình hay mọi thứ khác), bạn hãy hình dung mô hình hoạt động của hệ thống đó ở mức độ bao quát nhất, sau đó chỉnh sửa dần. Khi đủ phức tạp, mô hình của bạn sẽ cho phép dự đoán các hoạt động của hệ thống, và cuối cùng, sẽ giúp đánh giá của bạn trở nên hợp lý.
* Chất lượng vs. tốc độ chỉ là sự đánh đổi cục bộ. Nhìn một cách toàn diện, việc hi sinh cái này sẽ dẫn đến làm hỏng luôn cái kia.
* Nên luôn luôn tìm hiểu nguyên nhân và cách thức mà mọi sự việc xảy ra.
