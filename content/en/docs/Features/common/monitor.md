---
title: "Monitoring"
weight: 20
---

Currently, frps server supports two monitoring systems: memory monitoring and Prometheus monitoring.

## Memory Monitoring

Monitoring data stored in memory is primarily used for Dashboard display. When the Dashboard feature is enabled in frps configuration, memory monitoring is enabled by default.

Please note that monitoring data in memory will be cleared after each process restart, or retained for 7 days. Monitoring data can be obtained by sending HTTP requests to the Dashboard address, but this API is not currently standardized and direct use is not recommended.

## Prometheus Monitoring

Due to design issues, the query interface provided by Prometheus to the outside world shares the same address as the Dashboard, so to use Prometheus monitoring, you must first enable the Dashboard.

Enable Dashboard in frps.ini and set `enablePrometheus = true`, then you can access `http://{dashboard_addr}/metrics` to get Prometheus monitoring data.