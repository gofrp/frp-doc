---
title: "SSH Tunnel Gateway"
weight: 130
---

*Added in v0.53.0*

## Concept

SSH supports reverse proxy capability [rfc](https://www.rfc-editor.org/rfc/rfc4254#page-16).

frp supports listening on an SSH port on the frps side, completing TCP protocol proxy through the SSH -R protocol. In this mode, there is no need to depend on frpc.

SSH reverse tunnel proxy and proxying SSH ports through frp are two different concepts. SSH reverse tunnel proxy is essentially using ssh client to connect to frps to complete basic reverse proxy when you don't want to use frpc.

## Parameters

```toml
# frps.toml

sshTunnelGateway.bindPort = 0
sshTunnelGateway.privateKeyFile = ""
sshTunnelGateway.autoGenPrivateKeyPath = ""
sshTunnelGateway.authorizedKeysFile = ""
```

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| bindPort | int | SSH server port that frps listens on. | YES |
| privateKeyFile | string | Default is empty. Private key file used by ssh server. If empty, frps will read the private key file under autoGenPrivateKeyPath. Can reuse local /home/user/.ssh/id_rsa file or custom path. | No |
| autoGenPrivateKeyPath | string | Default is ./.autogen_ssh_key. If file doesn't exist or is empty, frps will automatically generate RSA private key file content and save it to this file. | No |
| authorizedKeysFile | string | Default is empty. Empty means no authentication for ssh clients. Non-empty can implement ssh passwordless login authentication, can reuse local /home/user/.ssh/authorized_keys file or custom path. | No |

## Basic Usage

### Server frps

Minimal configuration

```toml
sshTunnelGateway.bindPort = 2200
```

Put the above configuration in frps.toml, run `./frps -c frps.toml`, it will listen on port 2200 and accept SSH reverse proxy requests.

Notes:
1. Using minimal configuration will automatically create a `.autogen_ssh_key` private key file in the current running directory. The frps ssh server will use this private key file to encrypt and decrypt data. You can also reuse existing local private key files, such as `/home/user/.ssh/id_rsa`.
2. frps running in minimal configuration mode does not authenticate SSH connections. It is strongly recommended to configure token for frps and specify token in SSH command line.

### Client ssh

Command format is

```bash
ssh -R :80:{local_ip:port} v0@{frps address} -p {frps ssh listen port} {tcp|http|https|stcp|tcpmux} --remote_port {real remote port} --proxy_name {proxy_name} --token {frp token}
```

1. `--proxy_name` is optional, a random one will be generated if empty.
2. The username for logging into frps is unified as v0, which has no meaning currently, i.e. `v0@{frps address}`.
3. The port that the server proxy listens on is determined by `--remote_port`.
4. Complete command parameters supported by `{tcp|http|https|stcp|tcpmux}` can be obtained through --help. For example: `ssh -R :80::8080 v0@127.0.0.1 -p 2200 http --help`
5. token is optional, strongly recommended to configure token on frps for security.

#### TCP Proxy

```bash
ssh -R :80:127.0.0.1:8080 v0@{frp address} -p 2200 tcp --proxy_name "test-tcp" --remote_port 9090
```

Start a port 9090 on frps to proxy local port 8080 service.

```bash
frp (via SSH) (Ctrl+C to quit)

User: 
ProxyName: test-tcp
Type: tcp
RemoteAddress: :9090
```

Equivalent to:

```bash
frpc tcp --proxy_name "test-tcp" --local_ip 127.0.0.1 --local_port 8080 --remote_port 9090
```

More parameters can be obtained by executing --help.

#### HTTP Proxy

```bash
ssh -R :80:127.0.0.1:8080 v0@{frp address} -p 2200 http --proxy_name "test-http" --custom_domain test-http.frps.com 
```

Equivalent to

```bash
frpc http --proxy_name "test-http" --custom_domain test-http.frps.com
```

You can access the http service with the following command:

`curl 'http://test-http.frps.com'`

More parameters can be obtained by executing `--help`.

#### HTTPS/STCP/TCPMUX Proxy

Get usage through the following command:

`ssh -R :80:127.0.0.1:8080 v0@{frp address} -p 2200 {https|stcp|tcpmux} --help`

## Advanced Usage

### Reuse Local id_rsa File

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.privateKeyFile = "/home/user/.ssh/id_rsa"
```

The SSH protocol handshake stage requires exchanging public keys to encrypt data, so the SSH server on the frps side needs to specify a private key file, which can reuse existing local ones; if empty, frps will automatically create an RSA private key file.

### Specify Auto-generated Private Key File Address

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.autoGenPrivateKeyPath = "/var/frp/ssh-private-key-file"
```

frps automatically creates private key file and specifies path for storage.

Note: frps changing private key file will cause SSH client login failure. If you need successful login, you can delete old records in `/home/user/.ssh/known_hosts` file.

### Use Existing authorized_keys File for SSH Passwordless Login Authentication

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.authorizedKeysFile = "/home/user/.ssh/authorized_keys"
```

authorizedKeysFile is the file used for SSH passwordless login, storing user public key information, one per line.

If authorizedKeysFile is empty, frps does not authenticate SSH clients. frps does not support SSH username+password authentication mode.

You can reuse existing local `authorized_keys` file to authenticate clients.

Note: authorizedKeysFile is user authentication during SSH login stage, token is existing frps authentication, the two are not related. SSH authentication comes first, frps token authentication comes later. It is strongly recommended to enable at least one. If authorizedKeysFile is empty, it is strongly recommended to enable token authentication on frps side, otherwise there are security risks.

### Use Custom authorized_keys File for SSH Passwordless Login Authentication

```toml
# frps.toml

sshTunnelGateway.bindPort = 2200
sshTunnelGateway.authorizedKeysFile = "/var/frps/custom_authorized_keys_file"
```

Custom `authorized_keys` file path.

Changes to authorizedKeysFile file may cause SSH login authentication failure, you may need to re-add public key information to authorizedKeysFile.