var log4js = require("log4js");
var logger = log4js.getLogger("RoomService.js");
logger.level = "debug"; // trace, debug, info, warn, error, fatal

const createRoom = (data) => {
    logger.trace(`Called createRoom, params: ${JSON.stringify(data)}`)
    logger.debug(`Pre-OP: status of room ${data.roomName}: ${TEMP_GLOBAL_STATE.games[data.roomName]}`)


    logger.info(`Creating a new room ${data.username}`)
    TEMP_GLOBAL_STATE.games[data.roomName] = {
        connectionState: {
            connectedUsers: [data.username]
        },
        gameState: {
            mode: "lobby"
        }
    }


    logger.debug(`Post-OP: status of room ${data.roomName}: ${TEMP_GLOBAL_STATE.games[data.roomName]}`)
    return TEMP_GLOBAL_STATE.games[data.roomName];
}

const joinRoom = (data) => {
    // TODO: throw error if game already started
    logger.trace(`Called joinRoom, params: ${JSON.stringify(data)}`)
    logger.debug(`Pre-OP: connected users for room ${data.roomName}: ${TEMP_GLOBAL_STATE.games[data.roomName].connectionState.connectedUsers}`)


    logger.info(`Adding ${data.username} to room ${data.roomName}`)
    TEMP_GLOBAL_STATE.games[data.roomName].connectionState.connectedUsers.push(data.username)

    
    logger.debug(`Post-OP: connected users for room ${data.roomName}: ${TEMP_GLOBAL_STATE.games[data.roomName].connectionState.connectedUsers}`)
    return TEMP_GLOBAL_STATE.games[data.roomName];
}

module.exports = { createRoom, joinRoom };