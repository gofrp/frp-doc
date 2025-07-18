---
title: "Enable HTTPS for Local HTTP Service"
weight: 35
description: >
  Use the `https2http` plugin to convert local HTTP services to HTTPS services for external access.
---

### Steps

1. **Configure frps.toml**

    ```toml
    bindPort = 7000
    vhostHTTPSPort = 443
    ```

2. **Configure frpc.toml**

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "test_htts2http"
    type = "https"
    customDomains = ["test.yourdomain.com"]

    [proxies.plugin]
    type = "https2http"
    localAddr = "127.0.0.1:80"

    # HTTPS certificate related configuration
    crtPath = "./server.crt"
    keyPath = "./server.key"
    hostHeaderRewrite = "127.0.0.1"
    requestHeaders.set.x-from-where = "frp"
    ```

    Please note that you need to modify the above configuration according to your domain name and certificate path.

3. **Start frps and frpc**

4. **Access HTTPS Service**

    Open your web browser and visit `https://test.yourdomain.com`.

By following the above steps, you will be able to enable HTTPS for local HTTP services to achieve secure external access.