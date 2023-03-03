import React, { useState, useEffect } from 'react'
import { TextInput } from '@tremor/react'
import { DatePicker } from '@tremor/react'
import { fetchData } from '@/hooks/fetchdata'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'
import ThousandSeparator from '@/Utils/ThousandSeparator'

import axios from '@/lib/axios'

const UpdateKaryawan = ({ data, buttonClick }) => {
  const { user } = useAuth({ middleware: 'auth' })
  const { dataStatus, dataJabatan } = fetchData()

  const jabatan = dataJabatan?.data
  const statuses = dataStatus?.data

  // hide jabatan id 1 jika user.role hrd atau admin
  const jabatanHrd = jabatan?.filter(item => item.id !== 1)

  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')
  const [selectUpdate, setSelectUpdate] = useState('profile')

  const [namaKaryawan, setNamaKaryawan] = useState(data.nama)
  const [nik, setNik] = useState(data.nik)
  const [alamat, setAlamat] = useState(data.alamat)
  const [noHp, setNoHp] = useState(data.no_telp)
  const [email, setEmail] = useState(data.email)
  const [jenisKelamin, setJenisKelamin] = useState('Laki-laki')
  const [tempatLahir, setTempatLahir] = useState(data.tempat_lahir)
  const [tanggalLahir, setTanggalLahir] = useState(data.tanggal_lahir)
  const [agama, setAgama] = useState('Islam')
  const [status, setStatus] = useState('Menikah')

  const [jabatanId, setJabatanId] = useState('1')
  const [statusId, setStatusId] = useState('1')

  const filterJabatan = jabatan?.filter(item => item.id === parseInt(jabatanId))
  const filterStatus = statuses?.filter(item => item.id === parseInt(statusId))

  const dataGaji = [
    {
      id: 1,
      label: 'Gaji Pokok',
      value: filterJabatan[0]?.gaji_pokok,
    },
    {
      id: 2,
      label: 'Uang Makan',
      value: filterJabatan[0]?.uang_makan,
    },
    {
      id: 3,
      label: 'Uang Transport',
      value: filterJabatan[0]?.uang_transport,
    },
    {
      id: 4,
      label: 'Bonus',
      value: filterJabatan[0]?.bonus,
    },
    {
      id: 5,
      label: 'Bonus Lainnya',
      value: filterStatus[0]?.bonus,
    },
  ]

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [role, setRole] = useState('')

  const formHRD = () => {
    return (
      <div className="my-3 border-y-2 border-white py-2">
        <label className="label">
          <span className="label-text text-white">Nama Karyawan</span>
        </label>
        <TextInput
          label="Nama Karyawan"
          type="text"
          placeholder="Masukkan Nama Karyawan"
          value={namaKaryawan}
          onChange={e => setNamaKaryawan(e.target.value)}
          error={namaKaryawan === '' ? true : false}
          errorMessage="Nama Karyawan tidak boleh kosong"
        />
        <label className="label">
          <span className="label-text text-white">Username</span>
        </label>
        <TextInput
          label="Username"
          type="text"
          placeholder="Masukkan Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={username === '' ? true : false}
          errorMessage="Username tidak boleh kosong"
        />
        <label className="label">
          <span className="label-text text-white">Email</span>
        </label>
        <TextInput
          label="Email"
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={email === '' ? true : false}
          errorMessage="Email tidak boleh kosong"
        />
        <label className="label">
          <span className="label-text text-white">Password</span>
        </label>
        <TextInput
          label="Password"
          type="password"
          placeholder="Masukkan Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={password === '' ? true : false}
          errorMessage="Password tidak boleh kosong"
        />
        <label className="label">
          <span className="label-text text-white">Konfirmasi Password</span>
        </label>
        <TextInput
          label="Konfirmasi Password"
          type="password"
          placeholder="Masukkan Konfirmasi Password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          error={password !== passwordConfirmation ? true : false}
          errorMessage="Password tidak sama"
        />
      </div>
    )
  }

  const formInput = [
    {
      id: 1,
      label: 'Nama Karyawan',
      type: 'text',
      placeholder: 'Masukkan Nama Karyawan',
      value: namaKaryawan,
      defaultValue: data.nama,
      onChange: e => setNamaKaryawan(e.target.value),
      errorMsg: 'Nama Karyawan tidak boleh kosong',
    },
    {
      id: 2,
      label: 'NIK',
      type: 'number',
      placeholder: 'Masukkan NIK',
      value: nik,
      defaultValue: data.nik,
      onChange: e => setNik(e.target.value),
      errorMsg: 'NIK tidak boleh kosong',
    },
    {
      id: 3,
      label: 'Alamat',
      type: 'text',
      placeholder: 'Masukkan Alamat',
      value: alamat,
      defaultValue: data.alamat,
      onChange: e => setAlamat(e.target.value),
      errorMsg: 'Alamat tidak boleh kosong',
    },
    {
      id: 4,
      label: 'No. HP',
      type: 'number',
      placeholder: 'Masukkan No. HP',
      value: noHp,
      defaultValue: data.no_telp,
      onChange: e => setNoHp(e.target.value),
      errorMsg: 'No. HP tidak boleh kosong',
    },
    {
      id: 5,
      label: 'Email',
      type: 'email',
      placeholder: 'Masukkan Email',
      value: email,
      defaultValue: data.email,
      onChange: e => setEmail(e.target.value),
      errorMsg: 'Email tidak boleh kosong',
    },
    {
      id: 6,
      label: 'Jenis Kelamin',
      type: 'text',
      placeholder: 'Masukkan Jenis Kelamin',
      value: jenisKelamin,
      defaultValue: data.jenis_kelamin,
      onChange: e => setJenisKelamin(e.target.value),
    },
    {
      id: 7,
      label: 'Tempat Lahir',
      type: 'text',
      placeholder: 'Masukkan Tempat Lahir',
      value: tempatLahir,
      defaultValue: data.tempat_lahir,
      onChange: e => setTempatLahir(e.target.value),
      errorMsg: 'Tempat Lahir tidak boleh kosong',
    },
    {
      id: 8,
      label: 'Tanggal Lahir',
      type: 'date',
      placeholder: 'Masukkan Tanggal Lahir',
      value: tanggalLahir,
      defaultValue: data.tanggal_lahir,
      onChange: e => setTanggalLahir(e.target.value),
      errorMsg: 'Tanggal Lahir tidak boleh kosong',
    },
    {
      id: 9,
      label: 'Agama',
      type: 'text',
      placeholder: 'Masukkan Agama',
      value: agama,
      defaultValue: data.agama,
      onChange: e => setAgama(e.target.value),
    },
    {
      id: 10,
      label: 'Status',
      type: 'text',
      placeholder: 'Masukkan Status',
      value: status,
      defaultValue: data.status,
      onChange: e => setStatus(e.target.value),
    },
  ]

  const onSubmit = e => {
    e.preventDefault()
    if (selectUpdate === 'profile') {
      axios
        .put(`api/karyawan/${data.id}`, {
          nama_pegawai: namaKaryawan,
          nik: nik,
          alamat: alamat,
          no_telp: noHp,
          email: email,
          jenis_kelamin: jenisKelamin,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          agama: agama,
          status_hubungan: status,
        })
        .then(res => {
          setSuccess(res.data)
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
    } else if (selectUpdate === 'gaji') {
      if (jabatanId === '1') {
        axios
          .put(`api/karyawan/${data.id}/update-gaji`, {
            name: data.nama,
            username: username,
            email: email,
            password: password,
            jabatan_id: jabatanId,
            status_id: statusId,
          })
          .then(res => {
            setSuccess(res.data)
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
      } else {
        axios
          .put(`api/karyawan/${data.id}/update-gaji`, {
            jabatan_id: jabatanId,
            status_id: statusId,
          })
          .then(res => {
            setSuccess(res.data)
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
    }
  }

  return (
    <div
      className={`${
        data
          ? 'animate__animated animate__fadeIn animate__faster'
          : 'animate__animated animate__fadeOut '
      }

      fixed inset-0 z-[991] flex items-center justify-center min-h-screen bg-transparent`}>
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

      <div className="flex flex-col items-start p-4 bg-slate-800 w-[40%] h-[90vh] opacity-100 border-2 border-white rounded-md overflow-y-auto">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-white">Update Karyawan</h1>
          <span className="text-white mb-4">
            Silahkan update data karyawan dengan benar
          </span>
          <div className="flex flex-row mb-3">
            <button
              onClick={() => setSelectUpdate('profile')}
              className={` ${
                selectUpdate === 'profile' ? 'btn-disabled' : ''
              } btn btn-sm btn-primary`}>
              <span className="text-white">Update Profile</span>
            </button>
            <button
              onClick={() => setSelectUpdate('gaji')}
              className={` ${
                selectUpdate === 'gaji' ? 'btn-disabled' : ''
              } btn btn-sm btn-primary ml-2`}>
              <span className="text-white">Update Gaji</span>
            </button>
          </div>
          <hr className="w-full border-white mb-3" />
          <form
            onSubmit={e => {
              e.preventDefault()
              onSubmit(e)
            }}
            className="flex flex-col w-full">
            {selectUpdate === 'profile' &&
              formInput.map((item, index) => (
                <>
                  <label className="label">
                    <span className="label-text text-white">{item.label}</span>
                  </label>
                  {item.id === 6 ? (
                    <select
                      value={item.value}
                      onChange={item.onChange}
                      className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full">
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : item.id === 9 ? (
                    <select
                      value={item.value}
                      onChange={item.onChange}
                      className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full">
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                    </select>
                  ) : item.id === 10 ? (
                    <select
                      value={item.value}
                      onChange={item.onChange}
                      className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full">
                      <option value="Menikah">Menikah</option>
                      <option value="Belum Menikah">Belum Menikah</option>
                    </select>
                  ) : item.id === 8 ? (
                    <input
                      type={item.type}
                      placeholder={item.placeholder}
                      value={item.value ? item.value : item.defaultValue}
                      onChange={item.onChange}
                      className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                    />
                  ) : item.id === 2 ? (
                    <input
                      className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                      type="text"
                      value={item.value ? item.value : item.defaultValue}
                      onChange={item.onChange}
                      minLength={16}
                      maxLength={16}
                      pattern="[0-9]*"
                      required
                    />
                  ) : item.id === 4 ? (
                    <input
                      className="input input-bordered input-sm h-[2.3rem] bg-white text-black font-normal w-full"
                      type="text"
                      value={item.value ? item.value : item.defaultValue}
                      onChange={item.onChange}
                      minLength={10}
                      maxLength={14}
                      pattern="[0-9]*"
                      required
                    />
                  ) : (
                    <TextInput
                      key={index}
                      label={item.label}
                      type={item.type}
                      placeholder={item.placeholder}
                      value={item.value ? item.value : item.defaultValue}
                      onChange={item.onChange}
                      error={item.value === '' && true}
                      errorMessage={item.errorMsg}
                    />
                  )}
                </>
              ))}

            {selectUpdate === 'gaji' && (
              <>
                <label className="label">
                  <span className="label-text text-white">Jabatan</span>
                </label>
                <select
                  value={jabatanId}
                  onChange={e => setJabatanId(e.target.value)}
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full">
                  {/* {jabatan?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.jabatan_pegawai}
                    </option>
                  ))} */}
                  {user?.role === 'Super Admin'
                    ? jabatan?.map((item, index) => (
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
                <label className="label">
                  <span className="label-text text-white">Status</span>
                </label>
                <select
                  value={statusId}
                  onChange={e => setStatusId(e.target.value)}
                  className="select select-bordered select-sm h-[2.3rem] bg-white text-black font-normal w-full">
                  {statuses?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.status_pegawai}
                    </option>
                  ))}
                </select>
                {jabatanId === '1' && formHRD()}

                <hr className="w-full border-white mt-3 mb-3" />
                {dataGaji?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between w-full mt-1">
                    <label className="label">
                      <span className="label-text text-white">
                        {item.label}
                      </span>
                    </label>
                    <label className="label">
                      <span className="label-text text-white">
                        <ThousandSeparator money={item.value} />
                      </span>
                    </label>
                  </div>
                ))}
                <hr className="w-full border-white mt-3 mb-3" />
              </>
            )}

            <div className="flex flex-row justify-end w-full mt-4">
              <button
                onClick={e => {
                  setNamaKaryawan('')
                  setNik('')
                  setAlamat('')
                  setNoHp('')
                  setEmail('')
                  setJenisKelamin('Laki-laki')
                  setTempatLahir('')
                  setTanggalLahir('')
                  setAgama('Islam')
                  setStatus('Menikah')
                }}
                type="button">
                {buttonClick}
              </button>
              <button
                type="button"
                type="submit"
                className="btn btn-primary btn-sm rounded-md ml-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateKaryawan
