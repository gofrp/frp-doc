---
title: "Provide Simple File Access Service"
weight: 30
description: >
  By configuring the `static_file` client plugin, you can expose local files on the public network for others to access.
---

By using the `static_file` plugin, you can easily provide an HTTP-based file access service that allows others to access your specified files.

### Steps

1. **Configure frps.toml**

   Add the following content to the frps.toml file:

    ```toml
    bindPort = 7000
    ```

2. **Configure frpc.toml**

   Add the following content to the frpc.toml file, ensuring appropriate file paths, username, and password are set:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "test_static_file"
    type = "tcp"
    remotePort = 6000
    [proxies.plugin]
    type = "static_file"
    # Local file directory to provide external access
    localPath = "/tmp/file"
    # Prefix in URL that will be removed, remaining content is the file path to access
    stripPrefix = "static"
    httpUser = "abc"
    httpPassword = "abc"
    ```

    Please modify `localPath`, `stripPrefix`, `httpUser`, and `httpPassword` according to your actual situation.

3. **Start frps and frpc**

4. **Access Files via Browser**

    Use a browser to visit `http://x.x.x.x:6000/static/` to view files located in the `/tmp/file` directory. The system will require you to enter the username and password you set.