---
title: "Get Real User IP"
weight: 70
---

## HTTP X-Forwarded-For

Currently, only `http` type proxies or proxies with `https2http` or `https2https` plugins enabled support this feature.

You can get the real user IP through the `X-Forwarded-For` in HTTP request headers, which is enabled by default.

## Proxy Protocol

frp supports passing the real IP of requests proxied through frp via the `Proxy Protocol` protocol.

After the `Proxy Protocol` feature is enabled, frpc will first send a section of `Proxy Protocol` protocol content to the local service after establishing a connection with the local service. The local service can obtain the real IP of the accessing user by parsing this content. So not only HTTP services, but any TCP service that supports this protocol can obtain the user's real IP address.

UDP proxy types also support Proxy Protocol functionality, which can preserve the real client IP address.

Note that if you want to enable this feature in proxy configuration, the local service needs to support the `Proxy Protocol` protocol. Currently, nginx and haproxy both support this protocol well.

### TCP/HTTPS Proxy Example

Here's an example using `HTTPS` type:

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "https"
localPort = 443
customDomains = ["test.yourdomain.com"]

# Currently supports v1 and v2 versions of proxy protocol.
transport.proxyProtocolVersion = "v2"
```

You only need to add one line `transport.proxyProtocolVersion = "v2"` to the proxy configuration to enable this feature.

Local HTTPS services can enable `Proxy Protocol` parsing in nginx configuration and set the result in the `X-Real-IP` header, so you can get the user's real IP through `X-Real-IP` in your web service.

### UDP Proxy Example

UDP proxies also support Proxy Protocol functionality:

```toml
# frpc.toml
[[proxies]]
name = "dns"
type = "udp"
localIP = "127.0.0.1"
localPort = 53
remotePort = 6000

# Enable Proxy Protocol support for UDP proxy
transport.proxyProtocolVersion = "v2"
```

After enabling, frps and frpc will write source IP information into the Proxy Protocol header. Backend UDP services or logging systems can accurately identify the visitor's real IP address, which is particularly useful for security auditing and access control.