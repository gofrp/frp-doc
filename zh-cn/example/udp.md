title:  转发 DNS 查询请求
---
DNS 查询请求通常使用 UDP 协议，frp 支持对内网 UDP 服务的穿透，配置方式和 TCP 基本一致。

## 部署服务器端 frps

修改 frps.ini 文件，配置一个名为 dns 的反向代理：

```ini
# frps.ini
[common]
bind_port = 7000

[dns]
type = udp
listen_port = 6000
auth_token = 123
```

启动 frps：

`./frps -c ./frps.ini`

## 部署客户端 frpc

修改 frpc.ini 文件，设置 frps 所在服务器的 IP 为 x.x.x.x，转发到 Google 的 DNS 查询服务器 `8.8.8.8` 的 udp 53 端口：

```ini
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000
auth_token = 123

[dns]
type = udp
local_ip = 8.8.8.8
local_port = 53
```

启动 frpc：

`./frpc -c ./frpc.ini`

## 测试

通过 dig 测试 UDP 包转发是否成功，预期会返回 `www.google.com` 域名的解析结果：

`dig @x.x.x.x -p 6000 www.goolge.com`
