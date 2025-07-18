---
title: "Server Plugin"
weight: 120
---

The purpose of frp server plugins is to extend the capabilities of the frp server without intruding on its own code.

frp server plugins run as separate processes and listen on a port, providing RPC interfaces externally to respond to frps requests.

Before executing certain operations, frps will send RPC requests to server plugins according to configuration, and execute corresponding operations based on the plugin's response.

## RPC Requests

After receiving operation requests, server plugins can give three types of responses:

* Reject operation, need to return the reason for rejecting the operation.
* Allow operation, no need to modify operation content.
* Allow operation, modify the operation request and return the modified content.

## Interface

The interface path can be configured separately for each plugin in frps configuration. Here we use `/handler` as an example.

Request

```
POST /handler?version=0.1.0&op=Login
{
    "content": {
        ... // Specific operation information
    }
}

Request Header
X-Frp-Reqid: For tracking requests
```

Response

Any non-200 return is considered a request exception.

Reject operation execution

```
{
    "reject": true,
    "reject_reason": "invalid user"
}
```

Allow and content doesn't need to change

```
{
    "reject": false,
    "unchange": true
}
```

Allow and need to replace operation content

```
{
    "unchange": false,
    "content": {
        ... // Replaced operation information, format must be consistent with request
    }
}
```

## Operation Types

Currently, the plugin supports managing operation types: `Login`, `NewProxy`, `CloseProxy`, `Ping`, `NewWorkConn`, and `NewUserConn`.

### Login

User login operation information

```
{
    "content": {
        "version": <string>,
        "hostname": <string>,
        "os": <string>,
        "arch": <string>,
        "user": <string>,
        "timestamp": <int64>,
        "privilege_key": <string>,
        "run_id": <string>,
        "pool_count": <int>,
        "metas": map<string>string,
        "client_address": <string>
    }
}
```

### NewProxy

Information related to creating proxy

```
{
    "content": {
        "user": {
            "user": <string>,
            "metas": map<string>string
            "run_id": <string>
        },
        "proxy_name": <string>,
        "proxy_type": <string>,
        "use_encryption": <bool>,
        "use_compression": <bool>,
        "bandwidth_limit": <string>,
        "bandwidth_limit_mode": <string>,
        "group": <string>,
        "group_key": <string>,

        // tcp and udp only
        "remote_port": <int>,

        // http and https only
        "custom_domains": []<string>,
        "subdomain": <string>,
        "locations": []<string>,
        "http_user": <string>,
        "http_pwd": <string>,
        "host_header_rewrite": <string>,
        "headers": map<string>string,

        // stcp only
        "sk": <string>,

        // tcpmux only
        "multiplexer": <string>

        "metas": map<string>string
    }
}
```

### CloseProxy

Proxy closed. (For notification only)

Note: When a single frpc registers a large number of proxies, use this interface carefully, as it may affect service availability due to connection limits.

```
{
    "content": {
        "user": {
            "user": <string>,
            "metas": map<string>string
            "run_id": <string>
        },
        "proxy_name": <string>
    }
}
```

### Ping

Heartbeat related information

```
{
    "content": {
        "user": {
            "user": <string>,
            "metas": map<string>string
            "run_id": <string>
        },
        "timestamp": <int64>,
        "privilege_key": <string>
    }
}
```

### NewWorkConn

Create work connection

```
{
    "content": {
        "user": {
            "user": <string>,
            "metas": map<string>string
            "run_id": <string>
        },
        "run_id": <string>
        "timestamp": <int64>,
        "privilege_key": <string>
    }
}
```

### NewUserConn

Create user connection (supports `tcp`, `stcp`, `https`, and `tcpmux` protocols).

```
{
    "content": {
        "user": {
            "user": <string>,
            "metas": map<string>string
            "run_id": <string>
        },
        "proxy_name": <string>,
        "proxy_type": <string>,
        "remote_addr": <string>
    }
}
```

## Plugin Configuration in frps

```toml
bindPort = 7000

[[httpPlugins]]
name = "user-manager"
addr = "127.0.0.1:9000"
path = "/handler"
ops = ["Login"]

[[httpPlugins]]
name = "port-manager"
addr = "127.0.0.1:9001"
path = "/handler"
ops = ["NewProxy"]
```

* addr: Network address the plugin listens on, supports HTTP and HTTPS, defaults to HTTP.
* path: Request path the plugin listens on.
* ops: List of operations the plugin needs to handle, multiple ops separated by commas.
* tls_verify: If using HTTPS protocol, supports ignoring TLS identity verification.

## Metadata

To reduce code modifications in frps while improving the extensibility of management plugins, the concept of custom metadata is introduced in frpc configuration files. Metadata will be sent to plugins when making RPC requests.

There are two types of metadata entries: global entries and entries under each proxy configuration. Global metadata will be attached to Login requests when the client logs in, and attached to `user.metas` in other RPC requests.

Metadata entries under each proxy configuration will only be passed through metas in NewProxy operations.

```
# frpc.toml
serverAddr = "127.0.0.1"
serverPort = 7000
user = "fake"
metadatas.token = "fake"
metadatas.version = "1.0.0"

[[proxies]]
name = "ssh"
type = "tcp"
localPort = 22
remotePort = 6000
metadatas.id = "123"
```