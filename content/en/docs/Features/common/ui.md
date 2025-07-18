---
title: "Web Interface"
weight: 40
---

Currently, frpc and frps have built-in corresponding web interfaces for user convenience.

## Server Dashboard

The server Dashboard allows users to view frp status and proxy statistics through a browser.

**Note: Dashboard has not been optimized for displaying large amounts of proxy data. If you experience slow Dashboard access, please do not enable this feature.**

You need to specify the port used by the dashboard service in frps.toml to enable this feature:

```toml
# Default is 127.0.0.1, if you need public network access, change to 0.0.0.0.
webServer.addr = "0.0.0.0"
webServer.port = 7500
# dashboard username and password, optional, default is empty
webServer.user = "admin"
webServer.password = "admin"
```

Open your browser and access the Dashboard interface through `http://[server addr]:7500`, enter username and password `admin`.

You can also enable HTTPS interface by configuring TLS certificates:

```toml
webServer.tls.certFile = "server.crt"
webServer.tls.keyFile = "server.key"
```

## Client Management Interface

The built-in Admin UI in frpc can help users query and manage client proxy status and configuration through a browser.

You need to specify the port used by the admin service in frpc.toml to enable this feature:

```toml
# frpc.toml
webServer.addr = "127.0.0.1"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"
```

Open your browser and access the Admin UI through `http://127.0.0.1:7400`.

If you want to access the Admin UI from an external network environment, you can map port 7400 through frp, but you need to pay attention to security risks.

```toml
# frpc.toml
[[proxies]]
name = "admin_ui"
type = "tcp"
localPort = 7400
remotePort = 7400
```