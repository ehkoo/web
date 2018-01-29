---
layout: series.njk
title: Giới thiệu
date: 2017-10-12
tags: JavaScript, React
series: react-tu-a-den-y
author: kcjpop
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1517123699/Snapshot_Testing_React_Components_with_Jest_-_Semaphore_CI_nsxsuk.png)

React, React, React. Nói không ngoa chắc đây là từ khóa "nóng bỏng" nhất trong giới lập trình front-end từ 2016 tới giờ. Không hot sao được khi React là "con cưng" của Facebook, được xài bởi tè le hột me các [công](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2) [ty](https://blog.discordapp.com/lessons-from-migrating-a-large-codebase-to-react-16-e60e49102aa6) [to bự](https://github.com/facebook/react/wiki/sites-using-react) trên thế giới. Ở Việt Nam thì khỏi nói, thử tìm kiếm ["react căn bản"](https://encrypted.google.com/search?q=react+căn+bản) sẽ thấy một đống tin tuyển dụng và bài viết hướng dẫn học React trong 1-2-3-5 nốt nhạc.

> Vậy đây lại là một bài hướng dẫn về React nữa hả?

Hoàn toàn chánh xác. Mặc dù những bài ở trên đã làm rất tốt việc giới thiệu React ở mức căn bản, nhưng khi bắt tay vào xây dựng một ứng dụng hoàn chỉnh, bạn cần phải biết thêm những khái niệm nâng cao trong React, cũng như các thư viện và công cụ liên quan trong hệ sinh thái của chúng.

Một điểm nữa là đa số bài được viết với React 14 hay 15 trong khi React đã ra phiên bản 16 "mới keng xà beng" với nhiều thay đổi. Đã đến lúc nên có loạt bài mới ;)

> **Tại sao lại "từ A tới Y"?**
> Vì một bài hướng dẫn khó có thể bao quát hết hệ sinh thái của React được. Rốt cuộc bạn cũng sẽ phải mò lên [trang React tiếng Anh](https://reactjs.org/) để xem thêm mà thôi. Loạt bài này chỉ giúp bạn có những chuẩn bị căn bản trước khi nhảy xuống "vực sâu muôn trượng" của React.

### Bạn cần chuẩn bị gì?

Không nhiều lắm. Bạn chỉ cần biết JavaScript căn bản, với một chút hiểu biết về [những tính năng mới của ES6](https://ehkoo.com/bai-viet/tong-hop-tinh-nang-noi-bat-es6) là đủ. Bạn cần biết dùng `npm` và nên cài đặt [NodeJS](https://github.com/creationix/nvm) phiên bản mới nhất.

Ngoài ra bạn còn cần một trình duyệt tốt, ví dụ như Mozilla Firefox hay Google Chrome phiên bản gần đây nhất, và một chương trình soạn thảo ngon lành như [Sublime Text](http://www.sublimetext.com), [Atom](https://atom.io/) hay [VSCode](https://code.visualstudio.com/). Bạn có thể dùng bất cứ hệ điều hành nào, và trong loạt bài này Ehkoo sử dụng Linux cho tất cả các ví dụ.

### Nếu bạn cần giúp đỡ?

Về nội dung tiếng Việt, bạn có thể hỏi ở group [React Việt Nam](https://www.facebook.com/groups/reactvietnam/) hoặc bay thẳng vào phòng chat của Ehkoo tại [gitter.im/ehkoo/web](https://gitter.im/ehkoo/web) hoặc room [#frontend](https://vietnamrb.slack.com/messages/C32HMMUAW/convo/C0TUQGY83-1518374834.000065/) của nhóm Vietnam Ruby.

Còn nếu rành tiếng Anh thì có lẽ cách nhanh nhất là [StackOverflow](https://stackoverflow.com/questions/tagged/reactjs) hoặc một số [kênh hỗ trợ](https://reactjs.org/community/support.html) chính thức.

### Bạn không thích đọc chữ dài dòng?

Nếu bạn thích xem video, có thể xem qua [playlist này](https://www.youtube.com/watch?v=rXpYNuOUIhQ&list=PLWBrqglnjNl0tzkepfj3cmKTF09jbcN5E) của anh Nguyễn Đức Hoàng, mà theo Ehkoo là có đầu tư về mặt chất lượng, cùng với giọng hướng dẫn truyền cảm ;)

### Nội dung

Dưới đây là những chủ đề sẽ được đề cập:

**React căn bản**

- Cài đặt và viết chương trình đầu tiên
- JSX là gì?
- Component và `props`
- `state`, hàm xử lý sự kiện và các life-cycle hooks
- `ref` và cách tích hợp với thư viện ngoài

**Nâng cao**

- Higher-order components
- Portal và Error boundaries
- PropTypes (tùy chọn)

**ReactRouter**

- Căn bản
- Một số kinh nghiệm

**Redux**

- Căn bản
- Kết hợp với React

**Một số khái niệm khác**

- Cách tổ chức một ứng dụng React (và `redux`)
- CSS-in-JS với `styled-component`
- Định dạng code dễ dàng hơn với `prettier`

Mục lục ở trên hoàn toàn là dự kiến và sẽ cập nhật thường xuyên khi tình hình thế giới xảy ra biến động.

### Demo

Xuyên suốt trong loạt bài này, chúng ta sẽ cùng xây dựng một ứng dụng bán hàng đơn giản. Bạn có thể nghĩ đến Tiki hay Sen Đỏ nhưng đơn giản hơn. Ứng dụng của chúng ta sẽ có hai trang chính:

**Trang Sản Phẩm**

- Hiển thị danh sách sản phẩm
- Thực hiện các thao tác sắp xếp, phân loại và tìm kiếm trên danh sách sản phẩm
- Thêm sản phẩm vào giỏ hàng

**Trang Giỏ Hàng**

- Xem các sản phẩm trong giỏ hàng
- Thay đổi số lượng sản phẩm
- Xóa sản phẩm ra khỏi giỏ hàng

Còn bây giờ thì, a lê hấp, mời bạn nhảy đến bài đầu tiên.
