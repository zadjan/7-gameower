import { useState } from 'react'
import Header from './components/Header'
import Dictionary from './components/Dictionary'


export default function App() {
  const [dark, setDark] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWord = async (word) => {
    setLoading(true)
    setError(null)
    setData(null)
    
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      )
      
      if (!response.ok) {
        throw new Error('Word not found')
      }
      
      const result = await response.json()
      setData(result[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors ${
      dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Header
        onSearch={fetchWord}
        dark={dark}
        setDark={setDark}
      />
      
      {loading && (
        <div className='container mx-auto px-5 text-center py-10'>
          <p className={dark ? 'text-gray-400' : 'text-gray-600'}>
            Loading...
          </p>
        </div>
      )}
      
      {error && (
        <div className='container mx-auto px-5 text-center py-10'>
          <p className='text-red-500'>{error}</p>
          <p className={`mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Please try searching for another word
          </p>
        </div>
      )}
      
      {!loading && !error && data && (
        <Dictionary data={data} dark={dark} />
      )}
    </div>
  )
}
