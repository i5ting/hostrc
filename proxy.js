var fs = require('fs')
var http = require('http')
var url = require('url')
const net = require('net')

var debug = require('debug')('dothost')
var port

// #默认组
// 127.0.0.1 qunarzz.com
// 127.0.0.1 q.qunarzz.com

module.exports = function (cb) {
    var requestOptions = {}
    // create proxy server
    var server = http.createServer(function (req, res) {
        if (req.url === '/favicon.ico') {
            return
        }

        var originhost = req.headers.host.split(':')[0]
        var port = req.headers.host.split(':')[1] || 80
        var host = originhost
        
        console.log(req.url.split('.'))

        if (req.url.split('.') && req.url.split('.').length === 1) {
            console.log('invalid')
            return
        } else {
            console.log(req.url)

            if (global.hostMappingObject && global.hostMappingObject[originhost]) {
                host = global.hostMappingObject[originhost]
            }
            console.log("ok = " + global.hostMappingObject[originhost])
            // console.log(global.hostMappingObject[global.hostMappingObject[host]])

            console.log("ok = " + host)
        }

        var path = req.headers.path || url.parse(req.url).path

        requestOptions = {
            host: host,
            port: port,
            path: path,
            method: req.method,
            headers: req.headers
        }

        if (global.hostMappingObject && global.hostMappingObject[requestOptions.host] && global.hostMappingObject[global.hostMappingObject[requestOptions.host]]) {
            debug(global.hostMappingObject[host])
            debug(global.hostMappingObject[global.hostMappingObject[host]])
            requestOptions.host = global.hostMappingObject[host]
        }

        console.log("requestOptions.host = " + requestOptions.host)

        try {
            var proxy = http.request(requestOptions, function (resProxy) {
                res.writeHead(resProxy.statusCode, resProxy.headers)
                resProxy.pipe(res)
            })

            req.pipe(proxy)

            proxy.setTimeout(300)

            proxy.on('error', function (err) {
                console.log(err)
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.write(err + "\n")
                res.end()

            })
        } catch (e) {
            console.log("requestHandlerError" + e.message)
        }
    })

    // for https
    server.on('connect', (req, cltSocket, head) => {
        // connect to an origin server
        var newUrl = url.parse(`http://${req.url}`)
        var port = newUrl.port
        var hostname = newUrl.hostname

        console.log("https hostname" + hostname)

        if (global.hostMappingObject && global.hostMappingObject[requestOptions.host] && global.hostMappingObject[global.hostMappingObject[requestOptions.host]]) {
            hostname = global.hostMappingObject[host]
        }

        console.log(hostname)
        debug(`CONNECT ${hostname}:${port}`)

        var socket = net.connect(port, hostname, () => {
            cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-agent: MITM-proxy\r\n' +
                '\r\n')

            socket.write(head)
            socket.pipe(cltSocket)
            cltSocket.pipe(socket)
        })

        socket.on('error', (e) => {
            console.error(e)
            socket.end()
            cltSocket.end()
        })
    })

    // server start
    server.listen(function () {
        port = this.address().port
        debug('Proxy listening on port', this.address().port)
        cb(port)
    })
}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie

    rc && rc.split('').forEach(function (cookie) {
        var parts = cookie.split('=')
        list[parts.shift().trim()] = decodeURI(parts.join('='))
    })

    return list
}
