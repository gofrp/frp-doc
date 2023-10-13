---
title: "转发 Unix 域套接字"
weight: 25
description: >
  通过配置 Unix 域套接字客户端插件，您可以使用 TCP 端口访问内网的 Unix 域套接字服务，例如 Docker Daemon。
---

### 步骤

1. **配置 frps.toml**

   在 frps.toml 文件中添加以下内容：

    ```toml
    bindPort = 7000
    ```

2. **配置 frpc.toml**

   在 frpc.toml 文件中添加以下内容，确保设置正确的 Unix 域套接字路径：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "unix_domain_socket"
    type = "tcp"
    remotePort = 6000
    [proxies.plugin]
    type = "unix_domain_socket"
    # Unix 域套接字路径
    unixPath = "/var/run/docker.sock"
    ```

3. **启动 frps 和 frpc**

4. **使用 curl 查看 Docker 版本信息**

   ```bash
   curl http://x.x.x.x:6000/version
   ```
