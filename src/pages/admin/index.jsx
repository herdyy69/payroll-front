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
  console.log(employeed)
  const totalPengeluaran = laporan?.reduce((total, item) => {
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
      value: karyawanHRD?.length,
    },
    {
      name: 'Manager',
      value: karyawanManager?.length,
    },
    {
      name: 'Supervisor',
      value: karyawanSupervisor?.length,
    },
    {
      name: 'Staff',
      value: karyawanStaff?.length,
    },
    {
      name: 'Salesman',
      value: karyawanSalesman?.length,
    },
    {
      name: 'Driver(Sopir)',
      value: karyawanDriver?.length,
    },
    {
      name: 'Total Karyawan',
      value: employeed?.length,
    },
  ]
  const datasStatus = [
    {
      name: 'Aktif',
      value: karyawanAktif?.length,
    },
    {
      name: 'Tidak Aktif',
      value: karyawanTidakAktif?.length,
    },
  ]
  const datasJenisKelamin = [
    {
      name: 'Laki-laki',
      value: karyawanLaki?.length,
    },
    {
      name: 'Perempuan',
      value: karyawanPr?.length,
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
                    <Bold>Quote of the day</Bold>
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
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
