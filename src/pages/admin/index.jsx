/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/TemplatesAdmin/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon'
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon'
import RedditFillIcon from 'remixicon-react/RedditFillIcon'
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon'


import ThousandSeparator from '@/Utils/ThousandSeparator'

import { BarList, Card, Title, Bold, Flex, Text } from '@tremor/react'
import { Metric } from '@tremor/react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
} from '@tremor/react'
import { Divider } from '@tremor/react'

const Index = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote(data.content))
      .catch(error => console.log(error))
  }, [])

  const { dataKaryawan } = fetchData()
  const { dataStatus } = fetchData()
  const { dataJabatan } = fetchData()
  const { dataLaporan } = fetchData()

  const employeed = dataKaryawan?.data
  const jabatan = dataJabatan?.data
  const status = dataStatus?.data
  const laporan = dataLaporan?.data

  const filter2021 = laporan?.filter(item => {
    return item.tahun === '2021'
  })
  const filter2022 = laporan?.filter(item => {
    return item.tahun === '2022'
  })
  const filter2023 = laporan?.filter(item => {
    return item.tahun === 2023
  })
  const filter2024 = laporan?.filter(item => {
    return item.tahun === '2024'
  })
  const filter2025 = laporan?.filter(item => {
    return item.tahun === '2025'
  })

  const totalPengeluaran2021 = filter2021?.reduce((total, item) => {
    return total + item?.total_gaji
  }, 0)
  const totalPengeluaran2022 = filter2022?.reduce((total, item) => {
    return total + item?.total_gaji
  }, 0)
  const totalPengeluaran2023 = filter2023?.reduce((total, item) => {
    return total + item?.total_gaji
  }, 0)
  const totalPengeluaran2024 = filter2024?.reduce((total, item) => {
    return total + item?.total_gaji
  }, 0)
  const totalPengeluaran2025 = filter2025?.reduce((total, item) => {
    return total + item?.total_gaji
  }, 0)

  const karyawanAktif = employeed?.filter(item => {
    return item.status_pegawai === 'Aktif'
  })
  const karyawanTidakAktif = employeed?.filter(item => {
    return item.status_pegawai === 'Tidak Aktif'
  })
  const karyawanLaki = employeed?.filter(item => {
    return item.jenis_kelamin === 'Laki-laki'
  })
  const karyawanPr = employeed?.filter(item => {
    return item.jenis_kelamin === 'Perempuan'
  })

  // filter karyawan yang mempunyai jabatan Human Resource Development
  const karyawanHRD = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Human Resource Development'
  })
  const karyawanManager = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Manager'
  })
  const karyawanSupervisor = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Supervisor'
  })
  const karyawanStaff = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Staff'
  })
  const karyawanSalesman = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Salesman'
  })
  const karyawanDriver = employeed?.filter(item => {
    return item.jabatan.jabatan_pegawai === 'Driver(Sopir)'
  })
  const datasKaryawan = [
    {
      name: 'Human Resource Development',
      value: karyawanHRD?.length || 0,
    },
    {
      name: 'Manager',
      value: karyawanManager?.length || 0,
    },
    {
      name: 'Supervisor',
      value: karyawanSupervisor?.length || 0,
    },
    {
      name: 'Staff',
      value: karyawanStaff?.length || 0,
    },
    {
      name: 'Salesman',
      value: karyawanSalesman?.length || 0,
    },
    {
      name: 'Driver(Sopir)',
      value: karyawanDriver?.length || 0,
    },
    {
      name: 'Total Karyawan',
      value: employeed?.length || 0,
    },
  ]
  const datasStatus = [
    {
      name: 'Aktif',
      value: karyawanAktif?.length || 0,
    },
    {
      name: 'Tidak Aktif',
      value: karyawanTidakAktif?.length || 0,
    },
  ]
  const datasJenisKelamin = [
    {
      name: 'Laki-laki',
      value: karyawanLaki?.length || 0,
    },
    {
      name: 'Perempuan',
      value: karyawanPr?.length || 0,
    },
  ]
  const data5TahunMendatang = [
    {
      name: '2021',
      value: totalPengeluaran2021 || 0,
    },
    {
      name: '2022',
      value: totalPengeluaran2022 || 0,
    },
    {
      name: '2023',
      value: totalPengeluaran2023 || 0,
    },
    {
      name: '2024',
      value: totalPengeluaran2024 || 0,
    },
    {
      name: '2025',
      value: totalPengeluaran2025 || 0,
    },
  ]

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Dashboard`}
        description={AppConfig.description}
      />
      <div className="container mt-2 p-4 rounded-md">
        <div className="grid">
          <div className="grid grid-cols-1 gap-4 mb-3">
            <AccordionList shadow={true} marginTop="mt-0">
              <Accordion expanded={false} shadow={true} marginTop="mt-0">
                <AccordionHeader>
                  <Title size="text-2xl" marginTop="mt-0">
                    <h1 className="text-lg font-bold italic opacity-80">
                      QUOTES OF THE DAY
                    </h1>
                  </Title>
                </AccordionHeader>
                <AccordionBody>
                  <Text>{quote}</Text>
                </AccordionBody>
              </Accordion>
            </AccordionList>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card maxWidth="max-w-lg">
              <Flex marginTop="mt-4">
                <Text>
                  <Bold>Data Karyawan</Bold>
                </Text>
                <Text>
                  <Bold>Orang</Bold>
                </Text>
              </Flex>
              <BarList data={datasKaryawan} marginTop="mt-2" />
            </Card>
            <Card maxWidth="max-w-lg">
              <Flex marginTop="mt-4">
                <Text>
                  <Bold>Status</Bold>
                </Text>
                <Text>
                  <Bold>Orang</Bold>
                </Text>
              </Flex>
              <BarList data={datasStatus} marginTop="mt-2" />
              <Divider />
              <Flex marginTop="mt-4">
                <Text>
                  <Bold>Jenis Kelamin</Bold>
                </Text>
                <Text>
                  <Bold>Orang</Bold>
                </Text>
              </Flex>
              <BarList data={datasJenisKelamin} marginTop="mt-2" />
            </Card>
            <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
              <Text>
                <Bold>Total Pengeluaran</Bold>
              </Text>
              <Divider />
              <BarList data={data5TahunMendatang} marginTop="mt-2" />
            </Card>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
