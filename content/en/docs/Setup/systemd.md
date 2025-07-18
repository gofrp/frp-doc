---
title: "Using systemd"
weight: 1
description: >
  This example demonstrates how to use systemd to manage frps service on Linux systems, including starting, stopping, configuring background running, and setting auto-start on boot.
---

On Linux systems, using `systemd` can conveniently control the start, stop, background running configuration, and boot auto-start of the frps server.

Here are the specific operation steps:

1. **Install systemd**

    If systemd is not yet installed on your Linux server, you can use package managers like `yum` (for CentOS/RHEL) or `apt` (for Debian/Ubuntu) to install it:

    ```bash
    # Install systemd using yum (CentOS/RHEL)
    yum install systemd

    # Install systemd using apt (Debian/Ubuntu)
    apt install systemd
    ```

2. **Create frps.service file**

    Use a text editor (like vim) to create a `frps.service` file in the `/etc/systemd/system` directory to configure the frps service.

    ```bash
    $ sudo vim /etc/systemd/system/frps.service
    ```

    Write the content:
    ```ini
    [Unit]
    # Service name, customizable
    Description = frp server
    After = network.target syslog.target
    Wants = network.target

    [Service]
    Type = simple
    # Command to start frps, modify to your frps installation path
    ExecStart = /path/to/frps -c /path/to/frps.toml

    [Install]
    WantedBy = multi-user.target
    ```

3. **Use systemd commands to manage frps service**

    ```bash
    # Start frp
    sudo systemctl start frps
    # Stop frp
    sudo systemctl stop frps
    # Restart frp
    sudo systemctl restart frps
    # Check frp status
    sudo systemctl status frps
    ```

4. **Set frps to auto-start on boot**

    ```bash
    sudo systemctl enable frps
    ```

By following the above steps, you can easily use systemd to manage the frps service, achieving start, stop, automatic running, and boot auto-start. Make sure to replace paths and configuration file names to match your actual installation.