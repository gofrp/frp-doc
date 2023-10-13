---
title: "通过自定义域名访问内网的 Web 服务"
weight: 15
description: >
  通过简单配置 HTTP 类型的代理，您可以让用户通过自定义域名访问内网的 Web 服务。
---

HTTP 类型的代理非常适合将内网的 Web 服务通过自定义域名提供给外部用户。相比于 TCP 类型代理，HTTP 代理不仅可以复用端口，还提供了基于 HTTP 协议的许多功能。

HTTPS 与此类似，但是需要注意，frp 的 https 代理需要本地服务是 HTTPS 服务，frps 端不会做 TLS 终止。也可以结合 https2http 插件来实现将本地的 HTTP 服务以 HTTPS 协议暴露出去。

### 步骤

1. **配置 frps.toml**

   在 frps.toml 文件中添加以下内容，以指定 HTTP 请求的监听端口为 8080：

    ```toml
    bindPort = 7000
    vhostHTTPPort = 8080
    ```

   如果需要配置 HTTPS 代理，还需要设置 `vhostHTTPSPort`。

2. **配置 frpc.toml**

   在 frpc.toml 文件中添加以下内容，确保设置了正确的服务器 IP 地址、本地 Web 服务监听端口和自定义域名：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "web"
    type = "http"
    localPort = 80
    customDomains = ["www.yourdomain.com"]

    [[proxies]]
    name = "web2"
    type = "http"
    localPort = 8080
    customDomains = ["www.yourdomain2.com"]
    ```

3. **启动 frps 和 frpc**

4. **域名解析**

   将 `www.yourdomain.com` 和 `www.yourdomain2.com` 的域名 A 记录解析到服务器的 IP 地址 `x.x.x.x`。如果服务器已经有对应的域名，您还可以将 CNAME 记录解析到原始域名。另外，通过修改 HTTP 请求的 Host 字段也可以实现相同的效果。


5. **通过浏览器访问**

   使用浏览器访问 `http://www.yourdomain.com:8080` 即可访问内网机器上的 80 端口服务，访问 `http://www.yourdomain2.com:8080` 可以访问内网机器上的 8080 端口服务。
