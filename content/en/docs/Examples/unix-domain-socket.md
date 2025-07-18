---
title: "Forward Unix Domain Socket"
weight: 25
description: >
  By configuring the Unix domain socket client plugin, you can use TCP ports to access intranet Unix domain socket services, such as Docker Daemon.
---

### Steps

1. **Configure frps.toml**

   Add the following content to the frps.toml file:

    ```toml
    bindPort = 7000
    ```

2. **Configure frpc.toml**

   Add the following content to the frpc.toml file, ensuring the correct Unix domain socket path is set:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "unix_domain_socket"
    type = "tcp"
    remotePort = 6000
    [proxies.plugin]
    type = "unix_domain_socket"
    # Unix domain socket path
    unixPath = "/var/run/docker.sock"
    ```

3. **Start frps and frpc**

4. **Use curl to view Docker version information**

   ```bash
   curl http://x.x.x.x:6000/version
   ```