---
title: 'Next.js 13? Lên hay không?'
date: 2023-02-12
cover: https://res.cloudinary.com/duqeezi8j/image/upload/f_auto,c_scale,w_1200/v1645291004/ehkoo/yQbjbbm.jpg
tags: JavaScript, React, Next.js
excerpt: 'Hay chính xác hơn là sử dụng PostCSS trong Astro như thế nào'
author: ducan-ne
draft: true
---

> **Nhắn nhủ:**
> Bài gốc là do bạn @ducan-ne post lên WeBuild. Ehkoo chôm lại thôi.

## Điểm cộng

Mental model khi viết comp tốt, từ giờ ko còn getServerSideProps có thể query từ database và pass data vào Client Component (cons: ko pass được tất cả type ví dụ ko đc date, đang workaround bằng JSON.stringify)

- Có thể đây là 1 pattern: page.tsx (Server Component) sẽ fetch data, truyền vào Client Component bằng props.
- Hoặc 1 pattern khác: pass initial data cho react-query/trpc bằng cách truyền props xuống cho client component

Convention mới confirm ngon, đặc biệt là layout, ban đầu sẽ hơi ko quen, nhưng sau thì lợi nhiều hơn hại.

Same level (quên mất tên), các component của page có thể để chung level với page.tsx, cái này lợi vì đôi khi chả biết để nó ở đâu cả, cũng không phải module-based (cần nghĩ tên module) mà sẽ là page-based

Code sẽ sạch hơn next 12 (ý kiến cá nhân), vì ko xây dựng theo kiểu module (để chia nhỏ page), folder components, getServerSideProps workaround, ….

Next auth có api getServerSession, lấy session ngay ở Server Component
‘use client’ dùng một thời gian sẽ không thấy vấn đề nữa, tuy nhiên sẽ cần phải tùy tính huống refactor lại để move 1 phần code thành Server/Client component

Code được chia thành các component, ko còn getServerSideProps
Viết API không có vấn đề gì, ko bugs.
Tailwind css đã được support cách đây vài tuần.
Cảm giác khi dùng next/navigation có vẻ tốt hơn là next/router
Đã dùng được chưa => confirm bây giờ đã dùng được, nhưng ko nên sử dụng kèm các tools như Prisma, hay server side quá vì chưa ổn định

appDir: đã ngon

Nếu không bật turbo thì hầu như các config + api chạy được
Middleware ko có issue gì
Cảm giác query database trực tiếp khá đã
Handle redirect/headers trực tiếp trong component khá dễ, ví dụ bạn có 1 path là /dashboard và tùy thuộc logic query từ db sẽ redirect tới path chỉ định. Cảm giác như đang viết PHP

## Điểm trừ

Chậm, rất là chậm, project chưa xong mà file thay đổi mất 4s (m1 16 inch), đã thử tăng mem lên 4gb

Máy của đồng nghiệp Intel, mở project 2 phút chưa chạy lên được, 1 lúc mở thành công web thì ko di chuyển các màn hình được, vì build quá lâu
Chậm hơn next 12 nhiều dù dùng pages thay vì appDir
1 phần lí do chậm có thể liên quan tới việc next 13 phải build server + client độc lập

Rebuild js mỗi lần di chuyển các màn hình, làm tốn nhiều thời gian chờ
Turbopack rất không ổn định, dù ra đã lâu, gần như không thể sử dụng được, nhưng nếu bỏ Prisma + Server Side lib thì chắc là được.
Nhiều lỗi vặt liên quan nhiều thứ, tuy nhiên giờ đã hết nhiều rồi.
Styled-js hoặc các css-in-js cần viết thêm code để nó hoạt động được
Làm việc với css-in-js không ổn định, bị flash nhiều và nhiều issue mà ko biết debug làm sao.
Loading không ổn định, khó debug cái này (ý kiến cá nhân)
Fetch next revalidate chưa chạy được (ít nhất là với octokit)
Mất nhiều thời gian để hiểu phần Data Fetching, hiện tại mình cũng chưa chắc là bản thân hiểu hết
Chưa set headers bằng api `headers` được, hoặc `cookies` trước làm cái callback url mà ko được, phải chuyển qua làm bằng api.
Local thì quá chậm nhưng prod lại chạy rất nhanh (hoặc là quá nhanh cũng đc)
Nhiều điểm khác nhau giữa local và prod
Dính deps của next vào bundle (đã fix vài ngày trước)
Dễ bị lỗi hydration fail
Chưa đọc được query từ layout, và một số api của appDir chưa đc implement cho tới nay
Ở prod rất khó debug issue crash (client ko hiện( lí do security), đôi lúc server cũng ko hiện)
Pathpida có vài lỗi phải workaround, giờ ko biết fix đc chưa
Đôi lúc hiện lỗi rồi sau đó lại ko thấy đâu nữa
Memory tăng cao, mình nhớ lần cuối kiểm tra là x3 hay x2 lần so với next 12.
Build có vẻ lâu hơn, mà cũng ko vấn đề lắm
Turbopack hiện tại chỉ support 1 vài config trong next.config.js
‘server-only’ khó dùng & dễ nhầm, ko dùng thì lại sợ :pray:
TRPC chưa chính thức support, phải hơi workaround

Cần lưu ý nếu muốn sử dụng giống getServerSideProps ở next 12 thì cần export const revalidate=0
Lưu ý 1 issue: mặc định khi build sẽ pre render page, cần để ý nếu có mutation/ ko có env

## Tóm lại

Vậy có nên sử dụng Next.js 13 cho dự án mới không? Câu trả lời là: có, xài ngon. Nhưng có vẻ sẽ phù hợp nhất khi xây dựng blogs, hoặc ứng dụng tập trung vào UI và ít liên quan tới server, hoặc chỉ là `fetch`/BFF.
