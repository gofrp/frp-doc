---
title: "代理配置"
weight: 4
description: >
  frp 代理的详细配置说明。
---

### ProxyBaseConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | 代理名称。 | Yes |
| type | string | 代理类型，可选值为 tcp, udp, http, https, tcpmux, stcp, sudp, xtcp。 | Yes |
| annotations | map[string]string | 代理的注释信息，会被展示在 server 的 dashboard 中。 | No |
| transport | [ProxyTransport](#proxytransport) | 代理网络层配置。 | No |
| metadatas | map[string]string | 附加元数据，会传递给服务端插件，提供附加能力。 | No |
| loadBalancer | [LoadBalancerConfig](#loadbalancerconfig) | 负载均衡配置。 | No |
| healthCheck  | [HealthCheckConfig](#healthcheckconfig) | 健康检查配置。 | No |
| | [ProxyBackend](#proxybackend) | 代理后端服务配置。 | Yes |

### ProxyTransport

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| useEncryption | bool | 是否启用加密功能，启用后该代理和服务端之间的通信内容都会被加密传输，如果 frpc 启用了全局 TLS，则不需要再启用此参数。 | No |
| useCompression | bool | 是否启用压缩功能，启用后该代理和服务端之间的通信内容都会被压缩传输。 | No |
| bandwidthLimit | string | 设置单个 proxy 的带宽限流，单位为 MB 或 KB，0 表示不限制，如果启用，默认会作用于对应的 frpc。 | No |
| bandwidthLimitMode | string | 限流类型，客户端限流或服务端限流，可选值为 client 和 server，默认为客户端限流。 | No |
| proxyProtocolVersion | string | 启用 proxy protocol 协议的版本，可选值为 v1 和 v2。如果启用，则 frpc 和本地服务建立连接后会发送 proxy protocol 的协议，包含了原请求的 IP 地址和端口等内容。 | No |

### ProxyBackend

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localIP | string | 被代理的本地服务 IP，默认为 127.0.0.1。 | No |
| localPort | int | 被代理的本地服务端口。 | No |
| plugin | [ClientPluginOptions](../client-plugin) | 客户端插件配置，如果启用了客户端插件，则不需要配置 localIP 和 localPort，流量会由客户端插件接管。不同的插件类型对应不同的配置，例如 [HTTPProxyPluginOptions](../client-plugin#httpproxypluginoptions)。 | No |

### LoadBalancerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| group | string | 负载均衡分组名称，用户请求会以轮询的方式发送给同一个 group 中的代理。 | Yes |
| groupKey | string | 负载均衡分组密钥，用于对负载均衡分组进行鉴权，groupKey 相同的代理才会被加入到同一个分组中。 | No |

### HealthCheckConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | 健康检查类型，可选值为 tcp 和 http，配置后启用健康检查功能，tcp 是连接成功则认为服务健康，http 要求接口返回 2xx 的状态码则认为服务健康。 | Yes |
| timeoutSeconds | int | 健康检查超时时间(秒)，默认为 3s。 | No |
| maxFailed | int | 健康检查连续错误次数，连续检查错误多少次认为服务不健康，默认为 1。 | No |
| intervalSeconds | int | 健康检查周期(秒)，每隔多长时间进行一次健康检查，默认为 10s。 | No |
| path | string | 健康检查的 HTTP 接口，如果健康检查类型是 http，则需要配置此参数，指定发送 http 请求的 path，例如 `/health`。 | No |
| httpHeaders | [[]HTTPHeader](../common#httpheader) | 健康检查的 HTTP 请求头，仅在健康检查类型是 http 时生效。 | No |

### DomainConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| customDomains | []string | 自定义域名列表。 | No |
| subdomain | string | 子域名。 | No |

### TCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| remotePort | int | 服务端绑定的端口，用户访问服务端此端口的流量会被转发到对应的本地服务。 | No |

### UDPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| remotePort | int | 服务端绑定的端口，用户访问服务端此端口的流量会被转发到对应的本地服务。 | No |

### HTTPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| | [DomainConfig](#domainconfig) | 域名配置。 | Yes |
| locations | []string | URL 路由配置。 | No |
| httpUser | string | HTTP Basic Auth 用户名。 | No |
| httpPassword | string | HTTP Basic Auth 密码。 | No |
| hostHeaderRewrite | string | 替换 Host Header。 | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | 对请求 Header 的操作配置。 | No |
| responseHeaders | [HeaderOperations](../common#headeroperations) | 对响应 Header 的操作配置。 | No |
| routeByHTTPUser | string | 根据 HTTP Basic Auth user 路由。 | No |

### HTTPSProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| | [DomainConfig](#domainconfig) | 域名配置。 | Yes |

### TCPMuxProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| | [DomainConfig](#domainconfig) | 域名配置。 | Yes |
| httpUser | string | 用户名，如果配置此参数，通过 HTTP CONNECT 建立连接时需要通过 Proxy-Authorization 附加上正确的身份信息。 | No |
| httpPassword | string | 密码。 | No |
| routeByHTTPUser | string | 根据 HTTP Basic Auth user 路由。 | No |
| multiplexer | string | 复用器类型，目前仅支持 httpconnect。 | No |

### STCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| secretKey | string | 密钥，服务端和访问端的密钥需要一致，访问端才能访问到服务端。 | No |
| allowUsers | []string | 允许访问的 visitor 用户列表，默认只允许同一用户下的 visitor 访问，配置为 * 则允许任何 visitor 访问。 | No |

### XTCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| secretKey | string | 密钥，服务端和访问端的密钥需要一致，访问端才能访问到服务端。 | No |
| allowUsers | []string | 允许访问的 visitor 用户列表，默认只允许同一用户下的 visitor 访问，配置为 * 则允许任何 visitor 访问。 | No |

### SUDPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | 基础配置。 | Yes |
| secretKey | string | 密钥，服务端和访问端的密钥需要一致，访问端才能访问到服务端。 | No |
| allowUsers | []string | 允许访问的 visitor 用户列表，默认只允许同一用户下的 visitor 访问，配置为 * 则允许任何 visitor 访问。 | No |
