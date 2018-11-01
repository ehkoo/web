---
layout: post.njk
title: Những thư viện xử lý ngày tháng trong JavaScript
slug: nhung-thu-vien-xu-ly-ngay-thang-trong-javascript
date: 2018-07-23
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1540025251/4c0012dde7fd141af579e4c899568472_ms91xp.jpg
tags: JavaScript, Dành cho người mới, DateTime
excerpt: JavaScript cung cấp lớp Date để xử lý thời gian khi phát triển ứng dụng. Nhưng để làm việc với múi giờ và các thao tác phức tạp hơn thì bạn không thể bỏ qua các thư viện được giới thiệu trong bài viết này.
author: kcjpop
editor: chubbyanh
---

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1540025251/4c0012dde7fd141af579e4c899568472_ms91xp.jpg)
_Hình minh họa lụm trên Pinterest mà không tìm thấy thông tin tác giả_

Thao tác và hiển thị ngày tháng gần như xuất hiện trong tất cả các ứng dụng JavaScript. Trình duyệt và NodeJS cung cấp lớp `Date` để thể hiện kiểu dữ liệu này, nhưng các phương thức của lớp này lại khá giới hạn. May mắn thay, cộng đồng JavaScript đã phát triển những công cụ giúp cho việc xử lý ngày tháng trở nên dễ dàng và bớt nhàm chán hơn.

Hãy cùng Ehkoo xem qua những thư viện phổ biến nhất nhé.

> **Lưu ý:**
> Trong bài viết này Ehkoo sử dụng cụm từ "xử lý ngày tháng" nhưng bạn nên ngầm hiểu là bao gồm xử lý ngày tháng và giờ giấc luôn nhé.

### moment.js

```bash
npm install --save moment
```

[moment.js](https://momentjs.com/) có lẽ là thư viện nổi tiếng và được sử dụng nhất khi nhắc đến xử lý ngày tháng trong JavaScript. moment.js cho phép bạn phân tích và kiểm tra một chuỗi có phải theo đúng định dạng ngày tháng hay không. Sau đó bạn có thể chuyển từ chuỗi thành đối tượng ngày tháng, và tiến hành thao tác trên chúng, chẳng hạn như thay đổi giờ/phút/giây/ngày/tháng/năm, cộng/trừ thời gian, tính khoảng cách giữa hai thời điểm theo đơn vị ngày, tháng, năm..., hay hiển thị ngày dưới dạng tương đối, thân thiện với người sử dụng...

```js
moment('2017-07-25', 'YYYY-MM-DD') // Chuyển chuỗi thành đối tượng ngày tháng
moment()                  // Lấy thời điểm hiện tại
moment().startOf('month') // Chuyển về ngày đầu tiên của tháng
moment().add(7, 'days')   // Cộng thêm 7 ngày vào thời điểm hiện tại

const a = moment('2017-07-25', 'YYYY-MM-DD')
const b = moment('2017-07-10', 'YYYY-MM-DD')
// Tính khoảng cách giữa hai ngày theo phút
console.log(a.diff(b, 'minutes')

// Hiển thị ngày giờ dưới dạng tương đối
moment().startOf('hour').fromNow()       // 20 minutes ago
```

moment.js còn hỗ trợ bản địa hóa (i18n) với rất nhiều định dạng ngôn ngữ, bao gồm cả tiếng Việt.

```js
moment.locale('vi')
moment().format('LL') // 24 tháng 7 năm 2018
moment()
  .startOf('hour')
  .fromNow() // 23 phút trước
```

Một trong những điểm yếu của moment.js là không hỗ trợ tính bất biến, dễ dẫn tới những lỗi không đáng có. Chẳng hạn như:

```js
const today = moment().startOf('day')
const tomorrow = today.add(1, 'day')
console.log(today.format() === tomorrow.format()) // true :|
```

Cách để sửa lỗi trên là dùng phương thức `.clone()`.

```js
const today = moment().startOf('day')
const tomorrow = today.clone().add(1, 'day') // Mất đi tính tự nhiên rồi :(
console.log(today.format() === tomorrow.format()) // false
```

So với các thư viện khác, moment.js có hiệu suất kém hơn. Bên cạnh đó dung lượng của moment.js khá nặng (66.4KB gzip) khi phải đính kèm tất cả định dạng ngôn ngữ. Để giải quyết vấn đề này, bạn có thể dùng `moment-locales-webpack-plugin` để bỏ đi những định dạng không cần thiết.

```js
// webpack.config.js
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
module.exports = {
  plugins: [
    // Bỏ hết tất cả định dạng, chỉ chừa lại 'en'
    new MomentLocalesPlugin(),
    // Hoặc bỏ hết tất cả chỉ chừa lại 'en' và 'vi'
    // Bạn không thể bỏ 'en' vì đó là mặc định của moment.js
    new MomentLocalesPlugin({
      localesToKeep: ['vi'],
    }),
  ],
}
```

### dayjs

```bash
npm install dayjs --save
```

Với dung lượng chỉ 2KB gzip, [dayjs](https://github.com/iamkun/dayjs) là một lựa chọn tốt để thay thế moment.js. dayjs được thiết kế với các API tương tự như moment.js, giúp việc chuyển đổi các dự án sẵn có trở nên dễ dàng hơn. Nhưng so với moment.js, dayjs có lợi thế hơn vì hỗ trợ tính bất biến, nghĩa là một giá trị mới luôn luôn được tạo ra khi bạn tiến hành thao tác trên dữ liệu.

```js
dayjs('2018-07-24') // Chuyển chuỗi thành đối tượng ngày tháng
dayjs()
  .set('month', 3)
  .month() // get & set
dayjs().add(1, 'year') // manipulate
dayjs().isBefore(dayjs()) // query

const today = dayjs().startOf('day')
const tomorrow = today.add(1, 'day')
console.log(today.format() === tomorrow.format()) // false (y)
```

dayjs cũng hỗ trợ i18n và bạn chỉ cần `import` những định dạng ngôn ngữ cần thiết vào dự án, đảm bảo dung lượng ứng dụng sau khi built luôn ở trong tầm kiểm soát. Hiện tại dayjs vẫn chưa hỗ trợ tiếng Việt đâu nên bạn nào muốn có thể gửi pull request nhé.

```js
// Chỉ import khi cần thiết
import 'dayjs/locale/es'

// Sử dụng định dạng tiếng Tây Ban Nha ở phạm vi toàn cục
dayjs.locale('es')

// Chỉ sử dụng định dạng tiếng Thụy Điển cho riêng giá trị này
dayjs('2018-05-05')
  .locale('sv')
  .format()
```

Ngoài ra dayjs còn hỗ trợ plugins, là những modules giúp mở rộng tính năng cho thư viện. Có thể kể đến AdvancedFormat giúp mở rộng thêm các giá trị khi định dạng ngày tháng, RelativeTime giúp hiển thị thời gian thân thiện với người dùng, chẳng hạn như "3 ngày trước"...Bạn có thể xem danh sách đầy đủ các plugins [ở đây](https://github.com/iamkun/dayjs/blob/master/docs/en/Plugin.md).

### date-fns

```bash
npm install --save date-fns
```

Mới nổi lên gần đây, [date-fns](https://date-fns.org/) tự hào là thư viện hỗ trợ toàn diện nhất về xử lý ngày tháng trong JavaScript. Được thiết kế theo tư tưởng của lập trình hàm, với mỗi hàm chỉ có một mục đích duy nhất, date-fns cho phép bạn import chính xác những tính năng cần thiết để sử dụng. Điều này giúp việc kiểm soát dung lượng ứng dụng trở nên dễ dàng hơn. date-fns thao tác trên dữ liệu bất biến, hỗ trợ TypeScript và Flow, đồng thời cung cấp i18n bao gồm cả tiếng Việt.

```js
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

format(new Date(), '[Today is a] dddd')
//=> "Today is a Wednesday"

formatDistance(subDays(new Date(), 3), new Date())
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date())
```

Việc mỗi hàm chỉ làm một việc duy nhất vừa là điểm cộng đồng thời cũng là điểm trừ của date-fns, khi bạn phải gọi các hàm lồng nhau.

```js
import { setDate, setMonth, setYear } from 'date-fns'

const secondOfMay = setDate(setMonth(setYear(new Date(), 2018), 4), 2) // 2018-05-02
```

Phiên bản 2 của date-fns sẽ hỗ trợ currying giúp giải quyết vấn đề trên.

```js
import compose from 'lodash/fp/compose'
import { setDate, setMonth, setYear } from 'date-fns/fp'

const secondOfMay = compose(
  setDate(2),
  setMonth(4),
  setYear(2018),
)(new Date())
```

### instadate

```bash
npm install --save instadate
```

[instadate](https://github.com/Teamweek/instadate) chỉ có 3.2KB min gzip và quả quyết là thư viện xử lý ngày tháng nhanh từ 10 đến 1000 lần so với moment.js. instadate có thể chỉnh sửa hay so sánh hàng ngàn phép tính trong một giây. Ngoài ra instadate hỗ trợ thao tác dữ liệu bất biến, giúp giảm khả năng xảy ra lỗi ngớ ngẩn như với moment.js.

```js
import instadate from 'instadate'

const date1 = new Date()
const date2 = instadate.addDays(date1, 1)

instadate.differenceInDates(date1, date2) // => 1
```

### timezone

```bash
npm install timezone --save
```

[timezone](https://github.com/bigeasy/timezone) chỉ có 2.7KB nhưng hỗ trợ định dạng ngày tháng trong JavaScript ở tất cả múi giờ theo chuẩn [IANA](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```js
import tz from 'timezone'

const asia = tz(require('timezone/Asia'))
// Từ Sài Gòn, ra bến xe miền Đông...
const sg = asia('2018-07-22 12:00', 'Asia/Ho_Chi_Minh')
// Bắt xe đi Hồng Kông
const hk = asia(sg, '%m/%d/%Y %H:%M:%S', 'Asia/Hong_Kong')
console.log(hk) // 07/22/2018 13:00:00
```

timezone cũng hỗ trợ i18n với nhiều định dạng ngôn ngữ khác nhau.

### fecha

```bash
npm install fecha --save
```

[fecha](https://github.com/taylorhakes/fecha) chỉ bao gồm hai tính năng hay sử dụng nhất khi làm việc với ngày tháng: chuyển chuỗi thành đối tượng và hiển thị ngày tháng. fecha có dung lượng rất nhẹ, chỉ khoảng 2KB, đồng thời có hỗ trợ i18n.

```js
const d = fecha.parse('February 3rd, 2014', 'MMMM Do, YYYY') // new Date(2014, 1, 3)
fecha.format(d, 'DD-MM-YYYY') // 03-02-2014
```

### s-date

```bash
npm install --save s-date
```

[s-date](https://github.com/sebastiansandqvist/s-date) là một tiện ích siêu nhỏ (<1KB) giúp bạn định dạng đối tượng `Date` một cách dễ dàng.

```js
const date = require('s-date')

const myBirthday = new Date(1994, 10, 7)
date('{mm}/{dd}/{yyyy}', myBirthday) // '11/07/1994'
```

s-date không hỗ trợ i18n nhưng nếu cần bạn có thể copy s-date vào thành một tập tin helper riêng rồi trực tiếp chỉnh sửa trên đó (dù nghe có vẻ không phải là giải pháp tốt lắm) :D

### tinytime

```bash
npm install --save tinytime
```

Cũng tương tự như s-date, [tinytime](https://github.com/aweary/tinytime) là một công cụ định dạng ngày tháng chỉ với 800b.

```js
import tinytime from 'tinytime'
const template = tinytime('The time is {h}:{mm}:{ss}{a}.')
template.render(new Date()) // The time is 11:10:20PM.
```

So với s-date, tinytime có thể chỉ cần phân tích chuỗi một lần duy nhất và sử dụng kết quả này để định dạng ngày tháng. Tuy nhiên để đạt được kết quả như mong muốn thì bạn phải cẩn thận một chút.

```js
// Không làm thế này...
function Time({ date }) {
  return <div>{tinytime('{h}:{mm}:{ss}{a}').render(date)}</div>
}

// Mà nên làm thế này
const template = tinytime('{h}:{mm}:{ss}{a}')
function Time({ date }) {
  return <div>{template.render(date)}</div>
}
```

### Kết

Việc lựa chọn thư viện nào để sử dụng trong dự án hoàn toàn tùy thuộc vào kinh nghiệm, trình độ các thành viên trong nhóm và đôi khi...mình thích thì mình xài thôi. Nhưng Ehkoo khuyến khích bạn sử dụng các thư viện hỗ trợ dữ liệu bất biến để tránh những lỗi không đáng có.
