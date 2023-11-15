---
title: "安装"
weight: 2
description: >
  关于如何安装 frp 的说明。
---

{{% pageinfo %}}
frp 采用 Go 语言编写，支持跨平台，只需下载适用于您平台的二进制文件即可执行，无需额外依赖。
{{% /pageinfo %}}

## 系统需求

由于采用 Go 语言编写，因此系统需求与最新的 Go 语言对系统和平台的要求一致，具体请参考 [Golang System requirements](https://golang.org/doc/install#requirements)。

## 下载

您可以从 GitHub 的 [Release](https://github.com/fatedier/frp/releases) 页面中下载最新版本的客户端和服务器二进制文件。所有文件都打包在一个压缩包中，还包含了一份完整的配置参数说明。

## 部署

1. 解压下载的压缩包。
2. 将 `frpc` 复制到内网服务所在的机器上。
3. 将 `frps` 复制到拥有公网 IP 地址的机器上，并将它们放在任意目录。

## 开始使用！

1. 编写配置文件，目前支持的文件格式包括 TOML/YAML/JSON，旧的 INI 格式仍然支持，但已经不再推荐。
2. 使用以下命令启动服务器：`./frps -c ./frps.toml`。
3. 使用以下命令启动客户端：`./frpc -c ./frpc.toml`。
4. 如果需要在后台长期运行，建议结合其他工具，如 [systemd](systemd/) 和 `supervisor`。

如果您是 Windows 用户，需要在命令提示符中执行相同的命令。

有关如何编写配置文件，请参考 [示例](../examples/) 部分中的内容。

完整的配置项说明，请参考 [Reference](../reference/) 中的内容。
