#!/usr/bin/env node

require('../lib')()

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
