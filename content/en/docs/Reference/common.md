---
title: "Common Configuration"
weight: 1
description: >
  Common configuration structures.
---

### LogConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| to | string | Log output file path. If set to console, logs will be printed to standard output. | No |
| level | string | Log level. Options are trace, debug, info, warn, error. Default level is info. | No |
| maxDays | int | Maximum days to retain log files, default is 3 days. | No |
| disablePrintColor | bool | Disable log colors in standard output. | No |

### WebServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| addr | string | webServer listening address, default is 127.0.0.1. | No |
| port | int | webServer listening port. | Yes |
| user | string | HTTP BasicAuth username. | No |
| password | string | HTTP BasicAuth password. | No |
| assetsDir | string | Static resource directory. Dashboard resources are packaged in the binary file by default. Use this parameter to specify custom static resources. | No |
| pprofEnable | bool | Enable Go HTTP pprof for application debugging. | No |
| tls | [TLSConfig](#tlsconfig) | TLS related configuration for Dashboard HTTPS. | No |

### TLSConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| certFile | string | TLS certificate file path. | Yes |
| keyFile | string | TLS key file path. | Yes |
| trustedCaFile | string | CA certificate file path. | No |
| serverName | string | TLS Server name. | No |

### QUICOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| keepalivePeriod | int | Default value is 10 seconds. | No |
| maxIdleTimeout | int | Default value is 30 seconds. | No |
| maxIncomingStreams | int | Default value is 100000. | No |

### PortsRange

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| start | int | Starting port. | No |
| end | int | Ending port. | No |
| single | int | Single port. | No |

### HeaderOperations

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| set | map[string]string | Set specified KV values in Header. | No |

### HTTPHeader

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | Header name. | Yes |
| value | string | Header value. | Yes |

### ValueSource

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Data source type, currently only supports "file". | Yes |
| file | [FileSource](#filesource) | File data source configuration, required when type is "file". | No |

### FileSource

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| path | string | File path. | Yes |

### NatTraversalConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| disableAssistedAddrs | bool | Disable assisted connections using local network interface addresses. When enabled, only uses STUN-discovered public addresses for NAT hole punching, avoiding potentially slow local network interfaces (e.g., VPN). Default is false. | No |