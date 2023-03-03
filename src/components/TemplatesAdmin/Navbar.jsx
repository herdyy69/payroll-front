/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  FaUserAlt,
  FaHospitalUser,
  FaStream,
  FaAlignCenter,
} from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'

import { FiLogOut, FiArrowRight } from 'react-icons/fi'
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx'
import { AiOutlineMenu } from 'react-icons/ai'
import { useAuth } from '@/hooks/auth'

const Navbar = ({ users }) => {
  const router = useRouter()
  const { logout } = useAuth()

  const dataSidebar = [
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
      link: '/admin/doctors',
    },
    {
      id: 5,
      name: 'Data Jabatan',
      icon: <FaAlignCenter className="text-2xl text-slate-100" />,
      link: '/admin/doctors',
    },
    {
      id: 6,
      name: 'Laporan',
      icon: <HiDocumentReport className="text-2xl text-slate-100" />,
      link: '/admin/laporan',
    },
  ]

  const [time, setTime] = useState()

  const getDay = () => {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ]
    const day = days[new Date().getDay()]
    return day
  }

  const getMonth = () => {
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]
    const month = months[new Date().getMonth()]
    return month
  }

  const getYear = () => {
    const year = new Date().getFullYear()
    return year
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'Selamat Pagi!,'
    }
    if (hour >= 12 && hour <= 15) {
      return 'Selamat Siang!,'
    }
    if (hour > 15 && hour <= 18) {
      return 'Selamat Sore!,'
    }
    if (hour > 18 && hour <= 24) {
      return 'Selamat Malam!,'
    }
  }

  useEffect(() => {
    setTime(`${getDay()}, ${new Date().getDate()} ${getMonth()} ${getYear()}`)
  }, [])

  return (
    <div className="navbar bg-slate-800 border-2 border-gray-800 fixed z-30">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-slate-800">
          <span className="text-white">MY DASHBOARD</span>
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="flex flex-col items-start btn btn-ghost rounded-sm border border-white opacity-30">
          <h1 className="text-white text-[12px] mb-[2px]">{getGreeting()}</h1>
          <h1 className="text-white text-[12px]">{time}</h1>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover md:hidden">
          <label tabIndex={0} className="btn btn-circle swap swap-rotate">
            <AiOutlineMenu className="text-2xl text-slate-100" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-slate-700 text-white text-sm rounded-box w-52">
            {dataSidebar.map(item => (
              <li key={item.id}>
                <a
                  className="justify-start"
                  onClick={() => router.push(item.link)}>
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
