import 'animate.css'
import '@/styles/global.css'
import '@/styles/uiverse.css'

import 'react-toastify/dist/ReactToastify.css'
import '@tremor/react/dist/esm/tremor.css'
import 'setimmediate'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

if (!global.setImmediate) {
  global.setImmediate = setTimeout
}
const Loader = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
    }
    const handleComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center bg-slate-800">
          <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      )}
    </>
  )
}

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Loader />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
