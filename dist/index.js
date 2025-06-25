"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    console.log(wss.clients.size + " User Connected to the Server");
    socket.send(JSON.stringify({
        serverMessage: "Hello welcome to the server"
    }));
    socket.on("message", (message) => {
        // console.log("Your message is : " + message.toString());
        // socket.send(message.toString())
        var _a;
        const parseMessage = JSON.parse(message.toString());
        if (parseMessage.type == "join") {
            const existingUser = allSockets.find(u => u.roomId === parseMessage.payload.roomId &&
                u.username === parseMessage.payload.username &&
                u.socket === socket);
            if (!existingUser) {
                allSockets.push({
                    roomId: parseMessage.payload.roomId,
                    username: parseMessage.payload.username,
                    socket
                });
                console.log(allSockets.map(user => `${user.username} (room : ${user.roomId})`));
            }
        }
        const roomUsers = allSockets.filter((u) => u.roomId === parseMessage.payload.roomId);
        const uniqueUsername = Array.from(new Set(roomUsers.map(user => user.username)));
        let user_connection_count = uniqueUsername.length;
        // console.log("Current user connected : " +user_connection_count);
        //  roomUsers.map(user => user.username): gets an array of usernames in the room.
        //  new Set(...): removes any duplicate usernames (in case the same user has multiple connections).
        //  Array.from(...): converts the Set back to an array.
        roomUsers.forEach(u => {
            u.socket.send(JSON.stringify({
                type: "user_count",
                payload: {
                    userCount: user_connection_count,
                    username: uniqueUsername
                }
            }));
        });
        if (parseMessage.type === "chat") {
            const userroomId = (_a = allSockets.find((e) => e.socket === socket)) === null || _a === void 0 ? void 0 : _a.roomId;
            const time = new Date().toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
            allSockets.forEach((u) => {
                if (u.roomId == userroomId) {
                    u.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: parseMessage.payload.message,
                            name: parseMessage.payload.username,
                            time: time
                        }
                    }));
                }
            });
            console.log(`${parseMessage.payload.message} , ${parseMessage.payload.username} , ${time}`);
        }
    });
});
