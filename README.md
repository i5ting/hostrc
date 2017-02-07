# hostrc

> An alternate host-switch minimal solution of [SwitchHosts](https://github.com/oldj/SwitchHosts) && [multiple-host](https://github.com/liyangready/multiple-host)

## Features

- Declaration with hostrc config file
- Minimal dependency && Quick installation
- No dns cache && live-refresh
- Support http && https proxy
- Support cli && api usages

## Install 

> npm install --save hostrc

## Usages

touch hostrc(default config file)

```
127.0.0.1 qunarzz.com
127.0.0.1 q.qunarzz.com
```

### cli

read default config file from process.pwd() + '/hostrc' && start 

install as binary module

> $ [sudo] npm i -g hostrc

use in cli

> $ hrc or hostrc

### api

open brower with blank url

```js
require('hostrc')('./hostrc')
```

open brower with default url 

```js
require('hostrc')('./hostrc2', '127.0.0.1:3000')
```