"use strict";
// import { WebSocket, WebSocketServer } from "ws";
// const wss = new WebSocketServer({port : 8080});
// const subscriptions : {[key : string]: {
//     ws : WebSocket , 
//     rooms : string[]
// }} = {
// }
// wss.on("connection" , (socket) => {
//     console.log("User Connected");
//     const id = random();
//     subscriptions[id] = {
//          ws : socket , 
//          rooms : [] //this means user not yet subscribe to any room
//     }
//     setInterval(() => {
//         console.log(subscriptions);
//     },5000 );
//     socket.on("message" , (data) => {
//         const parseMesaage = JSON.parse(data as unknown as string);
//         if(parseMesaage.type === "SUBSCRIBE"){
//             subscriptions[id].rooms.push(parseMesaage.room);
//         }
//         if(parseMesaage.type === "UNSUBSCRIBE"){
//             subscriptions[id].rooms = subscriptions[id].rooms.filter(x => x !== parseMesaage.room)
//         }
//         if(parseMesaage.type === "sendMessage"){
//             const message = parseMesaage.message;
//             const roomId = parseMesaage.roomId;
//            Object.keys(subscriptions).forEach((userId) => {
//             const {ws , rooms} = subscriptions[userId];
//             if(rooms.includes(roomId)){
//                 ws.send(message)
//             }
//            })
//          }
//     })
// })
// function random(){
//     return Math.random();
// }
