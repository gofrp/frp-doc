---
title: "通过 SSH 访问内网机器"
weight: 5
description: >
  通过简单配置 TCP 类型的代理，使用户能够访问内网服务器。
---

### 步骤

1. **在具有公网 IP 的机器上部署 frps**

    部署 frps 并编辑 frps.toml 文件。以下是简化的配置，其中设置了 frp 服务器用于接收客户端连接的端口：

    ```toml
    bindPort = 7000
    ```

2. **在需要被访问的内网机器上部署 frpc**

    部署 frpc 并编辑 frpc.toml 文件，假设 frps 所在服务器的公网 IP 地址为 x.x.x.x。以下是示例配置：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "ssh"
    type = "tcp"
    localIP = "127.0.0.1"
    localPort = 22
    remotePort = 6000
    ```

    * `localIP` 和 `localPort` 配置为需要从公网访问的内网服务的地址和端口。
    * `remotePort` 表示在 frp 服务端监听的端口，访问此端口的流量将被转发到本地服务的相应端口。

3. **启动 frps 和 frpc**

4. **通过 SSH 访问内网机器**

    使用以下命令通过 SSH 访问内网机器，假设用户名为 test：

    ```bash
    ssh -o Port=6000 test@x.x.x.x
    ```

    frp 将请求发送到 `x.x.x.x:6000` 的流量转发到内网机器的 22 端口。
