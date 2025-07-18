---
title: "Visitor Plugin Configuration"
weight: 7
description: >
  Detailed configuration description for frp visitor plugins.
---

### VirtualNetVisitorPluginOptions

| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| type | string | Plugin type, set to "virtual_net". | Yes |
| destinationIP | string | Target virtual IP address to access. Usually the server's virtual network address. | Yes |