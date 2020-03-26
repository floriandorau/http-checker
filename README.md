# http-checker

## Run it

### As npm package

The easiest way to run `http-checker` is to install it as global `npm` package like the following

```bash
npm install -g @floriandorau/http-checker
```

After installation it you can execute in your terminal via `http-checker`.

### From source

Checkout the repository and run `npm install` from root. Then you can run `npm start` from project root in your terminal.

## Configuration

But you can run `http-checker` you first need to create `config.yml` at `{HOMEDIR}/.http-checker/config.yml`;

A valid configuration looks like the following:

```yaml
interval: 30 # interval in secondes
slack:
  webbhook: https://your-webhoook
  channel: your-chanel-name
endpoints:
  - url: http://localhost:8080
    username: basic-auth-user
    password: basic-auth-password
```

Currently only `Basic Auth` is supported.
