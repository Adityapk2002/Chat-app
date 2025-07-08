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

        const socket = new WebSocket(`ws://${window.location.hostname}:8080`);
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
            addMessage({
                id : Date.now(),
                username : data.payload.name,
                message : data.payload.message,
                time : data.payload.time
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