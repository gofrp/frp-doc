---
title: "对外提供简单的文件访问服务"
weight: 30
description: >
  通过配置 `static_file` 客户端插件，您可以将本地文件暴露在公网上，以供其他人访问。
---

通过使用 `static_file` 插件，您可以轻松地提供一个基于 HTTP 的文件访问服务，让其他人可以访问您指定的文件。

### 步骤

1. **配置 frps.toml**

   在 frps.toml 文件中添加以下内容：

    ```toml
    bindPort = 7000
    ```

2. **配置 frpc.toml**

   在 frpc.toml 文件中添加以下内容，确保设置合适的文件路径、用户名和密码：

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "test_static_file"
    type = "tcp"
    remotePort = 6000
    [proxies.plugin]
    type = "static_file"
    # 本地文件目录，对外提供访问
    localPath = "/tmp/file"
    # URL 中的前缀，将被去除，保留的内容即为要访问的文件路径
    stripPrefix = "static"
    httpUser = "abc"
    httpPassword = "abc"
    ```

    请根据实际情况修改 `localPath`、`stripPrefix`、`httpUser` 和 `httpPassword`。

3. **启动 frps 和 frpc**

4. **通过浏览器访问文件**

    使用浏览器访问 `http://x.x.x.x:6000/static/`，以查看位于 `/tmp/file` 目录下的文件。系统会要求输入您设置的用户名和密码。
