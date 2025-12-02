import { Moon, Search } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onSearch, dark, setDark }) {
  const [font, setFont] = useState('sans-serif')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='container mx-auto p-5'>
      <div className='flex justify-between items-center mb-8'>
        <img 
          src='./images/logo.png' 
          alt='Dictionary' 
          className='w-8 h-8' 
        />
        <div className='flex items-center gap-4'>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className={`px-4 py-2 rounded border-none font-bold cursor-pointer ${
              dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            style={{ fontFamily: font }}
          >
            <option value='sans-serif'>Sans Serif</option>
            <option value='serif'>Serif</option>
            <option value='monospace'>Mono</option>
          </select>

          <div className="flex items-center gap-3">
            <div className={`h-6 w-px ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <button
              onClick={() => setDark(!dark)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                dark ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  dark ? 'translate-x-5' : ''
                }`}
              />
            </button>
            <Moon size={20} className={dark ? 'text-purple-600' : 'text-gray-400'} />
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          type='text'
          placeholder='Search for any word...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`w-full px-6 py-4 rounded-xl text-lg font-bold outline-none ${
            dark
              ? 'bg-gray-800 text-white placeholder-gray-500'
              : 'bg-gray-100 text-gray-900 placeholder-gray-400'
          }`}
          style={{ fontFamily: font }}
        />
        <button onClick={handleSearch}>
          <Search
            size={20}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 cursor-pointer hover:text-purple-700"
          />
        </button>
      </div>
    </div>
  )
}
