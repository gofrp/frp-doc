---
title: "Client Plugin Configuration"
weight: 6
description: >
  Detailed configuration description for frp client plugins.
---

### HTTPProxyPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "http_proxy". | Yes |
| httpUser | string | HTTP proxy username. | No |
| httpPassword | string | HTTP proxy password. | No |

### Socks5PluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "socks5". | Yes |
| username | string | Username. | No |
| password | string | Password. | No |

### StaticFilePluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "static_file". | Yes |
| localPath | string | Local path where static files are located. | Yes |
| stripPrefix | string | Remove specific prefix from user HTTP request Path. | No |
| httpUser | string | HTTP Basic Auth username. | No |
| httpPassword | string | HTTP Basic Auth password. | No |

### UnixDomainSocketPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "unix_domain_socket". | Yes |
| unixPath | string | UNIX domain socket address. | Yes |

### HTTP2HTTPSPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "http2https". | Yes |
| localAddr | string | Local HTTPS service address. | Yes |
| hostHeaderRewrite | string | Replace Host header. | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | Request Header operation configuration. | No |

### HTTPS2HTTPPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "https2http". | Yes |
| localAddr | string | Local HTTPS service address. | Yes |
| hostHeaderRewrite | string | Replace Host header. | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | Request Header operation configuration. | No |
| enableHTTP2 | bool | Whether to enable HTTP/2, enabled by default. | No |
| crtPath | string | TLS certificate file path. | No |
| keyPath | string | TLS key file path. | No |

### HTTPS2HTTPSPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "https2https". | Yes |
| localAddr | string | Local HTTPS service address. | Yes |
| hostHeaderRewrite | string | Replace Host header. | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | Request Header operation configuration. | No |
| enableHTTP2 | bool | Whether to enable HTTP/2, enabled by default. | No |
| crtPath | string | TLS certificate file path. | No |
| keyPath | string | TLS key file path. | No |

### TLS2RawPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "tls2raw". | Yes |
| localAddr | string | Local service address. | Yes |
| crtPath | string | TLS certificate file path. | No |
| keyPath | string | TLS key file path. | No |

### VirtualNetPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "virtual_net". | Yes |