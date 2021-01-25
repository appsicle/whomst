const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
var io = require('socket.io')(server);
var log4js = require("log4js");
var logger = log4js.getLogger("server.js");
logger.level = "debug"; // trace, debug, info, warn, error, fatal


app.use(express.static("public"));
app.use(cors());

TEMP_GLOBAL_STATE = {
    socketIdToUsernameMap: {},
    games: {}
}
/*
{
    socketIdToUsernameMap: {
        "njf69h0sagf65": "joe"
    },
    games: {
        "room1" : {
            connectionState: {
                connectedUsers: [joe],
            },
            gameState: {
                mode: "leader deciding",
                activeUserId: "joe",
                roundTimeRemaining: "15seconds", 
                unchosenResponses : [4324, 1655, 721],
                chosenResponses : [
                    {userId: bbobobob, responseId: 12321}, 
                    {userId: XxSwortSlaterxX, responseId: 12321},	
                ]
            }	
        }
    }
}
*/

io.on('connection', function (socket) {
    logger.debug(`User with socketId "${socket.id}" connected`)

    require('./sockets/coreSocket').listen(io, socket);
    require('./sockets/sandboxSocket').listen(io, socket);
    require('./sockets/gameSocket').listen(io, socket);
    // require('./sockets/messageingSocket').listen(io, socket);

});

app.get("/", (req, res) => {
    logger.debug(`Get request hit`)

    res.status(200).send("Success");
})

server.listen(8000, () => {
    logger.info("listening on 8000");
});