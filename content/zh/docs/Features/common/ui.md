---
title: "Web 界面"
weight: 4
---

目前 frpc 和 frps 分别内置了相应的 Web 界面方便用户使用。

### 服务端 Dashboard

服务端 Dashboard 使用户可以通过浏览器查看 frp 的状态以及代理统计信息。

**注：Dashboard 尚未针对大量的 proxy 数据展示做优化，如果出现 Dashboard 访问较慢的情况，请不要启用此功能。**

需要在 frps.ini 中指定 dashboard 服务使用的端口，即可开启此功能：

```ini
# frps.ini
[common]
dashboard_port = 7500
# dashboard 用户名密码，默认都为 admin，如果不需要，需要主动设置为空
dashboard_user = admin
dashboard_pwd = admin
```

打开浏览器通过 `http://[server_addr]:7500` 访问 Dashboard 界面，用户名密码默认为 `admin`。

### 客户端管理界面

frpc 内置的 Admin UI 可以帮助用户通过浏览器来查询和管理客户端的 proxy 状态和配置。

需要在 frpc.ini 中指定 admin 服务使用的端口，即可开启此功能：

```ini
# frpc.ini
[common]
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin
```

打开浏览器通过 `http://127.0.0.1:7400` 访问 Admin UI，用户名密码默认为 `admin`。

如果想要在外网环境访问 Admin UI，可以将 7400 端口通过 frp 映射出去即可，但需要重视安全风险。

```ini
# frpc.ini
[admin_ui]
type = tcp
local_port = 7400
remote_port = 7400
```
