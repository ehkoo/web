---
layout: post.njk
title: 10+ thư viện UI components cho React
slug: 10-thu-vien-ui-components-cho-react
date: 2018-03-17
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1521310400/illustrator_z3o4m0.png
tags: React, JavaScript, UI, UX
excerpt: Không cần đến designer bạn vẫn có thể xây dựng ứng dụng React với giao diện chuyên nghiệp, UX hợp lý. Bằng cách nào ư? Nhờ vào sử dụng các thư viện UI mà Ehkoo giới thiệu ngay đây.
author: kcjpop
---
React căn bản là một thư viện giúp xây dựng giao diện người dùng trong ứng dụng web. Nhờ vào khả năng chia nhỏ tính năng thành từng component, React giúp cho việc xây dựng các thành phần giao diện trở nên độc lập, dễ chia sẻ và sử dụng hơn. Bên cạnh đó, cộng đồng React cũng phát triển một số thư viện UI độc lập, giúp bạn có thể nhanh chóng cài đặt vào dự án mà không cần phải dựa vào một đội thiết kế riêng. Điều này đặc biệt phù hợp với những dự án nhỏ có ngân sách giới hạn.

Ehkoo tổng hợp cho bạn 10+ thư viện UI component dành riêng cho React nhé.

### Material-UI

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521301741/rk7vltwagn3weelgn5kb.png)

Như tên gọi, [Material-UI](http://www.material-ui.com/#/) ([Github](https://github.com/mui-org/material-ui)) là tập hợp các components của React được thiết kế theo chuẩn [Material Design](https://www.google.com/design/spec/material-design/introduction.html) của Google. Với hơn 25+ components được xây dựng sẵn, cùng với khả năng tùy biến cao, cho phép thay đổi giữa hai theme Sáng/ Tối, Material-UI hứa hẹn đáp ứng cho tất cả dự án từ nhỏ đến lớn. Hơn 34k stars được "đánh dấu" trên Github đã cho thấy mức độ phổ biến của thư viện này. Material-UI sử dụng [JSS](http://cssinjs.org/) để quản lý CSS.

Hiện tại Material-UI đang ở phiên bản 0.20.0, và [phiên bản 1.0.0](https://material-ui-next.com/) được dự tính sẽ ra mắt trong thời gian sắp tới.

### React Toolbox

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521302273/mcddfulbhknwx1efjsuo.png)

Cũng dựa vào chuẩn Material Design của Google, nhưng [React Toolbox](http://react-toolbox.io/#/) ([Github](https://github.com/react-toolbox/react-toolbox)) lại sử dụng CSS Modules, Webpack và ES6 để xây dựng các components. Điều này giúp cho React Toolbox có thể kết hợp dễ dàng trong các dự án sử dụng Webpack, tận dụng được lợi thế của công cụ này, chẳng hạn như tính năng "rung cây" tree-shaking.

So với Material-UI, React Toolbox không thua kém về số lượng components. Hiện dự án này đã có hơn 7.7k star trên Github.

### React-Bootstrap & reactstrap

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521302550/pdsvgmqok9hiogrqjpvv.png)

[Bootstrap](http://getbootstrap.com/) có lẽ không còn quá xa lạ với lập trình viên front-end nữa. [React-Bootstrap](https://react-bootstrap.github.io/) ([Github](https://github.com/react-bootstrap/react-bootstrap)) là tập hợp các component của Bootstrap được xây dựng riêng cho React. Phiên bản hiện tại 0.32.1 chỉ hỗ trợ Bootstrap 3, và trong tương lai không xa thư viện này sẽ được nâng cấp lên phiên bản 1.0.0, hỗ trợ Bootstrap 4. Trong thời gian đó bạn có thể dùng [reactstrap](https://reactstrap.github.io/).

### React + Foundation

![](https://res.cloudinary.com/duqeezi8j/image/upload/c_scale,w_950/v1521309183/undefined_k1dvx7.jpg)

[React+Foundation](https://react.foundation/) ([Github](https://github.com/digiaonline/react-foundation)) là tập hợp các React components cho thư viện [Foundation](https://foundation.zurb.com/).

### Semantic UI React

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521309367/undefined_xgbgat.png)

[Semantic UI React](https://react.semantic-ui.com/introduction) là tập hợp các React components  cho thư viện [Semantic UI](https://semantic-ui.com/), nhưng không đòi hỏi phải dùng chung với jQuery.


### Grommet

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521303541/undefined_h1vcph.png)

[Grommet](http://grommet.io/) ([Github](https://github.com/grommet/grommet)) là thư viện components cho React, sử dụng nền tảng [Inuit](https://github.com/inuitcss/inuitcss) để quản lý CSS. Grommet ban đầu được xây dựng bởi 4 nhân viên của hãng Hewlett Packard, nhờ vào đó các kinh nghiệm UX khi phát triển ứng dụng doanh nghiệp được sử dụng triệt để ở đây. Xem ra lời tự nhận là nền tảng UX tiên tiến nhất không phải là không có cơ sở.

### Ant Design of React

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521304531/amk6hu7xjbsmpqqd8wsk.png)

[Ant](https://ant.design/docs/react/introduce) ([Github](https://github.com/ant-design/ant-design)) là tập hợp các components của React được xây dựng theo [chuẩn thiết kế](https://ant.design/docs/spec/introduce) của Ant UED Team. Tương tự như chuẩn Material Design, Ant cung cấp hầu hết các component thông dụng trong ứng dụng web hiện đại, như Layout, Button, Icon, DatePicket, v.v...Bên cạnh đó Ant cũng có những component riêng thú vị, như LocaleProvider cho phép bạn thay đổi ngôn ngữ trên toàn ứng dụng.

Ant hiện đang có hơn 25k star trên Github.

### Element-React

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521535497/1grcU5Q_vf34uk.png)

[Element-React](https://eleme.github.io/element-react/#/en-US/quick-start) là phiên bản các components dành cho React, được xây dựng theo chuẩn của Element UI. Số lượng components của Element rất đầy đủ và phong phú.

### Atlaskit

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521306305/undefined_tc9tyk.png)

Được thiết kế và phát triển bởi Atlassian, công ty đằng sau JIRA, BitBucket..., [Atlaskit](https://atlaskit.atlassian.com/) ([Bitbucket](https://bitbucket.org/atlassian/atlaskit-mk-2/src)) cung cấp hơn 60 components gần như đáp ứng mọi nhu cầu khi xây dựng ứng dụng React. Mỗi component được đặt trong một package riêng, giúp bạn có thể chọn cài đặt những components cần thiết mà không làm nặng ứng dụng.

### Fabric

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521306487/undefined_xgizqa.png)

Được phát triển bởi Microsoft, [Fabric](https://developer.microsoft.com/en-us/fabric) ([Github](https://github.com/OfficeDev/Office-UI-Fabric-Core)) là thư viện front-end chính thức tương thích hoàn hảo với các ứng dụng của Office và Office 365.

### Carbon Components React

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521309579/undefined_z4bulo.png)

[Carbon Component Reacts](https://github.com/carbon-design-system/carbon-components-react) là tập hợp các components được phát triển theo [hệ thống thiết kế Carbon](https://developer.ibm.com/code/open/projects/carbon-design-system/) của IBM.

### Ring UI

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521534889/JetBrains_Drive_to_develop_vvjkex.png)

[Ring UI](https://jetbrains.org/ring-ui/index.html) ([Github](https://github.com/JetBrains/ring-ui)) là UI framework được xây dựng bởi JetBrains, công ty đằng sau các editor đình đám như IntelliJ IDEA, WebStorm, hay PhpStorm. Ring UI tập hợp gần 50 components thông dụng trong các ứng dụng web.

### Gestalt

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521535052/pinterest-google-chrome_qwlf7m.jpg)

[Gestalt](https://pinterest.github.io/gestalt/) ([Github](https://github.com/pinterest/gestalt)) là tập hợp các components được xây dựng theo chuẩn thiết kế của Pinterest. Mặc dù số lượng components không nhiều như các thư viện khác nhưng cũng đáng để bạn xem qua.

_h/t anh Son-Tran Nguyen_

### Design System

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1521539740/axxn5j0no6azvy6qwcpr.png)

[Design System](http://design-system.pluralsight.com/) ([Github](https://github.com/pluralsight/design-system)) được thiết kế và sử dụng cho các sản phẩm của công ty Pluralsight. So với các UI framework khác thì số lượng component của Design System không nhiều lắm, nhưng được thiết kế rất tinh tế và chuyên nghiệp, có thể đáp ứng hầu hết yêu cầu của các dự án.

_h/t anh Nguyễn Xuân Hải_

### Kết

Trên đây là tập hợp những thư viện UI components dành riêng cho React mà Ehkoo biết. Bạn cũng có thể truy cập trang [Adele](https://adele.uxpin.com/) để xem tổng hợp các hệ thống thiết kế khác.

À, bạn có đang dùng thư viện hay ho hấp dẫn nào khác mà Ehkoo chưa đề cập đến không? Hãy để lại comment chia sẻ bên dưới nhé!
