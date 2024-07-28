import { MouseEvent, useState } from 'react'
import { CE } from '@web-page-shelf/global/types/shortcuts'
import { userStore } from '@/store/user'

interface NewFolderDialogProps {
  visible: boolean
  onClose: (event: MouseEvent<HTMLButtonElement>) => void
}

function NewFolderDialog({ visible, onClose }: NewFolderDialogProps) {
  const folderList = ['root']
  userStore.folders.children.forEach((folder) => {
    folderList.push(folder.name)
    if (folder.children.length > 0) {
      folder.children.forEach((child) => {
        folderList.push(child.name)
      })
    }
  })

  const [form, setForm] = useState({
    parentFolder: '',
    folderName: '',
  })
  function handleChange<T extends HTMLInputElement | HTMLSelectElement>(e: CE<T>) {
    const { name, value } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }
  function handleSubmit() {

  }

  return visible
    ? (
      <div className="fixed fixed z-100 h-screen w-screen overflow-y-auto bg-gray-600 bg-opacity-50">
        <div className="relative top-20 mx-auto w-96 border rounded-md bg-white p-5 shadow-lg">
          <div className="mt-3 text-center">
            <h3 className="mb-6 text-lg text-gray-900 font-medium leading-6">Create New Folder</h3>
            <div className="h-20">
              <label className="block text-left text-sm text-gray-900 font-medium"> parent folder </label>

              <select
                className="mt-1.5 h-10 w-full border border-gray-300 rounded-lg border-solid px-2.5 py-2"
                name="parentFolder"
                value={form.parentFolder}
                onChange={handleChange}
              >
                <option value="">Please select</option>
                {
                folderList.map((name) => {
                  return (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  )
                })
              }
              </select>
            </div>
            <div className="w-3/5 pb-3">
              <input type="text" placeholder="Folder Name" name="folderName" value={form.folderName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none" />
            </div>
            <div className="w-full flex items-center justify-end gap-2 px-4 py-3">
              <button id="cancel" type="button" className="h-8 w-1/5 rounded-md bg-black text-14px text-white font-medium shadow-sm hover:opacity-75 focus:outline-none focus:ring-2" onClick={onClose}>
                cancel
              </button>
              <button id="submit" type="button" className="h-8 w-1/5 rounded-md bg-blue-500 text-center text-14px text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleSubmit}>
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
      )
    : null
}

export default NewFolderDialog
