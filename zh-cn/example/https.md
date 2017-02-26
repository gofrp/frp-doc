title: 通过 自定义域名 https方式访问部署于内网的 web 服务器
---

https的配置方法与http的基本相同，只需要把 vhost_http_port 替换为 vhost_https_port， type 设置为 https 即可。

## 部署服务器端 frps

修改 frps.ini 文件，配置一个名为 web 的 https 反向代理，设置 https 访问端口为 8080，绑定自定义域名 `www.yourdomain.com`：

```ini
# frps.ini
[common]
bind_port = 7000
vhost_https_port = 8080

[web]
type = https
custom_domains = www.yourdomain.com
auth_token = 123
```

启动 frps；

`./frps -c ./frps.ini`

## 部署客户端 frpc

修改 frpc.ini 文件，设置 frps 所在的服务器的 IP 为 x.x.x.x，local_port 为本地机器上 web 服务对应的端口：

```ini
# frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000
auth_token = 123

[web]
type = https
local_port = 80
```

启动 frpc：

`./frpc -c ./frpc.ini`

## 设置域名解析

将 `www.yourdomain.com` 的域名 A 记录解析到 IP `x.x.x.x`，如果服务器已经有对应的域名，也可以将 CNAME 记录解析到服务器原先的域名。

## 通过浏览器访问内网 web 服务

通过浏览器访问 `https://www.yourdomain.com:8080` 即可访问到处于内网机器上的 web 服务。
