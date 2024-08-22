---
title: "客户端插件配置"
weight: 6
description: >
  frp 客户端插件的详细配置说明。
---

### HTTPProxyPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| httpUser | string | HTTP 代理用户名。 | No |
| httpPassword | string | HTTP 代理密码。 | No |

### Socks5PluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| username | string | 用户名。 | No |
| password | string | 密码。 | No |

### StaticFilePluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localPath | string | 静态文件所在本地路径。 | Yes |
| stripPrefix | string | 去除用户 HTTP 请求 Path 的特定前缀。 | No |
| httpUser | string | HTTP Basic Auth 用户名。 | No |
| httpPassword | string | HTTP Basic Auth 密码。 | No |

### UnixDomainSocketPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| unixPath | string | UNIX 域套接字的地址。 | Yes |

### HTTP2HTTPSPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localAddr | string | 本地 HTTPS 服务地址。 | Yes |
| hostHeaderRewrite | string | 替换 Host header。 | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | 对请求 Header 的操作配置。 | No |

### HTTPS2HTTPPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localAddr | string | 本地 HTTPS 服务地址。 | Yes |
| hostHeaderRewrite | string | 替换 Host header。 | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | 对请求 Header 的操作配置。 | No |
| enableHTTP2 | bool | 是否启用 HTTP/2，默认启用。 | No |
| crtPath | string | TLS 证书文件路径。 | No |
| keyPath | string | TLS 密钥文件路径。 | No |

### HTTPS2HTTPSPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localAddr | string | 本地 HTTPS 服务地址。 | Yes |
| hostHeaderRewrite | string | 替换 Host header。 | No |
| requestHeaders | [HeaderOperations](../common#headeroperations) | 对请求 Header 的操作配置。 | No |
| enableHTTP2 | bool | 是否启用 HTTP/2，默认启用。 | No |
| crtPath | string | TLS 证书文件路径。 | No |
| keyPath | string | TLS 密钥文件路径。 | No |

### TLS2RawPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| localAddr | string | 本地服务地址。 | Yes |
| crtPath | string | TLS 证书文件路径。 | No |
| keyPath | string | TLS 密钥文件路径。 | No |
