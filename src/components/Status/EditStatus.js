import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from '@/lib/axios'

const EditStatus = ({
  karyawan,
  laporan,
  jabatan,
  status,
  onClick,
  onClose,
  data,
  id,
}) => {
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')

  const [jabatanPegawai, setJabatanPegawai] = useState('')
  const [gajiPokok, setGajiPokok] = useState()
  const [uangMakan, setUangMakan] = useState()
  const [uangTransport, setUangTransport] = useState()

  const [statusPegawai, setStatusPegawai] = useState('')
  const [bonus, setBonus] = useState()

  const onSubmit = () => {
    axios
      .put(`api/status/${data?.id}`, {
        bonus: bonus,
      })
      .then(res => {
        document.getElementById('edit_status_1').checked = false
        setSuccess(res?.data?.message)
        setTimeout(() => {
          setSuccess('')
        }, 2000)
      })
      .catch(err => {
        setErr(err?.response?.data?.message)
        setTimeout(() => {
          setErr('')
        }, 2000)
      })
  }

  return (
    <>
      {success &&
        toast.success('Data Berhasil Diupdate!', {
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
        toast.error('Data Status Gagal Diupdate! ', {
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
      <label
        onClick={onClick}
        className="btn btn-sm btn-primary"
        htmlFor="edit_status_1">
        <AiOutlineSearch />
      </label>

      <input type="checkbox" id="edit_status_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-start p-4 bg-slate-800 w-[35%] opacity-100 border-2 border-white rounded-md overflow-y-auto">
          <h3 className="font-bold text-lg">Edit Data Status</h3>
          <span className="text-sm font-normal">Silahkan isi data Status</span>
          <div className="flex flex-row flex-wrap mt-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white font-normal">
                  Jenis Status Pegawai
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                value={data?.status_pegawai}
                readOnly
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white font-normal">Bonus</span>
              </label>
              <input
                onWheel={e => {
                  e.target.blur()
                }}
                type="number"
                className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                onChange={e => setBonus(e.target.value)}
                value={bonus ? bonus : data?.bonus}
              />
            </div>
          </div>

          <div className="modal-action w-full">
            <label
              onClick={onClose}
              htmlFor="edit_status_1"
              className="btn btn-ghost btn-sm rounded-md">
              Batal
            </label>
            <button
              onClick={e => {
                e.preventDefault()
                onSubmit()
              }}
              className="btn btn-primary btn-sm rounded-md ml-2">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditStatus
