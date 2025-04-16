---
title: "虚拟网络 (VirtualNet)"
weight: 140
---

*Alpha feature, added in v0.62.0*

> **注意**：VirtualNet 是一个 Alpha 阶段的特性，目前不稳定，其配置方式和功能可能会在后续版本中随时调整变更。请勿在生产环境中使用此功能，仅建议用于测试和评估目的。

## 概述

虚拟网络（VirtualNet）功能允许 frp 通过 TUN 接口创建和管理客户端之间的虚拟网络连接。这一功能将 frp 的能力扩展到了传统端口转发之外，实现了完整的网络层通信。

通过 VirtualNet 功能，你可以：

- 在不同客户端之间建立 IP 层级的网络连接，不需要为每个服务单独配置端口转发
- 使应用程序无需感知 frp 的存在，直接通过 IP 访问远程服务
- 建立类似 VPN 的连接，但由 frp 负责管理

## 使用要求

使用 VirtualNet 功能需要满足以下条件：

- **权限要求**：创建 TUN 接口需要 root/管理员权限
- **平台支持**：目前仅支持 Linux 和 macOS 平台
- **特性门控**：需要通过配置 `featureGates = { VirtualNet = true }` 显式启用
- **地址分配**：每个端点必须配置唯一的 IP 地址/CIDR

## 配置方法

### 启用 VirtualNet

由于 VirtualNet 是 Alpha 特性，需要在配置中显式启用：

```toml
# frpc.toml
featureGates = { VirtualNet = true }
```

### 服务端配置

首先，为 frpc 配置虚拟网络地址：

```toml
# frpc.toml (服务端)
serverAddr = "x.x.x.x"
serverPort = 7000
featureGates = { VirtualNet = true }

# 配置虚拟网络接口
virtualNet.address = "100.86.0.1/24"
```

然后，为代理配置 `virtual_net` 插件：

```toml
# frpc.toml (服务端)
[[proxies]]
name = "vnet-server"
type = "stcp"
secretKey = "your-secret-key"
[proxies.plugin]
type = "virtual_net"
```

### 客户端配置

客户端需要配置访问者插件以连接到虚拟网络：

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
destinationIP = "100.86.0.1"  # 目标虚拟 IP 地址
```

## 工作原理

VirtualNet 功能基于以下技术实现：

1. **TUN 虚拟接口**：在每个 frp 客户端创建一个 TUN 虚拟网络接口
2. **路由控制**：通过 VNet 控制器管理客户端间的路由表
3. **数据包转发**：在 frp 隧道内部封装和转发 IP 数据包

工作流程如下：

1. frp 创建 TUN 接口并分配 IP 地址
2. 服务端使用 `virtual_net` 插件注册连接到 VNet 控制器
3. 客户端使用 `virtual_net` 访问者插件将目标 IP 的流量路由到对应连接
4. 数据包在 frp 管理的虚拟网络中传输，实现不同机器之间的 IP 层连通性