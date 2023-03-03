/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/TemplatesAdmin/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import { Button } from '@tremor/react'
import { AiFillPlusCircle } from 'react-icons/ai'

import DetailLaporan from '@/components/Laporan/DetailsReport'
import EditStatus from '@/components/Status/EditStatus'

import axios from '@/lib/axios'
import ThousandSeparator from '@/Utils/ThousandSeparator'

const Index = () => {
  const { dataKaryawan, dataStatus, dataJabatan, dataLaporan } = fetchData()

  const laporan = dataLaporan?.data
  const jabatan = dataJabatan?.data
  const status = dataStatus?.data

  const [detail, setDetail] = useState('')

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Dashboard Status`}
        description={AppConfig.description}
      />
      {/* <div className="flex flex-row flex-wrap-reverse items-center justify-between">
        <CreateReport karyawan={dataKaryawan} laporan={dataLaporan} />
      </div> */}
      <div className="container mt-2 p-4 rounded-md">
        <div className="grid">
          <div className="flex flex-col mt-1 p-2 bg-slate-600 rounded-md overflow-x-auto w-full">
            <table className="table z-0 w-full">
              <thead>
                <tr className="text-white">
                  <th>Jenis Status</th>
                  <th>bonus</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {status &&
                  status?.map(data => (
                    <tr
                      key={data?.id}
                      className="text-slate-100 text-sm font-bold">
                      <td>{data?.status_pegawai}</td>
                      <td>
                        <ThousandSeparator money={data?.bonus} />
                      </td>
                      <td>
                        <EditStatus
                          onClick={() => setDetail(data)}
                          onClose={() => setDetail('')}
                          id={data?.id}
                          data={detail}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
