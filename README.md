# Ethereum Signature API on Cloudflare Workers

Trying to experiment Ethereum Signature API on a Serverless environment.

### Demo

You can try this API on browser or your CLI.

[Try this API on browser](eth-sig.surge.sh)

```
curl -X POST -H "Content-type: application/json" \
-d '{"data":[{"type":"string","name":"Message","value":"Hi, Alice!"},{"type":"uint32","name":"A number","value":"1337"}],"sig":"0x039209b57071269bfc76fc0b2ee18b6a4b2e1901f46165dc6aee1d5820bfef44236e3636f2b7f36e8c8d992548216eeb9bdcd97a2d281ebbe542628f9338e33f1c"}' \
'https://ethereum-typed-singnature-recover-worker.fwei.workers.dev/get-signer'
```


#### Wrangler

To deploy using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler publish
```

#### Serverless

To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
