---
title: "Routing"
weight: 5
---

## URL Routing

frp supports routing and forwarding to different backend services based on the URL path of the request.

Specify one or more URL prefixes that a proxy can match through the locations field in the configuration file (currently only supports maximum prefix matching, regex matching will be considered later). For example, specifying `locations = "/news"` means all requests with URLs starting with `/news` will be forwarded to this service.

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

According to the above example configuration, all URL requests under the domain `web.yourdomain.com` with `/news` and `/about` as prefixes will be forwarded to web02, and the rest of the requests will be forwarded to web01.