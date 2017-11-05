//
// Copyright (c) 2017 ChienYu Lin
//
// Author: ChienYu Lin <cy20lin@gmail.com>
// License: MIT
//

var mineflayer = require('mineflayer');
var console = require('console');
var readline = require('readline');
var reader = readline.createInterface({input:process.stdin, output:process.stdout});
var parseLine = require('minimist-string');

var bot = mineflayer.createBot({
    host: "localhost",
    port: 25565,
    username: "mcbot"
});

var timeoutObj;
var command = {
    '/exit' : {
        run : function() {
            console.log('exit');
            timeoutObj !== undefined && clearInterval(timeoutObj);
            bot.chat('Goodbye world!');
            bot.quit();
            reader.close();
        },
        description : 'exit this app'
    }
};

bot.on('login', function() {
    bot.chat("Hello world!");
    console.log("login");
});

bot.once('spawn', () => {
    timeoutObj = setInterval(() => {
        bot.chat('.');
    }, 1000*60*8);
});

bot.on('chat', function(username, message) {
    console.log('<' + username + '>', message);
});

bot.on('kicked', function(reason, loggedIn) {
    console.log("kicked", reason, loggedIn);
});

reader.on('line', function(line) {
    var result = parseLine(line);
    var keys = result._;
    if (keys.length == 1 &&
        command.hasOwnProperty(keys[0])) {
        command[keys[0]].run(result);
    }
});
