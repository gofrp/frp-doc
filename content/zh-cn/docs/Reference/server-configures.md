---
title: "服务端配置"
weight: 2
description: >
  frp 服务端详细配置说明。
---

### ServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| auth | [AuthServerConfig](#authserverconfig) | 鉴权配置。 | No |
| bindAddr | string | 服务端监听地址，用于接收 frpc 的连接，默认监听 0.0.0.0。| No |
| bindPort | int | 服务端监听端口，默认值为 7000。| No |
| kcpBindPort | int | 服务端监听 KCP 协议端口，用于接收配置了使用 KCP 协议的 frpc 连接。| No |
| quicBindPort | int | 服务端监听 QUIC 协议端口，用于接收配置了使用 QUIC 协议的 frpc 连接。| No |
| proxyBindAddr | string | 代理监听地址，可以使代理监听在不同的网卡地址，默认情况下同 bindAddr。| No |
| vhostHTTPPort | int | HTTP 类型代理监听的端口，启用后才能支持 HTTP 类型的代理。 | No |
| vhostHTTPTimeout | int | HTTP 类型代理在服务端的 ResponseHeader 超时时间，默认为 60s。| No |
| vhostHTTPSPort | int | HTTPS 类型代理监听的端口，启用后才能支持 HTTPS 类型的代理。 | No |
| tcpmuxHTTPConnectPort | int | tcpmux 类型且复用器为 httpconnect 的代理监听的端口。 | No |
| tcpmuxPassthrough | bool | 对于 tcpmux 类型的代理是否透传 CONNECT 请求。| No |
| subDomainHost | string | 二级域名后缀。 | No |
| custom404Page | string | 自定义 404 错误页面地址。 | No |
| sshTunnelGateway| [SSHTunnelGateway](#sshtunnelgateway) | ssh 隧道网关配置。 | No |
| webServer | [WebServerConfig](../common#webserverconfig) | 服务端 Dashboard 配置。 | No |
| enablePrometheus | bool | 是否提供 Prometheus 监控接口，需要同时启用了 webServer 后才会生效。 | No |
| log | [LogConfig](../common#logconfig) | 日志配置。 | No |
| transport | [ServerTransportConfig](#servertransportconfig) | 网络层配置。 | No |
| detailedErrorsToClient | bool | 服务端返回详细错误信息给客户端，默认为 true。 | No |
| maxPortsPerClient | int | 限制单个客户端最大同时存在的代理数，默认无限制。 | No |
| userConnTimeout | int | 用户建立连接后等待客户端响应的超时时间，单位秒，默认为 10 秒。 | No |
| udpPacketSize | int | 代理 UDP 服务时支持的最大包长度，默认为 1500，服务端和客户端的值需要一致。 | No |
| natholeAnalysisDataReserveHours | int | 打洞策略数据的保留时间，默认为 168 小时，即 7 天。 | No |
| allowPorts | [[]PortsRange](../common#portsrange) | 允许代理绑定的服务端端口。 | No |
| httpPlugins | [[]HTTPPluginOptions](#httppluginoptions) | 服务端 HTTP 插件配置。 | No |

### AuthServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| method | string | 鉴权方式，可选值为 token 或 oidc，默认为 token。 | No |
| additionalScopes | []string | 鉴权信息附加范围，可选值为 HeartBeats 和 NewWorkConns | No |
| token | string | 在 method 为 token 时生效，客户端需要设置一样的值才能鉴权通过。 | No |
| oidc | [AuthOIDCServerConfig](#authoidcserverconfig) | oidc 鉴权配置。| No |

### AuthOIDCServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| issuer | string | | No |
| audience | string | | No |
| skipExpiryCheck | bool | | No |
| skipIssuerCheck | bool | | No |

### ServerTransportConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| tcpMuxKeepaliveInterval | int | tcp mux 的心跳检查间隔时间，单位秒。 | No |
| tcpKeepalive | int | 和客户端底层 TCP 连接的 keepalive 间隔时间，单位秒，配置为负数表示不启用。 | No |
| maxPoolCount | int | 允许客户端设置的最大连接池大小，如果客户端配置的值大于此值，会被强制修改为最大值，默认为 5。 | No |
| heartbeatTimeout | int | 服务端和客户端心跳连接的超时时间，单位秒，默认为 90 秒。 | No |
| quic | [QUICOptions](../common#quicoptions) | QUIC 协议配置参数。 | No |
| tls | [TLSServerConfig](#tlsserverconfig) | 服务端 TLS 协议配置。 | No |

### TLSServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| force | bool | 是否只接受启用了 TLS 的客户端连接。 | No |
| | [TLSConfig](../common#tlsconfig) | TLS 协议配置，内嵌结构。 | No |

### HTTPPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | 插件名称。 | Yes |
| addr | string | 插件接口的地址。 | Yes |
| path | string | 插件接口的 Path。 | Yes |
| ops | []string | 插件需要生效的操作列表，具体可选值请参考服务端插件的说明文档。 | Yes |
| tlsVerify | bool | 当插件地址为 HTTPS 协议时，是否校验插件的 TLS 证书，默认为不校验。 | No |

### SSHTunnelGateway

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| bindPort| int | SSH 服务器监听端口。| YES |
| privateKeyFile | string | SSH 服务器私钥文件路径。若为空，frps将读取autoGenPrivateKeyPath路径下的私钥文件。| No |
| autoGenPrivateKeyPath  | string |私钥文件自动生成路径，默认为./.autogen_ssh_key。若文件不存在或内容为空，frps将自动生成RSA私钥文件并存储到该路径。|No|
| authorizedKeysFile  | string |SSH 客户端授权密钥文件路径。若为空，则不进行SSH客户端鉴权认证。非空可实现SSH免密登录认证。| No |
