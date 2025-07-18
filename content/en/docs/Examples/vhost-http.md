---
title: "Access Intranet Web Services via Custom Domain Names"
weight: 15
description: >
  Through simple configuration of HTTP type proxy, you can allow users to access intranet web services through custom domain names.
---

HTTP type proxies are very suitable for providing intranet web services to external users through custom domain names. Compared to TCP type proxies, HTTP proxies can not only reuse ports but also provide many features based on the HTTP protocol.

HTTPS is similar to this, but it should be noted that frp's HTTPS proxy requires the local service to be an HTTPS service, and frps will not perform TLS termination. You can also combine the https2http plugin to expose local HTTP services through the HTTPS protocol.

### Steps

1. **Configure frps.toml**

   Add the following content to the frps.toml file to specify the listening port for HTTP requests as 8080:

    ```toml
    bindPort = 7000
    vhostHTTPPort = 8080
    ```

   If you need to configure HTTPS proxy, you also need to set `vhostHTTPSPort`.

2. **Configure frpc.toml**

   Add the following content to the frpc.toml file, ensuring the correct server IP address, local web service listening port, and custom domain name are set:

    ```toml
    serverAddr = "x.x.x.x"
    serverPort = 7000

    [[proxies]]
    name = "web"
    type = "http"
    localPort = 80
    customDomains = ["www.yourdomain.com"]

    [[proxies]]
    name = "web2"
    type = "http"
    localPort = 8080
    customDomains = ["www.yourdomain2.com"]
    ```

3. **Start frps and frpc**

4. **Domain Name Resolution**

   Resolve the A records of `www.yourdomain.com` and `www.yourdomain2.com` to the server's IP address `x.x.x.x`. If the server already has a corresponding domain name, you can also resolve CNAME records to the original domain name. Additionally, the same effect can be achieved by modifying the Host field of HTTP requests.

5. **Access via Browser**

   Use a browser to access `http://www.yourdomain.com:8080` to access the port 80 service on the intranet machine, and access `http://www.yourdomain2.com:8080` to access the port 8080 service on the intranet machine.