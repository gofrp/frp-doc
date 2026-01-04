---
title: "Load Balancing and Health Check"
weight: 60
---

## Load Balancing

You can add multiple proxies of the same type to the same `group` to implement load balancing capabilities.

Currently supported proxy types include: `tcp`, `http`, `https`, `tcpmux`.

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

When users connect to port 80 of the frps server, frps will randomly distribute received user connections to one of the surviving proxies. This ensures that even if one frpc machine fails, other nodes can still provide services.

For tcp type proxies, ensure that `groupKey` is the same for permission verification, and `remotePort` must also be consistent.

For http type proxies, ensure that `groupKey`, `customDomains` (custom domain names), `subdomain`, and `locations` are the same.

## Health Check

By configuring health check parameters for proxies, you can remove a service from frps when the service to be reverse proxied fails. Combined with load balancing functionality, this can be used to implement high availability architecture and avoid single point of failure.

To enable health check functionality, you need to add `healthCheck.type = {type}` to each proxy's configuration.

Currently supported types are `tcp` and `http`.

* For `tcp`, as long as a connection can be established, the service is considered normal.
* For `http`, an HTTP request will be sent, and the service needs to return a 2xx status code to be considered normal.

The following is a `tcp` example configuration:

```toml
[[proxies]]
name = "test1"
type = "tcp"
localPort = 22
remotePort = 6000
# Enable health check, type is tcp
healthCheck.type = "tcp"
# Connection timeout is 3 seconds
healthCheck.timeoutSeconds = 3
# After 3 consecutive check failures, this proxy will be removed
healthCheck.maxFailed = 3
# Perform health check every 10 seconds
healthCheck.intervalSeconds = 10
```

The following is an http example configuration:

```toml
[[proxies]]
name = "web"
type = "http"
localIP = "127.0.0.1"
localPort = 80
customDomains = ["test.yourdomain.com"]
# Enable health check, type is http
healthCheck.type = "http"
# Path for health check HTTP request, backend service needs to return 2xx HTTP status code
healthCheck.path = "/status"
healthCheck.timeoutSeconds = 3
healthCheck.maxFailed = 3
healthCheck.intervalSeconds = 10
```