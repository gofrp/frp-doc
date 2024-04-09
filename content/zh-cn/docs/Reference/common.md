---
title: "通用配置"
weight: 1
description: >
  通用配置结构。
---

### LogConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| to | string | 日志输出文件路径，如果为 console，则会将日志打印在标准输出中。 | No |
| level | string | 日志级别，可选值为 trace, debug, info, warn, error，默认级别为 info。 | No |
| maxDays | int | 日志文件最多保留天数，默认为 3 天。 | No |
| disablePrintColor | bool | 禁用标准输出中的日志颜色。 | No |

### WebServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| addr | string | webServer 监听地址，默认为 127.0.0.1。 | No |
| port | int | webServer 监听端口。| Yes |
| user | string | HTTP BasicAuth 用户名。| No |
| password | string | HTTP BasicAuth 密码。 | No |
| assetsDir | string | 静态资源目录，Dashboard 使用的资源默认打包在二进制文件中，通过指定此参数使用自定义的静态资源。 | No |
| pprofEnable | bool | 启动 Go HTTP pprof，用于应用调试。 | No |
| tls | [TLSConfig](#tlsconfig) | Dashboard 启用 HTTPS 的 TLS 相关配置。 | No |

### TLSConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| certFile | string | TLS 证书文件路径。 | Yes |
| keyFile | string | TLS 密钥文件路径。 | Yes |
| trustedCaFile | string | CA 证书文件路径。 | No |
| serverName | string | TLS Server 名称。 | No |

### QUICOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| keepalivePeriod | int | 默认值为 10 秒。 | No |
| maxIdleTimeout | int | 默认值为 30 秒。 | No |
| maxIncomingStreams | int | 默认值为 100000。 | No |

### PortsRange

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| start | int | 起始端口。 | No |
| end | int | 终止端口。 | No |
| single | int | 单一端口。 | No |

### HeaderOperations

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| set | map[string]string | 在 Header 中设置指定的 KV 值。 | No |

### HTTPHeader

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | Header 名称。 | Yes |
| value | string | Header 值。 | Yes |
