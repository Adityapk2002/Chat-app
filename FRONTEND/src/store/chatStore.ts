import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ChatBubble{
    id : string | number,
    username : string,
    message : string,
    time : string
}

interface ChatState{
    generatedRoomId : string,
    joinedStatus : boolean,
    currentMessageDetails : ChatBubble[],
    username : string,
    userCount : number,

    setRoomId: (c: string) => void;
    setJoined: (j: boolean) => void;
    addMessage: (m: ChatBubble) => void;
    setUsername: (u: string) => void;
    setUsersCount: (n: number) => void;
    reset: () => void;
}

export const userChatStore = create<ChatState>()(
    immer<ChatState>((set,get) => ({
        generatedRoomId : '',
        joinedStatus : false,
        currentMessageDetails : [],
        username : '' ,
        userCount : 0,

        setRoomId : (c) => set({generatedRoomId : c}),
        setJoined : (j) => set({joinedStatus : j}),
        addMessage : (m) => set(s => {s.currentMessageDetails.push(m);}),
        setUsername : (u) => set({username : u}),
        setUsersCount : (n) => set({userCount : n}),
        reset : () => set({
            generatedRoomId : '',
            joinedStatus : false,
            currentMessageDetails : [],
            username : "",
            userCount : 0,
        })
    }))
)

// immer(...): Wraps the reducer function with Immer middleware.
// set: Function to update state.
// get: Function to access current state.

