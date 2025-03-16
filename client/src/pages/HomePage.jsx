import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

export function HomePage(props) {
    const [typingImg,setTypingImg] =useState("Human")
    const navigate=useNavigate()

    const text=async()=>{
      await fetch("http://localhost:3001/api/text",{
        credentials:'include'
      })
    }

    return (
      <div className="flex flex-col items-center justify-center h-[90vh] ">
        <div className="flex items-center justify-center h-[100%] gap-48 homepage">
            <img className='bottom-0 left-0 opacity-[0.06] absolute animate-rotateOrbital' src="/orbital.png" alt="bg-img" />
          <div className="flex flex-1 flex-col items-center justify-center gap-7 z-10">
            <h1 className='text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-300 '>SINTU AI</h1>
            <h2 className='font-semibold'>This is AI to helpful for everyOne</h2>
            <h3 className='text-center text-cyan-300 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis dolorem eos eius veniam. Facere, aut?</h3>
            <button className='bg-blue-600 !py-2 !px-4 rounded-4xl cursor-pointer font-semibold hover:bg-cyan-500' onClick={()=>navigate("/dashboard")}>Get Started</button>
            <button onClick={text}>text</button>
          </div>  
          <div className="flex-1 flex items-center justify-center h-[100%]">
            <div className="flex items-center justify-center bg-[#140e2d] w-[90%] h-[60%] rounded-[50px] relative">
              <div className="absolute w-[100%] h-[100%] overflow-hidden rounded[50px]">
              <div className="bg-[url(/bg.png)] opacity-[0.2] w-[100%] h-[100%] bg-auto back"></div>
              </div>
              <img src="./bot.png" alt="botimg" className='bot' />
              <div className='bottom-[-30px] right-[-50px] absolute gap-2 p-2 flex items-center rounded-4xl bg-gray-500'>
                <img src={typingImg === "Human" ? "./human1.jpeg" : typingImg === "Bot" ? "./bot.png" : "human2.jpeg"} alt=""  className='w-[32px] h-[32px] rounded-full'/>
              <TypeAnimation 
      sequence={[
        'Human:We produce food for Mice',
        2000, ()=>{
           setTypingImg("Bot")
        },
        'Bot:We produce food for Hamsters',
        2000,()=>{setTypingImg("Human2")},
        'Human2:We produce food for Guinea Pigs',
        2000,()=>{
          setTypingImg("Bot")
        },
        'Bot:We produce food for Chinchillas',
        2000,()=>{
          setTypingImg("Human")
        },
      ]}
      wrapper="span"
      cursor={true}
      omitDeletionAnimation={true}
      repeat={Infinity}
    />
              </div>
            </div>
           
          </div> 

         
        </div>
        <div className="flex flex-col items-center justify-center bottom-0">
            <img src="./logo.png" alt="" className='w-[42px] '/>
            <div className="flex items-center justify-center gap-2">
              <a>Terms && condition</a>
              <span>|</span>
              <a>Privacy policy</a>
            </div>
          </div>
        </div>
    )
}
