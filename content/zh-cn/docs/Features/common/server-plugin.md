---
title: "服务端插件"
weight: 120
---

frp 服务端插件的作用是在不侵入自身代码的前提下，扩展 frp 服务端的能力。

frp 服务端插件会以单独进程的形式运行，并且监听在一个端口上，对外提供 RPC 接口，响应 frps 的请求。

frps 在执行某些操作前，会根据配置向服务端插件发送 RPC 请求，根据插件的响应来执行相应的操作。

## RPC 请求

服务端插件接收到操作请求后，可以给出三种回应。

* 拒绝操作，需要返回拒绝操作的原因。
* 允许操作，不需要修改操作内容。
* 允许操作，对操作请求进行修改后，返回修改后的内容。

## 接口

接口路径可以在 frps 配置中为每个插件单独配置，这里以 `/handler` 为例。

Request

```
POST /handler?version=0.1.0&op=Login
{
    "content": {
        ... // 具体的操作信息
    }
}

请求 Header
X-Frp-Reqid: 用于追踪请求
```

Response

非 200 的返回都认为是请求异常。

拒绝执行操作

```
{
    "reject": true,
    "reject_reason": "invalid user"
}
```

允许且内容不需要变动

```
{
    "reject": false,
    "unchange": true
}
```

允许且需要替换操作内容

```
{
    "unchange": false,
    "content": {
        ... // 替换后的操作信息，格式必须和请求时的一致
    }
}
```

## 操作类型

目前插件支持管理的操作类型有 `Login`、`NewProxy`、`CloseProxy`、`Ping`、`NewWorkConn` 和 `NewUserConn`。

### Login

用户登录操作信息

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

创建代理的相关信息

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
        "locations": <string>,
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

代理关闭。(仅用于通知)

注意: 当单个 frpc 会注册大量 proxy 时，慎重使用此接口，可能会由于连接数超限而影响服务的可用性。

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

心跳相关信息

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

创建工作连接

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

创建用户连接 (支持 `tcp`、`stcp`、`https` 和 `tcpmux` 协议)。

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


## frps 中插件配置

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

* addr: 插件监听的网络地址，支持 HTTP 和 HTTPS，默认为 HTTP。
* path: 插件监听的请求路径。
* ops: 插件需要处理的操作列表，多个 op 以英文逗号分隔。
* tls_verify: 如果是 HTTPS 协议，支持忽略 TLS 身份验证。

## 元数据

为了减少 frps 的代码修改，同时提高管理插件的扩展能力，在 frpc 的配置文件中引入自定义元数据的概念。元数据会在调用 RPC 请求时发送给插件。

有两种类型的元数据条目，全局条目和每个代理配置下的条目。全局元数据将在客户端登录时附加在 Login 请求中，并在其他 RPC 请求中附加在 `user.metas` 中。

每个代理配置下的元数据条目仅会在 NewProxy 操作中通过 metas 传递。

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
