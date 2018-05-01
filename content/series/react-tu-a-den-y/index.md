---
layout: series.njk
title: Giới thiệu
date: 2017-10-12
series: react-tu-a-den-y
author: kcjpop
editor: chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1517123699/Snapshot_Testing_React_Components_with_Jest_-_Semaphore_CI_nsxsuk.png)

React, nói không ngoa có lẽ là từ khóa "nóng bỏng" nhất trong giới lập trình front-end từ 2016 đến nay. Không hot sao được khi React là "con cưng" của Facebook, được hàng loạt các [công](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2) [ty](https://blog.discordapp.com/lessons-from-migrating-a-large-codebase-to-react-16-e60e49102aa6) [to bự](https://github.com/facebook/react/wiki/sites-using-react) trên thế giới sử dụng. Ở Việt Nam thì khỏi nói, thử tìm kiếm ["react căn bản"](https://encrypted.google.com/search?q=react+căn+bản) bạn sẽ thấy một loạt bài hướng dẫn học React trong 1-2-3-5 nốt nhạc, cùng hàng tá tin tuyển dụng với mức lương khá hấp dẫn.

**Vậy đây lại là một bài hướng dẫn về React nữa hả?**

Hoàn toàn chính xác. Có thể bạn đã biết React ở mức căn bản, nhưng khi bắt tay vào xây dựng một ứng dụng hoàn chỉnh, chúng ta cần phải biết thêm những khái niệm nâng cao trong React, cũng như các thư viện và công cụ trong hệ sinh thái liên quan.

Một điểm nữa là đa số bài được viết với React 14 hay 15 trong khi React đã ra phiên bản 16 "mới keng xà beng" với nhiều thay đổi. Đã đến lúc nên có loạt bài mới ;)

> **Tại sao lại "từ A tới Y"?**
> Vì một bài hướng dẫn khó có thể bao quát hết hệ sinh thái của React được. Rốt cuộc bạn cũng sẽ phải mò lên [trang React tiếng Anh](https://reactjs.org/) để xem thêm mà thôi. Loạt bài này chỉ giúp bạn có những chuẩn bị căn bản trước khi nhảy xuống "vực sâu muôn trượng" của React.

### Bạn cần chuẩn bị gì?

Không nhiều lắm. Bạn chỉ cần biết JavaScript căn bản, với một chút hiểu biết về [những tính năng mới của ES6](https://ehkoo.com/bai-viet/tong-hop-tinh-nang-noi-bat-es6) là đủ. Bạn cần biết dùng `npm` hoặc `yarn`, và nên cài đặt [NodeJS](https://github.com/creationix/nvm) phiên bản mới nhất.

Ngoài ra bạn còn cần một trình duyệt tốt, ví dụ như Mozilla Firefox hay Google Chrome phiên bản gần đây nhất, và một chương trình soạn thảo ngon lành như [Sublime Text](http://www.sublimetext.com), [Atom](https://atom.io/) hay [VSCode](https://code.visualstudio.com/). Bạn có thể dùng bất cứ hệ điều hành nào, và trong loạt bài này Ehkoo sử dụng Linux cho tất cả các ví dụ.

### Nếu bạn cần giúp đỡ?

Về nội dung tiếng Việt, bạn có thể bay thẳng vào phòng chat [#frontend](https://vietnamrb.slack.com/messages/C32HMMUAW/convo/C0TUQGY83-1518374834.000065/) của nhóm Vietnam Ruby, hoặc đặt câu hỏi ở group [React Việt Nam](https://www.facebook.com/groups/reactvietnam/).

Còn nếu rành tiếng Anh thì có lẽ cách nhanh nhất là [StackOverflow](https://stackoverflow.com/questions/tagged/reactjs) hoặc một số [kênh hỗ trợ](https://reactjs.org/community/support.html) chính thức.

### Bạn không thích đọc chữ dài dòng?

Nếu bạn thích xem video, có thể xem qua [playlist này](https://www.youtube.com/watch?v=rXpYNuOUIhQ&list=PLWBrqglnjNl0tzkepfj3cmKTF09jbcN5E) của anh Nguyễn Đức Hoàng, mà theo Ehkoo là có đầu tư về mặt chất lượng, cùng với giọng hướng dẫn truyền cảm :D

### Nội dung

Dưới đây là những chủ đề được dự kiến sẽ đề cập. Mục lục này sẽ cập nhật thường xuyên React ra phiên bản mới hoặc tình hình thế giới có biến động.

**React căn bản**

- Cài đặt và viết chương trình đầu tiên
- JSX là gì?
- React component và `props`
- `state` và cách xử lý sự kiện
- Xử lý danh sách và `key`
- Các vòng đời của React component
- Viết unit tests với Enzyme

**React nâng cao**

- Higher-order components
- Render props
- Xử lý form
- `ref` và cách tích hợp với thư viện ngoài
- Kiểm tra kiểu dữ liệu với PropTypes
- Chia sẻ state với `context`
- Fragments
- Portal và Error boundaries

**React Router**

- Giới thiệu
- Khai báo routes
- `<Link>`
- Demo

**Redux**

- Giới thiệu
- Actions là gì?
- Reducers là gì?
- Store là gì?
- Kết hợp với React
- Xử lý thao tác bất đồng bộ
- Middlewares

**Một số chủ đề khác**

- Cách tổ chức một ứng dụng React (và `redux`)
- CSS-in-JS với `styled-component`
- Định dạng code với `prettier`

### Góp ý + báo lỗi

"Thành phố nào không có rác, chương trình nào không có lỗi"

nên nếu bạn tìm thấy sai sót trong những tài liệu ở đây thì hãy thông báo ngay cho Ehkoo qua email `chao [at] ehkoo.com` nhé. Còn bây giờ thì, a lê hấp, mời bạn nhảy đến bài đầu tiên.
