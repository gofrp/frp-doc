---
title: "自定义二级域名"
weight: 4
---

在多人同时使用一个 frps 时，通过自定义二级域名的方式来使用会更加方便。

通过在 frps 的配置文件中配置 `subdomainHost`，就可以启用该特性。之后在 frpc 的 http、https 类型的代理中可以不配置 `customDomains`，而是配置一个 `subdomain` 参数。

只需要将 `*.{subdomainHost}` 解析到 frps 所在服务器。之后用户可以通过 subdomain 自行指定自己的 web 服务所需要使用的二级域名，通过 `{subdomain}.{subdomainHost}` 来访问自己的 web 服务。

```toml
# frps.toml
subdomainHost = "frps.com"
```

将泛域名 `*.frps.com` 解析到 frps 所在服务器的 IP 地址。

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
subdomain = "test"
```

frps 和 frpc 都启动成功后，通过 `test.frps.com` 就可以访问到内网的 web 服务。

**注：如果 frps 配置了 `subdomainHost`，则 `customDomains` 中不能是属于 `subdomainHost` 的子域名或者泛域名。**

同一个 HTTP 或 HTTPS 类型的代理中 `customDomains` 和 `subdomain` 可以同时配置。
