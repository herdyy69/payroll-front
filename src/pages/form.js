/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'

import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import { useForm } from 'react-hook-form'

const form = () => {
  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Beranda`}
        description={AppConfig.description}
      />

      <div className="min-h-screen bg-black flex justify-center items-center">
        <marquee className="text-white text-6xl font-bold">
          Yaallah pengen kwetiau
        </marquee>
      </div>
    </Main>
  )
}

export default form
