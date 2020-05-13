---
title: "修改 HTTP 请求 Header"
date: 2020-04-05
weight: 2
---

### 修改 Host Header

通常情况下 frp 不会修改转发的任何数据。但有一些后端服务会根据 HTTP 请求 header 中的 Host 字段来展现不同的网站，例如 nginx 的虚拟主机服务，启用 Host Header 的修改功能可以动态修改 HTTP 请求中的 Host 字段。需要注意的是，该功能仅限于 HTTP 类型的代理。

```ini
# frpc.ini
[web]
type = http
local_port = 80
custom_domains = test.yourdomain.com
host_header_rewrite = dev.yourdomain.com
```

原来 HTTP 请求中的 Host 字段 `test.yourdomain.com` 转发到后端服务时会被替换为 `dev.yourdomain.com`。

### 设置普通 Header

对于类型为 HTTP 的代理，可以设置在转发中动态添加的 Header 参数

```ini
# frpc.ini
[web]
type = http
local_port = 80
custom_domains = test.yourdomain.com
host_header_rewrite = dev.yourdomain.com
header_X-From-Where = frp
```

对于参数配置中所有以 `header_` 开头的参数(支持同时配置多个)，都会被添加到 HTTP 请求的 Header 中，根据如上的配置，会在请求的 Header 中加上 `X-From-Where: frp`。
