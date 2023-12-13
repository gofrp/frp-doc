---
title: "配置文件"
weight: 10
---

从 v0.52.0 版本开始，frp 开始支持 TOML、YAML 和 JSON 作为配置文件格式。

请注意，INI 已被弃用，并将在未来的发布中移除。新功能只能在TOML、YAML 或 JSON 中使用。希望使用这些新功能的用户应相应地切换其配置格式。

## 格式

可使用 TOML/YAML/JSON 任何一个您喜欢的格式来编写配置文件，frp 会自动适配进行解析。

文档示例主要通过 TOML 编写，如下的示例配置将本地 SSH 服务穿透到公网。

frps 配置：

```toml
bindPort = 7000
```

frpc 配置：

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

同一个客户端可以配置多个代理，但是 name 必须确保唯一。

不同的客户端之间，可以通过配置不同的 user 来确保代理名称唯一。

## 模版渲染

配置文件支持使用环境变量进行模版渲染，模版格式采用 Go 的标准格式。

示例配置如下：

```toml
serverAddr = "{{ .Envs.FRP_SERVER_ADDR }}"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = {{ .Envs.FRP_SSH_REMOTE_PORT }}
```

启动 frpc 程序：

```
export FRP_SERVER_ADDR="x.x.x.x"
export FRP_SSH_REMOTE_PORT="6000"
./frpc -c ./frpc.toml
```

frpc 会自动使用环境变量渲染配置文件模版，所有环境变量需要以 `.Envs` 为前缀。

## 配置校验

通过执行 `frpc verify -c ./frpc.toml` 或 `frps verify -c ./frps.toml` 可以对配置文件中的参数进行预先校验。

```
frpc: the configuration file ./frpc.toml syntax is ok
```

如果出现此结果，则说明新的配置文件没有错误，否则会输出具体的错误信息。

## 配置拆分

通过 `includes` 参数可以在主配置中包含其他配置文件，从而实现将代理配置拆分到多个文件中管理。

```toml
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000
includes = ["./confd/*.toml"]
```

```toml
# ./confd/test.toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

上述配置在 frpc.toml 中通过 includes 额外包含了 `./confd` 目录下所有的 toml 文件的代理配置内容，效果等价于将这两个文件合并成一个文件。

需要注意的是 includes 指定的文件中只能包含代理配置，通用参数的配置只能放在主配置文件中。

## 完整配置参数

由于 frp 目前支持的功能和配置项较多，未在文档中列出的功能参数可以在 [参考](../../../reference) 中查看。
