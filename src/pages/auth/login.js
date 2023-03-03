import { useEffect, useState } from 'react'
import InputError from '@/components/InputError'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/auth'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'

import FormLogin from '@/components/Auth/FormLogin'
import FormRegister from '@/components/Auth/FormRegister'

const Login = () => {
  const [selectForm, setSelectForm] = useState('login')
  const [hint, setHint] = useState('')
  const [msgHint, setMsgHint] = useState('')
  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | Login`}
        description={AppConfig.description}
      />
      <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div class="card-universe">
          <div class="z-10 scroll">
            <div className="mb-5">
              <span class="text-3xl font-bold bg-slate-700 text-white p-2">
                {selectForm === 'login' ? 'SIGN IN' : 'REGISTER'}
              </span>
              <div class="flex flex-row justify-center mt-2 bg-slate-800 border border-white">
                <button
                  disabled={selectForm === 'login'}
                  onClick={() => setSelectForm('login')}
                  class="btn btn-primary btn-sm w-32 rounded-none">
                  Login
                </button>
                <label
                  disabled={selectForm === 'register'}
                  htmlFor="HINTMODAL"
                  class="btn btn-primary btn-sm w-32 rounded-none">
                  Register
                </label>
              </div>
            </div>
            {selectForm === 'login' ? <FormLogin /> : <FormRegister />}
          </div>
        </div>
      </div>

      <input type="checkbox" id="HINTMODAL" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-slate-800 rounded-md">
          <h3 className="font-bold text-lg text-white">
            Mohon untuk memasukkan hint yang benar
          </h3>
          <div class="relative mb-3 w-full">
            <input
              value={hint}
              onChange={event => setHint(event.target.value)}
              type="password"
              class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent padding py-4 px-3 text-base font-normal leading-tight text-white ease-in-out placeholder:text-transparent focus:border-primary focus:bg-slate-900 focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-white focus:shadow-te-primary focus:outline-none [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem]"
              id="hint"
              placeholder="name@example.com"
            />
            <label
              for="hint"
              class="pointer-events-none absolute top-0 left-0 origin-[0_0] border border-solid border-transparent py-4 px-3 text-white transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none dark:text-neutral-200">
              HINT{' '}
              <span className="text-red-500 text-sm">
                *{msgHint ? msgHint : ''}
              </span>
            </label>
          </div>
          <div className="modal-action">
            <label htmlFor="HINTMODAL" className="btn btn-sm w-32 rounded-none">
              KEMBALI
            </label>
            <button
              onClick={() => {
                if (hint === 'admin') {
                  setSelectForm('register')
                  setHint('')
                  setMsgHint('')
                  document.getElementById('HINTMODAL').checked = false
                } else {
                  setMsgHint('Hint yang anda masukkan salah')
                }
              }}
              className="btn btn-primary btn-sm w-32 rounded-none">
              KIRIM
            </button>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Login
