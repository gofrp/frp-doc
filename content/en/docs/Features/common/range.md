---
title: "Port Range Mapping"
weight: 80
---

*Added in v0.56.0*

We can use Go template's range syntax combined with the built-in `parseNumberRangePair` function to implement port range mapping.

In the example below, after the application runs, 8 proxies will be created, named `tcp-6000, tcp-6001 ... tcp-6007`, which will map remote ports to local ports respectively.

```text
{{- range $_, $v := parseNumberRangePair "6000-6006,6007" "6000-6006,6007" }}
[[proxies]]
name = "tcp-{{ $v.First }}"
type = "tcp"
localPort = {{ $v.First }}
remotePort = {{ $v.Second }}
{{- end }}
```
