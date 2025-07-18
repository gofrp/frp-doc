---
title: "TCP & UDP"
weight: 2
description: >
  Learn about frp `TCP`, `UDP` type proxies.
---

TCP and UDP are the two most basic proxy types in frp, used to proxy services listening on TCP and UDP ports.

## TCP Proxy

```toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

## UDP Proxy

```toml
[[proxies]]
name = "dns"
type = "udp"
localIP = "127.0.0.1"
localPort = 53
remotePort = 6000
```

Specify the proxy type through type.

frp will listen on the corresponding remote port on the server where frps is located for the local service port, associate the connections received by the remote port with the local service port, and transparently forward traffic, thereby enabling users to access internal services from outside.