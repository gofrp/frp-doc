---
title: "概述"
date: 2020-04-05
weight: 1
---

TCP 和 UDP 是 frp 中两种最基础的代理类型，用于代理监听在 TCP 和 UDP 端口的服务。

```ini
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```

通过 type 指定代理类型。

frp 会为本地服务的 22 端口，在 frps 所在的服务端监听 6000 端口，将 6000 端口接收到的连接和本地服务的 22 端口关联，透传流量，从而实现让用户在外部访问到内部服务。
