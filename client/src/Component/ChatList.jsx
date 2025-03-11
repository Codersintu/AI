import React from 'react'
import { Link } from 'react-router-dom'

export function ChatList(props) {
    

    return (
        <div className="flex flex-col justify-between h-[72%] w-[300px] !py-8 gap-4">
            <span className='font-semibold text-xl'>Dashboard</span>
            <Link to="/">Create a new chart</Link>
            <Link to="/">Explore Sintu AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className='font-semibold text-xl'>RECENT CHATS</span>
            <div className="flex flex-col gap-3 overflow-y-auto !pr-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            <Link to="/">title</Link>
            </div>
            <hr />

            <div className="flex items-center justify-center gap-4 flex-shrink-0">
                <img src="/logo.png" alt="" className='w-[30px] h-[30px]' />
                <div className="flex flex-col ">
                    <span className='font-semibold'>Upgrade to Sintu AI pro</span>
                    <span className='text-gray-300 text-sm'>Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    )
}
