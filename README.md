# frp-doc

Documentation(https://gofrp.org) for frp.

```
git clone --recurse-submodules --depth 1 https://github.com/fatedier/frp-doc.git
cd frp-doc
npm install
hugo server
```

Notice that non-extended hugo can't build that doc, see [execute-as-template-of-sass-files-not-working](https://discourse.gohugo.io/t/execute-as-template-of-sass-files-not-working/17627/2).

If you have any build problems, please check your [hugo](https://github.com/gohugoio/hugo/releases) version, we are using [hugo_extended_0.133.1_Linux-64bit](https://github.com/gohugoio/hugo/releases/download/v0.133.1/hugo_extended_0.133.1_Linux-64bit.tar.gz).
