---
title: "Custom TLS Protocol Encryption"
weight: 2
---

`transport.useEncryption` and `STCP` functions can effectively prevent traffic content from being stolen during communication, but cannot determine whether the other party's identity is legitimate, posing a risk of man-in-the-middle attacks. For this reason, frp supports traffic encryption between frpc and frps through TLS protocol, and supports client or server unidirectional verification, bidirectional verification, and other functions.

When `transport.tls.force = true` in `frps.toml`, it means the server only accepts TLS connection clients, which is also a prerequisite for frps to verify frpc identity. If the content of `transport.tls.trustedCaFile` in `frps.toml` is valid, then `transport.tls.force = true` will be enabled by default.

**Note: After enabling this function, except for xtcp, you don't need to set use_encryption for duplicate encryption**

## TLS Default Enable Method

Starting from v0.50.0, the default value of `transport.tls.enable` will be true, enabling TLS protocol encryption by default.

If the frps side has no certificate configured, it will use a randomly generated certificate to encrypt traffic.

By default, frpc enables TLS encryption function but does not verify frps's certificate.

## frpc Unidirectional Verification of frps Identity

```toml
# frpc.toml
transport.tls.trustedCaFile = "/to/ca/path/ca.crt"

# frps.toml
transport.tls.certFile = "/to/cert/path/server.crt"
transport.tls.keyFile = "/to/key/path/server.key"
```

frpc needs to additionally load the ca certificate, and frps needs to additionally specify TLS configuration. frpc unidirectionally verifies frps's identity through the ca certificate. This requires that frps's `server.crt` is legitimate for frpc's ca.

Legitimate: If the certificate is issued by ca, or the certificate is in ca's trust chain, then it is considered: the certificate is legitimate for ca.

## frps Unidirectional Verification of frpc Identity

```toml
# frpc.toml
transport.tls.certFile = "/to/cert/path/client.crt"
transport.tls.keyFile = "/to/key/path/client.key"

# frps.toml
transport.tls.trustedCaFile = "/to/ca/path/ca.crt"
```

frpc needs to additionally load TLS configuration, and frps needs to additionally load the ca certificate. frps unidirectionally verifies frpc's identity through the ca certificate. This requires that frpc's `client.crt` is legitimate for frps's ca.

## Bidirectional Verification

```toml
# frpc.toml
transport.tls.certFile = "/to/cert/path/client.crt"
transport.tls.keyFile = "/to/key/path/client.key"
transport.tls.trustedCaFile = "/to/ca/path/ca.crt"

# frps.toml
transport.tls.certFile = "/to/cert/path/server.crt"
transport.tls.keyFile = "/to/key/path/server.key"
transport.tls.trustedCaFile = "/to/ca/path/ca.crt"
```

Bidirectional verification means frpc and frps verify each other's identity through local ca certificates. Theoretically, frpc and frps can have different ca certificates, as long as they can verify each other's identity.

## OpenSSL Certificate Generation Example

`x509: certificate relies on legacy Common Name field, use SANs or temporarily
enable Common Name matching with GODEBUG=x509ignoreCN=0`

If the above error occurs, it's because go 1.15 version started [deprecating CommonName](https://golang.org/doc/go1.15#commonname), so SAN certificates are recommended.

Below is a simple example of how to generate ca and SAN certificates for both parties using openssl.

Prepare the default OpenSSL configuration file in the current directory. This configuration file is usually located at `/etc/pki/tls/openssl.cnf` on linux systems and `/System/Library/OpenSSL/openssl.cnf` on mac systems.

If it exists, copy it directly to the current directory, for example `cp /etc/pki/tls/openssl.cnf ./my-openssl.cnf`. If it doesn't exist, you can use the following command to create it.

```
cat > my-openssl.cnf << EOF
[ ca ]
default_ca = CA_default
[ CA_default ]
x509_extensions = usr_cert
[ req ]
default_bits        = 2048
default_md          = sha256
default_keyfile     = privkey.pem
distinguished_name  = req_distinguished_name
attributes          = req_attributes
x509_extensions     = v3_ca
string_mask         = utf8only
[ req_distinguished_name ]
[ req_attributes ]
[ usr_cert ]
basicConstraints       = CA:FALSE
nsComment              = "OpenSSL Generated Certificate"
subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid,issuer
[ v3_ca ]
subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints       = CA:true
EOF
```

Generate default ca:
```
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=example.ca.com" -days 5000 -out ca.crt
```

Generate frps certificate:
```
openssl genrsa -out server.key 2048

openssl req -new -sha256 -key server.key \
    -subj "/C=XX/ST=DEFAULT/L=DEFAULT/O=DEFAULT/CN=server.com" \
    -reqexts SAN \
    -config <(cat my-openssl.cnf <(printf "\n[SAN]\nsubjectAltName=DNS:localhost,IP:127.0.0.1,DNS:example.server.com")) \
    -out server.csr

openssl x509 -req -days 365 -sha256 \
	-in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
	-extfile <(printf "subjectAltName=DNS:localhost,IP:127.0.0.1,DNS:example.server.com") \
	-out server.crt
```

Generate frpc certificate:
```
openssl genrsa -out client.key 2048
openssl req -new -sha256 -key client.key \
    -subj "/C=XX/ST=DEFAULT/L=DEFAULT/O=DEFAULT/CN=client.com" \
    -reqexts SAN \
    -config <(cat my-openssl.cnf <(printf "\n[SAN]\nsubjectAltName=DNS:client.com,DNS:example.client.com")) \
    -out client.csr

openssl x509 -req -days 365 -sha256 \
    -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
	-extfile <(printf "subjectAltName=DNS:client.com,DNS:example.client.com") \
	-out client.crt
```

In this example, both server.crt and client.crt are issued by the default ca, so they are legitimate for the default ca.