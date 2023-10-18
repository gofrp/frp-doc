---
title: "HTTP & HTTPS"
weight: 3
description: >
  了解 frp `HTTP`, `HTTPS` 类型的代理。
---

HTTP 和 HTTPS 是 frp 中针对这两种协议额外提供了一些特殊的能力。本质上目前这两种应用层协议的底层协议都是 TCP。

如果不需要用到相关的特殊功能，可以直接使用 TCP 类型的代理，更加简单方便。

HTTP 和 HTTPS 协议的一个特点是发送的请求都具有 Host 字段，通过该字段描述要访问的服务。基于这个特点，frp 服务端只需要监听在一个端口(通过 `vhostHTTPPort` 和 `vhostHTTPSPort` 指定)。就可以根据请求的 Host 来决定需要路由给哪一个代理，而不需要像 TCP 类型那样为每一个服务绑定一个端口。
