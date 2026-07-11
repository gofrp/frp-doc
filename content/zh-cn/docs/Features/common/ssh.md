---
title: "SSH Tunnel Gateway"
weight: 130
---

*v0.53.0 新增*

## 概念

SSH 支持反向代理能力 [rfc](https://www.rfc-editor.org/rfc/rfc4254#page-16)。

frp 支持在 frps 端监听一个 ssh 端口，通过走 ssh -R 协议来完成 TCP 协议代理，该模式下不需要依赖 frpc。

SSH 反向隧道代理和通过 frp 代理 SSH 端口是不同的 2 个概念。SSH 反向隧道代理本质上是在你不想使用 frpc 的时候，通过 ssh client 连接 frps 来完成基本的反向代理。

## 参数

```toml
# frps.toml

sshTunnelGateway.bindPort = 0
sshTunnelGateway.privateKeyFile = ""
sshTunnelGateway.autoGenPrivateKeyPath = ""
sshTunnelGateway.authorizedKeysFile = ""
```

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| bindPort | int | frps 监听的 SSH 服务端口。 | Yes |
| privateKeyFile | string | 默认为空。SSH 服务端使用的私钥文件；为空时，frps 会读取 autoGenPrivateKeyPath 路径下的私钥文件。可复用本地 /home/user/.ssh/id_rsa 文件或自定义路径。 | No |
| autoGenPrivateKeyPath | string | 默认为 ./.autogen_ssh_key。文件不存在或内容为空时，frps 会自动生成 RSA 私钥文件并存入该路径。 | No |
| authorizedKeysFile | string | 默认为空。为空时不对 SSH 客户端进行鉴权；非空时可实现 SSH 公钥认证，可复用本地 /home/user/.ssh/authorized_keys 文件或自定义路径。 | No |

## 基本使用

### 服务端 frps

最简配置

```toml
sshTunnelGateway.bindPort = 2200
```

将上述配置放入 frps.toml，运行 `./frps -c frps.toml`，此时会监听 2200 端口并接受 SSH 反向代理请求。

注意：
1. 使用最简配置时，frps 会在当前运行目录自动创建 `.autogen_ssh_key` 私钥文件。frps 的 SSH 服务端会在握手阶段使用该私钥证明自身身份。也可以复用本地已有的私钥文件，如 `/home/user/.ssh/id_rsa`。
2. 使用最简配置运行 frps 时，SSH 连接默认不进行鉴权。强烈建议在 frps 中配置 token，并在 SSH 命令行中指定该 token。

### 客户端 ssh

命令格式为

```bash
ssh -R :80:{local_ip:port} v0@{frps_address} -p {frps ssh listen port} {tcp|http|https|stcp|tcpmux} --remote_port {real remote port} --proxy_name {proxy_name} --token {frp token}

```

1. `--proxy_name` 非必填，为空会随机生成一个。
2. 登录 frps 的用户名统一为 v0，目前没有任何含义，即 `v0@{frps_address}`。
3. frps 端代理的监听端口由 `--remote_port` 决定。
4. `{tcp|http|https|stcp|tcpmux}` 支持的完整命令参数可通过 `--help` 获取。如：`ssh -R :80::8080 v0@127.0.0.1 -p 2200 http --help`
5. token 为可选参数；出于安全考虑，强烈建议在 frps 中配置 token。

#### TCP 代理

```bash
ssh -R :80:127.0.0.1:8080 v0@frps_address -p 2200 tcp --proxy_name "test-tcp" --remote_port 9090
```

在 frps 启动一个 9090 的端口代理本地的 8080 服务。

```text
frp (via SSH) (Ctrl+C to quit)

User:
ProxyName: test-tcp
Type: tcp
RemoteAddress: :9090
```

等同于：

```bash
frpc tcp --proxy_name "test-tcp" --local_ip 127.0.0.1 --local_port 8080 --remote_port 9090
```

更多参数可执行 `--help` 获取。

#### HTTP 代理

```bash
ssh -R :80:127.0.0.1:8080 v0@frps_address -p 2200 http --proxy_name "test-http" --custom_domain test-http.frps.com
```

等同于

```bash
frpc http --proxy_name "test-http" --local_ip 127.0.0.1 --local_port 8080 --custom_domain test-http.frps.com
```

可以通过以下命令访问 http 服务：

`curl 'http://test-http.frps.com'`

更多参数可执行 `--help` 获取。

#### HTTPS/STCP/TCPMUX 代理

通过如下命令获取使用方式：

`ssh -R :80:127.0.0.1:8080 v0@frps_address -p 2200 {https|stcp|tcpmux} --help`

## 高级使用

### 复用本机的 id_rsa 文件

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.privateKeyFile = "/home/user/.ssh/id_rsa"
```

SSH 握手阶段中，frps 的 SSH 服务端会使用主机私钥对密钥交换进行签名，以证明自身身份。可以复用本机已有的私钥文件；如果未指定，frps 会自动生成 RSA 私钥文件。

### 指定自动生成私钥文件地址

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.autoGenPrivateKeyPath = "/var/frp/ssh-private-key-file"
```

frps自动创建私钥文件并指定路径存储。

注意：frps 更换私钥文件，会导致 ssh 客户端登录失败，如果需要成功登录，可以删除 `/home/user/.ssh/known_hosts` 文件中的旧的记录。


### 使用本机已存在的 authorized_keys 文件，实现 ssh 免密登录鉴权

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.authorizedKeysFile = "/home/user/.ssh/authorized_keys"
```

authorizedKeysFile 是 ssh 免密登录使用的文件，存放用户公钥信息，一行一个。

authorizedKeysFile 为空， frps 不对 ssh 客户端进行任何认证。frps 不支持 ssh 用户名+密码模式认证。

可复用本机已有的 `authorized_keys` 文件对客户端进行认证。

注意：authorizedKeysFile 是 ssh 登录阶段的用户认证，token 是 frps 已有的认证，2 者没有关联，ssh 认证在前，frps 认证 token 在后，强烈建议至少开启1个，如果 authorizedKeysFile 为空，强烈建议 frps 端开启 token 认证，否则有安全风险。

### 使用自定义的 authorized_keys 文件，实现 ssh 免密登录鉴权

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.authorizedKeysFile = "/var/frps/custom_authorized_keys_file"
```

自定义 `authorized_keys` 文件路径。

authorizedKeysFile 文件变动可能会导致 ssh 登录认证失败，可能需要重新将公钥信息放入 authorizedKeysFile。
