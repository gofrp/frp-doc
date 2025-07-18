---
title: "Modify HTTP Request Header"
weight: 2
---

## Modify Host Header

Normally, frp will not modify any forwarded data. However, some backend services will display different websites based on the Host field in HTTP request headers, such as nginx's virtual host service. Enabling the Host Header modification feature can dynamically modify the Host field in HTTP requests. Note that this feature is only available for HTTP type proxies.

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["test.yourdomain.com"]
hostHeaderRewrite = "dev.yourdomain.com"
```

The original Host field `test.yourdomain.com` in the HTTP request will be replaced with `dev.yourdomain.com` when forwarded to the backend service.

## Set Regular Headers

For HTTP type proxies, you can set Header parameters that are dynamically added during forwarding.

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["test.yourdomain.com"]
hostHeaderRewrite = "dev.yourdomain.com"
requestHeaders.set.x-from-where = "frp"
responseHeaders.set.foo = "bar"
```

According to the above configuration, `x-from-where: frp` will be added to the request Header, and `foo: bar` will be added to the response Header.