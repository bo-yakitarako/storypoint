#!/bin/bash

# [CA作成]
mkdir ./CA;
cd ./CA;
echo "01" > serial;
touch index.txt;
openssl genrsa -out ./ca.key 2048;
openssl req -new -key ca.key -out ca.csr -subj '/C=JP/ST=Chiba/L=Chiba/O=bo inc./OU=Oreore Gr./CN=bo-ca';
openssl x509 -sha256 -days 3650 -in ./ca.csr -req -signkey ./ca.key -out ca.crt;
openssl x509 -in ca.crt -text;
openssl x509 -inform PEM -outform DER -in ca.crt -out ca.der;

# [証明書作成]
cd ../;

openssl genrsa -out server.key 2048;
openssl req -new -sha256 -key server.key -out server.csr -subj "/C=JP/ST=Chiba/L=Chiba/O=bo inc./OU=Oreore Gr./CN=bo-dev";
openssl req -noout -in server.csr -text;

yes | openssl ca -config <(cat ./openssl.cnf <(printf "\n[usr_cert]\nsubjectAltName=DNS:bo-dev,DNS:\*.bo-dev\nextendedKeyUsage=critical,timeStamping,serverAuth,clientAuth,codeSigning")) -keyfile ./CA/ca.key -outdir ./ -cert ./CA/ca.crt -in server.csr -out server.crt -days 820 -md sha256;

openssl x509 -in server.crt -text;
