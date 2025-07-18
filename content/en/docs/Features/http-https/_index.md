---
title: "HTTP & HTTPS"
weight: 3
description: >
  Learn about frp `HTTP`, `HTTPS` type proxies.
---

HTTP and HTTPS are protocols for which frp provides some special capabilities. Essentially, these two application layer protocols currently use TCP as the underlying protocol.

If you don't need to use related special functions, you can directly use TCP type proxies, which is simpler and more convenient.

A characteristic of HTTP and HTTPS protocols is that the sent requests all have a Host field, which describes the service to be accessed. Based on this characteristic, the frp server only needs to listen on one port (specified by `vhostHTTPPort` and `vhostHTTPSPort`). It can then decide which proxy to route to based on the request's Host, without needing to bind a port for each service like TCP type proxies.