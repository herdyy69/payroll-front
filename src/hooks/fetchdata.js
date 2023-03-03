import { useQueryBase } from '@/lib/reactQuery'

export const fetchData = () => {
  const { data: dataUsers } = useQueryBase('/api/users')
  const { data: dataKaryawan } = useQueryBase('/api/karyawan', {
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchInterval: 3000,
  })
  const { data: dataStatus } = useQueryBase('/api/status', {
    // refetchInterval: 3000,
  })
  const { data: dataJabatan } = useQueryBase('/api/jabatan', {
    // refetchInterval: 3000,
  })
  const { data: dataLaporan } = useQueryBase('/api/riwayat-laporan', {
    // refetchInterval: 3000,
  })

  return { dataKaryawan, dataStatus, dataJabatan, dataLaporan, dataUsers }
}
