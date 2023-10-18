---
title: "路由"
weight: 5
---

## URL 路由

frp 支持根据请求的 URL 路径路由转发到不同的后端服务。

通过配置文件中的 locations 字段指定一个或多个 proxy 能够匹配的 URL 前缀(目前仅支持最大前缀匹配，之后会考虑正则匹配)。例如指定 `locations = "/news"`，则所有 URL 以 `/news` 开头的请求都会被转发到这个服务。

```toml
# frpc.toml
[[proxies]]
name = "web01"
type = "http"
localPort = 80
customDomains = ["web.yourdomain.com"]
locations = ["/"]

[[proxies]]
name = "web02"
type = "http"
localPort = 81
customDomains = ["web.yourdomain.com"]
locations = ["/news", "/about"]
```

按照上述的示例配置后，`web.yourdomain.com` 这个域名下所有以 `/news` 以及 `/about` 作为前缀的 URL 请求都会被转发到 web02，其余的请求会被转发到 web01。
