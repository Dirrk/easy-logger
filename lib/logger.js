/**
 * Created by Derek Rada on 5/31/2014.
 */


var __global_logger = new Logger();
var __loggers = [];
var util = require('util');

/*** Logger Object
 *
 * @param options
 * @constructor
 *
 * options = {
 *
 *  file: null || an output file
 *  format: function to format || use standard
 *  level: 0 = TRACE, 1 = DEBUG, 2 = INFO, 3 = WARN, 4 = ERROR, 5 = FATAL, 6 = OFF // Trace shows all
 * }
 */
function Logger(options) {

    var __logger = this;
    var options = options || {};

    // go through options
    if (options.file) { // output is file not set up yet
        __logger.file = options.file;
        __logger.type = 'file';
        if (options.sync === true) {
            __logger.sync = true;
        } else {
            __logger.sync = false;
        }
    } // else standard output

    if (options.format != undefined && typeof options.format === 'function') {

        __logger.format = options.format;

    } else {
        __logger.format = easyLoggerStandardFormat;
    }
    __logger.level = options.level || 2; // INFO

    __logger.name = options.name || 'logger-' + Math.floor((Math.random() * 1000)).toString();

    __logger.trace = function trace() {

        if (__logger.level <= 0) {

            var caller = trace.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "TRACE";

                __logger.format(type, caller, text);


            }
        }
    };

    __logger.debug = function debug() {

        if (__logger.level <= 1) {

            var caller = debug.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "DEBUG";

                __logger.format(type, caller, text);
            }
        }
    };
    __logger.info = function info() {

        if (__logger.level <= 2) {

            var caller = info.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "INFO";

                __logger.format(type, caller, text);


            }
        }
    };
    __logger.log = function log() {

        if (__logger.level <= 2) {

            var caller = log.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "INFO";

                __logger.format(type, caller, text);


            }
        }
    };
    __logger.warn = function warn() {

        if (__logger.level <= 3) {

            var caller = warn.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "WARNING";

                __logger.format(type, caller, text);


            }
        }
    };
    __logger.error = function err() {

        if (__logger.level <= 4) {

            var caller = err.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "ERROR";

                __logger.format(type, caller, text);


            }
        }
    };
    __logger.fatal = function fatal() {

        if (__logger.level <= 5) {

            var caller = fatal.caller.toString();
            caller = (caller.substr('function '.length));
            caller = caller.substr(0, caller.indexOf('('));

            if (arguments.length > 0) {

                var text = util.format.apply(util.format, arguments);
                var type = "FATAL";

                __logger.format(type, caller, text);


            }
        }
    };

    __logger.stop = function stop() {
        __logger.info("%s has stopped logging", __logger.name);
        // close file
        // remove from list
    };

}
// JS EPOCH :: TYPE :: CallingFunction :: Message
function easyLoggerStandardFormat(aType, aCaller, aText) {

    if (!aCaller || aCaller.length < 1)
    {
        aCaller = "unknown";
    }
    console.log(new Date().toLocaleString("en-US") + ' :: '+ aType.toString() + ' :: ' + aCaller.toString() + ' :: ' + aText);

}

exports.startGlobal = function (options) {

    var options = options || {};
    options.name = 'global';
    __global_logger = new Logger(options);
    InsideLogger(__global_logger);
    return __global_logger;

};

exports.startLocal = function (options) {
    var l = new Logger(options);
    __loggers.push(l);
    InsideLogger(l);
    return l;
};

exports.logger = function (name) {

    if (name) {
        return getLogByName(name);
    } else {
        return __global_logger;
    }

};

function getLogByName(name) {
    for (var i = 0; i < __loggers.length; i++) {
        if (__loggers[i].name.toLowerCase() == name.toLowerCase()) {
            return __loggers[i];
        }
    }
    if (__global_logger) {
        return __global_logger;
    } else {
        return exports.startGlobal();
    }
}

function InsideLogger(logg) {
    logg.info("%s has started logging", logg.name);
}

exports.debug = __global_logger.debug;
exports.log = __global_logger.log;
exports.info = __global_logger.info;
exports.warn = __global_logger.warn;
exports.error = __global_logger.error;
exports.fatal = __global_logger.fatal;
exports.trace = __global_logger.trace;
