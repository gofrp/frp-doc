---
title: "Securely Expose Intranet Services"
weight: 40
description: >
  By creating an SSH service proxy that only authorized users can access, achieve secure exposure of intranet services.
---

Some intranet services may pose security risks if directly exposed on the public network. Using `stcp (secret tcp)` type proxies allows you to securely expose intranet services to authorized users, which requires visitors to also deploy frpc clients.

### Steps

1. **Configure frps.toml**

    Add the following content to the frps.toml file:

    ```toml
    bindPort = 7000
    ```

2. **Deploy frpc client and configure**

    Deploy frpc on the machine that needs to expose intranet services to the public network, and create the following configuration:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "secret_ssh"
    type = "stcp"
    # Only users with the same secretKey as set here can access this service
    secretKey = "abcdefg"
    localIP = "127.0.0.1"
    localPort = 22
    ```

3. **Deploy and configure frpc on the visitor machine**

    Also deploy frpc on the machine that wants to access the intranet service, and create the following configuration:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[visitors]]
    name = "secret_ssh_visitor"
    type = "stcp"
    # Name of the stcp proxy to access
    serverName = "secret_ssh"
    secretKey = "abcdefg"
    # Bind local port to access SSH service
    bindAddr = "127.0.0.1"
    bindPort = 6000
    ```

4. **Access the intranet machine via SSH**

   Use the following command to access the intranet machine via SSH, assuming the username is test:

   ```bash
   ssh -o Port=6000 test@127.0.0.1
   ```