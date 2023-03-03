import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/auth'

import { useRouter } from 'next/router'

import Navbar from './Navbar'
import Footer from './Footer'
import SideBar from './Sidebar'

const Main = ({ children }) => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  return (
    // <div className="antialiased text-gray-800">
    //   {router.pathname !== '/auth/login' &&
    //     router.pathname !== '/auth/register' && <Navbar users={user} />}
    //   <div className="flex flex-col md:flex-row w-[97vw] mx-auto space-x-[2px]">
    //     <SideBar users={user} />
    //     <div className="bg-slate-700 mx-auto m-1 p-4 rounded-md border-2 border-slate-800 w-[100%]">
    //       {children}
    //     </div>
    //   </div>
    //   {router.pathname !== '/auth/login' &&
    //     router.pathname !== '/auth/register' && <Footer />}
    // </div>
    <div className="grid min-h-screen grid-rows-header bg-slate-800">
      <div className="bg-white shadow-sm z-10">
        {router.pathname !== '/auth/login' &&
          router.pathname !== '/auth/register' && <Navbar users={user} />}
      </div>
      <div className="grid md:grid-cols-sidebar">
        <div>
          <SideBar users={user} />
        </div>
        {children}
      </div>
    </div>
  )
}

export { Main }
