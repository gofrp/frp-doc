---
title: "客户端插件"
weight: 110
---

默认情况下，frpc 仅会将请求转发到本地 TCP 或 UDP 端口，即通过 `localIP` 和 `localPort` 指定的本地服务地址。

通过启用客户端插件功能，可以在仅启动 frpc 的情况下内置一些简单的本地服务，从而实现通常需要额外启动其他服务才能实现的功能。

在每个代理的配置中，你可以通过 `plugin` 来配置要使用的插件和相关参数。启用客户端插件后，无需再配置 `localIP` 和 `localPort`。

客户端插件可用于各种类型的代理，前提是插件本身支持的协议。例如，静态文件访问插件可以通过 TCP 或 HTTP 代理进行暴露。

以下是使用 `http_proxy` 插件的示例：

```toml
[[proxies]]
name = "http_proxy"
type = "tcp"
remotePort = 6000
[proxies.plugin]
type = "http_proxy"
httpUser = "abc"
httpPassword = "abc"
```

`httpUser` 和 `httpPassword` 即为 `http_proxy` 插件可选的配置参数。

其他插件和相关配置请参考 [Reference](../../../reference/) 中的内容。
