import React from 'react'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import InputError from '@/components/InputError'
import { useRouter } from 'next/router'

const FormLogin = () => {
  const router = useRouter()
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin',
  })
  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = async event => {
    event.preventDefault()

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }
  return (
    <form class="space-y-6 z-10" onSubmit={submitForm}>
      <div class="flex justify-center">
        <div>
          <div class="relative mb-3 w-full">
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              type="email"
              class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent padding py-4 px-3 text-base font-normal leading-tight text-white ease-in-out placeholder:text-transparent focus:border-primary focus:bg-slate-900 focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-white focus:shadow-te-primary focus:outline-none [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem]"
              id="email"
              placeholder="name@example.com"
            />
            <label
              for="email"
              class="pointer-events-none absolute top-0 left-0 origin-[0_0] border border-solid border-transparent py-4 px-3 text-white transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none dark:text-neutral-200">
              Email
            </label>
          </div>
          <div class="relative mb-3 w-full">
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent padding py-4 px-3 text-base font-normal leading-tight text-white ease-in-out placeholder:text-transparent focus:border-primary focus:bg-slate-900 focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-white focus:shadow-te-primary focus:outline-none [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem]"
              id="password"
              placeholder="name@example.com"
            />
            <label
              for="password"
              class="pointer-events-none absolute top-0 left-0 origin-[0_0] border border-solid border-transparent py-4 px-3 text-white transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none dark:text-neutral-200">
              Password
            </label>
          </div>
        </div>
      </div>

      <InputError messages={errors.email} className="mt-2" />
      <InputError messages={errors.password} className="mt-2" />

      <button class="btn btn-primary btn-md btn-block" type="submit">
        <span class="btn-inner--icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
        <span class="btn-inner--text">Login</span>
      </button>
    </form>
  )
}

export default FormLogin
