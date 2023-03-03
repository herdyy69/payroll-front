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
    <div className="navbar bg-[#ED1A23] w-[98vw] mx-auto mt-3 rounded-md border-2 border-gray-800">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-slate-100">
          MY TEMPLATE
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered bg-slate-50 rounded-md text-slate-700"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-white">
              {/* <img
                className="bg-white"
                src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
              /> */}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="text-slate-100 mt-3 p-2 shadow menu menu-compact dropdown-content bg-slate-700 rounded-box border-2 border-slate-800 w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
