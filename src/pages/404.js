import React from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

const NotFoundPage = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-gray-500">
        <BiErrorCircle size={64} />
      </div>
      <h1 className="text-2xl font-medium text-gray-800 my-4">
        Halaman tidak ditemukan
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        Maaf, halaman yang Anda cari tidak ditemukan. Silakan periksa URL atau
        kembali ke halaman sebelumnya.
      </p>
      <button
        className="bg-[#ca131c] text-white px-4 py-2 rounded-md mt-4 flex flex-row gap-3"
        onClick={() => router.back()}>
        <RiArrowGoBackLine size={24} />
        Kembali
      </button>
    </div>
  )
}

export default NotFoundPage
