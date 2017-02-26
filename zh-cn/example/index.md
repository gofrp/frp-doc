title: 通过 SSH 访问内网服务器
---
有时想在家里通过 ssh 远程访问公司的 linux 服务器，公司的机器是一个局域网环境，无法直接通过 IP 地址连接。通过 frp 的内网穿透功能可以让我们访问到内网的机器。

## 部署 frp 服务端 frps

修改 frps.ini 文件，配置一个名为 ssh 的反向代理

```ini
# frps.ini
[common]
bind_port = 7000

[ssh]
listen_port = 6000
auth_token = 123
```

启动 frps

```ini
./frps -c ./frps.ini
```

## 在内网机器部署 frp 客户端 frpc

修改 frpc.ini 文件，设置 frps 所在服务器的 IP 为 x.x.x.x

```ini
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000
auth_token = 123

[ssh]
local_ip = 127.0.0.1
local_port = 22
```

启动 frpc

```ini
./frpc -c ./frpc.ini
```

## 测试访问内网

通过 ssh 访问内网机器，假设用户名为 test

```ini
ssh -oPort=6000 test@x.x.x.x
```
