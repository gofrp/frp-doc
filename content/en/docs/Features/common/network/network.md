---
title: "Communication Security and Optimization"
weight: 1
---

## Encryption and Compression

**Note: When TLS is enabled between frpc and frps, traffic will be globally encrypted, and encryption on individual proxies is no longer needed. This is enabled by default in newer versions.**

Each proxy can choose whether to enable encryption and compression features.

The encryption algorithm uses aes-128-cfb, and the compression algorithm uses snappy.

Specify in each proxy's configuration using the following parameters:

```toml
[[proxies]]
name = "ssh"
type = "tcp"
localPort = 22
remotePort = 6000
transport.useEncryption = true
transport.useCompression = true
```

By setting `transport.useEncryption = true`, the communication content between frpc and frps will be encrypted during transmission, effectively preventing transmission content from being intercepted.

If the transmitted packet length is long, setting `transport.useCompression = true` to compress the transmission content can effectively reduce network traffic between frpc and frps, speed up traffic forwarding, but will consume some additional CPU resources.

## TCP Multiplexing

The connection between client and server supports multiplexing, no longer requiring a connection to be created for each user request, reducing connection establishment latency and avoiding occupying large numbers of file descriptors, allowing frp to handle higher concurrency.

This feature is enabled by default. To disable it, configure in both frps.toml and frpc.toml. This configuration must be consistent between server and client:

```toml
# In both frps.toml and frpc.toml
transport.tcpMux = false
```

## Connection Pool

By default, frps will only request frpc to actively establish a connection with the backend service after a user request establishes a connection. When connection pooling is enabled for a specified proxy, frp will pre-establish a specified number of connections with the backend service. Each time a user request is received, a connection will be taken from the connection pool and associated with the user connection, avoiding the time of waiting to establish a connection with the backend service and passing control information between frpc and frps.

This feature is suitable for scenarios with a large number of short connections.

**Note: When TCP multiplexing is enabled, the improvement from connection pooling is limited and generally not needed in common scenarios.**

1. First, you can set the upper limit of connection pools that each proxy can create in frps.toml to avoid occupying large amounts of resources. Client settings exceeding this configuration will be adjusted to the current value:

    ```toml
    # frps.toml
    transport.maxPoolCount = 5
    ```

2. Enable connection pooling for the client in frpc.toml, specifying the number of pre-created connections:

    ```toml
    # frpc.toml
    transport.poolCount = 1
    ```

## KCP Protocol Support

The underlying communication protocol supports selecting KCP protocol. Compared to TCP, transmission efficiency is significantly improved in weak network environments, but there will be some additional traffic consumption.

Enable KCP protocol support:

1. Enable KCP protocol support in frps.toml, specifying a UDP port for receiving client requests:

    ```toml
    # frps.toml
    bindPort = 7000
    # kcp binds to UDP port, can be the same as bindPort
    kcpBindPort = 7000
    ```

2. Specify the protocol type to use in frpc.toml, other proxy configurations don't need to change:

    ```toml
    # frpc.toml
    serverAddr = "x.x.x.x"
    # serverPort specifies frps's kcpBindPort
    serverPort = 7000
    transport.protocol = "kcp"
    ```

## QUIC Protocol Support

The underlying communication protocol supports selecting QUIC protocol, which uses UDP transmission at the bottom layer, solving some problems with TCP, with higher transmission efficiency and lower connection latency.

Enable QUIC protocol support:

1. Enable QUIC protocol support in frps.toml, specifying a UDP port for receiving client requests:

    ```toml
    # frps.toml
    bindPort = 7000
    # QUIC binds to UDP port, can be the same as bindPort
    quicBindPort = 7000
    ```

2. Specify the protocol type to use in frpc.toml, other proxy configurations don't need to change:

    ```toml
    # frpc.toml
    serverAddr = "x.x.x.x"
    # serverPort specifies frps's quicBindPort
    serverPort = 7000
    transport.protocol = "quic"
    ```