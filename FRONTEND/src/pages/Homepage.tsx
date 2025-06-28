
import { ClipboardCopy, Repeat2 } from 'lucide-react';
import cat from '../assets/cat.svg';
import { useRef, useState } from 'react';
import { generateCode } from '../utils/generatecode';
import { motion } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userChatStore } from '../store/chatStore';

export const Homepage= () => {
  const [roomId , setRoomid] = useState<string | null>(null);
  const [username , setUsername] = useState('')
  const [roomInput , setRoomInput] = useState('')

  const usernameRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);


  const handleCreateRoom = () => {
    const newId = generateCode(7);
    setRoomid(newId)

    toast.success("RoomId Generated", {
      duration : 2000,
      style : {fontWeight : 600}
    })
  };

  const handleKeyDown = (e : any) =>{
    if(e.key == "Enter"){
      e.preventDefault();
      roomInputRef.current?.focus()
    }
  }

const nav = useNavigate();

  const handleJoinRoom = () => {
  const success = roomInput.trim().length > 0 && username.trim().length > 0;
  if (success) {
    userChatStore.getState().setRoomId(roomInput);
    userChatStore.getState().setUsername(username);
    userChatStore.getState().setJoined(true);
    nav("/chat"); // navigate to chat page
    toast.success("Room Joined Successfully");
  } else {
    toast.error("Error in joining");
  }
};


  const headLine = "LUME"
  const letter = headLine.split("")

  return (
    <>
  
     <Toaster position="top-center" />

  <main className="min-h-screen flex items-center justify-center bg-black/90">
    <section className={`w-[22rem] rounded-xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] flex flex-col items-center
       pt-2 transition-all duration-500 ${roomId ? 'h-[32rem]' : 'h-[29rem]'}`}>
        <h1 className="flex justify-center gap-1 text-5xl text-neutral-500 font-extrabold">
          {letter.map((char, index) => (
            <motion.span
              key={index}
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      <p className="text-lg pt-2 text-neutral-400">Talk with everyone in real time</p>

      <img src={cat} alt="Cute cat mascot" className="w-44 h-44 my-4" />

      <button
        onClick={handleCreateRoom}
        type="button"
        className="w-80 px-3 py-1 text-black/70 border border-black rounded-2xl text-xl flex items-center gap-2 justify-center cursor-pointer hover:bg-neutral-800 hover:text-white">
            <Repeat2/>
        Create New Room
      </button>
      {
        roomId && (
          <button
           key={roomId}
           className='w-80 px-3 py-1 mt-3 border border-black rounded-2xl text-xl flex items-center gap-2 justify-center text-black/70'>
            {roomId} 
            <ClipboardCopy 
            onClick={() => {
              navigator.clipboard.writeText(roomId)
              toast.success(`Room ID is copied to clipboard : ${roomId} ` , {
                duration : 2000,
                style : {fontWeight : 600}
              }
                
              )
            }} 
            className='cursor-pointer text-black/70'/>
            </button>
        )
      }
      <input 
         type="text" 
         value={username}
         ref={usernameRef}
         onChange = {(e) => setUsername(e.target.value)} 
         placeholder='Username' 
         onKeyDown={handleKeyDown}
         className='w-80 border border-black rounded-2xl py-1 mt-3 px-3'/>

      <div className="flex gap-2 mt-3 w-80">
         <input
           type="text"
           value={roomInput}
           ref={roomInputRef}
           onChange={(e) => setRoomInput(e.target.value)}
           placeholder="Room ID"
           className="w-3/5 border border-black rounded-2xl py-1 px-3"

            />
        <button
         onClick={handleJoinRoom}
         className="w-2/5 border cursor-pointer text-black/70 border-black rounded-2xl py-1 px-3  hover:bg-neutral-800 hover:text-white">
         Join Room
         </button>
          </div>

    </section>
  </main>
  </>
  )
}
