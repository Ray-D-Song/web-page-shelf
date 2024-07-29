import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import type { CE } from '@web-page-shelf/global'
import fetcher from '@/utils/fetcher'
import { userStore } from '@/store/user'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: CE) => {
    const { name, value } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const loginReq = fetcher('/auth/login', {
    method: 'POST',
    body: form,
  })
  const navigate = useNavigate()
  const { run: handleLogin } = useRequest(loginReq, {
    manual: true,
    onSuccess: (data) => {
      Object.assign(userStore, data)
      toast.success('Login successfully')
      navigate('/home')
    },
  })

  return (
    <div className="mx-auto mt-1/10 max-w-screen-xl px-4 py-16 lg:px-8 sm:px-6">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-10 shadow-sm">
        <h1 className="text-center text-3xl text-black font-bold sm:text-3xl">Web Page Shelf</h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Web page download, store, archive
          <br />
          use cloudflare or self-host
        </p>

        <form className="mb-0 mt-6 rounded-lg p-4 space-y-4 lg:p-8 sm:p-6">
          <p className="text-center text-lg font-medium">Sign in to your account</p>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                name="email"
                type="email"
                className="w-full border border-gray-200 rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />

              <span className="absolute end-0 inset-y-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                name="password"
                type="password"
                className="w-full border border-gray-200 rounded-lg p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />

              <span className="absolute end-0 inset-y-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="button"
              className="block w-1/3 rounded-lg bg-gray-900 px-5 py-3 text-sm text-white font-medium"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" href="#signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
