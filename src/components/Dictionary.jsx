import { Volume2 } from "lucide-react";

export default function Dictionary({ data, dark }) {
  if (!data) return null;

  const playAudio = () => {
    const audioFile = data.phonetics?.find((p) => p.audio)?.audio;
    if (audioFile) new Audio(audioFile).play();
  };

  return (
    <section className="container mx-auto px-5 pb-10">
      {/* WORD HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-extrabold">{data.word}</h1>
          <p className="text-purple-500 text-xl mt-2">{data.phonetic}</p>
        </div>

        {data.phonetics?.some((p) => p.audio) && (
          <button
            onClick={playAudio}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-purple-200 hover:bg-purple-300 transition"
          >
            <Volume2 size={30} className="text-purple-700" />
          </button>
        )}
      </div>

      {/* MEANINGS */}
      {data.meanings?.map((m, i) => (
        <div key={i} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-semibold italic">{m.partOfSpeech}</h2>
            <div
              className={`flex-1 h-px ${dark ? "bg-gray-700" : "bg-gray-300"}`}
            />
          </div>

          <h3
            className={`mb-3 text-lg ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Meaning:
          </h3>

          <ul className="space-y-4">
            {m.definitions?.map((def, dIndex) => (
              <li key={dIndex} className="flex gap-3">
                <span className="text-purple-500 text-xl">•</span>
                <div>
                  <p className="font-medium">{def.definition}</p>

                  {def.example && (
                    <p
                      className={`mt-1 italic ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      “{def.example}”
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {m.synonyms?.length > 0 && (
            <div className="mt-6 flex gap-3 items-center flex-wrap">
              <span
                className={`font-medium ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Synonyms:
              </span>
              {m.synonyms.slice(0, 6).map((syn, sIndex) => (
                <span key={sIndex} className="text-purple-600 font-bold">
                  {syn}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* SOURCE */}
      {data.sourceUrls?.length > 0 && (
        <div
          className={`border-t pt-6 ${
            dark ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <p className="text-sm opacity-70 mb-1">Source</p>
          <a
            href={data.sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm flex items-center gap-2"
          >
            {data.sourceUrls[0]}
          </a>
        </div>
      )}
    </section>
  );
}
