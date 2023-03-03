/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  FaUserAlt,
  FaHospitalUser,
  FaStream,
  FaAlignCenter,
} from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'
import { CiLogout } from 'react-icons/ci'

import { FiLogOut, FiArrowRight } from 'react-icons/fi'
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx'
import { useAuth } from '@/hooks/auth'

const SideBar = ({ users }) => {
  const router = useRouter()
  const { logout } = useAuth()

  const dataSidebar =
    users?.role === 'Super Admin'
      ? [
          {
            id: 1,
            name: 'Dashboard',
            icon: <MdSpaceDashboard className="text-2xl text-slate-100" />,
            link: '/admin',
          },
          {
            id: 2,
            name: 'Users',
            icon: <FaUserAlt className="text-2xl text-slate-100" />,
            link: '/admin/users',
          },

          {
            id: 3,
            name: 'Data Karyawan',
            icon: <FaHospitalUser className="text-2xl text-slate-100" />,
            link: '/admin/karyawan',
          },
          {
            id: 4,
            name: 'Data Status',
            icon: <FaStream className="text-2xl text-slate-100" />,
            link: '/admin/status',
          },
          {
            id: 5,
            name: 'Data Jabatan',
            icon: <FaAlignCenter className="text-2xl text-slate-100" />,
            link: '/admin/jabatan',
          },
          {
            id: 6,
            name: 'Riwayat Laporan',
            icon: <HiDocumentReport className="text-2xl text-slate-100" />,
            link: '/admin/laporan',
          },
        ]
      : [
          {
            id: 1,
            name: 'Dashboard',
            icon: <MdSpaceDashboard className="text-2xl text-slate-100" />,
            link: '/admin',
          },
          {
            id: 3,
            name: 'Data Karyawan',
            icon: <FaHospitalUser className="text-2xl text-slate-100" />,
            link: '/admin/karyawan',
          },
          {
            id: 4,
            name: 'Data Status',
            icon: <FaStream className="text-2xl text-slate-100" />,
            link: '/admin/status',
          },
          {
            id: 5,
            name: 'Data Jabatan',
            icon: <FaAlignCenter className="text-2xl text-slate-100" />,
            link: '/admin/jabatan',
          },
          {
            id: 6,
            name: 'Riwayat Laporan',
            icon: <HiDocumentReport className="text-2xl text-slate-100" />,
            link: '/admin/laporan',
          },
        ]

  return (
    <div className="flex flex-col justify-between shadow-md border-2 border-gray-800 bg-slate-800 text-zinc-50 md:w-[80%] md:sticky md:top-16 md:z-0 top-0 z-20 fixed md:h-[calc(100vh_-_64px)] h-full w-[300px] transition-transform .3s ease-in-out md:translate-x-0">
      <nav className="md:sticky top-0 md:top-20">
        <ul className="py-2 flex flex-col gap-3">
          {dataSidebar?.map(item => (
            <Link key={item.id} href={item.link}>
              <li
                className="text-indigo-100 hover:bg-indigo-900 flex gap-4 items-center transition-colors duration-300 rounded-md p-2 mx-2"
                data-tip={item.name}
                key={item.id}>
                {item.icon} {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="border-t border-t-slate-700 p-4 bg-slate-900">
        <div className="flex gap-4 items-center">
          <img
            src={'https://cdn-icons-png.flaticon.com/512/219/219983.png'}
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <span className="text-white font-bold my-0 uppercase">
              {users?.name}
            </span>
            <span className="text-[12px] text-slate-100">{users?.role}</span>
            <a
              className="text-white text-sm flex flex-row items-center cursor-pointer
              btn btn-error bg-red-800 btn-sm mt-1
              "
              onClick={logout}>
              <FiLogOut className="text-white text-sm mr-1" /> Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
