import { useDebounceEffect } from 'ahooks'
import { useState } from 'react'

function SearchBar() {
  const [value, setValue] = useState('')
  useDebounceEffect(
    () => {
    },
    [value],
    {
      wait: 600,
    },
  );
  return (
    <div className="relative">
      <label htmlFor="Search" className="sr-only"> Search for... </label>

      <input
        type="text"
        id="Search"
        className="w-full border-gray-200 rounded-md px-1 py-2.5 pe-10 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:text-sm dark:text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <span className="absolute end-0 inset-y-0 grid w-10 place-content-center">
        <button
          type="button"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span className="sr-only">Search</span>
          <div className='i-mdi-magnify' />
        </button>
      </span>
    </div>
  )
}

export default SearchBar