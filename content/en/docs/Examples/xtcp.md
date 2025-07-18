---
title: "Point-to-Point Intranet Penetration"
weight: 45
description: >
  This example demonstrates how to access intranet services through point-to-point (P2P) connections, with traffic not relayed through the server.
---

frp provides a new proxy type `xtcp` for intranet penetration when you need to transfer large amounts of data and don't want traffic to go through the server.

Similar to `stcp`, using `xtcp` requires deploying frpc on both ends to establish a direct connection.

Note that `xtcp` is not suitable for all types of NAT devices. If penetration fails, you can try using `stcp` proxy.

### Steps

1. **Configure frpc.toml file on the machine that needs to be exposed to the external network**

   Add the following content to the frpc.toml file, ensuring the correct server address and port are set, along with the shared key (`secretKey`), and the IP address and port of the local service:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000
    # If the default STUN server is unavailable, you can configure a new STUN server
    # natHoleStunServer = "xxx"

    [[proxies]]
    name = "p2p_ssh"
    type = "xtcp"
    # Only users with the same secretKey as the server can access this service
    secretKey = "abcdefg"
    localIP = "127.0.0.1"
    localPort = 22
    ```

2. **Deploy frpc on the machine that wants to access the intranet service**

   Add the following content to the frpc.toml file, ensuring the correct server address and port are set, along with the shared key (`secretKey`) and the name of the P2P proxy to access:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000
    # If the default STUN server is unavailable, you can configure a new STUN server
    # natHoleStunServer = "xxx"

    [[visitors]]
    name = "p2p_ssh_visitor"
    type = "xtcp"
    # Name of the P2P proxy to access
    serverName = "p2p_ssh"
    secretKey = "abcdefg"
    # Bind local port to access SSH service
    bindAddr = "127.0.0.1"
    bindPort = 6000
    # If you need to automatically keep the tunnel open, set it to true
    # keepTunnelOpen = false
    ```

3. **Access the intranet machine via SSH**

   Use the SSH command to access the intranet machine, assuming the username is `test`:

    ```bash
    ssh -oPort=6000 test@127.0.0.1
    ```