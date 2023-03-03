/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'

import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'

// import item from react query
import { useQuery } from 'react-query'

const Index = () => {
  const { dataKaryawan } = fetchData()
  const { dataStatus } = fetchData()
  const { dataJabatan } = fetchData()

  const linkImage =
    'https://i.ibb.co/RT9qt2K/p-headline-nidji-ajak-makan-es-krim-di-walls-ice-c-6e3667.jpg'

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Beranda`}
        description={AppConfig.description}
      />
      <div
        style={{
          backgroundImage: `url(${linkImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          width: '98vw',
        }}
        className="w-full mx-auto mt-2 transition-all duration-300 blur-[1px] hover:blur-none rounded-md border-2 border-slate-800">
        <div className="flex flex-col justify-center items-start h-full px-10 text-white">
          <h1
            className="text-4xl font-bold text-white"
            style={{ textShadow: '2px 2px 4px #000000' }}>
            SEMUA JADI HAPPY BERSAMA WALLS
          </h1>
          <div className="flex flex-col md:flex-row">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span
                style={{ textShadow: '2px 2px 4px #000000' }}
                className="button-text">
                Selengkapnya
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        id="section-1"
        className="bg-[#ED1A23] m-3 rounded-lg border-2 border-slate-800">
        <div className="py-8"></div>
      </div>
    </Main>
  )
}

export default Index
