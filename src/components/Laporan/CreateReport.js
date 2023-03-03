import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from '@/lib/axios'

const CreateReport = ({ karyawan, laporan, jabatan, status }) => {
  const [success, setSuccess] = useState()
  const [err, setErr] = useState()

  const dateNow = new Date()
  const date = dateNow.getDate()
  const month = dateNow.getMonth() + 1
  const year = dateNow.getFullYear()
  const dateNowString = `${year}-${month}-${date}`
  const employee = karyawan?.data?.filter(item => {
    return item.status_pegawai === 'Aktif'
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const filtered = karyawan?.data?.filter(item => {
    return item.id === parseInt(watch('karyawan_id'))
  })

  const allSalary =
    watch('karyawan_id') &&
    +filtered[0]?.jabatan?.gaji_pokok +
      filtered[0]?.jabatan?.uang_transport +
      filtered[0]?.jabatan?.uang_makan +
      filtered[0]?.jabatan?.bonus +
      filtered[0]?.status_karyawan?.bonus

  const [gajiPokok, setGajiPokok] = useState()
  const [bonus, setBonus] = useState(0)
  const [potonganIzin, setPotonganIzin] = useState(0)
  const [potonganSakit, setPotonganSakit] = useState(0)
  const [potonganAlpha, setPotonganAlpha] = useState(0)

  const notifyInfo = () => {
    toast.info(err?.message, {
      className: 'text-sm',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }
  const notifySuccess = () => {
    toast.success(success, {
      className: 'text-sm',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  const onSubmit = data => {
    const formData = new FormData()
    formData.append(
      'kode_laporan',
      `LAP-${dateNowString}-${watch('karyawan_id')}`,
    )
    formData.append('karyawan_id', watch('karyawan_id'))
    formData.append('tanggal_laporan', dateNowString)
    formData.append('gaji_pokok', allSalary)
    formData.append('bonus', bonus)
    formData.append('potongan_izin', potonganIzin)
    formData.append('potongan_sakit', potonganSakit)
    formData.append('potongan_alpa', potonganAlpha)
    formData.append(
      'total_potongan',
      parseInt(potonganIzin) +
        parseInt(potonganSakit) +
        parseInt(potonganAlpha),
    )
    formData.append(
      'total_gaji',
      allSalary +
        parseInt(bonus) -
        (parseInt(potonganIzin) +
          parseInt(potonganSakit) +
          parseInt(potonganAlpha)),
    )
    formData.append('keterangan', 'sukses')

    axios
      .post('api/riwayat-laporan', formData)
      .then(res => {
        document.getElementById('createReport_1').checked = false
        reset()
        setSuccess(res.data.message)
        setTimeout(() => {
          setSuccess('')
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
    const gaji_pokok = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(
      filtered[0]?.jabatan.gaji_pokok + filtered[0]?.status_karyawan.bonus,
    )
    const potonganGaji = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(
      parseInt(potonganIzin) +
        parseInt(potonganSakit) +
        parseInt(potonganAlpha),
    )
    const totalGaji = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(
      allSalary +
        parseInt(bonus) -
        (parseInt(potonganIzin) +
          parseInt(potonganSakit) +
          parseInt(potonganAlpha)),
    )

    return (
      <>
        <span className="w-full h-[1.5px] mx-3 my-2 bg-slate-700"></span>

        <div className="form-control w-full">
          <input
            type="text"
            style={{ opacity: 0.5, cursor: 'not-allowed' }}
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full text-xs"
            value={
              filtered[0]?.jabatan.jabatan_pegawai +
              ' - ' +
              filtered[0]?.status_karyawan.status_pegawai
            }
            readOnly
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Total Gaji</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            value={new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(allSalary)}
            readOnly
          />
        </div>

        <span className="w-full h-[1.5px] mx-3 my-2 bg-slate-700"></span>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Bonus</span>
          </label>
          <input
            onChange={e => {
              setBonus(e.target.value)
            }}
            onWheel={e => {
              e.target.blur()
            }}
            value={bonus}
            type="number"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            // name="bonus"
            // {...register('bonus', { required: false })}
            // minLength={1}
            // pattern="[0-9]*"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Potongan Izin</span>
          </label>
          <input
            onChange={e => {
              setPotonganIzin(e.target.value)
            }}
            onWheel={e => {
              e.target.blur()
            }}
            value={potonganIzin}
            type="number"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            // name="potongan_izin"
            // {...register('potongan_izin', { required: false })}
            // minLength={1}
            // pattern="[0-9]*"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Potongan Sakit</span>
          </label>
          <input
            onChange={e => {
              setPotonganSakit(e.target.value)
            }}
            onWheel={e => {
              e.target.blur()
            }}
            value={potonganSakit}
            type="number"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            // name="potongan_sakit"
            // {...register('potongan_sakit', { required: false })}
            // minLength={1}
            // pattern="[0-9]*"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Potongan Alpha</span>
          </label>
          <input
            onChange={e => {
              setPotonganAlpha(e.target.value)
            }}
            onWheel={e => {
              e.target.blur()
            }}
            value={potonganAlpha}
            type="number"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            // name="potongan_alpa"
            // {...register('potongan_alpa', { required: false })}
            // minLength={1}
            // pattern="[0-9]*"
          />
        </div>

        <span className="w-full h-[1.5px] mx-3 my-2 bg-slate-700"></span>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Total Potongan Gaji</span>
          </label>
          <input
            value={potonganGaji || 0}
            type="text"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            name="total_potongan"
            {...register('total_potongan', { required: false })}
            minLength={1}
            pattern="[0-9]*"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Total Gaji Bersih</span>
          </label>
          <input
            value={totalGaji || 0}
            type="text"
            className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
            name="total_gaji"
            {...register('total_gaji', { required: false })}
            minLength={1}
            pattern="[0-9]*"
          />
        </div>
      </>
    )
  }

  return (
    <>
      {err && notifyInfo()}
      {success && notifySuccess()}
      <label
        className="btn btn-primary border-none bg-slate-800 gap-2"
        htmlFor="createReport_1">
        <AiFillPlusCircle className="text-2xl" />
        <span className="text-sm">Tambah Laporan</span>
      </label>

      <input type="checkbox" id="createReport_1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-start p-4 bg-slate-800 w-[35%] opacity-100 border-2 border-white rounded-md overflow-y-auto">
          <h3 className="font-bold text-lg">Tambah Data Karyawan</h3>
          <span className="text-sm">Silahkan isi data karyawan</span>
          <div className="flex flex-row flex-wrap mt-5">
            <input
              type="hidden"
              name=" tanggal_laporan "
              {...register(' tanggal_laporan ', { required: true })}
              value={dateNowString}
            />

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">
                  Nama Karyawan
                  {errors.karyawan_id && (
                    <span className="text-red-500 text-xs ml-1">
                      * Status harus diisi
                    </span>
                  )}
                </span>
              </label>
              <select
                className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full"
                name="karyawan_id"
                {...register('karyawan_id', { required: true })}>
                {employee?.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            {watch('karyawan_id') && formForHRD()}
          </div>

          <div className="modal-action w-full">
            <label
              htmlFor="createReport_1"
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

export default CreateReport
