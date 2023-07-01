---
title: "安全地暴露内网服务"
weight: 40
description: >
  这个示例将会创建一个只有自己能访问到的 SSH 服务代理。
---

对于某些服务来说如果直接暴露于公网上将会存在安全隐患。

使用 `stcp(secret tcp)` 类型的代理可以避免让任何人都能访问到要穿透的服务，但是访问者也需要运行另外一个 frpc 客户端。

1. frps.ini 内容如下：

    ```ini
    [common]
    bind_port = 7000
    ```

2. 在需要暴露到外网的机器上部署 frpc，且配置如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [secret_ssh]
    type = stcp
    # 只有 sk 一致的用户才能访问到此服务
    sk = abcdefg
    local_ip = 127.0.0.1
    local_port = 22
    ```

3. 在想要访问内网服务的机器上也部署 frpc，且配置如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [secret_ssh_visitor]
    type = stcp
    # stcp 的访问者
    role = visitor
    # 要访问的 stcp 代理的名字
    server_name = secret_ssh
    sk = abcdefg
    # 绑定本地端口用于访问 SSH 服务
    bind_addr = 127.0.0.1
    bind_port = 6000
    ```

4. 通过 SSH 访问内网机器，假设用户名为 test：

    `ssh -oPort=6000 test@127.0.0.1`
