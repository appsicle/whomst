var log4js = require("log4js");
var logger = log4js.getLogger("gameSocket.js");
logger.level = "debug"; // trace, debug, info, warn, error, fatal


// all game logic socket states
module.exports.listen = function (io, socket) {
    socket.on("create-room", (data, callback) => {
        // validate data
        if (!data.username) {
            callback({ status: -1, msg: "username is missing" })
            return;
        }
        if (!data.roomName) {
            callback({ status: -2, msg: "roomname is missing" })
            return;
        }
        if (data.roomName in TEMP_GLOBAL_STATE.games) {
            callback({ status: -3, msg: `roomName ${data.roomName} already exists` })
            return;
        }

        // buisness logic
        TEMP_GLOBAL_STATE.socketIdToUsernameMap[socket.id] = data.username; // could be moved into a service 
        const roomData = RoomService.createRoom(data)

        // initial gamestate
        socket.emit("gameState", roomData)
        callback({ status: 0, msg: `` })    // TODO: Could default to not sending anything on success?
    })

    socket.on("join-room", data => {
        // validate data
        if (!data.username) {
            callback({ status: -1, msg: "username is missing" })
            return;
        }
        if (!data.roomName) {
            callback({ status: -2, msg: "roomname is missing" })
            return;
        }
        if (!data.roomName in TEMP_GLOBAL_STATE.games) {
            callback({ status: -4, msg: `roomName ${data.roomName} doesn't exist` })
            return;
        }

        // buisness logic
        TEMP_GLOBAL_STATE.socketIdToUsernameMap[socket.id] = data.username;
        const roomData = RoomService.joinRoom(data)

        // initial gamestate
        socket.emit("gameState", roomData)
        callback({ status: 0, msg: `` })
    })
};


