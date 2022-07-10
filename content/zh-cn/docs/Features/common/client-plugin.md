---
title: "客户端插件"
weight: 11
---

默认情况下，frpc 只会转发请求到本地 TCP 或 UDP 端口，也就是通过 `local_ip` 和 `local_port` 指定的本地服务地址。

通过客户端插件的功能将一些简单的本地服务内置在 frpc 中，可以帮助用户在只启动 frpc 的情况下实现原本需要额外启动其他服务才能实现的功能。

在每一个代理的配置中，通过 `plugin` 指定需要使用的插件，插件的配置参数都以 `plugin_` 开头。当启用客户端插件后，`local_ip` 和 `local_port` 不再需要配置。

客户端插件可以被应用在任意类型的代理中，但是需要插件本身的协议能够支持。例如静态文件访问插件可以通过 TCP 或者 HTTP 的代理暴露出去。

使用 `http_proxy` 插件的示例:

```ini
# frpc.ini
[http_proxy]
type = tcp
remote_port = 6000
plugin = http_proxy
plugin_http_user = abc
plugin_http_passwd = abc
```

`plugin_http_user` 和 `plugin_http_passwd` 即为 `http_proxy` 插件可选的配置参数。

## http_proxy

HTTP 代理插件，用于将内网机器作为 HTTP 代理暴露给其他服务，可以通过此代理访问到此内网机器能够访问到的其他服务。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_http_user | 是 | HTTP 代理用户名 |
| plugin_http_passwd | 是 | HTTP 代理密码 |

## socks5

SOCKS5 代理。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_user | 是 | 连接代理的用户名 |
| plugin_passwd | 是 | 连接代理的密码 |


## static_file

静态文件浏览服务，通过暴露一个简单的 HTTP 服务查看指定的目录下的文件。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_local_path | 否 | 要对外暴露的文件目录 |
| plugin_strip_prefix | 是 | 用户请求的 URL 路径会被映射到本地文件，如果希望去除用户访问文件的前缀，需要配置此参数 |
| plugin_http_user | 是 | HTTP BasicAuth 用户名 |
| plugin_http_passwd | 是 | HTTP BasicAuth 密码 |

## unix_domain_socket

代理本地 Unix 域套接字的服务。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_unix_path | 否 | 本地 Unix 域套接字地址 |


## http2https

将本地的 HTTPS 服务以 HTTP 的形式暴露出去。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_local_addr | 否 | 本地服务地址 |
| plugin_host_header_rewrite | 是 | 如果配置，发送给本地服务的请求的 Host 字段会被修改 |
| plugin_header_{header name} | 是 | 发送给本地服务的请求会被加上指定的 header 字段 |


## https2http

将本地的 HTTP 服务以 HTTPS 的形式暴露出去。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_local_addr | 否 | 本地服务地址 |
| plugin_crt_path | 是 | HTTPS 所需的证书文件，如果 crt 和 key 都为空，则使用自动生成的证书 |
| plugin_key_path | 是 | HTTPS 所需的密钥文件 |
| plugin_host_header_rewrite | 是 | 如果配置，发送给本地服务的请求的 Host 字段会被修改 |
| plugin_header_{header name} | 是 | 发送给本地服务的请求会被加上指定的 header 字段 |

## https2https

将本地的 HTTPS 服务以 HTTPS 的形式暴露出去。

| 参数 | 可选 | 描述 |
| :--- | :--- | :--- |
| plugin_local_addr | 否 | 本地服务地址 |
| plugin_crt_path | 是 | HTTPS 所需的证书文件，如果 crt 和 key 都为空，则使用自动生成的证书 |
| plugin_key_path | 是 | HTTPS 所需的密钥文件 |
| plugin_host_header_rewrite | 是 | 如果配置，发送给本地服务的请求的 Host 字段会被修改 |
| plugin_header_{header name} | 是 | 发送给本地服务的请求会被加上指定的 header 字段 |
