# hostrc

> An alternate host-switch minimal solution of [SwitchHosts](https://github.com/oldj/SwitchHosts) && [multiple-host](https://github.com/liyangready/multiple-host)

[![npm version](https://badge.fury.io/js/hostrc.svg)](http://badge.fury.io/js/hostrc)

Thanks to [guankaishe](https://github.com/switer) for donating the npm package name!

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

### 1) cli

read default config file from process.pwd() + '/hostrc' && start 

install as binary module

> $ [sudo] npm i -g hostrc

use in cli

> $ hrc or hostrc

### 2) api

open brower with blank url

```js
require('hostrc')('./hostrc')
```

open brower with default url 

```js
require('hostrc')('./hostrc2', '127.0.0.1:3000')
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## History

- v1.0.0 init

## Welcome fork and feekback

- write by `i5ting` i5ting@126.com

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).