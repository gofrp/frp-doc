---
title: "安装"
weight: 2
description: >
  关于如何安装 frp 的说明。
---

frp 采用 Golang 编写，支持跨平台，仅需下载对应平台的二进制文件即可执行，没有额外依赖。

## 系统需求

由于采用 Golang 编写，所以系统需求和最新的 Golang 对系统和平台的要求一致，具体可以参考 [Golang System requirements](https://golang.org/doc/install#requirements)。


## 下载

目前可以在 Github 的 [Release](https://github.com/fatedier/frp/releases) 页面中下载到最新版本的客户端和服务端二进制文件，所有文件被打包在一个压缩包中。

## 部署

解压缩下载的压缩包，将其中的 frpc 拷贝到内网服务所在的机器上，将 frps 拷贝到具有公网 IP 的机器上，放置在任意目录。

## 开始使用！

编写配置文件，先通过 `./frps -c ./frps.ini` 启动服务端，再通过 `./frpc -c ./frpc.ini` 启动客户端。如果需要在后台长期运行，建议结合其他工具使用，例如 `systemd` 和 `supervisior`。

如果是 Windows 用户，需要在 cmd 终端中执行命令。

配置文件如何编写可以参考 [示例](/docs/examples/) 中的内容。
