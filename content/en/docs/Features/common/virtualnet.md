---
title: "Virtual Network (VirtualNet)"
weight: 140
---

*Alpha feature, added in v0.62.0*

> **Note**: VirtualNet is an Alpha stage feature that is currently unstable. Its configuration methods and functionality may change at any time in future versions. Please do not use this feature in production environments; it is only recommended for testing and evaluation purposes.

## Overview

The Virtual Network (VirtualNet) feature allows frp to create and manage virtual network connections between clients through TUN interfaces. This feature extends frp's capabilities beyond traditional port forwarding to achieve complete network layer communication.

With VirtualNet functionality, you can:

- Establish IP-level network connections between different clients without needing to configure port forwarding for each service individually
- Enable applications to access remote services directly via IP without being aware of frp's existence
- Create VPN-like connections managed by frp

## Usage Requirements

Using VirtualNet functionality requires meeting the following conditions:

- **Permission Requirements**: Creating TUN interfaces requires root/administrator privileges
- **Platform Support**: Currently only supports Linux and macOS platforms
- **Feature Gates**: Must be explicitly enabled by configuring `featureGates = { VirtualNet = true }`
- **Address Allocation**: Each endpoint must be configured with a unique IP address/CIDR

## Configuration Method

### Enable VirtualNet

Since VirtualNet is an Alpha feature, it needs to be explicitly enabled in the configuration:

```toml
# frpc.toml
featureGates = { VirtualNet = true }
```

### Server Configuration

First, configure the virtual network address for frpc:

```toml
# frpc.toml (server side)
serverAddr = "x.x.x.x"
serverPort = 7000
featureGates = { VirtualNet = true }

# Configure virtual network interface
virtualNet.address = "100.86.0.1/24"
```

Then, configure the `virtual_net` plugin for the proxy:

```toml
# frpc.toml (server side)
[[proxies]]
name = "vnet-server"
type = "stcp"
secretKey = "your-secret-key"
[proxies.plugin]
type = "virtual_net"
```

### Client Configuration

The client needs to configure a visitor plugin to connect to the virtual network:

```toml
# frpc.toml (client side)
serverAddr = "x.x.x.x"
serverPort = 7000
featureGates = { VirtualNet = true }

# Configure virtual network interface
virtualNet.address = "100.86.0.2/24"

[[visitors]]
name = "vnet-visitor"
type = "stcp"
serverName = "vnet-server"
secretKey = "your-secret-key"
bindPort = -1
[visitors.plugin]
type = "virtual_net"
destinationIP = "100.86.0.1"  # Target virtual IP address
```

## Working Principle

VirtualNet functionality is implemented based on the following technologies:

1. **TUN Virtual Interface**: Creates a TUN virtual network interface on each frp client
2. **Route Control**: Manages routing tables between clients through the VNet controller
3. **Packet Forwarding**: Encapsulates and forwards IP packets within frp tunnels

The workflow is as follows:

1. frp creates TUN interface and assigns IP addresses
2. Server registers connection to VNet controller using `virtual_net` plugin
3. Client uses `virtual_net` visitor plugin to route traffic for target IP to corresponding connection
4. Data packets are transmitted in the virtual network managed by frp, achieving IP layer connectivity between different machines