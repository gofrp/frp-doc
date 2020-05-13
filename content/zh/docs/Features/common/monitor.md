---
title: "监控"
date: 2020-04-05
weight: 2
---

目前 frps 服务端支持内存和 Prometheus 两种监控系统。

### 内存

内存中存储的监控数据主要用于 Dashboard 展示，当在 frps 配置中开启 Dashboard 功能后会默认开启内部的监控。

内存中的监控数据每次重启进程后会清空，监控数据可以通过 Dashboard 的地址发送 HTTP 请求获取，但是目前此 API 尚不规范，不推荐直接使用。

### Prometheus

由于设计问题，Prometheus 对外提供的查询接口复用了 Dashboard 的地址，所以要使用 Prometheus 监控，必须要首先开启 Dashboard。

在 frps.ini 中启用 Dashboard，并设置 `enable_prometheus = true`，则通过 `http://{dashboard_addr}/metrics` 可以获取到 Prometheus 的监控数据。
