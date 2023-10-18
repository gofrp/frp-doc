---
title: "通信安全及优化"
weight: 1
---

## 加密与压缩

**注: 当 frpc 和 frps 之间启用了 TLS 之后，流量会被全局加密，不再需要配置单个代理上的加密，新版本中已经默认启用。**

每一个代理都可以选择是否启用加密和压缩的功能。

加密算法采用 aes-128-cfb，压缩算法采用 snappy。

在每一个代理的配置中使用如下参数指定：

```toml
[[proxies]]
name = "ssh"
type = "tcp"
localPort = 22
remotePort = 6000
transport.useEncryption = true
transport.useCompression = true
```

通过设置 `transport.useEncryption = true`，将 frpc 与 frps 之间的通信内容加密传输，将会有效防止传输内容被截取。

如果传输的报文长度较长，通过设置 `transport.useCompression = true` 对传输内容进行压缩，可以有效减小 frpc 与 frps 之间的网络流量，加快流量转发速度，但是会额外消耗一些 CPU 资源。

## TCP 多路复用

客户端和服务器端之间的连接支持多路复用，不再需要为每一个用户请求创建一个连接，使连接建立的延迟降低，并且避免了大量文件描述符的占用，使 frp 可以承载更高的并发数。

该功能默认启用，如需关闭，可以在 frps.toml 和 frpc.toml 中配置，该配置项在服务端和客户端必须一致：

```toml
# frps.toml 和 frpc.toml 中
transport.tcpMux = false
```

## 连接池

默认情况下，当用户请求建立连接后，frps 才会请求 frpc 主动与后端服务建立一个连接。当为指定的代理启用连接池后，frp 会预先和后端服务建立起指定数量的连接，每次接收到用户请求后，会从连接池中取出一个连接和用户连接关联起来，避免了等待与后端服务建立连接以及 frpc 和 frps 之间传递控制信息的时间。

这一功能适合有大量短连接请求时开启。

**注: 当 TCP 多路复用启用后，连接池的提升有限，一般场景下无需关心。**

1. 首先可以在 frps.toml 中设置每个代理可以创建的连接池上限，避免大量资源占用，客户端设置超过此配置后会被调整到当前值：

    ```toml
    # frps.toml
    transport.maxPoolCount = 5
    ```

2. 在 frpc.toml 中为客户端启用连接池，指定预创建连接的数量：

    ```toml
    # frpc.toml
    transport.poolCount = 1
    ```

## 支持 KCP 协议

底层通信协议支持选择 KCP 协议，相比于 TCP，在弱网环境下传输效率提升明显，但是会有一些额外的流量消耗。

开启 KCP 协议支持：

1. 在 frps.toml 中启用 KCP 协议支持，指定一个 UDP 端口用于接收客户端请求：

    ```toml
    # frps.toml
    bindPort = 7000
    # kcp 绑定的是 UDP 端口，可以和 bindPort 一样
    kcpBindPort = 7000
    ```

2. 在 frpc.toml 指定需要使用的协议类型，其他代理配置不需要变更：

    ```toml
    # frpc.toml
    serverAddr = "x.x.x.x"
    # serverPort 指定为 frps 的 kcpBindPort
    serverPort = 7000
    transport.protocol = "kcp"
    ```

## 支持 QUIC 协议

底层通信协议支持选择 QUIC 协议，底层采用 UDP 传输，解决了 TCP 上的一些问题，传输效率更高，连接延迟低。

开启 QUIC 协议支持：

1. 在 frps.toml 中启用 QUIC 协议支持，指定一个 UDP 端口用于接收客户端请求：

    ```toml
    # frps.toml
    bindPort = 7000
    # QUIC 绑定的是 UDP 端口，可以和 bindPort 一样
    quicBindPort = 7000
    ```

2. 在 frpc.toml 指定需要使用的协议类型，其他代理配置不需要变更：

    ```toml
    # frpc.toml
    serverAddr = "x.x.x.x"
    # serverPort 指定为 frps 的 quicBindPort
    serverPort = 7000
    transport.protocol = "quic"
    ```
