import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LayOut } from '././Layout/LayOut.jsx'
import { HomePage } from '././pages/HomePage.jsx'
import { DashBoardLayOut } from './DashLayOut/DashBoardLayOut.jsx'
import { DashBoardPage } from './DashLayOut/DashBoardPage.jsx'
import { DashBoardChat } from './DashLayOut/DashBoardChat.jsx'
import { SignIn } from './pages/SignIn.jsx'
import { SignUp } from './pages/SignUp.jsx'

const router=createBrowserRouter([
  {
    element:<LayOut/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/sign-In/*",
        element:<SignIn/>,
      },
      {
        path:"/sign-Up/*",
        element:<SignUp/>,
      },
      {
         element:<DashBoardLayOut/>,
         children:[
          {
            path:"/dashboard",
            element:<DashBoardPage/>
          },
          {
            path:"/dashboard/chats/:id",
            element:<DashBoardChat/>
          }
         ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
