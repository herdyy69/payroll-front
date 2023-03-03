import React, { useState } from 'react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'

const UpdateFoto = ({ data }) => {
  const [fotoProfile, setFotoProfile] = useState('')
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')

  const updateFotoProfile = () => {
    const formFotoProfile = new FormData()
    formFotoProfile.append('foto', fotoProfile)

    axios
      .post(`api/karyawan/${data.id}/update-foto`, formFotoProfile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setFotoProfile('')
        document.getElementById('EditImage_1').checked = false
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
        toast.error('Data Karyawan Gagal Diupdate! ', {
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
      <input type="checkbox" id="EditImage_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[30vw] max-w-5xl bg-slate-800 rounded-md border-2 border-white">
          <div className="border-2 border-slate-800 w-[45%] mx-auto p-1 rounded-md mt-4">
            <img
              src={fotoProfile && URL.createObjectURL(fotoProfile)}
              className="w-full min-h-[150px] h-auto border-2 border-white rounded-md"
            />
          </div>
          <div className="form-control w-full mt-5">
            <input
              onChange={e => setFotoProfile(e.target.files[0])}
              type="file"
              className="file-input file-input-bordered bg-slate-800 border-2 border-white text-sm"
            />
          </div>

          <div className="modal-action">
            <label
              htmlFor="EditImage_1"
              className="btn btn-error btn-xs text-white rounded-sm border-none bg-red-700">
              Batal
            </label>
            <button
              onClick={e => {
                e.preventDefault()
                updateFotoProfile()
              }}
              className="btn btn-primary btn-xs rounded-sm border-none bg-green-700">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateFoto
