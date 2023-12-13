---
title: "负载均衡与健康检查"
weight: 60
---

## 负载均衡

你可以将多个相同类型的代理加入到同一个 `group` 中，以实现负载均衡的能力。

目前支持的代理类型包括：`tcp`, `http`, `tcpmux`。

```toml
# frpc.toml
[[proxies]]
name = "test1"
type = "tcp"
localPort = 8080
remotePort = 80
loadBalancer.group = "web"
loadBalancer.groupKey = "123"

[[proxies]]
name = "test2"
type = "tcp"
localPort = 8081
remotePort = 80
loadBalancer.group = "web"
loadBalancer.groupKey = "123"
```

当用户连接 frps 服务器的 80 端口时，frps 会将接收到的用户连接随机分发给其中一个存活的代理。这可以确保即使一台 frpc 机器挂掉，仍然有其他节点能够提供服务。

对于 tcp 类型代理，需要确保 `groupKey` 相同以进行权限验证，同时 `remotePort` 也需一致。

对于 http 类型代理，需要保证 `groupKey`, `customDomains`(自定义域名)，`subdomain` 和 `locations` 相同。

## 健康检查

通过给代理配置健康检查参数，可以在要反向代理的服务出现故障时，将该服务从 frps 中摘除。结合负载均衡的功能，这可用于实现高可用架构，避免服务单点故障。

要启用健康检查功能，需要在每个代理的配置中添加 `healthCheck.type = {type}`。

目前支持的类型有 `tcp` 和 `http`。

* 对于 `tcp`，只要能够建立连接，即认为服务正常。
* 对于 `http`，会发送一个 HTTP 请求，服务需要返回状态码 2xx 才会被视为正常。

以下是 `tcp` 示例配置：

```toml
[[proxies]]
name = "test1"
type = "tcp"
localPort = 22
remotePort = 6000
# 启用健康检查，类型为 tcp
healthCheck.type = "tcp"
# 建立连接超时时间为 3 秒
healthCheck.timeoutSeconds = 3
# 连续 3 次检查失败，此 proxy 会被摘除
healthCheck.maxFailed = 3
# 每隔 10 秒进行一次健康检查
healthCheck.intervalSeconds = 10
```

以下是 http 示例配置：

```toml
[[proxies]]
name = "web"
type = "http"
localIP = "127.0.0.1"
localPort = 80
customDomains = ["test.yourdomain.com"]
# 启用健康检查，类型为 http
healthCheck.type = "http"
# 健康检查发送 http 请求的 path，后端服务需要返回 2xx 的 http 状态码
healthCheck.path = "/status"
healthCheck.timeoutSeconds = 3
healthCheck.maxFailed = 3
healthCheck.intervalSeconds = 10
```
