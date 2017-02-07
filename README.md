# hostrc

Features

- minimal dependency
- no dns cache
- support http && https proxy

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