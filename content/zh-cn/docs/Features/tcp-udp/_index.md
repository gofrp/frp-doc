---
title: "TCP & UDP"
weight: 2
description: >
  了解 frp `TCP`, `UDP` 类型的代理。
---

TCP 和 UDP 是 frp 中两种最基础的代理类型，用于代理监听在 TCP 和 UDP 端口的服务。

```toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

通过 type 指定代理类型。

frp 会为本地服务的 22 端口，在 frps 所在的服务端监听 6000 端口，将 6000 端口接收到的连接和本地服务的 22 端口关联，透传流量，从而实现让用户在外部访问到内部服务。
