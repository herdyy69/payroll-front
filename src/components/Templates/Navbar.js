/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { FiLogOut, FiArrowRight } from 'react-icons/fi'
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx'
import { useAuth } from '@/hooks/auth'

const Navbar = ({ users }) => {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div className="navbar bg-[#ca131c] w-[98vw] mx-auto mt-3 rounded-md border-2 border-gray-800">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-slate-100">
          PRIMA RASA ABADI
        </a>
      </div>
    </div>
  )
}

export default Navbar
