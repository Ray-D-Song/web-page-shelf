import toast from 'react-hot-toast'

interface Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, unknown>
  query?: Record<string, string>
}

function fetcher<T>(url: string, {
  method = 'GET',
  body,
  query,
}: Options) {
  url = `/api${url}`
  return async () => {
    if (body && method !== 'POST') {
      return toast.error('Body is only allowed for POST method')
    }
    let queryString = ''
    if (query) {
      queryString = new URLSearchParams(query).toString()
      url += `?${queryString}`
    }
    if (method === 'GET') {
      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => processResponse<T>(res))
    }
    return fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => processResponse<T>(res))
  }
}

async function processResponse<T>(res: Response) {
  if (!res.ok) {
    toast.error('Network error')
  }
  const content = <{
    code: number
    message: string
    data: T
  }> await res.json()
  if (content.code !== 200) {
    toast.error(content.message)
    throw new Error(content.message)
  }
  return content.data
}

export default fetcher
