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

您可以从 GitHub [Releases](https://github.com/fatedier/frp/releases) 页面下载最新的客户端和服务端二进制文件。每个版本的压缩包中还包含示例配置文件。

## 部署

1. 解压下载的压缩包。
2. 将 `frpc` 复制到内网服务所在的机器上。
3. 将 `frps` 复制到拥有公网 IP 地址的机器上，并将其放在任意目录中。

## 开始使用！

1. 编写配置文件，目前支持的文件格式包括 TOML/YAML/JSON，旧的 INI 格式仍然支持，但已经不再推荐。
2. 使用以下命令启动服务器：`./frps -c ./frps.toml`。
3. 使用以下命令启动客户端：`./frpc -c ./frpc.toml`。
4. 如果需要在后台长期运行，建议结合其他工具，如 [systemd](systemd/) 和 `supervisor`。

在 Windows 上，请根据所用终端执行对应的命令。在命令提示符 (CMD) 中：

```bat
frps.exe -c frps.toml
frpc.exe -c frpc.toml
```

在 PowerShell 中：

```powershell
.\frps.exe -c .\frps.toml
.\frpc.exe -c .\frpc.toml
```

有关如何编写配置文件，请参考 [示例](../examples/) 部分中的内容。

完整的配置项说明，请参阅[参考](../reference/)部分。
