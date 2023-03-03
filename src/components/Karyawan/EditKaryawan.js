import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import { fetchData } from '@/hooks/fetchdata'

const EditKaryawan = ({ karyawan }) => {
  const { dataStatus, dataJabatan } = fetchData()

  const jabatan = dataJabatan
  const status = dataStatus

  const [err, setErr] = useState()

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
      .put(`api/karyawan/${karyawan.id}`, {
        ...data,
      })
      .then(res => {
        document.getElementById('EditData').checked = false
        reset()
      })
      .catch(err => {
        setErr(err.response.data)
      })
  }

  const formForHRD = () => {
    return (
      <>
        <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-slate-700">Username</span>
          </label>
          <input
            type="text"
            placeholder="Alberth"
            className="input input-bordered bg-slate-200"
            name="username"
            {...register('username', { required: false })}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-slate-700">Password</span>
          </label>
          <input
            type="password"
            placeholder=""
            className="input input-bordered bg-slate-200"
            name="password"
            {...register('password', { required: false })}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <label htmlFor="EditData" className="btn btn-sm btn-warning">
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
      </label>

      <input type="checkbox" id="EditData" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[30vw] max-w-5xl bg-gray-400">
          <h3 className="font-bold text-lg">Tambah Data Karyawan</h3>
          <span className="text-sm">Silahkan isi data karyawan</span>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row flex-wrap mt-5">
              <input
                type="hidden"
                name="tanggal_masuk"
                {...register('tanggal_masuk', { required: false })}
                value={dateNowString}
              />

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    NIK
                    {errors.nik && (
                      <span className="text-red-500 text-xs ml-1">
                        * NIK harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={watch('nik') ? watch('nik') : karyawan.nik}
                  type="text"
                  placeholder="Alberth"
                  className="input input-bordered bg-slate-200"
                  name="nik"
                  {...register('nik', {
                    required: false,
                  })}
                  minLength={16}
                  maxLength={16}
                  pattern="[0-9]*"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Nama Lengkap
                    {errors.nama_pegawai && (
                      <span className="text-red-500 text-xs ml-1">
                        * Nama harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={
                    watch('nama_pegawai')
                      ? watch('nama_pegawai')
                      : karyawan.nama
                  }
                  type="text"
                  placeholder="Alberth"
                  className="input input-bordered bg-slate-200"
                  name="nama_pegawai"
                  {...register('nama_pegawai', { required: false })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Tempat Lahir
                    {errors.tempat_lahir && (
                      <span className="text-red-500 text-xs ml-1">
                        * Tempat lahir harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={
                    watch('tempat_lahir')
                      ? watch('tempat_lahir')
                      : karyawan.tempat_lahir
                  }
                  type="text"
                  placeholder="Alberth"
                  className="input input-bordered bg-slate-200"
                  name="tempat_lahir"
                  {...register('tempat_lahir', { required: false })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Tanggal Lahir
                    {errors.tanggal_lahir && (
                      <span className="text-red-500 text-xs ml-1">
                        * Tanggal lahir harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={
                    watch('tanggal_lahir')
                      ? watch('tanggal_lahir')
                      : karyawan.tanggal_lahir
                  }
                  type="date"
                  placeholder="Alberth"
                  className="input input-bordered bg-slate-200"
                  name="tanggal_lahir"
                  {...register('tanggal_lahir', { required: false })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Jenis Kelamin
                    {errors.jenis_kelamin && (
                      <span className="text-red-500 text-xs ml-1">
                        * Jenis kelamin harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  value={
                    watch('jenis_kelamin')
                      ? watch('jenis_kelamin')
                      : karyawan.jenis_kelamin
                  }
                  className="select select-bordered w-full bg-slate-200"
                  name="jenis_kelamin"
                  {...register('jenis_kelamin', { required: false })}>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Alamat Lengkap
                    {errors.alamat && (
                      <span className="text-red-500 text-xs ml-1">
                        * Alamat harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={watch('alamat') ? watch('alamat') : karyawan.alamat}
                  type="text"
                  placeholder=""
                  className="input input-bordered bg-slate-200"
                  name="alamat"
                  {...register('alamat', { required: false })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Agama
                    {errors.agama && (
                      <span className="text-red-500 text-xs ml-1">
                        * Agama harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  value={watch('agama') ? watch('agama') : karyawan.agama}
                  className="select select-bordered w-full bg-slate-200"
                  name="agama"
                  {...register('agama', { required: false })}>
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
                  <span className="label-text text-slate-700">
                    Status
                    {errors.status_hubungan && (
                      <span className="text-red-500 text-xs ml-1">
                        * Status harus diisi
                      </span>
                    )}
                  </span>
                </label>

                <select
                  value={
                    watch('status_hubungan')
                      ? watch('status_hubungan')
                      : karyawan.status_hubungan
                  }
                  className="select select-bordered w-full bg-slate-200"
                  name="status_hubungan"
                  {...register('status_hubungan', { required: false })}>
                  <option value="Menikah">Menikah</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                </select>
              </div>

              <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    No. Telepon
                    {errors.no_telp && (
                      <span className="text-red-500 text-xs ml-1">
                        * No. Telepon harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={watch('no_telp') ? watch('no_telp') : karyawan.no_telp}
                  type="text"
                  placeholder=""
                  className="input input-bordered bg-slate-200"
                  name="no_telp"
                  {...register('no_telp', { required: false })}
                  minLength={9}
                  maxLength={14}
                  pattern="[0-9]*"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Email Karyawan
                    {errors.email && (
                      <span className="text-red-500 text-xs ml-1">
                        * Email harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  value={watch('email') ? watch('email') : karyawan.email}
                  type="text"
                  placeholder=""
                  className="input input-bordered bg-slate-200"
                  name="email"
                  {...register('email', { required: false })}
                />
              </div>

              <span className="w-full h-[1.5px] mx-3 my-5 bg-slate-700"></span>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Jabatan Karyawan
                    {errors.jabatan_id && (
                      <span className="text-red-500 text-xs ml-1">
                        * Jabatan harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  value={
                    watch('jabatan_id')
                      ? watch('jabatan_id')
                      : karyawan.jabatan_id
                  }
                  className="select select-bordered w-full bg-slate-200"
                  name="jabatan_id"
                  {...register('jabatan_id', { required: false })}>
                  {jabatan?.data.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.jabatan_pegawai}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-700">
                    Status Karyawan
                    {errors.status_id && (
                      <span className="text-red-500 text-xs ml-1">
                        * Status harus diisi
                      </span>
                    )}
                  </span>
                </label>
                <select
                  value={
                    watch('status_id') ? watch('status_id') : karyawan.status_id
                  }
                  className="select select-bordered w-full bg-slate-200"
                  name="status_id"
                  {...register('status_id', { required: false })}>
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
                htmlFor="EditData"
                className="btn btn-md rounded-md border-none bg-red-700">
                Batal
              </label>
              <button
                type="submit"
                className="btn btn-md rounded-md border-none bg-green-700">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditKaryawan
