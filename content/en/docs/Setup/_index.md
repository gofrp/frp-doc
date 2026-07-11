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

You can download the latest client and server binaries from the GitHub [Releases](https://github.com/fatedier/frp/releases) page. Each release archive also includes example configuration files.

## Deployment

1. Extract the downloaded compressed archive.
2. Copy `frpc` to the machine where the intranet service is located.
3. Copy `frps` to the machine with a public IP address and place it in any directory.

## Start Using!

1. Write configuration files. Currently supported file formats include TOML/YAML/JSON. The old INI format is still supported but is no longer recommended.
2. Start the server using the following command: `./frps -c ./frps.toml`.
3. Start the client using the following command: `./frpc -c ./frpc.toml`.
4. If you need to run in the background for a long time, it is recommended to combine with other tools such as [systemd](systemd/) and `supervisor`.

On Windows, use the command syntax for your shell. In Command Prompt (CMD):

```bat
frps.exe -c frps.toml
frpc.exe -c frpc.toml
```

In PowerShell:

```powershell
.\frps.exe -c .\frps.toml
.\frpc.exe -c .\frpc.toml
```

For information on how to write configuration files, please refer to the content in the [Examples](../examples/) section.

For complete configuration item descriptions, please refer to the content in [Reference](../reference/).
