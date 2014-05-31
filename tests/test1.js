/**
 * Created by Derek Rada on 5/31/2014.
 */

var easylog = require('../lib/logger');

console.log("Required");

var logger = easylog.startGlobal();


function test() {
    logger.log('I am inside test %d %j',4,{ test: 'test'});
    logger.error('This is an error!');
    test2();
}

test();


function test2() {

    var logger1 = easylog.startLocal({ name: 'test123'});
    logger1.warn("This is a warning");
}

