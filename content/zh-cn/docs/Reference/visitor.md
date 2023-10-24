---
title: "访问者配置"
weight: 5
description: >
  frp 访问者的详细配置说明。
---

### VisitorBaseConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | 访问者名称。 | Yes |
| type | string | 访问者类型，可选值为 stcp, sudp, xtcp。 | Yes |
| transport | [VisitorTransport](#visitortransport) | 访问者网络层配置。 | No |
| secretKey | string | 密钥，服务端和访问端的密钥需要一致，访问端才能访问到服务端。 | No |
| serverUser | string | 要访问的 proxy 所属的用户名，如果为空，则默认为当前用户。 | No |
| serverName | string | 要访问的 proxy 名称。 | Yes |
| bindAddr | string | visitor 监听的本地地址，通过访问监听的地址和端口，连接到远端代理的服务。 | No |
| bindPort | int | visitor 监听的本地端口，如果为 -1，表示不需要监听物理端口，通常可以用于作为其他 visitor 的 fallback。 | Yes |

### VisitorTransport

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| useEncryption | bool | 是否启用加密功能，启用后该代理和服务端之间的通信内容都会被加密传输，如果 frpc 启用了全局 TLS，则不需要再启用此参数。 | No |
| useCompression | bool | 是否启用压缩功能，启用后该代理和服务端之间的通信内容都会被压缩传输。 | No |

### STCPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | 基础配置。 | Yes |

### SUDPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | 基础配置。 | Yes |

### XTCPVisitorConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [VisitorBaseConfig](#visitorbaseconfig) | 基础配置。 | Yes |
| protocol | string | 隧道底层通信协议，可选 quic 和 kcp，默认为 quic。 | No |
| keepTunnelOpen | bool | 是否保持隧道打开，如果开启，会定期检查隧道状态并尝试保持打开。 | No | 
| maxRetriesAnHour | int | 每小时尝试打开隧道的次数，默认值为 8。 | No |
| minRetryInterval | int | 重试打开隧道的最小间隔时间，单位: 秒，默认为 90s。 | No |
| fallbackTo | string | 回退到的其他 visitor 名称。 | No |
| fallbackTimeoutMs | int | 连接建立超过多长时间(ms) 后回退到其他 visitor。 | No |
