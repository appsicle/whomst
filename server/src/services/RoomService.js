
const createRoom = (data) => {
    TEMP_GLOBAL_STATE.games[data.roomName] = {
        connectionState: {
            connectedUsers: [data.username]
        },
        gameState: {
            mode: "lobby"
        }
    }

    return TEMP_GLOBAL_STATE.games[data.roomName];
}

const joinRoom = (data) => {
    // TODO: throw error if game already started

    TEMP_GLOBAL_STATE.games[data.roomName].connectionState.connectedUsers.push(data.username)

    return TEMP_GLOBAL_STATE.games[data.roomName];
}

module.exports = { createRoom, joinRoom };