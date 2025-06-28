import { easeIn, easeInOut, easeOut, motion } from "framer-motion"

export function Loader(){
    return(
        <>
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        {[...Array(3)].map((_ , index) => (
          <motion.div key = {index} 
          className="w-8 h-8 bg-teal-500 rounded-full"
          animate = {{ y : [ 0 , -15 , 0]}}
          transition={{
            duration : 0.6,
            ease : "easeInOut",
            repeat : Infinity,
            repeatDelay : index * 0.3
          }}
            ></motion.div>
        ))}
       </div>
     </div>
        </>
    )
}