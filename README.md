# http-checker

## Run it

### As npm package

The easiest way to run `http-checker` is to install as global `npm` package like the following

```bash
npm install -g @floriandorau/http-checker
```

After you installed it you can execute `http-checker` in your terminal.

### From srouce

Checkout the repository and run `npm install` from root. Aftetr that you can run `npm start` from your terminal.

## Configuration

But you can run `http-checker` you first need to create `config.yml` at `{HOMEDIR}/.http-checker/config.yml`;

A valid configuration looks like the following:

```yaml
interval: 30 # interval in secondes
endpoints:
  - url: http://localhost:8080
    username: basic-auth-user
    password: basic-auth-password
```

Currently only `Basic Auth` is supported.
