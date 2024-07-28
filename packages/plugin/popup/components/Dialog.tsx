import React from 'react'

interface DialogProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

function Dialog({ isOpen, title, children, onClose }: DialogProps) {
  if (!isOpen)
    return null

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="max-w-500px rounded-lg bg-white p-sm shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="mb-2.5 flex items-center justify-between">
          <div className="min-w-auto flex select-none items-center p-r-xl vertical-middle text-lg">{title}</div>
          <button
            type="button"
            className="i-mdi-close cursor-pointer border-none bg-none text-lg"
            onClick={onClose}
          >
          </button>
        </div>
        <div className="py-2.5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
