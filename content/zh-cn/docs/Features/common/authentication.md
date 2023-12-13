---
title: "身份认证"
weight: 30
---

目前 frpc 和 frps 之间支持两种身份验证方式，`token` 和 `oidc`，默认为 `token`。这些认证方式允许您验证客户端与服务端之间的通信，并确保只有授权用户能够建立连接。

## Token

Token 身份认证是一种简单的身份认证方式，只需要在 frp 的客户端 frpc 和服务端 frps 配置文件中配置相同的 token 即可。

### 配置示例

```toml
# frps.toml
bindPort = 7000
auth.token = "abc"
```

```toml
# frpc.toml
auth.token = "abc"
```

## OIDC (OpenID Connect) 身份认证

OIDC 身份认证是一种基于开放标准的身份认证方式，它通过使用 OIDC 提供者进行身份验证。

验证流程参考 [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4)。

### 配置示例

```toml
# frps.toml
auth.method = "oidc"
auth.oidc.issuer = "https://example-oidc-issuer.com/"
auth.oidc.audience = "https://oidc-audience.com/.default"
```

```toml
# frpc.toml
auth.method = "oidc"
auth.oidc.clientID = "98692467-37de-409a-9fac-bb2585826f18"
auth.oidc.clientSecret = "oidc_secret"
auth.oidc.audience = "https://oidc-audience.com/.default"
auth.oidc.tokenEndpointURL = "https://example-oidc-endpoint.com/oauth2/v2.0/token"
```
