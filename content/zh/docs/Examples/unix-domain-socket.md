---
title: "转发 Unix 域套接字"
date: 2020-04-05
weight: 5
description: >
  这个示例通过配置 Unix域套接字客户端插件来通过 TCP 端口访问内网的 Unix域套接字服务，例如 Docker Daemon。
---

1. frps.ini 内容如下：

    ```ini
    [common]
    bind_port = 7000
    ```

2. frpc.ini 内容如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [unix_domain_socket]
    type = tcp
    remote_port = 6000
    plugin = unix_domain_socket
    plugin_unix_path = /var/run/docker.sock
    ```

3. 分别启动 frps 和 frpc。

4. 通过 curl 命令查看 docker 版本信息

    `curl http://x.x.x.x:6000/version`
