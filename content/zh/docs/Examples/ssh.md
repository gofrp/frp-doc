---
title: "通过 SSH 访问内网机器"
date: 2020-04-05
weight: 2
description: >
  这个示例通过简单配置 TCP 类型的代理让用户访问到内网的服务器。
---

1. 在具有公网 IP 的机器上部署 frps，修改 frps.ini 文件，这里使用了最简化的配置，设置了 frp 服务器用户接收客户端连接的端口：

    ```ini
    [common]
    bind_port = 7000
    ```

2. 在需要被访问的内网机器上（SSH 服务通常监听在 22 端口）部署 frpc，修改 frpc.ini 文件，假设 frps 所在服务器的公网 IP 为 x.x.x.x：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [ssh]
    type = tcp
    local_ip = 127.0.0.1
    local_port = 22
    remote_port = 6000
    ```

    `local_ip` 和 `local_port` 配置为本地需要暴露到公网的服务地址和端口。`remote_port` 表示在 frp 服务端监听的端口，访问此端口的流量将会被转发到本地服务对应的端口。

3. 分别启动 frps 和 frpc。

4. 通过 SSH 访问内网机器，假设用户名为 test：

    `ssh -oPort=6000 test@x.x.x.x`

    frp 会将请求 `x.x.x.x:6000` 的流量转发到内网机器的 22 端口。
