---
title: "Virtual Network (VirtualNet)"
weight: 50
description: >
  Use the `virtual_net` plugin to create virtual network connections, enabling IP-layer communication between clients.
---

> **Note**: VirtualNet is an Alpha-stage feature that is currently unstable. Its configuration methods and functionality may change at any time in future versions. Please do not use this feature in production environments; it is only recommended for testing and evaluation purposes.

### Overview

Virtual Network (VirtualNet) functionality is an Alpha feature introduced in frp v0.62.0, which allows frp to create and manage virtual network connections between clients and visitors through TUN interfaces, enabling complete network connectivity between devices.

This example will show how to configure and use the VirtualNet feature. For more detailed information and working principles, please refer to the [Virtual Network (VirtualNet)](/docs/Features/common/virtualnet) feature documentation.

### Enable VirtualNet

First, since VirtualNet is currently an Alpha feature, you need to enable it through feature gates in the configuration:

```toml
# frpc.toml
featureGates = { VirtualNet = true }
```

### Example Configuration

The following example shows how to establish a virtual network connection between two machines:

#### Server Configuration (Machine A)

1. **Configure virtual network address in frpc.toml**

    ```toml
    # frpc.toml (server)
    serverAddr = "x.x.x.x"
    serverPort = 7000
    featureGates = { VirtualNet = true }

    # Configure virtual network interface
    virtualNet.address = "100.86.0.1/24"

    [[proxies]]
    name = "vnet-server"
    type = "stcp"
    secretKey = "your-secret-key"
    [proxies.plugin]
    type = "virtual_net"
    ```

2. **Start frpc**

    ```bash
    sudo frpc -c frpc.toml
    ```

    Note: Creating TUN interfaces requires root privileges

#### Client Configuration (Machine B)

1. **Configure visitor in frpc.toml**

    ```toml
    # frpc.toml (client)
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
    destinationIP = "100.86.0.1"
    ```

2. **Start frpc**

    ```bash
    sudo frpc -c frpc.toml
    ```

### Test Connection

After successful configuration, you can access machine A from machine B through the virtual IP address:

```bash
# Execute on machine B
ping 100.86.0.1
```

If the connection is normal, you will see responses from 100.86.0.1.

### Limitations and Requirements

- **Alpha-stage feature**: VirtualNet is experimental functionality, configuration and API may change in future versions, not recommended for production use
- **Permission requirements**: Creating TUN interfaces requires elevated privileges (root/administrator)
- **Platform support**: Currently only supports Linux and macOS
- **Default state**: As an Alpha feature, VirtualNet is disabled by default