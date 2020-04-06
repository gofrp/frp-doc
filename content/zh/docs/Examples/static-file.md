---
title: "对外提供简单的文件访问服务"
date: 2020-04-05
weight: 6
description: >
  这个示例通过配置 `static_file` 客户端插件来将本地文件暴露在公网上供其他人访问。
---

通过 `static_file` 插件可以对外提供一个简单的基于 HTTP 的文件访问服务。

1. frps.ini 内容如下：

    ```ini
    [common]
    bind_port = 7000
    ```

2. frpc.ini 内容如下：

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [test_static_file]
    type = tcp
    remote_port = 6000
    plugin = static_file
    # 要对外暴露的文件目录
    plugin_local_path = /tmp/file
    # 用户访问 URL 中会被去除的前缀，保留的内容即为要访问的文件路径
    plugin_strip_prefix = static
    plugin_http_user = abc
    plugin_http_passwd = abc
    ```

3. 分别启动 frps 和 frpc。

4. 通过浏览器访问 `http://x.x.x.x:6000/static/` 来查看位于 `/tmp/file` 目录下的文件，会要求输入已设置好的用户名和密码。
