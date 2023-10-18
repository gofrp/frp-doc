---
title: "设置 BasicAuth 鉴权"
weight: 3
---

由于所有客户端共用一个 frps 的 HTTP 服务端口，任何知道你的域名和 URL 的人都能访问到你部署在内网的服务，但是在某些场景下需要确保只有限定的用户才能访问。

frp 支持通过 HTTP Basic Auth 来保护你的 web 服务，使用户需要通过用户名和密码才能访问到你的服务。

该功能目前仅限于 HTTP 类型的代理，需要在 frpc 的代理配置中添加用户名和密码的设置。

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["test.yourdomain.com"]
httpUser = "abc"
httpPassword = "abc"
```

通过浏览器访问 `http://test.yourdomain.com`，需要输入配置的用户名和密码才能访问。
