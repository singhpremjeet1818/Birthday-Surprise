import {motion} from 'framer-motion'
import './Leaf.scss'
import './App.css'
import inkpot from './assets/inkpot.png'
import { easeOut } from 'motion'
const Page = () => {
  return (
    <motion.div
    initial={{opacity:0,y:100}} 
    animate={{opacity:1,y:0}} 
    transition={{duration:0.8,ease:easeOut}}
    className='mt-12 pb-20 h-[94vh] lg:w-[60vw] w-[95vw] old-paper heading rounded relative px-10 overflow-y-auto hide-scrollbar overflow-x-hidden z-20'>
      <motion.h1 initial={{opacity:0,y:50}} 
    animate={{opacity:1,y:0}} 
    transition={{duration:1,ease:easeOut,delay:0}} className='heading text-black text-center w-full text-[60px] sm:text-[80px] md:text-[100px]'>Happy Birthday</motion.h1>
      <motion.div initial={{opacity:0,y:100}} 
    animate={{opacity:1,y:0}} 
    transition={{duration:1,ease:easeOut,delay:0}} className='heading text-black text-2xl sm:text-3xl mt-5'>
      Wishing you a truly wonderful birthday filled with love, laughter, and everything that brings you happiness. Birthdays are not just about celebrating another year gone by, but also appreciating how far you've come, the lives you've touched, and the memories you've made along the way. May this year open new doors, bring exciting opportunities, and surround you with people who genuinely care about you. Take a moment to reflect on your journey, be proud of your growth, and look ahead with hope and confidence. No matter where life takes you, may you always find reasons to smile, lessons to learn, and moments to cherish. Have an amazing day and a year ahead that's as incredible as you are.
      </motion.div>
    <div className='absolute -bottom-14 -right-20 w-80 mix-blend-darken opacity-50'>
    <img src={inkpot} alt="" />
    </div>
    </motion.div>
  )
}

export default Page