import { userChatStore } from "../store/chatStore";

interface MessageProps {
  message: string;
  username: string;
  time: string;
}

export default function Message({ message, username, time }: MessageProps) {
  const { username: currentUser } = userChatStore();
  const isOwnMessage = currentUser === username;

  return (
    <div className={`flex w-full ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="inline-flex max-w-[75%] flex-col">
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} gap-1`}>
          <div className={`rounded-md px-3 py-2 ${isOwnMessage ? 'bg-white text-black' : 'bg-yellow-300 text-black'}`}>
            <div className="text-xs font-bold text-gray-700">
              {username.toUpperCase()}
            </div>
            <span>{message}</span>
          </div>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
}
