---
title: "Forward DNS Query Requests"
weight: 20
description: >
  This example demonstrates how to forward DNS query requests through simple configuration of UDP type proxy.
---

DNS query requests typically use the UDP protocol, and frp supports penetration of intranet UDP services, with configuration similar to TCP.

### Steps

1. **Configure frps.toml**

    Add the following content to the frps.toml file:

    ```toml
    bindPort = 7000
    ```

2. **Configure frpc.toml**

    Add the following content to the frpc.toml file:

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

    Please note that this example reverse-proxies Google's DNS query server address, which is only for testing UDP proxy and has no practical significance.

3. **Start frps and frpc**

   Start frps and frpc respectively.

4. **Test DNS Query Requests**

   Use the following command to test UDP packet forwarding with the `dig` tool, expecting to return the resolution result for the `www.baidu.com` domain:

   ```bash
   dig @x.x.x.x -p 6000 www.baidu.com
   ```