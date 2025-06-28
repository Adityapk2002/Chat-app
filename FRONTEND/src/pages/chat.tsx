import { useEffect, useRef } from "react";
import { userChatStore } from "../store/chatStore";
import { Copy, LogOut, MessagesSquare, SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatPage(){
    const {
        generatedRoomId : roomId ,
        joinedStatus ,
        currentMessageDetails,
        username,
        userCount
    } = userChatStore()
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(messageEndRef.current){
            messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
        }
    },[currentMessageDetails])

    
    return(
        <>
        <div className="flex bg-black text-white items-center h-screen w-full flex-col">
            <div className="flex font-extrabold text-5xl mt-3 items-center gap-4">
                <MessagesSquare
                 className="h-15 w-15"/>
                LUME
            </div>

            <div className="flex justify-between bg-white/20 text-white w-90 rounded-xl items-center mt-5">
             <div className="flex flex-col ">
                 <div className="flex items-center">
                   <span className="px-3 py-2 text-gray-300">Room : {roomId} </span>
                  { roomId && (
                    <Copy
                    onClick={async() => {
                    await navigator.clipboard.writeText(roomId);
                    toast.success("RoomId Copied Sucessfully");
                   }} 
                   className="w-5 text-gray-300 flex items-center h-5 cursor-pointer"/>
                   )}
                 </div>
                <span className="px-3 pb-2 text-gray-300">Users : {userCount}</span>
             </div>

             <div className="flex items-end flex-col">
                <span className="px-5 text-yellow-400 font-bold text-[18px] mb-2">Aditya</span>
                <span className="px-5 flex gap-2 items-center text-gray-300">
                    <LogOut 
                      onClick={() => {}}
                      className="w-5 h-5 cursor-pointer hover:text-red-500"/>
                     Exit</span>
              </div>
            </div>

        <div className="flex flex-col">
            <div className="w-90 border border-white mt-5 rounded-xl" style={{ height: 'calc(100vh - 18rem)' }}>

            </div>

            <div className=" mt-5 w-90 relative">
                <input 
                type="text"
                placeholder="Type Message"
                 className="w-full h-14 pl-4 pr-14 border border-white rounded-xl bg-black/10 text-white
               placeholder:text-gray-400 focus:outline-none"
                />
                <button 
                    className=" absolute inset-y-0 right-0 my-auto mr-2 flex items-center justify-center
                              h-10 w-10 rounded-full bg-white hover:bg-gray-200 transition"    >
                    <SendHorizontal className="h-6 z-6 text-black"/>
                    </button>
            </div>
        </div>


        </div>

        </>
    )
}
