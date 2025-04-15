import {motion, useAnimation} from 'framer-motion'
import { useEffect } from 'react';
type BalloonProps = {
    delay?: number;
    color: string;
    left: number;
    bottom: number;
  };
  
  const Balloon = ({ delay = 0,color,left,bottom }: BalloonProps) => {
    const controls = useAnimation();
  
    useEffect(() => {
      const sequence = async () => {
        // Rise up
        await controls.start({
          y: 0,
          x: [0, 10, -10, 0],
        rotate: [0, 5, -5, 0],
        opacity:1,
          transition: { duration: 4, ease: "easeOut", delay },
        });
  
        // Then sway
        controls.start({
          y: [0, -30, 0],
          x: [0, 15, -15, 0],
          rotate: [0, 5, -5, 0],
          opacity:1,
          transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay,
          },
        });
      };
  
      sequence();
    }, [controls, delay]);
  
    return (
      <motion.div
        initial={{ y: bottom, x: 0, rotate: 0,opacity:0 }}
        animate={controls}
        className={`balloon-wrapper ${color}`}
        style={{
            left: `${left}px`
        }}
      >
        <div className="balloon"></div>
        <div className="string"></div>
      </motion.div>
    );
  };
  
  export default Balloon;
  