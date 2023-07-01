---
title: "多个 SSH 服务复用同一端口"
weight: 10
description: >
  这个示例通过 tcpmux 类型的代理，实现多个 ssh 服务通过同一个端口暴露。与此类似，只要是能够支持 HTTP Connect 代理连接方式的客户端，都可以通过这种方式来实现对端口的复用。
---

1. 在具有公网 IP 的机器上部署 frps，修改 frps.ini 文件，这里使用了最简化的配置:

    ```ini
    [common]
    bind_port = 7000
    tcpmux_httpconnect_port = 5002
    ```

2. 在内网机器 A 上部署 frpc，配置文件:

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [ssh1]
    type = tcpmux
    multiplexer = httpconnect
    custom_domains = machine-a.example.com
    local_ip = 127.0.0.1
    local_port = 22
    ```

3. 在内网机器 B 上部署另一个 frpc，配置文件:

    ```ini
    [common]
    server_addr = x.x.x.x
    server_port = 7000

    [ssh2]
    type = tcpmux
    multiplexer = httpconnect
    custom_domains = machine-b.example.com
    local_ip = 127.0.0.1
    local_port = 22
    ```

4. 通过 SSH ProxyCommand 访问内网机器 A，假设用户名为 test:

    `ssh -o 'proxycommand socat - PROXY:x.x.x.x:machine-a.example.com:22,proxyport=5002' test@machine-a`

   访问内网机器 B，区别只在于域名不同，假设用户名为 test:

    `ssh -o 'proxycommand socat - PROXY:x.x.x.x:machine-b.example.com:22,proxyport=5002' test@machine-b`
