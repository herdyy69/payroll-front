import { useQueryBase } from '@/lib/reactQuery'
import { useAuth } from '@/hooks/auth'

export const fetchData = () => {
  const { user } = useAuth({ middleware: 'auth' })

  const { data: dataUsers } = useQueryBase('/api/users')
  const { data: dataKaryawan } = useQueryBase('/api/karyawan', {
    refetchInterval: 4000,
  })
  const { data: dataStatus } = useQueryBase('/api/status', {
    refetchInterval: 6000,
  })
  const { data: dataJabatan } = useQueryBase('/api/jabatan', {
    refetchInterval: 6000,
  })
  const { data: dataLaporan } = useQueryBase('/api/riwayat-laporan', {
    refetchInterval: 4000,
  })

  if (user?.role === 'Super Admin') {
    return { dataKaryawan, dataStatus, dataJabatan, dataLaporan, dataUsers }
  }
  return { dataKaryawan, dataStatus, dataJabatan, dataLaporan }
}
