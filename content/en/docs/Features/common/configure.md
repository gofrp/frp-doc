---
title: "Configuration File"
weight: 10
---

Starting from v0.52.0, frp began supporting TOML, YAML, and JSON as configuration file formats.

Please note that INI has been deprecated and will be removed in future releases. New features can only be used in TOML, YAML, or JSON. Users who wish to use these new features should switch their configuration format accordingly.

## Format

You can use any format you like among TOML/YAML/JSON to write configuration files, and frp will automatically adapt and parse them.

Documentation examples are mainly written in TOML. The following example configuration will penetrate local SSH services to the public network.

frps configuration:

```toml
bindPort = 7000
```

frpc configuration:

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

The same client can configure multiple proxies, but the name must be unique.

Between different clients, proxy name uniqueness can be ensured by configuring different user values.

## Template Rendering

Configuration files support template rendering using environment variables, with template format adopting Go's standard format.

Example configuration:

```toml
serverAddr = "{{ .Envs.FRP_SERVER_ADDR }}"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = {{ .Envs.FRP_SSH_REMOTE_PORT }}
```

Start frpc program:

```bash
export FRP_SERVER_ADDR="x.x.x.x"
export FRP_SSH_REMOTE_PORT="6000"
./frpc -c ./frpc.toml
```

frpc will automatically render configuration file templates using environment variables, with all environment variables requiring `.Envs` as a prefix.

## YAML Anchors and References

frp supports YAML merge functionality (anchors and references, including dot-prefix fields), which works normally in strict configuration mode without using the `--strict-config=false` parameter.

You can use fields starting with dots as anchor definitions, similar to Docker Compose's `x-` prefix:

```yaml
# frpc.yaml
.common: &common
  type: "stcp"
  secretKey: "{{.Envs.FRPC_SECRET_KEY}}"
  localIP: "127.0.0.1"

serverAddr: "x.x.x.x"
serverPort: 7000

proxies:
  - name: "ssh"
    localPort: 22
    <<: *common

  - name: "web"
    localPort: 80
    <<: *common
```

## Configuration Validation

You can validate configuration file parameters in advance by executing `frpc verify -c ./frpc.toml` or `frps verify -c ./frps.toml`.

```
frpc: the configuration file ./frpc.toml syntax is ok
```

If this result appears, it means there are no errors in the new configuration file, otherwise specific error information will be output.

### Strict Mode Validation

By default, frp uses strict mode for configuration validation. If you need to disable strict validation, you can use the `--strict-config=false` parameter:

```bash
frpc verify -c ./frpc.yaml --strict-config=false
```

## Configuration Splitting

Through the `includes` parameter, you can include other configuration files in the main configuration, thus implementing the management of proxy configurations split across multiple files.

```toml
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000
includes = ["./confd/*.toml"]
```

```toml
# ./confd/test.toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

The above configuration additionally includes proxy configuration content from all toml files in the `./confd` directory through includes in frpc.toml, which is equivalent to merging these two files into one.

Note that files specified by includes can only contain proxy configurations, and common parameter configurations can only be placed in the main configuration file.

## Complete Configuration Parameters

Since frp currently supports many features and configuration items, feature parameters not listed in the documentation can be viewed in [Reference](../../../reference).