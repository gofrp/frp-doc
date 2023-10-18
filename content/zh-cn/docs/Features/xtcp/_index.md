---
title: "XTCP"
weight: 5
description: >
  了解 frp `XTCP` 类型的代理。
---

XTCP 的配置方式和 STCP 很类似。但是会采用 P2P 的方式进行打洞穿透，如果成功，后续的流量将不会经过 frps，而是直接通信，不再受到 frps 所在服务器的带宽限制。

由于打洞成功率取决于所处网络的 NAT 类型，所以 XTCP 的可用性和稳定性无法保证。在需要可靠连接的情况下，建议使用 STCP 替代。

当 visitor 配置了 `keepTunnelOpen = true` 时，frpc 会定期检测隧道是否打开，如果没有，则会尝试打洞建立隧道，这样可以始终保持隧道打开，在需要连接对端服务时，可以避免延迟。

默认情况下，visitor 会在接收到用户连接后尝试打洞，如果打洞失败，可以尝试多次建立连接，程序会尝试其他的打洞策略，有可能在多次重试后成功打洞。一旦打洞成功，后续新增连接不必重复打洞，而是可以复用隧道。

## Fallback 机制

可以通过配置 fallback 到 stcp visitor 实现在打洞失败时，回退到 stcp 建立连接。

示例配置:

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

当连接 `127.0.0.1:9002` 超过 200ms p2p 打洞还未成功的话，会回退到使用 stcp-visitor 建立连接。fallback 后，之前触发的打洞操作仍然会继续，一般来说打洞完成需要的耗时会比较长。

如果打洞成功，下次建立新的连接时，将不需要再次打洞，会很快完成连接建立，不会触发 fallback。

需要注意根据访问端和被访问端的延迟情况来合理设置超时时间，以避免超时时间太短，即使打洞成功连接也来不及建立，而一直触发 fallback。

stcp-visitor 的 `bindPort` 设置为 -1 表示不需要监听物理端口，只接受 fallback 的连接即可。 
