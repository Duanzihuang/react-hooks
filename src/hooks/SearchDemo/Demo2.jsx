import React, { Fragment, useState, useEffect, useReducer } from 'react'
import axios from 'axios'

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case 'FETCH_SUCCESSS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }

    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }

    default:
      break
  }
}

function useFetchApi(initialUrl, initalData) {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initalData
  })

  useEffect(() => {
    let didCancal = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        console.log('ready fetch...')
        const result = await axios.get(url)

        if (!didCancal) {
          dispatch({
            type: 'FETCH_SUCCESSS',
            payload: { hits: result.data.message }
          })
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
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

  return { ...state, doFetch }
}

function App() {
  const [query, setQuery] = useState('')

  const { data, isLoading, isError, doFetch } = useFetchApi(
    '/api/search?query=redux',
    {
      hits: []
    }
  )

  // console.log('data is ', data)

  return (
    <Fragment>
      <h1>Search Demo2</h1>
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
