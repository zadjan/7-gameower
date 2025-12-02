import { Volume2 } from 'lucide-react'

function Dictionary({ data, dark }) {
  const playAudio = () => {
    if (data?.phonetics) {
      const audioUrl = data.phonetics.find(p => p.audio)?.audio
      if (audioUrl) {
        new Audio(audioUrl).play()
      }
    }
  }

  if (!data) return null

  return (
    <div className='container mx-auto px-5 pb-10'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-6xl font-bold mb-2'>{data.word}</h1>
          <p className='text-purple-600 text-xl'>{data.phonetic}</p>
        </div>
        {data.phonetics?.some(p => p.audio) && (
          <button 
            onClick={playAudio}
            className='w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center hover:bg-purple-300 transition-colors'
          >
            <img src="./images/icon-play.svg" alt="" />
          </button>
        )}
      </div>
      {data.meanings?.map((meaning, idx) => (
        <div key={idx} className='mb-8'>
          <div className='flex items-center gap-4 mb-6'>
            <h2 className='text-2xl font-bold italic'>{meaning.partOfSpeech}</h2>
            <div className={`flex-1 h-px ${dark ? 'bg-gray-700' : 'bg-gray-300'}`} />
          </div>
          <h3 className={`text-lg mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Meaning
          </h3>
          <ul className='mb-6 space-y-3'>
            {meaning.definitions?.map((def, defIdx) => (
              <li key={defIdx} className='flex gap-4'>
                <span className='text-purple-600 mt-1'>•</span>
                <div>
                  <p className={dark ? 'text-white' : 'text-gray-900'}>
                    {def.definition}
                  </p>
                  {def.example && (
                    <p className={`mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      "{def.example}"
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {meaning.synonyms?.length > 0 && (
            <div className='flex gap-6 flex-wrap items-start'>
              <span className={`text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                Synonyms
              </span>
              <div className='flex gap-3 flex-wrap'>
                {meaning.synonyms.slice(0, 5).map((syn, synIdx) => (
                  <span key={synIdx} className='text-purple-600 font-bold'>
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {data.sourceUrls?.length > 0 && (
        <div className={`pt-6 mt-6 border-t ${dark ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className='flex gap-4 items-center flex-wrap'>
            <span className={`text-sm underline ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Source
            </span>
            <a 
              href={data.sourceUrls[0]} 
              target='_blank' 
              rel='noopener noreferrer'
              className={`text-sm underline flex items-center gap-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {data.sourceUrls[0]}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 1H6M10 1V5M10 1L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dictionary
