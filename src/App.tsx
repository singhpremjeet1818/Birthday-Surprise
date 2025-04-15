import "./App.css";
import "./index.css";
import "./Leaf.scss";
import patch from "./assets/grasspatch.svg";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { easeOut } from "motion";
import Butterfly from "./Butterfly";
// import FlatButterfly from "./FlatButterfly";
import Page from "./Page";
import sound from "./assets/partypopper.mp3";
import ConfettiBlast from "./Confetti";
import Balloon from "./Balloon";
const App = () => {
  const canvasRef = useRef<any>(null);
  const [touched, setIsTouched] = useState(true);
  const [firstPage, setFirstPage] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    console.log(touched);
    setTimeout(() => {
      if (!touched){ 
        setFirstPage(false);
        playAudio();
        setTimeout(()=>{

          playAudio()
        },500)
      }
    }, 7000);
  }, [touched]);
  const playAudio = () => {
    console.log(audioRef.current);
    if (audioRef.current) audioRef.current.play();
    else alert("No initiation");
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    //@ts-ignore
    let stars = [];
    //@ts-ignore
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          blinkSpeed: 0.01 + Math.random() * 0.02,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //@ts-ignore
      for (let star of stars) {
        star.alpha += star.blinkSpeed * (Math.random() < 0.5 ? -1 : 1);
        star.alpha = Math.max(0, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }
    };

    const animate = () => {
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      //@ts-ignore
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  useEffect(() => {
    audioRef.current = new Audio(sound);
  }, []);
  return (
    <div className="max-h-screen overflow-hidden">
     
        {firstPage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: easeOut, duration: 0.3, delay: 0 }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 0%, rgba(255, 255, 200, 0.15) 0%, transparent 40%),linear-gradient(to top right, #000, #000,  #24243e)",
            }}
            className="max-h-screen h-screen overflow-hidden relative flex items-end justify-center origin-top"
          >
            <canvas ref={canvasRef} className="fixed top-0 left-0 z-0" />
            {/* <FirefliesCanvas/> */}
            {/* <motion.img className='rotate-12 ml-16 mt-10' src={blade}/> */}

            <motion.img
              src="https://cdn.mos.cms.futurecdn.net/xXp45gLeBTBt4jPuZcawUJ-1200-80.jpg"
              className="absolute -top-12 right-16 w-40  mix-blend-lighten"
              alt=""
            />
            {[
              {
                top: -48,
                right: -100,
                scale: false,
                rounded: false,
                width: 240,
              },
              { top: -64, right: 0, scale: false, rounded: true, width: 256 },
              { top: -80, right: -60, scale: true, rounded: true, width: 240 },
              {
                top: -40,
                right: -140,
                scale: false,
                rounded: false,
                width: 350,
              },
              { top: -64, right: 180, scale: false, rounded: true, width: 240 },
              { top: -80, right: 250, scale: true, rounded: true, width: 300 },
              { top: 0, right: 300, scale: true, rounded: true, width: 250 },
              {
                top: -20,
                right: 370,
                scale: false,
                rounded: "50px",
                width: 240,
              },
              { top: -48, right: 400, scale: true, rounded: true, width: 240 },
            ].map((cloud, i) => (
              <motion.img
                key={i}
                initial={{ x: 0 }}
                animate={{ x: "-100vw" }}
                transition={{
                  duration: 500 + i * 10,
                  ease: "linear",
                  repeat: Infinity,
                }}
                src="https://images.pond5.com/night-dark-asperitas-storm-clouds-footage-083667737_iconl.jpeg"
                alt=""
                style={{
                  position: "absolute",
                  top: `${cloud.top}px`,
                  right: `${cloud.right}px`,
                  width: `${cloud.width}px`,
                  mixBlendMode: "lighten",
                  opacity: 0.2,
                  transform: cloud.scale ? "scaleX(-1)" : undefined,
                  borderRadius:
                    typeof cloud.rounded === "string"
                      ? cloud.rounded
                      : cloud.rounded
                      ? "9999px"
                      : undefined,
                }}
              />
            ))}

            <div className="-translate-y-32 -translate-x-0 ">
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 0.25 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 2 }}
                className="relative size-[100px] cursor-pointer opacity-25"
              >
                <motion.div className="grassblade--2 left-7 -rotate-12"></motion.div>
                <motion.div className="grassblade--1  -left-32 "></motion.div>
                <motion.div className="grassblade--3 left-3 -top-[60px] "></motion.div>
                <motion.div className="grassblade--4 -left-40 -top-[300px]"></motion.div>
                <motion.div className="grassblade--3 -left-3 -top-[200px] rotate-6"></motion.div>
                <motion.div className="grassblade--1 -left-44 -top-[150px] -rotate-6"></motion.div>
              </motion.div>
            </div>
            <div className="-translate-x-40 scale-75 -translate-y-14">
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
                className="relative size-[100px] cursor-pointer"
              >
                <motion.div className="grassblade--2 left-7 -rotate-12"></motion.div>
                <motion.div className="grassblade--1  -left-32 "></motion.div>
                <motion.div className="grassblade--3 left-3 -top-[60px] "></motion.div>
                <motion.div className="grassblade--4 -left-40 -top-[300px]"></motion.div>
                <motion.div className="grassblade--3 -left-3 -top-[200px] rotate-6"></motion.div>
                <motion.div className="grassblade--1 -left-44 -top-[150px] -rotate-6"></motion.div>
              </motion.div>
            </div>
<div className="absolute bottom-0 left-1/2 w-40 -translate-x-20">

            <motion.div
              initial={{ y: "150%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ ease: easeOut, duration: 1, delay: 0.8 }}
              className="absolute bottom-6 left-0 -rotate-[25deg] z-50"
              >
              <div style={{}} className=" small-stem">
                <div className="w-[30px] h-[30px] small-leaf absolute -top-5"></div>
                <div className=" small-leaf absolute top-2"></div>
                <div className="w-[45px] h-[45px] small-leaf absolute top-10"></div>
                <div className="w-[53px] h-[53px] small-leaf absolute top-20"></div>
                <div className="w-[30px] h-[30px] small-leaf absolute -top-5 scale-x-[-1] -left-[30px]"></div>
                <div className=" small-leaf absolute top-2 scale-x-[-1] -left-[38px]"></div>
                <div className="w-[45px] h-[45px] small-leaf absolute top-10 scale-x-[-1] -left-[46px]"></div>
                <div className="w-[53px] h-[53px] small-leaf absolute top-20 scale-x-[-1] -left-[54px]"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: "150%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ ease: easeOut, duration: 1, delay: 1 }}
              className="absolute bottom-6 right-0 rotate-[25deg] z-0 "
              >
              <div style={{}} className=" small-stem--4">
                <div className="w-[30px] h-[30px] small-leaf absolute -top-5"></div>
                <div className=" small-leaf absolute top-2"></div>
                <div className="w-[45px] h-[45px] small-leaf absolute top-10"></div>
                <div className="w-[53px] h-[53px] small-leaf absolute top-20"></div>
                <div className="w-[30px] h-[30px] small-leaf absolute -top-5 scale-x-[-1] -left-[30px]"></div>
                <div className=" small-leaf absolute top-2 scale-x-[-1] -left-[38px]"></div>
                <div className="w-[45px] h-[45px] small-leaf absolute top-10 scale-x-[-1] -left-[46px]"></div>
                <div className="w-[53px] h-[53px] small-leaf absolute top-20 scale-x-[-1] -left-[54px]"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: "150%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ ease: easeOut, duration: 1, delay: 0.8 }}
              className="absolute bottom-0 left-1/2 rotate-[6deg] z-20 "
              >
              <div style={{}} className=" small-stem--3 ">
                <div className="w-[38px] h-[38px] small-leaf--2 absolute -top-2 left-0"></div>
                <div className="w-[45px] h-[45px] small-leaf--2 absolute top-5"></div>
                <div className="w-[53px] h-[53px] small-leaf--2 absolute top-14"></div>
                <div className="w-[60px] h-[60px] small-leaf--2 absolute top-24"></div>
                <div className="w-[38px] h-[38px] small-leaf--2 absolute -top-5 scale-x-[-1] -left-[35px]"></div>
                <div className="w-[45px] h-[45px] small-leaf--2 absolute top-2 scale-x-[-1] -left-[42px]"></div>
                <div className="w-[53px] h-[53px] small-leaf--2 absolute top-10 scale-x-[-1] -left-[50px]"></div>
                <div className="w-[60px] h-[60px] small-leaf--2 absolute top-20 scale-x-[-1] -left-[60px]"></div>
              </div>
            </motion.div>
              </div>
            <div className="flower-stem flex -left-20 -top-28 relative">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ ease: easeOut, duration: 1 }}
                className="absolute bottom-[20%] -left-10 -rotate-12 z-0"
              >
                <div className="relative h-[40vh] w-[50px]">
                  <div
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255,255,255,0) 10%, #159faa 100%)",
                    }}
                    className="h-[500px] w-[8px] absolute z-10"
                  >
                    <div className="z-10 w-[40px] h-[40px] bg-white rounded-full rotate-x-[70deg] -top-5 absolute -left-4">
                      <div className="z-10 absolute size-[25px] rounded-full rotate-x-[50deg] left-[7px] top-1 pollen"></div>

                      <div className="petal dot4 z-50"></div>
                    </div>
                    <div className=" rotate-x-[60deg] ">
                      <div className="relative w-full h-full ">
                        <div className="petal dot1"></div>
                        <div className="petal dot2 z-0"></div>
                        <div className="petal dot3"></div>
                      </div>
                    </div>

                    <div className="leaf absolute top-10 -left-[45px] -z-10"></div>
                    <div className="leaf leaf--2 absolute top-20 left-[7px] -z-10"></div>
                    <div className="leaf leaf--3 absolute top-40 -left-[45px] -z-10"></div>
                    {/* <div className="leaf leaf--4 absolute top-60 left-[7px] -z-10 scale-x-[-1]"></div> */}
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ ease: easeOut, duration: 1, delay: 0.6 }}
                className="absolute bottom-10 -right-24 rotate-0"
              >
                <AnimatePresence>
                  {touched && (
                    <Butterfly touched={touched} setIsTouched={setIsTouched} />
                  )}
                </AnimatePresence>
                <div className="relative h-[40vh] w-[50px]">
                  <div
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255,255,255,0) 10%, #159faa 100%)",
                    }}
                    className="h-[500px] w-[8px] absolute z-10"
                  >
                    <div className="z-10 w-[40px] h-[40px] bg-white rounded-full rotate-x-[70deg] -top-5 absolute -left-4">
                      <div className="z-10 absolute size-[25px] rounded-full rotate-x-[50deg] left-[7px] top-1 pollen"></div>

                      <div className="petal dot4 z-50"></div>
                    </div>
                    <div className=" rotate-x-[60deg] ">
                      <div className="relative w-full h-full ">
                        <div className="petal dot1"></div>
                        <div className="petal dot2 z-0"></div>
                        <div className="petal dot3"></div>
                      </div>
                    </div>

                    <div className="leaf absolute top-10 -left-[45px] -z-10"></div>
                    <div className="leaf leaf--2 absolute top-20 left-[7px] -z-10"></div>
                    <div className="leaf leaf--3 absolute top-40 -left-[45px] -z-10"></div>
                    {/* <div className="leaf leaf--4 absolute top-60 left-[7px] -z-10 scale-x-[-1]"></div> */}
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ ease: easeOut, duration: 1, delay: 0.3 }}
                className="absolute bottom-[10%] -right-48 rotate-12"
              >
                <div className="relative h-[40vh] w-[50px]">
                  <div
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255,255,255,0) 10%, #159faa 100%)",
                    }}
                    className="h-[500px] w-[8px] absolute z-10"
                  >
                    <div className="z-10 w-[40px] h-[40px] bg-white rounded-full rotate-x-[70deg] -top-5 absolute -left-4">
                      <div className="z-10 absolute size-[25px] rounded-full rotate-x-[50deg] left-[7px] top-1 pollen"></div>

                      <div className="petal dot4 z-50"></div>
                    </div>
                    <div className=" rotate-x-[60deg] ">
                      <div className="relative w-full h-full ">
                        <div className="petal dot1"></div>
                        <div className="petal dot2 z-0"></div>
                        <div className="petal dot3"></div>
                      </div>
                    </div>

                    <div className="leaf absolute top-10 -left-[45px] -z-10"></div>
                    <div className="leaf leaf--2 absolute top-20 left-[7px] -z-10"></div>
                    <div className="leaf leaf--3 absolute top-40 -left-[45px] -z-10"></div>
                    {/* <div className="leaf leaf--4 absolute top-60 left-[7px] -z-10 scale-x-[-1]"></div> */}
                  </div>
                </div>
              </motion.div>
            
            </div>
            <div className="relative">
              <div className="translate-x-48 absolute -translate-y-10">
                <motion.div
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.25 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 2 }}
                  className="relative size-[100px] cursor-pointer opacity-25"
                >
                  <motion.div className="grassblade--2 left-7 -rotate-12"></motion.div>
                  <motion.div className="grassblade--1  -left-32 "></motion.div>
                  <motion.div className="grassblade--3 left-3 -top-[60px] "></motion.div>
                  <motion.div className="grassblade--4 -left-40 -top-[300px]"></motion.div>
                  <motion.div className="grassblade--3 -left-3 -top-[200px] rotate-6"></motion.div>
                  <motion.div className="grassblade--1 -left-44 -top-[150px] -rotate-6"></motion.div>
                </motion.div>
              </div>
              <div className="translate-x-40 scale-75">
                <motion.div
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
                  className="relative size-[100px] cursor-pointer"
                >
                  <motion.div
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 2 }}
                    className="grassblade--2 left-7 -rotate-12"
                  ></motion.div>
                  <motion.div className="grassblade--1  -left-32 test"></motion.div>
                  <motion.div className="grassblade--3 left-0 -top-[60px] "></motion.div>
                  <motion.div className="grassblade--4 -left-40 -top-[300px]"></motion.div>
                  <motion.div className="grassblade--3 -left-3 -top-[200px] rotate-6"></motion.div>
                  <motion.div className="grassblade--1 -left-44 -top-[150px] -rotate-6"></motion.div>
                </motion.div>
              </div>
            </div>
            <div className="fixed bottom-0 w-[100vw]">
              <img src={patch} alt="" className="w-full" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            
            className="heading h-screen text-[100px] flex justify-center overflow-hidden relative wood-table w-screen"
          >
            <canvas ref={canvasRef} className="fixed top-0 left-0 z-10" />
            <div className="cloth-heart absolute left-0"></div>
            <svg width="0" height="0">
              <filter id="wrinkle">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="turb"
                />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="6" />
              </filter>
            </svg>
            <div className="cloth-heart absolute right-0"></div>
            <svg width="0" height="0">
              <filter id="wrinkle">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="turb"
                />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="6" />
              </filter>
            </svg>
            <div className="absolute left-0">
              <Balloon color="red" left={0} bottom={700} delay={0} />
              <Balloon color="blue" left={80} bottom={750} delay={0.5} />
              <Balloon color="green" left={128} bottom={650} delay={0.8} />
              <Balloon color="yellow" left={40} bottom={720} delay={0.3} />
            </div>
            <div className="absolute right-0 scale-x-[-1]">
              <Balloon color="red" left={0} bottom={700} delay={0} />
              <Balloon color="blue" left={80} bottom={750} delay={0.5} />
              <Balloon color="green" left={128} bottom={650} delay={0.8} />
              <Balloon color="yellow" left={40} bottom={720} delay={0.3} />
            </div>
            <Page />

<div className="scale-x-[-1]">

            <ConfettiBlast />
</div>
            <ConfettiBlast />
          </motion.div>
        )}
    </div>
  );
};

export default App;
