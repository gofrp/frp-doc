---
title: "FAQ"
weight: 7
---

## How can I validate a configuration file before starting frp?

Run `frpc verify -c ./frpc.toml` for a client configuration or `frps verify -c ./frps.toml` for a server configuration. See [Configuration Validation](../features/common/configure/#configuration-validation) for details.

## What should I check when frpc cannot connect to frps?

Confirm that both processes are running, `serverAddr` points to the frps host, and the frpc `serverPort` matches the frps `bindPort`. The [SSH example](../examples/ssh/) provides a minimal end-to-end configuration; logging options are listed in the [common configuration reference](../reference/common/#logconfig).

## What should I do if XTCP hole punching fails?

XTCP availability depends on the NAT environment, so a successful connection cannot always be guaranteed. Use STCP when reliability is more important, or configure the built-in [XTCP fallback mechanism](../features/xtcp/#fallback-mechanism) to fall back to an STCP visitor. See [STCP & SUDP](../features/stcp-sudp/) for the access model.

## Where can I find every configuration option?

See the [Reference](../reference/) section for complete server, client, proxy, visitor, and plugin configuration descriptions.
