---
title: "Setup"
weight: 2
description: >
  Instructions on how to install frp.
---

{{% pageinfo %}}
frp is written in Go and supports cross-platform deployment. You only need to download the binary file suitable for your platform to execute it, without additional dependencies.
{{% /pageinfo %}}

## System Requirements

Since it's written in Go, the system requirements are consistent with the latest Go language requirements for systems and platforms. Please refer to [Golang System requirements](https://golang.org/doc/install#requirements) for details.

## Download

You can download the latest version of client and server binary files from the GitHub [Release](https://github.com/fatedier/frp/releases) page. All files are packaged in a compressed archive, which also includes a complete configuration parameter documentation.

## Deployment

1. Extract the downloaded compressed archive.
2. Copy `frpc` to the machine where the intranet service is located.
3. Copy `frps` to the machine with a public IP address, and place them in any directory.

## Start Using!

1. Write configuration files. Currently supported file formats include TOML/YAML/JSON. The old INI format is still supported but is no longer recommended.
2. Start the server using the following command: `./frps -c ./frps.toml`.
3. Start the client using the following command: `./frpc -c ./frpc.toml`.
4. If you need to run in the background for a long time, it is recommended to combine with other tools such as [systemd](systemd/) and `supervisor`.

If you are a Windows user, you need to execute the same commands in the command prompt.

For information on how to write configuration files, please refer to the content in the [Examples](../examples/) section.

For complete configuration item descriptions, please refer to the content in [Reference](../reference/).
