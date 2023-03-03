/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/TemplatesAdmin/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import { Button } from '@tremor/react'
import { AiFillPlusCircle } from 'react-icons/ai'

import CreateReport from '@/components/Laporan/CreateReport'
import DetailLaporan from '@/components/Laporan/DetailsReport'

import axios from '@/lib/axios'

const Index = () => {
  const {
    dataKaryawan,
    dataStatus,
    dataJabatan,
    dataLaporan,
    dataUsers,
  } = fetchData()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(dataUsers)

  const handleSearch = e => {
    setSearch(e.target.value)
    const filtered = dataUsers?.filter(item => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilter(filtered)
  }

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Dashboard User`}
        description={AppConfig.description}
      />
      <div className="container mt-2 p-4 rounded-md">
        <div className="grid">
          <div className="flex flex-row  items-center justify-between w-[90%] mt-3 p-2 gap-4 bg-slate-600 rounded-md">
            <button className="btn glass text-slate-100 cursor-default">
              DATA USER
            </button>
            <div className="flex flex-row items-center space-x-2">
              <div className="form-control w-full md:w-auto">
                <div className="input-group">
                  <input
                    onChange={handleSearch}
                    type="search"
                    placeholder="Cari Nama User"
                    className="input input-bordered w-full input-group-sm bg-slate-800"
                  />
                  <button className="btn btn-square bg-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[90%] mt-1 p-2 gap-4 bg-slate-600 rounded-md">
            <div className="overflow-x-auto w-full max-h-[50vh]">
              <table className="table w-full">
                <thead>
                  <tr className="text-white">
                    <th>Nama Lengkap</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {filter
                    ? filter?.map(laporan => (
                        <tr
                          key={laporan?.id}
                          className="text-slate-100 text-sm font-bold">
                          <td>{laporan?.name}</td>
                          <td>{laporan?.username}</td>
                          <td>{laporan?.email}</td>
                          <td>{laporan?.role}</td>
                          {/* <td>
                        <DetailLaporan />
                      </td> */}
                        </tr>
                      ))
                    : dataUsers?.map(laporan => (
                        <tr
                          key={laporan?.id}
                          className="text-slate-100 text-sm font-bold">
                          <td>{laporan?.kode}</td>
                          <td>{laporan?.nik}</td>
                          <td>{laporan?.nama_karyawan}</td>
                          <td>{laporan?.tanggal}</td>
                          {/* <td>
                        <DetailLaporan />
                      </td> */}
                        </tr>
                      ))}

                  {filter && filter.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-white">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                  {dataUsers?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-white">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
