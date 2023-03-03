import React from 'react'
import UpdateFoto from './UpdateFoto'
import { BiEdit } from 'react-icons/bi'

const Details = ({ data, buttonClick }) => {
  const classFlex =
    'flex flex-row items-center justify-between border-y-[1px] border-white w-full py-2'
  const classText = 'text-sm font-semibold'
  const classTextOpacity = 'text-sm font-semibold opacity-50'

  const lamaKerja = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const dateNow = new Date(year, month, day)
    const dateJoin = new Date(data?.tanggal_masuk)
    const diff = dateNow - dateJoin
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))
    const diffYears = Math.floor(diffDays / 365)
    const diffMonths = Math.floor((diffDays % 365) / 30)
    const diffDays2 = Math.floor((diffDays % 365) % 30)
    return `${diffYears} Tahun ${diffMonths} bulan ${diffDays2} hari`
  }

  const dataKaryawan = [
    {
      id: 1,
      title: 'Tempat, Tanggal Lahir',
      value: `${data?.tempat_lahir}, ${data?.tanggal_lahir}`,
    },
    {
      id: 2,
      title: 'Jenis Kelamin',
      value: data?.jenis_kelamin,
    },
    {
      id: 3,
      title: 'Alamat Lengkap',
      value: data?.alamat,
    },
    {
      id: 4,
      title: 'Agama',
      value: data?.agama,
    },
    {
      id: 5,
      title: 'Status Perkawinan',
      value: data?.status_hubungan,
    },
    {
      id: 6,
      title: 'No. Telepon',
      value: data?.no_telp,
    },
    {
      id: 7,
      title: 'Email',
      value: data?.email,
    },
    {
      id: 8,
      title: 'Tanggal Masuk',
      value: data?.tanggal_masuk,
    },
    {
      id: 9,
      title: 'Lama Kerja',
      value: lamaKerja(),
    },
    {
      id: 10,
      title: 'Nama Bank',
      value: data?.nama_bank ? data?.nama_bank : '-',
    },
    {
      id: 11,
      title: 'No. Rekening',
      value: data?.no_rekening ? data?.no_rekening : '-',
    },
    {
      id: 12,
      title: 'Atas Nama',
      value: data?.atas_nama ? data?.atas_nama : '-',
    },
  ]

  return (
    <>
      <UpdateFoto data={data} />
      <div
        className={`
      ${
        data
          ? 'animate__animated animate__fadeIn animate__faster'
          : 'animate__animated animate__fadeOut '
      }
      fixed inset-0 z-[991] flex items-center justify-start min-h-screen bg-transparent p-4`}>
        <div className="flex flex-col items-start p-4 bg-slate-800 w-[40%] h-[90vh] opacity-100 border-2 border-white rounded-md overflow-y-auto">
          <div className="flex flex-col w-full mt-3">
            {/* <div className="text-end w-full mb-[-3rem]">{buttonClick}</div> */}

            <div className="flex flex-row items-center justify-center mb-4">
              <div
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="flex flex-row items-end justify-end w-[25%] h-[25vh] rounded-md border-2 border-white">
                <label htmlFor="EditImage_1" className="cursor-pointer">
                  <BiEdit className="w-6 h-6 rounded-md bg-slate-800 " />
                </label>
              </div>
              <div className="flex flex-col items-start justify-center ml-3">
                <div className="font-bold whitespace-normal max-w-[15rem]">
                  <span className="text-lg">{data?.nama}</span>
                  <div className="text-xs opacity-50">{data?.nik}</div>

                  <div className="text-[10px] opacity-50">
                    {data?.jabatan?.jabatan_pegawai} -{' '}
                    {data?.status_karyawan?.status_pegawai}
                  </div>
                </div>
              </div>
            </div>
            {dataKaryawan.map(item => (
              <div key={item.id} className={classFlex}>
                <div className={classText}>{item.title}</div>
                <div className={classTextOpacity}>{item.value}</div>
              </div>
            ))}
            <div className="flex flex-row items-end justify-end mt-4">
              {buttonClick}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
