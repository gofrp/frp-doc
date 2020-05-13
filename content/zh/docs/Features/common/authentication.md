---
title: "身份认证"
date: 2020-04-05
weight: 3
---

目前 frpc 和 frps 之间支持两种身份验证方式，`token` 和 `oidc`，默认为 `token`。

通过 `frpc.ini` 和 `frps.ini` 的 `[common]` 段落中配置 `authentication_method` 来指定要使用的身份验证方式。

只有通过身份验证的客户端(frpc)才能成功连接 frps。

### Token

基于 Token 的身份验证方式比较简单，需要在 frpc 和 frps 的 `[common]` 段落中配置上相同的 `token` 参数即可。

### OIDC

OIDC 是 `OpenID Connect` 的简称，验证流程参考 [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4)。

启用这一验证方式，参考配置如下：

```ini
# frps.ini
[common]
authentication_method = oidc
oidc_issuer = https://example-oidc-issuer.com/
oidc_audience = https://oidc-audience.com/.default
```

```ini
# frpc.ini
[common]
authentication_method = oidc
oidc_client_id = 98692467-37de-409a-9fac-bb2585826f18 # Replace with OIDC client ID
oidc_client_secret = oidc_secret
oidc_audience = https://oidc-audience.com/.default
oidc_token_endpoint_url = https://example-oidc-endpoint.com/oauth2/v2.0/token
```

### 参数说明

| 类型 | 描述 |
| :--- | :--- |
| authentication_method | 身份验证方式，token 或 oidc，默认为 token。 |
| authenticate_heartbeats | 在每一个心跳包中附加上身份认证信息，客户端服务端需要一致。 |
| authenticate_new_work_conns | 在每次创建工作连接时附加上身份认证信息，客户端服务端需要一致。 |
