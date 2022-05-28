---
title: "版本历史"
linkTitle: "版本历史"
menu:
  main:
    weight: 30
cascade:
- type: "docs"
---

#### v0.43.0

  * [new] http 和 tcpmux 类型的 proxy 新增 `route_by_http_user` 参数，支持根据 HTTP Basic Auth user 来进行路由。
  * [new] http 类型的 proxy 支持 CONNECT method 的转发。
  * [new] tcpmux 类型新增 `tcpmux_passthrough` ，为 true 时，会透传 `CONNECT` 请求的内容。

#### v0.42.0

  * [new] frpc 支持指定配置目录，为每一个配置文件启动一个客户端实例。(注意这种模式下无法支持所有的功能)
  * [fix] 修复环境变量中存在 `=` 号会导致值解析出错的问题。

#### v0.41.0

  * [new] 支持 go http pprof。
  * [improve] 底层 TCP keepalive 间隔默认设置为 2 小时。
  * [improve] `sudp` visitor 在需要时才发起和服务端的连接，避免 server 下线后频繁打印日志。

#### v0.40.0

  * [new] frpc 新增 `dial_server_timeout` ，支持配置连接服务端的超时时间。
  * [new] OIDC 支持配置额外的 EndpointParams。
  * [new] ServerPlugin 新增 `CloseProxy` 类型的 operation。
  * [improve] frpc 的重连时间间隔引入一些随机性。
  * [fix] 修复 `tls_trusted_ca_file` 未设置时，TLS server name 没有正确设置的问题。

#### v0.39.1

  * [fix] 修复 IPv6 地址解析出错的问题。

#### v0.39.0

  * [new] frpc 新增 `connect_server_local_ip` 支持指定连接 frps 时绑定指定的本地 IP。
  * [new] frpc 和 frps 新增 `tcp_mux_keepalive_interval` 参数支持配置 `tcp_mux` 的 keepalive 间隔，仅当 `tcp_mux` 为 true 时生效。配置此参数后，可以将 `heartbeat_interval` 设置为 -1，禁用应用层的心跳探测以减少流量消耗。(需要服务端也更新到最新版本)。
  * [improve] Server Plugin 的 Login Operation 增加 Client Address 字段。
  * [fix] /healthz API 移除鉴权。

#### v0.38.0

  * [new] 增加 `/healthz` API。
  * [new] frpc 增加 `disable_custom_tls_first_byte` ，当此参数为 true 时， frpc 通过 TLS 连接 frps 时不会发送一个自定义的字节，而是直接发送 TLS 内容。
  * [improve] 使用标准库 embed 包替换 statik。

#### v0.37.1

  * [fix] 修复 `https2https` 不可用的问题。
  * [fix] 修复 `http_proxy` HTTP 请求复用同一个连接会出现 context canceled 的问题。
  * [fix] 修复某些情况下 `https` 类型 proxy 获取 server name 出错的问题。

#### v0.37.0

  * [new] frpc 增加 verify 命令，检测配置文件是否有明显的错误， `frpc verify -c ./frpc.ini` 。
  * [new] frpc 配置文件支持 includes 语法，支持拆分 proxy 配置到多个文件或目录。
  * [new] Dashboard 支持 sudp 类型代理。
  * [fix] Dashboard 用户名密码默认为空。
  * [fix] 修复 `protocol = kcp` 时 `login_fail_exit` 无效的问题。

#### v0.36.2

  * [improve] Dashboard 支持在增加 URL Path 前缀的反向代理后被正常访问。
  * [fix] 修复 config 解析的一些错误逻辑。

#### v0.36.1

  * [fix] 修复 `bind_udp_port` 绑定端口错误的问题。

#### v0.36.0

  * [new] 新增 https2https 插件。
  * [new] frpc 新增 `tls_server_name` 参数。
  * [improve] 增加客户端由于网络连接错误时的重试频率。
  * [fix] 修复 xtcp 代理某些情况下会导致程序 panic 的问题。

#### v0.35.1

  * [fix] 减小 Release 二进制文件体积。

#### v0.35.0

  * [new] Server Plugin 支持 HTTPS 协议。
  * [fix] 修复 IPv6 地址解析异常的问题。
  * [fix] 修复 HTTP 类型代理转发 Websocket Connection Header 设置错误的问题。

#### v0.34.3

  * [new] 支持通过命令行参数启用 prometheus。

#### v0.34.2

  * [fix] 修复了 HTTP 类型代理，对于 Chunked 等流式数据传输延迟的问题。

#### v0.34.1

  * [new] http proxy 支持 ntlm 协议。
  * [new] 提供官方 docker 镜像。
  * [fix] 修复重连的 proxy 的统计数据过七天后会从 Dashboard 消失的问题。
  * [fix] 修复 TLS 证书验证出错的问题。

#### v0.34.0

  * [new] 支持设置 udp 包的大小，默认为 1500 字节。
  * [new] 支持配置 TLS 证书，支持双向认证。
  * [new] 新的 e2e 测试框架。
  * [fix] 修复 udp, sudp 类型的代理不支持压缩和加密的问题。
  * [change] 将调用 plugins 的顺序修改为固定顺序。

#### v0.33.0

  * [new] Server Plugin 增加 `NewUserConn` 接口。
  * [new] 新增 `sudp` 类型代理，支持以安全的方式转发 udp 端口。
  * [new] `tcpmux` 类型代理支持负载均衡。
  * [fix] 修复 frpc AuthenticateNewWorkConns 参数未生效的问题。
  * [fix] 修复一处并发导致的接受新连接时可能会 panic 的问题。

#### v0.32.1

  * [new] Server Plugin 增加 Ping 和 NewWorkConn 的接口。
  * [new] Server Plugin 在 http 请求 Query 中增加 apiVersion 和 op 字段。
  * [improve] 采用指数退避算法避免登录成功后立即断开连接的情况下的频繁重连。
  * [fix] 修复 frpc 在不断重连的情况下内存泄露的问题。

#### v0.32.0

  * [new] frps 支持 `tls_only` 参数，如果启用，服务端只接受 TLS 连接。
  * [new] 可选通过配置不返回创建 proxy 失败的具体信息。
  * [new] 支持 prometheus 监控。
  * [new] 支持可选 OIDC 身份验证。
  * [new] 新增 tcpmux 类型代理，通过 HTTP CONNECT 复用单一端口连接后端不同服务。
  * [fix] 修复限流配置在 Reload 时没有正确比对的问题。
  * [fix] 修复连接数统计不准确的问题。

#### v0.31.2

  * [fix] 修复 frpc 启动 proxy 失败时未释放端口的问题。

#### v0.31.1

  * [fix] 修复 proxy 中配置 meta 数据会 panic 的问题。

#### v0.31.0

  * [new] 新增服务端管理插件功能，支持扩展 frp 能力。
  * [improve] 优化 xtcp 在某些特殊情况下的成功率。

#### v0.30.0

  * [new] 支持单个 proxy 设置限流。
  * [new] 新增 https2http 插件，将内网 https 服务以 http 协议暴露出去。

#### v0.29.1

  * [fix] 修复 xtcp 启用 `use_encryption` 不能正常工作的问题。

#### v0.29.0

  * [new] 新增 `disable_log_color` 配置，可选关闭 console 日志颜色。
  * [new] plugin `https2http` 支持附加额外的 header。
  * [change] 修改代码结构，提供 Service 相关的 Go API。
  * [fix] 修复 `max_pool_count` 没有生效的问题。
  * [fix] 修复 proxy protocol IPv4 和 IPv6 判断错误的问题。

#### v0.28.2

  * [fix] 修复一处健康检查可能无法恢复的问题。

#### v0.28.1

  * [new] 更新部分第三方库版本。
  * [new] http 类型支持更多 upgrade 协议。

#### v0.28.0

  * [new] 负载均衡支持 HTTP 类型的代理。
  * [fix] 修复 `login_fail_exit` 为 false 时的连接泄露问题。

#### v0.27.1

  * [fix] 增加检测 TLS 连接时的超时机制。

#### v0.27.0

  * [new] Proxy Protocol 支持 plugin `unix_domain_socket`。
  * [new] HTTP 支持自定义 404 页面。

#### v0.26.0

  * [new] 增加 proxy protocol 支持。
  * [new] 增加 plugin https2http。
  * [fix] 修复 frpc 通过命令行模式启动 http/https 路由冲突的问题。

#### v0.25.3

  * [fix] 修复 `tls_enable` 为 true 时重连 panic 的问题。

#### v0.25.2

  * [change] 更新 kcp-go 的版本。
  * [fix] 修复一处健康检查连接未正常关闭的问题。

#### v0.25.1

  * [fix] 修复多级子域名匹配问题。
  * [fix] 修复 `frps --log_file` 不生效的问题。

#### v0.25.0

  * [new] frpc 支持通过 TLS 连接 frps。
  * [new] 提高 xtcp 连接建立的稳定性。
  * [fix] 修复 xtcp 某些情况下连接未释放的问题。

注意：xtcp 在该版本和之前的版本不兼容。

#### v0.24.1

  * [fix] token 未设置时，通过 admin 界面上传配置导致配置文件被清空的问题。

#### v0.24.0

  * [new] frpc 增加 admin 管理界面。

#### v0.23.3

  * [fix] 修复 Reload 后没有保存配置的问题。

#### v0.23.2

  * [fix] 修复异常重连后导致客户端不能正常工作的问题。

#### v0.23.1

  * [fix] 修复 status api 错误。
  * [fix] 修复 reload 和 status 命令失败的错误。

#### v0.23.0

  * [new] 配置文件支持使用环境变量进行渲染。
  * [change] 取消 token 验证超时的检测。

#### v0.22.0

  * [new] proxy 支持健康检查，自动摘除失败的 proxy。
  * [fix] 修复一处 xtcp 连接异常导致的 panic 问题。
  * [fix] frpc 通过代理连接 frps 鉴权失败的问题。
  * [fix] 命令行模式配置成文件无效的问题。

#### v0.21.0

  * [new] frpc 支持通过 websocket 协议连接 frps。
  * [new] 支持设置 vhost http server 的超时时间。
  * [fix] 修复 stcp 和 xtcp 配置错误。

#### v0.20.0

  * [new] dashboard 增加 stcp 的统计数据。
  * [new] 支持多 proxy 的负载均衡，目前只支持 tcp 类型。
  * [new] 支持设置 http 请求中的 header。

#### v0.19.1

  * [change] frps dashboard ui 更新。
  * [improve] xtcp 在没有服务端和鉴权错误的情况下更快的返回错误，而不是等待超时。
  * [fix] 修复命令行启动 stcp 和 xtcp 缺少 `bind_port` 配置的问题。
  * [fix] 修复 http 类型的 proxy 在服务端未启用 `vhost_http_port` 会导致 panic 的问题。

#### v0.19.0

  * [new] frpc 支持通过 socks5 proxy 连接 frps。
  * [new] `vhost_http_port` 和 `vhost_https_port` 可以设置为和 `bind_port` 一样的端口，支持端口复用。
  * [new] Dashboard 总览页面增加一些参数显示。
  * [change] 部分 package 迁移到 golib 中，方便复用。

#### v0.18.0

  * [change] 从 smux 库替换为 yamux 库。

注意：该版本和之前的版本不兼容。

#### v0.17.0

  * [new] 服务端 status 接口支持获取单个 proxy 的统计数据。
  * [new] frpc 支持配置指定的 dns 解析服务器。
  * [change] 更多的启动参数支持，便于不使用配置文件直接启动客户端。

#### v0.16.1

  * [fix] 修复统计数据当前连接数异常的情况。
  * [fix] 修复 udp proxy 连接没有正常关闭的问题。

#### v0.16.0

  * [new] 新的 plugin `static_file`，通过 http 接口对外提供文件访问服务。
  * [new] socks5 plugin 支持设置用户名密码。
  * [new] 配置文件支持范围端口映射。
  * [new] frps 可配置单个客户端最多允许使用的端口数量。

#### v0.15.1

  * [change] 默认 `privilege_allow_ports` 为 1 - 65535。
  * [fix] 重构后的 http 反向代理不支持 websocket。
  * [fix] Plugin `http_proxy` 无法正常工作的问题。

#### v0.15.0

  * [new] frpc 增加 status 命令用于查看本地 proxy 状态信息。
  * [new] `remote_port` 支持设置为 0，则由服务端随机绑定一个远程端口。
  * [change] frpc 的 --reload 命令修改为 reload。
  * [fix] HTTP 类型的 proxy 没有流量统计信息。
  * [fix] 修复 socks5 plugin 使用加密压缩功能会 panic 的问题。
  * [fix] 修复一处可能会导致连接不释放的问题。

#### v0.14.1

  * [improvement] 每一个 http 请求增加 X-Real-IP，不再增加 X-Forwarded-For。
  * [improvement] 优化 http 类型的 proxy 的稳定性。
  * [improvement] 优化 role 参数配置错误的提示信息。
  * [fix] 修复 kcp 绑定端口显示错误的问题。

#### v0.14.0

  * [new] 新增 xtcp(支持 udp 打洞内网直连) 类型。
  * [fix] 修复 frpc 默认配置文件名错误的问题。 #405

#### v0.13.0

  * [new] 新增 stcp(secret tcp) 类型。
  * [new] frpc 支持动态加载配置文件。
  * [new] 对于 http 类型的代理，每个连接的第一个请求附加上 X-Forwarded-For 和 X-Real-IP 的 header，用于传递用户真实 IP。
  * [new] 新增 socks5 plugin。
  * [new] frps 新增参数 `proxy_bind_addr`，指定代理在服务端绑定的 ip 地址。
  * [improvement] 优化使用 kcp 时退出程序时延迟断开连接的问题。
  * [fix] 修复 `host_header_rewirte` 功能出错的问题。 #248

#### v0.12.0

  * [new] 底层通信协议可选 kcp，在弱网环境下优化明显。 #99
  * [improvement] 对于 domain 不存在的情况返回 404 Not Found 页面。 #175
  * [fix] 修复启用加密压缩后，连接不能正常断开的问题。 #322
  * [fix] 修复启用加密压缩后，内存占用异常的问题。#345
  * [fix] 修复 `http_proxy` plugin 无法使用加密和压缩的问题。

#### v0.11.0

  * [new] 增加代理 unix域套接字 的 Plugin。
  * [new] 增加 http proxy Plugin。
  * [new] frpc 新增 `login_fail_exit` 配置项，如果为 false，则启动时连接服务器失败将不会退出，而是定期重连。
  * [new] frpc 新增 start 配置项，可以选择启用指定的 proxy，默认为空，表示全部。
  * [improvement] dashboard 自动清除 7天内没有使用的 proxy 的统计信息。
  * [improvement] dashboard 增加 frps 版本信息以及 proxy 最近一次启动和退出的时间信息。
  * [improvement] dashboard 启用 gzip，缩小页面体积。
  * [fix] 修复 frpc -v 失败的问题。
  * [fix] 修复 `HTTP_PROXY` 存在转义字符鉴权失败的问题。 #275
  * [fix] 修复 dashboard 鉴权错误的问题。 #339

#### v0.10.0

  * [new] 支持 TCP 多路复用。
  * [new] 重新设计的 Dashboard。
  * [improvement] 代码重构，协议变更，提高稳定性和性能。
  * [improvement] 内存优化。
  * [change] 压缩算法替换为 snappy。
  * [change] 配置文件部分参数命名变更。
  * [fix] 修复了一些已知的问题。

#### v0.9.3

  * [fix] 修复非特权模式不能配置二级域名的问题。 #220
  * [fix] 修改同名代理连接后导致前一个代理无法使用的问题。 #227
  * [fix] 修复一处连接池导致的 panic 问题。 #237

#### v0.9.2

  * [improvement] 减少默认的心跳间隔和超时时间。
  * [improvement] 心跳包间隔和超时时间改为可配置。
  * [fix] 修复一处由于 close nil channel 导致 frps panic 的问题。 #205
  * [fix] 修复 udp 类型的 proxy 重连失败的问题。 #209

#### v0.9.1

  * [new] 支持 url 路由。
  * [fix] 修复 subdomain 对于 https 类型不生效的问题。
  * [fix] 修复 ssh 启用了 `pool_count` 后无法正常连接的问题。
  * [fix] 修复一个可能导致 frpc 连接 frps 时一直无响应的问题。

#### v0.9.0

  * [new] UDP 协议支持。
  * [new] Dashboard 增加身份验证机制。
  * [new] http 服务支持身份验证，可在 frpc 端设置用户名密码。
  * [new] frpc 支持通过 `http_proxy` 连接 frps。
  * [new] http,https 服务支持泛域名。
  * [new] http 及 https 类型支持 subdomain 设置。
  * [new] 增加 Docker 支持。
  * [improvement] 支持设置身份验证的超时时间 `authentication_timeout`。
  * [fix] 修复连接池不生效的问题。
  * [fix] 修复多个客户端同时登录可能会导致 frps 异常退出的问题。

#### v0.8.1

  * [fix] 某些情况下 dashboard 状态显示不更新。
  * [fix] authToken 大于等于16字节会导致服务器端 panic。
  * [fix] 由于 beego.logs 更新导致的无法删除过期日志文件。

#### v0.8.0

  * [new] 新增 dashboard 界面，代理信息展示。
  * [new] server 端流量统计。
  * [new] 新增连接池，优化大量短连接服务的连接速度。
  * [new] 特权模式，支持配置允许使用的端口号范围。
  * [new] 新增 host-header-rewrite 配置项，可以根据需要修改 http 包的 header 中的 host 参数。
  * [improvement] 优化 gc，减少内存分配。
  * [improvement] 支持绑定 ipv6 地址。
  * [fix] 修复服务器端一建立连接就发送数据包时有一定几率会丢包的问题。

#### v0.7.0

  * [new] 支持 https 协议。
  * [new] 可选是否启用数据压缩。
  * [new] 新增特权模式，免 server 端配置启动代理。
  * [improvement] 优化数据传输，取消base64转码。
  * [fix] 修复 `vhost_http_port` 未指定时 frps 异常退出的问题。
  * **交互协议与旧版本不兼容**

#### v0.6.0

  * [new] 增加 reload 命令，支持动态加载配置文件。
  * [improvement] 优化 frpc 创建 tunnel 的步骤为异步操作，可承载更多的并发请求。
  * [fix] 修复 frpc 登录失败后的处理逻辑。
  * [fix] 修复同时有大量短连接时有一定几率出现的无法连接的错误。
  * [fix] 修复 windows 平台上一个连接出错的问题。

#### v0.5.0

  * [new] 针对http服务进行优化，支持虚拟主机和自定义域名绑定。
  * [change] 日志文件支持最大保存天数，默认为3天。
  * [fix] 修复连接中断后无法重新连接的错误。

#### v0.3.0

  * [new] 可以通过配置对frpc和frps之间通信内容进行加密处理。
  * [new] 新的身份认证机制，避免明文传输密码，提高安全性。
  * [change] 配置文件中 passwd 替换为 全局的 `auth_token`。
  * [improvement] 代码结构优化。
  * **配置文件及协议与旧版本不兼容**

#### v0.2.0

  * [new] 新增相关说明文档。
  * [new] frpc支持转发任意的 [ip:port]，默认为127.0.0.1。
  * [new] 增加命令行启动参数，可配置配置文件路径、日志保存路径、日志级别，查看版本号、帮助信息。
  * [new] 新增Dockerfile，增加对Docker的支持。
  * [change] 延长心跳发送间隔以及超时时间。

#### v0.1.0

正式发布的稳定可用版本。

  * [new] 提供tcp层反向代理，用于穿透内网，对外提供ssh、http等服务。
