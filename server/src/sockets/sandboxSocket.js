var log4js = require("log4js");
var logger = log4js.getLogger("sandboxSocket.js");
logger.level = "debug"; // trace, debug, info, warn, error, fatal

// core socket things
module.exports.listen = function (io, socket) {

    // demo callback
    socket.on('pingpong', (data, callback) => {
        logger.debug(`Client said: ${JSON.stringify(data)}`)
        callback("hello back")
    });

    socket.emit("hello", "yeeehaww")

};


