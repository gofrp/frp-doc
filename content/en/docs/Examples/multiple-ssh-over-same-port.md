---
title: "Multiple SSH Services Sharing the Same Port"
weight: 10
description: >
  By using tcpmux type proxy, you can expose multiple SSH services through the same port. This method is also suitable for any client that supports HTTP Connect proxy connection method to achieve port multiplexing.
---

### Steps

1. **Deploy frps on a machine with public IP**

    Modify the frps.toml file to include the following content (using the most simplified configuration here):

    ```toml
    bindPort = 7000
    tcpmuxHTTPConnectPort = 5002
    ```

2. **Deploy frpc on intranet machine A**

   Create an frpc configuration file, for example frpc.toml, and add the following content to the configuration file:

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

3. **Deploy another frpc on intranet machine B**

   Create an frpc configuration file, for example frpc.toml, and add the following content to the configuration file:

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

4. **Access intranet machine A via SSH ProxyCommand**

    Use SSH ProxyCommand to access intranet machine A, assuming the username is test. Use the following command:

    ```bash
    ssh -o 'proxycommand socat - PROXY:x.x.x.x:%h:%p,proxyport=5002' test@machine-a.example.com
    ```

   To access intranet machine B, simply change the domain name, assuming the username is still test:

    ```bash
    ssh -o 'proxycommand socat - PROXY:x.x.x.x:%h:%p,proxyport=5002' test@machine-b.example.com
    ```

By following the above steps, you can implement multiple SSH services sharing the same port for access on machines with public IP addresses.