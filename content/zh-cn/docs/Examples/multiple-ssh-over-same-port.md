---
title: "多个 SSH 服务复用同一端口"
weight: 10
description: >
  通过使用 tcpmux 类型的代理，您可以实现多个 SSH 服务通过同一端口进行暴露。这种方法还适用于任何支持 HTTP Connect 代理连接方式的客户端，以实现端口的复用。
---

### 步骤

1. **在具有公网 IP 的机器上部署 frps**

    修改 frps.toml 文件以包含以下内容（这里使用了最简化的配置）：

    ```toml
    bindPort = 7000
    tcpmuxHTTPConnectPort = 5002
    ```

2. **在内网机器 A 上部署 frpc**

   创建 frpc 配置文件，例如 frpc.toml，然后将以下内容添加到配置文件中：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "ssh1"
    type = "tcpmux"
    multiplexer = "httpconnect"
    customDomains = ["machine-a.example.com"]
    localIP = "127.0.0.1"
    localPort = 22
    ```

3. **在内网机器 B 上部署另一个 frpc**

   创建 frpc 配置文件，例如 frpc.toml，然后将以下内容添加到配置文件中：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "ssh2"
    type = "tcpmux"
    multiplexer = "httpconnect"
    customDomains = ["machine-b.example.com"]
    localIP = "127.0.0.1"
    localPort = 22
    ```

4. **通过 SSH ProxyCommand 访问内网机器 A**

    使用 SSH ProxyCommand 访问内网机器 A，假设用户名为 test。使用以下命令：

    ```bash
    ssh -o 'proxycommand socat - PROXY:x.x.x.x:%h:%p,proxyport=5002' test@machine-a.example.com
    ```

   要访问内网机器 B，只需更改域名，假设用户名仍然为 test：

    ```bash
    ssh -o 'proxycommand socat - PROXY:x.x.x.x:%h:%p,proxyport=5002' test@machine-b.example.com
    ```

通过按照以上步骤进行配置，您可以实现多个 SSH 服务复用同一端口，以便在具有公网 IP 的机器上进行访问。
