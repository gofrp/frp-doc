---
title: "安全地暴露内网服务"
weight: 40
description: >
  通过创建一个只有授权用户能够访问的 SSH 服务代理，实现内网服务的安全暴露。
---

某些内网服务，如果直接暴露在公网上，可能存在安全风险。使用 `stcp(secret tcp)` 类型的代理可以让您安全地将内网服务暴露给经过授权的用户，这需要访问者也部署 frpc 客户端。

### 步骤

1. **配置 frps.toml**

    在 frps.toml 文件中添加以下内容：

    ```toml
    bindPort = 7000
    ```

2. **部署 frpc 客户端并配置**

    在需要将内网服务暴露到公网的机器上部署 frpc，并创建如下配置：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "secret_ssh"
    type = "stcp"
    # 只有与此处设置的 secretKey 一致的用户才能访问此服务
    secretKey = "abcdefg"
    localIP = "127.0.0.1"
    localPort = 22
    ```

3. **在访问者机器上部署并配置 frpc**

    在想要访问内网服务的机器上也部署 frpc，并创建如下配置：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[visitors]]
    name = "secret_ssh_visitor"
    type = "stcp"
    # 要访问的 stcp 代理的名字
    serverName = "secret_ssh"
    secretKey = "abcdefg"
    # 绑定本地端口以访问 SSH 服务
    bindAddr = "127.0.0.1"
    bindPort = 6000
    ```

4. **通过 SSH 访问内网机器**

   使用以下命令通过 SSH 访问内网机器，假设用户名为 test：

   ```bash
   ssh -o Port=6000 test@127.0.0.1
   ```
