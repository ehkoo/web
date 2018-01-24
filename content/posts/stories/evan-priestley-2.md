---
layout: post.njk
title: Evan Priestley đã học lập trình như thế nào? – Phần 2
slug: evan-priestley-da-hoc-lap-trinh-nhu-the-nao-phan-2
date: 2014-04-13
tags: Evan Priestley, Phabricator, Kinh nghiệm
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1507302887/phabricator.jpg
translation: http://www.quora.com/How-did-Evan-Priestley-learn-to-program
excerpt: Trong phần 2 này, Evan kể về những ngày đầu của anh ở Facebook và đưa ra một số lời khuyên để nâng cao kỹ năng lập trình.
author: kcjpop
editor: chubbyanh
draft: true
---

Tôi đã mong chờ mình sẽ phải xoay sở để có thể làm việc ở Facebook, vì tôi chỉ là một kẻ bỏ học và tự học là chính mà không được đào tạo bài bản gì cả. Trước đó, tôi đã gặp những người giỏi hơn tôi nhiều ở những lĩnh vực khác. Ví dụ như năm lớp 7, tôi tham gia cuộc thi MathCounts vòng quốc gia trong một nhóm bốn người trong toàn bang ở Maine. Tôi cũng khá, nhưng có một học sinh khác trong nhóm mà tôi nghĩ giỏi hơn tôi ít nhất là mười lần. Tôi mong chờ mọi người ở Facebook cũng vậy.

Sau đó tôi nhìn vào code.

Chất lượng code chưa bao giờ là điểm mạnh của Facebook, nhưng vào năm 2007, codebase của Facebook đầy biến toàn cục và `extract()`. Có một cái wiki “PHP Best Practices” nói rằng “đừng dùng hàm, chậm lắm” (ý đồ ở đây tốt, nhưng thông điệp thì không rõ ràng). Và PHP thì tốt hơn JavaScript nhiều. Tôi nhận ra rằng mình có nhiều kinh nghiệm và kỹ năng hơn tôi nghĩ, và thật sự cảm thấy nhẹ nhõm (codebase của Facebook đã được cải thiện rất nhiều từ 2007.)

Tôi đã làm việc rất chăm chỉ ở Facebook, thậm chí còn nhiều hơn lúc ở Portland Webworks. Thời gian của tôi không bị phân chia nữa, vì tôi không còn phải đi học đại học (ở một số điểm, tôi làm việc 40 tiếng một tuần và dùng hết số giờ làm thêm cho phép), và nhìn chung những vấn đề của tôi trở nên ổn hơn. Tôi tham gia những thứ trong “startup” và làm việc rất rất nhiều giờ trong bốn năm tiếp theo.

Tôi nghĩ điều to lớn nhất giúp tôi phát triển chính là xây dựng khả năng đánh giá tốt hơn. Trong những năm đầu tiên tôi lập trình theo con đường chuyên nghiệp, tôi đã đưa ra rất nhiều quyết định sai lầm trong thiết kế hệ thống, nhưng khi tôi được thuê vào Facebook, tôi đã có đủ kinh nghiệm đến mức những gì tôi làm đều có sự cân bằng giữa tính đơn giản và phức tạp, và tôi có thể chỉ ra những vấn đề một cách tương đối tin được trong các hệ thống khác. Điều này rất khó để xây dựng, cũng như để hướng dẫn người khác, nhưng vô cùng có giá trị. Cách tốt nhất tôi biết để phát triển nó là phải bảo trì một hệ thống do chính mình phát triển trong một khoảng thời gian dài khi các yêu cầu liên tục thay đổi.

Tôi nghĩ tôi cũng nổi tiếng bởi một triết lý mà nó vẫn có chút khó hiểu với tôi. Facebook (và, tôi nghĩ, công nghệ phần mềm ngày nay nói chung, ở một mức độ nhất định) tin vào sự đánh đổi chất lượng cho tốc độ (được tóm tắt lại thành khẩu hiệu “Move Fast and Break Things” của Facebook). Tôi không tán thành khẩu hiệu này. Nó nói rằng “Nếu xây dựng cái gì đó thật là tệ hại, chúng ta có thể triển khai nó nhanh, hoặc nếu xây dựng cái gì đó thật tốt, chúng ta sẽ không bao giờ triển khai nó.” Do đó, mọi người chọn tốc độ và không ai cảm thấy khó chịu về chuyện không viết code một cách đúng đắn, vì đó là sự đánh đổi dĩ nhiên.

Tôi nghĩ sự phân biệt này hoàn toàn sai: bạn phải hành động nhanh hơn để xây dựng phần mềm có chất lượng (nếu không làm vậy, bạn không thể phản ứng chính xác khi mọi thứ – hay sự hiểu biết của bạn – thay đổi, và phần mềm của bạn không thật sự là một giải pháp tốt cho vấn đề), và bạn phải xây dựng phần mềm có chất lượng để hành động nhanh hơn (nếu không làm vậy, hạ tầng hệ thống của bạn luôn có vấn đề và bạn tốn nhiều thời gian hơn để xử lý). Và hệ thống bị đổ vỡ luôn làm lung lay ý chí của bạn, đặc biệt là đối với tôi. Theo kinh nghiệm thì tôi cũng khá nổi danh ở Facebook khi theo lý thuyết này, và hầu hết những gì tôi viết được chứng minh là bền vững. Điều này giúp tôi có chút tự tin vào những gì mình làm.

Nói xong rồi, đây là lời khuyên của tôi khi học lập trình:

* Nghỉ học ở trường ngay lập tức (đây không phải là lời khuyên nghiêm túc, đừng nghe theo nhé, ở lại trường, trường học khá tốt với bạn, đừng quên uống vitamin)
* Chắc chắn là bạn thật sự thích lập trình
* Bạn cần phải bỏ rất nhiều thời gian cho nó để trở nên giỏi hơn. Không có đường tắt nào cả và hầu hết những bài học có giá trị đều là những chiến thắng khó khăn thông qua kinh nghiệm.
* Kỹ năng quan trọng và độc đáo nhất chính là phát triển khả năng đánh giá thiết kế một hệ thống, nhờ đó bạn có thể lựa chọn các giải pháp càng đơn giản càng tốt, nhưng không quá đơn giản. Điều này rất khó để dạy và hầu hết được học từ kinh nghiệm.
* Học rộng thường quan trọng hơn học sâu. Các kỹ năng rộng hỗ trợ lẫn nhau và giúp bạn trở nên giỏi hơn ở tất cả lĩnh vực, và khai phá những điều mới. Các kỹ năng sâu chỉ hỗ trợ bản thân chúng. Bạn sẽ phát triển nhanh hơn khi cảm thấy có hiểu biết về tất cả các phần của hệ thống (dù không hiểu sâu) hơn là hiểu rõ về một phần của hệ thống đó.
* Điều tốt nhất bạn có thể làm để học bất cứ hệ thống phức tạp nào (lập trình hay những thứ khác) là phát triển một mô hình cách thức hệ thống đó hoạt động trong tâm trí bạn ở mức độ bao quát nhất, sau đó chỉnh sửa dần dần. Sau khi đủ phức tạp, mô hình của bạn sẽ cho phép dự đoán các hoạt động của hệ thống, cuối cùng là làm cho đánh giá của bạn trở nên hợp lý.
* Chất lượng với tốc độ chỉ là sự đánh đổi rất cục bộ. Khi ở mức độ toàn cục, đánh đổi cái này sẽ dẫn đến mất luôn cái kia.
* Luôn tìm tòi để hiểu tại sao và như thế nào mà sự việc xảy ra.
