---
title: "转发 DNS 查询请求"
weight: 20
description: >
  这个示例通过简单配置 UDP 类型的代理转发 DNS 查询请求。
---

DNS 查询请求通常使用 UDP 协议，frp 支持对内网 UDP 服务的穿透，配置方式和 TCP 基本一致。

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

    [dns]
    type = udp
    local_ip = 8.8.8.8
    local_port = 53
    remote_port = 6000
    ```

    这里反代了 Google 的 DNS 查询服务器的地址，仅仅用于测试 UDP 代理，并无实际意义。

3. 分别启动 frps 和 frpc。

4. 通过 dig 测试 UDP 包转发是否成功，预期会返回 `www.baidu.com` 域名的解析结果。

    `dig @x.x.x.x -p 6000 www.baidu.com`
