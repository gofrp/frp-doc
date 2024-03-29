---
title: "概念"
weight: 3
description: >
  了解以下概念有助于更好地理解和使用 frp。
---

## 工作原理

frp 主要由两个组件组成：客户端(frpc) 和 服务端(frps)。通常情况下，服务端部署在具有公网 IP 地址的机器上，而客户端部署在需要穿透的内网服务所在的机器上。

由于内网服务缺乏公网 IP 地址，因此无法直接被非局域网内的用户访问。用户通过访问服务端的 frps，frp 负责根据请求的端口或其他信息将请求路由到相应的内网机器，从而实现通信。

## 代理

在 frp 中，一个代理对应一个需要公开访问的内网服务。一个客户端可以同时配置多个代理，以满足不同的需求。

## 代理类型

frp 支持多种代理类型，以适应不同的使用场景。以下是一些常见的代理类型：

- **TCP**：提供纯粹的 TCP 端口映射，使服务端能够根据不同的端口将请求路由到不同的内网服务。
- **UDP**：提供纯粹的 UDP 端口映射，与 TCP 代理类似，但用于 UDP 流量。
- **HTTP**：专为 HTTP 应用设计，支持修改 Host Header 和增加鉴权等额外功能。
- **HTTPS**：类似于 HTTP 代理，但专门用于处理 HTTPS 流量。
- **STCP**：提供安全的 TCP 内网代理，要求在被访问者和访问者的机器上都部署 frpc，不需要在服务端暴露端口。
- **SUDP**：提供安全的 UDP 内网代理，与 STCP 类似，需要在被访问者和访问者的机器上都部署 frpc，不需要在服务端暴露端口。
- **XTCP**：点对点内网穿透代理，与 STCP 类似，但流量不需要经过服务器中转。
- **TCPMUX**：支持服务端 TCP 端口的多路复用，允许通过同一端口访问不同的内网服务。

每种代理类型适用于不同的使用情境，您可以根据需求选择合适的代理类型来配置 frp。
