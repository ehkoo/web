---
layout: post.njk
title: "Vue phát hành phiên bản 2.5"
slug: vue-phat-hanh-phien-ban-2-5
date: 2017-10-14
tags: Vue, Frontend, VueJS
cover: https://res.cloudinary.com/duqeezi8j/image/upload/v1516116654/BWDA0if_cdo4ib.png
excerpt: "Những điểm đáng chú ý trong phiên bản này: hỗ trợ TypeScript tốt hơn, cải thiện tính năng bắt lỗi, nâng cao hỗ trợ cho functional componets trong các SFCs và hệ thống render phía server (SSR) trở nên độc lập với môi trường."
author: kcjpop
---

Tác giả Evan You vừa [thông báo](https://medium.com/the-vue-point/vue-2-5-released-14bd65bf030b) phát hành Vue phiên bản 2.5 Level E. Bên cạnh cải thiện một số tính năng và sửa lỗi, phiên bản này có những điểm đáng chú ý sau:

### Tích hợp TypeScript tốt hơn

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1508054254/1_vB-z-t961mJnd4a6re02Iw_c9lbd9.png)

Với sự giúp đỡ từ đội ngũ phát triển TypeScript, việc khai báo kiểu dữ liệu được tích hợp sẵn trong API của Vue mà không cần sử dụng đến decorator `vue-class-component`. Điều này giúp cho phần mở rộng [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) trong VSCode hoạt động tốt hơn, đồng thời nâng cao hiệu quả của Intellisense với những người dùng JavaScript thông thường. Lưu ý, người dùng TypeScript được khuyến cáo nên nâng cấp các thư viện sau lên phiên bản mới nhất để tận dụng tính năng này: `vue-router`, `vuex`, `vuex-router-sync` và `vue-class-component`.

### Xử lý lỗi dễ dàng hơn

Trong các phiên bản 2.4 và trước đó, tùy chỉnh toàn cục `config.errorHandler` thường được dùng để xử lý lỗi trong ứng dụng. Ngoài ra còn có tùy chỉnh `renderError` trong component dành cho trường hợp lỗi xảy ra khi render. Tuy vậy, Vue vẫn còn thiếu một cơ chế để xử lý những lỗi chung chung khi chúng xảy ra ở một phần nào đó của ứng dụng.

Phiên bản 2.5 giới thiệu một hook mới `errorCaptured`. Khi hook này được khai báo, component sẽ bắt tất cả lỗi, bao gồm lỗi xảy ra trong bản thân component đó, lỗi khi thực thi các hàm gọi lại bất đồng bộ - async callbacks, và lỗi ở các component con. Nếu bạn nào xài React 16 có thể liên hệ đến khái niệm [Error Boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries) cũng tương tự vậy. Hook `errorCaptured` có chữ ký hàm giống như `errorHandler`, giống như vầy:

```javascript
Vue.component('ErrorBoundary', {
  data: () => ({ error: null }),
  errorCaptured(err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    return false
  },
  render(h) {
    if (this.error) {
      return h('pre', { style: { color: 'red' } }, this.error)
    }
    // ignoring edge cases for the sake of demonstration
    return this.$slots.default[0]
  }
})
```

Sử dụng:

```html
<error-boundary>
  <another-component/>
</error-boundary>
```

### Nâng cấp functional components trong SFCs

![](https://res.cloudinary.com/duqeezi8j/image/upload/v1508055411/1_jg9qGPkPadGBEa-KUPrMpA_lyz7c6.png)

Với `vue-loader` phiên bản `>= 13.3.0`, functional components được khai báo như Single-File Component (SFC) trong tập tin `*.vue` đã có thể hot-reload, hỗ trợ scoped CSS và biên dịch template. Để khai báo một template được biên dịch như functional component, bạn chỉ cần thêm thuộc tính `functional` như hình trên.

Tính năng này giúp cho việc chuyển đổi các component "lá" (leaf-component) sang dạng functional dễ dàng hơn, từ đó tối ưu hóa hiệu năng của ứng dụng.

### SSR độc lập với môi trường

Thư viện `vue-server-renderer` mặc định được chạy trên môi trường Node.js, làm cho nó không hoạt động được trên những môi trường khác như [`php-v8js`](https://github.com/phpv8/v8js) hay [Oracle Nashorn](http://www.oracle.com/technetwork/articles/java/jf14-nashorn-2126515.html). Trong phiên bản 2.5, `vue-server-renderer` được nâng cấp trở nên độc lập với môi trường, giúp cho nó có thể chạy tốt trên trình duyệt hay các engine JavaScript khác.

Xem ví dụ về sử dụng `vue-server-renderer` từ PHP [ở đây](https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#environment-agnostic-ssr).

<hr/>

Chi tiết các tính năng và thay đổi trong phiên bản này có thể được xem trong [ghi chú phát hành](https://github.com/vuejs/vue/releases/tag/v2.5.0).
