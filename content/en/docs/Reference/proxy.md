---
title: "Proxy Configuration"
weight: 4
description: >
  Detailed configuration description for frp proxies.
---

### ProxyBaseConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | Proxy name. | Yes |
| type | string | Proxy type. Options are tcp, udp, http, https, tcpmux, stcp, sudp, xtcp. | Yes |
| enabled | *bool | Whether this proxy is enabled, default is true. Set to false to disable this proxy, allowing individual control over each proxy's enabled state. | No |
| annotations | map[string]string | Proxy annotation information that will be displayed in the server's dashboard. | No |
| transport | [ProxyTransport](#proxytransport) | Proxy network layer configuration. | No |
| metadatas | map[string]string | Additional metadata that will be passed to server plugins to provide additional capabilities. | No |
| loadBalancer | [LoadBalancerConfig](#loadbalancerconfig) | Load balancing configuration. | No |
| healthCheck | [HealthCheckConfig](#healthcheckconfig) | Health check configuration. | No |
| | [ProxyBackend](#proxybackend) | Proxy backend service configuration. | Yes |

### ProxyTransport

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| useEncryption | bool | Whether to enable encryption functionality. When enabled, communication content between this proxy and the server will be encrypted. If frpc has enabled global TLS, this parameter is not needed. | No |
| useCompression | bool | Whether to enable compression functionality. When enabled, communication content between this proxy and the server will be compressed. | No |
| bandwidthLimit | string | Set bandwidth rate limiting for a single proxy, in MB or KB units. 0 means no limit. If enabled, it will apply to the corresponding frpc by default. | No |
| bandwidthLimitMode | string | Rate limiting type, client-side or server-side rate limiting. Options are client and server, default is client-side rate limiting. | No |
| proxyProtocolVersion | string | Version of proxy protocol to enable. Options are v1 and v2. If enabled, frpc will send proxy protocol after establishing connection with local service, containing original request IP address and port information. | No |

### ProxyBackend

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localIP | string | IP of the local service being proxied, default is 127.0.0.1. | No |
| localPort | int | Port of the local service being proxied. | No |
| plugin | [ClientPluginOptions](../client-plugin) | Client plugin configuration. If client plugin is enabled, localIP and localPort don't need to be configured, and traffic will be handled by the client plugin. Different plugin types correspond to different configurations, such as [HTTPProxyPluginOptions](../client-plugin#httpproxypluginoptions). | No |

### LoadBalancerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| group | string | Load balancing group name. User requests will be sent to proxies in the same group using round-robin. | Yes |
| groupKey | string | Load balancing group key for authenticating the load balancing group. Only proxies with the same groupKey will be added to the same group. | No |

### HealthCheckConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Health check type. Options are tcp and http. After configuration, health check is enabled. tcp considers service healthy if connection succeeds, http requires interface to return 2xx status codes to consider service healthy. | Yes |
| timeoutSeconds | int | Health check timeout (seconds), default is 3s. | No |
| maxFailed | int | Consecutive health check error count. How many consecutive check errors to consider service unhealthy, default is 1. | No |
| intervalSeconds | int | Health check interval (seconds). How often to perform health checks, default is 10s. | No |
| path | string | Health check HTTP interface. If health check type is http, this parameter needs to be configured to specify the path for sending http requests, such as `/health`. | No |
| httpHeaders | [[]HTTPHeader](../common#httpheader) | Health check HTTP request headers, only effective when health check type is http. | No |

### DomainConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| customDomains | []string | Custom domain list. | No |
| subdomain | string | Subdomain. | No |

### TCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| remotePort | int | Port bound by the server. Traffic accessing this port on the server will be forwarded to the corresponding local service. | No |

### UDPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| remotePort | int | Port bound by the server. Traffic accessing this port on the server will be forwarded to the corresponding local service. | No |

### HTTPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| | [DomainConfig](#domainconfig) | Domain configuration. | Yes |
| locations | []string | URL routing configuration. | No |
| httpUser | string | HTTP Basic Auth username. | No |
| httpPassword | string | HTTP Basic Auth password. | No |
| hostHeaderRewrite | string | Replace Host Header. | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | Request Header operation configuration. | No |
| responseHeaders | [HeaderOperations](../common#headeroperations) | Response Header operation configuration. | No |
| routeByHTTPUser | string | Route by HTTP Basic Auth user. | No |

### HTTPSProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| | [DomainConfig](#domainconfig) | Domain configuration. | Yes |

### TCPMuxProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| | [DomainConfig](#domainconfig) | Domain configuration. | Yes |
| httpUser | string | Username. If this parameter is configured, correct identity information needs to be attached via Proxy-Authorization when establishing connection through HTTP CONNECT. | No |
| httpPassword | string | Password. | No |
| routeByHTTPUser | string | Route by HTTP Basic Auth user. | No |
| multiplexer | string | Multiplexer type, currently only supports httpconnect. | No |

### STCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| secretKey | string | Secret key. The secret key between server and access side must be consistent for the access side to access the server. | No |
| allowUsers | []string | List of visitor users allowed to access. By default, only visitors under the same user are allowed to access. Configure as * to allow any visitor to access. | No |

### XTCPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| secretKey | string | Secret key. The secret key between server and access side must be consistent for the access side to access the server. | No |
| allowUsers | []string | List of visitor users allowed to access. By default, only visitors under the same user are allowed to access. Configure as * to allow any visitor to access. | No |
| natTraversal | [NatTraversalConfig](../common#nattraversalconfig) | NAT traversal configuration. | No |

### SUDPProxyConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ProxyBaseConfig](#proxybaseconfig) | Base configuration. | Yes |
| secretKey | string | Secret key. The secret key between server and access side must be consistent for the access side to access the server. | No |
| allowUsers | []string | List of visitor users allowed to access. By default, only visitors under the same user are allowed to access. Configure as * to allow any visitor to access. | No |