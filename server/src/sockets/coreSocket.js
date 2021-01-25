var log4js = require("log4js");
var logger = log4js.getLogger("coreSocket.js");
logger.level = "debug"; // trace, debug, info, warn, error, fatal

// All misc socket things
module.exports.listen = function (io, socket) {

    // Trace all incoming client emits
    socket.use((socket, next) => {
        logger.trace(`Recieved emit on topic "${socket[0]}" with data "${JSON.stringify(socket[1])}"`)
        next()
    })

    socket.on('disconnect', socket => {
        logger.debug(`User with socketId ${socket.id} disconnected`);
    });
};


