import { parseString } from 'xml2js'
import { useEffect, useState } from 'react'

const Home = () => {
  const [status, setStatus] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {}, [results])

  const Searcher = async () => {
    setResults([])
    setStatus(true)

    const res = await fetch(
      `https://jackett.at7.in/api/v2.0/indexers/all/results/torznab?apikey=qbittorrent&q=${search}`
    )
    const xml = await res.text()

    const json = []

    parseString(xml, function (err, result) {
      json = result.rss.channel[0].item
    })

    if (json !== undefined) {
      setResults(json)
      console.log(json[0])
    }

    setStatus(false)
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <main className="my-8 flex items-center justify-between">
        <input
          type="text"
          className="h-10 w-full max-w-3xl rounded-lg border-2 border-gray-300 text-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={`ml-4 flex h-10 w-14 items-center justify-center rounded-lg bg-black text-xl text-white ${
            status ? 'animate-pulse' : ''
          }`}
          onClick={Searcher}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </main>

      <div className="mt-4 mb-4 flex flex-col gap-y-4 font-mono">
        {results.map((element, key) => {
          return (
            <div className="relative flex flex-col rounded-lg bg-gray-200 p-4 " key={key}>
              <p className="break-words  text-black line-clamp-2">{element.title}</p>
              <div className="mt-2 flex items-center justify-between">
                <p>
                  {size(element.size)} / {seeders(element)}
                </p>

                <a href={element.link}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home

const size = (bytes) => {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(1) + ' gb'
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(1) + ' mb'
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(1) + ' kb'
  } else if (bytes > 1) {
    bytes = bytes + ' bytes'
  } else if (bytes == 1) {
    bytes = bytes + ' byte'
  } else {
    bytes = ' bytes'
  }
  return bytes
}

const seeders = (element) => {
  return JSON.stringify(element).split('"name":"seeders","value":"')[1].split('"}}')[0]
}
