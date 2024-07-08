import toast from 'react-hot-toast'

interface Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, unknown>
  query?: Record<string, string>
}

function fetcher(url: string, {
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
      }).then(res => processResponse(res))
    }
    return fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => processResponse(res))
  }
}

async function processResponse(res: Response) {
  if (!res.ok) {
    toast.error(await res.text())
  }
  return res.json()
}

export default fetcher
