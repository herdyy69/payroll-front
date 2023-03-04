/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import React, { useRef } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'
import { fetchData } from '@/hooks/fetchdata'
import Building2 from 'remixicon-react/Building2FillIcon'

// import social media
import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon'
import InstagramFillIcon from 'remixicon-react/InstagramFillIcon'
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon'
import FacebookFillIcon from 'remixicon-react/FacebookFillIcon'

// import item from react query

const Index = () => {
  const targetRef = useRef(null)

  const handleClick = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const socialMedia = [
    {
      id: 1,
      name: 'Youtube',
      icon: <YoutubeFillIcon />,
      link: 'https://www.youtube.com/channel/UCXl9GX28SHfMMaD6Hlu3nsg',
    },
    {
      id: 2,
      name: 'Instagram',
      icon: <InstagramFillIcon />,
      link: 'https://www.instagram.com/wallsidn/?hl=id',
    },
    {
      id: 3,
      name: 'Twitter',
      icon: <TwitterFillIcon />,
      link: 'https://twitter.com/wallsidn',
    },
    {
      id: 4,
      name: 'Facebook',
      icon: <FacebookFillIcon />,
      link: 'https://id-id.facebook.com/WallsIDN/',
    },
  ]

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
            <button onClick={handleClick} className="learn-more">
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
        ref={targetRef}
        id="section-1"
        className="bg-[#ED1A23] m-3 p-4 rounded-lg border-2 border-slate-800">
        <div className="flex flex-row justify-center items-center gap-4">
          <Building2 className=" text-white" size={200} />
          <div className="flex flex-col justify-center items-start w-[50%]">
            <h1 className="text-4xl font-bold text-white">WALLS ICE CREAM</h1>
            <p className="text-white text-lg">
              Walls Unilever adalah salah satu merek es krim terkemuka di dunia
              yang didirikan pada tahun 1922. Perusahaan ini merupakan bagian
              dari Unilever, perusahaan multinasional yang berbasis di Inggris.
              Walls Unilever memiliki pabrik produksi di berbagai negara di
              seluruh dunia dan memasarkan produknya ke lebih dari 40 negara di
              dunia.
            </p>
          </div>
        </div>
      </div>
      <div
        id="section-1"
        className="bg-[#ED1A23] m-3 p-4 rounded-lg border-2 border-slate-800">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Social Media</h1>
          <div className="flex flex-row justify-center items-center gap-4">
            {socialMedia.map(media => (
              <a
                key={media.id}
                href={media.link}
                className="flex flex-row justify-center items-center gap-2 p-2 rounded-md bg-[#ED1A23] hover:bg-[#ED1A23] text-white transition-all duration-300 hover:shadow-lg">
                {media.icon} {media.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Index
