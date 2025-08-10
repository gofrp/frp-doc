---
title: "Authentication"
weight: 30
---

Currently, frpc and frps support two authentication methods: `token` and `oidc`, with `token` being the default. These authentication methods allow you to verify communication between the client and server, ensuring that only authorized users can establish connections.

## Token

Token authentication is a simple authentication method that only requires configuring the same token in both the frp client (frpc) and server (frps) configuration files.

### Configuration Example

```toml
# frps.toml
bindPort = 7000
auth.token = "abc"
```

```toml
# frpc.toml
auth.token = "abc"
```

### Loading Token from File

*Added in v0.64.0*

frp supports using `tokenSource` to load authentication tokens from files instead of hardcoding them in configuration files. This feature helps avoid exposing sensitive information directly in configuration files.

#### Configuration

The tokenSource field is mutually exclusive with the token field - you can only use one of them.

**Server configuration example:**

```toml
# frps.toml
bindPort = 7000
auth.tokenSource.type = "file"
auth.tokenSource.file.path = "/etc/frp/server_token"
```

**Client configuration example:**

```toml
# frpc.toml
auth.tokenSource.type = "file"
auth.tokenSource.file.path = "/etc/frp/client_token"
```

#### Important Notes

1. Token files should have appropriate permissions (e.g., 600) to ensure only the user running frp can read them
2. Tokens in files will have leading and trailing whitespace automatically trimmed
3. tokenSource is resolved at configuration load time and does not support runtime dynamic reloading
4. Currently only the `file` type tokenSource is supported

## OIDC (OpenID Connect) Authentication

OIDC authentication is an open standard-based authentication method that uses OIDC providers for identity verification.

The verification process follows [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4).

### Configuration Example

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