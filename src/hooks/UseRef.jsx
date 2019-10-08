import React, { useRef } from 'react'

function UseRef() {
  const inputRef = useRef(null)

  return (
    <div>
      <input ref={inputRef} type="text" />
      <br />
      <button onClick={() => inputRef.current.focus()}>focus</button>
    </div>
  )
}

export default UseRef
