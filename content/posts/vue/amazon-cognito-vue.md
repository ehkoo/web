---
layout: post.njk
title: "Xây dựng ứng dụng quản lý người dùng với Amazon Cognito, Vue và Element UI"
slug: xay-dung-ung-dung-quan-ly-nguoi-dung-voi-amazon-cognito-vue-element-ui
date: 2018-02-19
tags: Vue, VueJS, AmazonCognito, ElementUI
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519064534/vue_sckxsn.jpg
excerpt: "Cùng tìm hiểu cách xây dựng một ứng dụng quản lý người dùng với chi phí thấp mà hiệu quả."
author: kcjpop
draft: true
---
![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519064534/vue_sckxsn.jpg)

### Ủa mà Amazon Cognito là gì?

![](https://res.cloudinary.com/duqeezi8j/image/upload/f_auto/v1519061718/cognito_cwactq.jpg)

Amazon Cognito là một dịch vụ nằm trong hệ thống Amazon Web Services, giúp bạn quản lý tài khoản người dùng trong ứng dụng web/mobile một cách dễ dàng, mạnh mẽ và bảo mật tốt. Vì dữ liệu của người dùng được lưu trên máy chủ của Amazon, bạn không cần phải cài đặt server hay thiết kế hệ thống riêng gì cả. Cognito đơn giản hóa các thao tác xác thực quen thuộc như đăng ký, xác nhận tài khoản, đăng nhập, khôi phục mật khẩu, v.v. Ngoài ra người dùng cũng có thể đăng nhập vào hệ thống bằng tài khoản của bên thứ ba như Google, Facebook, Github hay bất cứ dịch vụ nào hỗ trợ các chuẩn OpenID Connect, OAuth 2.0 và SAML 2.0.

Bằng cách dùng Cognito, bạn có thể giảm được một

>**Bạn có biết?**
>Amazon Cognito không phải là dịch vụ quản lý người dùng duy nhất trên Internet. Ngoài ra còn có [Auth0](https://auth0.com/pricing), cho phép 7000 người dùng hoạt động hàng tháng và không giới hạn số lần đăng nhập. Netlify cũng đang thử nghiệm tính năng [Identity](https://www.netlify.com/docs/identity/) tương tự như Amazon Cognito.

### Chuẩn bị

Bằng cách dùng `vue-cli`, mình sẽ tạo một dự án Vue đơn giản dùng webpack. Mình cũng cần `vue-router` để định hướng bên trong ứng dụng, và `element-ui` (không bắt buộc) để xây dựng giao diện bắt mắt hơn.

```bash
mydir cognito-vue
vue init webpack-simple cognito-vue
cd cognito-vue
npm i -S vue-router element-ui
npm run dev
```

### Đăng ký
