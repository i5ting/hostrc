#!/usr/bin/env node

require('./')()

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
