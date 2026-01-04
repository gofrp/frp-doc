---
title: "Client Configuration"
weight: 3
description: >
  Detailed configuration description for frp client.
---

### ClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| | [ClientCommonConfig](#clientcommonconfig) | Client common configuration. | Yes |
| proxies | [[]ProxyConfig](../proxy) | Proxy configuration. Different proxy types correspond to different configurations, such as [TCPProxyConfig](../proxy#tcpproxyconfig) or [HTTPProxyConfig](../proxy#httpproxyconfig). | No |
| visitors | [[]VisitorConfig](../visitor) | Visitor configuration. Different visitor types correspond to different configurations, such as [STCPVisitorConfig](../visitor#stcpvisitorconfig). | No |

### ClientCommonConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| auth | [AuthClientConfig](#authclientconfig) | Client authentication configuration. | No |
| user | string | Username. After setting this parameter, proxy names will be modified to {user}.{proxyName} to avoid proxy name conflicts with other users. | No |
| serverAddr | string | Address to connect to the server. | No |
| serverPort | int | Port to connect to the server, default is 7000. | No |
| natHoleStunServer | string | STUN server address required for xtcp hole punching, default is stun.easyvoip.com:3478. | No |
| dnsServer | string | DNS server address to use. By default, it uses the system-configured DNS server. Specifying this parameter can force replacement with a custom DNS server address. | No |
| loginFailExit | bool | Whether to exit after first login failure, default is true. | No |
| start | []string | Specify to enable partial proxies. When many proxies are configured but only some of them are desired to be enabled, this parameter can be used to specify them. Default is to enable all. | No |
| log | [LogConfig](../common#logconfig) | Log configuration. | No |
| webServer | [WebServerConfig](../common#webserverconfig) | Client AdminServer configuration. | No |
| transport | [ClientTransportConfig](#clienttransportconfig) | Client network layer configuration. | No |
| virtualNet | [VirtualNetConfig](#virtualnetconfig) | Virtual network configuration, Alpha feature. | No |
| featureGates | map[string]bool | Feature gates, used to enable or disable experimental features. | No |
| udpPacketSize | int | Maximum packet length supported when proxying UDP services, default is 1500. Server and client need to maintain consistent configuration. | No |
| metadatas | map[string]string | Additional metadata that will be passed to server plugins to provide additional capabilities. | No |
| includes | []string | Specify additional configuration file directories where proxy and visitor configurations will be read and loaded. | No |

### ClientTransportConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| protocol | string | Communication protocol with frps. Options are tcp, kcp, quic, websocket, wss. Default is tcp. | No |
| dialServerTimeout | int | Timeout for connecting to the server, default is 10s. | No |
| dialServerKeepalive | int | Keepalive interval time for the underlying TCP connection with the server, in seconds. | No |
| connectServerLocalIP | string | Local IP bound when connecting to the server. | No |
| proxyURL | string | Proxy address used to connect to the server, format: {protocol}://user:passwd@192.168.1.128:8080. Protocol currently supports http, socks5, ntlm. | No |
| poolCount | int | Connection pool size. | No |
| tcpMux | bool | TCP multiplexing, enabled by default. | No |
| tcpMuxKeepaliveInterval | int | Heartbeat check interval time for `tcp_mux`. | No |
| quic | [QUICOptions](../common#quicoptions) | QUIC protocol configuration parameters. | No |
| heartbeatInterval | int | Interval time for sending heartbeat packets to the server, default is 30s. It is recommended to enable `tcp_mux_keepalive_interval` and set this value to -1. | No |
| heartbeatTimeout | int | Timeout for heartbeat with the server, default is 90s. | No |
| tls | [TLSClientConfig](#tlsclientconfig) | Client TLS protocol configuration. | No |

### TLSClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| enable | bool | Whether to enable TLS connection with the server, enabled by default. | No |
| disableCustomTLSFirstByte | bool | When TLS connection is enabled, do not send the 0x17 special byte. Default is true. When configured as true, it cannot be reused with vhostHTTPSPort port. | No |
| | [TLSConfig](../common#tlsconfig) | TLS protocol configuration, embedded structure. | No |

### AuthClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| method | string | Authentication method. Options are token or oidc, default is token. | No |
| additionalScopes | []string | Additional scope for authentication information. Options are HeartBeats and NewWorkConns | No |
| token | string | Effective when method is token. Client needs to set the same value to pass authentication. Mutually exclusive with tokenSource field. | No |
| tokenSource | [ValueSource](../common#valuesource) | Configuration for loading token from file. Mutually exclusive with token field. | No |
| oidc | [AuthOIDCClientConfig](#authoidcclientconfig) | OIDC authentication configuration. | No |

### AuthOIDCClientConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| clientID | string | OIDC client ID. | No |
| clientSecret | string | OIDC client secret. | No |
| audience | string | OIDC audience parameter. | No |
| scope | string | OIDC scope parameter. | No |
| tokenEndpointURL | string | OIDC token endpoint URL. | No |
| additionalEndpointParams | map[string]string | Additional endpoint parameters. | No |
| trustedCaFile | string | Trusted CA certificate file path for verifying OIDC server TLS certificate. | No |
| insecureSkipVerify | bool | Skip TLS certificate verification, not recommended for production use. | No |
| proxyURL | string | Proxy server URL to use when accessing OIDC token endpoint. | No |
| tokenSource | [ValueSource](../common#valuesource) | Configuration for dynamically obtaining OIDC token from external source. When configured, other OIDC configuration fields will be ignored. | No |

### VirtualNetConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| address | string | IP address and network segment of the virtual network interface, format is CIDR (e.g. "100.86.0.1/24"). | Yes |