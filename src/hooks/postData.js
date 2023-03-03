import axios from '@/lib/axios'
import { useEffect } from 'react'

export const usePostData = () => {
  const createKaryawan = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    await axios
      .post('/karyawan', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const createStatus = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    await axios
      .post('/status', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const createJabatan = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    await axios
      .post('/jabatan', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const createLaporan = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    await axios
      .post('/riwayat-laporan', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  return {
    createKaryawan,
    createStatus,
    createJabatan,
    createLaporan,
  }
}
