import { useEffect, useRef } from "react";
import { userChatStore } from "../store/chatStore";

export function useWebsocket(){
    const socketRef = useRef<WebSocket | null>(null);
    const{
        generatedRoomId,
        username,
        addMessage,
        setUsersCount
    } = userChatStore();

    useEffect(() => {

        const socket = new WebSocket(`wss://api-websocket-npx8.onrender.com`);
        socketRef.current = socket
        
        socket.onopen = () => {
        console.log("Websocket connected");

        socket.send(JSON.stringify({
            type : "join",
            payload : {
                roomId : generatedRoomId,
                username : username
            }
        }))
       }

       socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if(data.type === "chat"){
             const istTime = new Date().toLocaleString("en-IN", {
             timeZone: "Asia/Kolkata",
             hour: '2-digit',
             minute: '2-digit',
             second: '2-digit',
              });
            addMessage({
                id : Date.now().toLocaleString(),
                username : data.payload.name,
                message : data.payload.message,
                time : istTime
            })
        }

        if(data.type === "user_count"){
            setUsersCount(data.payload.userCount)
        }
       }

       socket.onclose = () => {
        console.log("Websocket closed");
       }  

       return () => {
        socket.close()
       }
    },[generatedRoomId,username])

    const sendMessage = (msg:string) => {
        if(socketRef.current?.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({
                type : "chat",
                payload : {
                    username,
                    message : msg
                }
            }))
        }
    }
    return {sendMessage}
}