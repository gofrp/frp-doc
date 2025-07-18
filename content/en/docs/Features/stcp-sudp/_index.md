---
title: "STCP & SUDP"
weight: 4
description: >
  Learn about frp `STCP`, `SUDP` type proxies.
---

The (S) in STCP and SUDP stands for Secret. Its purpose is to provide secure access capability for TCP and UDP type services, avoiding direct exposure of ports on the public network that anyone can access.

These two proxy types require deploying frp clients on both the machine where the accessed service is located and the machine of the user who wants to access it. The machine where the accessed service is located is called the server side, and the other end is called the access side.

frp will listen on a port on the access side and map it to the server side port. Users on the access side need to provide the same secret key to connect successfully, thus ensuring security.