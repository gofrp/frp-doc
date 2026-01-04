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

### 从文件加载 Token

*Added in v0.64.0*

frp 支持使用 `tokenSource` 从文件中加载认证 token，而不是在配置文件中硬编码。这个功能可以避免在配置文件中直接暴露敏感信息。

#### 配置方式

tokenSource 与 token 字段互斥，只能选择其中一种方式配置。

**服务端配置示例：**

```toml
# frps.toml
bindPort = 7000
auth.tokenSource.type = "file"
auth.tokenSource.file.path = "/etc/frp/server_token"
```

**客户端配置示例：**

```toml
# frpc.toml
auth.tokenSource.type = "file"
auth.tokenSource.file.path = "/etc/frp/client_token"
```

#### 注意事项

1. token 文件应该设置适当的权限（如 600），确保只有运行 frp 的用户可以读取
2. 文件中的 token 会自动去除首尾空白字符
3. tokenSource 在配置加载时解析，不支持运行时动态重新加载

### 通过外部命令获取 Token

*Added in v0.66.0*

除了从文件读取 token，frp 还支持通过执行外部命令来动态获取 token。这在需要与云服务 CLI 或密钥管理系统集成时非常有用。

#### 配置方式

**客户端配置示例：**

```toml
# frpc.toml
auth.tokenSource.type = "exec"
auth.tokenSource.exec.command = "/usr/bin/get-token"
auth.tokenSource.exec.args = ["--format", "raw"]
auth.tokenSource.exec.env = [
    { name = "TOKEN_SERVICE", value = "production" }
]
```

#### 安全注意事项

出于安全考虑，`exec` 类型的 tokenSource 需要在启动 frpc 时添加 `--allow-unsafe=TokenSourceExec` 参数才能启用。

```bash
frpc -c frpc.toml --allow-unsafe=TokenSourceExec
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
