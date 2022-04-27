# frp-doc

Documentation(https://gofrp.org/docs/) for frp.

```
git clone --recurse-submodules --depth 1 https://github.com/fatedier/frp-doc.git
cd frp-doc
npm install
hugo server
```

If `hugo server` encounted such an error:
```
hugo server

Built in 556 ms
Error: Error building site: EXECUTE-AS-TEMPLATE: failed to transform "json/offline-search-index.json" (application/json): failed to parse Resource "json/offline-search-index.json" as Template:: template: json/offline-search-index.json:5: unclosed action
```
Please check your hugo version, see [execute-as-template-of-sass-files-not-working](https://discourse.gohugo.io/t/execute-as-template-of-sass-files-not-working/17627/2). And if you want the latest hugo, see [hugo](https://github.com/gohugoio/hugo/releases).
