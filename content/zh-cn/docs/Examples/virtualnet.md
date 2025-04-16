---
title: "虚拟网络 (VirtualNet)"
weight: 50
description: >
  使用 `virtual_net` 插件创建虚拟网络连接，实现客户端之间的 IP 层通信。
---

> **注意**：VirtualNet 是一个 Alpha 阶段的特性，目前不稳定，其配置方式和功能可能会在后续版本中随时调整变更。请勿在生产环境中使用此功能，仅建议用于测试和评估目的。

### 概述

虚拟网络（VirtualNet）功能是 frp v0.62.0 中引入的 Alpha 特性，它允许 frp 通过 TUN 接口创建和管理客户端与访问者之间的虚拟网络连接，实现设备间的完整网络连通性。

本示例将展示如何配置和使用 VirtualNet 功能。更多详细信息和工作原理，请参考 [虚拟网络 (VirtualNet)](/docs/Features/common/virtualnet) 特性文档。

### 启用 VirtualNet

首先，由于 VirtualNet 目前是一个 Alpha 特性，您需要在配置中通过特性门控来启用它：

```toml
# frpc.toml
featureGates = { VirtualNet = true }
```

### 示例配置

以下示例展示如何在两台机器之间建立虚拟网络连接：

#### 服务端配置 (机器 A)

1. **在 frpc.toml 中配置虚拟网络地址**

    ```toml
    # frpc.toml (服务端)
    serverAddr = "x.x.x.x"
    serverPort = 7000
    featureGates = { VirtualNet = true }

    # 配置虚拟网络接口
    virtualNet.address = "100.86.0.1/24"

    [[proxies]]
    name = "vnet-server"
    type = "stcp"
    secretKey = "your-secret-key"
    [proxies.plugin]
    type = "virtual_net"
    ```

2. **启动 frpc**

    ```bash
    sudo frpc -c frpc.toml
    ```

    注意：创建 TUN 接口需要 root 权限

#### 客户端配置 (机器 B)

1. **在 frpc.toml 中配置访问者**

    ```toml
    # frpc.toml (客户端)
    serverAddr = "x.x.x.x"
    serverPort = 7000
    featureGates = { VirtualNet = true }

    # 配置虚拟网络接口
    virtualNet.address = "100.86.0.2/24"

    [[visitors]]
    name = "vnet-visitor"
    type = "stcp"
    serverName = "vnet-server"
    secretKey = "your-secret-key"
    bindPort = -1
    [visitors.plugin]
    type = "virtual_net"
    destinationIP = "100.86.0.1"
    ```

2. **启动 frpc**

    ```bash
    sudo frpc -c frpc.toml
    ```

### 测试连接

成功配置后，您可以从机器 B 通过虚拟 IP 地址访问机器 A：

```bash
# 在机器 B 上执行
ping 100.86.0.1
```

如果连接正常，您将看到来自 100.86.0.1 的响应。

### 限制和要求

- **Alpha 阶段特性**：VirtualNet 是实验性功能，配置和 API 可能在未来版本中变化，不建议在生产环境中使用
- **权限要求**：创建 TUN 接口需要提升的权限（root/管理员）
- **平台支持**：目前仅支持 Linux 和 macOS
- **默认状态**：作为 Alpha 特性，VirtualNet 默认是禁用的