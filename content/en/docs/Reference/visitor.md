---
title: "Visitor Configuration"
weight: 5
description: >
  Detailed configuration description for frp visitors.
---

### VisitorBaseConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | Visitor name. | Yes |
| type | string | Visitor type. Options are stcp, sudp, xtcp. | Yes |
| transport | [VisitorTransport](#visitortransport) | Visitor network layer configuration. | No |
| secretKey | string | Secret key. The secret key between server and access side must be consistent for the access side to access the server. | No |
| serverUser | string | Username that the proxy to be accessed belongs to. If empty, defaults to current user. | No |
| serverName | string | Name of the proxy to be accessed. | Yes |
| bindAddr | string | Local address that visitor listens on. By accessing the listened address and port, connect to the remote proxy service. | No |
| bindPort | int | Local port that visitor listens on. If set to -1, means no need to listen on physical port, usually can be used as fallback for other visitors. | Yes |
| plugin | [VisitorPluginOptions](../visitor-plugin) | Visitor plugin configuration for extending visitor functionality. Different plugin types correspond to different configurations. | No |

### VisitorTransport

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| useEncryption | bool | Whether to enable encryption functionality. When enabled, communication content between this proxy and the server will be encrypted. If frpc has enabled global TLS, this parameter is not needed. | No |
| useCompression | bool | Whether to enable compression functionality. When enabled, communication content between this proxy and the server will be compressed. | No |

### STCPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | Base configuration. | Yes |

### SUDPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | Base configuration. | Yes |

### XTCPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | Base configuration. | Yes |
| protocol | string | Tunnel underlying communication protocol. Options are quic and kcp, default is quic. | No |
| keepTunnelOpen | bool | Whether to keep tunnel open. If enabled, will periodically check tunnel status and try to keep it open. | No |
| maxRetriesAnHour | int | Number of attempts to open tunnel per hour, default value is 8. | No |
| minRetryInterval | int | Minimum interval time for retrying to open tunnel, in seconds, default is 90s. | No |
| fallbackTo | string | Name of other visitor to fallback to. | No |
| fallbackTimeoutMs | int | Fallback to other visitor after connection establishment exceeds this time (ms). | No |
| natTraversal | [NatTraversalConfig](../common#nattraversalconfig) | NAT traversal configuration. | No |