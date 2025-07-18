---
title: "Server Configuration"
weight: 2
description: >
  Detailed configuration description for frp server.
---

### ServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| auth | [AuthServerConfig](#authserverconfig) | Authentication configuration. | No |
| bindAddr | string | Server listening address for receiving frpc connections, default listens on 0.0.0.0. | No |
| bindPort | int | Server listening port, default value is 7000. | No |
| kcpBindPort | int | Server listening port for KCP protocol, used to receive frpc connections configured to use KCP protocol. | No |
| quicBindPort | int | Server listening port for QUIC protocol, used to receive frpc connections configured to use QUIC protocol. | No |
| proxyBindAddr | string | Proxy listening address, can make proxies listen on different network interface addresses, same as bindAddr by default. | No |
| vhostHTTPPort | int | Listening port for HTTP type proxies, must be enabled to support HTTP type proxies. | No |
| vhostHTTPTimeout | int | ResponseHeader timeout for HTTP type proxies on the server side, default is 60s. | No |
| vhostHTTPSPort | int | Listening port for HTTPS type proxies, must be enabled to support HTTPS type proxies. | No |
| tcpmuxHTTPConnectPort | int | Listening port for tcpmux type proxies with httpconnect multiplexer. | No |
| tcpmuxPassthrough | bool | Whether to pass through CONNECT requests for tcpmux type proxies. | No |
| subDomainHost | string | Subdomain suffix. | No |
| custom404Page | string | Custom 404 error page address. | No |
| sshTunnelGateway | [SSHTunnelGateway](#sshtunnelgateway) | SSH tunnel gateway configuration. | No |
| webServer | [WebServerConfig](../common#webserverconfig) | Server Dashboard configuration. | No |
| enablePrometheus | bool | Whether to provide Prometheus monitoring interface, will only take effect when webServer is also enabled. | No |
| log | [LogConfig](../common#logconfig) | Log configuration. | No |
| transport | [ServerTransportConfig](#servertransportconfig) | Network layer configuration. | No |
| detailedErrorsToClient | bool | Server returns detailed error information to client, default is true. | No |
| maxPortsPerClient | int | Limit the maximum number of simultaneous proxies for a single client, default is unlimited. | No |
| userConnTimeout | int | Timeout for waiting for client response after user establishes connection, in seconds, default is 10 seconds. | No |
| udpPacketSize | int | Maximum packet length supported when proxying UDP services, default is 1500. Server and client values need to be consistent. | No |
| natholeAnalysisDataReserveHours | int | Retention time for hole punching strategy data, default is 168 hours, i.e. 7 days. | No |
| allowPorts | [[]PortsRange](../common#portsrange) | Server ports allowed for proxy binding. | No |
| httpPlugins | [[]HTTPPluginOptions](#httppluginoptions) | Server HTTP plugin configuration. | No |

### AuthServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| method | string | Authentication method. Options are token or oidc, default is token. | No |
| additionalScopes | []string | Additional scope for authentication information. Options are HeartBeats and NewWorkConns | No |
| token | string | Effective when method is token. Client needs to set the same value to pass authentication. | No |
| oidc | [AuthOIDCServerConfig](#authoidcserverconfig) | OIDC authentication configuration. | No |

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
| tcpMuxKeepaliveInterval | int | Heartbeat check interval time for tcp mux, in seconds. | No |
| tcpKeepalive | int | Keepalive interval time for underlying TCP connection with client, in seconds. Configure as negative number to disable. | No |
| maxPoolCount | int | Maximum connection pool size allowed for clients. If client configured value is greater than this value, it will be forcibly modified to the maximum value, default is 5. | No |
| heartbeatTimeout | int | Timeout for heartbeat connection between server and client, in seconds, default is 90 seconds. | No |
| quic | [QUICOptions](../common#quicoptions) | QUIC protocol configuration parameters. | No |
| tls | [TLSServerConfig](#tlsserverconfig) | Server TLS protocol configuration. | No |

### TLSServerConfig

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| force | bool | Whether to only accept client connections with TLS enabled. | No |
| | [TLSConfig](../common#tlsconfig) | TLS protocol configuration, embedded structure. | No |

### HTTPPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| name | string | Plugin name. | Yes |
| addr | string | Plugin interface address. | Yes |
| path | string | Plugin interface path. | Yes |
| ops | []string | List of operations that the plugin needs to take effect. For specific optional values, please refer to the server plugin documentation. | Yes |
| tlsVerify | bool | When plugin address is HTTPS protocol, whether to verify the plugin's TLS certificate, default is not to verify. | No |

### SSHTunnelGateway

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| bindPort | int | SSH server listening port. | YES |
| privateKeyFile | string | SSH server private key file path. If empty, frps will read the private key file under autoGenPrivateKeyPath. | No |
| autoGenPrivateKeyPath | string | Private key file automatic generation path, default is ./.autogen_ssh_key. If the file does not exist or is empty, frps will automatically generate an RSA private key file and store it at this path. | No |
| authorizedKeysFile | string | SSH client authorized key file path. If empty, SSH client authentication will not be performed. Non-empty can implement SSH passwordless login authentication. | No |