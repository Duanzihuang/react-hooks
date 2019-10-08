import React, { useReducer } from 'react'

function UseReducer() {
  const initState = { count: 100 }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 }

      case 'MINUS':
        return { count: state.count - 1 }

      case 'RESET':
        return initState

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <div>
      <p>测试reducer替代部分redux的功能</p>
      <p>{state.count}</p>
      <ul>
        <li onClick={() => dispatch({ type: 'ADD' })}>+</li>
        <li onClick={() => dispatch({ type: 'MINUS' })}>-</li>
        <li onClick={() => dispatch({ type: 'RESET' })}>reset</li>
      </ul>
    </div>
  )
}

export default UseReducer
