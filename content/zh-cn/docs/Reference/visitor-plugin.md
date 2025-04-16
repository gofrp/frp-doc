---
title: "访问者插件配置"
weight: 7
description: >
  frp 访问者插件的详细配置说明。
---

### VirtualNetVisitorPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | 插件类型，设置为 "virtual_net"。 | Yes |
| destinationIP | string | 要访问的目标虚拟 IP 地址。通常是服务端的虚拟网络地址。 | Yes | 