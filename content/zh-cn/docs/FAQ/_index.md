---
title: "FAQ"
weight: 7
---

## 如何在启动 frp 前校验配置文件？

客户端配置可执行 `frpc verify -c ./frpc.toml`，服务端配置可执行 `frps verify -c ./frps.toml`。详见[配置校验](../features/common/configure/#配置校验)。

## frpc 无法连接 frps 时应检查什么？

确认 frps 和 frpc 均已运行、`serverAddr` 指向 frps 所在主机，并且 frpc 的 `serverPort` 与 frps 的 `bindPort` 一致。可以先用 [SSH 示例](../examples/ssh/)验证最小配置，再根据[通用配置参考](../reference/common/#logconfig)中的日志选项定位问题。

## XTCP 打洞失败时怎么办？

XTCP 的可用性取决于 NAT 环境，无法保证每次都能连接成功。可靠性要求较高时应使用 STCP，也可以配置内置的 [XTCP Fallback 机制](../features/xtcp/#fallback-机制)，在打洞失败时回退到 STCP visitor。访问模型详见 [STCP 与 SUDP](../features/stcp-sudp/)。

## 在哪里查看完整配置项？

请查看[参考](../reference/)章节，其中包含服务端、客户端、代理、访问者和插件的完整配置说明。
