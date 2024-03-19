---
title: "端口范围映射"
weight: 80
---

*Added in v0.56.0*

我们可以利用 Go template 的 range 语法结合内置的 `parseNumberRangePair` 函数来实现端口范围映射。

下面的示例，应用运行后会创建 8 个代理，名称为 `test-6000, test-6001 ... test-6007`，分别将远端的端口映射到本地。

```
{{- range $_, $v := parseNumberRangePair "6000-6006,6007" "6000-6006,6007" }}
[[proxies]]
name = "tcp-{{ $v.First }}"
type = "tcp"
localPort = {{ $v.First }}
remotePort = {{ $v.Second }}
{{- end }}
```
