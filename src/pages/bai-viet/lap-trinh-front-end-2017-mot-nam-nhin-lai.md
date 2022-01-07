---
layout: ../../layouts/Post.astro
title: Lập trình front-end 2017, một năm nhìn lại
slug: lap-trinh-front-end-2017-mot-nam-nhin-lai
date: 2017-12-08
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1582722985/1_aVzJTznRRfP1lM7AXe9yLw_pccenq_ecamqb.jpg
tags: JavaScript, Frontend, 2017
excerpt: Năm 2017 tiếp tục chứng kiến sự phát triển mạnh mẽ của công nghệ front-end. Hãy cùng điểm lại những sự kiện nổi bật diễn ra trong năm vừa qua.
author: kcjpop
translation: https://levelup.gitconnected.com/a-recap-of-front-end-development-in-2017-7072ce99e727
---

> **Về tác giả:** Trey Huffine là nhà sáng lập của https://gitconnected -- Một mạng xã hội dành riêng cho các nhà phát triển và kỹ sư phần mềm.

Lập trình front-end lại một lần nữa phát triển chóng mặt trong năm 2017. Hãy cùng điểm lại những sự kiện nổi bật diễn ra trong năm vừa qua.

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1582722985/1_aVzJTznRRfP1lM7AXe9yLw_pccenq_ecamqb.jpg)

### React 16 và giấy phép MIT

React tiếp tục chứng tỏ địa vị thống trị của mình trong thế giới front-end, và năm 2017 đánh dấu một cột mốc quan trọng với việc phát hành [phiên bản 16](https://edgecoders.com/react-16-features-and-fiber-explanation-e779544bb1b7). Phiên bản này được viết lại hoàn toàn mới, giới thiệu kiến trúc Fiber cho phép render giao diện một cách bất đồng bộ. React 16 cũng hỗ trợ việc xử lý lỗi trở nên dễ dàng hơn bằng các Error Boundaries. Bên cạnh đó nó cũng đem đến những
[tính năng nổi bật khác](https://edgecoders.com/react-16-features-and-fiber-explanation-e779544bb1b7).

Tuy vậy, sự kiện sôi sục nhất trong cộng đồng React không phải là phiên bản 16, mà là những vấn đề liên quan đến giấy phép gây tranh cãi BSD+Patents của Facebook. Sự việc bắt đầu khi tổ chức Apache liệt kê giấy phép này vào [nhóm X](https://www.apache.org/legal/resolved#category-x), dạng không phù hợp cho các dự án của họ, kéo theo việc từ bỏ/thay thế React trong cộng đồng vì lo ngại các vấn đề pháp lý liên quan. May mắn thay, React đã được phát hành dưới giấy phép MIT từ phiên bản 16 trở đi. Các dự án "anh em bà con" trong hệ sinh thái của React như Jest, Flow, Immutable.js và GraphQL cũng chuyển sang giấy phép MIT.

Chúng ta nên nói lời cảm ơn đến nhóm phát triển chính của React và những người đóng góp nổi bật, bao gồm Dominic Gannaway, Dan Abramov, Sophie Alpert, Sebastian Markbåge, Paul O’Shannessy, Andrew Clark, Cheng Lou, Clement Hoang, Probably Flarnie, Brian Vaughn...

### Ứng dụng web tăng tiến -- Progressive Web Apps (PWAs)

Đã từ lâu, giới lập trình luôn tìm kiếm một giải pháp để nối liền khoảng cách giữa web và các nền tảng ứng dụng khác. Dẫn đầu xu hướng này không ai khác hơn Google, với giải pháp chuyển đổi web thành các ứng dụng web tăng tiến -- Progressive Web Apps (PWAs). Trong năm 2017, PWAs đã nhận được sự đón nhận nhanh chóng trong cộng đồng. Một PWA sẽ sử dụng các công nghệ web tiên tiến để giúp cho người dùng có thể trải nghiệm web với cảm giác tương đương chương trình native. Ứng dụng trở nên mượt mà hơn, có thể hoạt động không cần kêt nối mạng, và có khả năng sử dụng những tính năng vốn trước đây chỉ dành riêng cho thiết bị di dộng, chẳng hạn như push notifications. Công nghệ cốt lõi của các PWAs chính là sự kết hợp giữa tập tin `manifest.json` và [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/).

<iframe width="100%" height="480" src="https://www.youtube.com/embed/m-sCdS0sQO8" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

### Yarn giúp cải thiện hệ thống các gói JS

NPM đã phát triển rất nhiều kể từ lần đầu tiên ra mắt, tuy nhiên nó vẫn thiếu đi những tính năng quan trọng mà Yarn được sinh ra để giải quyết. Điểm then chốt trong Yarn là giới thiệu một tập tin khóa (lock file), nhằm đảm bảo việc đóng gói ứng dụng trở nên tất định (deterministic), theo kiểu dù sử dụng semver `^X.Y` nhưng trên máy lập trình viên và máy chủ đóng gói đều dùng chung một phiên bản nhất định. Đồng thời Yarn hỗ trợ thực hiện các thao tác song song và làm phẳng (flattening) các gói phụ thuộc. Những tính năng này thành công đến nỗi NPM đã giới thiệu chúng trong phiên bản 5.0. Yarn đã có trên 1 tỉ lượt download (hiện tại là 1.25 triệu lượt download mỗi tháng) và hơn 28,000 stars trên Github. Dù cho bạn không sử dụng Yarn, hệ thống quản lý các gói trong JavaScript đã được cải thiện rất đáng kể nhờ có nó.

### CSS Grid Layout

Layout dạng lưới (grids) cuối cùng cũng đã trở thành một phần chuẩn của CSS, và các trình duyệt đã nhanh chóng hỗ trợ tính năng này. Trước đây để tạo lưới chúng ta phải dùng đến thẻ TABLE, `float`, `flex` hay `inline-block`. CSS Grid Layout giúp phân chia trang thành những vùng trọng tâm và tạo các cột/dòng cho nội dung. Nếu bạn chưa biết về CSS Grid có thể vào trang web [https://gridbyexample.com/](https://gridbyexample.com/) của Rachel Andrew để bắt đầu tìm hiểu.

### WebAssembly được hỗ trợ bởi tất cả các trình duyệt lớn

WebAssembly (hay _wasm_) nay đã được hỗ trợ bởi tất cả các trình duyệt. wasm là một định dạng bytecode ở mức thấp (low-level) dành riêng cho việc lập trình phía người dùng trên trình duyệt. Vì ở mức thấp, wasm có thể đem đến hiệu suất cao hơn hẳn, nhưng cũng đồng thời giới thiệu các API JavaScript để các lập trình viên dễ tiếp cận hơn. Firefox gần đây đã thông báo sự hỗ trợ wasm ở tất cả trình duyệt lớn.

### Kiến trúc serverless

Các ứng dụng serverless ngày càng trở nên phổ biến trong năm 2017. Chúng mang đến một cách để tăng cường hiệu suất trong khi giảm giá thành vận hành ứng dụng. Theo đó, ứng dụng frontend được tách biệt hoàn toàn khỏi server, cho phép lập trình viên có thể tập trung hoàn toàn vào việc xây dựng mà không phải suy nghĩ về hệ thống và hạ tầng. Một trong những cách làm phổ biến là sử dụng dịch vụ API Gateway của Amazon Web Service (AWS), kết hợp với các hàm của AWS Lambda để tạo thành một BaaS (Backend-as-a-Service) cho phía front-end sử dụng.

### Vue.js tiếp tục trở nên phổ biến

Mặc cho thành công của React, [Vue](https://vuejs.org/) của [Evan You](https://medium.com/@youyuxi) tiếp tục nâng cao vị thế của mình trong cộng đồng. Vue mang đến một hệ thống xoay quanh các component và là ứng viên hàng đầu cho các giải pháp thay thế React. Vue được sử dụng bởi các công ty lớn như Gitlab hay Github. Bạn có thể đọc bài tổng kết một năm sử dụng Vue của Gitlab [ở đây](https://about.gitlab.com/2017/11/09/gitlab-vue-one-year-later/).

![](https://res.cloudinary.com/hikerlust/image/upload/v1512803697/1_EauHdmiXdyc-nWQJI3Zw_g_elblci.jpg)

### CSS-in-JS và sự chuẩn bị cho cuộc Thánh Chiến CSS

Sau sự phát triển mạnh mẽ của JavaScript như ta vừa thấy, toàn hệ sinh thái bắt đầu trở nên ổn định. Và chắc chắn rằng những điều tương tự cũng sẽ xảy ra với CSS, khi nó phải bắt kịp những yêu cầu mới của các ứng dụng web hiện đại. Trong năm 2017, có lẽ điểm sáng nhất trong giới front-end là sự xuất hiện và tiếp nhận CSS-in-JS. Đây là kỹ thuật xây dựng CSS hoàn toàn bằng JavaScript và không sử dụng stylesheet truyền thống. Dẫu cho đây có phải là hướng đi đúng cho cộng đồng hay không vẫn còn là một dấu hỏi lớn, hiện tại CSS-in-JS đang được hưởng ứng nồng nhiệt và có vẻ như nó đã giải quyết được khá nhiều vấn đề khi xây dựng các ứng dụng dựa vào component.

Nhắc đến CSS-in-JS thì phải kể đến `styled-component`, được xem như là thư viện phổ biến nhất. Bên cạnh đó là [`aphrodite`](https://github.com/Khan/aphrodite) của Khan Academy, [`glamorous`](https://github.com/paypal/glamorous) của Paypal, [`css-in-js`](https://github.com/MicheleBertoli/css-in-js), [`jss`](https://github.com/cssinjs/jss) hay [`styletron`](https://github.com/rtsao/styletron). Đàn em mới nổi bao gồm [`emotion`](https://github.com/emotion-js/emotion) và [`typestyle`](https://github.com/typestyle/typestyle).

### Các chương trình xây dựng website tĩnh

2017 chứng kiện một sự kiện quay ngược thời gian khi các website tĩnh quay trở lại sân khấu. Các công cụ như [Gatsby](https://www.gatsbyjs.org/) giúp lập trình viên có thể xây dựng website tĩnh bằng React và các công nghệ hiện đại khác. Sự trở lại này dựa vào một sự thật, là không phải website nào cũng cần được xây dựng một cách phức tạp. Rõ ràng các website tĩnh đem đến lợi ích khi nội dung được xây dựng sẵn từ server, và tốc độ không gì sánh bằng khi các file HTMLs được phân tán bởi các CDNs trên toàn thế giới. Một ví dụ là website chính thức của React được làm bằng Gatsby.

Một từ khóa cũng đang lên trong năm 2017 là JAMStack: JavaScript, APIs, Markup. Ứng dụng JAMStack sử dụng các tập tin HTML đã được đóng gói sẵn, dùng chung với các API và JavaScript để xử lý các thao tác động trong vòng lặp request/response. Nếu bạn muốn bắt đầu, [Netlify](https://www.netlify.com/) là một dịch vụ rất tốt.

> **Bí mật**: Ehkoo cũng được xây dựng theo JAMStack và dùng Netify ;)

### Sự bùng nổ của GraphQL và những suy nghĩ về tái cấu trúc API

Có vẻ như [GraphQL](http://graphql.org/) đang ngày càng chiếm được cảm tình so với REST, và thậm chí [Samer Buna](https://medium.com/@samerbuna) còn quả quyết rằng [REST đã chết](https://medium.freecodecamp.org/rest-apis-are-rest-in-peace-apis-long-live-graphql-d412e559d8e4). Về căn bản, GraphQL cho phép phía client khai báo một cách rõ ràng những gì nó cần, và lấy dữ liệu về từ một điểm cuối (endpoint) duy nhất, thay vì phải dùng nhiều điểm cuối và thỉnh thoảng nhận về dữ liệu không cần thiết như với REST.

GraphQL càng trở nên phổ biết khi mới đây GitHub đã dùng nó cho [phiên bản API mới nhất](https://developer.github.com/v4/), và nhiều công ty khác đang tạo ra những sản phẩm hỗ trợ cộng đồng tiếp nhận GraphQL, chẳng hạn như [Graphcool](https://medium.com/@graphcool).

### React Router 4

[React Router](https://reacttraining.com/react-router/) của Ryan Florence and Michael Jackson đã phát triển lên phiên bản 4, trở thành một bộ định hướng dạng khai báo, sử dụng React Component. Phiên bản này cũng nhận được sự ủng hộ từ phía nhóm phát triển React. Các API bên trong đã ở trạng thái ổn định, và nhóm phát triển React Training cho biết họ không có ý định giới thiệu những thay đổi lớn trong thời gian tới.

### Angular ra phiên bản 4, liền sau đó là v5

Sau cú nhảy cóc bỏ qua v3 để duy trì SEMVER, Angular 4 cuối cùng cũng được phát hành vào ngày 23 tháng ba. Trong phiên bản này, nhóm phát triển Angular đã tiếp nhận Angular Universal -- hỗ trợ server-side rendering cho các ứng dụng Angular -- như là một phần chính thức của toàn dự án. Gói Angular Animation cũng được tách ra khỏi `@angular/core` và chỉ cần import khi cần thiết. Tính năng biên soạn Ahead Of Time trong View Engine cũng được viết lại để nâng cao hiệu suất, theo đó "giảm được khoảng 60% kích thước của components trong hầu hết các trường hợp."

Phiên bản 5 cho thấy sự tiếp nhận của những cải tiến đã được mong đợi từ lâu. Nhờ vào gói `@angular/service-worker`, việc tạo PWA với Angular 5 trở nên đơn giản hơn bao giờ hết. Trình biên dịch Angular cũng được cải thiện, cho phép build/rebuilds nhanh hơn trong quá trình phát triển ứng dụng, và Angular Router nay đã mở hết tất cả các hook mới trong vòng đời của nó, bao gồm `ActivationStart`, `ActivationEnd`, `ResolveStart`, và `ResolveEnd`.

### TypeScript và Flow

Việc thiếu kiểu dữ liệu trong JavaScript đã bị một số lập trình viên phàn nàn từ lâu, và [TypeScript](https://www.typescriptlang.org/) của Microsoft và [Flow](https://flow.org/) của Facebook là hai công cụ phổ biến nhất hiện nay để giải quyết vấn đề này. Năm 2017 chứng kiến sự ưu ái của các lập trình viên dành cho TypeScript, khi nó trở thành một phần bắt buộc trong Angular phiên bản mới nhất. Với Flow, công cụ phổ biến hơn trong cộng đồng React, mang đến một cách nhanh nhẹn để kết hợp kiểu dữ liệu vào dự án mà không đòi hỏi refactor quá nhiều.

### Kết: mong chờ gì trong năm 2018

- Cuộc Thánh chiến CSS để tìm ra cách giải quyết styles trong các ứng dụng dựa vào components.
- Nhiều và nhiều công ty tiếp nhận các giải pháp phát triển ứng dụng thiết bị di động mà có thể chia sẻ chung mã nguồn, ví dụ như React Native hay Flutter.
- Web trở nên gần với ứng dụng di động native hơn khi hỗ trợ hoạt động ngoại tuyến, hay những trải nghiệm di động khác.
- WebAssembly có thể có những bước tiến khác, đem đến những trải nghiệm ứng dụng tốt hơn
- GraphQL tiếp tục thách thức REST
- React tiếp tục giữ vững vị trí framework front-end phổ biến nhất
- Flow và TypeScript giúp tổ chức mã gọn gàng và dễ debug/refactor hơn
- Sự ảnh hưởng của các công nghệ đóng gói như Docker càng rõ rệt hơn với giới front-end.
- Công nghệ thực tế ảo sẽ có những bước phát triển lớn, với sự hổ trợ của các thư viện như [A-Frame](https://aframe.io/), [React VR](https://facebook.github.io/react-vr/) và [Google VR](https://developers.google.com/vr/?hl=en).
- Sự xuất hiện của các ứng dụng xây dựng trên nền blockchain và [web3.js](https://github.com/ethereum/web3.js/)
