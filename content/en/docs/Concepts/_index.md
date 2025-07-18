---
title: "Concepts"
weight: 3
description: >
  Understanding these concepts will help you better understand and use frp.
---

## How it works

frp consists of two main components: the client (frpc) and the server (frps). Typically, the server is deployed on a machine with a public IP address, while the client is deployed on the machine where the intranet service that needs to be penetrated is located.

Since intranet services lack public IP addresses, they cannot be directly accessed by users outside the local network. Users access the server's frps, and frp is responsible for routing requests to the corresponding intranet machine based on the requested port or other information, thus enabling communication.

## Proxy

In frp, a proxy corresponds to an intranet service that needs to be publicly accessible. A client can configure multiple proxies simultaneously to meet different requirements.

## Proxy Types

frp supports multiple proxy types to adapt to different usage scenarios. Here are some common proxy types:

- **TCP**: Provides pure TCP port mapping, allowing the server to route requests to different intranet services based on different ports.
- **UDP**: Provides pure UDP port mapping, similar to TCP proxy but for UDP traffic.
- **HTTP**: Designed specifically for HTTP applications, supporting additional features such as modifying Host Header and adding authentication.
- **HTTPS**: Similar to HTTP proxy but specifically designed for handling HTTPS traffic.
- **STCP**: Provides secure TCP intranet proxy, requiring frpc deployment on both the accessed and accessing machines, without needing to expose ports on the server.
- **SUDP**: Provides secure UDP intranet proxy, similar to STCP, requiring frpc deployment on both the accessed and accessing machines, without needing to expose ports on the server.
- **XTCP**: Point-to-point intranet penetration proxy, similar to STCP, but traffic does not need to be relayed through the server.
- **TCPMUX**: Supports multiplexing of server TCP ports, allowing access to different intranet services through the same port.

Each proxy type is suitable for different usage scenarios, and you can choose the appropriate proxy type to configure frp according to your needs.
