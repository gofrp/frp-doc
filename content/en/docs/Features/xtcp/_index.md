---
title: "XTCP"
weight: 5
description: >
  Learn about frp `XTCP` type proxies.
---

XTCP configuration is very similar to STCP. However, it uses P2P hole punching for penetration. If successful, subsequent traffic will not go through frps but will communicate directly, no longer limited by the bandwidth of the server where frps is located.

Since hole punching success depends on the NAT type of the network, XTCP's availability and stability cannot be guaranteed. In cases where reliable connections are needed, it is recommended to use STCP instead.

When visitor is configured with `keepTunnelOpen = true`, frpc will periodically check whether the tunnel is open. If not, it will try to punch holes to establish the tunnel. This keeps the tunnel always open, avoiding delays when connecting to the peer service.

By default, visitor will try to punch holes after receiving user connections. If hole punching fails, you can try to establish connections multiple times. The program will try other hole punching strategies and may succeed after multiple retries. Once hole punching succeeds, subsequent new connections don't need to punch holes again but can reuse the tunnel.

## Fallback Mechanism

You can configure fallback to stcp visitor to fall back to stcp connection establishment when hole punching fails.

Example configuration:

```toml
[[visitors]]
name = "stcp-visitor"
type = "stcp"
serverName = "stcp-test"
secretKey = "abc"
bindPort = -1

[[visitors]]
name = "xtcp-visitor"
type = "xtcp"
serverName = "xtcp-test"
secretKey = "abc"
bindAddr = "127.0.0.1"
bindPort = 9002
fallbackTo = "stcp-visitor"
fallbackTimeoutMs = 200
```

When connecting to `127.0.0.1:9002`, if p2p hole punching hasn't succeeded after 200ms, it will fall back to using stcp-visitor to establish connection. After fallback, the previously triggered hole punching operation will continue, and generally hole punching takes a long time to complete.

If hole punching succeeds, the next time a new connection is established, hole punching won't be needed again, connection establishment will be completed quickly, and fallback won't be triggered.

Note that you should set the timeout reasonably based on the latency between the access side and the accessed side, to avoid timeout being too short where even if hole punching succeeds, the connection doesn't have time to establish, causing fallback to be triggered constantly.

Setting stcp-visitor's `bindPort` to -1 means it doesn't need to listen on a physical port, only accepting fallback connections.