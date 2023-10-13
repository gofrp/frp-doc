---
title: "转发 DNS 查询请求"
weight: 20
description: >
  本示例演示如何通过简单配置 UDP 类型的代理来实现 DNS 查询请求的转发。
---

DNS 查询请求通常使用 UDP 协议，而 frp 支持对内网 UDP 服务的穿透，配置方式与 TCP 类似。

### 步骤

1. **配置 frps.toml**

    在 frps.toml 文件中添加以下内容：

    ```toml
    bindPort = 7000
    ```

2. **配置 frpc.toml**

    在 frpc.toml 文件中添加以下内容：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "dns"
    type = "udp"
    localIP = "8.8.8.8"
    localPort = 53
    remotePort = 6000
    ```

    请注意，这里示例中反代了 Google 的 DNS 查询服务器的地址，仅用于测试 UDP 代理，并没有实际意义。

3. **启动 frps 和 frpc**

   分别启动 frps 和 frpc。

4. **测试 DNS 查询请求**

   使用以下命令通过 `dig` 工具测试 UDP 包转发是否成功，预期会返回 `www.baidu.com` 域名的解析结果：

   ```bash
   dig @x.x.x.x -p 6000 www.baidu.com
   ```
