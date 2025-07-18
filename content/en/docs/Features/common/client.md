---
title: "Client"
weight: 90
---

## Dynamic Configuration Updates

When you need to modify frpc proxy configuration, you can use the `frpc reload` command to achieve dynamic configuration file loading, usually completing proxy updates within seconds.

To enable this feature, you need to enable webServer in frpc to provide API services. The configuration is as follows:

```toml
webServer.addr = "127.0.0.1"
webServer.port = 7400
```

Then execute the following command to reload the configuration:

`frpc reload -c ./frpc.toml`

After waiting for a period of time, the client will create, update, or delete proxies according to the new configuration file. Note that parameters in the non-proxy related common section cannot currently be modified except for start.

## Command Line Proxy Status View

frpc supports viewing proxy status information through the `frpc status -c ./frpc.toml` command. This feature requires enabling webServer in frpc.

## Using Proxy to Connect to frps

In environments where external networks can only be accessed through proxies, frpc supports establishing connections with frps through HTTP or SOCKS5 proxies.

You can use this feature by setting the system environment variable `HTTP_PROXY` or setting the `transport.proxyURL` parameter in frpc's configuration file.

Only effective when `transport.protocol = "tcp"`.

```toml
serverAddr = "x.x.x.x"
serverPort = 7000
transport.proxyURL = "http://user:pwd@192.168.1.128:8080"
```

Setting `transport.proxyURL` to `socks5://user:pwd@192.168.1.128:8080` can also connect to SOCKS5 proxy.