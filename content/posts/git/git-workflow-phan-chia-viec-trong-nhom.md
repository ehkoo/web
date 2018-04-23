---
layout: post.njk
title: Phân nhánh và chia việc trong nhóm với git
slug: git-workflow-phan-nhanh-va-chia-viec-trong-nhom
date: 2018-04-22
tags: git, Dành cho người mới
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1524412631/dedicated-developers-team-99_xcifp3.jpg
excerpt: Bằng cách làm theo các bước trong bài viết này, khả năng cao là team của bạn không còn phải vò đầu bứt tai lôi nhau ra cắn xé mỗi khi code bị xung đột với nhau.
author: kcjpop
editor: chubbyanh
---
Bạn là lập trình viên trong một dự án nọ. Công ty startup nên ít người, chỉ có bạn là tech nên bạn "ba đầu sáu tay" làm tất cả mọi chuyện. Một ngày làm việc của bạn diễn ra hoàn toàn bình thường: viết code băng băng tốc độ 500 dòng/giờ, code mới ra commit liên tục vào `master`, đến cuối ngày thì `git push`, tắt máy và gọi điện rủ gấu đi nhậu (hoặc ít êm đẹp hơn, băng rừng vượt suối về nhà thay tã cho con). Bạn cảm thấy mình thật giỏi.

Cho đến một hôm, sếp (hoặc đồng sáng lập với bạn) thương quá quyết định tuyển thêm 2 em lập trình viên "mầm non" vào giúp bạn. Và rồi mọi chuyện bắt đầu phức tạp lên xíu: code trong team bị chồng chéo và xung đột liên tục, branch `master` đang thẳng tắp xinh đẹp bỗng nhiên phân nhánh như điên, tốc độ code của bạn giảm trong khi tốc độ văng tục tăng nhanh. Bạn không còn thời gian đi nhậu với gấu, con bạn bị thâm mông vì bạn không về thay tã kịp. Bế tắc.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1524414315/git-merge-hell-smaller_lxhizg.png)
_Nhìn hình này bạn có thấy quen không (nguồn: Xebia.com)?_

Bài viết này xin chia sẻ với bạn một số quy ước khi sử dụng git trong team nho nhỏ vừa vừa, giúp bạn tránh tình trạng "giẫm phải chân nhau", làm việc hiệu quả hơn, đồng thời xây dựng tình đồng nghiệp thêm khắng "khít".

### Vậy vứn đề ở đây là gì?

Không có gì nghiêm trọng cả, chỉ là chúng ta chưa có một quy ước phân chia nhánh (branch) hợp lý thôi. So với các chương trình quản lý phiên bản khác như SVN, khả năng phân nhánh của git phải nói là siêu nhẹ và cực kì dễ dàng. Do đó bạn có thể chia dự án thành 2 nhánh chính:

* `master`
* `dev`

Nhánh `master` sẽ là nơi chứa phần code **ổn định nhất**, sẵn sàng để triển khai bất cứ lúc nào. Trong khi đó, nhánh `dev` ban đầu được tách ra từ `master`, và sẽ chứa phần code **mới nhất** được phát triển.

> **Nói nhỏ:** Một số tài liệu sẽ đặt tên nhánh `develop`. Bạn thích đặt tên gì cũng được, chỉ là `dev` thì gõ nhanh hơn `develop` thôi.

**Nhắc bài chút xíu**
Để tạo nhánh mới trong git, bạn dùng lệnh.

```bash
git checkout -b <tên nhánh mới> [nhánh gốc]
```

Chẳng hạn như, để tạo nhánh `develop`  từ `master` bạn gõ `git checkout -b develop master`. Nếu không cung cấp tham số `[nhánh gốc]`, nhánh mới tạo sẽ dựa trên nhánh hiện tại bạn đang ở. Để xem nhánh hiện tại là nhánh nào, bạn có thể dùng lệnh.

```bash
$ git branch
  auth
  auth-error-handlers
* auth-session
  dev
  ggmap
  graphql
  master
```

Trong ví dụ trên thì nhánh hiện tại chính là `auth-session`.

### Phân chia công việc

Mỗi khi phát triển tính năng mới, bạn sẽ tạo một nhánh từ `dev`.

```bash
git checkout -b login dev
```

> **Đặt tên nhánh là gì đây?**
> Cái này thì tùy bạn thôi. Một số tài liệu sẽ khuyến khích bạn dùng tiền tố `feature/<tên tính năng>` để dễ phân biệt, nhưng theo kinh nghiệm thì ngầm định là ngoài nhánh `master`, `dev`, và các nhánh `fix-xxx`, tất cả các nhánh còn lại đều là nhánh chức năng.

Bạn là vua của nhánh này, nên tha hồ muốn làm gì thì làm nhé. Hãy commit thường xuyên, cho dù là với thay đổi nhỏ nhất. Bạn đừng ngại những commit nhỏ sẽ làm cho `git log` khó theo dõi. Chúng ta sẽ xem cách xử lý chúng sau.

> **Câu hỏi:** Lỡ có hai hay nhiều người cùng làm chung một tính năng thì sao?
> Trường hợp này bạn có thể tiếp tục chia nhỏ nữa, sao cho mỗi người có thể làm việc trên một nhánh độc lập. Theo kinh nghiệm cá nhân, thường một tính năng _to_ sẽ có nhiều nhất là 2-3 người cùng phát triển. Nếu nhiều hơn con số này, cần phải xem lại định nghĩa và cách phân chia cho tính năng đó.

### Chuẩn bị merge vào `dev`

Sau khi code hoàn tất và tất cả unit tests đã chạy thành công, giờ là lúc bạn merge/gửi code để review tính năng mới vào `dev`. Có thể có 2 trường hợp xảy ra:

**Trường hợp 1: Không có gì mới trong `dev`**

Giả sử lúc đó git history của dự án giống như thế này.

<script async src="//jsfiddle.net/r7rp7sp5/31/embed/result/"></script>

Như bạn thấy, nhánh `login` màu vàng được rẽ ra từ nhánh `dev` màu xanh, và trong nhánh `dev` không có code gì mới. Đây là trường hợp lý tưởng, đảm bảo khi merge vào `dev` chúng ta sẽ không bị xung đột code.

**Trường hợp 2: Có commits mới trong nhánh `dev`**

<script async src="//jsfiddle.net/r7rp7sp5/30/embed/result/"></script>

Trong trường hợp này, branch `dev` (màu xanh) đang có 2 commits phía trước branch `login` (màu vàng). Nếu trong 2 commits đó có chứa thay đổi liên quan đến `dev`, chẳng hạn như `package.json`, thì khả năng cao là sẽ xảy ra xung đột khi merge trực tiếp `login` vào. Trong trường hợp may mắn không có xung đột code thì merge vào cũng làm xấu đi history.

<script async src="//jsfiddle.net/r7rp7sp5/33/embed/result/"></script>

Do đó, chúng ta cần sẽ sửa lại history của nhánh `login` bằng cách dùng `git rebase`.

#### git rebase là gì?

`git rebase` sẽ đem những commits bên trong nhánh `login` và áp dụng lại vào sau commit mới nhất trong nhánh `dev`. Cú pháp của lệnh này là:

```bash
git rebase <tên nhánh muốn áp dụng lại>
```

Chúng ta sẽ chạy những lệnh sau:

```bash
# Cập nhật repo hiện tại, đồng thời lấy về commits mới nhất của `dev`
git pull
# Chuyển qua nhánh `login`, có thể bỏ qua bước này nếu bạn chắc chắn
# mình đang ở `login`
git checkout login
# Tiến hành rebase
git rebase dev
```

Nếu xảy ra xung đột code, bạn có thể phát hiện và giải quyết chúng sớm. Nguyên tắc chung là không sửa code của người khác, và chỉ kết hợp thêm những gì bạn làm. Việc thực hiện rebase tại nhánh chức năng do bạn phụ trách giúp giảm thiểu khả năng mất code, vì bạn là người hiểu rõ nhất phần code bạn viết.

Sau khi giải quyết hết các xung đột, bạn chạy `git rebase --continue` để tiếp tục tiến trình rebase. Bạn cũng có thể chạy `git rebase --abort` để hủy bỏ rebase và đưa nhánh `login` về lại trạng thái ban đầu.

> **Mách nhỏ:** Một cách giúp cho việc giải quyết xung đột trong code dễ dàng hơn là dùng `git mergetool`. Có rất nhiều công cụ hỗ trợ, và [Meld](http://meldmerge.org/) là một trong số đó.
> Nếu bạn chưa quen rebase, bạn có thể tạo một branch mới từ `login`, `git checkout -b test login` chẳng hạn, và tiến hành rebase trên branch này. Sau khi đã chắc chắn mọi thứ ổn thỏa, bạn có thể quay lại và tiến hành rebase cho `login`.

Sau khi rebase xong, hi vọng history của bạn sẽ giống như thế này:

<script async src="//jsfiddle.net/r7rp7sp5/32/embed/result/"></script>

Bạn thấy quen không? Chính là trường hợp 1 đã nói ở trên đó.

#### rebase interactively

Ở phần trên chúng ta có nói đến việc commit thường xuyên sẽ tạo ra nhiều commit nhỏ và đôi khi chúng không cần thiết. Bạn có thể dùng git rebase để dọn dẹp chúng bằng cách thêm vào tham số `-i` (interactively) như sau:

```bash
# Chắc chắn rằng bạn đang ở nhánh `login`
git checkout login
# Rebase lên dev interactively
git rebase dev -i
```

Bạn sẽ được chuyển đến một giao diện tương tự như bên dưới.

```bash
pick ff80e85 A way to organize routes per module
pick 67cf18d Try Netlify Functions
pick 5546901 Add Dashboard view
pick 2a66ae3 Change layout
pick 58755b4 Add Books module, 404 page.
pick fd79cb9 Refactor. Reduce inline styling.
pick c671f60 Restyling 404 page.
pick 33ef874 Basic layout for book management page.
pick 49c423a Clean up UI a bit
pick 3aa2840 Init
```

Theo lý thuyết, rebase sẽ đem từng commit và áp dụng lại theo thứ tự từ trên xuống dưới. Do đó bạn có thể thoải mái sắp xếp lại thứ tự của các commits trên. Bạn để ý lệnh `pick` ở phía trước mỗi commit. Lệnh này sẽ báo cho git biết hành động bạn muốn làm với commit, trong trường hợp này là sử dụng áp dụng lại commit. Ngoài `pick` chúng ta còn có:

* `reword (r)`: áp dụng lại commit, và sửa commit message
* `edit (e)`: áp dụng commit, nhưng dừng quá trình rebase lại để sửa code
* `squash (s)`: kết hợp commit hiện tại vào commit trước nó
* `fixup (f)`: giống như squash như bỏ đi commit message
* `exec (x)`: chạy một lệnh shell nào đó
* `drop (d)`: bỏ, không sử dụng commit này

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1524470951/Peek_2018-04-23_11-06_zkqjpt.gif)
_Bạn có thể dùng các chữ viết tắt cho command_

Bằng cách dùng rebase interactively, chúng ta có thêm nhiều quyền để quản lý và sửa đổi commits theo ý mình, làm cho history sạch đẹp hơn.

### Merge vào `dev`

Sau khi dọn dẹp nhánh `login` cho sạch đẹp, chúng ta đã có thể tiến hành merge nhánh này vào `dev`. Thông thường bạn, lập trình viên ngôi sao, sẽ là người tiến hành kiểm tra và merge. Bạn có thể chọn hai cách tiếp cận:

#### merge

Khi merge, bạn có thể merge trực tiếp vào `dev` như thế này:

```bash
# Chuyển qua nhánh `dev`
git checkout dev
# Merge `login` vào `dev`
git merge login
```

Kết quả sẽ là:

<script async src="//jsfiddle.net/r7rp7sp5/34/embed/result/"></script>

Như bạn thấy, một commit mới được tạo ra, giúp bạn dễ dàng nhận biết thời điểm nhánh `login` được merge vào. Cách thức này gọi là `merge fast-forward`. Khi dự án phát triển dần theo thời gian, history của `dev` sẽ như thế này.

<script async src="//jsfiddle.net/0agufwbv/2/embed/result/"></script>

Bên cạnh đó, chúng ta cũng có cách `merge non-fast-forward`:

```bash
git merge login --no-ff
```

Và đây là kết quả:

<script async src="//jsfiddle.net/r7rp7sp5/35/embed/result/"></script>

Tất cả commits của `login` đã được kết hợp vào `dev`. `login` biến mất khỏi thế gian như chưa hề tồn tại. SAD!

Lợi ích dễ thấy nhất của `merge non-fast-forward` là giúp cho history của bạn thẳng thóm gọn gàng, và bất lợi là bạn không phân biệt được commits nào là của nhánh tính năng, cũng như thời điểm merge diễn ra. Trong trường hợp nhánh tính năng có quá nhiều commits nhỏ và dư thừa, chẳng hạn như những commits sửa lỗi chính tả, cập nhật thư viện..., history của bạn sẽ bị nhiễu.

#### rebase, squash và merge

Ngoài cách merge các commits của nhánh tính năng vào `dev`, bạn có thể rebase và squash tất cả commits lại làm một, sau đó tiến hành merge. Cách làm này giúp cho `dev` luôn ở trạng thái gọn gàng nhất và không chứa commit dư thừa. Trường hợp lý tưởng, history của `dev` sẽ giống như sau.

<script async src="//jsfiddle.net/0agufwbv/5/embed/result/"></script>

Để cách làm này phát huy tối đa hiệu quả, yêu cầu commit message phải được viết thật rõ ràng và chi tiết.

### Merge vào `master`

Sau một thời gian quằn quại, cuối cùng team của bạn cũng đã ra được sản phẩm tương đối ổn. Đã đến lúc merge vào `master` và triển khai lên server. Lúc này cũng như khi merge vào `dev`, bạn có thể chọn `merge` (fast-forward hoặc non-fast-forward) hay `rebase, squash và merge`, nhưng theo kinh nghiệm cá nhân, `merge --no-ff` sẽ là lựa chọn tốt nhất, giúp cho `master` và `dev` luôn song song với nhau.

### Hotfix

Hôm nay là thứ 6, ngày 1X. Bạn chạy `npm run build` rồi `rsync` code ở `master` lên server. Mọi thứ hoàn toàn bình thường. Bạn vào website, click vài cái, "chạy", bạn thầm nghĩ. "Ngon rồi, nhậu thôi", bạn khoan khoái vươn vai chuẩn bị gọi điện cho gấu thì "ò e ò e", chuông điện thoại vang lên. "Số của sếp, chắc gọi khen mình đây!" Bạn bắt máy và chợt nghe giọng sếp âu yếm: "lỗi rồi".

Trong trường hợp này, hãy thật bình tĩnh và tạo một branch mới từ `master`, `fix-xxx` chẳng hạn. Sau khi nghe sếp dặn dò, bạn mò trong đống code và phát hiện ra lỗi trong vòng 1 nốt nhạc (vì bạn là lập trình viên ngôi sao mà). Bạn rủa thầm ku "mầm non" viết code không kỹ, đồng thời chửi rủa bản thân review sót. Thôi kệ, dù sao cũng nên sửa nhanh rồi về.

Bạn `merge --no-ff` nhánh `fix-xxx` vào cả hai nhánh `master` và `dev`. Bằng cách này, phần sửa lỗi sẽ xuất hiện ở cả hai branches, giúp history không bị rẽ nhánh bất ngờ.

Bạn push và chuông điện thoại lại vang lên...

### Vài vấn đề linh tinh khác

#### Có cần nhánh `staging` không?

Trong một số dự án có tồn tại một đội ngũ gọi là QC hay QA. Nhóm này thường là kẻ thù của anh chị em dev nên hai bên thường không hữu hảo cho lắm. Dù sao, họ cũng sẽ cần một nhánh riêng gọi là `staging`. Nhánh này sẽ chứa phần code ở giữa `master` và `dev`. `staging` được tách ra từ `dev`, có nhiều tính năng hơn `master` và tương đối ổn định để có thể merge vào `master`.

<script async src="//jsfiddle.net/0agufwbv/6/embed/result/"></script>

Tùy vào tính chất của team mà bạn có thể quyết định có `staging` hay không.

#### Viết commit message như thế nào cho chuẩn?

_TBA_

#### Có nên tag version hay không?

Câu trả lời là _HÊN XUI_. Cái này lại tiếp tục tùy thuộc vào tính chất của team. Nếu tần suất triển khai code từ `master` của team không cao, khoảng vài tháng/lần thì tag version là cách tốt để theo dõi những thay đổi. Còn nếu team bạn theo chuẩn "move fast, break things" thì có lẽ không cần tag version đâu. Với nữa, để tag version phát huy hiệu quả tối đa, cần thiết _CHANGELOG_ phải được viết kỹ càng.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1524474052/tumblr_lc63ingGof1qz6pqio1_500_mybavi.png)
_Already broken_

### Kết luận

Chúng ta có thể tóm tắt bài này lại như sau:

* Dự án được chia thành nhiều nhánh, bao gồm `master`, `dev` và có thể có `staging`
* Các nhánh tính năng được chia ra từ `dev`, phát triển độc lập, được rebase trước khi merge lại vào `dev`
* Rebase có thể thay đổi một chút history, hoặc squash lại thành một commit duy nhất
* Merge có thể là fast-forward hoặc non-fast-forward
* `dev` sẽ được merge vào `master` mỗi khi triển khai
* Các nhánh hotfix sẽ được chia ra từ `master`, sau đó `merge --no-ff` vào `master` và `dev`

Dĩ nhiên bài viết này chỉ mang tính tham khảo, vì với mỗi team mỗi công ty sẽ có những cách làm riêng. Nhưng nếu bạn rơi vào trường hợp như ở đầu bài thì đây là một workflow để bạn nghiên cứu và áp dụng. Mong là trong tương lai, dự án của bạn sẽ không trở thành "kim tự tháp" như hình dưới đây.

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1524414465/11406260_10204684523099229_6956873399787391385_o_mscrhf.jpg)
