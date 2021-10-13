# http-checker

[![Build Status](https://travis-ci.com/floriandorau/http-checker.svg?branch=master)](https://travis-ci.com/floriandorau/http-checker)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=floriandorau_http-checker&metric=alert_status)](https://sonarcloud.io/dashboard?id=floriandorau_http-checker)

Little CLI tool to frequently check http response status of different web endpoints.

## Run it

### As npm package

The easiest way to run `http-checker` is to install it as global `npm` package like the following

```bash
npm install -g @floriandorau/http-checker
```

After installation it you can execute `http-checker` in your terminal.

### From source

Checkout the repository and run `npm install` from root. Then you can run `npm start` from project root in your terminal.

## Configuration

Before you can run `http-checker` you first need to create a file `config.yml` at `{HOMEDIR}/.http-checker/config.yml`. 

A valid configuration looks like the following:

```yaml
interval: 30 # interval in seconds
slack:
  webbhook: https://your-webhoook
  channel: your-channel-name
endpoints:
  - url: http://localhost:8080
    username: basic-auth-user
    password: basic-auth-password
```

Currently only `Basic Auth` is supported for endpoints.
