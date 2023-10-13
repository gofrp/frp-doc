---
title: "为本地 HTTP 服务启用 HTTPS"
weight: 35
description: >
  使用 `https2http` 插件将本地 HTTP 服务转换为 HTTPS 服务，以供外部访问。
---

### 步骤

1. **配置 frps.toml**

    ```toml
    bindPort = 7000
    vhostHTTPSPort = 443
    ```

2. **配置 frpc.toml**

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

    # HTTPS 证书相关的配置
    crtPath = "./server.crt"
    keyPath = "./server.key"
    hostHeaderRewrite = "127.0.0.1"
    requestHeaders.set.x-from-where = "frp"
    ```

    请注意，您需要根据您的域名和证书路径自行更改上述配置。

3. **启动 frps 和 frpc**

4. **访问 HTTPS 服务**

    打开您的 Web 浏览器，访问 `https://test.yourdomain.com`。

通过按照以上步骤进行配置，您将能够为本地 HTTP 服务启用 HTTPS，以实现安全的外部访问。
