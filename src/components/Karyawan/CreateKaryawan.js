import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/auth'

import axios from '@/lib/axios'

const CreateKaryawan = ({ button, jabatan, status }) => {
  const { user } = useAuth({ middleware: 'auth' })
  const jabatanHrd = jabatan?.data?.filter(item => item.id !== 1)

  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')

  const dateNow = new Date()
  const date = dateNow.getDate()
  const month = dateNow.getMonth() + 1
  const year = dateNow.getFullYear()
  const dateNowString = `${year}-${month}-${date}`

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    axios
      .post('api/karyawan', {
        ...data,
      })
      .then(res => {
        reset()
        setSuccess(res.data.message)
        setTimeout(() => {
          setSuccess('')
          document.getElementById('createKaryawan_1').checked = false
        }, 2000)
      })
      .catch(err => {
        setErr(err.response.data)
        setTimeout(() => {
          setErr('')
        }, 2000)
      })
  }

  const formForHRD = () => {
    return (
      <>
        <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            name="username"
            {...register('username', { required: false })}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            name="password"
            {...register('password', { required: false })}
            minLength={8}
            maxLength={16}
          />
        </div>
      </>
    )
  }

  return (
    <>
      {success &&
        toast.success('Data Berhasil Ditambahkan!', {
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
        toast.error('Data Karyawan Gagal Ditambahkan! ', {
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
        className="btn btn-primary border-none bg-slate-800 gap-2"
        htmlFor="createKaryawan_1">
        <AiFillPlusCircle className="text-2xl" />
        <span className="text-sm">Tambah Karyawan</span>
      </label>

      <input type="checkbox" id="createKaryawan_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-start p-4 bg-slate-800 w-[40%] h-[90vh] opacity-100 border-2 border-white rounded-md overflow-y-auto">
          <h3 className="font-bold text-lg">Tambah Data Karyawan</h3>
          <span className="text-sm">Silahkan isi data karyawan</span>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row flex-wrap mt-5">
              <input
                type="hidden"
                name="tanggal_masuk"
                {...register('tanggal_masuk', { required: true })}
                value={dateNowString}
              />

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    NIK
                    {errors.nik && (
                      <span className="text-red-500 text-xs ml-1">
                        * NIK harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="nik"
                  {...register('nik', {
                    required: true,
                  })}
                  minLength={16}
                  maxLength={16}
                  pattern="[0-9]*"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Nama Lengkap
                    {errors.nama_pegawai && (
                      <span className="text-red-500 text-xs ml-1">
                        * Nama harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="nama_pegawai"
                  {...register('nama_pegawai', { required: true })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Tempat Lahir
                    {errors.tempat_lahir && (
                      <span className="text-red-500 text-xs ml-1">
                        * Tempat lahir harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="tempat_lahir"
                  {...register('tempat_lahir', { required: true })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Tanggal Lahir
                    {errors.tanggal_lahir && (
                      <span className="text-red-500 text-xs ml-1">
                        * Tanggal lahir harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="tanggal_lahir"
                  {...register('tanggal_lahir', { required: true })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Jenis Kelamin
                    {errors.jenis_kelamin && (
                      <span className="text-red-500 text-xs ml-1">
                        * Jenis kelamin harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="jenis_kelamin"
                  {...register('jenis_kelamin', { required: true })}>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Alamat Lengkap
                    {errors.alamat && (
                      <span className="text-red-500 text-xs ml-1">
                        * Alamat harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="alamat"
                  {...register('alamat', { required: true })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Agama
                    {errors.agama && (
                      <span className="text-red-500 text-xs ml-1">
                        * Agama harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="agama"
                  {...register('agama', { required: true })}>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Budha">Budha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Status
                    {errors.status_hubungan && (
                      <span className="text-red-500 text-xs ml-1">
                        * Status harus diisi
                      </span>
                    )}
                  </span>
                </label>

                <select
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="status_hubungan"
                  {...register('status_hubungan', { required: true })}>
                  <option value="Menikah">Menikah</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                </select>
              </div>

              <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    No. Telepon
                    {errors.no_telp && (
                      <span className="text-red-500 text-xs ml-1">
                        * No. Telepon harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="no_telp"
                  {...register('no_telp', { required: true })}
                  minLength={9}
                  maxLength={14}
                  pattern="[0-9]*"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Email Karyawan
                    {errors.email && (
                      <span className="text-red-500 text-xs ml-1">
                        * Email harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="email"
                  {...register('email', { required: true })}
                />
              </div>

              <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Jabatan Karyawan
                    {errors.jabatan_id && (
                      <span className="text-red-500 text-xs ml-1">
                        * Jabatan harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="jabatan_id"
                  {...register('jabatan_id', { required: true })}>
                  {user?.role === 'Super Admin'
                    ? jabatan?.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.jabatan_pegawai}
                        </option>
                      ))
                    : jabatanHrd?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.jabatan_pegawai}
                        </option>
                      ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Status Karyawan
                    {errors.status_id && (
                      <span className="text-red-500 text-xs ml-1">
                        * Status harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                  name="status_id"
                  {...register('status_id', { required: true })}>
                  {status?.data.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.status_pegawai}
                    </option>
                  ))}
                </select>
              </div>
              {watch('jabatan_id') === '1' && formForHRD()}
            </div>

            <div className="modal-action">
              <label
                htmlFor="createKaryawan_1"
                className="btn btn-ghost btn-sm rounded-md">
                Kembali
              </label>
              <button
                type="submit"
                className="btn btn-primary btn-sm rounded-md ml-2">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateKaryawan
