---
title: "Set BasicAuth Authentication"
weight: 3
---

Since all clients share one frps HTTP service port, anyone who knows your domain name and URL can access your services deployed in the intranet. However, in some scenarios, you need to ensure that only limited users can access.

frp supports protecting your web services through HTTP Basic Auth, requiring users to access your services through username and password.

This feature is currently limited to HTTP type proxies and requires adding username and password settings in frpc's proxy configuration.

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

When accessing `http://test.yourdomain.com` through a browser, you need to enter the configured username and password to access.