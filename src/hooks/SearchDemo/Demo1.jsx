import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

function useFetchApi() {
  const [data, setData] = useState({
    hits: []
  })
  const [url, setUrl] = useState('/api/search?query=redux')

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let didCancal = false

    const fetchData = async () => {
      console.log('fetch data ...')
      setIsLoading(true)
      setIsError(false)

      try {
        const result = await axios.get(url)

        setIsLoading(false)

        if (!didCancal) {
          setData({ hits: result.data.message })
        }
      } catch (error) {
        setIsError(true)
      }
    }

    // 执行查询操作
    fetchData()

    return () => {
      didCancal = true
    }
  }, [url])

  const doFetch = url => {
    setUrl(url)
  }

  return { data, isLoading, isError, doFetch }
}

function App() {
  const [query, setQuery] = useState('')

  const { data, isLoading, isError, doFetch } = useFetchApi()

  //   console.log('data is ', data)

  return (
    <Fragment>
      <form
        onSubmit={e => {
          doFetch(`/api/search?query=${query}`)
          e.preventDefault()
        }}
      >
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>something is wrong</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits &&
            data.hits.map(item => {
              return <li key={item.id}>{item.title}</li>
            })}
        </ul>
      )}
    </Fragment>
  )
}

export default App
