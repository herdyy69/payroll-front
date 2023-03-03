import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import EditKaryawan from '@/components/Karyawan/EditKaryawan'

const DetailKaryawan = ({ onClick, onClose, data }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const [fotoProfile, setFotoProfile] = useState('')

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
      })
      .catch(err => {})
  }

  const onSubmitBank = dataBank => {
    axios
      .post(`api/karyawan/${data.id}/update-bank`, {
        ...dataBank,
      })
      .then(res => {
        document.getElementById('modalEditDataBank').checked = false
        reset()
      })
      .catch(err => {
        // setErr(err.response.data)
      })
  }

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

  return (
    <>
      <label
        onClick={onClick}
        className="btn btn-ghost btn-xs"
        htmlFor="DetailKaryawan_1">
        Detail
      </label>

      <input type="checkbox" id="DetailKaryawan_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[40vw] max-w-5xl bg-slate-700">
          <div className="flex flex-row justify-start items-center mb-5">
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.foto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="flex flex-row items-end justify-end w-[10vw] h-[20vh] border-2 border-slate-800">
              <label htmlFor="EditImage_1" className="cursor-pointer">
                <BiEdit className="text-2xl text-black" />
              </label>
            </div>
            <div className="flex flex-col items-start justify-center ml-3">
              <div className="font-bold whitespace-normal max-w-[15rem]">
                <span className="text-lg">{data?.nama}</span>
                {data?.status_pegawai === 'Aktif' ? (
                  <div className="badge badge-success badge-md text-white ml-1">
                    Aktif
                  </div>
                ) : (
                  <div className="badge badge-danger badge-md text-white ml-1">
                    Tidak Aktif
                  </div>
                )}
                <div className="text-xs opacity-50">{data?.nik}</div>

                <div className="text-[10px] opacity-50">
                  {data?.jabatan?.jabatan_pegawai} -{' '}
                  {data?.status_karyawan?.status_pegawai}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Tempat Lahir</div>
            <div className="text-base opacity-50">{data?.tempat_lahir}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Tanggal Lahir</div>
            <div className="text-base opacity-50">{data?.tanggal_lahir}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Jenis Kelamin</div>
            <div className="text-base opacity-50">{data?.jenis_kelamin}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Alamat Lengkap</div>
            <div className="text-sm opacity-50 whitespace-normal text-end">
              {data?.alamat}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Agama</div>
            <div className="text-base opacity-50">{data?.agama}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Status</div>
            <div className="text-base opacity-50">{data?.status_hubungan}</div>
          </div>
          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">No Telepon</div>
            <div className="text-sm opacity-50">{data?.no_telp}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Email</div>
            <div className="text-sm opacity-50">{data?.email}</div>
          </div>
          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Tanggal Masuk</div>
            <div className="text-sm opacity-50">{data?.tanggal_masuk}</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Lama Kerja</div>
            <div className="text-[10px] opacity-50">{lamaKerja()}</div>
          </div>
          <div className="w-full h-[1.5px] my-2 bg-slate-800"></div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Nama Bank</div>
            <div className="text-sm opacity-50">
              {data?.nama_bank ? data?.nama_bank : 'data kosong'}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">No Rekening</div>
            <div className="text-[10px] opacity-50">
              {data?.no_rekening ? data?.no_rekening : 'data kosong'}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-1">
            <div className="text-sm font-bold">Atas Nama</div>
            <div className="text-[10px] opacity-50">
              {data?.atas_nama ? data?.atas_nama : 'data kosong'}
            </div>
          </div>

          <div className="modal-action">
            <label
              onClick={onClose}
              htmlFor="DetailKaryawan_1"
              className="btn btn-error btn-xs text-white rounded-sm border-none bg-red-700">
              Batal
            </label>
            <label
              htmlFor="modalEditDataBank"
              className="btn btn-primary btn-xs rounded-sm border-none bg-green-700">
              Edit Data Bank
            </label>
            <EditKaryawan karyawan={data} />
          </div>
        </div>
      </div>

      <input type="checkbox" id="EditImage_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[30vw] max-w-5xl bg-slate-700">
          <h3 className="font-bold text-lg">Edit Foto Profile</h3>
          <span className="text-sm">Silahkan isi data dengan benar</span>

          <div className="border-2 border-slate-800 w-[45%] mx-auto p-1 rounded-md mt-4">
            <img
              src={fotoProfile && URL.createObjectURL(fotoProfile)}
              className="w-full h-28"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Foto Profil</span>
            </label>
            <input
              onChange={e => setFotoProfile(e.target.files[0])}
              type="file"
              className="file-input file-input-bordered bg-slate-700"
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

      <input type="checkbox" id="modalEditDataBank" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box md:w-[30vw] max-w-5xl bg-slate-700">
          <h3 className="font-bold text-lg">Edit data Bank</h3>
          <span className="text-sm">Silahkan isi data dengan benar</span>

          <form onSubmit={handleSubmit(onSubmitBank)}>
            <input
              type="hidden"
              name="nama_bank"
              {...register('nama_bank', {
                required: true,
              })}
              value={'CIMB NIAGA'}
            />

            <div className="flex flex-row flex-wrap mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    No Rekening
                    {errors.no_rekening && (
                      <span className="text-red-500 text-xs ml-1">
                        * wajib diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered bg-slate-200 text-slate-700"
                  name="no_rekening"
                  {...register('no_rekening', {
                    required: true,
                  })}
                  minLength={14}
                  maxLength={14}
                  pattern="[0-9]*"
                  value={
                    watch('no_rekening')
                      ? watch('no_rekening')
                      : data?.no_rekening
                  }
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-white">
                    Atas Nama
                    {errors.atas_nama && (
                      <span className="text-red-500 text-xs ml-1">
                        * wajib diisi
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Alberth"
                  className="input input-bordered bg-slate-200 text-slate-700"
                  name="atas_nama"
                  {...register('atas_nama', {
                    required: true,
                  })}
                  value={
                    watch('atas_nama') ? watch('atas_nama') : data?.atas_nama
                  }
                />
              </div>
            </div>
            <div className="modal-action">
              <label
                htmlFor="modalEditDataBank"
                className="btn btn-error btn-xs text-white rounded-sm border-none bg-red-700">
                Batal
              </label>
              <button
                type="submit"
                className="btn btn-primary btn-xs rounded-sm border-none bg-green-700">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DetailKaryawan
