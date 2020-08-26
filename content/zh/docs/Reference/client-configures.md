---
title: "客户端配置"
weight: 2
description: >
  frp 客户端的详细配置说明。
---

### 基础配置

| 参数 | 类型 | 说明 | 默认值 | 可选值 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :---|
| server_addr | string | 连接服务端的地址 | 0.0.0.0 | | |
| server_port | int | 连接服务端的端口 | 7000 | | |
| http_proxy | string | 连接服务端使用的代理地址 | | | 格式为 {protocol}://user:passwd@192.168.1.128:8080 protocol 目前支持 http 和 socks5 |
| log_file | string | 日志文件地址 | ./frpc.log | | 如果设置为 console，会将日志打印在标准输出中 |
| log_level | string | 日志等级 | info | trace, debug, info, warn, error | |
| log_max_days | int | 日志文件保留天数 | 3 | | |
| disable_log_color | bool | 禁用标准输出中的日志颜色 | false | | |
| pool_count | int | 连接池大小 | 0 | | |
| user | string | 用户名 | | | 设置此参数后，代理名称会被修改为 {user}.{proxyName}，避免代理名称和其他用户冲突 |
| dns_server | string | 使用 DNS 服务器地址 | | | 默认使用系统配置的 DNS 服务器，指定此参数可以强制替换为自定义的 DNS 服务器地址 |
| login_fail_exit | bool | 第一次登陆失败后是否退出 | true | | |
| protocol | string | 连接服务端的通信协议 | tcp | tcp, kcp, websocket | |
| tls_enable | bool | 启用 TLS 协议加密连接 | false | | |
| heartbeat_interval | int | 向服务端发送心跳包的间隔时间 | 30 | | |
| heartbeat_timeout | int | 和服务端心跳的超时时间 | 90 | | |
| start | string | 指定启用部分代理 | | | 当配置了较多代理，但是只希望启用其中部分时可以通过此参数指定，默认为全部启用 |

### 权限验证

| 参数 | 类型 | 说明 | 默认值 | 可选值 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :---|
| authentication_method | string | 鉴权方式 | token | token, oidc | 需要和服务端一致 |
| authenticate_heartbeats | bool | 开启心跳消息鉴权 | false | | 需要和服务端一致 |
| authenticate_new_work_conns | bool | 开启建立工作连接的鉴权 | false | | 需要和服务端一致 |
| token | string | 鉴权使用的 token 值 | | | 需要和服务端设置一样的值才能鉴权通过 |
| oidc_client_id | string | oidc_client_id | | | |
| oidc_client_secret | string | oidc_client_secret | | | |
| oidc_audience | string | oidc_audience | | | |
| oidc_token_endpoint_url | string | oidc_token_endpoint_url | | | |

### UI

| 参数 | 类型 | 说明 | 默认值 | 可选值 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :---|
| admin_addr | string | 启用 AdminUI 监听的本地地址 | 0.0.0.0 | | |
| admin_port | int | 启用 AdminUI 监听的本地端口 | 0 | | |
| admin_user | string | HTTP BasicAuth 用户名 | admin | | |
| admin_pwd | string | HTTP BasicAuth 密码 | admin | | |
| asserts_dir | string | 静态资源目录 | | | AdminUI 使用的资源默认打包在二进制文件中，通过指定此参数使用自定义的静态资源 |
