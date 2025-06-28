
export default function Message(){
    return(
        <>
        <div className="flex flex-col w-full ">
            <div className="inline-flex max-w-[75%] flex-col">
                <div className="flex flex-col items-end gap-1">
                   <div className="bg-white text-black rounded-md flex flex-end">
                     <div className="text-xs font-bold text-gray-700">
                        {/* {props.username.toUpperCase()} */}
                     </div>
                     {/* <span>{props.message}</span> */}
                   </div>
                   {/* <span className="text-xs text-gray-500">{props.time}</span> */}
                </div>
            </div>
               <div className="flex flex-col w-full ">
            <div className="inline-flex max-w-[75%] flex-col">
                <div className="flex flex-col items-start gap-1">
                   <div className="bg-white text-black rounded-md flex flex-end">
                     <div className="text-xs font-bold text-gray-700">
                        {/* {props.username.toUpperCase()} */}
                     </div>
                     {/* <span>{props.message}</span> */}
                   </div>
                   {/* <span className="text-xs text-gray-500">{props.time}</span> */}
                </div>
            </div>
        </div>
        </div>
        </>
    )
}