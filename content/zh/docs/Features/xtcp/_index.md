---
title: "XTCP"
linkTitle: "XTCP"
weight: 5
description: >
  了解 frp `XTCP` 类型的代理。
---

XTCP 的配置方式和 STCP 很类似。但是会采用 P2P 的方式进行打洞穿透，如果成功，后续的流量将不会经过 frps，而是直接通信，不再受到 frps 所在服务器的带宽限制。

由于打洞成功率较低，所以 XTCP 的可用性和稳定性无法保证。在需要可靠连接的情况下，建议使用 STCP 替代。
