import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/16/solid'

export default function ModerateAllPosts() {
  return (
    <div>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5  text-white  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          Moderar todos de uma vez
          <ChevronDownIcon className="size-4 fill-white/60"/>
        </MenuButton>
        
        <MenuItems transition anchor="bottom end" className="w-52 mt-1 origin-top-right rounded border border-white/20 bg-slate-900 p-1 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          {
            [
              ["Aprovar", (() => {
              })],
              ["Reprovar", (() => {
              })]
            ].map((i, index) => {
              
              return (
                <MenuItem key={index} onClick={i[1]}>
                  <button className="group flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-white/10 data-focus:bg-white/10 focus:bg-white/10">
                    {i[0]}
                  </button>
                </MenuItem>
              )
            })
          }
        </MenuItems>
      </Menu>
    </div>
  )
}
