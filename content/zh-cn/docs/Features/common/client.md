---
title: "客户端"
weight: 90
---

## 动态配置更新

当你需要修改 frpc 的代理配置时，你可以使用 `frpc reload` 命令来实现动态加载配置文件，通常在数秒内完成代理的更新。

要启用此功能，需要在 frpc 中启用 webServer，以提供 API 服务。配置如下：

```toml
webServer.addr = "127.0.0.1"
webServer.port = 7400
```

然后执行以下命令来重载配置：

`frpc reload -c ./frpc.toml`

等待一段时间后，客户端将根据新的配置文件创建、更新或删除代理。需要注意的是，非代理相关的公共部分的参数除了 start 外目前无法被修改。

## 命令行查看代理状态

frpc 支持通过 `frpc status -c ./frpc.toml` 命令查看代理的状态信息，此功能需要在 frpc 中启用 webServer。

## 使用代理连接 frps

在只能通过代理访问外部网络的环境中，frpc 支持通过 HTTP 或 SOCKS5 代理与 frps 建立连接。

你可以通过设置系统环境变量 `HTTP_PROXY` 或在 frpc 的配置文件中设置 `transport.proxyURL` 参数来使用此功能。

仅在 `transport.protocol = "tcp"` 时生效。

```toml
serverAddr = "x.x.x.x"
serverPort = 7000
transport.proxyURL = "http://user:pwd@192.168.1.128:8080"
```

将 `transport.proxyURL` 设置为 `socks5://user:pwd@192.168.1.128:8080` 也可以连接到 SOCKS5 代理。
