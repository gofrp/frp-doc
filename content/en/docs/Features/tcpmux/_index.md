---
title: "TCPMUX"
weight: 6
description: >
  Learn about frp `TCPMUX` type proxies.
---

frp supports routing connections received on a single port to different proxies, similar to `vhostHTTPPort` and `vhostHTTPSPort`.

Currently, the only supported multiplexer is `httpconnect`.

When `tcpmuxHTTPConnectPort` is set in `frps.toml`, frps will listen on this port and accept HTTP CONNECT requests.

frps will route to different backend proxies based on the host in the HTTP CONNECT request.

Example configuration:

```toml
# frps.toml
bindPort = 7000
tcpmuxHTTPConnectPort = 1337
```

```toml
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "proxy1"
type = "tcpmux"
multiplexer = "httpconnect"
customDomains = ["test1"]
localPort = 80

[[proxies]]
name = "proxy2"
type = "tcpmux"
multiplexer = "httpconnect"
customDomains = ["test2"]
localPort = 8080
```

With the above configuration, if frps receives an HTTP CONNECT request:

```
CONNECT test1 HTTP/1.1\r\n\r\n
```

The connection will be routed to proxy1.