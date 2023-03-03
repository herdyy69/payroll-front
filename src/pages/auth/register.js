/* eslint-disable unused-imports/no-unused-vars */
import { useState } from 'react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin',
  })

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const submitForm = e => {
    e.preventDefault()

    register({
      name,
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role: 'Super Admin',
      setErrors,
    })
  }

  const linkImage =
    'https://i.ibb.co/RT9qt2K/p-headline-nidji-ajak-makan-es-krim-di-walls-ice-c-6e3667.jpg'

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} - Home`}
        description={AppConfig.description}
      />

      <div
        style={{
          backgroundImage: `url(${linkImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '97vh',
          width: '98vw',
        }}
        class="w-full mx-auto mt-2 transition-all duration-300 blur-[1px] hover:blur-none rounded-md border-2 border-slate-800">
        <div class="flex flex-col justify-center items-center h-full px-10 text-white">
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-5" onSubmit={submitForm}>
              {/* <h5 class="text-xl font-medium text-gray-900 dark:text-white">
                CV PRA BANDUNG
              </h5> */}
              <div>
                <label
                  for="nama"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Anda
                </label>
                <input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  type="text"
                  id="nama"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John doe"
                  required
                />
                <InputError messages={errors.name} className="mt-2" />
              </div>
              <div>
                <label
                  for="nama"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username Anda
                </label>
                <input
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  type="text"
                  id="nama"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John doe"
                  required
                />
                <InputError messages={errors.username} className="mt-2" />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Anda
                </label>
                <input
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
                <InputError messages={errors.email} className="mt-2" />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <InputError messages={errors.password} className="mt-2" />
              </div>
              <div>
                <label
                  for="confirmPassword"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Konfirmasi Password
                </label>
                <input
                  value={passwordConfirmation}
                  onChange={event =>
                    setPasswordConfirmation(event.target.value)
                  }
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <InputError
                  messages={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Buat Akun
              </button>
            </form>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Register
