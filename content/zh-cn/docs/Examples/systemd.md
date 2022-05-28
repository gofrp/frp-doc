---
title: "使用systemd控制frp"
weight: 10
description: >
  这个示例将会演示使用在Linux系统下使用systemd控制frps及配置开机自启。
---

在Linux系统下，使用`systemd`可以方便地控制frp服务端`frps`的启动和停止、配置后台运行和开启自启。

要使用`systemd`来控制`frps`，需要先安装`systemd`，然后在`/etc/systemd/system`目录下创建一个frps.service文件。

1. 如Linux服务端上没有安装`systemd`，可以使用`yum`或`apt`等命令安装`systemd`。

    ```bash
    # yum
    yum install systemd
    # apt
    apt install systemd
    ```

2. 使用文本编辑器，如`vim`创建并编辑`frps.service`文件。
    ```bash
    $ vim /etc/systemd/system/frps.service
    ```
    写入内容
    ```ini
    [Unit]
    # 服务名称，可自定义
    Description = frp server
    After = network.target syslog.target
    Wants = network.target

    [Service]
    Type = simple
    #启动frps的命令，需修改为您的frps的安装路径
    ExecStart = /path/to/frps -c /path/to/frps.ini

    [Install]
    WantedBy = multi-user.target
    ```

3. 使用`systemd`命令，管理frps。

    ```bash
    # 启动frp
    systemctl start frps
    # 停止frp
    systemctl stop frps
    # 重启frp
    systemctl restart frps
    # 查看frp状态
    systemctl status frps
    ```

4. 配置frp开机自启。

    ```bash
    systemctl enable frps
    ```
