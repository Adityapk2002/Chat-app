import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import http from "http";

const app = express();
const PORT = 8080;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (_req, res) => {
    res.json({ message: "WebSocket server is on" });
});

interface UserConnection {
    roomId: string | number;
    username: string;
    socket: WebSocket;
}

let allSockets: UserConnection[] = [];

wss.on("connection", (socket: WebSocket) => {
    console.log(`${wss.clients.size} user(s) connected to the server`);

    socket.send(JSON.stringify({
        serverMessage: "Hello, welcome to the server"
    }));

    socket.on("message", (message) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message.toString());
        } catch (err) {
            console.error("Invalid message received:", message.toString());
            return;
        }

        const { type, payload } = parsedMessage;

        if (type === "join") {
            const existingUser = allSockets.find(
                u =>
                    u.roomId === payload.roomId &&
                    u.username === payload.username &&
                    u.socket === socket
            );

            if (!existingUser) {
                allSockets.push({
                    roomId: payload.roomId,
                    username: payload.username,
                    socket
                });

                console.log(allSockets.map(user => `${user.username} (room: ${user.roomId})`));
            }

            const roomUsers = allSockets.filter(u => u.roomId === payload.roomId);
            const uniqueUsernames = Array.from(new Set(roomUsers.map(user => user.username)));
            const userCount = uniqueUsernames.length;

            roomUsers.forEach(u => {
                u.socket.send(JSON.stringify({
                    type: "user_count",
                    payload: {
                        userCount,
                        username: uniqueUsernames
                    }
                }));
            });
        }

        if (type === "chat") {
            const userRoomId = allSockets.find(e => e.socket === socket)?.roomId;
            const time = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            allSockets.forEach(u => {
                if (u.roomId === userRoomId) {
                    u.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: payload.message,
                            name: payload.username,
                            time
                        }
                    }));
                }
            });

            console.log(`${payload.username}: ${payload.message} @ ${time}`);
        }
    });


    socket.on("close", () => {
        const userData = allSockets.find(u => u.socket === socket);
        if (!userData) return;

        const roomId = userData.roomId;
        allSockets = allSockets.filter(u => u.socket !== socket);
        const roomUsers = allSockets.filter(u => u.roomId === roomId);

        const uniqueUsernames = Array.from(new Set(roomUsers.map(user => user.username)));
        const userCount = uniqueUsernames.length;

        roomUsers.forEach(u => {
            u.socket.send(JSON.stringify({
                type: "user_count",
                payload: {
                    userCount,
                    roomId,
                    username: uniqueUsernames
                }
            }));
        });

        console.log(`User disconnected from room ${roomId}. Remaining users: ${userCount}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  //  roomUsers.map(user => user.username): gets an array of usernames in the room.
        //  new Set(...): removes any duplicate usernames (in case the same user has multiple connections).
        //  Array.from(...): converts the Set back to an array.