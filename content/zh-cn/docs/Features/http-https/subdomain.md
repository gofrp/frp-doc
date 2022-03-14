---
title: "自定义二级域名"
weight: 4
---

在多人同时使用一个 frps 时，通过自定义二级域名的方式来使用会更加方便。

通过在 frps 的配置文件中配置 `subdomain_host`，就可以启用该特性。之后在 frpc 的 http、https 类型的代理中可以不配置 `custom_domains`，而是配置一个 subdomain 参数。

只需要将 `*.{subdomain_host}` 解析到 frps 所在服务器。之后用户可以通过 subdomain 自行指定自己的 web 服务所需要使用的二级域名，通过 `{subdomain}.{subdomain_host}` 来访问自己的 web 服务。

```ini
# frps.ini
[common]
subdomain_host = frps.com
```

将泛域名 `*.frps.com` 解析到 frps 所在服务器的 IP 地址。

```ini
# frpc.ini
[web]
type = http
local_port = 80
subdomain = test
```

frps 和 frpc 都启动成功后，通过 `test.frps.com` 就可以访问到内网的 web 服务。

**注：如果 frps 配置了 `subdomain_host`，则 `custom_domains` 中不能是属于 `subdomain_host` 的子域名或者泛域名。**

同一个 HTTP 或 HTTPS 类型的代理中 `custom_domains` 和 `subdomain` 可以同时配置。
