---
title: "为本地 HTTP 服务启用 HTTPS"
weight: 35
description: >
  通过 `https2http` 插件可以让本地 HTTP 服务转换成 HTTPS 服务对外提供。
---

1. frps.ini 内容如下：

    ```ini
    [common]
    bind_port = 7000
    vhost_https_port = 443
    ```

2. frpc.ini 内容如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [test_htts2http]
    type = https
    custom_domains = test.yourdomain.com

    plugin = https2http
    plugin_local_addr = 127.0.0.1:80

    # HTTPS 证书相关的配置
    plugin_crt_path = ./server.crt
    plugin_key_path = ./server.key
    plugin_host_header_rewrite = 127.0.0.1
    plugin_header_X-From-Where = frp
    ```

3. 分别启动 frps 和 frpc。

4. 通过浏览器访问 `https://test.yourdomain.com`。
