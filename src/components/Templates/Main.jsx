import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import Footer from './Footer'
import Navbar from './Navbar'

const Main = ({ children }) => {
  const router = useRouter()

  return (
    <div className="antialiased text-gray-800">
      {router.pathname !== '/auth/login' &&
        router.pathname !== '/auth/register' && <Navbar />}
      <div className="mx-auto ">{children}</div>
      {router.pathname !== '/auth/login' &&
        router.pathname !== '/auth/register' && <Footer />}
    </div>
  )
}

export { Main }
