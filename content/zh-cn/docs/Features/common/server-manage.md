---
title: "服务端管理"
weight: 100
---

## 端口白名单

为了防止端口被滥用，可以手动指定允许哪些端口被使用，在服务端配置中通过 `allowPorts` 来指定：

```toml
# frps.ini
allowPorts = [
  { start = 2000, end = 3000 },
  { single = 3001 },
  { single = 3003 },
  { start = 4000, end = 50000 }
]
```

`allowPorts` 可以配置允许使用的某个指定端口或者是一个范围内的所有端口。

## 端口复用

目前 frps 中的 `vhostHTTPPort` 和 `vhostHTTPSPort` 支持配置成和 `bindPort` 为同一个端口，frps 会对连接的协议进行分析，之后进行不同的处理。

例如在某些限制较严格的网络环境中，可以将 `bindPort` 和 `vhostHTTPSPort` 都设置为 443。

需要注意的是，如果你想将 `vhostHTTPSPort` 和 `bindPort` 配置为相同的端口，需要首先将 `transport.tls.disableCustomTLSFirstByte` 设置为false。

## 限速

### 代理限速

目前支持在客户端的代理配置中设置代理级别的限速，限制单个 proxy 可以占用的带宽。

```toml
# frpc.toml
[[proxies]]
name = "ssh"
type = "tcp"
localPort = 22
remotePort = 6000
transport.bandwidthLimit = "1MB"
```

在代理配置中增加 `transport.bandwidthLimit` 字段启用此功能，目前仅支持 `MB` 和 `KB` 单位。

限速能力默认在客户端实现，如果希望启用服务端限速，需要额外配置 `transport.bandwidthLimitMode = "server"`。
