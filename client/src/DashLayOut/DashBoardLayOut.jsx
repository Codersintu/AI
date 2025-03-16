import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import {ChatList} from "../Component/ChatList"
import { DashBoardPage } from './DashBoardPage'

export function DashBoardLayOut(props) {
    const {userId,isLoaded}=useAuth()
    const navigate=useNavigate()
    useEffect(()=>{
        if (isLoaded && !userId) {
            navigate("/sign-In");
        }
    },[isLoaded,userId,navigate]);

    if (!isLoaded) return "Loading...";


    return (
        <div className="flex">
        <div className="flex-1"><ChatList/></div>
        <div className="flex-4 "><Outlet/></div>
     </div> 
    )
}
