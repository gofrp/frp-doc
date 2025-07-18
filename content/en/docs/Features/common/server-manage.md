---
title: "Server Management"
weight: 100
---

## Port Whitelist

To prevent port abuse, you can manually specify which ports are allowed to be used. In the server configuration, specify through `allowPorts`:

```toml
# frps.ini
allowPorts = [
  { start = 2000, end = 3000 },
  { single = 3001 },
  { single = 3003 },
  { start = 4000, end = 50000 }
]
```

`allowPorts` can configure a specific port or all ports within a range to be allowed.

## Port Reuse

Currently, `vhostHTTPPort` and `vhostHTTPSPort` in frps support being configured as the same port as `bindPort`. frps will analyze the connection protocol and then handle it differently.

For example, in some restrictive network environments, you can set both `bindPort` and `vhostHTTPSPort` to 443.

Note that if you want to configure `vhostHTTPSPort` and `bindPort` as the same port, you need to first set `transport.tls.disableCustomTLSFirstByte` to false.

## Rate Limiting

### Proxy Rate Limiting

Currently supports setting proxy-level rate limiting in the client's proxy configuration, limiting the bandwidth that a single proxy can occupy.

```toml
# frpc.toml
[[proxies]]
name = "ssh"
type = "tcp"
localPort = 22
remotePort = 6000
transport.bandwidthLimit = "1MB"
```

Add the `transport.bandwidthLimit` field to the proxy configuration to enable this feature. Currently only supports `MB` and `KB` units.

Rate limiting is implemented on the client side by default. If you want to enable server-side rate limiting, you need to additionally configure `transport.bandwidthLimitMode = "server"`.