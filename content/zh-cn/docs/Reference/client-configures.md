---
title: "客户端配置"
weight: 3
description: >
  frp 客户端的详细配置说明。
---

### ClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ClientCommonConfig](#clientcommonconfig) | 客户端通用配置。 | Yes |
| proxies | [[]ProxyConfig](../proxy) | 代理配置，不同的代理类型对应不同的配置，例如 [TCPProxyConfig](../proxy#tcpproxyconfig) 或 [HTTPProxyConfig](../proxy#httpproxyconfig)。 | No |
| visitors | [[]VisitorConfig](../visitor) | 访问者配置，不同的访问者类型对应不同的配置，例如 [STCPVisitorConfig](../visitor#stcpvisitorconfig)。 | No |

### ClientCommonConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| auth | [AuthClientConfig](#authclientconfig) | 客户端鉴权配置。 | No |
| user | string | 用户名，设置此参数后，代理名称会被修改为 {user}.{proxyName}，避免代理名称和其他用户冲突。 | No |
| serverAddr | string | 连接服务端的地址。 | No |
| serverPort | int | 连接服务端的端口，默认为 7000。 | No |
| natHoleStunServer | string | xtcp 打洞所需的 stun 服务器地址，默认为 stun.easyvoip.com:3478。 | No |
| dnsServer | string | 使用 DNS 服务器地址，默认使用系统配置的 DNS 服务器，指定此参数可以强制替换为自定义的 DNS 服务器地址。 | No |
| loginFailExit | bool | 第一次登陆失败后是否退出，默认为 true。 | No |
| start | []string | 指定启用部分代理，当配置了较多代理，但是只希望启用其中部分时可以通过此参数指定，默认为全部启用。 | No |
| log | [LogConfig](../common#logconfig) | 日志配置。 | No |
| webServer | [WebServerConfig](../common#webserverconfig) | 客户端 AdminServer 配置。 | No |
| transport | [ClientTransportConfig](#clienttransportconfig) | 客户端网络层配置。 | No |
| udpPacketSize | int | 代理 UDP 服务时支持的最大包长度，默认为 1500，服务端和客户端需要保持配置一致。 | No |
| metadatas | map[string]string | 附加元数据，会传递给服务端插件，提供附加能力。 | No |
| includes | []string | 指定额外的配置文件目录，其中的 proxy 和 visitor 配置会被读取加载。 | No |

### ClientTransportConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| protocol | string | 和 frps 之间的通信协议，可选值为 tcp, kcp, quic, websocket, wss。默认为 tcp。 | No |
| dialServerTimeout | int | 连接服务端的超时时间，默认为 10s。 | No |
| dialServerKeepalive | int | 和服务端底层 TCP 连接的 keepalive 间隔时间，单位秒。 | No |
| connectServerLocalIP | string | 连接服务端时所绑定的本地 IP。 | No |
| proxyURL | string | 连接服务端使用的代理地址，格式为 {protocol}://user:passwd@192.168.1.128:8080 protocol 目前支持 http、socks5、ntlm。 | No |
| poolCount | int | 连接池大小。 | No |
| tcpMux | bool | TCP 多路复用，默认启用。 | No |
| tcpMuxKeepaliveInterval | int | `tcp_mux` 的心跳检查间隔时间。 | No |
| quic | [QUICOptions](../common#quicoptions) | QUIC 协议配置参数。 | No |
| heartbeatInterval | int | 向服务端发送心跳包的间隔时间，默认为 30s。建议启用 `tcp_mux_keepalive_interval`，将此值设置为 -1。 | No |
| heartbeatTimeout | int | 和服务端心跳的超时时间，默认为 90s。 | No |
| tls | [TLSClientConfig](#tlsclientconfig) | 客户端 TLS 协议配置。 | No |

### TLSClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| enable | bool | 是否和服务端之间启用 TLS 连接，默认启用。 | No |
| disableCustomTLSFirstByte | bool | 启用 TLS 连接时，不发送 0x17 特殊字节。默认为 true。当配置为 true 时，无法和 vhostHTTPSPort 端口复用。 | No |
| | [TLSConfig](../common#tlsconfig) | TLS 协议配置，内嵌结构。 | No |

### AuthClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| method | string | 鉴权方式，可选值为 token 或 oidc，默认为 token。 | No |
| additionalScopes | []string | 鉴权信息附加范围，可选值为 HeartBeats 和 NewWorkConns | No |
| token | string | 在 method 为 token 时生效，客户端需要设置一样的值才能鉴权通过。 | No |
| oidc | [AuthOIDCClientConfig](#authoidcclientconfig) | oidc 鉴权配置。| No |

### AuthOIDCClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| clientID | string | | No |
| clientSecret | string | | No |
| audience | string | | No |
| scope | string | | No |
| tokenEndpointURL | string | | No |
| additionalEndpointParams | map[string]string | | No |
