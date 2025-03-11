
import React, { useEffect } from 'react'
import {useAuth} from '@clerk/clerk-react'
export function DashBoardPage(props) {
    const {userId} =useAuth()
    const handleSubmit=async(e)=>{
       e.preventDefault();
       const text=e.target.text.value;
       if (!text) return;

       await fetch("http://localhost:5173/api/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({userId,text})
       })
    }
    
    return (
       <div className="flex flex-col items-center justify-center gap-55">
        <div className="flex flex-col items-center justify-center gap-20">
            <div className="flex items-center justify-center gap-7">
                <img className='w-[70px]' src="/logo.png" alt="logo" />
                <span className='text-2xl font-semibold'>SINTU AI</span>
            </div>
            <div className="flex gap-25 ">
                <div className="flex-col items-center justify-center border rounded-2xl !px-3 !py-3 cursor-pointer hover:bg-gray-700">
                    <img className='w-[100px]' src="/chat.png" alt="" />
                    <span className='font-semibold'>Create a New Chat</span>
                </div>
                <div className="flex-col items-center justify-center border rounded-2xl !px-3 !py-3 cursor-pointer hover:bg-gray-700">
                    <img className='w-[100px]' src="/image.png" alt="" />
                    <span className='font-semibold'>Analyze Images</span>
                </div>
                <div className="flex-col items-center justify-center border rounded-2xl !px-3 !py-3 cursor-pointer hover:bg-gray-700">
                    <img className='w-[100px]' src="/code.png" alt="" />
                    <span className='font-semibold'>Help me with my code</span>
                </div>
            </div>
        </div>
        <div className="flex mt-auto w-[50%] sticky">
            <form className='flex relative items-center justify-center w-[100%] h-[100%] gap-2 mb-9' onSubmit={handleSubmit}>
                <input type="text" name='text' className='!py-3 w-[100%] outline-none !px-2 border rounded-full' placeholder='ask me anything...' />
                <button className='right-2 absolute flex items-center justify-center cursor-pointer'>
                    <img src="/arrow.png" className='w-[30px] h-[30px] bg-white rounded-full' alt="" />
                </button>
            </form>
        </div>
       </div>
    )
}
