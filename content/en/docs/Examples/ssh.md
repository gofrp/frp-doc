---
title: "Access Intranet Machines via SSH"
weight: 5
description: >
  Through simple configuration of TCP type proxy, users can access intranet servers.
---

### Steps

1. **Deploy frps on a machine with public IP**

    Deploy frps and edit the frps.toml file. Here is a simplified configuration where we set the port for the frp server to receive client connections:

    ```toml
    bindPort = 7000
    ```

2. **Deploy frpc on the intranet machine that needs to be accessed**

    Deploy frpc and edit the frpc.toml file. Assume the public IP address of the server where frps is located is x.x.x.x. Here is an example configuration:

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

    * `localIP` and `localPort` are configured as the address and port of the intranet service that needs to be accessed from the public network.
    * `remotePort` represents the port listened on by the frp server, and traffic accessing this port will be forwarded to the corresponding port of the local service.

3. **Start frps and frpc**

4. **Access the intranet machine via SSH**

    Use the following command to access the intranet machine via SSH, assuming the username is test:

    ```bash
    ssh -o Port=6000 test@x.x.x.x
    ```

    frp will forward traffic sent to `x.x.x.x:6000` to port 22 of the intranet machine.