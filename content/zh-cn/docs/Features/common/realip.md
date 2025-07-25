---
title: "获取用户真实 IP"
weight: 70
---

## HTTP X-Forwarded-For

目前只有 `http` 类型的代理或者启用了 `https2http` 或 `https2https` 插件的代理支持这一功能。

可以通过 HTTP 请求 header 中的 `X-Forwarded-For` 来获取用户真实 IP，默认启用。

## Proxy Protocol

frp 支持通过 `Proxy Protocol` 协议来传递经过 frp 代理的请求的真实 IP。

`Proxy Protocol` 功能启用后，frpc 在和本地服务建立连接后，会先发送一段 `Proxy Protocol` 的协议内容给本地服务，本地服务通过解析这一内容可以获得访问用户的真实 IP。所以不仅仅是 HTTP 服务，任何的 TCP 服务，只要支持这一协议，都可以获得用户的真实 IP 地址。

UDP 代理类型也支持 Proxy Protocol 功能，能够保留真实客户端 IP 地址。

需要注意的是，在代理配置中如果要启用此功能，需要本地的服务能够支持 `Proxy Protocol` 这一协议，目前 nginx 和 haproxy 都能够很好的支持。

### TCP/HTTPS 代理示例

这里以 `HTTPS` 类型为例:

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "https"
localPort = 443
customDomains = ["test.yourdomain.com"]

# 目前支持 v1 和 v2 两个版本的 proxy protocol 协议。
transport.proxyProtocolVersion = "v2"
```

只需要在代理配置中增加一行 `transport.proxyProtocolVersion = "v2"` 即可开启此功能。

本地的 HTTPS 服务可以通过在 nginx 的配置中启用 `Proxy Protocol` 的解析并将结果设置在 `X-Real-IP` 这个 Header 中就可以在自己的 Web 服务中通过 `X-Real-IP` 获取到用户的真实 IP。

### UDP 代理示例

UDP 代理也支持 Proxy Protocol 功能：

```toml
# frpc.toml
[[proxies]]
name = "dns"
type = "udp"
localIP = "127.0.0.1"
localPort = 53
remotePort = 6000

# 启用 UDP 代理的 Proxy Protocol 支持
transport.proxyProtocolVersion = "v2"
```

启用后，frps 和 frpc 会把源 IP 信息写入 Proxy Protocol 头部，后端 UDP 服务或日志系统可以准确识别访问者的真实 IP 地址，这对于安全审计和访问控制特别有用。
