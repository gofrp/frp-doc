---
title: "Custom Subdomain"
weight: 4
---

When multiple people are using one frps simultaneously, using custom subdomains is more convenient.

By configuring `subdomainHost` in frps's configuration file, you can enable this feature. After that, in frpc's http and https type proxies, you can configure a `subdomain` parameter instead of configuring `customDomains`.

You only need to resolve `*.{subdomainHost}` to the server where frps is located. After that, users can specify their own subdomain for their web services through subdomain, and access their web services through `{subdomain}.{subdomainHost}`.

```toml
# frps.toml
subdomainHost = "frps.com"
```

Resolve the wildcard domain `*.frps.com` to the IP address of the server where frps is located.

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
subdomain = "test"
```

After both frps and frpc start successfully, you can access the intranet web service through `test.frps.com`.

**Note: If frps is configured with `subdomainHost`, then `customDomains` cannot be subdomains or wildcard domains belonging to `subdomainHost`.**

In the same HTTP or HTTPS type proxy, `customDomains` and `subdomain` can be configured simultaneously.