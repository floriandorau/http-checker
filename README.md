# http-checker

## Configuration

To use `http-checker` you first need to create `config.yml` at `{HOMEDIR}/.http-checker/config.yml`;

A validd configuration looks like the following:

```yaml
interval: 30 # interval in secondes
endpoints:
  - url: http://localhost:8080
    username: basic-auth-user
    password: basic-auth-password
```

Currently only `Basic Auth` is supported.
