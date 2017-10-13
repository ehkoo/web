---
layout: series.njk
title: Giới thiệu
date: 2017-10-12
tags: JavaScript, React, Frontend
series: react-tu-a-den-y
author: kcjpop
---
React, React, React. Nói không ngoa chắc đây là từ khóa "nóng bỏng" nhất trong giới lập trình front-end từ 2016 tới giờ. Không hot sao được khi React là "con cưng" của Facebook, được xài bởi tè le hột me các [công](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2) [ty](https://blog.discordapp.com/lessons-from-migrating-a-large-codebase-to-react-16-e60e49102aa6) [to bự](https://github.com/facebook/react/wiki/sites-using-react) trên thế giới. Ở Việt Nam thì khỏi nói, thử tìm kiếm ["react căn bản"](https://encrypted.google.com/search?q=react+căn+bản) sẽ thấy một đống tin tuyển dụng và bài viết hướng dẫn học React trong 1-2-3-5 nốt nhạc.

> Vậy đây lại là một bài hướng dẫn về React nữa hả?

Hoàn toàn chánh xác. Mặc dù những bài ở trên đã làm rất tốt việc giới thiệu React ở mức căn bản, nhưng khi bắt tay vào xây dựng một ứng dụng hoàn chỉnh, bạn cần phải biết thêm những khái niệm nâng cao trong React, cũng như các thư viện và công cụ liên quan trong hệ sinh thái của chúng.

Một điểm nữa là đa số bài được viết với React 14 hay 15 trong khi React đã ra phiên bản 16 "mới keng xà beng" với nhiều thay đổi. Đã đến lúc nên có loạt bài mới ;)

<small>*Thật ra thì do Ehkoo mới hoạt động trở lại nên viết cái gì đó dễ hút khách một chút. Cái này là bí mật của đôi ta thôi, đừng cho ai biết nhé.*</small>

> **Tại sao lại "từ A tới Y"?**
> Vì một người không thể nào bao quát hết hệ sinh thái của React được. Rốt cuộc bạn cũng sẽ phải mò lên [trang React tiếng Anh](https://reactjs.org/) để xem thêm mà thôi. Loạt bài này chỉ giúp bạn có những chuẩn bị căn bản trước khi nhảy xuống "vực sâu muôn trượng" của React.

#### Từ chối trách nhiệm

Mình hoàn toàn **KHÔNG THÍCH** xài React vì tính phổ biến cũng như dung lượng "cồng kềnh" của nó. Nhưng vì miếng cơm manh áo mà mình phải làm React hàng ngày nên coi như cũng có chút kinh nghiệm. Bạn đã được cảnh báo!

#### Về bạn

Bạn chỉ cần biết JavaScript căn bản, với một chút hiểu biết về [những tính năng mới của ES6](http://babeljs.io/learn-es2015/#ecmascript-2015-features) là đủ. Bạn cần biết dùng `npm` và nên cài đặt [NodeJS](https://github.com/creationix/nvm) bản gần đây nhất.

Ngoài ra bạn còn cần một trình duyệt tốt, ví dụ như Mozilla Firefox hay Google Chrome phiên bản mới nhất, và một chương trình soạn thảo ngon lành như [Sublime Text](http://www.sublimetext.com), [Atom](https://atom.io/) hay [VSCode](https://code.visualstudio.com/). Bạn có thể dùng bất cứ hệ điều hành nào, nhưng trong loạt bài này mình sử dụng Linux.

#### Cần giúp đỡ?

Về nội dung tiếng Việt, bạn có thể hỏi ở group [React Việt Nam](https://www.facebook.com/groups/reactvietnam/) hoặc bay thẳng vào phòng chat của Ehkoo tại [gitter.im/ehkoo/web](https://gitter.im/ehkoo/web).

Còn nếu rành tiếng Anh thì có lẽ cách nhanh nhất là [StackOverflow](https://stackoverflow.com/questions/tagged/reactjs) hoặc một số [kênh hỗ trợ](https://reactjs.org/community/support.html) chính thức.

#### Không thích đọc chữ dài dòng?

Nếu bạn thích xem video, có thể nghía qua [playlist này](https://www.youtube.com/watch?v=rXpYNuOUIhQ&list=PLWBrqglnjNl0tzkepfj3cmKTF09jbcN5E) của anh Nguyễn Đức Hoàng, mà theo mình là có đầu tư với giọng hướng dẫn truyền cảm, haha.

### Nội dung

Dưới đây là những chủ đề  mình sẽ đề cập:

#### React căn bản

- Cài đặt và chương trình đầu tiên
- JSX
- Component và `props`
- Viết unit tests
- `state`, hàm xử lý sự kiện và vòng đời của component
- `ref` và cách tích hợp với thư viện ngoài

#### Nâng cao

- Higher-order components
- Portal và Error boundaries
- PropTypes (tùy chọn)

#### ReactRouter

- Căn bản
- Một số kinh nghiệm

#### Redux

- Căn bản
- Kết hợp với React

#### Hệ sinh thái của React

- Cách tổ chức một ứng dụng React (và `redux`)
- CSS-in-JS với `styled-component`

Mục lục ở trên hoàn toàn là dự kiến và mình sẽ cập nhật thường xuyên khi tình hình thế giới xảy ra biến động.

### Demo

Xuyên suốt trong loạt bài này, chúng ta sẽ xây dựng một ứng dụng bán hàng đơn giản, với hai trang chính:

#### List

- Hiển thị danh sách sản phẩm
- Thêm sản phẩm vào giỏ hàng

#### Cart

- Xem các sản phẩm trong giỏ hàng
- Thay đổi số lượng
- Xóa sản phẩm ra khỏi giỏ hàng

Còn bây giờ thì, a lê hấp, mời bạn nhảy đến bài đầu tiên.
