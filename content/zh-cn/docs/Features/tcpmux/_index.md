---
title: "TCPMUX"
weight: 6
description: >
  了解 frp `TCPMUX` 类型的代理。
---

frp 支持将单个端口收到的连接路由到不同的代理，类似 `vhostHTTPPort` 和 `vhostHTTPSPort`。

目前支持的复用器只有 `httpconnect`。

当在 `frps.toml` 中设置 `tcpmuxHTTPConnectPort`，frps 将会监听在这个端口，接收 HTTP CONNECT 请求。

frps 会根据 HTTP CONNECT 请求中的 host 路由到不同的后端代理。

示例配置如下：

```toml
# frps.toml
bindPort = 7000
tcpmuxHTTPConnectPort = 1337
```

```toml
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "proxy1"
type = "tcpmux"
multiplexer = "httpconnect"
customDomains = ["test1"]
localPort = 80

[[proxies]]
name = "proxy2"
type = "tcpmux"
multiplexer = "httpconnect"
customDomains = ["test2"]
localPort = 8080
```

通过上面的配置，frps 如果接收到 HTTP CONNECT 请求内容:

```
CONNECT test1 HTTP/1.1\r\n\r\n
```

该连接将会被路由到 proxy1 。
