---
title: "使用宝塔面板"
weight: 2
description: >
  此示例演示如何在 Linux 系统下使用 宝塔面板 可视化部署 frp 客户端及服务端
---

宝塔面板是一款可视化的服务器运维面板，如果您已经安装宝塔面板，可通过宝塔面板应用商店一键部署 frp

以下是具体的操作步骤：

1. **安装 宝塔面板**

    前往 [宝塔面板官网](https://www.bt.cn/new/download.html) ，选择正式版的脚本下载安装，或直接使用以下脚本，如已安装请忽略。

    ```bash
    # 安装宝塔面板正式版
    if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh
    ```

2. **进入 Docker 应用商店**

    登录面板后在面板左侧菜单栏中点击 `Docker`，进入`Docker-应用商店`

3. **在首页下拉找到 FRP 服务端/客户端，点击安装**

    ```bash
    # 如果安装服务端：在弹出的安装界面中配置以下信息
    web端口：frp服务器的web管理端口，默认7500
    服务端口：frp服务器的端口，默认7000
    HTTP监听端口：默认40800，如需设置80端口，请停止本机的Nginx/Apache
    HTTPS监听端口：默认40443，如需设置443端口，请停止本机的Nginx/Apache
    用户：frp服务器的用户名
    密码：frp服务器的密码
    # 如果安装客户端：在弹出的安装界面中配置以下信息
    frp服务端ip：frp服务器的ip,例如：192.168.100.50
    frp服务端端口：frp服务器的端口,一般为7000
    web端口：frp客户端的web管理端口
    用户：frp客户端的用户名
    密码：frp客户端的密码
    ```
