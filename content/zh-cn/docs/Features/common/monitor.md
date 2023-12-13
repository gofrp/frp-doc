---
title: "监控"
weight: 20
---

目前，frps 服务端支持两种监控系统：内存监控和 Prometheus 监控。

## 内存监控

内存中存储的监控数据主要用于 Dashboard 展示。当在 frps 配置中开启 Dashboard 功能后，内存监控默认启用。

请注意，内存中的监控数据在每次重启进程后会被清空，或者保留 7 天。监控数据可以通过 Dashboard 的地址发送 HTTP 请求获取，但目前此 API 尚不规范，不建议直接使用。

## Prometheus 监控

由于设计问题，Prometheus 对外提供的查询接口与 Dashboard 的地址重用，因此要使用 Prometheus 监控，必须首先启用 Dashboard。

在 frps.ini 中启用 Dashboard 并设置 `enablePrometheus = true`，然后你可以通过访问 `http://{dashboard_addr}/metrics` 来获取 Prometheus 的监控数据。
