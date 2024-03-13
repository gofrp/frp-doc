---
title: "Web 界面"
weight: 40
---

目前 frpc 和 frps 分别内置了相应的 Web 界面方便用户使用。

## 服务端 Dashboard

服务端 Dashboard 使用户可以通过浏览器查看 frp 的状态以及代理统计信息。

**注：Dashboard 尚未针对大量的 proxy 数据展示做优化，如果出现 Dashboard 访问较慢的情况，请不要启用此功能。**

需要在 frps.toml 中指定 dashboard 服务使用的端口，即可开启此功能：

```toml
# 默认为 127.0.0.1，如果需要公网访问，需要修改为 0.0.0.0。
webServer.addr = "0.0.0.0"
webServer.port = 7500
# dashboard 用户名密码，可选，默认为空
webServer.user = "admin"
webServer.password = "admin"
```

打开浏览器通过 `http://[server addr]:7500` 访问 Dashboard 界面，输入用户名密码 `admin`。

你也可以通过配置 TLS 证书来启用 HTTPS 接口:

```toml
webServer.tls.certFile = "server.crt"
webServer.tls.keyFile = "server.key"
```

## 客户端管理界面

frpc 内置的 Admin UI 可以帮助用户通过浏览器来查询和管理客户端的 proxy 状态和配置。

需要在 frpc.toml 中指定 admin 服务使用的端口，即可开启此功能：

```toml
# frpc.toml
webServer.addr = "127.0.0.1"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"
```

打开浏览器通过 `http://127.0.0.1:7400` 访问 Admin UI。

如果想要在外网环境访问 Admin UI，可以将 7400 端口通过 frp 映射出去即可，但需要重视安全风险。

```toml
# frpc.toml
[[proxies]]
name = "admin_ui"
type = "tcp"
localPort = 7400
remotePort = 7400
```
