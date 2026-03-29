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

### 动态代理管理 (Store)

支持在运行时通过 Web UI 或 API 动态创建、修改和删除代理及访问者，无需重启 frpc。

通过配置 `store.path` 指定持久化存储文件来启用此功能：

```toml
# frpc.toml
[store]
path = "./db.json"
```

注意：需要同时启用客户端管理界面（webServer）才能通过 Web UI 和 API 管理 Store 中的条目。未启用 webServer 时，Store 中的数据仍会在启动时加载，但无法在运行时动态修改。

通过 Store 管理的代理和访问者会保存到磁盘，frpc 重启后自动恢复。它们与配置文件中定义的代理共同工作，当名称冲突时 Store 中的配置优先。

如果想要在外网环境访问 Admin UI，可以将 7400 端口通过 frp 映射出去即可，但需要重视安全风险。

```toml
# frpc.toml
[[proxies]]
name = "admin_ui"
type = "tcp"
localPort = 7400
remotePort = 7400
```
