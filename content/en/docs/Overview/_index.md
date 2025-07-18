---
title: "Overview"
weight: 1
description: >
  Some overview to help you quickly understand frp.
---

## What is frp?

frp is a high-performance reverse proxy application that focuses on intranet penetration. It supports multiple protocols including TCP, UDP, HTTP, HTTPS, and features P2P communication capabilities. Using frp, you can securely and conveniently expose intranet services to the public network through nodes with public IP addresses.

## Why choose frp?

By deploying the frp server on nodes with public IP addresses, you can easily penetrate intranet services to the public network and enjoy the following professional features:

* Multiple protocol support: Client-server communication supports TCP, QUIC, KCP, Websocket and other protocols.
* TCP connection stream multiplexing: Carry multiple requests on a single connection, reducing connection establishment time and request latency.
* Load balancing between proxy groups.
* Port multiplexing: Multiple services can be exposed through the same server port.
* P2P communication: Traffic does not need to be relayed through the server, making full use of bandwidth resources.
* Client plugins: Provides multiple natively supported client plugins, such as static file viewing, HTTPS/HTTP protocol conversion, HTTP, SOCKS5 proxy, etc., to meet various needs.
* Server plugin system: Highly extensible server plugin system, convenient for feature expansion according to your own needs.
* User-friendly UI pages: Provides user interfaces for both server and client, making configuration and monitoring more convenient.

## What's next?

* [Setup](../setup/): Learn how to install frp.
* [Examples](../examples/): Understand different application scenarios of frp through simple examples.
