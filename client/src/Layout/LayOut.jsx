import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export function LayOut(props) {

    return (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >    
  <div className="h-[100vh] !px-20 !py-5 ">
     <header className='flex items-center justify-between header'>
        <Link to='/' className='flex items-center gap-5 cursor-pointer'>
        <img className='w-[44px] ' src="/logo.png" alt="logo" />
        <span className='text-2xl font-bold '>Sintu AI</span>
        </Link>

        <div className="h-[35px] w-[35px] rounded-full cursor-pointer">
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        </div>
     </header>
     <main>
      <Outlet/>
     </main>
  </div>
  </ClerkProvider> 
    )
}
