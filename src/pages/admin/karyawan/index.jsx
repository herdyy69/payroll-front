/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/TemplatesAdmin/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import { Button } from '@tremor/react'
import {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiFillPlusCircle,
} from 'react-icons/ai'
import CreateKaryawan from '@/components/Karyawan/CreateKaryawan'
import DetailKaryawan from '@/components/Karyawan/DetailsKaryawan'
import Details from '@/components/Karyawan/Details'
import EditKaryawan from '@/components/Karyawan/EditKaryawan'
import UpdateKaryawan from '@/components/Karyawan/UpdateKaryawan'
import { toast } from 'react-toastify'

import axios from '@/lib/axios'

const Index = () => {
  const { dataKaryawan, dataStatus, dataJabatan } = fetchData()
  const [modalDetails, setModalDetails] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [detail, setDetail] = useState('')
  const [edit, setEdit] = useState('')
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')

  const employeed = dataKaryawan?.data
  const employees = employeed?.sort((a, b) => {
    return b.id - a.id
  })

  const employee = employees?.sort((a, b) => {
    return a.status_pegawai === 'Tidak Aktif' ? 1 : -1
  })

  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 5
  const pagesVisited = pageNumber * usersPerPage

  const displayUsers = employee?.slice(
    pagesVisited,
    pagesVisited + usersPerPage,
  )

  const pageCount = Math.ceil(employee?.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(employee)

  const handleSearch = e => {
    setSearch(e.target.value)
    const filtered = employee?.filter(item => {
      return item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilter(filtered)
  }

  const updateStatus = (id, status) => {
    axios
      .post(`api/karyawan/${id}/update-statuses`, {
        pegawai: status,
      })
      .then(res => {
        setSuccess(res)
        setTimeout(() => {
          setSuccess('')
        }, 2000)
      })
      .catch(err => {
        setErr(err)
        setTimeout(() => {
          setErr('')
        }, 2000)
      })
  }

  const tableRowPaginate = () => {
    return displayUsers && displayUsers.length > 0 ? (
      displayUsers?.map(data => {
        return (
          <tr key={data?.id} className="text-slate-100 text-sm font-bold">
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12 bg-white">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{data?.nama}</div>
                  <div className="text-sm opacity-50">
                    {data?.jabatan?.jabatan_pegawai} -{' '}
                    {data?.status_karyawan?.status_pegawai}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={data?.status_pegawai === 'Aktif' ? true : false}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
            </td>
            <td>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setDetail(data) & setModalDetails(true)
                  }}
                  className="btn btn-sm btn-primary">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setEdit(data) & setModalUpdate(true)
                  }}
                  className="btn btn-sm btn-warning">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    data?.status_pegawai === 'Aktif'
                      ? updateStatus(data?.id, 'Tidak Aktif')
                      : updateStatus(data?.id, 'Aktif')
                  }}
                  disabled={
                    data?.status_pegawai === 'Tidak Aktif' ? true : false
                  }
                  className="btn btn-sm btn-error">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        )
      })
    ) : (
      <tr>
        <td colSpan="4" className="text-center">
          Data tidak ditemukan
        </td>
      </tr>
    )
  }
  const tableRowSearch = () => {
    return filter && filter.length > 0 ? (
      filter?.map(data => {
        return (
          <tr key={data?.id} className="text-slate-100 text-sm font-bold">
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12 bg-white">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{data?.nama}</div>
                  <div className="text-sm opacity-50">
                    {data?.jabatan?.jabatan_pegawai} -{' '}
                    {data?.status_karyawan?.status_pegawai}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={data?.status_pegawai === 'Aktif' ? true : false}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
            </td>
            <td>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setDetail(data)}
                  className="btn btn-sm btn-primary">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setEdit(data)}
                  className="btn btn-sm btn-warning">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    data?.status_pegawai === 'Aktif'
                      ? updateStatus(data?.id, 'Tidak Aktif')
                      : updateStatus(data?.id, 'Aktif')
                  }}
                  disabled={
                    data?.status_pegawai === 'Tidak Aktif' ? true : false
                  }
                  className="btn btn-sm btn-error">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        )
      })
    ) : (
      <tr>
        <td colSpan="4" className="text-center">
          Data tidak ditemukan
        </td>
      </tr>
    )
  }
  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Dashboard Karyawan`}
        description={AppConfig.description}
      />

      <div className="container mt-2 p-4 rounded-md">
        <div className="grid min-h-screen">
          {success &&
            toast.success('Data Berhasil Dihapus!', {
              className: 'text-sm',
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })}
          {err &&
            toast.error('Data Karyawan Gagal Dihapus! ', {
              className: 'text-sm',
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })}
          {modalDetails && (
            <Details
              data={detail}
              buttonClick={
                <button
                  onClick={() => {
                    setModalDetails(false) && setDetail(null)
                  }}
                  className="btn btn-ghost btn-sm rounded-md">
                  Tutup
                </button>
              }
            />
          )}
          {modalUpdate && (
            <UpdateKaryawan
              data={edit}
              buttonClick={
                <button
                  type="button"
                  className="btn btn-ghost btn-sm rounded-md"
                  onClick={() => {
                    setModalUpdate(false) && setEdit(null)
                  }}>
                  Kembali
                </button>
              }
              close={() => {
                setModalUpdate(false) && setEdit(null)
              }}
            />
          )}

          <div className="flex flex-col items-center justify-start gap-4 bg-slate-800 rounded-md">
            <div className="flex flex-row  items-center justify-between w-[90%] mt-3 p-2 gap-4 bg-slate-600 rounded-md">
              <CreateKaryawan jabatan={dataJabatan} status={dataStatus} />

              <div className="form-control w-full md:w-auto">
                <div className="input-group">
                  <input
                    onChange={handleSearch}
                    type="search"
                    placeholder="Cari Nama Karyawan"
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
            <div className="flex flex-col w-[90%] mt-1 p-2 gap-4 bg-slate-600 rounded-md">
              <div className="overflow-x-auto">
                <table className="table z-0 w-full">
                  <thead>
                    <tr className="text-white">
                      <th>Nama Lengkap</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {search.length > 0 ? tableRowSearch() : tableRowPaginate()}
                  </tbody>
                </table>

                <div className="flex items-center justify-center my-4">
                  <button
                    onClick={() => {
                      pageNumber > 0 && setPageNumber(pageNumber - 1)
                    }}
                    disabled={pageNumber === 0}
                    className="btn btn-sm btn-primary">
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center mx-2">
                    <span className="text-sm font-bold">
                      {pageNumber + 1} / {pageCount}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      pageNumber + 1 < pageCount &&
                        setPageNumber(pageNumber + 1)
                    }}
                    disabled={pageNumber + 1 === pageCount}
                    className="btn btn-sm btn-primary">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                {/* {filter
                      ? filter?.map(data => {
                          return (
                            <tr
                              key={data?.id}
                              className="text-slate-100 text-sm font-bold">
                              <td>{data?.nik}</td>
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 bg-white">
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto}`}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {data?.nama}
                                    </div>
                                    <div className="text-sm opacity-50">
                                      {data?.jabatan?.jabatan_pegawai} -{' '}
                                      {data?.status_karyawan?.status_pegawai}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {data?.status_pegawai === 'Aktif' ? (
                                  <div className="badge badge-success">
                                    Aktif
                                  </div>
                                ) : (
                                  <div className="badge badge-danger">
                                    Tidak Aktif
                                  </div>
                                )}
                              </td>
                              <th>
                                <DetailKaryawan
                                  onClick={() => setDetail(data)}
                                  onClose={() => setDetail('')}
                                  data={detail}
                                />
                              </th>
                            </tr>
                          )
                        })
                      : employee?.map(data => {
                          return (
                            <tr
                              key={data?.id}
                              className="text-slate-100 text-sm font-bold">
                              <td>{data?.nik}</td>
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto}`}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {data?.nama}
                                    </div>
                                    <div className="text-sm opacity-50">
                                      {data?.jabatan?.jabatan_pegawai} -{' '}
                                      {data?.status_karyawan?.status_pegawai}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  className="toggle toggle-success"
                                  checked={
                                    data?.status_pegawai === 'Aktif'
                                      ? true
                                      : false
                                  }
                                  onChange={() => {
                                    setTimeout(() => {
                                      data?.status_pegawai === 'Aktif'
                                        ? updateStatus(data?.id, 'Tidak Aktif')
                                        : updateStatus(data?.id, 'Aktif')
                                    }, 1000)
                                  }}
                                />
                              </td>
                              <th>
                                <DetailKaryawan
                                  onClick={() => setDetail(data)}
                                  onClose={() => setDetail('')}
                                  data={detail}
                                />
                              </th>
                            </tr>
                          )
                        })}

                    {filter?.length === 0 && (
                      <tr className="text-slate-100 text-sm font-bold">
                        <td colSpan="4" className="text-center">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )}
                    {employee?.length === 0 && (
                      <tr className="text-slate-100 text-sm font-bold">
                        <td colSpan="4" className="text-center">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
