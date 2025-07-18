---
title: "Client Plugin"
weight: 110
---

By default, frpc will only forward requests to local TCP or UDP ports, i.e., the local service address specified by `localIP` and `localPort`.

By enabling client plugin functionality, you can build in some simple local services when only starting frpc, thereby achieving functionality that would normally require starting additional services.

In each proxy's configuration, you can configure the plugin to use and related parameters through `plugin`. After enabling client plugins, you no longer need to configure `localIP` and `localPort`.

Client plugins can be used for various types of proxies, provided the plugin itself supports the protocols. For example, the static file access plugin can be exposed through TCP or HTTP proxies.

Here's an example using the `http_proxy` plugin:

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

`httpUser` and `httpPassword` are optional configuration parameters for the `http_proxy` plugin.

For other plugins and related configurations, please refer to the content in [Reference](../../../reference/).