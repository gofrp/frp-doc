---
title: "端口范围映射"
weight: 80
---

*v0.56.0 新增*

我们可以利用 Go template 的 range 语法结合内置的 `parseNumberRangePair` 函数来实现端口范围映射。

下面的示例，应用运行后会创建 8 个代理，名称为 `tcp-6000, tcp-6001 ... tcp-6007`，分别将远端的端口映射到本地。

```text
{{- range $_, $v := parseNumberRangePair "6000-6006,6007" "6000-6006,6007" }}
[[proxies]]
name = "tcp-{{ $v.First }}"
type = "tcp"
localPort = {{ $v.First }}
remotePort = {{ $v.Second }}
{{- end }}
```
