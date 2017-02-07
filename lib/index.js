var mkdirp = require('mkdirp');
var fs = require("fs");
var exec = require("child_process").exec;
const dirname = require('path').dirname

var file_path = __dirname;
var current_path = process.cwd();
var browerFolder = current_path + '/logs/browser'
var chromeFolder = __dirname + '/chrome'
var interval = 20

module.exports = function (hostrc, openUrl) {
    console.log(current_path)

    const _hostrc = hostrc || current_path + '/hostrc'

    var content = fs.readFileSync(_hostrc).toString().split(/\r?\n/ig)
    var obj = {}
    for (let i in content) {
        let item = content[i].split(/\s/)

        //log
        let origin = item[1]
        let rewrite = item[0]
        console.log(origin + ' to ' + rewrite)

        obj[origin] = rewrite
    }

    global.hostMappingObject = obj

    // console.log(content)

    require('./proxy')(function (port) {

        fs.writeFileSync(__dirname + '/chrome/js/port.js', "window.hostrc_port=" + port)

        mkdirp(browerFolder, function (err) {
            if (err) console.error(err)
            else console.log('create ' + browerFolder + ' !')
        });

        fs.watchFile(_hostrc, { interval: interval }, (curr, prev) => {
            console.log('watchFile changed')
            var content = fs.readFileSync(_hostrc).toString().split(/\r?\n/ig)
            var obj = {}
            for (let i in content) {
                let item = content[i].split(/\s/)

                //log
                let origin = item[1]
                let rewrite = item[0]
                console.log(origin + ' to ' + rewrite)

                obj[origin] = rewrite
            }

            global.hostMappingObject = obj

            // console.dir(faye)
            // open(openUrl)
            // faye.publish('/messages', {
            //     reload: true
            // });
        });

        open(port, openUrl);
    })
}

function open(port, openUrl) {
    if (openUrl) {
        openUrl = `--app=http://${openUrl}`
    } else {
        openUrl = `--app=http://local.qunar.com:3000/detail`
    }

    var command = `/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --proxy-server=http://127.0.0.1:${port}  --load-extension=${chromeFolder}  --user-data-dir=${browerFolder}  ${openUrl}`

    console.log(command)

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}