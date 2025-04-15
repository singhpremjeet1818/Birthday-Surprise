import { motion } from "framer-motion";
import React, { SetStateAction } from "react";
const Butterfly = ({
  touched,
  setIsTouched,
}: {
  touched: boolean;
  setIsTouched: React.Dispatch<SetStateAction<boolean>>;
}) => {
  

  return (
    <motion.div
      initial={{ x: "100vw", y: 300}}
      animate={{ x: 0, y: [0,-25,0] }}
      exit={{ x: "-100vw" }}
      transition={{
        x: { duration: 10, ease: "linear" },
        y: {
          duration: 0.7,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        perspective: "1000px",
      }}
      className={`absolute  z-50 cursor-grab scale-x-[-1]`}
      onClick={() => {
        setIsTouched(false);
        console.log(touched);
      }}
    >
      <div
        style={{
          transform: "rotateX(-25deg) rotateZ(-10deg)", // ← camera tilt to "look up"
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        className=""
        onClick={() => {
          setIsTouched(false);
          console.log(touched);
        }}
      >
        <div onClick={()=>{setIsTouched(false);console.log(touched)}} className="origin-center animate-fly1">
          <div className="butterfly-upperwing"></div>
          <div className="butterfly-lowerwing rotate-90"></div>
        </div>
        <div onClick={()=>{setIsTouched(false);console.log(touched)}} className="origin-center animate-fly2">
          <div className="butterfly-upperwing"></div>
          <div className="butterfly-lowerwing rotate-90"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Butterfly;
