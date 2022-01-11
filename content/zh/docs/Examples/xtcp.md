---
title: "点对点内网穿透"
weight: 9
description: >
  这个示例将会演示一种不通过服务器中转流量的方式来访问内网服务。
---

frp 提供了一种新的代理类型 `xtcp` 用于应对在希望传输大量数据且流量不经过服务器的场景。

使用方式同 `stcp` 类似，需要在两边都部署上 frpc 用于建立直接的连接。

**目前处于开发的初级阶段，并不能穿透所有类型的 NAT 设备，所以穿透成功率较低。穿透失败时可以尝试 `stcp` 的方式。**

1. frps.ini 内容如下，需要额外配置监听一个 UDP 端口用于支持该类型的客户端：

    ```ini
    [common]
    bind_port = 7000
    bind_udp_port = 7000
    ```

2. 在需要暴露到外网的机器上部署 frpc，且配置如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [p2p_ssh]
    type = xtcp
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

    [p2p_ssh_visitor]
    type = xtcp
    # xtcp 的访问者
    role = visitor
    # 要访问的 xtcp 代理的名字
    server_name = p2p_ssh
    sk = abcdefg
    # 绑定本地端口用于访问 ssh 服务
    bind_addr = 127.0.0.1
    bind_port = 6000
    ```

4. 通过 SSH 访问内网机器，假设用户名为 test：

    `ssh -oPort=6000 test@127.0.0.1`
