---
title: "通过自定义域名访问内网的 Web 服务"
weight: 3
description: >
  这个示例通过简单配置 HTTP 类型的代理让用户访问到内网的 Web 服务。
---

HTTP 类型的代理相比于 TCP 类型，不仅在服务端只需要监听一个额外的端口 `vhost_http_port` 用于接收 HTTP 请求，还额外提供了基于 HTTP 协议的诸多功能。

1. 修改 frps.ini 文件，设置监听 HTTP 请求端口为 8080：

    ```ini
    [common]
    bind_port = 7000
    vhost_http_port = 8080
    ```

2. 修改 frpc.ini 文件，假设 frps 所在的服务器的 IP 为 x.x.x.x，`local_port` 为本地机器上 Web 服务监听的端口, 绑定自定义域名为 `custom_domains`。

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [web]
    type = http
    local_port = 80
    custom_domains = www.yourdomain.com

    [web2]
    type = http
    local_port = 8080
    custom_domains = www.yourdomain2.com
    ```

3. 分别启动 frps 和 frpc。

4. 将 `www.yourdomain.com` 和 `www.yourdomain2.com` 的域名 A 记录解析到 IP `x.x.x.x`，如果服务器已经有对应的域名，也可以将 CNAME 记录解析到服务器原先的域名。或者可以通过修改 HTTP 请求的 Host 字段来实现同样的效果。

5. 通过浏览器访问 `http://www.yourdomain.com:8080` 即可访问到处于内网机器上 80 端口的服务，访问 `http://www.yourdomain2.com:8080` 则访问到内网机器上 8080 端口的服务。
