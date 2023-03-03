import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { Button } from '@tremor/react'
import { AiOutlineSearch } from 'react-icons/ai'

import axios from '@/lib/axios'

const DetailLaporan = ({ onClick, onClose, data }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const toRp = rp => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(rp)
  }

  return (
    <>
      <label
        onClick={onClick}
        className="btn btn-sm btn-primary"
        htmlFor="DetailLaporan_1">
        <AiOutlineSearch />
      </label>

      <input type="checkbox" id="DetailLaporan_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[30vw] max-w-5xl bg-slate-700">
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">NIK</div>
            <div className="text-xs opacity-50">{data?.nik}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Nama Karyawan</div>
            <div className="text-xs opacity-50">{data?.nama_karyawan}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Jabatan</div>
            <div className="text-xs opacity-50">{data?.jabatan}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Status</div>
            <div className="text-xs opacity-50 whitespace-normal text-end">
              {data?.status}
            </div>
          </div>

          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Gaji Pokok</div>
            <div className="text-sm opacity-50">{toRp(data?.gaji_pokok)}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Bonus</div>
            <div className="text-sm opacity-50">{toRp(data?.bonus)}</div>
          </div>
          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>

          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Potongan Izin</div>
            <div className="text-[10px] opacity-50">
              {toRp(data?.potongan_izin)}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Potongan Sakit</div>
            <div className="text-[10px] opacity-50">
              {toRp(data?.potongan_sakit)}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Potongan Alpa</div>
            <div className="text-[10px] opacity-50">
              {toRp(data?.potongan_alpa)}
            </div>
          </div>
          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Total Potongan</div>
            <div className="text-[10px] opacity-50">
              {toRp(data?.total_potongan)}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Total Gaji</div>
            <div className="text-[10px] opacity-50">
              {toRp(data?.total_gaji)}
            </div>
          </div>

          <div className="modal-action">
            <label
              onClick={onClose}
              htmlFor="DetailLaporan_1"
              className="btn btn-error btn-xs text-white rounded-sm border-none bg-red-700">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailLaporan
