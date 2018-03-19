---
layout: post.njk
title: Tác giả của Prettier chia sẻ cách để code ngày một tốt hơn
slug: james-long-prettier-better-programmer
date: 2018-03-12
tags: Kinh nghiệm, Nhân vật, James Long, Prettier
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1520938084/Untitled_ufgjyd.jpg
translation: https://jlongster.com/How-I-Became-Better-Programmer
excerpt: "Làm thế nào để trình code ngày càng pro? Để luôn yêu nghề? Đọc ngay chia sẻ của anh James Long, tác giả thư viện Prettier nổi danh trong cộng đồng JavaScript!"
author: chubbyanh
editor: kcjpop
---
>Biển học không bến bờ, ngành lập trình có quá nhiều nhân tài, công nghệ mới thì xuất hiện liên tục không ngơi nghỉ. Có lúc nào bạn thấy “ngợp” và thoáng tự ti về bản thân? Cứ còng lưng code dạo như vầy thì mấy đời nữa mới thành [Mr. Robot](http://www.imdb.com/title/tt4158110/)? Làm thế nào để tránh tình cảnh một ngày nọ, sau vài năm OT miệt mài, bạn tỉnh dậy buổi sáng và chợt muốn lật bàn đập máy tính giải nghệ luôn cho rồi?
>
>Sau đây là những chia sẻ gan ruột của James Long, cựu lập trình viên Mozilla, tác giả của công cụ Prettier rất nổi tiếng trong cộng đồng JavaScript, đồng thời là nhà sáng lập [Shift Reset LLC](http://shiftreset.co/), giúp bạn:
> * Nuôi dưỡng tình yêu dài lâu với công việc lập trình (_phải dồi_, yêu _con_ hay _cái_ gì, đều phải bỏ công ra nuôi thì mới bền).
> * Ngày một nâng cao kĩ năng chuyên môn (là code đấy ạ).
> * Tránh không bị kiệt sức, dẫn đến chán ghét bản thân và đòi bỏ nghề!

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1520938084/Untitled_ufgjyd.jpg)
_James Long -- cựu nhân viên Mozilla, tác giả của Prettier_

Tôi năm nay 32 tuổi, có hơn 10 năm kinh nghiệm làm lập trình, và cũng đạt được đôi chút thành tựu. Có lẽ vì vậy mà một số bạn coi tôi là “tiền bối”, thậm chí còn nhờ tôi cho lời khuyên về cách để nâng cao kĩ năng lập trình.

Cảm ơn các bạn đã hỏi. Nhưng thú thực, không phải lúc nào tôi cũng tự tin về khả năng của bản thân. Trái lại, cho đến tận bây giờ, tôi vẫn thường xuyên nghi hoặc chính mình. Và vấn đề nằm ở chỗ, sự nghi hoặc ấy không sao xua hẳn đi được. Nên tôi nghĩ, thôi thì cứ kệ cmn. Mình cứ làm, cứ code, rồi tích lũy kinh nghiệm dần dần là được.

Dưới đây là một số kinh nghiệm để phát triển kĩ năng lập trình mà tôi tự đúc rút cho chính mình. Mong rằng chúng cũng có thể giúp ích được cho bạn.

### 1. Tìm người có thể truyền cảm hứng cho bạn, nhưng chớ có dại thần tượng họ.

Trong những năm qua, đã có rất nhiều người mà tôi luôn dõi theo, và nhờ vậy mà học hỏi được nhiều công nghệ mới. Tôi đơn giản là đặt lòng tin ở họ, tin những chỉ dẫn của họ là đúng, và đào sâu thêm những vấn đề họ nêu ra. Những người này thường cực kì thông thái, năng suất, và tràn đầy năng lượng tích cực. Hãy tìm họ, và hãy để họ truyền cảm hứng cho bạn!

Nhưng, hãy chắc chắn là bạn sẽ không thần tượng ai. Bởi vì, nếu chỉ nhìn vào những kết quả mà họ “khoe” ra, những thông tin tổng kết trên twitter, thì mọi việc dường như thật dễ dàng. Song, tiến đến nhìn gần hơn vào công việc thực tế của họ, bạn sẽ thấy cũng đầy rẫy những vấn đề mà chính bạn đang phải đối diện hàng ngày. Ví dụ: hacks khắp nơi.

Cũng chớ có tin ai mù quáng. Nếu bạn không đồng tình, hãy thử thảo luận với họ rồi học hỏi từ đó. Tôi đã có một số cuộc thảo luận cực kì hiệu quả và hữu ích cho công việc – nhờ cách này.

Nói đâu xa, thiết lập Emacs của tôi chính là một đống bùi nhùi. Tôi không biết tại sao phần auto-complete của OCalm không chạy được (nó bị vậy hơn một tháng nay rồi). Tôi không tự động hóa mọi thứ, và thi thoảng phải đào bới trong lịch sử của terminal để tìm câu lệnh cần thiết. Nhưng tôi kệ, cứ viết code xấu điên trước đã. Tôi gán giá trị vào biến toàn cục, cho đến khi biết rõ mình đang làm gì.

Vậy đấy. Những lập trình viên dày dặn kinh nghiệm nhất cũng dùng hacks suốt ấy mà, miễn sao công việc chạy. Mà nói cho cùng, chẳng phải tất cả chúng ta đều đang thử nghiệm sao.

### 2. Đừng tự đánh giá thấp công việc của mình a.k.a NGƯNG QUẰN QUẠI!

“Lính mới” thường có xu hướng cảm thấy công việc của mình không đáng giá cho lắm, vì họ còn non nớt. Thậm chí, các lập trình viên dày dạn kinh nghiệm cũng thường lo lắng tương tự khi bước chân vào một lĩnh vực mới.

Nhưng theo tôi thấy, chính các “lính mới” lại hay có những ý tưởng xuất sắc, bởi vì họ nhìn thấy được sự cải tiến của công nghệ hiện tại; trong khi những anh kì cựu thường bị cái nhìn định kiến của chính mình ngăn trở.

Cho nên, hãy luôn vững tin rằng những việc bạn làm là đáng giá. Kể cả, nếu như ý tưởng thất bại, thì có sao? Cộng đồng hoàn toàn có thể học hỏi từ đó, ví dụ: tại sao hướng tiếp cận như vậy là không phù hợp.

_(Một lưu ý cho cộng đồng: chúng ta nên tiếp nhận vấn đề theo hướng này, và chào đón những “người mới”.)_

### 3. Đừng lúc nào cũng cắm đầu cắm cổ làm việc.

Công nghệ thay đổi liên tục, sóng sau đè sóng trước không ngừng nghỉ. Điều này dễ khiến bạn cảm thấy sẽ bị cả thế giới bỏ lại nếu dám nghỉ ngơi, dù chỉ một ngày.

Chớ dại. Sự thật là, những công nghệ được cập nhật mỗi ngày – thực ra chỉ là sự “làm mới”, diễn giải lại những ý tưởng sẵn có. Còn đột phá mang tính cách mạng thường chỉ xảy ra vài năm một lần. (Xem thêm [chia sẻ của Rich Hickey](https://www.youtube.com/watch?v=f84n5oFoZBc) về Hammock Driven Development).

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1520942910/maxresdefault_qzlr2h.jpg)
_Rich Hickey -- tác giả của Clojure_

Thêm nữa, bạn sẽ làm việc tốt hơn nhiều nếu được nghỉ đầy đủ. Trí tuệ bạn sẽ minh mẫn, đầu óc bạn sáng láng, và cách bạn nhìn nhận vấn đề cũng sẽ tươi mới hơn. Bản thân tôi thường nảy ra nhiều sáng kiến khi đang-không-làm-việc.

### 4. Đừng phung phí thời gian vào những việc không cần thiết.

Bạn sẽ làm nhanh hơn nhiều nếu chịu lược bỏ những công việc không cần thiết. Nói chung, thời gian của mỗi người đều hữu hạn, hãy sử dụng sao cho khôn ngoan.

Như thế nào là _những công việc không cần thiết_? Hmm, cái này cũng tùy trường hợp, tùy quan niệm của mỗi người. Nhưng đại khái là những thứ đã có sẵn, mà bạn cặm cụi đi làm lại từ đầu chẳng hạn. Hoặc những việc không phải trọng tâm, không giúp nâng cao kĩ năng của bạn.

Ví dụ, với tôi thì những việc “không đáng” là: _cú pháp ngôn ngữ, API của các thư viện, cách cấu hình các công cụ build_. Theo tôi, học cú pháp của ES7 không giúp ích nhiều cho chuyên môn lập trình -- so với chuyện mày mò học cách các trình biên dịch làm việc. Hoặc, học cách dùng một thư viện mới được xây dựng trên một ý tưởng cũ cũng không đáng để bỏ công.

Cũng đừng dành hầu hết thời gian chỉ để tỉa tót code sao cho đẹp. Tôi nói thật, code của bạn rồi sẽ thay đổi theo thời gian. Tốt hơn là hãy dành thời gian đó để suy nghĩ về những vấn đề cốt lõi cần giải quyết, và suy nghĩ thật kĩ về các mức độ trừu tượng trong mã nguồn. Khi nào “chiến” xong hết đám này thì bạn bỏ chút thời gian ra để trau chuốt code cho xinh đẹp hơn cũng ok.

### 5. Hãy mày mò học hỏi từ các bài nghiên cứu đã có sẵn.

Khi nảy ra một ý tưởng, dĩ nhiên ai cũng hăng hái muốn bắt tay vào làm ngay. Nhưng theo tôi, hãy khoan. Hãy bình tĩnh ngồi xuống, lần giở lại những nghiên cứu trước đó về vấn đề tương tự đã. Như bản thân tôi, sau mấy ngày mày mò tìm hiểu về một vấn đề nào đó, giải pháp tôi nghĩ ra lúc ban đầu thường sẽ thay đổi.

Các tài liệu học thuật đúng là khó nuốt trôi thật. Ví dụ, tôi không biết tí gì về ngữ nghĩa chỉ xưng (denotational semantic) hay ngữ nghĩa thao tác (operational semantic), thành ra có rất nhiều bài nghiên cứu tôi không đọc nổi. Nhưng, cũng có rất nhiều tài liệu sử dụng code thay cho toán học, và không quá khó để “gặm”.

[Prettier](https://prettier.io/) là một ví dụ tuyệt vời trong trường hợp này. Tôi biết là tôi muốn Prettier phải chạy như thế nào, nhưng tôi hoàn toàn không biết làm sao để xây dựng nó. Tìm hiểu một chút thì tôi mò ra [bài nghiên cứu này](http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf), và sau vài ngày, tôi đã biết chính xác điều mình cần làm. Trong vòng một tuần tôi làm được một ứng dụng căn bản là chạy được. Nếu tôi bỏ qua nghiên cứu đầu tiên, chắc hẳn sẽ tốn nhiều thời gian hơn.

Nếu bạn chưa biết phải tìm các bài nghiên cứu cũ ở đâu, thì [Papers We Love](https://github.com/papers-we-love/papers-we-love) trên Github là một điểm khởi đầu tốt.

### 6. Hãy nhận các dự án lớn. Hãy rời khỏi “vùng an toàn”.

Không có gì quý giá hơn là kinh nghiệm thực tế. Nếu bạn có thời gian, hãy thử làm một số dự án lớn. Bạn không cần hoàn thành chúng cũng được. Miễn là thử giải quyết một vấn đề gì đó lớn, ví dụ như thử viết một trình biên dịch. Tôi dám cá, chỉ trong vòng mấy tuần, bạn sẽ học được vô khối điều hay ho.

Thực tình tôi rất ghét cảm giác bó tay không biết làm sao để giải quyết một vấn đề phức tạp. Cực kì bứt rứt khó chịu. Tôi biết rằng tôi sẽ phải học, đọc, nghiên cứu rất nhiều trước khi chọn ra giải pháp. Nhưng tôi cũng biết, chuyên môn của tôi sẽ tốt hơn nhiều sau đó.

Hãy bắt đầu với việc học một ngôn ngữ lập trình mới. Đó là cách hiệu quả nhất để ép bạn phải thoát khỏi những thói quen hiện tại, và nhìn mọi thứ theo một cách khác. Với tôi, hồi mới chập chững vào nghề, điều đúng đắn nhất mà tôi từng làm là học [Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)). Đây là một ngôn ngữ siêu đơn giản, và buộc bạn phải làm mọi thứ theo kiểu lập trình hàm, cũng như phải thực sự học hiểu được các nguyên tắc cơ bản để code hoạt động. Mấy năm học Scheme _vẫn còn giúp ích_ cho tôi đến tận ngày nay: cách tôi nhìn code cơ bản là đã thay đổi hoàn toàn.

![(car (cdr life)) means the "first day of the rest of your life"](https://res.cloudinary.com/duqeezi8j/image/upload/v1520942246/J5IXMj1fIlqWhDhp1bWK-t4M2PpMqn5qstGUad6AFBE_oyczfz.jpg)
_"The Little Schemer" là quyển sách rất tốt để bắt đầu học Scheme_

Sau đây là một số điều đã tác động rất lớn đến sự nghiệp lập trình của tôi, giúp tôi không những phát triển kĩ năng chuyên môn, mà còn sảng khoái tinh thần. Chúng thực sự rất hữu ích cho tôi, nên hi vọng là cũng sẽ giúp ích cho bạn:

* Học C: chỉ học cơ bản thôi, nếu bạn chưa sẵn sàng. Ít nhất là học đủ để hiểu tại sao mọi người suốt ngày rên rỉ phàn nàn về nó hahaha.
* Viết một trình biên dịch: có lẽ đây là cách học khổ hạnh nhất. Hãy thử [trình biên dịch siêu nhỏ](https://github.com/thejameskyle/the-super-tiny-compiler) này xem sao.
* Học macros: Scheme, Lisp, hoặc Clojure(Script). Macros sẽ thay đổi hoàn toàn cách bạn nhìn code.
* SICP: [SICP](https://mitpress.mit.edu/sicp/full-text/book/book.html) là cuốn sách cũ mèm, song theo tôi, nó vẫn còn giá trị đến tận hôm nay. Nó giả định rất ít kiến thức về lập trình, và hướng dẫn bạn cách để triển khai một trình biên dịch và đánh giá. Một cuốn sách khác chuyên sâu hơn về trình biên dịch mà tôi cũng rất thích là [Lisp in Small Pieces](https://www.amazon.com/Lisp-Small-Pieces-Christian-Queinnec/dp/0521545668).
* Tìm hiểu về tính liên tục (continuations): Continuations là một cơ chế quản lý luồng của chương trình ở mức thấp. Scheme là ngôn ngữ duy nhất cài đặt tính năng này, và dù bạn có thể sẽ không bao giờ dùng đến chúng, song continuation sẽ thay đổi cách bạn suy nghĩ về luồng.
* Học ngôn ngữ lập trình mới. Ngôn ngữ nào cũng được, tùy sở thích cũng như công việc của bạn. Bản thân tôi thì đề xuất: Clojure, Rust, Elm, OCaml/Reason, Go, hoặc Scheme. Những ngôn ngữ này đều có các tính năng rất độc đáo, và sẽ buộc bạn phải học cách nghĩ khác đi.
